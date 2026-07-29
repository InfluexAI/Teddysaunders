/* contact-core.jsx — shared data + components for all three directions.
   Exports presentational pieces + a useContact() state hook to window. */

// ----------------------------------------------------------------
// DATA  (copy is verbatim from the brief — never edited)
// ----------------------------------------------------------------
const INQUIRIES = [
  { id: "film",     label: "Film & Brand Work",   cta: "Start a Creative Project", angle: -54,
    helper: "Brand, web, video, photography, creative strategy, immersive storytelling, and visual direction." },
  { id: "coaching", label: "Coaching & Consulting", cta: "Apply for Coaching", angle: 18,
    helper: "Creative transformation, mentorship, philosophy, alignment, and Compass Coaching." },
  { id: "speaking", label: "Speaking & Media", cta: "Send Message", angle: 90, helper: "" },
  { id: "fated",    label: "The Fated", cta: "Send Message", angle: 162, helper: "" },
  { id: "general",  label: "General Inquiry", cta: "Send Message", angle: 234,
    helper: "For general thoughts, questions, introductions, or conversations." },
];
const inquiryById = (id) => INQUIRIES.find((q) => q.id === id) || INQUIRIES[4];

const PATHWAYS = [
  { n: "01", title: "Send Teddy a Simple Message", inquiry: "general", cta: "Send Message",
    desc: "For general thoughts, questions, introductions, or conversations." },
  { n: "02", title: "Hire for a Creative Project", inquiry: "film", cta: "Start a Creative Project",
    desc: "Brand, web, video, photography, creative strategy, immersive storytelling, and visual direction." },
  { n: "03", title: "Hire For Personal Coaching", inquiry: "coaching", cta: "Apply for Coaching",
    desc: "Creative transformation, mentorship, philosophy, alignment, and Compass Coaching." },
  { n: "04", title: "Subscribe to the newsletter", inquiry: null, cta: "Subscribe", action: "subscribe",
    desc: "Receive philosophical insights, creative updates, future projects, and updates about Ted’s book release." },
  { n: "05", title: "Follow Ted in Real Time", inquiry: null, cta: "Follow", action: "follow",
    desc: "Get real-time updates from social platforms." },
];

const SOCIALS = [
  { label: "Instagram", href: "#", svg: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3.5" y1="4" x2="3.5" y2="20"/><line x1="20.5" y1="4" x2="20.5" y2="20"/>
      <line x1="3.5" y1="4" x2="20.5" y2="13"/><line x1="20.5" y1="4" x2="3.5" y2="13"/>
      <line x1="3.5" y1="20" x2="20.5" y2="20"/>
      <circle cx="12" cy="13.5" r="1.05" fill="currentColor" stroke="none"/>
    </svg>
  ) },
  { label: "YouTube",   href: "#", rune: "\u16C9" },
  { label: "Vimeo",     href: "#", svg: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <g transform="translate(0,24) scale(1,-1)">
        <line x1="6" y1="4" x2="6" y2="20"/><line x1="6" y1="4" x2="18" y2="8"/><line x1="18" y1="8" x2="18" y2="20"/>
      </g>
    </svg>
  ) },
  { label: "X",         href: "#", svg: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 4 Q14 10 18.5 20"/><path d="M19 4.5 Q9 13 4.5 19.5"/>
    </svg>
  ) },
  { label: "Spotify",   href: "#", rune: "\u16DF" },
];

const LOGO = (window.__resources && window.__resources.logo) || "assets/logo.png";
const LOGOMARK = (window.__resources && window.__resources.logomark) || "assets/logomark.png";
const TEDDY = (window.__resources && window.__resources.teddyhero) || "assets/teddy-hero.jpg";

