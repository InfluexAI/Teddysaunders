// Header.jsx — top nav with a hamburger toggle on mobile.
const { useState: useStateHdr } = React;

function Header({ active = "Portfolio", onNav, onCta }) {
  const items = ["About", "Portfolio", "Work With Ted", "Contact"];
  const HREFS = {
    Home: "index.html",
    About: "About.html",
    Portfolio: "Portfolio.html",
    "Work With Ted": "work-with-ted.html",
    Contact: "contact.html",
  };
  // Category dropdown(s). Paths are root-relative; nested pages (portfolio/…)
  // set <base href="../"> so these resolve to the site root everywhere.
  const SUBMENUS = {
    Portfolio: [
      { label: "Photography", href: "portfolio/photography.html" },
      { label: "Music", href: "portfolio/music.html" },
      { label: "Literature", href: "portfolio/literature.html" },
    ],
  };
  const [open, setOpen] = useStateHdr(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Real navigation: go to the destination page unless we're already on it.
  const pick = (e, label) => {
    const href = HREFS[label];
    if (active === label || !href) { e.preventDefault(); }
    else { window.location.href = href; }
    onNav && onNav(label);
    setOpen(false);
  };

  return (
    <header className="tk-header">
      <a className="tk-brand" href={HREFS.Home}>
        <img className="logo" src={(window.__resources && window.__resources.logo) || "assets/logo.png"} alt="Ted Saunders" />
      </a>

      <ul className="tk-nav">
        {items.map((label) => {
          const sub = SUBMENUS[label];
          return (
            <li key={label} className={sub ? "tk-has-sub" : ""}>
              <a
                className={active === label ? "is-active" : ""}
                onClick={(e) => pick(e, label)}
                href={HREFS[label] || "#"}
              >{label}{sub ? (
                <svg className="tk-caret" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : null}</a>
              {sub ? (
                <div className="tk-dropdown">
                  {sub.map((s) => (
                    <a key={s.label} href={s.href} className={active === s.label ? "is-active" : ""}>{s.label}</a>
                  ))}
                </div>
              ) : null}
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
            {SUBMENUS[label] ? (
              <div className="tk-mobile-sub">
                {SUBMENUS[label].map((s) => (
                  <a key={s.label} href={s.href} className="tk-mobile-subitem"
                     onClick={() => setOpen(false)}>{s.label}</a>
                ))}
              </div>
            ) : null}
          </React.Fragment>
        ))}
        <Button variant="turquoise" onClick={() => { onCta && onCta(); setOpen(false); }}>
          EXPLORE THE WORK
        </Button>
      </div>
    </header>
  );
}

window.Header = Header;
