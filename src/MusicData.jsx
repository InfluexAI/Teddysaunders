// ============================================================
//  MusicData — every DJ set, release, archive tape and highlight
//  on the Music page. One source of truth; sections read from here.
//  Resource keys resolve against window.__resources (see music.html).
//  Drop a real SoundCloud embed URL into `scUrl` and the styled
//  transport is replaced by the live player automatically.
// ============================================================
const MD_R = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

// ---- DJ SETS (TedDrops & Mastercodes) ----
const DJ_SETS_PLAYLIST = "https://soundcloud.com/teddrops/sets/teddrops-dj-sets";

const MUSIC_DJSETS = [
  {
    id: "teddrops-festival", kicker: "TedDrops · Live Set", title: "Peak State — Abraxas Afters",
    art: "musician", cover: "https://i1.sndcdn.com/artworks-FmkYUgBDeXpt4Ikv-HoSbxQ-t500x500.jpg", scUrl: "https://soundcloud.com/teddrops/peakstate", run: "1:58:24", plays: "42K", tag: "Bass / Cinematic",
    desc: "A festival-length ritual — bass-driven, cinematic, built on one slow-rising emotional arc from opening ceremony to sunrise afterglow.",
  },
  {
    id: "mastercodes-01", kicker: "Mastercodes · DJ Set", title: "Bass Church — Live Set",
    art: "posterSynthesis", cover: "https://i1.sndcdn.com/artworks-oYuVkpN91w9qmhrj-RTyRLw-t500x500.png", scUrl: "https://soundcloud.com/teddrops/basschurch", run: "1:12:06", plays: "28K", tag: "Melodic / Electronic",
    desc: "Melodic techno and electronic textures woven into a single unbroken build — the crowd held in the palm of one rhythm.",
  },
  {
    id: "teddrops-playa", kicker: "TedDrops · Live Recording", title: "Into the Caverns",
    art: "posterBubbles", scUrl: "https://soundcloud.com/teddrops/into-the-caverns-live-set", run: "58:40", plays: "31K", tag: "Downtempo / Warm",
    desc: "A dawn set recorded on the open playa — warm downtempo frequencies for the last hour before the sun crests the horizon.",
  },
  {
    id: "mastercodes-exclusive", kicker: "Mastercodes · Live Set", title: "Bass Temple Dance",
    art: "ipProsopagnosia", scUrl: "https://soundcloud.com/teddrops/bass-temple-dance-live-set", run: "1:04:18", plays: "19K", tag: "Deep / Hypnotic",
    desc: "A members-only after-hours mix — deep, hypnotic, and unhurried. The room reduced to a heartbeat and a horizon.",
  },
  {
    id: "dj-mastercodes-mystic-manor-activation-live", kicker: "Mastercodes · Live Set", title: "Mastercodes - Mystic Manor Activation (live set)",
    art: "musician", setIdx: 0, tag: "Melodic / Ritual",
    desc: "An activation set for Mystic Manor — melodic, ceremonial, and built to hold a room in one long exhale.",
  },
  {
    id: "dj-the-infamous-uf-fro-art-car-sunrise-set-", kicker: "TedDrops · Sunrise Set", title: "The Infamous UF-FRO Art Car Sunrise Set at LIB",
    art: "posterSynthesis", setIdx: 1, tag: "Sunrise / Playa",
    desc: "The UF-FRO art car at Lightning in a Bottle, playing the hour the sky turns — warm, weightless, and unhurried.",
  },
  {
    id: "dj-butter-nuggets-3-hour-dj-set-from-tina-a", kicker: "TedDrops · Wedding Set", title: "Butter Nuggets (3+ hour DJ Set from Tina and Rewi's Wedding)",
    art: "posterBubbles", setIdx: 2, tag: "Open Format",
    desc: "Three hours from Tina and Rewi's wedding — open-format and generous, moving a whole family across one night.",
  },
  {
    id: "dj-nonstop-bass-drops-new-years-eve-2019-li", kicker: "TedDrops · Live Set", title: "Nonstop Bass Drops (New Years Eve 2019 Live Set)",
    art: "ipProsopagnosia", setIdx: 3, tag: "Bass / NYE",
    desc: "New Year's Eve 2019 — relentless bass, no gaps, built to carry a room straight through midnight.",
  },
  {
    id: "dj-dragon-fire-burning-man-bass-set", kicker: "TedDrops · Burning Man", title: "Dragon Fire (Burning Man Bass Set)",
    art: "film2", setIdx: 4, tag: "Bass / Playa",
    desc: "A Burning Man bass set with the heat of the thing it's named for — heavy, elemental, unrepentant.",
  },
  {
    id: "dj-a-lightning-in-a-bottle-morning-5-hour-d", kicker: "TedDrops · Festival Set", title: "A Lightning in a Bottle Morning (5+ Hour DJ Set)",
    art: "film5", setIdx: 5, tag: "Morning / Long-Form",
    desc: "Five hours of a Lightning in a Bottle morning — the full arc from last-dark to full-sun in one continuous take.",
  },
  {
    id: "dj-future-bass-pop-drops-live-dj-set-from-a", kicker: "TedDrops · Live Set", title: "Future Bass POP Drops (Live DJ Set from Arielle Om's Birthday)",
    art: "posterPlaces", setIdx: 6, tag: "Future Bass / Pop",
    desc: "A birthday set for Arielle Om — future bass with pop bones, bright and unserious in the best way.",
  },
  {
    id: "dj-dragon-upon-a-burning-temple-sunset-to-t", kicker: "TedDrops · Burning Man", title: "Dragon Upon A Burning Temple (Sunset to Temple Burn)",
    art: "film6", setIdx: 7, tag: "Sunset / Ceremonial",
    desc: "From sunset to the Temple burn — a set that follows the light down and the fire up.",
  },
  {
    id: "dj-ecstatic-dance-the-upgrade-live-set-reco", kicker: "TedDrops · Ecstatic Dance", title: "Ecstatic Dance: The Upgrade ~ Live Set recorded at the Upgrade Retreat",
    art: "film1", setIdx: 8, tag: "Ecstatic / Journey",
    desc: "Recorded at the Upgrade Retreat — an ecstatic dance journey with a clear beginning, middle, and landing.",
  },
  {
    id: "dj-shadows-into-light-dj-set-from-an-affini", kicker: "TedDrops · DJ Set", title: "Shadows into Light (DJ Set from an Affinity Party)",
    art: "film3", setIdx: 9, tag: "Dark to Light",
    desc: "An Affinity party set that earns its title — starting in shadow and arriving, eventually, somewhere luminous.",
  },
  {
    id: "dj-tripping-into-dirt-dj-set", kicker: "TedDrops · DJ Set", title: "Tripping Into Dirt (DJ Set)",
    art: "film4", setIdx: 10, tag: "Gritty / Groove",
    desc: "Grit-forward and grounded — a set that stays low to the earth and grooves there.",
  },
  {
    id: "dj-a-spicy-syrup-sunrise-3-hour-set", kicker: "TedDrops · Sunrise Set", title: "A Spicy Syrup Sunrise (3+ hour Set)",
    art: "film7", setIdx: 11, tag: "Sunrise / Long-Form",
    desc: "Three-plus hours of sunrise at the Syrup — sweet, hot, and paced for people who never went to bed.",
  },
  {
    id: "dj-burlesque-booty-bounce-at-amori-s-casino", kicker: "TedDrops · Burning Man", title: "Burlesque Booty Bounce at Amori's Casino, Burning Man 2016",
    art: "musician", setIdx: 12, tag: "Burlesque / Bounce",
    desc: "Amori's Casino, Burning Man 2016 — burlesque bounce for a crowd dressed for trouble.",
  },
  {
    id: "dj-electro-crunk-booty-bouncin-highlove-s-l", kicker: "TedDrops · Live Set", title: "Electro-Crunk-Booty-Bouncin @ Highlove's Lounge LIB 2016",
    art: "posterSynthesis", setIdx: 13, tag: "Electro / Crunk",
    desc: "Highlove's Lounge at LIB 2016 — electro-crunk with the low end turned all the way up.",
  },
  {
    id: "dj-dionysus-sexy-party-the-syrup-loft", kicker: "TedDrops · Loft Set", title: "Dionysus Sexy Party @ The Syrup Loft",
    art: "posterBubbles", setIdx: 14, tag: "Sultry / House",
    desc: "The Syrup Loft, in full Dionysian mode — sultry, close, and built for a room with no corners.",
  },
  {
    id: "dj-vampire-lounge-set-2", kicker: "TedDrops · Lounge Set", title: "Vampire Lounge Set 2",
    art: "ipProsopagnosia", setIdx: 15, tag: "Dark / Lounge",
    desc: "The second Vampire Lounge set — nocturnal, velvet-dark, and patient.",
  },
  {
    id: "dj-vampire-lounge-set-1", kicker: "TedDrops · Lounge Set", title: "Vampire Lounge Set 1",
    art: "film2", setIdx: 16, tag: "Dark / Lounge",
    desc: "Where the Vampire Lounge began — after-dark textures for a room that prefers candlelight.",
  },
  {
    id: "dj-rancho-relaxo-sunrise-set", kicker: "TedDrops · Sunrise Set", title: "Rancho Relaxo Sunrise Set",
    art: "film5", setIdx: 17, tag: "Downtempo / Warm",
    desc: "A sunrise set at Rancho Relaxo — downtempo and warm, made for the slowest hour of the party.",
  },
  {
    id: "dj-penthouse-sunrise-at-z-s-loft", kicker: "TedDrops · Loft Set", title: "Penthouse Sunrise At Z's Loft",
    art: "posterPlaces", setIdx: 18, tag: "Sunrise / House",
    desc: "Sunrise from a penthouse at Z's loft — the city coming up while the room refuses to sit down.",
  },
  {
    id: "dj-resourcery-my-first-ever-dj-set", kicker: "TedDrops · Live Set", title: "Resourcery (My first ever DJ Set)",
    art: "film6", setIdx: 19, tag: "Debut / Archive",
    desc: "The first set Ted ever played, kept exactly as it happened — the origin point of everything after it.",
  },
  {
    id: "dj-adventures-in-whenderland-live-set", kicker: "TedDrops · Live Set", title: "Adventures in Whenderland - Live Set",
    art: "film1", setIdx: 20, tag: "Whimsical / Bass",
    desc: "A trip through Whenderland — whimsical, bass-lit, and never quite where you expect it to be.",
  },
];

