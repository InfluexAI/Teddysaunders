// ============================================================
//  FilmLibrary — the full archive. A filterable (AJAX-style) grid
//  of video cards; clicking a card opens the popup video module
//  (FilmVideoModule) with player, metadata, BTS, related articles
//  and three recommended similar films. Exposed on window.
// ============================================================
const { useState: useFlState, useEffect: useFlEffect, useRef: useFlRef } = React;
const FL_R = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

function FlPlay() { return (<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="7,4 21,12 7,20" /></svg>); }

// reveal-on-scroll for the grid cards
function useGridReveal(dep) {
  const ref = useFlRef(null);
  useFlEffect(() => {
    const el = ref.current; if (!el) return;
    const reveal = () => {
      const vh = window.innerHeight || 800;
      el.querySelectorAll(".vcard").forEach((n, i) => {
        const r = n.getBoundingClientRect();
        if (r.top < vh * 0.95 && r.bottom > 0 && !n.classList.contains("is-in")) {
          n.style.transitionDelay = Math.min(i, 8) * 40 + "ms";
          n.classList.add("is-in");
        }
      });
    };
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    const iv = setInterval(reveal, 400);
    return () => { window.removeEventListener("scroll", reveal); window.removeEventListener("resize", reveal); clearInterval(iv); };
  }, [dep]);
  return ref;
}

