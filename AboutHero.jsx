// AboutHero.jsx — opening statement for the About page.
// "One imagination. Many expressions." over a warm espresso aura, drifting
// gold particles, and faint slowly-rotating astrolabe arc-fragments bleeding
// in from the corners (a compass/instrument feel without being the orrery).
function AstrolabeRing() {
  const ticks = Array.from({ length: 120 });
  return (
    <svg viewBox="0 0 600 600" fill="none" aria-hidden="true">
      <g stroke="currentColor">
        <circle cx="300" cy="300" r="292" strokeWidth="1.1" opacity="0.7" />
        <circle cx="300" cy="300" r="276" strokeWidth="0.7" opacity="0.45" />
        <circle cx="300" cy="300" r="214" strokeWidth="0.9" opacity="0.55" />
        <circle cx="300" cy="300" r="150" strokeWidth="0.8" opacity="0.5" />
        <circle cx="300" cy="300" r="88"  strokeWidth="0.9" opacity="0.6" />
        {/* fine degree ticks between r=276 and r=292 */}
        {ticks.map((_, i) => {
          const a = (i * 3) * Math.PI / 180;
          const r1 = 276, r2 = i % 5 === 0 ? 264 : 270;
          return (
            <line key={i}
              x1={300 + r1 * Math.sin(a)} y1={300 - r1 * Math.cos(a)}
              x2={300 + r2 * Math.sin(a)} y2={300 - r2 * Math.cos(a)}
              strokeWidth="0.8" opacity="0.5" />
          );
        })}
        {/* cardinal bearing spokes */}
        {[0, 45, 90, 135].map((deg) => {
          const a = deg * Math.PI / 180;
          return (
            <line key={deg}
              x1={300 - 214 * Math.sin(a)} y1={300 + 214 * Math.cos(a)}
              x2={300 + 214 * Math.sin(a)} y2={300 - 214 * Math.cos(a)}
              strokeWidth="0.7" opacity="0.35" />
          );
        })}
      </g>
    </svg>
  );
}

function AboutHero() {
  return (
    <section className="ab-hero">
      <div className="ab-hero__astro" aria-hidden="true">
        <div className="astro astro--tl"><AstrolabeRing /></div>
        <div className="astro astro--br"><AstrolabeRing /></div>
      </div>
      <div className="ab-hero__starfield" aria-hidden="true"></div>
      <div className="ab-hero__fade" aria-hidden="true"></div>
      <div className="ab-hero__inner">
        <h1 className="ab-hero__title ab-textured">
          One imagination.<br />Many expressions.
        </h1>
        <p className="ab-hero__sub">The compass is the operating system.</p>

        <div className="ab-hero__rule" aria-hidden="true"></div>

        <p className="ab-hero__body">
          Film may be the center of gravity, but the universe extends far beyond a single
          medium. Every expression&nbsp;&mdash; <strong>music, philosophy, photography, AI,
          coaching, storytelling, and experimentation</strong>&nbsp;&mdash; emerges from the
          same creative force.
        </p>

        <div className="ab-hero__scrollcue" aria-hidden="true">
          <span>Enter the Compass</span>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v15M6 13l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}

window.AboutHero = AboutHero;