// ---- LATEST RELEASES (Original Music) ----
const MUSIC_RELEASES = [
  {
    id: "imperfect", title: "Imperfect", genre: "Cinematic Electronic", year: "2024", isNew: true,
    art: "posterEudaimonia", scUrl: "", run: "4:12",
    desc: "A widescreen original production — imperfection rendered as beauty, built from analog warmth and cinematic swells.",
  },
  {
    id: "architect-of-worlds", title: "Architect of Worlds", genre: "Ambient Score", year: "2024", isNew: true,
    art: "ipFated", scUrl: "", run: "6:38",
    desc: "An ambient sound-design piece scored to an imaginary title sequence — drifting pads, distant choirs, and slow gravity.",
  },
  {
    id: "brave-enough", title: "Brave Enough", genre: "Electronic Experiment", year: "2023", isNew: false,
    art: "film2", scUrl: "", run: "3:54",
    desc: "An electronic experiment about seeing the world differently — restless percussion under a single held, hopeful melody.",
  },
  {
    id: "through-film", title: "Through Film", genre: "Soundtrack Concept", year: "2023", isNew: false,
    art: "posterPlaces", scUrl: "", run: "5:20",
    desc: "A soundtrack concept for a film that doesn't exist yet — a theme searching for the story it was always meant to carry.",
  },
];

