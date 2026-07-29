// PressStrip.jsx — looping marquee with bundler-friendly resource lookup.
function PressStrip() {
  const map = (window.__resources) || {};
  const fallback = (id, file) => map[id] || `assets/press/${file}`;
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
  return <section className="tk-press-section">{children}</section>;
}

window.PressStrip = PressStrip;
window.CosmicPanel = CosmicPanel;
