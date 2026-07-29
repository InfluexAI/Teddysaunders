// Portfolio.jsx — "TEDFLIX" living archive: an interactive media explorer.
// Four disciplines (Films · Photography · Music · Literature); selecting one
// changes the whole featured experience — its atmosphere, its curated works,
// and the dynamic CTA. The center card is the active featured work; clicking a
// neighbour glides it to center. Powered by the FocusRail coverflow.
const { useState: usePfState } = React;

function Portfolio({ onExplore }) {
  const R = (typeof window !== "undefined" && window.__resources) || {};
  const img = (key, fallback) => R[key] || fallback;

  const CATEGORIES = [
    {
      id: "film", label: "Films", atmosphere: "theatre", icon: "film",
      blurb: "Step into the screening room — original films, brand worlds, and stories built for the people.",
      items: [
        { id: "places", title: "Oh, The Places You\u2019ll Go", category: "Films for the People",
          year: "2014", medium: "Documentary", duration: "18 min", icon: "film",
          description: "A psychedelic odyssey through the dust and devotion of the playa.",
          ctaLabel: "Explore all Films",
          imageSrc: img("posterPlaces", "assets/portfolio/poster-places.png"), videoUrl: "" },
        { id: "salesforce", title: "Salesforce Futureforce Global", category: "Corporate Films",
          year: "2022", medium: "Brand Film", duration: "3 min", icon: "film",
          description: "A global culture campaign that made a workforce feel like a movement.",
          ctaLabel: "Explore Corporate Films",
          imageSrc: img("posterSynthesis", "assets/portfolio/poster-synthesis.png"), videoUrl: "" },
        { id: "destiny", title: "Destiny Now", category: "Art Films",
          year: "2023", medium: "Experimental", duration: "9 min", icon: "film",
          description: "There is no light without shadow \u2014 a meditation cast in motion.",
          ctaLabel: "Explore Art Films",
          imageSrc: img("posterEudaimonia", "assets/portfolio/poster-eudaimonia.png"), videoUrl: "" },
        { id: "novadontics", title: "Novadontics Commercial", category: "Commercials",
          year: "2021", medium: "Commercial", duration: "60 sec", icon: "film",
          description: "Sixty seconds engineered to make a brand impossible to forget.",
          ctaLabel: "Explore Commercial Work",
          imageSrc: img("posterBubbles", "assets/portfolio/poster-bubbles.png"), videoUrl: "" },
      ],
    },
    {
      id: "photography", label: "Photography", atmosphere: "gallery", icon: "camera",
      blurb: "Walk the gallery — stills that hold a whole story in a single frame.",
      items: [
        { id: "portraits", title: "Artist Portraits", category: "Portraiture",
          year: "2023", medium: "Photography", duration: "Series", icon: "camera",
          description: "Faces lit until the person behind them shows through.",
          ctaLabel: "Explore Artist Portraits",
          imageSrc: img("heroPhotographer", "assets/heroes/photographer.jpg"), videoUrl: "" },
        { id: "lightpaint", title: "Light Painting", category: "Long Exposure",
          year: "2022", medium: "Photography", duration: "Series", icon: "camera",
          description: "Time drawn by hand in long exposures of moving light.",
          ctaLabel: "Explore Light Painting",
          imageSrc: img("film8", "assets/film/photo-8.jpg"), videoUrl: "" },
        { id: "stock", title: "Stock Photography", category: "Commercial",
          year: "2021", medium: "Photography", duration: "Library", icon: "camera",
          description: "A working library of moments brands reach for again and again.",
          ctaLabel: "Explore Stock Photography",
          imageSrc: img("film5", "assets/film/photo-5.jpg"), videoUrl: "" },
        { id: "texture", title: "Art & Texture", category: "Abstract",
          year: "2023", medium: "Photography", duration: "Series", icon: "camera",
          description: "Reality bent until it reveals something truer than the real.",
          ctaLabel: "Explore Art & Texture",
          imageSrc: img("film4", "assets/film/photo-4.jpg"), videoUrl: "" },
        { id: "headshots", title: "Headshots", category: "Portraiture",
          year: "2024", medium: "Photography", duration: "Series", icon: "camera",
          description: "The fleeting, the vowed, and the unrepeatable \u2014 held still.",
          ctaLabel: "Explore Headshots",
          imageSrc: img("heroCinematographer", "assets/heroes/cinematographer.jpg"), videoUrl: "" },
      ],
    },
    {
      id: "music", label: "Music", atmosphere: "concert", icon: "music",
      blurb: "Turn it up — frequencies tuned to move the body and wake the mind.",
      items: [
        { id: "djsets", title: "DJ Sets", category: "Live Performance",
          year: "2023", medium: "Audio", duration: "Live", icon: "music",
          description: "A room held in a single, building rhythm.",
          ctaLabel: "Explore all DJ Sets",
          imageSrc: img("heroMusician", "assets/heroes/musician.jpg"), videoUrl: "" },
        { id: "songs", title: "Original Songs", category: "Songwriting",
          year: "2022", medium: "Audio", duration: "Album", icon: "music",
          description: "Sound made personal \u2014 written, played, and sung from the source.",
          ctaLabel: "Explore Original Music",
          imageSrc: img("film1", "assets/film/photo-1.jpg"), videoUrl: "" },
        { id: "soundtracks", title: "Movie Soundtracks", category: "Scoring",
          year: "2023", medium: "Score", duration: "Catalogue", icon: "music",
          description: "Scores composed to carry a story the way only sound can.",
          ctaLabel: "Explore Soundtracks",
          imageSrc: img("posterSynthesis", "assets/portfolio/poster-synthesis.png"), videoUrl: "" },
        { id: "musicvideos", title: "Music Videos", category: "Direction",
          year: "2021", medium: "Film", duration: "Series", icon: "music",
          description: "Sound made visible \u2014 a story told in frequency and frame.",
          ctaLabel: "Explore Music",
          imageSrc: img("film3", "assets/film/photo-3.jpg"), videoUrl: "" },
      ],
    },
    {
      id: "literature", label: "Literature", atmosphere: "study", icon: "book",
      blurb: "Pull up a chair by candlelight — words for those brave enough to think differently.",
      items: [
        { id: "ignorance", title: "The Book of Ignorance", category: "Philosophy",
          year: "2023", medium: "Book", duration: "Volume", icon: "book",
          description: "Truth cannot be possessed. It can only be experienced.",
          ctaLabel: "Explore The Book of Ignorance",
          imageSrc: img("posterEudaimonia", "assets/portfolio/poster-eudaimonia.png"), videoUrl: "" },
        { id: "praise", title: "Poem of Praise", category: "Poetry",
          year: "2022", medium: "Poem", duration: "Verse", icon: "book",
          description: "We are stories becoming aware of themselves.",
          ctaLabel: "Read More Poetry",
          imageSrc: img("heroPhilosopher", "assets/heroes/philosopher.jpg"), videoUrl: "" },
        { id: "thought", title: "Featured Thought", category: "TedThoughts",
          year: "2024", medium: "Essay", duration: "Short Read", icon: "book",
          description: "The greatest frontier is not out there, it is within.",
          ctaLabel: "Explore TedThoughts",
          imageSrc: img("ipInevitable", "assets/ip/inevitable.jpg"), videoUrl: "" },
        { id: "article", title: "Featured Article", category: "Essay",
          year: "2023", medium: "Article", duration: "Long Read", icon: "book",
          description: "Creation is a conversation between the seen and the unseen.",
          ctaLabel: "Explore Literature",
          imageSrc: img("ipProsopagnosia", "assets/ip/prosopagnosia.jpg"), videoUrl: "" },
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
          atmosphere={cat.atmosphere}
          onExplore={onExplore}
          header={
            <React.Fragment>
              <div className="tedflix-eyebrow" aria-label="Explore the Library">
                <span className="tedflix-eyebrow__lead">Explore the</span>
                <span className="tedflix-eyebrow__word">Library</span>
              </div>
              <div className="tk-tedivider tk-tedivider--logo">
                <div className="rule" />
                {(() => {
                  const R2 = window.__resources || {};
                  const WORD = {
                    film:        { src: R2.tedflix      || "assets/word-tedflix.png",      alt: "TEDFLIX" },
                    photography: { src: R2.wordShots    || "assets/word-tedshots.png",     alt: "TedShots" },
                    music:       { src: R2.wordDrops    || "assets/word-teddrops.png",     alt: "TedDrops" },
                    literature:  { src: R2.wordThoughts || "assets/word-tedthoughts.png",  alt: "TedThoughts" },
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