function FilmLibrary({ films, filters, active, onFilter, onOpen, libRef }) {
  // counts per filter
  const counts = {};
  filters.forEach((f) => { counts[f] = f === "All" ? films.length : films.filter((x) => x.tags.indexOf(f) >= 0).length; });
  const shown = active === "All" ? films : films.filter((f) => f.tags.indexOf(active) >= 0);
  const gridRef = useGridReveal(active);

  return (
    <section className="flib lp-grain" id="library" data-screen-label="The Library" ref={libRef}>
      <div className="flib__seam" />
      <div className="flib__head">
        <div className="fp-eyebrow">The Full Archive</div>
        <h2 className="flib__title">The Library</h2>
        <p className="flib__blurb">Every film, organized by category. Filter the archive, hover a card to preview, and click to open the film in full.</p>
      </div>

      <div className="flib__filters" role="tablist" aria-label="Filter films">
        {filters.map((f) => {
          const n = counts[f];
          const empty = n === 0;
          return (
            <button key={f} type="button" role="tab" aria-selected={active === f}
              className={"flib__chip" + (active === f ? " is-on" : "")}
              data-empty={empty ? "" : undefined}
              onClick={() => { if (!empty) onFilter(f); }}>
              {f}<span className="flib__chip-n">{empty ? "soon" : n}</span>
            </button>
          );
        })}
      </div>

      <div className="flib__count">Showing <b>{shown.length}</b> {shown.length === 1 ? "film" : "films"}{active !== "All" ? <span> in {active}</span> : null}</div>

      <div className="flib__grid" ref={gridRef}>
        {shown.length === 0 ? (
          <div className="flib__empty">More films coming to this category soon.</div>
        ) : shown.map((f) => (
          <article className="vcard" key={f.id} onClick={() => onOpen(f.id)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onOpen(f.id); }}>
            <div className="vcard__art">
              <img src={FL_R(f.thumb, "assets/cosmic-bg.png")} alt={f.title} />
              <div className="vcard__loop"><span className="dot" />Loop</div>
              <div className="vcard__run">{f.run}</div>
              <div className="vcard__play"><FlPlay /></div>
            </div>
            <div className="vcard__meta">
              <h3 className="vcard__title">{f.title}</h3>
              <span className="vcard__badge">{f.cat}</span>
            </div>
            <p className="vcard__desc">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ===================== POPUP VIDEO MODULE ===================== */
function SoundIcon() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinejoin="round" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12" strokeLinecap="round" /></svg>);
}
function ArrowIcon() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>); }
function LinkIcon() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" strokeLinecap="round" strokeLinejoin="round" /></svg>); }

function FilmVideoModule({ film, byId, onClose, onOpen }) {
  const scrollRef = useFlRef(null);
  useFlEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  // reset scroll + URL hash when the film changes
  useFlEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    if (film) { try { history.replaceState(null, "", "#portfolio/film/" + film.id); } catch (e) {} }
    return () => { try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} };
  }, [film && film.id]);
  if (!film) return null;

  const similar = (film.similar || []).map((id) => byId[id]).filter(Boolean).slice(0, 3);
  const shareUrl = "tedsaunders.com/portfolio/film/" + film.id;

  return ReactDOM.createPortal(
    <div className="fvm" role="dialog" aria-modal="true" aria-label={film.title} onClick={onClose}>
      <button className="fvm__x" aria-label="Close" onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
      </button>
      <div className="fvm__sheet" ref={scrollRef} onClick={(e) => e.stopPropagation()}>
        {/* player */}
        <div className="fvm__player">
          <img src={FL_R(film.thumb, "assets/cosmic-bg.png")} alt="" />
          <div className="fvm__sound"><SoundIcon />Sound On</div>
          <div className="fvm__playerc">
            <div className="fvm__bigplay"><PlayTriangle size={40} id={"fvmPlay-" + film.id} /></div>
            <div className="fvm__playernote">Autoplays with sound — drop the film URL here</div>
          </div>
        </div>

        <div className="fvm__body">
          {/* main column */}
          <div className="fvm__main">
            <div className="fvm__badge">{film.cat} · {film.sub}</div>
            <h2 className="fvm__title">{film.title}</h2>
            <div className="fvm__facts">
              <div className="fvm__fact"><b>{film.year}</b><span>Released</span></div>
              <div className="fvm__fact"><b>{film.run}</b><span>Runtime</span></div>
              {film.views && film.views !== "—" ? <div className="fvm__fact"><b>{film.views}</b><span>Views</span></div> : null}
              <div className="fvm__fact"><b style={{ fontSize: 18, fontWeight: 600, fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>{film.date}</b><span>Date Created</span></div>
            </div>

            <p className="fvm__desc">{film.long}</p>

            {film.bts ? (
              <React.Fragment>
                <div className="fvm__sub-h">Behind the Scenes</div>
                <div className="fvm__bts">
                  <div className="fvm__btsitem">
                    <img src={FL_R(film.thumb, "assets/cosmic-bg.png")} alt="" />
                    <div className="fvm__btsplay"><FlPlay /></div>
                    <span>BTS Film</span>
                  </div>
                  {film.trailer ? (
                    <div className="fvm__btsitem">
                      <img src={FL_R("filmStill", "assets/opt/film-still.jpg")} alt="" />
                      <div className="fvm__btsplay"><FlPlay /></div>
                      <span>Trailer</span>
                    </div>
                  ) : (
                    <div className="fvm__btsitem">
                      <img src={FL_R("railFestival", "assets/heroes/cinematographer-c.jpg")} alt="" />
                      <div className="fvm__btsplay"><FlPlay /></div>
                      <span>On Set</span>
                    </div>
                  )}
                </div>
                <div className="fvm__btsphotos" style={{ marginTop: 14 }}>
                  {["film2", "film4", "film6", "film8"].map((k, i) => (
                    <div className="fvm__photo" key={i}><img src={FL_R(k, "assets/cosmic-bg.png")} alt="" /></div>
                  ))}
                </div>
              </React.Fragment>
            ) : null}

            {film.articles && film.articles.length ? (
              <React.Fragment>
                <div className="fvm__sub-h">Related Articles & Case Studies</div>
                <div className="fvm__articles">
                  {film.articles.map((a, i) => (
                    <a className="fvm__article" key={i} href="#" onClick={(e) => e.preventDefault()}>
                      <span>{a}</span><ArrowIcon />
                    </a>
                  ))}
                </div>
              </React.Fragment>
            ) : null}
          </div>

          {/* sidebar — similar films */}
          <aside className="fvm__side">
            <div className="fvm__side-h">Three Similar Films</div>
            {similar.map((s) => (
              <div className="fvm__sim" key={s.id} onClick={() => onOpen(s.id)} role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") onOpen(s.id); }}>
                <div className="fvm__sim__art">
                  <img src={FL_R(s.thumb, "assets/cosmic-bg.png")} alt={s.title} />
                  <div className="fvm__sim__pl"><FlPlay /></div>
                </div>
                <div className="fvm__sim__meta">
                  <h4 className="fvm__sim__title">{s.title}</h4>
                  <div className="fvm__sim__sub">{s.cat} · {s.year}</div>
                </div>
              </div>
            ))}
            <div className="fvm__share" onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText("https://" + shareUrl); } catch (e) {} }}>
              <LinkIcon /><code>{shareUrl}</code>
            </div>
          </aside>
        </div>
      </div>
    </div>, document.body);
}

Object.assign(window, { FilmLibrary, FilmVideoModule });
