// ============================================================
//  LitSections — the environments of the literary wing.
//  Reusable Row (Tedflix browse), reveal hook, and the six
//  section components. Exposed on window.
// ============================================================
const { useRef: useLsRef, useEffect: useLsEffect, useState: useLsState } = React;
const LR = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

// Render a single TedThought aphorism to a portrait "paper" card image
// (data URL) for the WebGL CircularGallery planes.
function litThoughtCardURL(text, i) {
  const W = 700, H = 900;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#11151d"); g.addColorStop(1, "#06080d");
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.strokeStyle = "rgba(232,183,119,0.32)"; x.lineWidth = 3;
  x.strokeRect(26, 26, W - 52, H - 52);
  x.fillStyle = "rgba(232,183,119,0.5)";
  x.font = "180px Georgia, 'Times New Roman', serif";
  x.textBaseline = "top";
  x.fillText("\u201C", 64, 70);
  x.fillStyle = "#f2e6d2";
  x.font = "italic 46px Georgia, 'Times New Roman', serif";
  const words = String(text).split(" ");
  const maxW = W - 150; let line = ""; const lines = [];
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (x.measureText(test).width > maxW && line) { lines.push(line); line = w; }
    else line = test;
  }
  if (line) lines.push(line);
  let y = 300;
  for (const l of lines) { x.fillText(l, 75, y); y += 64; }
  x.fillStyle = "rgba(232,183,119,0.72)";
  x.font = "bold 22px Arial, sans-serif";
  x.fillText("T E D T H O U G H T S", 75, H - 110);
  return c.toDataURL("image/jpeg", 0.86);
}

function LpPlay() { return (<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="7,4 21,12 7,20" /></svg>); }
function LpArrowR() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>); }
function LpArrowL() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>); }

// Reveal-on-scroll — safety interval so content never strands hidden.
function useLpReveal() {
  const ref = useLsRef(null);
  useLsEffect(() => {
    const el = ref.current; if (!el) return;
    const show = (n) => {
      if (n.classList.contains("is-in")) return;
      n.classList.add("is-in");
      setTimeout(() => { n.style.transition = "none"; n.style.opacity = "1"; if (!n.hasAttribute("data-par")) n.style.transform = "none"; }, 1100);
    };
    const reveal = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      el.querySelectorAll(".lp-reveal").forEach((n) => { const r = n.getBoundingClientRect(); if (r.top < vh * 0.92 && r.bottom > 0) show(n); });
    };
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    const iv = setInterval(reveal, 500);
    return () => { window.removeEventListener("scroll", reveal); window.removeEventListener("resize", reveal); clearInterval(iv); };
  }, []);
  return ref;
}

