// ArchiveExperience.jsx — "TEDFLIX" reimagined as Ted Saunders' living archive.
// One tabbed section, four BESPOKE rooms — each discipline has its own layout,
// atmosphere, and interaction, so you always know which wing you're standing in
// even with the logo hidden:
//   Films       → a private cinema (projected screen + poster + archive reels)
//   Photography → a gallery exhibition (framed hero print + contact sheet)
//   Music       → a listening room (spinning vinyl + waveform + track list)
//   Literature  → a philosopher's notebook (open manuscript spread + clippings)
// Built on the site's bronze-on-black language; reuses existing assets.
const { useState: useArcState, useEffect: useArcEffect } = React;

const ARC_R = (typeof window !== "undefined" && window.__resources) || {};
const aimg = (key, fallback) => ARC_R[key] || fallback;

/* ============================ DATA ============================ */
const ARCHIVE = [
  {
    id: "film", label: "Films", room: "cinema",
    word: { src: aimg("tedflix", "assets/word-tedflix.png"), alt: "TEDFLIX" },
    blurb: "Step into the screening room — original films, brand worlds, and stories built for the people.",
    works: [
      { id: "places", title: "Oh, The Places You\u2019ll Go", category: "Films for the People",
        year: "2014", runtime: "18 MIN", format: "Documentary",
        awards: ["Official Selection", "Audience Award"],
        logline: "A psychedelic odyssey through the dust and devotion of the playa.",
        cta: "Explore all Films",
        poster: aimg("posterPlaces", "assets/portfolio/poster-places.png") },
      { id: "salesforce", title: "Salesforce Futureforce Global", category: "Corporate Films",
        year: "2022", runtime: "3 MIN", format: "Brand Film",
        awards: ["Brand Film Awards"],
        logline: "A global culture campaign that made a workforce feel like a movement.",
        cta: "Explore Corporate Films",
        poster: aimg("posterSynthesis", "assets/portfolio/poster-synthesis.png") },
      { id: "destiny", title: "Destiny Now", category: "Art Films",
        year: "2023", runtime: "9 MIN", format: "Experimental",
        awards: ["Festival Premiere"],
        logline: "There is no light without shadow — a meditation cast in motion.",
        cta: "Explore Art Films",
        poster: aimg("posterEudaimonia", "assets/portfolio/poster-eudaimonia.png") },
      { id: "novadontics", title: "Novadontics Commercial", category: "Commercials",
        year: "2021", runtime: "60 SEC", format: "Commercial",
        awards: ["National Spot"],
        logline: "Sixty seconds engineered to make a brand impossible to forget.",
        cta: "Explore Commercial Work",
        poster: aimg("posterBubbles", "assets/portfolio/poster-bubbles.png") },
    ],
  },
  {
    id: "photography", label: "Photography", room: "gallery",
    word: { src: aimg("wordShots", "assets/word-tedshots.png"), alt: "TedShots" },
    blurb: "Walk the gallery — stills that hold a whole story in a single frame.",
    works: [
      { id: "portraits", title: "Artist Portraits", category: "Portraiture", year: "2023",
        exif: ["Leica SL2", "50mm Summilux", "f/1.4", "ISO 400"],
        caption: "Faces lit until the person behind them shows through.",
        cta: "Explore Artist Portraits",
        photo: aimg("heroPhotographer", "assets/heroes/photographer.jpg") },
      { id: "lightpaint", title: "Light Painting", category: "Long Exposure", year: "2022",
        exif: ["Nikon Z9", "24mm", "30s", "ISO 100"],
        caption: "Time drawn by hand in long exposures of moving light.",
        cta: "Explore Light Painting",
        photo: aimg("gal5", "assets/gallery/g5.jpg") },
      { id: "stock", title: "Stock Photography", category: "Commercial", year: "2021",
        exif: ["Canon R5", "35mm", "f/2.8", "ISO 200"],
        caption: "A working library of moments brands reach for again and again.",
        cta: "Explore Stock Photography",
        photo: aimg("film5", "assets/film/photo-5.jpg") },
      { id: "texture", title: "Art & Texture", category: "Abstract", year: "2023",
        exif: ["Hasselblad", "80mm", "f/8", "ISO 64"],
        caption: "Reality bent until it reveals something truer than the real.",
        cta: "Explore Art & Texture",
        photo: aimg("film4", "assets/film/photo-4.jpg") },
      { id: "headshots", title: "Headshots", category: "Portraiture", year: "2024",
        exif: ["Leica SL2", "90mm", "f/2.0", "ISO 320"],
        caption: "The unrepeatable, held still — a single honest frame.",
        cta: "Explore Headshots",
        photo: aimg("gal3", "assets/gallery/g3.jpg") },
    ],
  },
  {
    id: "music", label: "Music", room: "listening",
    word: { src: aimg("wordDrops", "assets/word-teddrops.png"), alt: "TedDrops" },
    blurb: "Step into the listening room — frequencies tuned to move the body and wake the mind.",
    works: [
      { id: "djsets", title: "DJ Sets", category: "Live Performance", year: "2023", length: "01:58:24",
        note: "A room held in a single, building rhythm.",
        tracks: ["Opening Ritual", "Dust & Devotion", "Playa Sunrise", "The Long Build", "Afterglow"],
        cta: "Explore all DJ Sets",
        art: aimg("heroMusician", "assets/heroes/musician.jpg") },
      { id: "songs", title: "Original Songs", category: "Songwriting", year: "2022", length: "03:42",
        note: "Sound made personal — written, played, and sung from the source.",
        tracks: ["Imperfect", "Brave Enough", "Through Film", "Architect of Worlds"],
        cta: "Explore Original Music",
        art: aimg("film1", "assets/film/photo-1.jpg") },
      { id: "soundtracks", title: "Movie Soundtracks", category: "Scoring", year: "2023", length: "Catalogue",
        note: "Scores composed to carry a story the way only sound can.",
        tracks: ["Main Title", "The Crossroads", "Eudaimonia", "End Credits"],
        cta: "Explore Soundtracks",
        art: aimg("posterSynthesis", "assets/portfolio/poster-synthesis.png") },
      { id: "musicvideos", title: "Music Videos", category: "Direction", year: "2021", length: "Series",
        note: "Sound made visible — a story told in frequency and frame.",
        tracks: ["Frame One", "Frequency", "Visible Sound", "Last Light"],
        cta: "Explore Music",
        art: aimg("film3", "assets/film/photo-3.jpg") },
    ],
  },
  {
    id: "literature", label: "Literature", room: "notebook",
    word: { src: aimg("wordThoughts", "assets/word-tedthoughts.png"), alt: "TedThoughts" },
    blurb: "Open the notebook — words for those brave enough to think differently.",
    works: [
      { id: "ignorance", title: "The Book of Ignorance", kind: "Philosophy", year: "2023",
        page: "Chapter I",
        excerpt: "Truth cannot be possessed. It can only be experienced. The moment you believe you have captured it, it has already become something else \u2014 a relic of the mind rather than a living thing. To know is to stop looking; to wonder is to keep walking toward the horizon that recedes as you approach.",
        margin: "on knowing & unknowing",
        cta: "Explore The Book of Ignorance" },
      { id: "praise", title: "Poem of Praise", kind: "Poetry", year: "2022",
        page: "Verse",
        excerpt: "We are stories becoming aware of themselves,\nbrief fires learning the shape of their own light \u2014\nimperfect, unrepeatable, and therefore holy.\nPraise the crack that lets the morning in.",
        margin: "a hymn for the imperfect",
        cta: "Read More Poetry" },
      { id: "thought", title: "Featured Thought", kind: "TedThoughts", year: "2024",
        page: "Fragment",
        excerpt: "The greatest frontier is not out there, it is within. Every world I have ever wanted to film already exists \u2014 folded quietly inside the people brave enough to feel it. The camera is only an excuse to look harder.",
        margin: "field notes",
        cta: "Explore TedThoughts" },
      { id: "article", title: "Featured Article", kind: "Essay", year: "2023",
        page: "Essay",
        excerpt: "Creation is a conversation between the seen and the unseen. The artist does not invent so much as listen \u2014 translating the faint signal of an inner world into something another person can stand inside. Craft is simply how clearly you can hear.",
        margin: "on the creative act",
        cta: "Explore Literature" },
    ],
  },
];

