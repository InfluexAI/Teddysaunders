// ============================================================
//  FilmsSections — the cinematic environments of the Films page.
//  Reusable reveal hook + row + editorial banner (emit lit-page
//  markup so they inherit .lp-banner / .lp-row styling), plus the
//  Reels block, the three project rails, the TEDFLIX viewing
//  experience and its fullscreen player. Exposed on window.
// ============================================================
const { useRef: useFsRef, useEffect: useFsEffect, useState: useFsState, useCallback: useFsCb } = React;
const FS_R = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

function FsPlay() { return (<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="7,4 21,12 7,20" /></svg>); }
function FsArrowR() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>); }
function FsArrowL() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>); }

// Reveal-on-scroll — safety interval so content never strands hidden.
function useFpReveal() {
  const ref = useFsRef(null);
  useFsEffect(() => {
    const el = ref.current; if (!el) return;
    const show = (n) => {
      if (n.classList.contains("is-in")) return;
      n.classList.add("is-in");
      setTimeout(() => { n.style.transition = "none"; n.style.opacity = "1"; if (!n.hasAttribute("data-par")) n.style.transform = "none"; }, 1100);
    };
    const reveal = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      el.querySelectorAll(".lp-reveal").forEach((n) => { const r = n.getBoundingClientRect(); if (r.top < vh * 0.93 && r.bottom > 0) show(n); });
    };
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    const iv = setInterval(reveal, 500);
    return () => { window.removeEventListener("scroll", reveal); window.removeEventListener("resize", reveal); clearInterval(iv); };
  }, []);
  return ref;
}

