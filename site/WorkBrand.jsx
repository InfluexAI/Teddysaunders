// WorkBrand.jsx — /Brand Marketing · For Businesses.
// Take your Business to new levels: services grid, accolade, testimonial
// slider, media-ideas strip, and dual CTAs (Start a Project / Infinit Studios).
const WK_SERVICES = [
  "Film & Video Production",
  "Photography",
  "Branding",
  "Creative Strategy",
  "AI Systems Design",
  "Web Direction and Development",
  "Speaking & Podcasting",
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
          imgId="wk-intro-brand"
          imgPlaceholder="Ted directing a cinematic brand campaign"
          body={<React.Fragment>
            <p>Ted can be hired for film direction, photography, branding, creative strategy, immersive storytelling, speaking engagements, and collaborative future projects.</p>
            <p>This is also the home of The Fated and other cinematic worlds currently in development.</p>
          </React.Fragment>}
        />
        <div className="wk-head wk-reveal" style={{ maxWidth: 760 }}>
          <div className="wk-accolade wk-reveal">
            <span className="wk-accolade__k">Accolades</span>
            <span className="wk-accolade__v">3 clients lead to acquisitions (glint, 5th Kind, Toolchain)</span>
          </div>
        </div>

        {/* creative services */}
        <p className="wk-subtitle" style={{ color: "#9A6A2C" }}>Creative Services</p>
        <div className="wk-services wk-reveal">
          {WK_SERVICES.map((s, i) => (
            <div className="wk-service" key={s}>
              <span className="wk-service__num">{String(i + 1).padStart(2, "0")}</span>
              <span className="wk-service__name">{s}</span>
            </div>
          ))}
        </div>

        {/* testimonials */}
        <div className="wk-reveal">
          <TestimonialSlider title="Testimonials · Brand & Marketing Clients" items={WK_BRAND_TESTIMONIALS} />
        </div>

        {/* media ideas */}
        <p className="wk-subtitle" style={{ color: "#9A6A2C" }}>Media</p>
        <div className="wk-media-strip wk-reveal">
          {WK_MEDIA_IDEAS.map((m) => (
            <figure className="wk-media" key={m.id}>
              <image-slot id={m.id} shape="rect" placeholder={m.cap}></image-slot>
              <figcaption className="wk-media__cap">{m.cap}</figcaption>
            </figure>
          ))}
        </div>

        {/* CTAs */}
        <div className="wk-cta-row wk-cta-row--center wk-reveal" style={{ marginTop: "clamp(48px,7vh,90px)" }}>
          <button className="wk-btn wk-btn--solid" onClick={onStart}>
            Start a Project
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
          <button className="wk-btn wk-btn--ghost" onClick={onStudios}>
            Go to Infinit Studios
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 17 17 7M9 7h8v8" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

window.WorkBrand = WorkBrand;
