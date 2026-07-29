// WgdApp.jsx — "Web & Graphic Design" portfolio page.
// Header · Hero · Intro · four category galleries (4 mockup slots each) · Footer.
const { useState: useWgdState, useCallback: useWgdCb } = React;

const WGD_CATS = [
  { n: "01", key: "websites", title: "Websites", tag: "Web",
    frame: "browser", subtitle: "Story-first digital experiences",
    body: "Cinematic marketing sites and portfolios built from story first\u2014every scroll, transition, and frame composed to move people the way a film would. Designed and built end to end, from art direction through the final responsive build.",
    deliverables: ["Art Direction", "Design Systems", "Responsive Build", "Motion & Interaction"],
    link: "View Project" },
  { n: "02", key: "brand", title: "Brand Identity", tag: "Brand",
    frame: "plaque", subtitle: "Marks, systems, and visual language",
    body: "Complete visual languages\u2014marks, type, color, and the rules that hold them together\u2014so a brand feels inevitable across every surface it touches. Each identity is built to carry the same weight in motion as it does in print.",
    deliverables: ["Logo & Marks", "Typography", "Color Systems", "Brand Guidelines"],
    link: "View Project" },
  { n: "03", key: "uiux", title: "UI / UX Design", tag: "Product",
    frame: "phone", subtitle: "Interfaces people enjoy using",
    body: "Product interfaces shaped around real human behavior\u2014flows that feel obvious, screens that feel effortless, details that reward a second look. Research and strategy grounded in what people actually do, not what looks good in a deck.",
    deliverables: ["User Flows", "Wireframes", "Interface Design", "Prototypes"],
    link: "View Project" },
  { n: "04", key: "ai", title: "AI Systems & Automation", tag: "AI",
    frame: "browser", subtitle: "Workflows that do the heavy lifting",
    body: "Custom AI workflows and agents woven into the design process\u2014quietly handling the heavy lifting so the creative work stays front and center. Built to scale a one-person studio into something that moves like a full team.",
    deliverables: ["Workflow Design", "Custom Agents", "Integrations", "Automation"],
    link: "View Project" },
];

function BrowserChrome() {
  return (
    <span className="wgd-chrome" aria-hidden="true">
      <span className="wgd-chrome__dot"></span>
      <span className="wgd-chrome__dot"></span>
      <span className="wgd-chrome__dot"></span>
      <span className="wgd-chrome__bar"></span>
    </span>
  );
}

function WgdCard({ cat, i }) {
  const id = "wgd-" + cat.key + "-" + i;
  return (
    <article className={"wgd-card wgd-card--" + cat.frame}>
      <div className="wgd-card__device">
        {cat.frame === "browser" ? <BrowserChrome /> : null}
        {cat.frame === "phone" ? <span className="wgd-notch" aria-hidden="true"></span> : null}
        <div className="wgd-card__slotwrap">
          <image-slot
            id={id}
            shape="rect"
            fit="cover"
            placeholder="Drop a mockup"
          ></image-slot>
        </div>
      </div>
    </article>
  );
}

function WgdCategory({ cat }) {
  return (
    <section className="wgd-row" data-screen-label={cat.title}>
      {/* LEFT — copy */}
      <div className="wgd-row__copy">
        <div className="wgd-row__copyinner">
          <h2 className="wgd-row__title ab-textured">{cat.title}</h2>
          <p className="wgd-row__subtitle">{cat.subtitle}</p>
          <p className="wgd-row__body">{cat.body}</p>
          <div className="wgd-row__foot">
            <div className="wgd-row__col">
              <span className="wgd-row__coltitle">Deliverables</span>
              <ul className="wgd-row__list">
                {cat.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <div className="wgd-row__col">
              <span className="wgd-row__coltitle">Link</span>
              <a className="wgd-row__link" href="#">{cat.link}</a>
            </div>
          </div>
        </div>
      </div>
      {/* RIGHT — graphics */}
      <div className={"wgd-grid wgd-grid--" + cat.frame}>
        {[1, 2, 3, 4].map((i) => <WgdCard key={i} cat={cat} i={i} />)}
      </div>
    </section>
  );
}

function WgdApp() {
  const go = (label) => {
    const map = {
      Home: "index.html", About: "About.html", Portfolio: "Portfolio.html",
      "Work With Ted": "work-with-ted.html", Contact: "contact.html",
    };
    if (map[label]) window.location.href = map[label];
  };

  return (
    <div className="wgd-page">
      <Header active="Portfolio" onNav={go} onCta={() => { window.location.href = "index.html"; }} />

      {/* HERO */}
      <header className="wgd-hero" data-screen-label="Web & Graphic Design — Hero">
        <div className="wgd-hero__aura" aria-hidden="true"></div>
        <div className="wgd-hero__inner">
          <p className="ab-eyebrow">Portfolio · Digital</p>
          <h1 className="wgd-hero__title ab-textured">AI, Web &amp; Graphic Design</h1>
          <p className="wgd-hero__sub">
            Designing digital experiences where storytelling, branding, and technology become one.
          </p>
        </div>
        <div className="wgd-hero__fade" aria-hidden="true"></div>
      </header>

      {/* CATEGORIES */}
      <div className="wgd-cats">
        {WGD_CATS.map((cat) => <WgdCategory key={cat.key} cat={cat} />)}
      </div>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WgdApp />);
