// Header.jsx — shared top nav (logo + links) used by EVERY page.
// Portfolio expands into a cinematic mega-menu: 4 image-card categories, each
// with a click-to-expand list of subpages.
const { useState: useStateHdr } = React;

const NAV_R = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

// Category → image card + subpages. Paths are root-relative; nested pages
// (portfolio/…) set <base href="../"> so these resolve to the site root.
const PORTFOLIO_MEGA = [
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
          <div className="tk-cat" key={cat.label}>
            <a className="tk-cat__card" href={cat.href}>
              <img src={NAV_R(cat.res, cat.img)} alt={cat.label} />
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
                    {cat.items.map((s) => (
                      <a key={s.label} href={s.href} className="tk-mobile-subitem" onClick={() => setOpen(false)}>{s.label}</a>
                    ))}
                  </React.Fragment>
                ))}
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