// ---- CHILDHOOD & HIGH-SCHOOL ARCHIVE (cassette cards) ----
const MUSIC_ARCHIVE = [
  { id: "arc-thoughtful-instrumental", idx: 0, title: "Thoughtful (Instrumental)", label: "Original Beats", year: "", },
  { id: "arc-porcelain-keys-instrumental", idx: 1, title: "Porcelain Keys (instrumental)", label: "Original Beats", year: "", },
  { id: "arc-venus-instrumental", idx: 2, title: "Venus (instrumental)", label: "Original Beats", year: "", },
  { id: "arc-the-beach-2001", idx: 3, title: "The Beach (2001)", label: "Original Beats", year: "", },
  { id: "arc-mandalin", idx: 4, title: "Mandalin", label: "Original Beats", year: "", },
  { id: "arc-open-gates-instrumental", idx: 5, title: "Open Gates (instrumental)", label: "Original Beats", year: "", },
  { id: "arc-bt-communicate-teddy-saunders-remix", idx: 6, title: "BT - Communicate (Teddy Saunders Remix)", label: "Original Beats", year: "", },
  { id: "arc-future-crunk-instrumental", idx: 7, title: "Future Crunk (instrumental)", label: "Original Beats", year: "", },
  { id: "arc-cupid-instrumental", idx: 8, title: "Cupid (instrumental)", label: "Original Beats", year: "", },
  { id: "arc-reggaeton-instrumental", idx: 9, title: "Reggaeton (instrumental)", label: "Original Beats", year: "", },
  { id: "arc-from-spain-instrumental", idx: 10, title: "From Spain (instrumental)", label: "Original Beats", year: "", },
  { id: "arc-eclectic-instrumental", idx: 11, title: "Eclectic (Instrumental)", label: "Original Beats", year: "", },
  { id: "arc-playing-with-dragons", idx: 12, title: "Playing with Dragons", label: "Original Beats", year: "", },
  { id: "arc-come-on-in-instrumental", idx: 13, title: "Come on in (instrumental)", label: "Original Beats", year: "", },
  { id: "arc-random-sauce", idx: 14, title: "Random Sauce", label: "Original Beats", year: "", },
  { id: "arc-mystical-instrumental", idx: 15, title: "Mystical (instrumental)", label: "Original Beats", year: "", },
  { id: "arc-rocky-instrumental", idx: 16, title: "Rocky (instrumental)", label: "Original Beats", year: "", },
  { id: "arc-dance-yo-face-instumental", idx: 17, title: "Dance Yo Face (instumental)", label: "Original Beats", year: "", },
  { id: "arc-phase-breaker", idx: 18, title: "Phase Breaker", label: "Original Beats", year: "", },
  { id: "arc-the-beer-song", idx: 19, title: "THE BEER SONG", label: "Original Beats", year: "", },
  { id: "arc-22-the-beer-song-instrumental", idx: 20, title: "22 The Beer Song (instrumental)", label: "Original Beats", year: "", },
  { id: "arc-oh-the-places-you-ll-go-instrumental", idx: 21, title: "Oh! The Places You'll Go! - Instrumental", label: "Original Beats", year: "", },
  { id: "arc-oh-the-places-you-ll-go-soundtrack", idx: 22, title: "Oh! The Places You'll Go! - Soundtrack", label: "Original Beats", year: "", },
  { id: "arc-poem-of-praise", idx: 23, title: "Poem of Praise", label: "Original Beats", year: "", },
  { id: "arc-magic-moments-soundtrack-from-the-tedsho", idx: 24, title: "Magic Moments Soundtrack (from the Tedshots film)", label: "Original Beats", year: "", },
  { id: "arc-the-punsher", idx: 25, title: "The Punsher", label: "Original Beats", year: "", },
];

