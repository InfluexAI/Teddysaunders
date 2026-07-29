// InsightsCTA.jsx — HOME SECTION 10, the finale. "See through a new lens."
// A cinematic aperture/iris opens behind the headline; a refined glass capture
// card holds the form. The aperture motif ties directly to the director theme.
const { useState: useInsState, useRef: useInsRef, useEffect: useInsEffect } = React;

function CompassDial() {
  // A navigator's compass: rotating tick ring + cardinal marks, a fixed
  // 8-point rose, and a slowly sweeping needle. Gold light on black.
  const cx = 250, cy = 250;
  const ticks = [];
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const major = i % 9 === 0;
    const r1 = major ? 196 : 206;
    ticks.push(
      <line key={i}
        x1={cx + Math.cos(a) * r1} y1={cy + Math.sin(a) * r1}
        x2={cx + Math.cos(a) * 216} y2={cy + Math.sin(a) * 216}
        stroke={major ? "rgba(232,201,138,0.7)" : "rgba(201,162,75,0.35)"}
        strokeWidth={major ? 1.6 : 0.8} />
    );
  }
  const cardinals = [["N", 0], ["E", 90], ["S", 180], ["W", 270]];
  return (
    <svg className="ins-compass" viewBox="0 0 500 500" aria-hidden="true">
      <circle cx={cx} cy={cy} r={232} fill="none" stroke="rgba(201,162,75,0.20)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={170} fill="none" stroke="rgba(201,162,75,0.16)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={170} fill="url(#insPupil)" />

      {/* rotating tick ring */}
      <g className="ins-compass__ring">{ticks}</g>

      {/* cardinal letters (counter-rotate-free, sit on inner ring) */}
      <g className="ins-compass__cardinals">
        {cardinals.map(([l, deg]) => {
          const a = (deg / 180) * Math.PI - Math.PI / 2;
          return (
            <text key={l} x={cx + Math.cos(a) * 150} y={cy + Math.sin(a) * 150 + 7}
              textAnchor="middle" className="ins-compass__card">{l}</text>
          );
        })}
      </g>

      {/* 8-point rose */}
      <g stroke="rgba(232,201,138,0.5)" strokeWidth="0.8" fill="none">
        <path d="M250 96 L266 250 L250 404 L234 250 Z" fill="rgba(247,219,160,0.06)" />
        <path d="M96 250 L250 234 L404 250 L250 266 Z" fill="rgba(247,219,160,0.05)" />
        <path d="M141 141 L250 250 L359 359 M359 141 L250 250 L141 359" strokeWidth="0.5" opacity="0.5" />
      </g>

      {/* sweeping needle — symmetric diamond centered on (250,250) */}
      <g className="ins-compass__needle">
        <path d="M250 124 L257 250 L243 250 Z" fill="#F4D58E" />
        <path d="M250 376 L257 250 L243 250 Z" fill="rgba(201,162,75,0.45)" />
      </g>
      <circle cx={cx} cy={cy} r="7" fill="#F7DBA0" stroke="rgba(120,74,30,0.6)" strokeWidth="1" />

      <defs>
        <radialGradient id="insPupil" cx="50%" cy="44%" r="62%">
          <stop offset="0%" stopColor="rgba(247,219,160,0.16)" />
          <stop offset="60%" stopColor="rgba(120,74,30,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function InsightsCTA({ onSubscribe, onConsult }) {
  const [form, setForm] = useInsState({ first: "", last: "", email: "" });
  const [sent, setSent] = useInsState(false);
  const rootRef = useInsRef(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); onSubscribe && onSubscribe(form); };

  // Reveal-on-scroll (robust inside / outside the scaled stage)
  useInsEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.82 && r.bottom > vh * 0.1) { el.classList.add("is-in"); window.removeEventListener("scroll", check, true); }
    };
    check();
    window.addEventListener("scroll", check, true);
    window.addEventListener("resize", check);
    return () => { window.removeEventListener("scroll", check, true); window.removeEventListener("resize", check); };
  }, []);

  return (
    <section className="tk-insights" ref={rootRef}>
      <div className="ins-bg" aria-hidden="true">
        <div className="ins-stars" />
        <div className="ins-glow" />
        <div className="ins-compass-wrap"><CompassDial /></div>
        <div className="ins-beam ins-beam--l" />
        <div className="ins-beam ins-beam--r" />
      </div>

      <div className="ins-inner">
        <div className="ins-text">
          <div className="ins-kicker">
            <span className="ins-kicker__star">&#10022;</span>
            <span>Get Free Insights</span>
            <span className="ins-kicker__star">&#10022;</span>
          </div>
          <h2 className="ins-head">See through a<br /><em>new lens.</em></h2>
          <div className="ins-rule" aria-hidden="true" />
          <p className="ins-sub">Insights that refuse to stay quiet.</p>
          <p className="ins-body">
            Drop your email and receive the first chapter of Ted&rsquo;s upcoming book &mdash;
            plus occasional transmissions from the world behind the work: philosophy,
            new music, films and insights.
          </p>
        </div>

        <form className="ins-form" onSubmit={submit}>
          <div className="ins-row">
            <label className="ins-field">
              <span>First name</span>
              <input type="text" value={form.first} onChange={set("first")} placeholder="Jane" autoComplete="given-name" />
            </label>
            <label className="ins-field">
              <span>Last name</span>
              <input type="text" value={form.last} onChange={set("last")} placeholder="Doe" autoComplete="family-name" />
            </label>
          </div>
          <label className="ins-field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={set("email")} placeholder="you@domain.com" autoComplete="email" required />
          </label>

          <div className="ins-actions">
            <button type="submit" className="ins-btn ins-btn--primary">
              {sent ? "Welcome aboard" : "Subscribe"}
              {!sent && <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 12h14M13 6l6 6-6 6" /></svg>}
            </button>
            <button type="button" className="ins-btn ins-btn--ghost" onClick={() => onConsult && onConsult()}>
              Book a consultation
            </button>
          </div>
          <p className="ins-fineprint">No noise. Unsubscribe anytime.</p>
        </form>
      </div>
    </section>
  );
}

window.InsightsCTA = InsightsCTA;
