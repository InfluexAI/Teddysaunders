// ============================================================
//  LitReader — fullscreen poetry reading mode.
//  Black takeover, large Castoro type, slow fades, ambient
//  grain + warm aura, ‹ › page-turn nav, keyboard (←/→/Esc).
// ============================================================
const { useState: useRdState, useEffect: useRdEffect, useRef: useRdRef } = React;

function PoetryReader({ poems, index, onClose, onIndex }) {
  const open = index !== null && index !== undefined;
  const [shown, setShown] = useRdState(index || 0);   // poem currently rendered
  const [fading, setFading] = useRdState(false);
  const timer = useRdRef(null);

  // Cross-fade to a new poem when index changes.
  useRdEffect(() => {
    if (!open) return;
    if (index === shown) return;
    setFading(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setShown(index); setFading(false); }, 360);
    return () => clearTimeout(timer.current);
  }, [index]);

  // When (re)opening, sync immediately.
  useRdEffect(() => { if (open) setShown(index); }, [open]);

  // Lock scroll + keyboard nav while open.
  useRdEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onIndex((shown + 1) % poems.length);
      else if (e.key === "ArrowLeft") onIndex((shown - 1 + poems.length) % poems.length);
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, shown, poems.length]);

  const p = poems[shown] || poems[0];
  const go = (dir) => onIndex((shown + dir + poems.length) % poems.length);

  return (
    <div className={"lp-reader" + (open ? " is-open" : "")} aria-hidden={!open} role="dialog" aria-modal="true">
      <div className="lp-reader__aura" />
      <div className="lp-reader__grain" />

      <button className="lp-reader__close" aria-label="Close reader" onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
      </button>
      <button className="lp-reader__nav lp-reader__nav--prev" aria-label="Previous poem" onClick={() => go(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button className="lp-reader__nav lp-reader__nav--next" aria-label="Next poem" onClick={() => go(1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      <div className="lp-reader__stage">
        <div className={"lp-reader__page" + (fading ? " is-fading" : "")}>
          {p.no ? <div className="lp-reader__no">{p.no}</div> : null}
          {p.tag ? <div className="lp-reader__tag">{p.tag}</div> : null}
          {p.title ? <h2 className="lp-reader__title lp-title-fill">{p.title}</h2> : null}
          <div className="lp-reader__lines">
            {p.lines.map((ln, i) => <span className="ln" key={i}>{ln || "\u00A0"}</span>)}
          </div>
          <div className="lp-reader__sig">Ted Saunders</div>
        </div>
      </div>

      <div className="lp-reader__count"><b>{String(shown + 1).padStart(2, "0")}</b> / {String(poems.length).padStart(2, "0")}</div>
      <div className="lp-reader__hint" aria-hidden="true">← → to turn · Esc to close</div>
    </div>
  );
}

window.PoetryReader = PoetryReader;
