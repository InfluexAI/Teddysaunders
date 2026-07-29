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
    { label: "Facebook", rune: "\u16A0" },
    { label: "Instagram", rune: "\u16D7" },
    { label: "YouTube", rune: "\u16C9" },
    { label: "X", rune: "\u2715" },
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
              <a className="ft-social" href="#" key={s.label} aria-label={"Follow on " + s.label}>
                <span className="ft-social__label">Follow on <strong>{s.label}</strong></span>
                <span className="ft-social__rune" aria-hidden="true">{s.rune}</span>
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
