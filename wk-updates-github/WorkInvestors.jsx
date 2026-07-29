// WorkInvestors.jsx — For Investors · Back original projects and IP.
// Films & TV in development (cards → popup with compass/ip/title), the four
// ventures, and the Tedcast apply band. Popups render through WorkModal.
const { useState: useInvState } = React;

const WK_FILMS = [
  { id: "fated", num: "World 01", title: "The Fated", kind: "Feature Film · In Development",
    imgSrc: "assets/ip/fated.jpg",
    log: "A man who released a dark god to end a war must now lead rebels to save the world — and his wife — from the corrupt order he unknowingly served.",
    fragK: "Prophecy Fragment", fragQ: "When the god is set free, the order will kneel in ash." },
  { id: "juiced", num: "World 02", title: "JUICED", kind: "Feature Film · In Development",
    imgSrc: "assets/ip/juiced.jpg",
    log: "Based on a true story: kidnapped, forced to sell fruit juice in the ghetto, and awoken to the realities of race, class, and culture.",
    fragK: "Field Journal", fragQ: "They took everything but the hunger to be something more." },
  { id: "prosopagnosia", num: "World 03", title: "Prosopagnosia", kind: "Feature Film · In Development",
    imgSrc: "assets/ip/prosopagnosia.jpg",
    log: "A man who loses the ability to recognize faces must find his kidnapped fiancée, aided only by an elixir that bends time.",
    fragK: "Temporal Elixir Notes", fragQ: "One drop unlocks the moments between moments." },
  { id: "inevitable", num: "World 04", title: "Inevitable", kind: "Series · In Development",
    imgSrc: "assets/ip/inevitable.jpg",
    log: "The first human consciousness inside a cyborg body understands everything — except where we came from. So he ushers existence toward the singularity.",
    fragK: "Consciousness Architecture", fragQ: "Identity = pattern. Pattern = data. Data = eternal." },
];

const WK_VENTURES = [
  { id: "infinit", mono: "IS", title: "InfinitStudios.com", kind: "Venture",
    desc: "Ted's full-stack creative agency — film, animation, web, and AI for ambitious brands.",
    log: "Ted's full-stack creative agency — film, animation, web, and AI for ambitious brands.",
    fragK: "Mandate", fragQ: "Make the impossible look inevitable." },
  { id: "tedshots", mono: "TS", title: "TedShots.com", kind: "Venture",
    desc: "Headshot photography company capturing people at their most alive.",
    log: "Headshot photography company capturing people at their most alive.",
    fragK: "Mandate", fragQ: "Every face has a frame that tells the truth." },
  { id: "brooracle", mono: "BO", title: "BroOracle",           kind: "Venture",
    desc: "Draw a card. Forge your manhood. Guidance and ritual for the modern man.",
    log: "Draw a card. Forge your manhood. Guidance and ritual for the modern man.",
    fragK: "Mandate", fragQ: "Draw a card. Forge your manhood." },
  { id: "speechtobook", mono: "SB", title: "SpeechtoBook",     kind: "Venture",
    desc: "Write your book with your voice, with step-by-step guidance from idea to manuscript.",
    log: "Write your book with your voice, with step-by-step guidance from idea to manuscript.",
    fragK: "Mandate", fragQ: "Every voice is already a book — waiting to be heard." },
  { id: "celestial", mono: "CC", title: "The Celestial Compass", kind: "Venture",
    desc: "Use your birthday to discover who you are, and get AI guidance from the stars on every decision.",
    log: "Use your birthday to discover who you are, and get AI guidance from the stars on every decision.",
    fragK: "Mandate", fragQ: "The stars were always a map. Now they answer back." },
  { id: "dreambox",  mono: "PD", title: "Project Dreambox",   kind: "Venture",
    desc: "A platform built to help people's dreams come true.",
    log: "A platform built to help people's dreams come true.",
    fragK: "Mandate", fragQ: "Make the dream the most practical thing you own." },
  { id: "instudios", mono: "IS", title: "InStudios.net",      kind: "Venture",
    desc: "Virtual Studio to manage clients, projects, employees and hours.",
    log: "Virtual Studio to manage clients, projects, employees and hours.",
    fragK: "Mandate", fragQ: "One studio to run every client, project, and hour." },
];

