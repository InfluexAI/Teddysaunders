// WkClosing.jsx — cinematic closing CTA. Full-bleed parallax "directing on the
// bridge" frame, espresso aura, film grain, a textured invitation headline and
// dual CTAs, closed by the compass-disc divider.
const { useRef: useClsRef, useEffect: useClsEffect } = React;

function WkClosing({ onBegin, onPortfolio }) {
  const bgRef = useClsRef(null);
  const rootRef = useClsRef(null);
  useClsEffect(() => {
    const bg = bgRef.current, root = rootRef.current;
    if (!bg || !root) return;
    const onScroll = () => {
      const r = root.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const prog = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      bg.style.transform = "translateY(" + ((prog - 0.5) * 80) + "px)";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="wk2-close" ref={rootRef} aria-label="Work with Ted">
      <div className="wk2-close__bg" ref={bgRef} aria-hidden="true">
        <img src="assets/story-bridge.jpg" alt="" />
      </div>
      <div className="wk2-close__aura" aria-hidden="true"></div>
      <div className="wk2-close__scrim" aria-hidden="true"></div>
      <div className="wk-dust" aria-hidden="true"></div>
      <div className="wk2-grain" aria-hidden="true"></div>

      <div className="wk2-close__inner wk-reveal">
        <p className="wk2-close__eyebrow">The Invitation</p>
        <h2 className="wk2-close__title wk2-textured">The next story<br />is yours</h2>
        <p className="wk2-close__sub">Every great work begins with a single conversation.</p>
        <p className="wk2-close__body">
          Tell Ted where you are and where you&rsquo;re trying to go. Whichever door you
          walk through, the work starts the same way &mdash; with the truth, and a plan to build on it.
        </p>
        <div className="wk2-close__cta">
          <button className="wk-btn wk-btn--solid" onClick={onBegin}>
            Begin a Conversation
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
          <button className="wk-btn wk-btn--ghost" onClick={onPortfolio}>
            Explore the Portfolio
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M7 17 17 7M9 7h8v8" /></svg>
          </button>
        </div>
        <div className="wk2-close__divider" aria-hidden="true">
          <div className="rule"></div>
          <img className="wk2-close__disc" src="assets/logo-mark.png" alt="" />
          <div className="rule"></div>
        </div>
      </div>
    </section>
  );
}

window.WkClosing = WkClosing;
