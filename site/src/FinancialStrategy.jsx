// FinancialStrategy.jsx — "Financial Strategy". Markets as oceans, strategy as
// navigation. A restrained three-column editorial composition built live:
//   LEFT   — editorial content + selective CTAs
//   CENTER — Ted graded into a dark studio, emerging from shadow
//   RIGHT  — a "Field Notes" navigator's-journal panel
// Background intelligence (compass geometry, a market-cycle wave) sits below
// 10% opacity so it's discovered, not announced.
function FinanceCompass() {
  // Faint navigational diagram — the market cycle as a compass.
  return (
    <svg className="finance-compass" viewBox="0 0 400 400" aria-hidden="true">
      <circle cx="200" cy="200" r="186" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" />
      <circle cx="200" cy="200" r="92" fill="none" stroke="currentColor" strokeWidth="0.5" />
      {Array.from({ length: 72 }).map((_, i) => {
        const a = (i / 72) * Math.PI * 2;
        const r1 = i % 9 === 0 ? 168 : 180;
        return <line key={i} x1={200 + Math.cos(a) * r1} y1={200 + Math.sin(a) * r1}
          x2={200 + Math.cos(a) * 186} y2={200 + Math.sin(a) * 186} stroke="currentColor" strokeWidth="0.5" />;
      })}
      {/* 8-point star */}
      <g stroke="currentColor" strokeWidth="0.6" fill="none">
        <path d="M200 38 L214 200 L200 362 L186 200 Z" />
        <path d="M38 200 L200 186 L362 200 L200 214 Z" />
        <path d="M86 86 L200 200 L314 314 M314 86 L200 200 L86 314" strokeWidth="0.4" opacity="0.6" />
      </g>
      <circle cx="200" cy="200" r="4" fill="currentColor" />
    </svg>
  );
}

