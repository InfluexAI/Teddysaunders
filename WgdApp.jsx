// WgdApp.jsx — "Web & Graphic Design" portfolio page.
// Header · Hero · Intro · four category galleries (4 mockup slots each) · Footer.
const { useState: useWgdState, useCallback: useWgdCb } = React;

const WGD_CATS = [
  { n: "01", key: "websites", title: "Websites", tag: "Web",
    frame: "browser", blurb: "Designed and built end to end." },
  { n: "02", key: "brand", title: "Brand Identity", tag: "Brand",
    frame: "plaque", blurb: "Logos, systems, and visual language." },
  { n: "03", key: "uiux", title: "UI / UX Design", tag: "Product",
    frame: "phone", blurb: "Interfaces people genuinely enjoy using." },
  { n: "04", key: "ai", title: "AI Systems & Automation", tag: "AI",
    frame: "browser", blurb: "Workflows and agents that do the heavy lifting." },
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
      <div className="wgd-card__meta">
        <span className="wgd-card__title">Project Title</span>
        <span className="wgd-card__tag">{cat.tag}</span>
      </div>
    </article>
  );
}

function WgdCategory({ cat }) {
  return (
    <section className="wgd-cat" data-screen-label={cat.title}>
      <div className="wgd-cat__head">
        <div className="wgd-cat__headtext">
          <h2 className="wgd-cat__title ab-textured">{cat.title}</h2>
          <p className="wgd-cat__blurb">{cat.blurb}</p>
        </div>
        <span className="wgd-cat__rule" aria-hidden="true"></span>
      </div>
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
          <h1 className="wgd-hero__title ab-textured">Web &amp; Graphic Design</h1>
          <p className="wgd-hero__sub">
            Designing digital experiences where storytelling, branding, and technology become one.
          </p>
        </div>
        <div className="wgd-hero__fade" aria-hidden="true"></div>
      </header>

      {/* INTRO */}
      <section className="wgd-intro">
        <span className="wgd-intro__mark" aria-hidden="true"></span>
        <div className="wgd-intro__body">
          <p>
            Since COVID, digital design has become Teddy&rsquo;s primary professional focus. What began as
            helping clients build websites evolved into creating complete digital ecosystems&mdash;combining
            branding, UX strategy, interface design, AI workflows, and modern web development.
          </p>
          <p>
            Each project is approached as more than a website. It&rsquo;s an opportunity to tell a story,
            solve problems, and create experiences people genuinely enjoy using.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <div className="wgd-cats">
        {WGD_CATS.map((cat) => <WgdCategory key={cat.key} cat={cat} />)}
      </div>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WgdApp />);
