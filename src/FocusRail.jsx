// FocusRail.jsx — cinematic 3D coverflow, ported from the 21st.dev
// "Focus Rail" (framer-motion/next) to dependency-free React + CSS,
// restyled into the Ted Saunders bronze-on-black vibe.
const { useState, useRef, useCallback, useEffect } = React;

function frWrap(min, max, v) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

// Striped poster placeholder — warm dark field, hairline stripes, and a
// monospace note marking where real concept art should be dropped.
function frPoster(title, i) {
  const hues = ["#2A1C10", "#241A12", "#2E1E11", "#201611"];
  const bg = hues[i % hues.length];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='${bg}'/>
        <stop offset='100%' stop-color='#000000'/>
      </linearGradient>
      <pattern id='s' width='26' height='26' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'>
        <rect width='26' height='26' fill='transparent'/>
        <line x1='0' y1='0' x2='0' y2='26' stroke='rgba(209,157,99,0.10)' stroke-width='1'/>
      </pattern>
    </defs>
    <rect width='600' height='800' fill='url(#g)'/>
    <rect width='600' height='800' fill='url(#s)'/>
    <text x='44' y='720' font-family='ui-monospace, monospace' font-size='17' letter-spacing='2' fill='rgba(209,157,99,0.55)'>CONCEPT ART</text>
    <text x='44' y='748' font-family='ui-monospace, monospace' font-size='14' letter-spacing='1' fill='rgba(255,234,202,0.30)'>${title.toUpperCase()}</text>
  </svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

function FocusRail({ items, initialIndex = 0, loop = true, header = null, controlledActive = null, onStep = null, controlsCta = null, arrows = false }) {
  const [internalActive, setInternalActive] = useState(initialIndex);
  const [playing, setPlaying] = useState(null);
  const drag = useRef(null);
  const frRef = useRef(null);
  const lastWheel = useRef(0);
  const count = items.length;
  const controlled = controlledActive != null;
  const active = controlled ? controlledActive : internalActive;
  const activeIndex = frWrap(0, count, active);
  const activeItem = items[activeIndex];

  const prev = useCallback(() => { controlled ? (onStep && onStep(-1)) : setInternalActive((p) => (!loop && p === 0) ? p : p - 1); }, [controlled, onStep, loop]);
  const next = useCallback(() => { controlled ? (onStep && onStep(1)) : setInternalActive((p) => (!loop && p === count - 1) ? p : p + 1); }, [controlled, onStep, loop, count]);
  const stepBy = (d) => { controlled ? (onStep && onStep(d)) : setInternalActive((p) => p + d); };

  // Horizontal-only wheel/trackpad navigation (only when NOT scroll-controlled;
  // in pinned/controlled mode the page scroll drives the active card).
  useEffect(() => {
    if (controlled) return;
    const el = frRef.current;
    if (!el) return;
    const onWheelNative = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current < 240) return;
      if (Math.abs(e.deltaX) > 10) { e.deltaX > 0 ? next() : prev(); lastWheel.current = now; }
    };
    el.addEventListener("wheel", onWheelNative, { passive: false });
    return () => el.removeEventListener("wheel", onWheelNative);
  }, [next, prev, controlled]);

  const onKey = (e) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };

  const onPointerDown = (e) => { if (controlled) return; drag.current = { x: e.clientX, moved: false }; };
  const onPointerUp = (e) => {
    if (controlled || !drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 60) dx < 0 ? next() : prev();
    drag.current = null;
  };

  const visible = [-2, -1, 0, 1, 2];

  return (
    <div className="fr" tabIndex={0} onKeyDown={onKey} ref={frRef}>
      {/* Ambient blurred backdrop of the active poster — spans the whole
          section (incl. the header) and fades to black top + bottom. */}
      <div className="fr-amb" key={"amb-" + activeItem.id}>
        <img src={activeItem.imageSrc} alt="" />
        <div className="fr-amb__veil" />
      </div>

      {header && <div className="fr-header">{header}</div>}

      <div className="fr-stage">
        {arrows && (
          <button className="fr-arrow fr-arrow--prev" aria-label="Previous" onClick={prev}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
        )}
        {arrows && (
          <button className="fr-arrow fr-arrow--next" aria-label="Next" onClick={next}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
        <div className="fr-rail" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
          {visible.map((offset) => {
            const abs = active + offset;
            const index = frWrap(0, count, abs);
            const item = items[index];
            if (!loop && (abs < 0 || abs >= count)) return null;
            const isCenter = offset === 0;
            const dist = Math.abs(offset);
            const style = {
              transform: `translate(-50%, -50%) translateX(${offset * 300}px) translateZ(${-dist * 180}px) rotateY(${offset * -20}deg) scale(${isCenter ? 1 : 0.85})`,
              opacity: isCenter ? 1 : Math.max(0.12, 1 - dist * 0.5),
              filter: `blur(${isCenter ? 0 : dist * 5}px) brightness(${isCenter ? 1 : 0.5})`,
              zIndex: 20 - dist,
            };
            return (
              <div key={abs} className={"fr-card" + (isCenter ? " is-center" : "")} style={style}
                   onClick={() => { offset !== 0 ? stepBy(offset) : setPlaying(item); }}>
                <img src={item.imageSrc} alt={item.title} draggable="false" />
                <div className="fr-card__sheen" />
                {isCenter && (
                  <button className="fr-play" aria-label={"Play " + item.title}
                          onClick={(e) => { e.stopPropagation(); setPlaying(item); }}>
                    <PlayTriangle size={30} id="frPlay" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="fr-info">
          <div className="fr-info__text" key={"t-" + activeItem.id}>
            {activeItem.meta && <span className="fr-meta">{activeItem.meta}</span>}
            <h3 className="fr-title">{activeItem.title}</h3>
            {activeItem.description && <p className="fr-desc">{activeItem.description}</p>}
          </div>

          <div className="fr-controls">
            {arrows && (
              <div className="fr-dots" role="tablist" aria-label="Select work">
                {items.map((it, i) => (
                  <button key={it.id || i}
                          className={"fr-dot" + (i === activeIndex ? " is-active" : "")}
                          aria-label={it.title}
                          aria-selected={i === activeIndex}
                          onClick={() => stepBy(i - active)} />
                ))}
              </div>
            )}
            {controlsCta}
          </div>
        </div>
      </div>

      {playing && <FRLightbox item={playing} onClose={() => setPlaying(null)} />}
    </div>
  );
}

// Fullscreen video lightbox. Renders a YouTube/Vimeo embed when item.videoUrl
// is set; otherwise a placeholder frame marking where the embed will live.
function FRLightbox({ item, onClose }) {
  useEffect(() => {
    const onEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);
  return (
    <div className="fr-lb" onClick={onClose}>
      <button className="fr-lb__close" onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <div className="fr-lb__frame" onClick={(e) => e.stopPropagation()}>
        {item.videoUrl ? (
          <iframe src={item.videoUrl} title={item.title} frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
        ) : (
          <div className="fr-lb__placeholder">
            <PlayTriangle size={56} id="frLbPlay" />
            <div className="fr-lb__meta">{item.meta}</div>
            <div className="fr-lb__title">{item.title}</div>
            <div className="fr-lb__note">YOUTUBE / VIMEO EMBED — drop the video URL here</div>
          </div>
        )}
      </div>
    </div>
  );
}

window.FocusRail = FocusRail;
window.frPoster = frPoster;
