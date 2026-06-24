// FinancialStrategy.jsx — "The Treasure". The offering is locked inside a
// compass-marked treasure chest. The chest auto-opens the moment it scrolls
// into view (no click): it shakes, a shine sweeps across the metal, golden
// light bursts out, and the lid swings up to the open state — revealing the
// Wealth Framework. The strategy copy + CTAs then rise in beneath it.
//
// Phases:  0 closed · 1 shake + shine · 2 lid opens + light bursts · 3 copy in.
const { useState: useFvState, useRef: useFvRef, useEffect: useFvEffect } = React;

const CHEST_CLOSED = "assets/finance-chest-closed.png";
const CHEST_OPEN = "assets/finance-chest-open.png";

function FinancialStrategy({ onApply, onCoaching }) {
  const [phase, setPhase] = useFvState(0);
  const stageRef = useFvRef(null);
  const startedRef = useFvRef(false);
  const timers = useFvRef([]);
  const aliveRef = useFvRef(true);

  useFvEffect(() => () => { aliveRef.current = false; timers.current.forEach(clearTimeout); }, []);

  // Auto-open when the chest scrolls into view (no click). Triggers on the
  // slightest scroll: an IntersectionObserver, a one-time scroll listener, and
  // an initial in-view check all funnel into begin(), which fires once.
  useFvEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const set = (p) => { if (aliveRef.current) setPhase(p); };
    const begin = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      cleanup();
      if (rm) { set(3); return; }
      set(1);                                            // glow + shake + zoom in
      timers.current.push(setTimeout(() => set(2), 1050));  // lid opens, light bursts
      timers.current.push(setTimeout(() => set(3), 2150)); // chest nudges up, copy rises in
    };
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.82 && r.bottom > vh * 0.18;
    };
    const onScroll = () => { if (inView()) begin(); };

    const io = ("IntersectionObserver" in window)
      ? new IntersectionObserver((entries) => {
          entries.forEach((e) => { if (e.isIntersecting && e.intersectionRatio >= 0.25) begin(); });
        }, { threshold: [0.25, 0.5] })
      : null;
    if (io) io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    function cleanup() {
      if (io) io.disconnect();
      window.removeEventListener("scroll", onScroll);
    }
    // already in view on load? open shortly after mount.
    if (inView()) timers.current.push(setTimeout(begin, 400));
    return cleanup;
  }, []);

  return (
    <section className="tk-finance fin2" data-phase={phase}>
      <div className="fin2-atmos" aria-hidden="true">
        <div className="fin2-aura" />
        <div className="fin2-dust" />
        <div className="fin2-vignette" />
      </div>

      {/* ---------------- THE CHEST ---------------- */}
      <div className="fin2-stage" ref={stageRef}>
        <div className="chest2" aria-label="A compass-marked treasure chest opening">
          <div className="chest2__glow" aria-hidden="true" />
          <div className="chest2__rays" aria-hidden="true" />
          <img className="chest2__img chest2__img--closed" src={CHEST_CLOSED} alt="Locked treasure chest" />
          <img className="chest2__img chest2__img--open" src={CHEST_OPEN} alt="Open treasure chest revealing the Wealth Framework" />
          <div className="chest2__shine" aria-hidden="true" />
          <div className="chest2__sparks" aria-hidden="true" />
        </div>

        <div className="fin2-intro">
          <div className="fin2-eyebrow">Financial Strategy</div>
          <h2 className="vault-title">The Treasure</h2>
          <p className="vault-sub">Years of market cycles, risk frameworks, and wealth psychology distilled into a single philosophy.</p>
        </div>
      </div>

      {/* ---------------- THE REVEAL ---------------- */}
      <div className="fin2-reveal">
        <div className="fin2-chamber" aria-hidden="true" />
        <div className="fin2-inner">
          <header className="fin2-head">
            <h2 className="fin2-title">New money systems require a new mindset.</h2>
            <p className="fin2-sub">Stay ahead of the chain, mastering the future of finance.</p>
            <div className="fin2-body">
              <p>Ted Saunders has spent years navigating the decentralized financial landscape — studying market cycles, portfolio architecture, risk frameworks, and the psychology of wealth that most advisors won&rsquo;t touch.</p>
              <p>This isn&rsquo;t generic advice. It&rsquo;s a strategic conversation with someone who has lived the volatility, learned from it, and built a clear philosophy around it.</p>
            </div>
          </header>

          <div className="fin2-cta">
            <button className="fin2-btn fin2-btn--primary" onClick={onApply}>
              Apply for a Strategy Session
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
            <button className="fin2-btn fin2-btn--ghost" onClick={onCoaching}>
              Explore Men&rsquo;s Coaching
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

window.FinancialStrategy = FinancialStrategy;
