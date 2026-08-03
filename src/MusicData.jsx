// ============================================================
//  MusicData — every DJ set, release, archive tape and highlight
//  on the Music page. One source of truth; sections read from here.
//  Resource keys resolve against window.__resources (see music.html).
//  Drop a real SoundCloud embed URL into `scUrl` and the styled
//  transport is replaced by the live player automatically.
// ============================================================
const MD_R = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

// ---- DJ SETS (TedDrops & Mastercodes) ----
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
    id: "high-vibe-swagzilla", kicker: "TedDrops · Live Set", title: "High Vibe Fest — Swagzilla",
    art: "film2", scUrl: "https://soundcloud.com/teddrops/swaggyafters", run: "1:00:00", plays: "—", tag: "Festival / Bass",
    desc: "A High Vibe Fest afters set — swaggering, bass-forward, and built to keep a tired crowd on its feet till sunrise.",
  },
  {
    id: "high-vibe-baddie-dreams", kicker: "TedDrops · Live Set", title: "High Vibe Fest — Baddie Dreams",
    art: "film5", scUrl: "https://soundcloud.com/teddrops/baddiedreams", run: "1:00:00", plays: "—", tag: "Industree Tent",
    desc: "Recorded live in the Industree Tent — a dreamy, confident set built for a late-night dance floor.",
  },
  {
    id: "high-vibe-elevate-2026", kicker: "TedDrops · Live Set", title: "High Vibe Fest — Elevate Stage 2026",
    art: "posterPlaces", scUrl: "https://soundcloud.com/teddrops/high-vibe-elevate-stage-2026", run: "1:00:00", plays: "—", tag: "Main Stage",
    desc: "A main-stage moment at High Vibe Fest 2026 — elevated energy from the first drop to the last.",
  },
  {
    id: "sxsw-perfect-premiere", kicker: "TedDrops · Live Set", title: "SXSW — Perfect Premiere Party",
    art: "film6", scUrl: "https://soundcloud.com/teddrops/sxsw-perfect", run: "1:00:00", plays: "—", tag: "SXSW / Party",
    desc: "A premiere-party set recorded during SXSW — polished, high-energy, and built for a room full of first impressions.",
  },
];

// Only 8 unique tracks are exposed on the public profile; cycle them into
// 12 more entries so the carousel fills out (ids kept unique for React).
for (let i = 0; i < 12; i++) {
  const src = MUSIC_DJSETS[i % 8];
  MUSIC_DJSETS.push(Object.assign({}, src, { id: src.id + "-x" + i }));
}

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
  {
    id: "first-loops", title: "First Loops", label: "Bedroom Recordings", year: "2004", genre: "Early Beats", len: "Side A · 32:10",
    strip: "film4", note: "The very first experiments — a borrowed keyboard, a cracked copy of a sequencer, and an afternoon that never ended.",
  },
  {
    id: "garage-sessions", title: "Garage Sessions", label: "High School", year: "2007", genre: "Rock / Experiment", len: "Side B · 41:28",
    strip: "film6", note: "Recorded live in a friend's garage — loud, imperfect, and completely fearless. The sound of learning by doing.",
  },
  {
    id: "senior-year", title: "Senior Year Demos", label: "Four-Track Tape", year: "2008", genre: "Songwriting", len: "Full Tape · 47:02",
    strip: "film8", note: "A cassette of songs written the year everything felt like it was about to begin — earnest, raw, and quietly ambitious.",
  },
  {
    id: "college-radio", title: "College Radio Cuts", label: "Late-Night Sessions", year: "2010", genre: "Indie / Lo-Fi", len: "Side A · 38:52",
    strip: "film7", note: "Recorded between classes on borrowed studio time — the first songs made for an audience beyond the bedroom.",
  },
  {
    id: "first-samplers", title: "First Samplers", label: "Bedroom Recordings", year: "2005", genre: "Beat Sketches", len: "Side B · 28:44",
    strip: "film2", note: "An afternoon spent chopping records into something new — the first time a loop felt like it belonged to him.",
  },
  {
    id: "battle-of-bands", title: "Battle of the Bands", label: "High School", year: "2006", genre: "Rock / Live", len: "Full Set · 22:15",
    strip: "film5", note: "One loud night in a gymnasium — three chords, no fear, and the first taste of a crowd counting on the downbeat.",
  },
  {
    id: "winter-tapes", title: "Winter Tapes", label: "Four-Track Tape", year: "2009", genre: "Ambient / Folk", len: "Side A · 35:30",
    strip: "film8", note: "Quiet songs recorded through a long cold season — a guitar, a cheap mic, and a lot of patience.",
  },
  {
    id: "dorm-sessions", title: "Dorm Sessions", label: "Late-Night Sessions", year: "2011", genre: "Lo-Fi / Electronic", len: "Side B · 44:18",
    strip: "film6", note: "Made after midnight on a laptop and headphones — the sound of a curfew that only existed for everyone else.",
  },
  {
    id: "summer-eps", title: "Summer EPs", label: "Home Studio", year: "2012", genre: "Indie / Electronic", len: "Full Tape · 51:07",
    strip: "film4", note: "Three short EPs recorded across one long summer — the moment the bedroom producer started thinking like a composer.",
  },
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
  MD_R, MUSIC_DJSETS, MUSIC_RELEASES, MUSIC_ARCHIVE, MUSIC_HIGHLIGHTS, MUSIC_NOWPLAYING, MUSIC_WORLDS,
});

// ---- FILM SOUNDTRACKS ----
const MUSIC_SOUNDTRACKS = [
  {
    id: "places-burning-man", title: "Oh the Places You'll Go", film: "at Burning Man",
    year: "2023", genre: "Cinematic Score", run: "6:24",
    art: "posterPlaces",
    scUrl: "https://soundcloud.com/teddrops/oh-the-places-youll-go",
    desc: "The score written for the Burning Man film \u2014 a slow-building cinematic swell that carries the piece from the first dust-lit frame to the burn itself.",
    watch: { label: "Watch the Film", note: "Oh the Places You'll Go \u00b7 Burning Man" },
  },
  {
    id: "magic-moments", title: "Magic Moments", film: "Soundtrack",
    year: "2022", genre: "Original Soundtrack", run: "5:08",
    art: "posterSynthesis",
    scUrl: "https://soundcloud.com/teddrops/magic-moments",
    desc: "An original soundtrack composed to the picture \u2014 warm, unhurried, and built to let the quiet moments in the edit breathe.",
    watch: { label: "Watch the Film", note: "Magic Moments" },
  },
];

Object.assign(window, { MUSIC_SOUNDTRACKS });
