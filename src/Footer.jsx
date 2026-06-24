// Footer.jsx — opt-in finale, laid out to the approved reference:
//   LEFT   — "Download My Free Guide" (book cover + name/email + CTA)
//   CENTER — Ted (the hooded-philosopher scene) as the full-bleed centerpiece
//   RIGHT  — "Connect with Ted" social rail (rune-marked rows)
//   BASE   — compass wordmark divider + sitemap nav + agency credit
const { useState: useFtState } = React;

function Footer({ onSubscribe }) {
  const [form, setFt] = useFtState({ name: "", email: "" });
  const set = (k) => (e) => setFt((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); onSubscribe && onSubscribe(form); };

  const socials = [
    { label: "Facebook", href: "#", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { label: "Instagram", href: "#", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
    { label: "YouTube", href: "#", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
    { label: "X", href: "#", path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933zm-1.291 19.57h2.039L6.486 3.24H4.298l13.312 17.483z" },
  ];

  return (
    <footer className="tk-footer2">
      {/* Center centerpiece — Ted with the glowing grimoire */}
      <div className="ft-bg" aria-hidden="true">
        <img
          className="ft-bg__img"
          src={(window.__resources && window.__resources.footerScene) || "assets/footer-scene.jpg"}
          alt=""
        />
        <div className="ft-bg__fade" />
      </div>

      <div className="ft-inner">
        {/* LEFT — opt-in */}
        <div className="ft-optin">
          <div className="ft-optin__copy">
            <h2 className="ft-optin__head">Download My<br />Free Guide</h2>
            <p className="ft-optin__sub">7 Questions That Turn a Moment Into a Story</p>
            <form className="ft-optin__form" onSubmit={submit}>
              <input type="text" placeholder="Name" value={form.name} onChange={set("name")} aria-label="Name" />
              <input type="email" placeholder="Email" value={form.email} onChange={set("email")} aria-label="Email" required />
              <button type="submit" className="ft-optin__btn">Download Now</button>
            </form>
          </div>
        </div>

        {/* CENTER — Ted shows through here */}
        <div className="ft-spacer" aria-hidden="true"></div>

        {/* RIGHT — connect */}
        <div className="ft-connect">
          <h2 className="ft-connect__head">Connect<br />with <strong>Ted</strong></h2>
          <div className="ft-connect__rail">
            {socials.map((s) => (
              <a className="ft-social" href={s.href} key={s.label} aria-label={"Follow on " + s.label}>
                <span className="ft-social__label">Follow on <strong>{s.label}</strong></span>
                <span className="ft-social__rune" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d={s.path} /></svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* BASE — compass wordmark + sitemap */}
      <div className="ft-base">
        <div className="ft-mark">
          <span className="ft-mark__rule" />
          <div className="ft-mark__center">
            <img className="ft-mark__logo" src={(window.__resources && window.__resources.logoMark) || "assets/logo-mark.png"} alt="Ted Saunders" />
          </div>
          <span className="ft-mark__rule" />
        </div>

        <nav className="ft-nav" aria-label="Footer">
          <a href="About.html">About</a>
          <a href="Portfolio.html">Portfolio</a>
          <a href="work-with-ted.html">Work With Ted</a>
          <a href="contact.html">Contact</a>
        </nav>

        <div className="ft-credit">
          <span>Innovated by</span> <strong>INFLUEX</strong>
        </div>
        <div className="ft-legal">
          &copy; 2026 Ted Saunders &nbsp;·&nbsp; <a href="#">Terms</a> &nbsp;·&nbsp; <a href="#">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