// ----------------------------------------------------------------
// SMALL ICONS  (light-stroke, brand-quiet)
// ----------------------------------------------------------------
function SocialIcon({ name }) {
  const s = { width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "instagram": return (<svg viewBox="0 0 24 24" {...s}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none"/></svg>);
    case "youtube": return (<svg viewBox="0 0 24 24" {...s}><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.5 9.2v5.6L15 12z" fill="currentColor" stroke="none"/></svg>);
    case "vimeo": return (<svg viewBox="0 0 24 24" {...s}><path d="M3 8.2c1.4-1.3 2.6-2 3.4-2 1.3 0 2 .9 2.2 2.7.3 2.4.5 3.9.7 4.5.3 1.2.7 1.8 1.2 1.8.4 0 1-.6 1.7-1.9.8-1.5 1.2-2.6 1.2-3.4 0-1.3-.5-2-1.5-2-.5 0-1 .1-1.5.3.8-2.6 2.3-3.9 4.5-3.8 1.6.1 2.4 1.1 2.3 3.2-.1 1.9-1.4 4.5-3.9 7.9-2.1 2.8-3.7 4.2-4.7 4.2-.7 0-1.3-.7-1.8-2.1l-1-3.7c-.4-1.4-.8-2.1-1.2-2.1-.1 0-.6.3-1.4.9z" fill="currentColor" stroke="none"/></svg>);
    case "x": return (<svg viewBox="0 0 24 24" {...s}><path d="M4 4l16 16M20 4L4 20" /></svg>);
    case "spotify": return (<svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M7.5 9.5c3-1 6.5-.6 9 1M8 13c2.4-.7 5-.4 7 1M8.6 16c1.8-.5 3.6-.3 5 .7"/></svg>);
    default: return null;
  }
}

function ArrowGlyph({ size = 14 }) {
  return (<svg className="ar" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>);
}

// ----------------------------------------------------------------
// COMPASS  — bronze dial with a needle that rotates to `angle`
// ----------------------------------------------------------------
function Compass({ size = 220, angle = 234, id = "cmp", showCardinals = true, mark = true, broken = false }) {
  const g = `${id}-grad`;
  // Broken mode: erratically jump the needle via inline transform (CSS keyframes
  // on SVG <g> transforms don't render in all engines; inline transforms do).
  const [glitchAngle, setGlitchAngle] = React.useState(0);
  React.useEffect(() => {
    if (!broken) return;
    // Struggling: mostly stuck with a fine tremor, occasionally straining a few
    // degrees then falling back — like a needle that can't get free.
    const seq    = [0, 5, -3, 4, -2, 6, 1, 4, -3, 5, 23, 18, 24, 20, 9, 4, 7, 2, -4, 3, -2, 5, 0, 4];
    const delays = [110, 70, 90, 70, 320, 70, 90, 70, 80, 280, 80, 70, 90, 240, 70, 90, 70, 300, 70, 80, 70, 260, 80, 90];
    let i = 0, t;
    const tick = () => {
      setGlitchAngle(seq[i % seq.length]);
      t = setTimeout(tick, delays[i % delays.length]);
      i++;
    };
    t = setTimeout(tick, 200);
    return () => clearTimeout(t);
  }, [broken]);
  const ticks = [];
  for (let i = 0; i < 60; i++) {
    const major = i % 5 === 0;
    const a = (i / 60) * Math.PI * 2;
    const r1 = 96, r2 = major ? 86 : 91;
    ticks.push(
      <line key={i}
        x1={100 + Math.sin(a) * r1} y1={100 - Math.cos(a) * r1}
        x2={100 + Math.sin(a) * r2} y2={100 - Math.cos(a) * r2}
        stroke="#D29B5A" strokeWidth={major ? 1.4 : 0.7} opacity={major ? 0.85 : 0.4} />
    );
  }
  const card = [["N", 0], ["E", 90], ["S", 180], ["W", 270]];
  return (
    <span className={"c-compass" + (broken ? " is-broken" : "")} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FBE6BC"/><stop offset="38%" stopColor="#E8B777"/>
            <stop offset="70%" stopColor="#C9915C"/><stop offset="100%" stopColor="#AB7442"/>
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(240,170,64,0.30)"/><stop offset="100%" stopColor="rgba(240,170,64,0)"/>
          </radialGradient>
          <radialGradient id={`${id}-hubbg`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(5,3,2,0.95)"/>
            <stop offset="55%" stopColor="rgba(5,3,2,0.8)"/>
            <stop offset="100%" stopColor="rgba(5,3,2,0)"/>
          </radialGradient>
          <filter id={`${id}-ds`} x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0.6" stdDeviation="1.8" floodColor="#000" floodOpacity="0.9"/>
          </filter>
        </defs>
        <circle cx="100" cy="100" r="98" fill={`url(#${id}-glow)`}/>
        <circle cx="100" cy="100" r="96" fill="rgba(8,6,4,0.55)" stroke="#D29B5A" strokeWidth="1" opacity="0.9"/>
        <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(209,157,99,0.3)" strokeWidth="0.8"/>
        <g className="ring-spin">{ticks}</g>
        {showCardinals && card.map(([l, a]) => {
          const rad = (a / 180) * Math.PI;
          return (<text key={l} x={100 + Math.sin(rad) * 66} y={100 - Math.cos(rad) * 66 + 5}
            textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" fontSize="13"
            letterSpacing="0.05em" fill={l === "N" ? `url(#${g})` : "rgba(255,234,202,0.55)"}>{l}</text>);
        })}
        {/* needle */}
        <g className={"needle" + (broken ? " needle-glitch" : "")} style={{ transform: `rotate(${broken ? glitchAngle : angle}deg)` }}>
          <polygon points="100,30 108,100 100,108 92,100" fill={`url(#${g})`} />
          <polygon points="100,170 108,100 100,92 92,100" fill="rgba(120,86,52,0.55)" />
        </g>
        {mark ? (
          <g>
            <circle cx="100" cy="100" r="31" fill={`url(#${id}-hubbg)`}/>
            <image href={LOGOMARK} x="66.5" y="62" width="67" height="76" preserveAspectRatio="xMidYMid meet" filter={`url(#${id}-ds)`}/>
          </g>
        ) : (
          <g>
            <circle cx="100" cy="100" r="7" fill="#0A0805" stroke="#E8B777" strokeWidth="1.4"/>
            <circle cx="100" cy="100" r="2.4" fill={`url(#${g})`}/>
          </g>
        )}
      </svg>
    </span>
  );
}

// ----------------------------------------------------------------
// BRAND CHROME
// ----------------------------------------------------------------
function BgStack({ plain }) {
  return (
    <div className="cpage__bg">
      {!plain ? <div className="cpage__cosmic"></div> : null}
      <div className="cpage__aura"></div>
      <div className="cpage__vignette"></div>
      <div className="cpage__grain"></div>
    </div>
  );
}
function Reticles() {
  return (<div className="c-reticles"><span className="r tl"></span><span className="r tr"></span><span className="r bl"></span><span className="r br"></span></div>);
}
// Shared header — same logo + nav + Portfolio mega-menu as every other page.
// Defined here (not loaded from src/Header.jsx) because the contact app's Babel
// scripts only share scope within their own set.
const CT_NAV_R = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;
const CT_PORTFOLIO_MEGA = [
  { label: "Films", href: "portfolio/films.html", res: "navFilms", img: "assets/nav/films.png", items: [
    { label: "Festival & Narrative Projects", href: "portfolio/films-festival-narrative.html" },
    { label: "Commercial Clients", href: "portfolio/films-commercial-clients.html" },
    { label: "Featured Experimental & Music Video Work", href: "portfolio/films-experimental-music-video.html" },
    { label: "Tedflix - Viewing Experience", href: "portfolio/films-tedflix.html" },
    { label: "The Library - Full Archive of Ted's Videos", href: "portfolio/films-library.html" },
    { label: "Original Scripts & IP", href: "portfolio/films-scripts-ip.html" },
  ]},
  { label: "Photography", href: "portfolio/photography.html", res: "navPhotography", img: "assets/nav/photography.png", items: [
    { label: "Portraits", href: "portfolio/photography-portraits.html" },
    { label: "Headshots", href: "portfolio/photography-headshots.html" },
    { label: "Stock Photography", href: "portfolio/photography-stock.html" },
    { label: "Advertisements", href: "portfolio/photography-advertisements.html" },
    { label: "VFX Composites / Commercial", href: "portfolio/photography-vfx-composites.html" },
    { label: "Wizard Light Painting", href: "portfolio/photography-wizard-light-painting.html" },
    { label: "Events", href: "portfolio/photography-events.html" },
    { label: "Weddings", href: "portfolio/photography-weddings.html" },
    { label: "Experimental and Abstract", href: "portfolio/photography-experimental-abstract.html" },
  ]},
  { label: "Music", href: "portfolio/music.html", res: "navMusic", img: "assets/nav/music.png", items: [
    { label: "TedDrops & Mastercodes DJ Sets", href: "portfolio/music-teddrops-mastercodes.html" },
    { label: "Original Music", href: "portfolio/music-original.html" },
  ]},
  { label: "Literature & Philosophy", href: "portfolio/literature.html", res: "navLiterature", img: "assets/nav/literature.png", items: [
    { label: "The Book of Ignorance", href: "portfolio/literature-book-of-ignorance.html" },
    { label: "Poetry", href: "portfolio/literature-poetry.html" },
    { label: "Articles", href: "portfolio/literature-articles.html" },
    { label: "TedThoughts Tweets / Epiphanies", href: "portfolio/literature-tedthoughts.html" },
    { label: "Worldbuilding", href: "portfolio/literature-worldbuilding.html" },
  ]},
];
const CT_MEGA = { Portfolio: CT_PORTFOLIO_MEGA };

function CtHdrCaret() {
  return (
    <svg className="tk-caret" viewBox="0 0 24 24" width="16" height="16" fill="none"
         stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function CtMegaPanel() {
  return (
    <div className="tk-dropdown tk-mega">
      <div className="tk-mega__grid">
        {CT_PORTFOLIO_MEGA.map((cat) => (
          <div className="tk-cat" key={cat.label}>
            <a className="tk-cat__card" href={cat.href}>
              <img src={CT_NAV_R(cat.res, cat.img)} alt={cat.label} />
              <span className="tk-cat__title">{cat.label}</span>
            </a>
            <div className="tk-cat__list">
              {cat.items.map((s) => (<a key={s.label} href={s.href}>{s.label}</a>))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Header({ active = "Contact" }) {
  const items = ["About", "Portfolio", "Work With Ted", "Contact"];
  const HREFS = {
    Home: "index.html",
    About: "About.html",
    Portfolio: "Portfolio.html",
    "Work With Ted": "work-with-ted.html",
    Contact: "contact.html",
  };
  const [open, setOpen] = React.useState(false);
  const logoSrc = CT_NAV_R("logo", "assets/logo.png");

  return (
    <header className="tk-header">
      <a className="tk-brand" href={HREFS.Home}>
        <img className="logo" src={logoSrc} alt="Ted Saunders" />
      </a>

      <ul className="tk-nav">
        {items.map((label) => {
          const mega = CT_MEGA[label];
          return (
            <li key={label} className={mega ? "tk-has-sub" : ""}>
              <a className={active === label ? "is-active" : ""}
                 href={active === label ? "#" : (HREFS[label] || "#")}>
                {label}{mega ? <CtHdrCaret/> : null}
              </a>
              {mega ? <CtMegaPanel/> : null}
            </li>
          );
        })}
      </ul>

      <button className="tk-menu-toggle" aria-label="Open menu" onClick={() => setOpen(true)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" /></svg>
      </button>

      <div className={"tk-mobile-menu" + (open ? " is-open" : "")}>
        <button className="close" aria-label="Close menu" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
        </button>
        {items.map((label) => (
          <React.Fragment key={label}>
            <a className={active === label ? "is-active" : ""} href={HREFS[label] || "#"} onClick={() => setOpen(false)}>{label}</a>
            {CT_MEGA[label] ? (
              <div className="tk-mobile-sub">
                {CT_MEGA[label].map((cat) => (
                  <React.Fragment key={cat.label}>
                    <a href={cat.href} className="tk-mobile-cat" onClick={() => setOpen(false)}>{cat.label}</a>
                    {cat.items.map((s) => (<a key={s.label} href={s.href} className="tk-mobile-subitem" onClick={() => setOpen(false)}>{s.label}</a>))}
                  </React.Fragment>
                ))}
              </div>
            ) : null}
          </React.Fragment>
        ))}
        <a className="tk-mobile-cta" href="index.html" onClick={() => setOpen(false)}>EXPLORE THE WORK</a>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="c-footer">
      <div>&copy; 2026 Ted Saunders · Wielding Magic Through Film</div>
      <div className="links"><a href="#">Instagram</a><a href="#">Vimeo</a><a href="#">YouTube</a><a href="#">Privacy</a></div>
    </footer>
  );
}
function Eyebrow({ children, gold }) {
  return (<span className={"c-eyebrow" + (gold ? " c-eyebrow--gold" : "")}><span className="tick"></span>{children}</span>);
}

// Tedivider — gold hairlines flanking the TS monogram disc (matches homepage)
function Tedivider() {
  return (
    <div className="c-tedivider">
      <div className="rule"></div>
      <div className="disc"><img src={LOGO} alt=""/></div>
      <div className="rule"></div>
    </div>
  );
}

// ----------------------------------------------------------------
// ADAPTIVE FORM
// ----------------------------------------------------------------
function AdaptiveForm({ inquiry, setInquiry, selectMode = "chips", showDesc = false }) {
  const [sent, setSent] = React.useState(false);
  const q = inquiryById(inquiry);
  const submit = (e) => { e.preventDefault(); setSent(true); };

  if (sent) {
    return (
      <div className="c-sent">
        <span className="seal"><Compass size={92} angle={q.angle} id="sent-cmp" showCardinals={false}/></span>
        <div className="c-display" style={{ fontSize: 34 }}>MESSAGE SENT</div>
        <p className="c-body" style={{ maxWidth: 380 }}>Your transmission has reached Ted. Every message is read — expect a reply when the signal returns.</p>
        <button className="c-btn c-btn--outline" onClick={() => setSent(false)}>Send Another</button>
      </div>
    );
  }

  return (
    <form className="c-form" onSubmit={submit}>
      {showDesc && q.helper ? (
        <div className="c-field c-inq" key={q.id} style={{ animation: "c-fade .5s ease both" }}>
          <span className="c-inq__label">{q.label}</span>
          <p className="c-inq__desc">{q.helper}</p>
        </div>
      ) : null}

      <div className="c-formfields">
        {(q.id === "general" || q.id === "film" || q.id === "coaching") ? (
          <div className="c-field" style={{ marginBottom: 26 }}>
            <label className="c-label">Inquiry Type</label>
            <div className="c-selectwrap">
              <select className="c-input c-iselect" defaultValue="" required>
                <option value="" disabled>Select inquiry type…</option>
                <option value="brands">Brands</option>
                <option value="individuals">Individuals</option>
                {q.id === "general" ? <option value="investors">Investors</option> : null}
              </select>
              <span className="c-select__chev" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </div>
          </div>
        ) : null}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
          <div className="c-field"><label className="c-label">Name</label>
            <input className="c-input" type="text" placeholder="Your name" required/></div>
          <div className="c-field"><label className="c-label">Email</label>
            <input className="c-input" type="email" placeholder="you@email.com" required/></div>
        </div>

        <div className="c-field">
          <label className="c-label">Message</label>
          <textarea className="c-textarea" rows="3" placeholder="Tell Ted what you're building, dreaming, or asking…" required></textarea>
        </div>

        <button className="c-btn c-btn--bronze c-btn--block" type="submit" key={q.cta}>
          {q.cta}<ArrowGlyph/>
        </button>
      </div>
    </form>
  );
}

// ----------------------------------------------------------------
// NEWSLETTER MODULE
// ----------------------------------------------------------------
function NewsletterModule({ split = false }) {
  const [done, setDone] = React.useState(false);
  if (split) {
    return (
      <div className="c-news c-news--split reveal d4">
        <div className="c-news__left">
          <Eyebrow gold>Newsletter</Eyebrow>
          <div className="c-display" style={{ fontSize: 38, marginTop: 18 }}>JOIN THE TRANSMISSION</div>
          <p className="c-body" style={{ marginTop: 14, fontSize: 18, maxWidth: 520 }}>
            Receive philosophical insights, creative updates, future projects, and updates about Ted’s book release.
          </p>
        </div>
        <div className="c-news__right">
          {done ? (
            <p className="c-lead" style={{ fontSize: 18, color: "var(--c-butter)" }}>You're on the list. Watch the skies.</p>
          ) : (
            <form className="c-news__stack" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
              <input className="c-news__input" type="email" placeholder="Your email" required/>
              <button className="c-btn c-btn--bronze c-btn--block" type="submit">Subscribe<ArrowGlyph/></button>
            </form>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="c-news reveal d4">
      <Eyebrow gold>Newsletter</Eyebrow>
      <div className="c-display" style={{ fontSize: 30, marginTop: 18 }}>JOIN THE TRANSMISSION</div>
      <p className="c-body" style={{ marginTop: 12, maxWidth: 560 }}>
        Receive philosophical insights, creative updates, future projects, and updates about Ted’s book release.
      </p>
      {done ? (
        <p className="c-lead" style={{ marginTop: 22, fontSize: 18, color: "var(--c-butter)" }}>You're on the list. Watch the skies.</p>
      ) : (
        <form className="c-news__row" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
          <input className="c-news__input" type="email" placeholder="Your email" required/>
          <button className="c-btn c-btn--bronze" type="submit">Subscribe<ArrowGlyph/></button>
        </form>
      )}
    </div>
  );
}

// ----------------------------------------------------------------
// SOCIAL ROW
// ----------------------------------------------------------------
function SocialRow() {
  return (
    <div className="c-social">
      {SOCIALS.map((s) => (
        <a key={s.label} href={s.href}><span className="ic ic--rune" aria-hidden="true">{s.svg || s.rune}</span>{s.label}</a>
      ))}
    </div>
  );
}

Object.assign(window, {
  INQUIRIES, PATHWAYS, SOCIALS, inquiryById, LOGO,
  Compass, BgStack, Reticles, Header, Footer, Eyebrow, Tedivider,
  ArrowGlyph, SocialIcon, AdaptiveForm, NewsletterModule, SocialRow,
});
