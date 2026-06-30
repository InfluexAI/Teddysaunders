// AboutVentures.jsx — "Ventures & Entrepreneurship" cards + the "Follow Ted" rail.
// Titles + descriptions follow the source copy verbatim.
const VENTURES = [
  { key: "infinit", logo: "infinit", title: "InfinitStudios.com", href: "https://infinitstudios.com",
    desc: "Full stack creative agency owned by Ted" },
  { key: "tedshots", logo: "img", res: "tedshots", img: "assets/ventures/tedshots.png", title: "TedShots.com", href: "https://tedshots.com",
    desc: "Headshot Photography company" },
  { key: "speech", logo: "box", mono: "SB", title: "SpeechToBook.com", href: "https://speechtobook.com",
    desc: "Write your book with your voice with step-by-step guidance" },
  { key: "bro", logo: "bro", title: "BroOracle.com", href: "https://brooracle.com",
    desc: "Draw a card. Forge your Manhood." },
  { key: "celestial", logo: "placeholder", glyph: "compass", name: "Celestial Compass", title: "Celestial Compass", href: "#",
    desc: "Use your birthday to discover who you are and get AI guidance from the stars on every decision." },
  { key: "dreambox", logo: "placeholder", glyph: "box", name: "ProjectDreambox", title: "ProjectDreambox.com", href: "https://projectdreambox.com",
    desc: "Platform to help peoples dreams come true." },
];

function PlaceholderGlyph({ glyph }) {
  const c = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  if (glyph === "compass") {
    return <svg {...c}><circle cx="12" cy="12" r="9" /><polygon points="15.5,8.5 11,11 8.5,15.5 13,13" fill="currentColor" stroke="none" /></svg>;
  }
  return <svg {...c}><path d="M3 8l9-5 9 5-9 5-9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></svg>;
}

// BroOracle wordmark, rebuilt as SVG (Syne, the typeface they use) with a
// gold crossed-hammers mark. Dark text to sit on the light card.
function BroOracleLogo() {
  return (
    <svg className="ab-vcard__brosvg" viewBox="0 0 500 56" fill="none" role="img" aria-label="BRO·ORACLE">
      <g fill="#D6A24A">
        <g transform="rotate(45 22 30)">
          <rect x="19" y="8" width="6" height="34" rx="1.5" />
          <rect x="12" y="5" width="20" height="9" rx="2" />
        </g>
        <g transform="rotate(-45 22 30)">
          <rect x="19" y="8" width="6" height="34" rx="1.5" />
          <rect x="12" y="5" width="20" height="9" rx="2" />
        </g>
      </g>
      <text x="52" y="40" fontFamily="Syne, sans-serif" fontWeight="800" fontSize="36" letterSpacing="1" fill="#F5EDE3">BRO·ORACLE</text>
    </svg>
  );
}

// InfinitStudios wordmark, rebuilt as SVG (Inter, the typeface on their site,
// regular weight) in black.
function InfinitStudiosLogo() {
  return (
    <svg className="ab-vcard__infinitsvg" viewBox="0 0 250 40" fill="none" role="img" aria-label="Infinit Studios">
      <text x="1" y="30" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="30" letterSpacing="0" fill="#F5EDE3">Infinit Studios</text>
    </svg>
  );
}

// Site favicon, shown alone (unboxed); falls back to a monogram if it can't load.
function FaviconLogo({ domain, mono }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) return <span className="ab-vcard__monoplain">{mono}</span>;
  return (
    <img className="ab-vcard__logoimg"
         src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
         alt="" loading="lazy" onError={() => setFailed(true)} />
  );
}

function VentureLogo({ v }) {
  if (v.logo === "infinit") {
    return <InfinitStudiosLogo />;
  }
  if (v.logo === "img") {
    return <img className="ab-vcard__logoimg" src={(window.__resources && window.__resources[v.res]) || v.img} alt={v.title} />;
  }
  if (v.logo === "box") {
    return <span className="ab-vcard__logobox"><span className="ab-vcard__mono">{v.mono}</span></span>;
  }
  if (v.logo === "bro") {
    return <BroOracleLogo />;
  }
  return (
    <span className="ab-vcard__placeholder">
      <span className="ab-vcard__placeglyph"><PlaceholderGlyph glyph={v.glyph} /></span>
      <span className="ab-vcard__placename">{v.name}</span>
    </span>
  );
}

// Minimal line glyphs (generic, cream-stroke) for the social rail.
function SocialGlyph({ name }) {
  const c = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const g = {
    Instagram: (<g><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" /></g>),
    Facebook: (<path d="M14.5 8.5H17V5h-2.5C12.6 5 11 6.6 11 8.5V11H9v3h2v6h3v-6h2.2l.8-3H14V9c0-.4.1-.5.5-.5z" />),
    X: (<path d="M4 4l16 16M20 4L4 20" />),
    YouTube: (<g><rect x="2.5" y="6" width="19" height="12" rx="3.2" /><path d="M10.5 9.3l4.4 2.7-4.4 2.7z" fill="currentColor" stroke="none" /></g>),
    Vimeo: (<path d="M3 8.2c1.2-1 2.7-1.8 3.6-1.3 1 .6 1 2.7 1.4 4.6.4 2 .8 3.2 1.5 3.2.6 0 1.7-1.3 2.7-3.4 1.2-2.6.8-4.6-1-4.6-.7 0-1.4.3-1.9.6.9-3 3.3-4.4 5.3-3.6 1.7.7 1.9 3.3.7 6.4-1.3 3.4-4 7.9-6.3 7.9-1.9 0-2.4-3.4-3-6-.5-2.2-.8-3.3-1.5-3.3-.3 0-.8.4-1.3.9z" fill="currentColor" stroke="none" />),
    LinkedIn: (<g><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" /></g>),
    TikTok: (<path d="M14 4c.4 2.3 1.9 3.8 4 4v3c-1.5 0-2.9-.5-4-1.3V15a5 5 0 1 1-5-5c.3 0 .7 0 1 .1V13a2.2 2.2 0 1 0 1.5 2.1V4z" fill="currentColor" stroke="none" />),
  };
  return <svg {...c}>{g[name]}</svg>;
}

const SOCIALS = ["Instagram", "Facebook", "X", "YouTube", "Vimeo", "LinkedIn", "TikTok"];

function AboutVentures({ onVisit, onFollow }) {
  return (
    <React.Fragment>
      <section className="ab-ventures ab-ventures--light">
        <div className="ab-ventures__head">
          <p className="ab-eyebrow">Ventures &amp; Entrepreneurship</p>
          <h2 className="ab-ventures__title ab-textured">Brands and Technology</h2>
          <p>The same imagination, channeled into companies, tools, and platforms — each one another point on the compass made real.</p>
        </div>

        <div className="ab-vgrid">
          {VENTURES.map((v) => (
            <article className="ab-vcard" key={v.title}>
              <div className="ab-vcard__logo"><VentureLogo v={v} /></div>
              <h3 className="ab-vcard__title ab-textured">{v.title}</h3>
              <p className="ab-vcard__desc">{v.desc}</p>
              <a className="ab-vcard__btn" href={v.href}
                 target={v.href.startsWith("http") ? "_blank" : undefined}
                 rel={v.href.startsWith("http") ? "noopener noreferrer" : undefined}
                 onClick={() => onVisit && onVisit(v)}>
                Visit Site
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 17 17 7M9 7h8v8" /></svg>
              </a>
            </article>
          ))}
        </div>
      </section>


    </React.Fragment>
  );
}

window.AboutVentures = AboutVentures;