// ---- FEATURED HIGHLIGHTS (large layered cards) ----
const MUSIC_HIGHLIGHTS = [
  {
    id: "bass-sets", no: "01", tag: "Live Performance", title: "Bass Music Performance Sets", size: "wide",
    img: "musician", pill: "TedDrops",
    desc: "Festival-scale sets engineered around low-end and emotional buildups — the body first, the mind right behind it.",
  },
  {
    id: "cinematic-ambient", no: "02", tag: "Production", title: "Cinematic Ambient Production", size: "tall",
    img: "ipFated", pill: "Original",
    desc: "Slow, widescreen soundscapes composed like establishing shots — atmosphere you can stand inside.",
  },
  {
    id: "electronic-experiment", no: "03", tag: "Experimentation", title: "Emotional Electronic Experimentation", size: "sm",
    img: "posterSynthesis", pill: "Studio",
    desc: "Restless, searching electronic work — where a broken idea is left in on purpose because it feels true.",
  },
  {
    id: "unreleased-soundtracks", no: "04", tag: "Vault", title: "Unreleased Soundtrack Concepts", size: "sm",
    img: "posterPlaces", pill: "Unreleased",
    desc: "Themes and cues written for films still in development — a score arriving before its picture.",
  },
  {
    id: "future-film-sketches", no: "05", tag: "Sketches", title: "Audio Sketches from Future Film Worlds", size: "wide",
    img: "ipInevitable", pill: "In Progress",
    desc: "Raw sonic sketches from the original sci-fi worlds — the sound of places that don't exist yet, being tuned into being.",
  },
];

