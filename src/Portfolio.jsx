// Portfolio.jsx — "TEDFLIX" archive: a tabbed, arrow-navigable FocusRail
// coverflow. Tabs (Films · Photography · Music · Literature) each drive their
// own carousel of real portfolio works. No scroll lock — the visitor drives it.
const { useState: usePfState } = React;

function Portfolio({ onExplore }) {
  const R = (typeof window !== "undefined" && window.__resources) || {};
  const img = (key, fallback) => R[key] || fallback;

  const CATEGORIES = [
    {
      id: "film", label: "Films",
      blurb: "Sit back and enjoy original films from Ted.",
      items: [
        { id: "places", title: "Oh, The Places You\u2019ll Go", meta: "01 \u2014 Documentary \u00b7 2014",
          description: "A psychedelic odyssey through the dust and devotion of the playa.",
          imageSrc: img("posterPlaces", "assets/portfolio/poster-places.png"), videoUrl: "" },
        { id: "synthesis", title: "The Great Synthesis", meta: "02 \u2014 Experimental \u00b7 2023",
          description: "There is no light without shadow \u2014 a meditation on duality.",
          imageSrc: img("posterSynthesis", "assets/portfolio/poster-synthesis.png"), videoUrl: "" },
        { id: "eudaimonia", title: "The Crossroads to Eudaimonia", meta: "03 \u2014 Short Film \u00b7 2021",
          description: "A seeker chooses between comfort and meaning at the edge of a new world.",
          imageSrc: img("posterEudaimonia", "assets/portfolio/poster-eudaimonia.png"), videoUrl: "" },
        { id: "lovers", title: "Lovers of the Playa", meta: "04 \u2014 Documentary \u00b7 2020",
          description: "Two souls, one horizon, and the ephemeral magic of Black Rock City.",
          imageSrc: img("posterBubbles", "assets/portfolio/poster-bubbles.png"), videoUrl: "" },
      ],
    },
    {
      id: "photography", label: "Photography",
      blurb: "Linger on stills that hold a whole story in a single frame.",
      items: [
        { id: "surreal", title: "Surreal Experiment", meta: "01 \u2014 Photography",
          description: "Reality bent until it reveals something truer than the real.",
          imageSrc: img("film4", "assets/film/photo-4.jpg"), videoUrl: "" },
        { id: "lightpaint", title: "Light Painting", meta: "02 \u2014 Photography",
          description: "Time drawn in long exposures of moving light.",
          imageSrc: img("film8", "assets/film/photo-8.jpg"), videoUrl: "" },
        { id: "composite", title: "Commercial Composite", meta: "03 \u2014 Photography",
          description: "Brand storytelling built frame by frame.",
          imageSrc: img("film5", "assets/film/photo-5.jpg"), videoUrl: "" },
        { id: "wedding", title: "The Wedding", meta: "04 \u2014 Photography",
          description: "The fleeting, the vowed, and the unrepeatable.",
          imageSrc: img("film6", "assets/film/photo-6.jpg"), videoUrl: "" },
        { id: "longexp", title: "Long Exposure", meta: "05 \u2014 Photography",
          description: "Stillness stretched until the world blurs into feeling.",
          imageSrc: img("film3", "assets/film/photo-3.jpg"), videoUrl: "" },
      ],
    },
    {
      id: "music", label: "Music",
      blurb: "Turn it up — frequencies tuned to move the body and wake the mind.",
      items: [
        { id: "musicvideo", title: "Music Video", meta: "01 \u2014 Music",
          description: "Sound made visible \u2014 a story told in frequency and frame.",
          imageSrc: img("film1", "assets/film/photo-1.jpg"), videoUrl: "" },
        { id: "liveset", title: "Live Set", meta: "02 \u2014 Music",
          description: "A room held in a single, building rhythm.",
          imageSrc: img("film8", "assets/film/photo-8.jpg"), videoUrl: "" },
        { id: "studio", title: "Studio Session", meta: "03 \u2014 Music",
          description: "Where ideas become sound and sound becomes feeling.",
          imageSrc: img("film3", "assets/film/photo-3.jpg"), videoUrl: "" },
        { id: "soundscape", title: "Soundscape", meta: "04 \u2014 Music",
          description: "Frequency designed to awaken the mind.",
          imageSrc: img("film6", "assets/film/photo-6.jpg"), videoUrl: "" },
      ],
    },
    {
      id: "literature", label: "Literature",
      blurb: "Slow down and read words for those brave enough to think differently.",
      items: [
        { id: "ignorance", title: "The Book of Ignorance", meta: "01 \u2014 Philosophy",
          description: "Truth cannot be possessed. It can only be experienced.",
          imageSrc: img("posterEudaimonia", "assets/portfolio/poster-eudaimonia.png"), videoUrl: "" },
        { id: "nature", title: "The Nature of Ignorance", meta: "02 \u2014 Essay",
          description: "The greatest frontier is not out there, it is within.",
          imageSrc: img("ipInevitable", "assets/ip/inevitable.jpg"), videoUrl: "" },
        { id: "creativity", title: "Creativity & Consciousness", meta: "03 \u2014 Essay",
          description: "Creation is a conversation between the seen and unseen.",
          imageSrc: img("ipProsopagnosia", "assets/ip/prosopagnosia.jpg"), videoUrl: "" },
        { id: "human", title: "The Human Experience", meta: "04 \u2014 Poetry",
          description: "We are stories becoming aware of themselves.",
          imageSrc: img("ipFated", "assets/ip/fated.jpg"), videoUrl: "" },
      ],
    },
  ];

  const [tab, setTab] = usePfState(0);
  const cat = CATEGORIES[tab];

  return (
    <section className="tk-ip-section">
      <div className="ip-pin">
        <FocusRail
          key={cat.id}
          items={cat.items}
          loop={true}
          arrows={true}
          controlsCta={
            <Button variant="bronze" onClick={onExplore}>EXPLORE THE PORTFOLIO &nbsp;→</Button>
          }
          header={
            <React.Fragment>
              <div className="tedflix-eyebrow" aria-label="Explore the Library">
                <span className="tedflix-eyebrow__lead">Explore the</span>
                <span className="tedflix-eyebrow__word">Library</span>
              </div>
              <div className="tk-tedivider tk-tedivider--logo">
                <div className="rule" />
                {(() => {
                  const R = window.__resources || {};
                  const WORD = {
                    film:        { src: R.tedflix      || "assets/word-tedflix.png",      alt: "TEDFLIX" },
                    photography: { src: R.wordShots    || "assets/word-tedshots.png",     alt: "TedShots" },
                    music:       { src: R.wordDrops    || "assets/word-teddrops.png",     alt: "TedDrops" },
                    literature:  { src: R.wordThoughts || "assets/word-tedthoughts.png",  alt: "TedThoughts" },
                  }[cat.id];
                  return <img className="tk-tedflix" src={WORD.src} alt={WORD.alt} />;
                })()}
                <div className="rule" />
              </div>
              <div className="tedflix-tabs" role="tablist" aria-label="Browse the archive">
                {CATEGORIES.map((c, i) => (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={i === tab}
                    className={"tedflix-tab" + (i === tab ? " is-active" : "")}
                    onClick={() => setTab(i)}
                  >{c.label}</button>
                ))}
              </div>
              <p className="tedflix-tabsub">{cat.blurb}</p>
            </React.Fragment>
          }
        />
      </div>
    </section>
  );
}

window.Portfolio = Portfolio;