// Brands Ted has built — outbound links to the live sites.
const WK_BRANDS = [
  { id: "trustedcmo",  mono: "TC", title: "trustedcmo.com",                  desc: "Fractional CMO leadership and marketing strategy for growing companies.", url: "https://trustedcmo.com/" },
  { id: "hatchers",    mono: "HP", title: "Hatcherspearls.com",             desc: "Luxury pearl jewelry brand \u2014 timeless pieces, crafted to last.", url: "https://hatcherspearls.com/" },
  { id: "goodplanet",  mono: "GP", title: "goodplanet.green",               desc: "Sustainability platform for a greener, more conscious planet.", url: "https://goodplanet.green/" },
  { id: "cannect",     mono: "CW", title: "cannectwellness.com",            desc: "Wellness brand connecting people to healthier, more balanced living.", url: "https://cannectwellness.com/" },
  { id: "fifthkind",   mono: "5K", title: "5thkind.webflow.io",             desc: "Enterprise content and media management platform.", url: "https://5thkind.webflow.io/" },
  { id: "acton",       mono: "AO", title: "act-on.com",                     desc: "Marketing automation platform for growth-focused teams.", url: "https://act-on.com/" },
  { id: "tchain",      mono: "TC", title: "tchain.webflow.io",              desc: "Blockchain platform bringing trust and transparency to the chain.", url: "https://tchain.webflow.io/" },
  { id: "edr",         mono: "ED", title: "englishfordisputeresolution.com", desc: "Specialized English training for legal and dispute-resolution professionals.", url: "https://englishfordisputeresolution.com/" },
  { id: "raiinmaker",  mono: "RM", title: "raiinmaker1.webflow.io",         desc: "Decentralized platform rewarding creators for their influence.", url: "https://raiinmaker1.webflow.io/" },
  { id: "infinit",     mono: "IS", title: "infinitstudios.com",             desc: "Full-stack creative agency \u2014 film, animation, web, and AI for ambitious brands.", url: "https://infinitstudios.com/" },
  { id: "darvish",     mono: "DV", title: "darvish.webflow.io",             desc: "Brand and portfolio site built for a modern visionary.", url: "https://darvish.webflow.io/" },
  { id: "genesisgems", mono: "GG", title: "genesis-gems.webflow.io",        desc: "Premium gemstone brand \u2014 rare stones, timeless design.", url: "https://genesis-gems.webflow.io/" },
];

// BroOracle wordmark SVG (matches about page)
function BroOracleLogo() {
  return (
    <svg className="wk-vcard__brosvg" viewBox="0 0 500 56" fill="none" role="img" aria-label="BRO·ORACLE">
      <g fill="#D6A24A">
        <g transform="rotate(45 22 30)"><rect x="19" y="8" width="6" height="34" rx="1.5" /><rect x="12" y="5" width="20" height="9" rx="2" /></g>
        <g transform="rotate(-45 22 30)"><rect x="19" y="8" width="6" height="34" rx="1.5" /><rect x="12" y="5" width="20" height="9" rx="2" /></g>
      </g>
      <text x="52" y="40" fontFamily="Syne, sans-serif" fontWeight="800" fontSize="36" letterSpacing="1" fill="#F5EDE3">BRO·ORACLE</text>
    </svg>
  );
}

function VentureMark({ v }) {
  if (v.id === "brooracle") return <div className="wk-vcard__logo-slot"><BroOracleLogo /></div>;
  return <div className="wk-vcard__mark">{v.mono}</div>;
}

