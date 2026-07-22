// PressStrip.jsx — looping marquee with bundler-friendly resource lookup.
const _R = (typeof window !== "undefined" && window.__resources) || {};
const LOGO_FILES = [
  { k: "salesforce", src: _R.logoSalesforce || "assets/press/logos/salesforce.svg" },
  { k: "linkedin",   src: _R.logoLinkedIn   || "assets/press/logos/linkedin.svg" },
  { k: "verizon",    src: _R.logoVerizon    || "assets/press/logos/verizon.svg" },
  { k: "toyota",     src: _R.logoToyota     || "assets/press/logos/toyota.svg" },
  { k: "microsoft",  src: _R.logoMicrosoft  || "assets/press/logos/microsoft.svg" },
  { k: "dolab",      src: _R.logoDoLab      || "assets/press/logos/dolab.png?v=2" },
  { k: "lucidity",   src: _R.logoLucidity   || "assets/press/logos/lucidity.png?v=3" },
  { k: "aptible",    src: _R.logoAptible    || "assets/press/logos/aptible.svg" },
  { k: "gatsby",     src: _R.logoGatsby     || "assets/press/logos/gatsby.svg" },
  { k: "kia",        src: _R.logoKia        || "assets/press/logos/kia.svg" },
  { k: "burningman", src: _R.logoBurningMan || "assets/press/logos/burningman.png?v=3" },
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