// Horizontal browse row with ‹ › arrows (transform-driven) — mirrors LpRow.
function FpRow({ children }) {
  const viewRef = useFsRef(null);
  const trackRef = useFsRef(null);
  const [x, setX] = useFsState(0);
  const [lim, setLim] = useFsState(0);
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
  useFsEffect(() => {
    const onResize = () => { const min = measure(); setLim(min); setX((cur) => { const nx = Math.max(min, Math.min(0, cur)); apply(nx, false); return nx; }); };
    onResize();
    const t1 = setTimeout(onResize, 250), t2 = setTimeout(onResize, 1000);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div className="lp-row lp-reveal">
      <button className="lp-row__arrow lp-row__arrow--prev" aria-label="Previous" data-dim={x >= 0 ? "" : undefined} onClick={() => step(-1)}><FsArrowL /></button>
      <div className="lp-row__view" ref={viewRef}>
        <div className="lp-row__track" ref={trackRef}>{children}</div>
      </div>
      <button className="lp-row__arrow lp-row__arrow--next" aria-label="Next" data-dim={x <= lim ? "" : undefined} onClick={() => step(1)}><FsArrowR /></button>
    </div>
  );
}

// Editorial banner — full-bleed still + overlapping title card (lp-banner markup).
function FpBanner({ img, side, eyebrow, title, blurb }) {
  return (
    <div className="lp-banner lp-reveal">
      {side ? <div className="lp-banner__side" aria-hidden="true">{side}</div> : null}
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

/* ===================== WATCH THE REELS ===================== */
function ReelsSection({ reels, onPlay }) {
  const ref = useFpReveal();
  return (
    <section className="fp-reels lp-grain" data-screen-label="Watch the Reels" ref={ref}>
      <div className="fp-reels__aura" aria-hidden="true" />
      <div className="fp-reels__head lp-reveal">
        <div className="fp-eyebrow">Ted's Showreels</div>
        <h2 className="fp-reels__title">Watch the Reels</h2>
        <p className="fp-reels__sub">Two minutes to feel the whole universe. The live-action reel for fire and faces; the motion-graphics reel for light and geometry in motion.</p>
      </div>
      <div className="fp-reels__grid">
        {reels.map((r) => (
          <div className="fp-reel lp-reveal" key={r.id} onClick={() => onPlay(r)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onPlay(r); }}>
            <img src={FS_R(r.thumb, "assets/cosmic-bg.png")} alt={r.title} />
            <div className="fp-reel__run">{r.run}</div>
            <div className="fp-reel__play"><PlayTriangle size={36} id={"reelpl-" + r.id} /></div>
            <div className="fp-reel__meta">
              <div className="fp-reel__kicker">{r.kicker}</div>
              <h3 className="fp-reel__name">{r.title}</h3>
              <p className="fp-reel__line">{r.line}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===================== PROJECT RAIL (festival / commercial / experimental) ===================== */
function ProjectRail({ rail, films, onOpen, onCta, screenLabel }) {
  const ref = useFpReveal();
  return (
    <section className="lp-sec lp-sec--filmrail lp-grain" data-screen-label={screenLabel} ref={ref}>
      <div className="lp-seam-top" />
      <FpBanner img={FS_R(rail.bg, "assets/film-still.jpg")} side={rail.eyebrow}
        eyebrow={rail.eyebrow} title={rail.title} blurb={rail.blurb} />
      <FpRow>
        {films.map((f) => (
          <div className="fp-card" key={f.id} onClick={() => onOpen(f.id)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onOpen(f.id); }}>
            <div className="fp-card__art">
              <img src={FS_R(f.thumb, "assets/cosmic-bg.png")} alt={f.title} />
              <div className="fp-card__play"><FsPlay /></div>
            </div>
            <div className="fp-card__meta">
              <h3 className="fp-card__title">{f.title}</h3>
              <div className="fp-card__sub">{f.sub} · {f.year}</div>
            </div>
          </div>
        ))}
      </FpRow>
      <div className="fp-rail-cta lp-reveal">
        <button className="lp-cta lp-cta--gold" onClick={() => onCta(rail.filter)}>{rail.cta}<span className="arr">→</span></button>
      </div>
    </section>
  );
}

/* ===================== TEDFLIX — viewing experience ===================== */
function TedflixSection({ films, onPlay }) {
  const ref = useFpReveal();
  const [shuffle, setShuffle] = useFsState(false);
  const strip = films.slice(0, 7);
  return (
    <section className="tflix lp-grain" data-screen-label="Tedflix" id="tedflix" ref={ref}>
      <div className="tflix__seam" />
      <div className="tflix__bg" aria-hidden="true">
        <img src={FS_R("tflixBg", "assets/tedcastbg.jpg")} alt="" />
      </div>
      <div className="tflix__inner lp-reveal">
        <img className="tflix__logo" src={FS_R("tedflixLogo", "assets/tedflix-logo.png")} alt="TEDFLIX" />
        <p className="tflix__lede">A cinematic playlist to sit back and enjoy.</p>
        <p className="tflix__desc">Full-screen, one film flowing into the next — no menus, no choosing, just the work. Lean back and let it run.</p>
        <div className="tflix__controls">
          <button className="tflix__play" onClick={() => onPlay(shuffle)}>
            <PlayTriangle size={22} id="tflixPlay" />Play from the Beginning
          </button>
          <div className={"tflix__shuffle" + (shuffle ? " is-on" : "")} role="switch" aria-checked={shuffle} tabIndex={0}
            onClick={() => setShuffle((s) => !s)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setShuffle((s) => !s); } }}>
            <span className="tflix__switch" aria-hidden="true" />Shuffle all films
          </div>
        </div>
        <div className="tflix__strip lp-reveal" aria-hidden="true">
          {strip.map((f) => (
            <div className="tflix__chip" key={f.id} onClick={() => onPlay(shuffle, f.id)}>
              <img src={FS_R(f.thumb, "assets/cosmic-bg.png")} alt="" />
              <span>{f.title}</span>
            </div>
          ))}
        </div>
        <p className="tflix__note">Films skip forward freely. With <b>shuffle on</b>, the next film is random; with it off, they follow the order. <i>The full playlist will be delivered by Ted.</i></p>
      </div>
    </section>
  );
}

/* ---- Fullscreen TEDFLIX player ---- */
function TedflixPlayer({ open, films, shuffle, startId, onClose }) {
  const [order, setOrder] = useFsState([]);
  const [pos, setPos] = useFsState(0);
  const [cycle, setCycle] = useFsState(0); // bumps to restart the progress bar

  const buildOrder = useFsCb(() => {
    const ids = films.map((f) => f.id);
    let ord = ids.slice();
    if (shuffle) { for (let i = ord.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ord[i], ord[j]] = [ord[j], ord[i]]; } }
    let start = 0;
    if (startId) { const k = ord.indexOf(startId); if (k >= 0) start = k; }
    return { ord, start };
  }, [films, shuffle, startId]);

  // (re)build order whenever the player opens
  useFsEffect(() => {
    if (!open) return;
    const { ord, start } = buildOrder();
    setOrder(ord); setPos(start); setCycle((c) => c + 1);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setPos((p) => { setCycle((c) => c + 1); return (p + 1) % ord.length; });
      if (e.key === "ArrowLeft") setPos((p) => { setCycle((c) => c + 1); return (p - 1 + ord.length) % ord.length; });
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  // persist position
  useFsEffect(() => {
    if (!open || !order.length) return;
    try { localStorage.setItem("tedflix-pos", JSON.stringify({ id: order[pos], shuffle })); } catch (e) {}
  }, [open, order, pos, shuffle]);

  // auto-advance every 8s (simulated film length)
  useFsEffect(() => {
    if (!open || !order.length) return;
    const t = setTimeout(() => { setPos((p) => (p + 1) % order.length); setCycle((c) => c + 1); }, 8000);
    return () => clearTimeout(t);
  }, [open, order, pos, cycle]);

  if (!open) return null;
  const film = (window.FILM_BY_ID || {})[order[pos]] || films[0] || {};
  const next = () => { setPos((p) => (p + 1) % order.length); setCycle((c) => c + 1); };
  const prev = () => { setPos((p) => (p - 1 + order.length) % order.length); setCycle((c) => c + 1); };

  return ReactDOM.createPortal(
    <div className={"tplayer is-open"} role="dialog" aria-modal="true" aria-label="Tedflix player">
      <div className="tplayer__count">{String(pos + 1).padStart(2, "0")} <b>/ {String(order.length).padStart(2, "0")}</b></div>
      <button className="tplayer__close" aria-label="Close" onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
      </button>
      <div className="tplayer__stage">
        <div className="tplayer__frame" key={film.id}><img src={FS_R(film.thumb, "assets/cosmic-bg.png")} alt="" /></div>
        <div className="tplayer__center">
          <div className="tplayer__playicon"><PlayTriangle size={42} id="tplayBig" /></div>
          <div className="tplayer__nowtag">Now Playing</div>
          <h2 className="tplayer__nowtitle">{film.title}</h2>
          <p className="tplayer__nowsub">{film.sub} · {film.year} · {film.run}</p>
          <p className="tplayer__embednote">Fullscreen video plays here — drop the film URL</p>
        </div>
      </div>
      <div className="tplayer__bar">
        <button className="tplayer__btn" aria-label="Previous" onClick={prev}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zM20 6v12l-9-6z" /></svg>
        </button>
        <button className="tplayer__btn" aria-label="Skip forward" onClick={next}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 6h2v12h-2zM4 6v12l9-6z" /></svg>
        </button>
        <div className="tplayer__progress"><i key={cycle} /></div>
        <div className="tplayer__shuffle">{shuffle ? <span>Shuffle <b>On</b></span> : <span>In Order</span>}</div>
      </div>
    </div>, document.body);
}

/* ---- Simple reel / film video lightbox ---- */
function FilmLightbox({ item, onClose }) {
  useFsEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  if (!item) return null;
  return ReactDOM.createPortal(
    <div className="fr-lb" onClick={onClose}>
      <button className="fr-lb__close" onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <div className="fr-lb__frame" onClick={(e) => e.stopPropagation()}>
        {item.videoUrl ? (
          <iframe src={item.videoUrl} title={item.title} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
        ) : (
          <div className="fr-lb__placeholder">
            <PlayTriangle size={56} id="filmLbPlay" />
            <div className="fr-lb__meta">{item.kicker || item.sub || "Reel"}</div>
            <div className="fr-lb__title">{item.title}</div>
            <div className="fr-lb__note">YOUTUBE / VIMEO EMBED — drop the video URL here</div>
          </div>
        )}
      </div>
    </div>, document.body);
}

Object.assign(window, { useFpReveal, FpRow, FpBanner, ReelsSection, ProjectRail, TedflixSection, TedflixPlayer, FilmLightbox });
