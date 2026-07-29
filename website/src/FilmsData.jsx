// ============================================================
//  FilmsData — every film, reel, and library entry on the Films
//  page. One source of truth; sections + library read from here.
//  Resource keys resolve against window.__resources (see films.html).
// ============================================================
const FD_R = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

// ---- The two showreels (hero of the "Watch the Reels" section) ----
const FILM_REELS = [
  {
    id: "reel-live", kicker: "Live-Action Reel", title: "The Director's Reel",
    line: "Three minutes of fire, faces, and feeling — the moving image at full voltage.",
    thumb: "reelLive", videoUrl: "", run: "3:12",
  },
  {
    id: "reel-motion", kicker: "Motion Graphics Reel", title: "Frames in Motion",
    line: "Design that breathes — type, light, and geometry choreographed to a pulse.",
    thumb: "reelMotion", videoUrl: "", run: "1:48",
  },
];

// ---- Category vocabulary (the Library filter rail) ----
const FILM_FILTERS = [
  "All", "Narrative", "Documentary", "Fiction", "Nonfiction",
  "Corporate Films", "Festival Films", "Experimental Films",
  "Music Videos", "Motion Graphics", "Childhood", "Written by Ted",
];

// ---- The complete archive. cat = display badge; tags = filter membership ----
// thumb = resource key. similar = three ids recommended in the popup module.
const FILM_LIBRARY = [
  // — Festival & Narrative —
  {
    id: "great-synthesis", title: "The Great Synthesis", sub: "Festival Short", year: "2023",
    cat: "Experimental", tags: ["Festival Films", "Experimental Films", "Fiction"],
    thumb: "posterSynthesis", run: "14:20", views: "182K",
    desc: "There is no light without shadow — a meditation on duality.",
    long: "A wordless descent into the space between opposites. Shot across three deserts over eighteen months, The Great Synthesis stages the eternal argument between light and shadow as a single, breathing organism — and asks whether wholeness is something we find or something we forgive.",
    date: "MAR 14, 2023", bts: true, trailer: true,
    articles: ["Director's Statement — On Duality", "Festival Circuit: Official Selections"],
    similar: ["places-burning-man", "eudaimonia", "honey-money"],
  },
  {
    id: "places-burning-man", title: "Oh, The Places You'll Go at Burning Man", sub: "Documentary", year: "2014",
    cat: "Documentary", tags: ["Festival Films", "Documentary", "Nonfiction"],
    thumb: "posterPlaces", run: "22:05", views: "410K",
    desc: "A psychedelic odyssey through the dust and devotion of the playa.",
    long: "Equal parts love letter and field recording, this is Black Rock City the way it actually feels at 4am — radiant, exhausted, holy. A roaming portrait of the strangers who build a city from nothing and burn it back to dust.",
    date: "SEP 02, 2014", bts: true, trailer: false,
    articles: ["Behind the Dust: Shooting on the Playa", "Why We Burn — An Essay"],
    similar: ["great-synthesis", "eudaimonia", "lovers-playa"],
  },
  {
    id: "eudaimonia", title: "The Crossroads to Eudaimonia", sub: "Short Film", year: "2021",
    cat: "Narrative", tags: ["Festival Films", "Narrative", "Fiction"],
    thumb: "posterEudaimonia", run: "11:40", views: "96K",
    desc: "A seeker chooses between comfort and meaning at the edge of a new world.",
    long: "A modern fable about the most expensive thing a person can do: choose meaning over comfort. At a literal crossroads, a seeker meets two versions of his own future — and the camera refuses to look away from the cost of the right answer.",
    date: "JUN 19, 2021", bts: true, trailer: true,
    articles: ["The Philosophy of Eudaimonia", "On Casting a Mirror"],
    similar: ["when-i-grow-up", "great-synthesis", "waldos-journal"],
  },
  {
    id: "when-i-grow-up", title: "When I Grow Up", sub: "Narrative Short", year: "2019",
    cat: "Narrative", tags: ["Narrative", "Fiction", "Childhood"],
    thumb: "film4", run: "8:30", views: "54K",
    desc: "A child's promise to himself, kept across a lifetime.",
    long: "What does the boy you were ask of the man you became? When I Grow Up cuts between a single childhood afternoon and the decades it set in motion — a quiet reckoning with the contracts we sign before we know the words.",
    date: "APR 07, 2019", bts: false, trailer: false,
    articles: ["Writing the Inner Child"],
    similar: ["eudaimonia", "waldos-journal", "places-burning-man"],
  },
  {
    id: "waldos-journal", title: "Waldo's Journal", sub: "Narrative Short", year: "2018",
    cat: "Narrative", tags: ["Narrative", "Fiction"],
    thumb: "film6", run: "9:55", views: "47K",
    desc: "A found notebook unspools one man's search for himself.",
    long: "Told entirely through the pages of a journal nobody was meant to read, Waldo's Journal is a portrait of a man assembling an identity out of fragments — lists, confessions, and the small lies we tell our own diaries.",
    date: "NOV 11, 2018", bts: false, trailer: false,
    articles: ["The Found-Footage Tradition"],
    similar: ["when-i-grow-up", "eudaimonia", "great-synthesis"],
  },
  // — Commercial Clients —
  {
    id: "salesforce", title: "Futureforce Global", sub: "Salesforce", year: "2022",
    cat: "Corporate", tags: ["Corporate Films", "Nonfiction"],
    thumb: "film1", run: "2:40", views: "—",
    desc: "The next generation of talent, told as a global anthem.",
    long: "A brand film for Salesforce's Futureforce program — a high-velocity anthem stitched from offices on four continents into a single argument: the future of work is the people we invest in now.",
    date: "FEB 22, 2022", bts: true, trailer: false,
    articles: ["Brand Films That Move People"],
    similar: ["ancestry", "varian", "comcast"],
  },
  {
    id: "ancestry", title: "Ancestry.com", sub: "Ancestry", year: "2021",
    cat: "Corporate", tags: ["Corporate Films", "Documentary", "Nonfiction"],
    thumb: "film3", run: "1:55", views: "—",
    desc: "The stories in our blood, brought to light.",
    long: "A documentary-style campaign for Ancestry built on real reunions and real discoveries — proof that the most cinematic stories are the ones already written in a family's past.",
    date: "AUG 30, 2021", bts: false, trailer: false,
    articles: ["Finding Story in Real Lives"],
    similar: ["salesforce", "varian", "comcast"],
  },
  {
    id: "varian", title: "People Success", sub: "Varian", year: "2020",
    cat: "Corporate", tags: ["Corporate Films", "Nonfiction"],
    thumb: "film5", run: "3:05", views: "—",
    desc: "A culture film about the people behind the mission.",
    long: "An internal culture film for Varian — portraits of the people whose work outlasts them, framed with the same care normally reserved for narrative cinema.",
    date: "OCT 12, 2020", bts: false, trailer: false,
    articles: [],
    similar: ["salesforce", "ancestry", "comcast"],
  },
  {
    id: "comcast", title: "Vet Net", sub: "Comcast", year: "2019",
    cat: "Corporate", tags: ["Corporate Films", "Documentary", "Nonfiction"],
    thumb: "film7", run: "2:20", views: "—",
    desc: "Veterans finding a second mission in civilian life.",
    long: "A campaign for Comcast's Veterans Network — honest, restrained, and built around the men and women whose service didn't end when the uniform came off.",
    date: "MAY 23, 2019", bts: false, trailer: false,
    articles: [],
    similar: ["salesforce", "ancestry", "varian"],
  },
  // — Experimental & Music Video —
  {
    id: "destiny-now", title: "Destiny Now", sub: "Michelle Barton", year: "2022",
    cat: "Music Video", tags: ["Music Videos", "Experimental Films"],
    thumb: "film2", run: "4:12", views: "238K",
    desc: "A pop anthem rendered as a fever dream of color and motion.",
    long: "A music video for Michelle Barton's 'Destiny Now' — a saturated, kinetic fever dream where every cut lands on the beat and color does the singing. Equal parts performance film and visual experiment.",
    date: "JUL 08, 2022", bts: true, trailer: false,
    articles: ["Cutting to the Beat"],
    similar: ["whipped-cream", "honey-money", "great-synthesis"],
  },
  {
    id: "whipped-cream", title: "Whipped Cream", sub: "Oriel Poole", year: "2021",
    cat: "Music Video", tags: ["Music Videos", "Experimental Films"],
    thumb: "film8", run: "3:38", views: "171K",
    desc: "Texture, indulgence, and rhythm in a single sustained mood.",
    long: "A music video for Oriel Poole — a study in texture and indulgence that treats the song as an atmosphere to live inside rather than a story to tell. Slow, tactile, and unapologetically sensory.",
    date: "DEC 03, 2021", bts: true, trailer: false,
    articles: [],
    similar: ["destiny-now", "honey-money", "lovers-playa"],
  },
  {
    id: "honey-money", title: "Honey Money", sub: "Music Video", year: "2020",
    cat: "Music Video", tags: ["Music Videos", "Experimental Films", "Fiction"],
    thumb: "ipJuiced", run: "3:50", views: "204K",
    desc: "Greed and sweetness collide in a stylized satirical world.",
    long: "A satirical music video where greed wears a sticky golden grin. Honey Money builds a heightened, candy-coated world and then lets it rot in real time — a fable about appetite told in pop-video grammar.",
    date: "JAN 27, 2020", bts: true, trailer: true,
    articles: ["Satire in the Music Video"],
    similar: ["destiny-now", "whipped-cream", "great-synthesis"],
  },
  // — Motion Graphics & atmosphere —
  {
    id: "frames-in-motion", title: "Frames in Motion", sub: "Motion Graphics Reel", year: "2023",
    cat: "Motion Graphics", tags: ["Motion Graphics", "Experimental Films"],
    thumb: "reelMotion", run: "1:48", views: "—",
    desc: "Type, light, and geometry choreographed to a pulse.",
    long: "A sizzle of motion-design work — kinetic type, generative geometry, and light studies cut to a single driving pulse. The graphic language that threads through Ted's title sequences and brand work.",
    date: "JAN 05, 2023", bts: false, trailer: false,
    articles: [],
    similar: ["destiny-now", "salesforce", "great-synthesis"],
  },
  {
    id: "lovers-playa", title: "Lovers of the Playa", sub: "Documentary", year: "2020",
    cat: "Documentary", tags: ["Festival Films", "Documentary", "Nonfiction"],
    thumb: "posterBubbles", run: "7:15", views: "88K",
    desc: "Two souls, one horizon, and the magic of Black Rock City.",
    long: "A short, tender documentary about love found in the most impermanent city on earth — where everything is built to disappear, and somehow that makes it matter more.",
    date: "SEP 20, 2020", bts: false, trailer: false,
    articles: [],
    similar: ["places-burning-man", "great-synthesis", "eudaimonia"],
  },
];

