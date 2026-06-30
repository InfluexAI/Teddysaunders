// WkPaths.jsx — "Choose how you work with Ted": three cinematic portals that
// expand on hover and deep-link to the section below. Slow counter-rotating
// compass rings drift behind the header.
function Wk2Rings() {
  return (
    <div className="wk2-paths__rings" aria-hidden="true">
      <svg viewBox="0 0 500 500">
        <defs>
          <radialGradient id="wk2RingFade" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#C9A24B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="wk2-ring-rot">
          <circle cx="250" cy="250" r="232" fill="none" stroke="url(#wk2RingFade)" strokeWidth="1" strokeDasharray="2 10" />
          <circle cx="250" cy="250" r="200" fill="none" stroke="rgba(201,162,75,0.18)" strokeWidth="1" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <line key={i} x1={250 + Math.cos(a) * 196} y1={250 + Math.sin(a) * 196} x2={250 + Math.cos(a) * 204} y2={250 + Math.sin(a) * 204} stroke="rgba(232,201,138,0.4)" strokeWidth="1.4" />;
          })}
        </g>
        <g className="wk2-ring-rot wk2-ring-rot--rev">
          <circle cx="250" cy="250" r="158" fill="none" stroke="rgba(201,162,75,0.14)" strokeWidth="1" strokeDasharray="1 7" />
          <circle cx="250" cy="250" r="120" fill="none" stroke="rgba(201,162,75,0.1)" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

// per-path corner glyphs
const WK2_GLYPHS = {
  compass: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="18" />
      <path d="M31 17 L26 26 L17 31 L22 22 Z" fill="currentColor" stroke="none" opacity="0.85" />
      <circle cx="24" cy="24" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  film: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="12" width="32" height="24" rx="2" />
      <path d="M8 19h32M8 29h32M16 12v24M32 12v24" opacity="0.85" />
    </svg>
  ),
  gem: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 10 H34 L42 20 L24 40 L6 20 Z" />
      <path d="M6 20 H42 M14 10 L24 40 L34 10 M16 20 L24 10 L32 20" opacity="0.85" />
    </svg>
  ),
};

const WK2_PATHS = [
  {
    id: "coaching", index: "01", to: "wk-coaching", glyph: "compass",
    kicker: "For Individuals", label: "Compass Coaching",
    copy: "Mentorship for modern men building meaningful lives — career, relationships, finance, and health, aligned at once.",
    cta: "Enter Coaching", img: "assets/pathways/individuals.jpg",
  },
  {
    id: "brand", index: "02", to: "wk-brand", glyph: "film",
    kicker: "For Businesses", label: "Brand Marketing",
    copy: "Cinematic brand campaigns and creative direction beyond the ordinary — the work that has moved whole companies forward.",
    cta: "See the Work", img: "assets/pathways/brands.jpg",
  },
  {
    id: "invest", index: "03", to: "wk-investors", glyph: "gem",
    kicker: "For Investors", label: "Original IP",
    copy: "Back high-impact original visions — cinematic worlds and platforms designed to transform, touch, and uplift humanity.",
    cta: "Explore the Vault", img: "assets/pathways/investors.jpg",
  },
];

function WkPaths({ onJump }) {
  return (
    <section className="wk2-paths" id="wk2-paths">
      <div className="wk-dust" aria-hidden="true"></div>
      <Wk2Rings />
      <div className="wk2-paths__head wk-reveal">
        <p className="wk2-paths__eyebrow">Choose your entrance</p>
        <h2 className="wk2-paths__title wk2-textured">Three ways in</h2>
        <p className="wk2-paths__sub">
          One creative force, three doors. Find the one that fits where you are &mdash;
          and where you&rsquo;re trying to go.
        </p>
      </div>

      <div className="wk2-portals wk-reveal">
        {WK2_PATHS.map((p) => (
          <div className={"wk2-portal wk2-portal--" + p.id} key={p.id} onClick={() => onJump && onJump(p.to)} role="button" aria-label={p.label}>
            <img className="wk2-portal__img" src={p.img} alt="" />
            <div className="wk2-portal__atmos" aria-hidden="true"></div>
            <div className="wk2-portal__scrim" aria-hidden="true"></div>
            <div className="wk2-portal__num" aria-hidden="true">{p.index}</div>
            <div className="wk2-portal__glyph" aria-hidden="true">{WK2_GLYPHS[p.glyph]}</div>
            <div className="wk2-portal__hint" aria-hidden="true"><span>Open</span><i>+</i></div>
            <div className="wk2-portal__content">
              <p className="wk2-portal__kicker">{p.kicker}</p>
              <h3 className="wk2-portal__label">{p.label}</h3>
              <p className="wk2-portal__copy">{p.copy}</p>
              <button className="wk2-portal__cta" onClick={(e) => { e.stopPropagation(); onJump && onJump(p.to); }}>
                {p.cta}
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.WkPaths = WkPaths;