// ---- MEDIA / VISUALIZER now-playing loop ----
const MUSIC_NOWPLAYING = [
  { title: "Dust & Devotion", sub: "TedDrops · Live" },
  { title: "Architect of Worlds", sub: "Ambient Score" },
  { title: "Frequencies at 4AM", sub: "Exclusive Mix" },
  { title: "Imperfect", sub: "Cinematic Electronic" },
];

// ---- The worlds Ted explores through sound (overview chips) ----
const MUSIC_WORLDS = [
  "DJ Performances", "Original Productions", "Ambient Sound Design", "Cinematic Scores",
  "Electronic Experimentation", "Soundtrack Concepts", "Storytelling Through Sound",
];

Object.assign(window, {
  MD_R, DJ_SETS_PLAYLIST, MUSIC_DJSETS, MUSIC_RELEASES, MUSIC_ARCHIVE, MUSIC_HIGHLIGHTS, MUSIC_NOWPLAYING, MUSIC_WORLDS,
});

// ---- FILM SOUNDTRACKS ----
const MUSIC_SOUNDTRACKS = [
  {
    id: "places-burning-man", title: "Oh the Places You'll Go", film: "at Burning Man",
    year: "2023", genre: "Cinematic Score", run: "6:24",
    art: "posterPlaces",
    scUrl: "https://soundcloud.com/teddrops/ohtheplaces",
    desc: "The score written for the Burning Man film \u2014 a slow-building cinematic swell that carries the piece from the first dust-lit frame to the burn itself.",
    watch: { label: "Watch the Film", note: "Oh the Places You'll Go \u00b7 Burning Man" },
  },
  {
    id: "magic-moments", title: "Magic Moments", film: "Soundtrack",
    year: "2022", genre: "Original Soundtrack", run: "5:08",
    art: "posterSynthesis",
    scUrl: "https://soundcloud.com/teddrops/magicmoments",
    desc: "An original soundtrack composed to the picture \u2014 warm, unhurried, and built to let the quiet moments in the edit breathe.",
    watch: { label: "Watch the Film", note: "Magic Moments" },
  },
];

Object.assign(window, { MUSIC_SOUNDTRACKS });
