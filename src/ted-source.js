/* ============================================================
 *  ted-source.js — the link between Ted's backend and the site.
 *  v2, hardened.
 *
 *  Plain script. No build step, no JSX, no dependencies.
 *
 *  Loads after the built-in *Data.jsx files, fetches Ted's live feeds,
 *  maps them into the exact shapes the site already defines, and fills
 *  the same window globals. The site's structures and vocabulary are
 *  canonical; this file adapts Ted's data into them, never the reverse.
 *
 *  Design rule: the page must render correctly no matter what the
 *  backend does. Every failure path ends with the site's built-in
 *  content intact, never with a blank or broken page.
 *
 *  Failure modes explicitly handled (see test-harness.mjs):
 *    1  backend unreachable            8  category renamed upstream
 *    2  backend slow / cold start      9  poster image 403s or dies
 *    3  empty feed                    10  repeat visit, backend asleep
 *    4  malformed JSON                11  one feed down, others fine
 *    5  non-array payload             12  apply called more than once
 *    6  records missing key fields    13  HTTP error status
 *    7  duplicate slugs               14  site globals missing entirely
 *
 *  Entry point: window.TED.ready() -> Promise, always resolves.
 *  Diagnostics: window.TED.status()
 * ============================================================ */
(function () {
  "use strict";

  var API        = "https://tedverse-ted.fly.dev/api/public";
  var ORIGIN     = API.replace(/\/api\/public\/?$/, "");   // for relative asset paths
  var TIMEOUT_MS = 6000;        // above his measured 2.7s cold start
  var CACHE_KEY  = "ted-source:v2:";
  var CACHE_TTL  = 86400000;    // keep a usable copy for 24h as an outage cushion
  var PLACEHOLDER = "assets/cosmic-bg.png";   // what the site already falls back to

  // Ted's single category field stacks five unrelated axes. Listed here for
  // the split only. Matching is normalized, so upstream renames still land.
  var AXES = {
    genre:      ["Documentary", "Fiction", "Nonfiction", "Narrative", "Experimental", "Childhood"],
    clientType: ["Corporate", "Commercial", "Event", "Spec"],
    format:     ["Motion Graphics", "Music Videos", "Virtual Reality", "TV", "YouTube", "BTS"],
    role:       ["Written by Ted"],
    placement:  ["hero", "Festival Films"]
  };

  var diagnostics = { feeds: {}, warnings: [], appliedAt: null };

  function warn(msg) {
    diagnostics.warnings.push(msg);
    if (typeof console !== "undefined" && console.warn) console.warn("[ted-source] " + msg);
  }

  /* ---------- normalization -------------------------------------------
   * Ted writes "Corporate"; the site's chip says "Corporate Films".
   * Ted is currently renaming "Motion Graphics" to "Motion Graphic" on an
   * open branch. Exact string matching breaks on both. Normalizing to a
   * comparable key means either spelling matches, in either direction, and
   * a future rename does not silently empty a filter chip.
   * -------------------------------------------------------------------- */
  function key(s) {
    return String(s == null ? "" : s)
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .replace(/\bfilms?\b$/, "")     // "Corporate Films" -> "corporate"
      .trim()
      .replace(/s$/, "");             // "Motion Graphics" -> "motion graphic"
  }

  function axisOf(category) {
    var k = key(category), found = null;
    Object.keys(AXES).forEach(function (axis) {
      if (found) return;
      if (AXES[axis].some(function (c) { return key(c) === k; })) found = axis;
    });
    return found;
  }

  function splitAxes(categoryString) {
    var raw = String(categoryString || "").split(",")
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
    var out = { genre: [], clientType: [], format: [], role: [], placement: [], raw: raw };
    raw.forEach(function (c) {
      var axis = axisOf(c);
      out[axis || "genre"].push(c);   // unknown values land in genre, never dropped
    });
    return out;
  }

  /* ---------- small helpers -------------------------------------------- */

  function runtime(seconds) {
    var s = Math.round(Number(seconds) || 0);
    if (!s || !isFinite(s) || s < 0) return "";
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }

  function str(v) { return typeof v === "string" ? v : (v == null ? "" : String(v)); }

  // The site resolves images as window.__resources[key] with a placeholder
  // fallback. Handing it a raw URL misses every lookup and silently renders
  // the same placeholder for every film. Register the URL, return the key.
  function registerAsset(k, url) {
    var abs = resolveUrl(url);
    if (!abs) return "";
    try {
      window.__resources = window.__resources || {};
      window.__resources[k] = abs;
    } catch (e) { warn("could not register asset " + k); }
    return k;
  }

  /* ---------- asset resolution -------------------------------------------
   * His feeds mix two kinds of URL. Articles carry absolute ones
   * ("https://tedverse-ted.fly.dev/data/article-images/..."); photos carry
   * root-relative ones ("/data/tedshots-thumbs/..."). A relative path used
   * as-is resolves against the site's own domain and 404s, which is a broken
   * image on a director's portfolio. Every asset from his backend goes
   * through here, so the origin is applied exactly once and only when needed.
   * -------------------------------------------------------------------- */
  function resolveUrl(u) {
    var s = str(u).trim();
    if (!s) return "";
    if (/^(https?:)?\/\//i.test(s) || /^data:/i.test(s)) return s;   // already absolute
    return ORIGIN + (s.charAt(0) === "/" ? "" : "/") + s;
  }

  // Bunny 403s any request that carries no referrer, and CDN objects can go
  // missing. A dead <img> would render as a broken icon on a director's
  // portfolio. Swap any failed Ted poster for the site's own placeholder.
  function installImageFallback() {
    if (typeof document === "undefined" || document.__tedImgFallback) return;
    document.__tedImgFallback = true;
    document.addEventListener("error", function (e) {
      var el = e && e.target;
      if (!el || el.tagName !== "IMG" || el.dataset.tedFallback) return;
      var src = el.currentSrc || el.src || "";
      if (src.indexOf("b-cdn.net") === -1 && src.indexOf("bunny") === -1) return;
      el.dataset.tedFallback = "1";
      el.src = PLACEHOLDER;
      warn("poster unavailable, used placeholder: " + src);
    }, true);   // capture phase: <img> error does not bubble
  }

  /* ---------- cache ----------------------------------------------------
   * A last-good copy in localStorage means a repeat visitor still sees Ted's
   * real library when Fly is asleep or the network is down, instead of
   * dropping back to the sixteen built-in films.
   * -------------------------------------------------------------------- */
  function cacheGet(name) {
    try {
      var raw = window.localStorage.getItem(CACHE_KEY + name);
      if (!raw) return null;
      var box = JSON.parse(raw);
      if (!box || !Array.isArray(box.d)) return null;
      if (Date.now() - box.t > CACHE_TTL) return null;
      return box.d;
    } catch (e) { return null; }
  }

  function cachePut(name, data) {
    try {
      window.localStorage.setItem(CACHE_KEY + name, JSON.stringify({ t: Date.now(), d: data }));
    } catch (e) { /* private mode or quota; cache is an optimization only */ }
  }

  /* ---------- fetch ----------------------------------------------------- */

  function getJSON(path) {
    return new Promise(function (resolve, reject) {
      var done = false;
      var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
      var timer = setTimeout(function () {
        if (done) return;
        done = true;
        if (ctrl) { try { ctrl.abort(); } catch (e) {} }
        reject(new Error("timeout after " + TIMEOUT_MS + "ms"));
      }, TIMEOUT_MS);

      var opts = ctrl ? { signal: ctrl.signal } : undefined;
      var p;
      try { p = fetch(API + "/" + path, opts); }
      catch (e) { clearTimeout(timer); return reject(e); }

      Promise.resolve(p).then(function (r) {
        if (!r || !r.ok) throw new Error("HTTP " + (r && r.status));
        return r.json();
      }).then(function (data) {
        if (done) return;
        // Validate BEFORE marking the request done. Marking first and then
        // throwing meant the catch below saw done === true and returned
        // without rejecting, so the promise never settled and the page never
        // mounted. Caught by scenario 5 in test-harness.mjs.
        if (!Array.isArray(data)) throw new Error("expected an array, got " + typeof data);
        done = true; clearTimeout(timer);
        resolve(data);
      }).catch(function (e) {
        if (done) return;
        done = true; clearTimeout(timer);
        reject(e);
      });
    });
  }

  /* ---------- validation ------------------------------------------------
   * A record with no slug cannot be keyed, linked, or placed in a rail.
   * Drop the individual bad record rather than failing the whole feed, and
   * count what was dropped so it is visible in diagnostics.
   * -------------------------------------------------------------------- */
  function clean(rows, requiredFields, label) {
    var seen = {}, out = [], dropped = 0, dupes = 0;
    rows.forEach(function (r) {
      if (!r || typeof r !== "object") { dropped++; return; }
      for (var i = 0; i < requiredFields.length; i++) {
        if (!str(r[requiredFields[i]]).trim()) { dropped++; return; }
      }
      var id = str(r[requiredFields[0]]);
      if (seen[id]) { dupes++; return; }         // first wins, deterministically
      seen[id] = true;
      out.push(r);
    });
    if (dropped) warn(label + ": dropped " + dropped + " record(s) missing " + requiredFields.join("/"));
    if (dupes)   warn(label + ": dropped " + dupes + " duplicate id(s)");
    return out;
  }

  /* ---------- mappers ---------------------------------------------------- */

  function mapFilm(v) {
    var axes = splitAxes(v.category);
    var poster = str(v.poster) || str(v.preview);
    return {
      id:      str(v.slug),
      title:   str(v.title),
      sub:     axes.genre[0] || axes.format[0] || "Film",
      year:    str(v.year),
      cat:     axes.genre[0] || "Film",
      tags:    axes.raw.slice(),
      axes:    axes,
      thumb:   registerAsset("ted:" + str(v.slug), poster),
      run:     runtime(v.duration),
      views:   "",
      desc:    str(v.short_description),
      long:    str(v.long_description) || str(v.short_description),
      date:    str(v.year),
      bts:     axes.format.some(function (c) { return key(c) === key("BTS"); }),
      trailer: Boolean(v.preview),
      articles: [],
      similar: [],
      media: {
        hls: str(v.video_hls), mp4: str(v.video_mp4), poster: str(v.poster),
        preview: str(v.preview), captions: Array.isArray(v.captions) ? v.captions : [],
        youtube: str(v.youtube_url), vimeo: str(v.vimeo_url)
      }
    };
  }

  function mapWriting(a) {
    return {
      id: str(a.id), title: str(a.title), author: str(a.author) || "Ted Saunders",
      date: str(a.published) || str(a.published_iso), image: str(a.image),
      excerpt: str(a.excerpt), body: str(a.body_html) || str(a.body_text),
      text: str(a.body_text), url: str(a.url)
    };
  }

  /* ---------- tweets -> TedThoughts ---------------------------------------
   * The site's LIT_DATA.POEMS collection is the TedThoughts section, and its
   * twelve entries are verbatim the first twelve records of his tweets feed,
   * in feed order, hand-copied. He has 422.
   *
   * Shape the renderer expects: { tag, title, lines[] }, joined with blank
   * lines. Newest first, matching both his feed and the site's existing order.
   * -------------------------------------------------------------------- */
  function mapTweet(t) {
    var text = str(t.full_text).replace(/\r/g, "").trim();
    return {
      tag: "TedThought",
      title: "",
      lines: text.split(/\n{2,}/).map(function (s) { return s.trim(); })
                 .filter(Boolean),
      date: shortDate(t.created_at),
      id: str(t.id),
      permalink: str(t.permalink)
    };
  }

  function mapNote(n) {
    var kind = key(n.kind) === "song" ? "song" : "poem";
    return {
      id: str(n.id), title: str(n.title), kind: kind,
      body: str(n.body_html) || str(n.body_text), text: str(n.body_text),
      date: str(n.created_at)
    };
  }

  /* ---------- film-specific assembly -------------------------------------- */

  // Teach Ted's tags to speak the site's vocabulary so its existing chips show
  // real counts. The site's curated label list is never modified.
  function alignToSiteLabels(films) {
    var labels = Array.isArray(window.FILM_FILTERS) ? window.FILM_FILTERS : [];
    if (!labels.length) return;
    films.forEach(function (f) {
      var have = {};
      f.tags.forEach(function (t) { have[key(t)] = true; });
      labels.forEach(function (label) {
        if (key(label) === key("All") || !label) return;
        if (f.tags.indexOf(label) !== -1) return;
        if (have[key(label)]) f.tags.push(label);
      });
    });
  }

  // Ted's library carries several encodes of the same work as separate records.
  // Collapse them inside curated rails so one film cannot appear three times.
  function dedupeVariants(ids) {
    var seen = {}, out = [];
    ids.forEach(function (id) {
      var base = String(id)
        .replace(/-(master|final)?-?(16x9|9x16|1x1|4x5|mobile|vertical|square|web|social)?-?(2160p|1080p|720p|480p|4k)$/, "")
        .replace(/-+$/, "");
      if (seen[base]) return;
      seen[base] = true;
      out.push(id);
    });
    return out;
  }

  function applyFilms(rows) {
    var films = clean(rows, ["slug", "title"], "films").map(mapFilm);
    if (!films.length) { warn("films: nothing usable, keeping built-in library"); return false; }

    alignToSiteLabels(films);

    var byId = {};
    films.forEach(function (f) { byId[f.id] = f; });

    films.forEach(function (f) {
      f.similar = films.filter(function (o) { return o.id !== f.id && o.cat === f.cat; })
                       .slice(0, 3).map(function (o) { return o.id; });
    });

    var idsMatching = function (label) {
      var want = key(label);
      return films.filter(function (f) {
        return f.tags.some(function (t) { return key(t) === want; });
      }).map(function (f) { return f.id; });
    };

    // Rails carry Influex's editorial copy. Replace ids only, never the object,
    // and only when there is a real match, so a rail never silently empties.
    var rails = (window.FILM_RAILS && typeof window.FILM_RAILS === "object") ? window.FILM_RAILS : {};
    Object.keys(rails).forEach(function (k) {
      var rail = rails[k];
      if (!rail || typeof rail !== "object") return;
      var matched = dedupeVariants(idsMatching(rail.filter || k));
      if (matched.length) rail.ids = matched;
      else warn("rail '" + k + "' (filter: " + rail.filter + ") matched nothing, keeping built-in ids");
    });
    var hero = dedupeVariants(idsMatching("hero"));
    if (hero.length) { rails.hero = rails.hero || {}; rails.hero.ids = hero; }

    window.FILM_LIBRARY = films;
    window.FILM_BY_ID   = byId;
    window.FILM_AXES    = AXES;      // published for anything built later
    window.FILM_RAILS   = rails;
    return true;
  }

  /* ---------- date formatting -------------------------------------------
   * The site writes essay dates as "JAN 14, 2025" and prose dates as
   * "7/12/2013". Ted's feeds carry ISO strings. Match the site's format so
   * a live record is typographically indistinguishable from a built-in one.
   * -------------------------------------------------------------------- */
  var MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  function parseDate(v) {
    if (!v) return null;
    var d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  }

  function essayDate(raw, iso) {
    var d = parseDate(iso) || parseDate(raw);
    if (!d) return str(raw);
    return MONTHS[d.getUTCMonth()] + " " + String(d.getUTCDate()).padStart(2, "0") + ", " + d.getUTCFullYear();
  }

  function shortDate(iso) {
    var d = parseDate(iso);
    if (!d) return "";
    return (d.getUTCMonth() + 1) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear();
  }

  // The site renders prose by splitting on blank lines. Strip any HTML that
  // arrives so a tag never shows up as literal text on the page.
  function proseOf(n) {
    var t = str(n.text) || str(n.body);
    if (/<[a-z][\s\S]*>/i.test(t)) {
      t = t.replace(/<\/(p|div|h[1-6]|li)>/gi, "\n\n")
           .replace(/<br\s*\/?>/gi, "\n")
           .replace(/<[^>]+>/g, "");
    }
    return t.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").trim();
  }

  /* ---------- literature -------------------------------------------------
   * window.LIT_DATA is an object of eight collections. Only three have a
   * counterpart in Ted's backend. The other five (VIRTUES, POEMS, WORLDS,
   * PAST_FILMS, FUTURE_FILMS) are Influex's and are never touched.
   *
   *   ESSAYS   <- his articles feed        (the site's copy matches title for title)
   *   THOUGHTS <- his notes, kind "poem"   (6 on the site, 33 in his backend)
   *   LYRICS   <- his notes, kind "song"   (5 on the site, 9 in his backend)
   * -------------------------------------------------------------------- */
  function composeLiterature() {
    var D = window.LIT_DATA;
    if (!D || typeof D !== "object") return false;   // page does not carry it
    var touched = [];

    var writings = window.WRITINGS;
    if (Array.isArray(writings) && writings.length) {
      D.ESSAYS = writings.map(function (a) {
        var k = "ted:essay:" + a.id;
        return {
          imgKey: a.image ? registerAsset(k, a.image) : "",
          img: a.image || "",
          date: essayDate(a.date, a.date),
          title: a.title,
          excerpt: a.excerpt,
          body: a.body,
          url: a.url
        };
      });
      touched.push("ESSAYS:" + D.ESSAYS.length);
    }

    var tweets = window.TWEETS;
    if (Array.isArray(tweets) && tweets.length) {
      D.POEMS = tweets;
      touched.push("POEMS:" + tweets.length);
    }

    var notes = window.NOTES;
    if (Array.isArray(notes) && notes.length) {
      var asProse = function (n) {
        return { title: n.title, date: shortDate(n.date), content: proseOf(n) };
      };
      var poems = notes.filter(function (n) { return n.kind === "poem"; })
                       .map(asProse).filter(function (x) { return x.content; });
      var songs = notes.filter(function (n) { return n.kind === "song"; })
                       .map(asProse).filter(function (x) { return x.content; });
      if (poems.length) { D.THOUGHTS = poems; touched.push("THOUGHTS:" + poems.length); }
      if (songs.length) { D.LYRICS = songs;  touched.push("LYRICS:" + songs.length); }
    }

    if (!touched.length) return false;
    diagnostics.literature = touched.join(" ");
    return true;
  }

  function applyWritings(rows) {
    var items = clean(rows, ["id", "title"], "writings").map(mapWriting);
    if (!items.length) { warn("writings: nothing usable, keeping built-in copy"); return false; }
    window.WRITINGS = items;
    return true;
  }

  function applyTweets(rows) {
    var items = clean(rows, ["id", "full_text"], "tweets").map(mapTweet)
                  .filter(function (t) { return t.lines.length; });
    if (!items.length) { warn("tweets: nothing usable, keeping built-in copy"); return false; }
    window.TWEETS = items;
    return true;
  }

  function applyNotes(rows) {
    var items = clean(rows, ["id", "title"], "notes").map(mapNote);
    if (!items.length) { warn("notes: nothing usable, keeping built-in copy"); return false; }
    window.NOTES = items;
    window.POEMS = items.filter(function (n) { return n.kind === "poem"; });
    window.SONGS = items.filter(function (n) { return n.kind === "song"; });
    return true;
  }

  /* ---------- orchestration ------------------------------------------------
   * Fetching starts immediately so the network is never the bottleneck.
   * Applying is deferred until TED.ready(), which the page calls at mount,
   * after Babel has run the built-in *Data.jsx files. Without that split the
   * two sources race and the winner varies from load to load.
   * ---------------------------------------------------------------------- */
  function feed(name, path, apply) {
    return getJSON(path)
      .then(function (rows) {
        cachePut(name, rows);
        return { name: name, rows: rows, source: "live" };
      })
      .catch(function (e) {
        var cached = cacheGet(name);
        if (cached) {
          warn(name + " unavailable (" + e.message + "), using last good copy");
          return { name: name, rows: cached, source: "cache" };
        }
        warn(name + " unavailable (" + e.message + "), keeping built-in copy");
        return { name: name, rows: null, source: "builtin", error: e.message };
      })
      .then(function (res) {
        res.apply = function () { return res.rows ? apply(res.rows) : false; };
        return res;
      });
  }

  var pending;
  try {
    pending = Promise.all([
      feed("films",    "videos",   applyFilms),
      feed("writings", "articles", applyWritings),
      feed("notes",    "notes",    applyNotes),
      feed("tweets",   "tweets",   applyTweets)
    ]);
  } catch (e) {
    warn("startup failed: " + e.message);
    pending = Promise.resolve([]);
  }

  var applied = null;

  window.TED = {
    // Always resolves. A rejected promise here would leave the page unmounted,
    // which is the one outcome worse than showing the built-in content.
    ready: function () {
      if (applied) return applied;
      applied = pending.then(function (results) {
        installImageFallback();
        (results || []).forEach(function (r) {
          var ok = false;
          try { ok = r.apply(); }
          catch (e) { warn(r.name + ": apply failed, built-in content left in place: " + e.message); }
          diagnostics.feeds[r.name] = {
            source: ok ? r.source : "builtin",
            records: ok && r.rows ? r.rows.length : 0,
            error: r.error || null
          };
        });
        // Literature is composed from two feeds, so it runs after both have
        // had their chance to apply. Failure here must never break the page.
        try { composeLiterature(); }
        catch (e) { warn("literature: compose failed, built-in copy left in place: " + e.message); }

        diagnostics.appliedAt = new Date().toISOString();
        window.__dataStatus = diagnostics;
        return diagnostics;
      }).catch(function (e) {
        warn("unexpected: " + e.message);
        return diagnostics;
      });
      return applied;
    },
    status: function () { return diagnostics; }
  };

  // Back-compat for any page wired to the earlier name.
  window.__dataReady = { then: function (f, r) { return window.TED.ready().then(f, r); } };
})();