/* ====================== SHARED HELPERS ====================== */
function ArcRoomTransition({ keyId, children }) {
  // Re-mounts on tab change (keyed by caller) → entrance animation plays,
  // giving the "stepping into another room" feel.
  return <div className="arc-room-anim" key={keyId}>{children}</div>;
}

/* ============================ CINEMA (FILMS) ============================ */
function CinemaRoom({ works, onExplore }) {
  const [active, setActive] = useArcState(0);
  const w = works[active];
  return (
    <div className="cinema" data-screen-label="Films">
      <div className="cinema-atmos" aria-hidden="true">
        <span className="cinema-beam" />
        <span className="cinema-grain" />
        <span className="cinema-seats" />
      </div>

      <div className="cinema-stage">
        {/* The projected screen — dominant */}
        <div className="cinema-screen" key={"scr-" + w.id}>
          <div className="cinema-screen__fill" style={{ backgroundImage: `url(${w.poster})` }} />
          <img className="cinema-screen__img" src={w.poster} alt={w.title} />
          <div className="cinema-screen__vig" />
          <div className="cinema-marquee"><span className="cinema-marquee__dot" /> NOW SHOWING</div>
          <button className="cinema-play" aria-label={"Play " + w.title}>
            <PlayTriangle size={34} id="cinPlay" />
            <span className="cinema-play__label">Watch Trailer</span>
          </button>
        </div>

        {/* Poster + metadata dossier */}
        <aside className="cinema-dossier" key={"dos-" + w.id}>
          <div className="cinema-poster">
            <img src={w.poster} alt={w.title} />
          </div>
          <div className="cinema-meta">
            <span className="cinema-cat">{w.category}</span>
            <h3 className="cinema-title">{w.title}</h3>
            <div className="cinema-specs">
              <span>{w.year}</span><i /><span>{w.runtime}</span><i /><span>{w.format}</span>
            </div>
            <p className="cinema-logline">{w.logline}</p>
            <div className="cinema-awards">
              {w.awards.map((a) => (
                <span className="cinema-award" key={a}>
                  <Laurel /><em>{a}</em><Laurel flip />
                </span>
              ))}
            </div>
            <Button variant="bronze" onClick={() => onExplore && onExplore(w)}>{w.cta}&nbsp;&rarr;</Button>
          </div>
        </aside>
      </div>

      {/* Archive reels — the rest of the collection */}
      <div className="cinema-reels" role="tablist" aria-label="Film archive">
        {works.map((it, i) => (
          <button key={it.id} role="tab" aria-selected={i === active}
                  className={"reel" + (i === active ? " is-active" : "")}
                  onClick={() => setActive(i)}>
            <span className="reel-can">
              <img src={it.poster} alt="" />
              <span className="reel-sprockets" />
            </span>
            <span className="reel-label">{it.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ========================= GALLERY (PHOTOGRAPHY) ========================= */
function GalleryRoom({ works, onExplore }) {
  const [active, setActive] = useArcState(0);
  const w = works[active];
  return (
    <div className="gal" data-screen-label="Photography">
      <div className="gal-atmos" aria-hidden="true">
        <span className="gal-wall" />
        <span className="gal-spot gal-spot--l" />
        <span className="gal-spot gal-spot--r" />
      </div>

      <div className="gal-stage">
        {/* The framed hero print, with picture-light + plaque */}
        <figure className="gal-frame" key={"fr-" + w.id}>
          <span className="gal-frame__light" />
          <div className="gal-frame__mat">
            <img src={w.photo} alt={w.title} />
          </div>
          <figcaption className="gal-plaque">
            <div className="gal-plaque__head">
              <span className="gal-plaque__cat">{w.category}</span>
              <span className="gal-plaque__yr">{w.year}</span>
            </div>
            <h3 className="gal-plaque__title">{w.title}</h3>
            <p className="gal-plaque__cap">{w.caption}</p>
            <div className="gal-exif">
              {w.exif.map((e) => <span key={e}>{e}</span>)}
            </div>
            <Button variant="bronze" onClick={() => onExplore && onExplore(w)}>{w.cta}&nbsp;&rarr;</Button>
          </figcaption>
        </figure>
      </div>

      {/* Contact sheet — pick a print */}
      <div className="gal-contact" role="tablist" aria-label="Contact sheet">
        <span className="gal-contact__edge gal-contact__edge--t" />
        {works.map((it, i) => (
          <button key={it.id} role="tab" aria-selected={i === active}
                  className={"neg" + (i === active ? " is-active" : "")}
                  onClick={() => setActive(i)}>
            <img src={it.photo} alt={it.title} />
            <span className="neg-no">{String(i + 1).padStart(2, "0")}</span>
          </button>
        ))}
        <span className="gal-contact__edge gal-contact__edge--b" />
      </div>
    </div>
  );
}

/* ======================== LISTENING ROOM (MUSIC) ======================== */
function ListeningRoom({ works, onExplore }) {
  const [active, setActive] = useArcState(0);
  const w = works[active];
  return (
    <div className="lr" data-screen-label="Music">
      <div className="lr-atmos" aria-hidden="true">
        <span className="lr-beam lr-beam--l" />
        <span className="lr-beam lr-beam--r" />
        <span className="lr-fog" />
      </div>

      <div className="lr-stage">
        {/* Now-playing: vinyl + sleeve */}
        <div className="lr-deck" key={"deck-" + w.id}>
          <div className="lr-vinyl">
            <div className="lr-vinyl__disc">
              <span className="lr-vinyl__groove" /><span className="lr-vinyl__groove lr-vinyl__groove--2" />
              <span className="lr-vinyl__label" style={{ backgroundImage: `url(${w.art})` }} />
            </div>
          </div>
          <div className="lr-sleeve">
            <img src={w.art} alt={w.title} />
            <span className="lr-sleeve__sheen" />
          </div>
        </div>

        {/* Track panel */}
        <div className="lr-panel" key={"pan-" + w.id}>
          <span className="lr-nowplaying"><span className="lr-eq-mini"><i /><i /><i /></span> Now Playing</span>
          <h3 className="lr-title">{w.title}</h3>
          <div className="lr-specs"><span>{w.category}</span><i /><span>{w.year}</span><i /><span>{w.length}</span></div>

          {/* Animated waveform / scrubber */}
          <div className="lr-wave" aria-hidden="true">
            {Array.from({ length: 56 }).map((_, i) => (
              <span key={i} style={{ animationDelay: (i * 0.045 % 1.6) + "s" }} />
            ))}
          </div>

          <ol className="lr-tracks">
            {w.tracks.map((t, i) => (
              <li key={t} className={i === 0 ? "is-playing" : ""}>
                <span className="lr-tracks__no">{String(i + 1).padStart(2, "0")}</span>
                <span className="lr-tracks__name">{t}</span>
                {i === 0 && <span className="lr-tracks__bars"><i /><i /><i /></span>}
              </li>
            ))}
          </ol>
          <p className="lr-note">{w.note}</p>
          <Button variant="bronze" onClick={() => onExplore && onExplore(w)}>{w.cta}&nbsp;&rarr;</Button>
        </div>
      </div>

      {/* Vinyl sleeves rack */}
      <div className="lr-rack" role="tablist" aria-label="Records">
        {works.map((it, i) => (
          <button key={it.id} role="tab" aria-selected={i === active}
                  className={"lr-rec" + (i === active ? " is-active" : "")}
                  onClick={() => setActive(i)}>
            <span className="lr-rec__disc" />
            <img src={it.art} alt={it.title} />
            <span className="lr-rec__label">{it.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ====================== NOTEBOOK (LITERATURE) ====================== */
function NotebookRoom({ works, onExplore }) {
  const [active, setActive] = useArcState(0);
  const w = works[active];
  const lines = w.excerpt.split("\n");
  const first = lines[0] || "";
  const drop = first.charAt(0);
  const restFirst = first.slice(1);
  return (
    <div className="nb" data-screen-label="Literature">
      <div className="nb-atmos" aria-hidden="true">
        <span className="nb-candle" />
        <span className="nb-shelf" />
        <span className="nb-paper" />
      </div>

      <div className="nb-stage">
        {/* The open manuscript spread */}
        <article className="nb-book" key={"bk-" + w.id}>
          <span className="nb-book__spine" />
          <div className="nb-page nb-page--left">
            <div className="nb-kind">{w.kind} · {w.year}</div>
            <div className="nb-pagehead">{w.page}</div>
            <h3 className="nb-title">{w.title}</h3>
            <span className="nb-margin">{w.margin}</span>
            <span className="nb-rule" />
          </div>
          <div className="nb-page nb-page--right">
            <p className="nb-excerpt">
              <span className="nb-drop">{drop}</span>{restFirst}
              {lines.slice(1).map((ln, i) => <span key={i} className="nb-line">{ln}</span>)}
            </p>
            <div className="nb-sign">— Ted Saunders</div>
            <Button variant="bronze" onClick={() => onExplore && onExplore(w)}>{w.cta}&nbsp;&rarr;</Button>
          </div>
        </article>
      </div>

      {/* Notebook tabs / clippings */}
      <div className="nb-clips" role="tablist" aria-label="Writings">
        {works.map((it, i) => (
          <button key={it.id} role="tab" aria-selected={i === active}
                  className={"clip" + (i === active ? " is-active" : "")}
                  onClick={() => setActive(i)}>
            <span className="clip-kind">{it.kind}</span>
            <span className="clip-title">{it.title}</span>
            <span className="clip-tab" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================ PARENT ============================ */
function Portfolio({ onExplore }) {
  const [tab, setTab] = useArcState(0);
  const cat = ARCHIVE[tab];

  const Room = { cinema: CinemaRoom, gallery: GalleryRoom, listening: ListeningRoom, notebook: NotebookRoom }[cat.room];

  return (
    <section className="tk-ip-section arc-section">
      <div className="arc">
        {/* Shared header — unchanged brand lockup */}
        <div className="fr-header arc-header">
          <div className="tedflix-eyebrow" aria-label="Explore the Library">
            <span className="tedflix-eyebrow__lead">Explore the</span>
            <span className="tedflix-eyebrow__word">Archive</span>
          </div>
          <div className="tk-tedivider tk-tedivider--logo">
            <div className="rule" />
            <img className="tk-tedflix" src={cat.word.src} alt={cat.word.alt} />
            <div className="rule" />
          </div>
          <div className="tedflix-tabs" role="tablist" aria-label="Browse the archive">
            {ARCHIVE.map((c, i) => (
              <button key={c.id} role="tab" aria-selected={i === tab}
                      className={"tedflix-tab" + (i === tab ? " is-active" : "")}
                      onClick={() => setTab(i)}>{c.label}</button>
            ))}
          </div>
          <p className="tedflix-tabsub">{cat.blurb}</p>
        </div>

        {/* The room — each discipline its own wing */}
        <ArcRoomTransition keyId={cat.id}>
          <Room works={cat.works} onExplore={onExplore} />
        </ArcRoomTransition>
      </div>
    </section>
  );
}

window.Portfolio = Portfolio;
