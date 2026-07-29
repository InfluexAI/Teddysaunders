// PressStrip.jsx — looping marquee with bundler-friendly resource lookup.
const _R = (typeof window !== "undefined" && window.__resources) || {};
const LOGO_FILES = [
  { k: "netflix", src: _R.logoNetflix || "assets/press/netflix2.png" },
  { k: "bi",      src: _R.logoBI || "assets/press/business-insider.png" },
  { k: "nyt",     src: _R.logoNYT || "assets/press/nyt.png" },
  { k: "gma",     src: _R.logoGMA || "assets/press/gma.png" },
  { k: "abc",     src: _R.logoABC || "assets/press/abc2.png" },
  { k: "drew",    src: _R.logoDrew || "assets/press/drew.png" },
];
function PressStrip() {
  const map = (window.__resources) || {};
  const fallback = (id, file) => map[id] || `../../assets/press/${file}`;
  const logos = [
    fallback("pressNetflix", "netflix.svg"),
    fallback("pressAbc",     "abc.svg"),
    fallback("pressIheart",  "iheart.svg"),
    fallback("pressDrew",    "drew-large.svg"),
  ];
  return (
    <div className="tk-press" aria-label="As featured on">
      <div className="marquee">
        {[...logos, ...logos, ...logos, ...logos].map((src, i) => (
          <img key={i} src={src} alt="" />
        ))}
      </div>
    </div>
  );
}

function CosmicPanel({ children }) {
  return (
    <section className="tk-press-section">
      <Sparkles className="tk-cosmic-sparkles" density={800} size={1.4} speed={0.45} opacity={0.65} color="#FFFFFF" />
      <div className="tk-cosmic-inner">
        <div className="tk-logobar" aria-label="As featured on">
          <div className="tk-logobar__track">
            {[0, 1, 2, 3].flatMap((k) => LOGO_FILES.map((f, j) => (
              <img key={k + "-" + j} className={"logo-" + f.k} src={f.src} alt="" />
            )))}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

window.PressStrip = PressStrip;
window.CosmicPanel = CosmicPanel;