function WorkModal({ item, onClose, onInquire }) {
  const isFilm = !!(item && item.num);
  const open = !!item;
  return (
    <div className={"wk-modal" + (open ? " is-open" : "")} onClick={onClose} aria-hidden={!open}>
      <div className="wk-modal__scrim"></div>
      {item && (
        <div className="wk-modal__card" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={item.title}>
          <button className="wk-modal__close" aria-label="Close" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <div className="wk-modal__art">
            <img src={item.imgSrc} alt={item.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            <div className="wk-modal__art-scrim" aria-hidden="true"></div>
          </div>
          <div className="wk-modal__pane">
            <span className="wk-modal__badge">{item.num || "Venture"} · Compass</span>
            <h3 className="wk-modal__title wk-textured">{item.title}</h3>
            <p className="wk-modal__kind">{item.kind}</p>
            <p className="wk-modal__log">{item.log}</p>
            <div className="wk-modal__frag">
              <div className="wk-modal__frag-k">{item.fragK}</div>
              <p className="wk-modal__frag-q">{item.fragQ}</p>
            </div>
            {isFilm && (
              <button className="wk-btn wk-btn--solid wk-modal__cta" onClick={() => { onClose && onClose(); onInquire && onInquire(); }}>
                Inquire to See The Deck
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function WorkInvestors({ onTedcast, onInquire }) {
  const [modal, setModal] = useInvState(null);

  useInvState && null;
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="wk-sec wk-sec--dark" id="wk-investors" style={{ paddingTop: 0 }}>
      <div className="wk-dust" aria-hidden="true"></div>
      <div className="wk-inner">
        <WkIntro
          num="03"
          eyebrow="For Investors"
          title={<React.Fragment>Back original<br />projects and IP</React.Fragment>}
          titleClass="wk-textured"
          imgSrc="assets/pathways/investors.jpg"
          imgId="wk-intro-investors"
          imgPlaceholder="Original IP — cinematic world key art"
          body={<p>Personally invest in high impact original visions. Unique stories and platforms designed to transform, touch and uplift humanity.</p>}
        />

        {/* films & tv */}
        <p className="wk-subtitle">Films &amp; TV in Development</p>
        <div className="wk-filmgrid wk-reveal">
          {WK_FILMS.map((f) => (
            <article className="wk-ipcard" key={f.id} onClick={() => setModal(f)} role="button" aria-label={"Open " + f.title}>
              <img src={f.imgSrc} alt={f.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              <div className="wk-ipcard__scrim" aria-hidden="true"></div>
              <div className="wk-ipcard__body">
                <div className="wk-ipcard__num">{f.num}</div>
                <h3 className="wk-ipcard__title">{f.title}</h3>
                <span className="wk-ipcard__more">View World
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* ventures */}
        <div className="wk-vband wk-reveal">
          <h2 className="wk-vtitle wk2-textured">Personal Ventures</h2>
          <div className="wk-cardgrid">
            {WK_VENTURES.map((v) => (
              <article className="wk-vcard" key={v.id} onClick={() => setModal(v)} role="button" aria-label={"Open " + v.title}>
                <VentureMark v={v} />
                <div className="wk-vcard__rule"></div>
                <h3 className="wk-vcard__title">{v.title}</h3>
                <p className="wk-vcard__desc">{v.desc}</p>
                <span className="wk-vcard__go">Visit site
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M7 17 17 7M9 7h8v8" /></svg>
                </span>
              </article>
            ))}
          </div>

          <p className="wk-subtitle wk-brands-sub">Brands Built for Others</p>
          <div className="wk-cardgrid">
            {WK_BRANDS.map((b) => {
              const inner = (
                <React.Fragment>
                  <div className="wk-vcard__mark">{b.mono}</div>
                  <div className="wk-vcard__rule"></div>
                  <h3 className="wk-vcard__title">{b.title}</h3>
                  <p className="wk-vcard__desc">{b.desc}</p>
                  {b.url ? (
                    <span className="wk-vcard__go">{b.temp ? "Visit (temporary)" : "Visit site"}
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M7 17 17 7M9 7h8v8" /></svg>
                    </span>
                  ) : (
                    <span className="wk-vcard__go wk-vcard__go--soon">Coming soon</span>
                  )}
                </React.Fragment>
              );
              return b.url ? (
                <a className="wk-vcard" key={b.id} href={b.url} target="_blank" rel="noopener noreferrer" aria-label={"Visit " + b.title}>{inner}</a>
              ) : (
                <article className="wk-vcard wk-vcard--soon" key={b.id} aria-label={b.title}>{inner}</article>
              );
            })}
          </div>
        </div>

        {/* tedcast — full-width hero band */}
        <section className="wk-tedcast wk-reveal" aria-label="Tedcast">
          <div className="wk-tedcast__veil"></div>
          <div className="wk-tedcast__inner">
            <span className="wk-tedcast__eyebrow">The Podcast</span>
            <h3 className="wk-tedcast__title wk-textured">Tedcast</h3>
            <p className="wk-tedcast__sub">Apply to be a guest on Ted's podcast — long-form conversations on story, craft, and the worlds we build.</p>
            <button className="wk-btn wk-btn--solid wk-tedcast__btn" onClick={onTedcast}>
              Apply to be on tedcast
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        </section>
      </div>

      <WorkModal item={modal} onClose={() => setModal(null)} onInquire={onInquire} />
    </section>
  );
}

window.WorkInvestors = WorkInvestors;