// Horizontal browse row with ‹ › arrows (transform-driven).
function LpRow({ children, par }) {
  const viewRef = useLsRef(null);
  const trackRef = useLsRef(null);
  const [x, setX] = useLsState(0);
  const [lim, setLim] = useLsState(0);
  const measure = () => {
    const v = viewRef.current, t = trackRef.current;
    if (!v || !t) return 0;
    return Math.min(0, v.clientWidth - t.scrollWidth);
  };
  const apply = (nx, animate) => {
    const t = trackRef.current; if (!t) return;
    t.style.transition = animate ? "transform .6s cubic-bezier(.4,0,.2,1)" : "none";
    t.style.transform = "translateX(" + nx + "px)";
  };
  const step = (dir) => {
    const v = viewRef.current; if (!v) return;
    const min = measure(); setLim(min);
    setX((cur) => { const nx = Math.max(min, Math.min(0, cur + dir * -v.clientWidth * 0.7)); apply(nx, true); return nx; });
  };
  useLsEffect(() => {
    const onResize = () => { const min = measure(); setLim(min); setX((cur) => { const nx = Math.max(min, Math.min(0, cur)); apply(nx, false); return nx; }); };
    onResize();
    const t1 = setTimeout(onResize, 250), t2 = setTimeout(onResize, 1000);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div className="lp-row lp-reveal" data-par={par}>
      <button className="lp-row__arrow lp-row__arrow--prev" aria-label="Previous" data-dim={x >= 0 ? "" : undefined} onClick={() => step(-1)}><LpArrowL /></button>
      <div className="lp-row__view" ref={viewRef}>
        <div className="lp-row__track" ref={trackRef}>{children}</div>
      </div>
      <button className="lp-row__arrow lp-row__arrow--next" aria-label="Next" data-dim={x <= lim ? "" : undefined} onClick={() => step(1)}><LpArrowR /></button>
    </div>
  );
}

function LpHead({ eyebrow, title, blurb, par }) {
  return (
    <div className="lp-head lp-reveal" data-par={par}>
      <div className="lp-head__eyebrow">{eyebrow}</div>
      <h2 className="lp-head__title lp-title-fill">{title}</h2>
      {blurb && <p className="lp-head__blurb">{blurb}</p>}
    </div>
  );
}

// Editorial section banner — full-bleed cinematic still with the section
// title in a card straddling the bottom edge (gold accent bar), intro below.
function LpBanner({ img, eyebrow, title, blurb, side, compass }) {
  return (
    <div className="lp-banner lp-reveal">
      {side ? <div className="lp-banner__side" aria-hidden="true">{side}</div> : null}
      {compass ? (
        <div className="lp-banner__compass" aria-hidden="true">
          <svg viewBox="0 0 360 360" fill="none" stroke="currentColor">
            <circle cx="180" cy="180" r="150" strokeWidth="1.2" />
            <circle cx="180" cy="180" r="140" strokeWidth="7" strokeDasharray="1.6 13" opacity="0.85" />
            <circle cx="180" cy="180" r="112" strokeWidth="0.9" />
            <circle cx="180" cy="180" r="72" strokeWidth="0.9" />
            <path d="M180 24 L180 336 M24 180 L336 180" strokeWidth="0.8" opacity="0.55" />
            <path d="M52 52 L308 308 M308 52 L52 308" strokeWidth="0.6" opacity="0.35" />
            <path d="M180 40 L196 180 L180 320 L164 180 Z" fill="currentColor" fillOpacity="0.18" stroke="none" />
            <path d="M40 180 L180 196 L320 180 L180 164 Z" fill="currentColor" fillOpacity="0.12" stroke="none" />
            <circle cx="180" cy="180" r="7" fill="currentColor" fillOpacity="0.55" stroke="none" />
          </svg>
        </div>
      ) : null}
      <div className="lp-banner__media">
        <img src={img} alt="" aria-hidden="true" />
        <div className="lp-banner__vig" />
      </div>
      <div className="lp-banner__card">
        {eyebrow ? <div className="lp-banner__eyebrow">{eyebrow}</div> : null}
        <h2 className="lp-banner__title">{title}</h2>
        <div className="lp-banner__bar" />
      </div>
      {blurb ? <p className="lp-banner__blurb">{blurb}</p> : null}
    </div>
  );
}

/* ============ THE BOOK OF IGNORANCE ============ */
const BOOK_CHAPTERS = [
  { no: "01", title: "On Not Knowing",      line: "Why the first act of wisdom is to lay down the weight of certainty.", img: "film1", file: "assets/film/photo-1.jpg" },
  { no: "02", title: "The Unfinished Wall", line: "Leaving a door in every belief, so the weather of truth can pass through.", img: "film2", file: "assets/film/photo-2.jpg" },
  { no: "03", title: "Wonder",              line: "To meet the world as if for the first time, and the thousandth.", img: "film3", file: "assets/film/photo-3.jpg" },
  { no: "04", title: "Humility",            line: "The wisest sentence I know still ends in a question.", img: "film4", file: "assets/film/photo-4.jpg" },
  { no: "05", title: "Surrender",           line: "Not defeat — the art of letting the river carry what you cannot.", img: "film5", file: "assets/film/photo-5.jpg" },
  { no: "06", title: "Presence",            line: "The only country I have never been exiled from is now.", img: "film6", file: "assets/film/photo-6.jpg" },
  { no: "07", title: "Devotion",            line: "To return, and return, to the thing that asks everything of you.", img: "film7", file: "assets/film/photo-7.jpg" },
  { no: "08", title: "The Strange Beauty",  line: "On uncertainty as the last open field where meaning is still allowed to grow.", img: "film8", file: "assets/film/photo-8.jpg" },
];

function BookOfIgnorance({ virtues, bg, onCta }) {
  const ref = useLpReveal();
  return (
    <section className="lp-sec lp-sec--book lp-grain" id="book-of-ignorance" data-screen-label="The Book of Ignorance" ref={ref}>
      <div className="lp-seam-top" />
      <LpBanner img={bg || LR("parchmentDesk", "assets/opt/parchment-desk.jpg")}
        side="The Book of Ignorance"
        compass={true}
        eyebrow="A Living Framework · A Book of Virtues"
        title={<span>The Book of Ignorance</span>}
        blurb={<span>Not a doctrine but a practice — a living framework built on a single idea: that truth cannot be possessed, only passed through. A paradigm-shifting book of virtues to attune to, the way a sailor attunes to weather.</span>} />
      <LpRow par="0.04">
        {BOOK_CHAPTERS.map((c, i) => (
          <div className="lp-chapter" key={i} onClick={onCta} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onCta(); }}>
            <div className="lp-chapter__content">
              <div className="lp-chapter__no" aria-hidden="true">{c.no}</div>
              <div className="lp-chapter__tag">Chapter {c.no}</div>
              <h3 className="lp-chapter__title">{c.title}</h3>
              <p className="lp-chapter__line">{c.line}</p>
              <span className="lp-chapter__read">Read<span aria-hidden="true">→</span></span>
            </div>
          </div>
        ))}
      </LpRow>
      <div className="lp-book__cta-wrap lp-reveal">
        <button className="lp-cta lp-cta--gold" onClick={onCta}>Explore The Book of Ignorance<span className="arr">→</span></button>
      </div>
    </section>
  );
}

