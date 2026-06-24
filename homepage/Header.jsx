// Header.jsx — top nav with a hamburger toggle on mobile.
const { useState: useStateHdr } = React;

function Header({ active = "Films", onNav, onCta }) {
  const items = ["About", "Work With Me", "Films", "Consulting"];
  const [open, setOpen] = useStateHdr(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const pick = (label) => { onNav && onNav(label); setOpen(false); };

  return (
    <header className="tk-header">
      <a className="tk-brand" onClick={() => onNav && onNav("Home")}>
        <img className="logo" src={(window.__resources && window.__resources.logo) || "assets/logo.png"} alt="Ted Saunders" />
      </a>

      <ul className="tk-nav">
        {items.map((label) => (
          <li key={label}>
            <a
              className={active === label ? "is-active" : ""}
              onClick={(e) => { e.preventDefault(); pick(label); }}
              href="#"
            >{label}</a>
          </li>
        ))}
      </ul>

      <Button variant="turquoise" onClick={onCta}>EXPLORE THE WORK</Button>

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
          <a
            key={label}
            className={active === label ? "is-active" : ""}
            onClick={(e) => { e.preventDefault(); pick(label); }}
            href="#"
          >{label}</a>
        ))}
        <Button variant="turquoise" onClick={() => { onCta && onCta(); setOpen(false); }}>
          EXPLORE THE WORK
        </Button>
      </div>
    </header>
  );
}

window.Header = Header;