// Quick lookup by id (used by the popup's "similar films").
const FILM_BY_ID = FILM_LIBRARY.reduce((m, f) => { m[f.id] = f; return m; }, {});

// ---- Section rails (Festival / Commercial / Experimental) reference library ids ----
const FILM_RAILS = {
  festival: {
    eyebrow: "Festival & Narrative", title: "The Festival Canon",
    blurb: "The films made for the dark of a theater — narratives, documentaries, and experiments that have travelled the festival circuit.",
    cta: "Explore the Festival Film Library", filter: "Festival Films", bg: "railFestival",
    ids: ["great-synthesis", "places-burning-man", "eudaimonia", "when-i-grow-up", "waldos-journal"],
  },
  commercial: {
    eyebrow: "Commercial Clients", title: "Brand Cinema",
    blurb: "Campaign films for the brands brave enough to tell the truth — Salesforce, Ancestry, Varian, and Comcast among them.",
    cta: "Explore the Corporate Film Library", filter: "Corporate Films", bg: "railCommercial",
    ids: ["salesforce", "ancestry", "varian", "comcast"],
  },
  experimental: {
    eyebrow: "Experimental & Music Video", title: "Fever Dreams",
    blurb: "Where the rules come off — music videos and experimental work made to bypass the intellect and hit you somewhere older.",
    cta: "Explore the Experimental Library", filter: "Experimental Films", bg: "railExperimental",
    ids: ["destiny-now", "whipped-cream", "honey-money"],
  },
};

Object.assign(window, { FD_R, FILM_REELS, FILM_FILTERS, FILM_LIBRARY, FILM_BY_ID, FILM_RAILS });