/* ============ POETRY ============ */
function PoetryRow({ poems, onOpen }) {
  const ref = useLpReveal();
  return (
    <section className="lp-sec lp-sec--poetry" id="poetry" data-screen-label="Poetry" ref={ref}>
      <div className="lp-seam-top" />
      <LpBanner img={LR("poetryBg", "assets/poetry-bg.jpg")}
        side="Poetry"
        eyebrow="Sixteen Pages · Fullscreen Reading"
        title="Poetry"
        blurb={<span>Fragments of meaning written down before they disappeared. Pull one from the desk — it opens into a quiet, fullscreen room built for a single poem.</span>} />
      <LpRow par="0.04">
        {poems.map((p, i) => (
          <div className="lp-poem" key={i} onClick={() => onOpen(i)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onOpen(i); }}>
            <div className="lp-poem__no">{p.no}</div>
            <h3 className="lp-poem__title">{p.title}</h3>
            <p className="lp-poem__excerpt">{(p.lines.filter(Boolean).slice(0, 3)).join(" / ")}</p>
            <div className="lp-poem__foot">
              <span className="lp-poem__tag">{p.tag}</span>
              <span className="lp-poem__read">Read<span aria-hidden="true">→</span></span>
            </div>
          </div>
        ))}
      </LpRow>
    </section>
  );
}

/* ============ ESSAYS ============ */
const ESSAY_IMGS = [
  ["film1", "assets/film/photo-1.jpg"], ["ipInevitable", "assets/ip/inevitable.jpg"],
  ["film3", "assets/film/photo-3.jpg"], ["ipProsopagnosia", "assets/ip/prosopagnosia.jpg"],
  ["film5", "assets/film/photo-5.jpg"], ["ipFated", "assets/ip/fated.jpg"],
  ["film7", "assets/film/photo-7.jpg"], ["ipJuiced", "assets/ip/juiced.jpg"],
];

function EssaysSection({ essays, onOpen }) {
  const ref = useLpReveal();
  return (
    <section className="lp-sec lp-sec--essays lp-grain" id="essays" data-screen-label="Articles & Blog" ref={ref}>
      <div className="lp-seam-top" />
      <LpBanner img={LR("essaysBg", "assets/essays-bg.jpg")}
        side="Articles & Blog"
        eyebrow="Transmissions · Field Notes"
        title="Articles & Blog"
        blurb={<span>Not a blog — a frequency. Observations, meditations, and field notes filed from the edge of what Ted is still trying to understand.</span>} />
      <LpRow par="0.035">
        {essays.map((e, i) => {
          return (
            <div className="lp-essay lp-reveal" key={i} onClick={() => onOpen(e.title)} role="button" tabIndex={0}
              onKeyDown={(ev) => { if (ev.key === "Enter") onOpen(e.title); }}>
              <div className="lp-essay__meta">
                <h3 className="lp-essay__title">{e.title}</h3>
                <div className="lp-essay__date">{e.date}</div>
              </div>
              <span className="lp-essay__quill" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none">
                  <path d="M40 8C29 11 19 20 15 31l3.5 3.5C29 30 38 20 41 9z" fill="rgba(232,183,119,0.16)" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M16 31c3-6 8-11 15-15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
                  <path d="M15 31l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M9 40c1.6-2 3-3.4 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M27 38c2.5 1.2 6 1 8.5-1.2 2.6-2.3 3-5.6 2-8.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <ellipse cx="33.5" cy="40.5" rx="6.5" ry="2.4" fill="currentColor" opacity="0.18" />
                </svg>
              </span>
            </div>
          );
        })}
      </LpRow>
    </section>
  );
}