function FinanceNoteIcon({ kind }) {
  const p = { viewBox: "0 0 24 24", width: 26, height: 26, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (kind) {
    case "bitcoin":
      return (
        <svg {...p}><circle cx="12" cy="12" r="9" />
          <text x="12" y="16.4" textAnchor="middle" fontSize="12" fontFamily="ui-monospace, monospace" fill="currentColor" stroke="none">{"\u20BF"}</text></svg>
      );
    case "dollar":
      return (
        <svg {...p}><circle cx="12" cy="12" r="9" />
          <text x="12" y="16.4" textAnchor="middle" fontSize="12.5" fontFamily="ui-monospace, monospace" fill="currentColor" stroke="none">$</text></svg>
      );
    case "cycle":
      return (
        <svg {...p}><path d="M20 12a8 8 0 1 1-2.34-5.66" />
          <path d="M20 4v3.4h-3.4" /></svg>
      );
    case "mind":
      return (
        <svg {...p}><path d="M12 3a6 6 0 0 1 3.8 10.64c-.6.5-.8 1-.8 1.86H9c0-.86-.2-1.36-.8-1.86A6 6 0 0 1 12 3z" />
          <path d="M9.5 18h5" /><path d="M10.5 21h3" /></svg>
      );
    case "chart":
      return (
        <svg {...p}><path d="M4 20h16" />
          <rect x="5.5" y="12" width="3" height="6" /><rect x="10.5" y="8" width="3" height="10" /><rect x="15.5" y="14" width="3" height="4" /></svg>
      );
    default:
      return null;
  }
}

function FinancialStrategy({ onApply, onCoaching }) {
  // Accent placeholder — swap window.__resources.financeTreasure to a real
  // transparent PNG (treasure chest spilling gold + bitcoin coins) to replace.
  const treasurePlaceholder =
    "data:image/svg+xml;utf8," + encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' width='420' height='320' viewBox='0 0 420 320'>" +
      "<defs><pattern id='p' width='14' height='14' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'>" +
      "<rect width='14' height='14' fill='%231a120a'/><line x1='0' y1='0' x2='0' y2='14' stroke='%23C9A24B' stroke-opacity='0.28' stroke-width='6'/></pattern></defs>" +
      "<rect x='1' y='1' width='418' height='318' rx='10' fill='url(%23p)' stroke='%23C9A24B' stroke-opacity='0.5' stroke-dasharray='6 6'/>" +
      "<text x='210' y='150' fill='%23E8C98A' font-family='ui-monospace, monospace' font-size='17' letter-spacing='2' text-anchor='middle'>TREASURE CHEST</text>" +
      "<text x='210' y='176' fill='%23C9A24B' font-family='ui-monospace, monospace' font-size='12' letter-spacing='1' text-anchor='middle'>gold &#183; treasure &#183; bitcoin coins</text>" +
      "<text x='210' y='200' fill='rgba(232,201,138,0.6)' font-family='ui-monospace, monospace' font-size='11' letter-spacing='1' text-anchor='middle'>drop a transparent PNG</text></svg>");
  const notes = [
    { n: "01", icon: "bitcoin", t: "1-on-1 Strategy Sessions" },
    { n: "02", icon: "dollar",  t: "Portfolio Review" },
    { n: "03", icon: "cycle",   t: "Market Cycle Education & Timing Frameworks" },
    { n: "04", icon: "mind",    t: "Mindset & Psychology of Wealth Coaching" },
    { n: "05", icon: "chart",   t: "Technical Analysis & Macro Fundamental Training" },
  ];
  return (
    <section className="tk-finance">
      <div className="finance-stage">
        {/* Background intelligence — discovered, not announced (<10% opacity). */}
        <div className="finance-bg" aria-hidden="true">
          <FinanceCompass />
          <div className="finance-cyclewave" />
        </div>

        {/* Ted as the full-bleed centerpiece of the scene. */}
        <img
          className="finance-portrait"
          src={(window.__resources && window.__resources.financePortrait) || "assets/finance-portrait.jpg"}
          alt="Ted Saunders in his studio"
        />
        <div className="finance-scrim" aria-hidden="true" />

        <div className="finance-inner">
        {/* LEFT — editorial + field notes (kept clear of Ted on the right) */}
        <div className="finance-col finance-col--text">
          <div className="finance-eyebrow">Financial Strategy</div>
          <h2 className="finance-head">New money systems require a new mindset.</h2>
          <p className="finance-sub">Stay ahead of the chain,<br />mastering the future of finance.</p>
          <div className="finance-body">
            <p>Ted Saunders has spent years navigating the decentralized financial landscape — studying market cycles, portfolio architecture, risk frameworks, and the psychology of wealth that most advisors won&rsquo;t touch.</p>
            <p>This isn&rsquo;t generic advice. It&rsquo;s a strategic conversation with someone who has lived the volatility, learned from it, and built a clear philosophy around it.</p>
          </div>
        </div>

        {/* RIGHT — Ted shows through here, unobstructed */}
        <div className="finance-col finance-col--spacer" aria-hidden="true"></div>
        </div>
      </div>

      {/* Full-width band — Field Notes (horizontal) + CTAs, below the scene */}
      <div className="finance-band">
          {/* Treasure accent — straddles the scene/band boundary, top-right. */}
          <img
            className="finance-treasure"
            src={(window.__resources && window.__resources.financeTreasure) || treasurePlaceholder}
            alt=""
            aria-hidden="true"
          />
          <div className="finance-fieldnotes__head finance-fieldnotes__head--inline">
            <span className="finance-fieldnotes__star" aria-hidden="true">
              <svg viewBox="0 0 40 40" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="0.9">
                <path d="M20 3 L23 20 L20 37 L17 20 Z" /><path d="M3 20 L20 17 L37 20 L20 23 Z" />
                <circle cx="20" cy="20" r="2" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <span className="finance-fieldnotes__title">What this looks like:</span>
          </div>
          <div className="finance-fieldnotes__grid finance-fieldnotes__grid--inline">
            {notes.map((it) => (
              <div className="finance-fnote" key={it.n}>
                <span className="finance-fnote__n"><FinanceNoteIcon kind={it.icon} /></span>
                <span className="finance-fnote__t">{it.t}</span>
              </div>
            ))}
          </div>
          <div className="finance-cta-row">
            <button className="finance-btn finance-btn--primary" onClick={onApply}>
              Apply for a Strategy Session
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
            <button className="finance-btn finance-btn--ghost" onClick={onCoaching}>
              Explore Men&rsquo;s Coaching
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
    </section>
  );
}

window.FinancialStrategy = FinancialStrategy;
