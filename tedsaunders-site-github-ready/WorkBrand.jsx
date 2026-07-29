// WorkBrand.jsx — /Brand Marketing · For Businesses.
// Take your Business to new levels: services grid, accolade, testimonial
// slider, media-ideas strip, and dual CTAs (Start a Project / Infinit Studios).
const WK_SERVICES = [
  { n: "01", title: "Film & Video Production",       id: "wk-svc-film" },
  { n: "02", title: "Photography",                   id: "wk-svc-photo" },
  { n: "03", title: "Branding",                       id: "wk-svc-brand" },
  { n: "04", title: "Creative Strategy",              id: "wk-svc-strat" },
  { n: "05", title: "AI Systems Design",              id: "wk-svc-ai" },
  { n: "06", title: "Web Direction & Development",    id: "wk-svc-web" },
  { n: "07", title: "Speaking & Podcasting",          id: "wk-svc-speak" },
];

const WK_MEDIA_IDEAS = [
  { id: "wk-media-concept",  cap: "Concept Art" },
  { id: "wk-media-teaser",   cap: "Cinematic Teasers" },
  { id: "wk-media-dev",      cap: "Development Visuals" },
  { id: "wk-media-speaking", cap: "Speaking Footage" },
];

const WK_BRAND_TESTIMONIALS = [
  { body: "Ted didn't just make us a film — he found the soul of the brand and put it on screen.", by: "Brand & Marketing Client" },
  { body: "Creative direction beyond anything we'd seen. The work moved the whole company forward.", by: "Brand & Marketing Client" },
  { body: "We came for a campaign and left with a vision. Then the acquisition came.", by: "Brand & Marketing Client" },
];

function WorkBrand({ onStart, onStudios }) {
  return (
    <section className="wk-sec wk-sec--light" id="wk-brand">
      <div className="wk-inner">
        <WkIntro
          num="02"
          eyebrow="Brand Marketing — Businesses"
          title={<React.Fragment>Take your Business<br />to new levels</React.Fragment>}
          titleStyle={{ color: "#3A2410" }}
          sub="Creative direction beyond the ordinary."
          imgSrc="assets/pathways/brands.jpg"
          imgId="wk-intro-brand"
          imgPlaceholder="Ted directing a cinematic brand campaign"
          body={<React.Fragment>
            <p>Ted can be hired for film direction, photography, branding, creative strategy, immersive storytelling, speaking engagements, and collaborative future projects.</p>
            <p>This is also the home of The Fated and other cinematic worlds currently in development.</p>
          </React.Fragment>}
        />
        <div className="wk-accolade wk-reveal" style={{ marginTop: "clamp(24px,3vh,40px)" }}>
          <span className="wk-accolade__k">Accolades</span>
          <span className="wk-accolade__v">3 clients lead to acquisitions (glint, 5th Kind, Toolchain)</span>
        </div>

        {/* creative services — full-bleed cinematic grid */}
      </div>{/* close wk-inner early so grid goes full-width */}
      <div className="wk-svcgrid-wrap">
        <div className="wk-svcgrid">
          {WK_SERVICES.map((s) => (
            <div className="wk-svccell" key={s.id}>
              <image-slot id={s.id} shape="rect" placeholder={s.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}></image-slot>
              <div className="wk-svccell__scrim" aria-hidden="true" />
              <span className="wk-svccell__num">{s.n}</span>
              <h3 className="wk-svccell__title">{s.title}</h3>
            </div>
          ))}
          {/* CTA card */}
          <div className="wk-svccell wk-svccell--cta">
            <div className="wk-svccell__cta-noise" aria-hidden="true" />
            <span className="wk-svccell__ready">Ready?</span>
            <h3 className="wk-svccell__cta-title">Start a Project</h3>
            <div className="wk-svccell__cta-btns">
              <button className="wk-svccell__cta-btn" onClick={onStart}>
                Let&rsquo;s Talk
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
              <button className="wk-svccell__cta-btn wk-svccell__cta-btn--ghost" onClick={onStudios}>
                Infinit Studios
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M9 7h8v8" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="wk-inner" style={{ paddingTop: 0, paddingBottom: 0 }}>{/* reopen wk-inner for remaining content */}

        {/* testimonials */}
        <div className="wk-reveal">
          <TestimonialSlider items={WK_BRAND_TESTIMONIALS} />
        </div>

      </div>
    </section>
  );
}

window.WorkBrand = WorkBrand;
