// WorkInvestors.jsx — For Investors · Back original projects and IP.
// Films & TV in development (cards → popup with compass/ip/title), the four
// ventures, and the Tedcast apply band. Popups render through WorkModal.
const { useState: useInvState } = React;

const WK_FILMS = [
  { id: "fated", num: "World 01", title: "The Fated", kind: "Feature Film · In Development",
    log: "A man who released a dark god to end a war must now lead rebels to save the world — and his wife — from the corrupt order he unknowingly served.",
    fragK: "Prophecy Fragment", fragQ: "When the god is set free, the order will kneel in ash." },
  { id: "juiced", num: "World 02", title: "JUICED", kind: "Feature Film · In Development",
    log: "Based on a true story: kidnapped, forced to sell fruit juice in the ghetto, and awoken to the realities of race, class, and culture.",
    fragK: "Field Journal", fragQ: "They took everything but the hunger to be something more." },
  { id: "prosopagnosia", num: "World 03", title: "Prosopagnosia", kind: "Feature Film · In Development",
    log: "A man who loses the ability to recognize faces must find his kidnapped fiancée, aided only by an elixir that bends time.",
    fragK: "Temporal Elixir Notes", fragQ: "One drop unlocks the moments between moments." },
  { id: "inevitable", num: "World 04", title: "Inevitable", kind: "Series · In Development",
    log: "The first human consciousness inside a cyborg body understands everything — except where we came from. So he ushers existence toward the singularity.",
    fragK: "Consciousness Architecture", fragQ: "Identity = pattern. Pattern = data. Data = eternal." },
];

const WK_VENTURES = [
  { id: "dreambox",  mono: "PD", title: "Project Dreambox",   kind: "Venture",
    log: "A platform built to help people's dreams come true.",
    fragK: "Mandate", fragQ: "Make the dream the most practical thing you own." },
  { id: "speechtobook", mono: "SB", title: "SpeechtoBook",     kind: "Venture",
    log: "Write your book with your voice, with step-by-step guidance from idea to manuscript.",
    fragK: "Mandate", fragQ: "Every voice is already a book — waiting to be heard." },
  { id: "brooracle", mono: "BO", title: "BroOracle",           kind: "Venture",
    log: "Draw a card. Forge your manhood. Guidance and ritual for the modern man.",
    fragK: "Mandate", fragQ: "Draw a card. Forge your manhood." },
  { id: "celestial", mono: "CC", title: "The Celestial Compass", kind: "Venture",
    log: "Use your birthday to discover who you are, and get AI guidance from the stars on every decision.",
    fragK: "Mandate", fragQ: "The stars were always a map. Now they answer back." },
];

function WorkModal({ item, onClose }) {
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
            <image-slot id={"wk-modal-" + item.id} shape="rect" placeholder={item.title + " — key art"}></image-slot>
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
          </div>
        </div>
      )}
    </div>
  );
}

function WorkInvestors({ onTedcast }) {
  const [modal, setModal] = useInvState(null);

  useInvState && null;
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="wk-sec wk-sec--dark" id="wk-investors">
      <div className="wk-dust" aria-hidden="true"></div>
      <div className="wk-inner">
        <WkIntro
          num="03"
          eyebrow="For Investors"
          title={<React.Fragment>Back original<br />projects and IP</React.Fragment>}
          titleClass="wk-textured"
          imgId="wk-intro-investors"
          imgPlaceholder="Original IP — cinematic world key art"
          body={<p>Personally invest in high impact original visions. Unique stories and platforms designed to transform, touch and uplift humanity.</p>}
        />

        {/* films & tv */}
        <p className="wk-subtitle">Films &amp; TV in Development</p>
        <div className="wk-cardgrid wk-reveal">
          {WK_FILMS.map((f) => (
            <article className="wk-ipcard" key={f.id} onClick={() => setModal(f)} role="button" aria-label={"Open " + f.title}>
              <image-slot id={"wk-ip-" + f.id} shape="rect" placeholder={f.title + " — key art"}></image-slot>
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
        <p className="wk-subtitle">Ventures</p>
        <div className="wk-cardgrid wk-reveal">
          {WK_VENTURES.map((v) => (
            <article className="wk-vcard" key={v.id} onClick={() => setModal(v)} role="button" aria-label={"Open " + v.title}>
              <div className="wk-vcard__mark">{v.mono}</div>
              <div>
                <h3 className="wk-vcard__title">{v.title}</h3>
                <span className="wk-vcard__go">Learn more
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* tedcast */}
        <div className="wk-tedcast wk-reveal">
          <div className="wk-tedcast__l">
            <span className="wk-tedcast__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" strokeLinecap="round" /></svg>
            </span>
            <div>
              <h3 className="wk-tedcast__title wk-textured">Tedcast</h3>
              <p className="wk-tedcast__sub">Apply to be on Ted's podcast.</p>
            </div>
          </div>
          <button className="wk-btn wk-btn--ghost" onClick={onTedcast}>
            Apply to Tedcast
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      <WorkModal item={modal} onClose={() => setModal(null)} />
    </section>
  );
}

window.WorkInvestors = WorkInvestors;