/* ============ TEDTHOUGHTS ============ */
const TT_DATES = ["5/21", "5/20", "5/18", "5/15", "5/12", "5/09", "5/06", "5/02", "4/28", "4/24", "4/19", "4/15"];
function TedThoughts({ thoughts, onCta }) {
  const ref = useLpReveal();
  return (
    <section className="lp-sec lp-sec--thoughts lp-grain" id="tedthoughts" data-screen-label="TedThoughts" ref={ref}>
      <div className="lp-env"><div className="lp-env__veil" /></div>
      <div className="lp-seam-top" />
      <LpBanner img={LR("thoughtsBg", "assets/tedthoughts-bg.jpg")}
        side="TedThoughts"
        eyebrow="Epiphanies · Thought Sparks"
        title="TedThoughts"
        blurb={<span>Short philosophical fragments — aphorisms caught mid-flight. Scattered, discovered, alive.</span>} />
      <LpRow par="0.035">
        {thoughts.map((t, i) => (
          <div className="lp-tt" key={i}>
            <span className="lp-tt__date">{TT_DATES[i % TT_DATES.length]}</span>
            <p className="lp-tt__quote">{t}</p>
          </div>
        ))}
      </LpRow>
      <div className="lp-ttcta lp-reveal">
        <button className="lp-cta lp-cta--gold" onClick={onCta}>Follow TedThoughts<span className="arr">→</span></button>
      </div>
    </section>
  );
}

/* ============ WORLDBUILDING ============ */
function Worldbuilding({ worlds, bg, onOpen }) {
  const ref = useLpReveal();
  return (
    <section className="lp-sec lp-sec--worlds" id="worldbuilding" data-screen-label="Worldbuilding" ref={ref}>
      <div className="lp-env"><img className="lp-poster lp-poster--par" src={bg} alt="" aria-hidden="true" data-par="0.12" /><div className="lp-env__veil" /></div>
      <div className="lp-seam-top" />
      <LpBanner img={bg}
        side="Worldbuilding"
        eyebrow="Unfinished Universes"
        title="Worldbuilding"
        blurb={<span>A drawer of symbolic systems, archetypes, and maps — cosmologies still being drawn. Each card is the seed of a world Ted is building toward.</span>} />
      <LpRow par="0.04">
        {worlds.map((w, i) => (
          <div className="lp-world" key={i} onClick={() => onOpen(w.title)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onOpen(w.title); }}>
            <div className="lp-world__art">
              <img src={LR(w.img, "assets/cosmic-bg.png")} alt={w.title} />
              <div className="lp-world__inner">
                <h3 className="lp-world__title">{w.title}</h3>
                <span className="lp-world__kind">{w.kind}</span>
              </div>
            </div>
          </div>
        ))}
      </LpRow>
    </section>
  );
}

/* ============ FILMS — past & future ============ */
function FilmCard({ f, onPlay }) {
  return (
    <div className="lp-film" onClick={() => onPlay(f.title)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") onPlay(f.title); }}>
      <div className="lp-film__art">
        <img src={LR(f.img, "assets/cosmic-bg.png")} alt={f.title} />
        <div className="lp-film__play"><LpPlay /></div>
        <div className="lp-film__desc">{f.note}</div>
      </div>
      <div className="lp-film__meta">
        <h3 className="lp-film__title">{f.title}</h3>
        <div className="lp-film__sub">{f.year} · {f.cat}</div>
      </div>
    </div>
  );
}

function FilmsSection({ past, future, onPlay }) {
  const ref = useLpReveal();
  const films = [].concat(past, future).map((f, i) => ({
    id: "film-" + i,
    title: f.title,
    meta: f.year + " · " + f.cat,
    description: f.note,
    imageSrc: LR(f.img, "assets/cosmic-bg.png"),
    videoUrl: "",
  }));
  return (
    <section className="lp-sec lp-sec--films lp-grain" id="films" data-screen-label="Films" ref={ref}>
      <div className="lp-seam-top" />
      <LpBanner img={LR("filmStill", "assets/opt/film-still.jpg")}
        eyebrow="Moving Pictures · The Archive & The Horizon"
        title="Films"
        blurb={<span>Where the philosophy becomes light and motion. Work already cast into the world, and worlds still waiting to be filmed.</span>} />
      <div className="lp-films-rail lp-reveal">
        <FocusRail items={films} loop={true} arrows={true}
          controlsCta={<button className="lp-cta lp-cta--gold" onClick={() => onPlay("Explore all films")}>Explore all films<span className="arr">→</span></button>} />
      </div>
    </section>
  );
}

Object.assign(window, { LpRow, LpHead, LpBanner, useLpReveal, BookOfIgnorance, PoetryRow, EssaysSection, TedThoughts, Worldbuilding, FilmsSection });
