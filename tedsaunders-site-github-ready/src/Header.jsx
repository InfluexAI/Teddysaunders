// Header.jsx — shared top nav (logo + links) used by EVERY page.
// Portfolio expands into a cinematic mega-menu: 4 image-card categories, each
// with a click-to-expand list of subpages.
const { useState: useStateHdr } = React;

const NAV_R = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

// Category → image card + subpages. Paths are root-relative; nested pages
// (portfolio/…) set <base href="../"> so these resolve to the site root.
const PORTFOLIO_MEGA = [
  { label: "Films", href: "portfolio/films.html", res: "navFilms", img: "assets/nav/films.png",
    desc: "Festival narratives, brand films, and original cinematic worlds." },
  { label: "Photography", href: "portfolio/photography.html", res: "navPhotography", img: "assets/nav/photography.png",
    desc: "Portraits, light-painting, and beauty found in imperfection." },
  { label: "Music", href: "portfolio/music.html", res: "navMusic", img: "assets/nav/music.png",
    desc: "TedDrops DJ sets and original scores made to move you." },
  { label: "Literature & Philosophy", href: "portfolio/literature.html", res: "navLiterature", img: "assets/nav/literature.png",
    desc: "Poetry, essays, and worldbuilding for minds that wander." },
];
const HDR_MEGA = { Portfolio: PORTFOLIO_MEGA };

function HdrCaret() {
  return (
    <svg className="tk-caret" viewBox="0 0 24 24" width="16" height="16" fill="none"
         stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function HdrChev() {
  return (
    <svg className="tk-cat__chev" viewBox="0 0 24 24" width="13" height="13" fill="none"
         stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MegaPanel({ active }) {
  return (
    <div className="tk-dropdown tk-mega">
      <div className="tk-mega__grid">
        {PORTFOLIO_MEGA.map((cat) => (
          <a className="tk-cat" key={cat.label} href={cat.href}>
            <span className="tk-cat__card">
              <img src={NAV_R(cat.res, cat.img)} alt={cat.label} />
              <span className="tk-cat__title">{cat.label}</span>
            </span>
            <span className="tk-cat__desc">{cat.desc}</span>
          </a>
        ))}
      </div>
      <div className="tk-mega__foot">
        <span className="tk-mega__foot-note">The full body of work — film, photography, music &amp; word.</span>
        <a className="tk-mega__btn" href="Portfolio.html">
          View Portfolio
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
    </div>
  );
}

function Header({ active = "Portfolio", onNav, onCta }) {
  const items = ["About", "Portfolio", "Work With Ted", "Contact"];
  const HREFS = {
    Home: "index.html",
    About: "About.html",
    Portfolio: "Portfolio.html",
    "Work With Ted": "work-with-ted.html",
    Contact: "contact.html",
  };
  const [open, setOpen] = useStateHdr(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const pick = (e, label) => {
    const href = HREFS[label];
    if (active === label || !href) { e.preventDefault(); }
    else { window.location.href = href; }
    onNav && onNav(label);
    setOpen(false);
  };

  const logoSrc = NAV_R("logo", "assets/logo.png");

  return (
    <header className="tk-header">
      <a className="tk-brand" href={HREFS.Home}>
        <img className="logo" src={logoSrc} alt="Ted Saunders" />
      </a>

      <ul className="tk-nav">
        {items.map((label) => {
          const mega = HDR_MEGA[label];
          return (
            <li key={label} className={mega ? "tk-has-sub" : ""}>
              <a
                className={active === label ? "is-active" : ""}
                onClick={(e) => pick(e, label)}
                href={HREFS[label] || "#"}
              >{label}{mega ? <HdrCaret/> : null}</a>
              {mega ? <MegaPanel active={active}/> : null}
            </li>
          );
        })}
      </ul>

      {/* Hamburger — only renders on mobile via CSS */}
      <button
        className="tk-menu-toggle"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        </svg>
      </button>

      {/* Full-screen mobile menu overlay */}
      <div className={"tk-mobile-menu" + (open ? " is-open" : "")}>
        <button
          className="close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
        {items.map((label) => (
          <React.Fragment key={label}>
            <a
              className={active === label ? "is-active" : ""}
              onClick={(e) => pick(e, label)}
              href={HREFS[label] || "#"}
            >{label}</a>
            {HDR_MEGA[label] ? (
              <div className="tk-mobile-sub">
                {HDR_MEGA[label].map((cat) => (
                  <React.Fragment key={cat.label}>
                    <a href={cat.href} className="tk-mobile-cat" onClick={() => setOpen(false)}>{cat.label}</a>
                    <span className="tk-mobile-catdesc">{cat.desc}</span>
                  </React.Fragment>
                ))}
                <a href="Portfolio.html" className="tk-mobile-viewport" onClick={() => setOpen(false)}>View Portfolio</a>
              </div>
            ) : null}
          </React.Fragment>
        ))}
        {typeof Button !== "undefined" ? (
          <Button variant="turquoise" onClick={() => { onCta && onCta(); setOpen(false); }}>
            EXPLORE THE WORK
          </Button>
        ) : (
          <a className="tk-mobile-cta" href="index.html" onClick={() => setOpen(false)}>EXPLORE THE WORK</a>
        )}
      </div>
    </header>
  );
}

window.Header = Header;
