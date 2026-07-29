// WorkBrand.jsx — /Brand Marketing · For Businesses.
// Take your Business to new levels: services grid, accolade, testimonial
// slider, media-ideas strip, and dual CTAs (Start a Project / Infinit Studios).
const WK_SERVICES = [
  { n: "01", title: "Film & Video Production",       id: "wk-svc-film",  icon: "film",    img: "assets/film/photo-1.jpg" },
  { n: "02", title: "Photography",                   id: "wk-svc-photo", icon: "camera",  img: "assets/film/photo-2.jpg" },
  { n: "03", title: "Branding",                       id: "wk-svc-brand", icon: "badge",   img: "assets/film/photo-3.jpg" },
  { n: "04", title: "Creative Strategy",              id: "wk-svc-strat", icon: "compass", img: "assets/film/photo-4.jpg" },
  { n: "05", title: "AI Systems Design",              id: "wk-svc-ai",    icon: "chip",    img: "assets/film/photo-5.jpg" },
  { n: "06", title: "Web Direction & Development",    id: "wk-svc-web",   icon: "code",    img: "assets/film/photo-6.jpg" },
  { n: "07", title: "Speaking & Podcasting",          id: "wk-svc-speak", icon: "mic",     img: "assets/film/photo-7.jpg" },
];

// Light line glyphs (bronze stroke) for each creative service.
function SvcIcon({ name }) {
  const c = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  const g = {
    film:    (<g><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16M17 4v16M3 9h4M3 14h4M17 9h4M17 14h4" /></g>),
    camera:  (<g><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /><circle cx="12" cy="13" r="3.4" /></g>),
    badge:   (<g><path d="M12 3l7 4v6c0 4-3 6.5-7 8-4-1.5-7-4-7-8V7z" /><path d="M9 12l2 2 4-4" /></g>),
    compass: (<g><circle cx="12" cy="12" r="9" /><polygon points="15.5,8.5 11,11 8.5,15.5 13,13" fill="currentColor" stroke="none" /></g>),
    chip:    (<g><rect x="6" y="6" width="12" height="12" rx="1.5" /><rect x="9.5" y="9.5" width="5" height="5" rx="0.5" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></g>),
    code:    (<g><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" /></g>),
    mic:     (<g><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></g>),
  };
  return <svg {...c}>{g[name]}</svg>;
}

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
          </React.Fragment>}
          cta={{ label: "Watch the Reel", variant: "wk-btn--ghost", onClick: () => window.open("https://vimeo.com/405296100", "_blank", "noopener") }}
        />
        {/* creative services — full-bleed cinematic grid */}
      </div>{/* close wk-inner early so grid goes full-width */}
      <div className="wk-vgrid-wrap">
        <div className="wk-vgrid">
          {WK_SERVICES.map((s) => (
            <article className="wk-vcard" key={s.id}>
              <img className="wk-vcard__photo" src={s.img} alt="" loading="lazy" />
              <div className="wk-vcard__photoscrim" aria-hidden="true"></div>
              <div className="wk-vcard__logo">
                <span className="wk-vcard__icon"><SvcIcon name={s.icon} /></span>
                <span className="wk-vcard__num">{s.n}</span>
              </div>
              <h3 className="wk-vcard__title">{s.title}</h3>
            </article>
          ))}
          {/* CTA card */}
          <article className="wk-vcard wk-vcard--cta">
            <div className="wk-vcard__cta-noise" aria-hidden="true" />
            <span className="wk-vcard__ready">Ready?</span>
            <h3 className="wk-vcard__cta-title">Start a Project</h3>
            <div className="wk-vcard__cta-btns">
              <button className="wk-vcard__cta-btn" onClick={onStart}>
                Let&rsquo;s Talk
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
              <button className="wk-vcard__cta-btn wk-vcard__cta-btn--ghost" onClick={onStudios}>
                Infinit Studios
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M9 7h8v8" /></svg>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

window.WorkBrand = WorkBrand;
