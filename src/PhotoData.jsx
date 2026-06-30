// ============================================================
//  PhotoData — the real photography archive.
//  Structure: Category → (Subcategory) → Set → Photos.
//  All photo paths are direct asset paths ("assets/photography/…").
//  Render helpers detect direct paths vs resource keys automatically.
// ============================================================

// Build photo objects from a base folder + filename list.
function P(base, files) {
  var prefix = "assets/photography/" + base + "/";
  return files.map(function(f, i) {
    return { id: base.replace(/\//g, "-") + "-" + String(i + 1).padStart(2, "0"), thumb: prefix + f };
  });
}

// ============================================================
//  CATEGORIES — display order, banner, blurb, subs
// ============================================================
const PHOTO_CATS = [
  {
    key: "portraits", title: "Portraits", side: "left",
    banner: "assets/photography/portraits/individuals/aijia-grammer/aijia-grammer-0004.jpg",
    blurb: "The face, unguarded. Artists, executives, and everyday individuals lit like film stills — the beauty of humanity in a single frame.",
    subs: [{ key: "individuals", label: "Individuals" }, { key: "artists", label: "Artists" }, { key: "executives", label: "Executives" }],
  },
  {
    key: "headshots", title: "Headshots", side: "right",
    banner: "assets/photography/headshots/anna-shoop/anna-shoop-headshot-portrait1-020.jpg",
    blurb: "Standardised and minimal. A clean, repeatable headshot system designed to sit together as one roster.",
    covers: [
      "assets/photography/headshots/andrew-milne/andrew-milne-headshot2-bw-16.jpg",
      "assets/photography/headshots/annie-guadioz/annie-guadioz-headshot-portrait2-6671.jpg",
      "assets/photography/headshots/jarrett-worley/jarrett-worley-headshot-portrait1-166.jpg",
      "assets/photography/headshots/lisa-glouner/lisa-glouner-headshot-portrait3-155.jpg",
    ],
  },
  {
    key: "events", title: "Events", side: "left",
    banner: "assets/photography/events/odesza/odesza-0117.jpg",
    blurb: "Celebrations meant to be timeless. Festivals, parties, and gatherings shot like scenes, not snapshots.",
    covers: [
      "assets/photography/events/odesza/odesza-0117.jpg",
      "assets/photography/events/uber4th/uber4th-0566.jpg",
      "assets/photography/events/odesza/odesza-0147.jpg",
      "assets/photography/events/uber4th/uber4th-0612.jpg",
    ],
  },
  {
    key: "light", title: "Wizard Light Painting", side: "right", compact: true,
    banner: "assets/photography/wizard-light-painting/light-art/light-art-0028.jpg",
    blurb: "Bending light without VFX. Long exposures painted by hand in the dark.",
    covers: [
      "assets/photography/wizard-light-painting/af-lightbulb/af-lightbulb.jpg",
      "assets/photography/wizard-light-painting/light-art/light-art-0028.jpg",
      "assets/photography/wizard-light-painting/light-art/light-art-0031.jpg",
      "assets/photography/wizard-light-painting/light-art/light-art-0033.jpg",
    ],
  },
  {
    key: "ads", title: "Advertisements", side: "left", compact: true,
    banner: "assets/photography/advertisement/halloween-stormtroopers.jpg",
    blurb: "Get the word out. Hero images built to stop the scroll and hold the eye.",
    covers: [
      "assets/photography/advertisement/halloween-stormtroopers.jpg",
      "assets/photography/advertisement/jeremy-robinson-corporate.jpg",
      "assets/photography/advertisement/jubilee-light-painting.jpg",
      "assets/photography/advertisement/pacifica-services-swear-in.jpg",
    ],
  },
  {
    key: "weddings", title: "Weddings", side: "right", comingSoon: true,
    banner: "assets/photography/weddings/ian-ashley-wedding.jpg",
    blurb: "A day built to last forever, photographed so it can.",
    covers: [
      "assets/photography/weddings/ian-ashley-wedding.jpg",
      "assets/photography/weddings/fisher-wedding-dance.jpg",
      "assets/photography/weddings/fisher-wedding-bw.jpg",
      "assets/photography/weddings/lo-ho-wedding.jpg",
    ],
    subs: [{ key: "smiths", label: "Smith's Wedding" }, { key: "hollands", label: "Holland's Wedding" }, { key: "ians", label: "Ian's Wedding" }],
  },
  {
    key: "abstract", title: "Experimental and Abstract", side: "left",
    banner: "assets/photography/experimental-abstract/art/solstice-canyon-ruins/solstice-canyon-ruins-168.jpg",
    blurb: "Where the photograph stops describing the world and starts dreaming it — surreal experiments and pure surface.",
    covers: [
      "assets/photography/experimental-abstract/art/6006lacyst/6006lacyst-024.jpg",
      "assets/photography/experimental-abstract/art/capecod09/capecod09-447.jpg",
      "assets/photography/experimental-abstract/art/venjupmorn-tafreshi/venjupmorn-tafreshi.jpg",
      "assets/photography/experimental-abstract/art/solstice-canyon-ruins/solstice-canyon-ruins-239.jpg",
    ],
    subs: [{ key: "art", label: "Art" }, { key: "textures", label: "Textures" }],
  },
  // nav-only — no section yet
  { key: "stock", title: "Stock Photography", comingSoon: true, navOnly: true, blurb: "For brands that don't use AI." },
  { key: "vfx", title: "VFX Composites / Commercial", comingSoon: true, navOnly: true, blurb: "Creating magic with light." },
];

const PHOTO_CAT_BY_KEY = PHOTO_CATS.reduce((m, c) => { m[c.key] = c; return m; }, {});

// ============================================================
//  SETS — real photos from the client's archive
// ============================================================
const PHOTO_SETS = [

  // ===== EVENTS =====
  {
    id: "bbq", title: "BBQ", cat: "events",
    cover: "assets/photography/events/bbq/bbq-155.jpg",
    photos: P("events/bbq", ["bbq-155.jpg","bbq-167.jpg","bbq-198.jpg","bbq-203.jpg","bbq-6.jpg"]),
    get count() { return this.photos.length; },
  },
  {
    id: "festival-faces-lucidity2", title: "Festival Faces Lucidity2", cat: "events",
    cover: "assets/photography/events/festival-faces-lucidity2/festival-faces-lucidity2-0215.jpg",
    photos: P("events/festival-faces-lucidity2", ["festival-faces-lucidity2-0215.jpg","festival-faces-lucidity2-0219.jpg"]),
    get count() { return this.photos.length; },
  },
  {
    id: "momentfeed2", title: "MomentFeed2", cat: "events",
    cover: "assets/photography/events/momentfeed2/momentfeed2-103.jpg",
    photos: P("events/momentfeed2", ["momentfeed2-103.jpg","momentfeed2-140.jpg","momentfeed2-172.jpg","momentfeed2-173.jpg","momentfeed2-175.jpg","momentfeed2-203.jpg","momentfeed2-204.jpg","momentfeed2-213.jpg","momentfeed2-225.jpg","momentfeed2-236.jpg","momentfeed2-296.jpg","momentfeed2-313.jpg","momentfeed2-346.jpg","momentfeed2-458.jpg","momentfeed2-515.jpg","momentfeed2-543.jpg","momentfeed2-551.jpg","momentfeed2-559.jpg","momentfeed2-616.jpg","momentfeed2-639.jpg","momentfeed2-652.jpg","momentfeed2-74.jpg","momentfeed2-83.jpg"]),
    get count() { return this.photos.length; },
  },
  {
    id: "momentfeednov", title: "MomentFeedNov", cat: "events",
    cover: "assets/photography/events/momentfeednov/momentfeednov-0042.jpg",
    photos: P("events/momentfeednov", ["momentfeednov-0042.jpg","momentfeednov-0072.jpg","momentfeednov-0079.jpg","momentfeednov-0093.jpg","momentfeednov-0116.jpg","momentfeednov-0136.jpg","momentfeednov-0160.jpg","momentfeednov-0163.jpg","momentfeednov-0165.jpg","momentfeednov-0177.jpg","momentfeednov-0211.jpg","momentfeednov-0269.jpg","momentfeednov-0285.jpg","momentfeednov-0289.jpg","momentfeednov-0291.jpg","momentfeednov-0298.jpg","momentfeednov-0315.jpg","momentfeednov-0336.jpg","momentfeednov-0342.jpg","momentfeednov-0383.jpg","momentfeednov-0395.jpg","momentfeednov-0397.jpg","momentfeednov-0398.jpg","momentfeednov-0405.jpg"]),
    get count() { return this.photos.length; },
  },
  {
    id: "odesza", title: "ODESZA", cat: "events",
    cover: "assets/photography/events/odesza/odesza-0117.jpg",
    photos: P("events/odesza", ["odesza-0117.jpg","odesza-0123.jpg","odesza-0126.jpg","odesza-0143.jpg","odesza-0147.jpg","odesza-0224.jpg","odesza-0298.jpg","odesza-0313.jpg","odesza-0354.jpg","odesza-0355.jpg","odesza-0517.jpg"]),
    get count() { return this.photos.length; },
  },
  {
    id: "uber4th", title: "Uber4th", cat: "events",
    cover: "assets/photography/events/uber4th/uber4th-0376.jpg",
    photos: P("events/uber4th", ["uber4th-0376.jpg","uber4th-0485.jpg","uber4th-0566.jpg","uber4th-0578.jpg","uber4th-0579.jpg","uber4th-0612.jpg","uber4th-0613.jpg","uber4th-0615.jpg","uber4th-0616.jpg"]),
    get count() { return this.photos.length; },
  },

  // ===== HEADSHOTS (each person = one set) =====
  { id: "andrew-milne", title: "Andrew Milne", cat: "headshots", cover: "assets/photography/headshots/andrew-milne/andrew-milne-headshot2-bw-16.jpg",
    photos: P("headshots/andrew-milne", ["andrew-milne-headshot2-bw-16.jpg"]), get count() { return this.photos.length; } },
  { id: "anna-shoop", title: "Anna Shoop", cat: "headshots", cover: "assets/photography/headshots/anna-shoop/anna-shoop-headshot-portrait1-020.jpg",
    photos: P("headshots/anna-shoop", ["anna-shoop-headshot-landscape1-077.jpg","anna-shoop-headshot-portrait1-020.jpg","anna-shoop-headshot-portrait3.jpg"]), get count() { return this.photos.length; } },
  { id: "annie-guadioz", title: "Annie Guadioz", cat: "headshots", cover: "assets/photography/headshots/annie-guadioz/annie-guadioz-headshot-portrait2-6671.jpg",
    photos: P("headshots/annie-guadioz", ["annie-guadioz-headshot-portrait2-6671.jpg","annie-guadioz-portrait-portrait1-6629.jpg"]), get count() { return this.photos.length; } },
  { id: "big-al", title: "Big Al", cat: "headshots", cover: "assets/photography/headshots/big-al/big-al-headshot-0932.jpg",
    photos: P("headshots/big-al", ["big-al-headshot-0932.jpg","big-al-headshot-0933.jpg"]), get count() { return this.photos.length; } },
  { id: "brittany-malloly", title: "Brittany Malloly", cat: "headshots", cover: "assets/photography/headshots/brittany-malloly/brittany-malloly-headshot-portrait1.jpg",
    photos: P("headshots/brittany-malloly", ["brittany-malloly-better-light-ws.jpg","brittany-malloly-headshot-portrait1.jpg","brittany-malloly-headshot-portrait2.jpg"]), get count() { return this.photos.length; } },
  { id: "brittany-omulson", title: "Brittany Omulson", cat: "headshots", cover: "assets/photography/headshots/brittany-omulson/brittany-omulson-headshot-portrait1-3255.jpg",
    photos: P("headshots/brittany-omulson", ["brittany-omulson-headshot-portrait1-3255.jpg","brittany-omulson-headshot-portrait2-3296.jpg","brittany-omulson-portrait-portrait2-3291.jpg","brittany-omulson-profile-portrait1-3291.jpg"]), get count() { return this.photos.length; } },
  { id: "ezra-kemp", title: "Ezra Kemp", cat: "headshots", cover: "assets/photography/headshots/ezra-kemp/ezra-kemp-headshot-portrait2-3343.jpg",
    photos: P("headshots/ezra-kemp", ["ezra-kemp-headshot-portrait2-3343.jpg"]), get count() { return this.photos.length; } },
  { id: "gary-daniels", title: "Gary Daniels", cat: "headshots", cover: "assets/photography/headshots/gary-daniels/gary-daniels-headshot-1680-0329.jpg",
    photos: P("headshots/gary-daniels", ["gary-daniels-headshot-1680-0329.jpg"]), get count() { return this.photos.length; } },
  { id: "jarrett-worley", title: "Jarrett Worley", cat: "headshots", cover: "assets/photography/headshots/jarrett-worley/jarrett-worley-headshot-portrait1-166.jpg",
    photos: P("headshots/jarrett-worley", ["jarrett-worley-headshot-portrait1-166.jpg","jarrett-worley-headshot-portrait2-320.jpg"]), get count() { return this.photos.length; } },
  { id: "jawed", title: "Jawed", cat: "headshots", cover: "assets/photography/headshots/jawed/jawed-headshot-1680-1456.jpg",
    photos: P("headshots/jawed", ["jawed-headshot-1680-1456.jpg"]), get count() { return this.photos.length; } },
  { id: "jerry-careccio", title: "Jerry Careccio", cat: "headshots", cover: "assets/photography/headshots/jerry-careccio/jerry-careccio-headshot-portrait1.jpg",
    photos: P("headshots/jerry-careccio", ["jerry-careccio-headshot-portrait1.jpg"]), get count() { return this.photos.length; } },
  { id: "johnathan-walton", title: "Johnathan Walton", cat: "headshots", cover: "assets/photography/headshots/johnathan-walton/johnathan-walton-headshot1-3403.jpg",
    photos: P("headshots/johnathan-walton", ["johnathan-walton-headshot1-3403.jpg"]), get count() { return this.photos.length; } },
  { id: "lisa-glouner", title: "Lisa Glouner", cat: "headshots", cover: "assets/photography/headshots/lisa-glouner/lisa-glouner-headshot-portrait3-155.jpg",
    photos: P("headshots/lisa-glouner", ["lisa-glouner-headshot-portrait3-155.jpg"]), get count() { return this.photos.length; } },
  { id: "samantha-jackson", title: "Samantha Jackson", cat: "headshots", cover: "assets/photography/headshots/samantha-jackson/samantha-jackson-headshot-portrait1.jpg",
    photos: P("headshots/samantha-jackson", ["samantha-jackson-headshot-portrait1.jpg"]), get count() { return this.photos.length; } },
  { id: "sarah", title: "Sarah", cat: "headshots", cover: "assets/photography/headshots/sarah/sarah-white-headshot-0248.jpg",
    photos: P("headshots/sarah", ["sarah-and-jules-fashion-finals-0248.jpg","sarah-white-headshot-0248.jpg"]), get count() { return this.photos.length; } },
  { id: "siri-kalsa", title: "Siri Kalsa", cat: "headshots", cover: "assets/photography/headshots/siri-kalsa/siri-black-headshot-0528.jpg",
    photos: P("headshots/siri-kalsa", ["siri-black-headshot-0528.jpg","siri-kalsa-shortless-headshot-5.jpg"]), get count() { return this.photos.length; } },

  // ===== PORTRAITS — Individuals =====
  { id: "aijia-grammer", title: "Aijia Grammer", cat: "portraits", sub: "individuals",
    cover: "assets/photography/portraits/individuals/aijia-grammer/aijia-grammer-0004.jpg",
    photos: P("portraits/individuals/aijia-grammer", ["aijia-grammer-0004.jpg","aijia-grammer-0020.jpg","aijia-grammer-0028.jpg","aijia-grammer-0038.jpg","aijia-grammer-0096.jpg","aijia-grammer-0098.jpg","aijia-grammer-0122.jpg","aijia-grammer-0165.jpg","aijia-grammer-0167.jpg","aijia-grammer-0183.jpg","aijia-grammer-0341.jpg","aijia-grammer-0345.jpg","aijia-grammer-0346.jpg","aijia-grammer-0378.jpg","aijia-grammer-0382.jpg","aijia-grammer-0420.jpg","aijia-grammer-0428.jpg","aijia-grammer-0434.jpg","aijia-grammer-0437.jpg","aijia-grammer-0889.jpg","aijia-grammer-0891.jpg","aijia-grammer-0913.jpg","aijia-grammer-0956.jpg"]),
    get count() { return this.photos.length; } },
  { id: "brit", title: "Brit", cat: "portraits", sub: "individuals",
    cover: "assets/photography/portraits/individuals/brit/brit-fashion-0339.jpg",
    photos: P("portraits/individuals/brit", ["brit-fashion-0339.jpg","brit-fashion-0342.jpg","brit-fashion-0367.jpg","brit-fashion-branded-0367.jpg"]),
    get count() { return this.photos.length; } },
  { id: "curtis-jarvis", title: "Curtis Jarvis", cat: "portraits", sub: "individuals",
    cover: "assets/photography/portraits/individuals/curtis-jarvis/curtis-jarvis-0003.jpg",
    photos: P("portraits/individuals/curtis-jarvis", ["curtis-jarvis-0003.jpg","curtis-jarvis-0013.jpg","curtis-jarvis-0016.jpg","curtis-jarvis-0022.jpg","curtis-jarvis-0035.jpg","curtis-jarvis-0065.jpg","curtis-jarvis-0200.jpg","curtis-jarvis-0222.jpg","curtis-jarvis-0309.jpg","curtis-jarvis-0331.jpg","curtis-jarvis-0343.jpg","curtis-jarvis-0344.jpg","curtis-jarvis-0372.jpg","curtis-jarvis-0399.jpg","curtis-jarvis-0415.jpg","curtis-jarvis-0416.jpg","curtis-jarvis-0443.jpg","curtis-jarvis-0454.jpg","curtis-jarvis-0470.jpg","curtis-jarvis-0485.jpg"]),
    get count() { return this.photos.length; } },
  { id: "mariya-kriv", title: "Mariya Kriv", cat: "portraits", sub: "individuals",
    cover: "assets/photography/portraits/individuals/mariya-kriv/mariya-kriv-0008.jpg",
    photos: P("portraits/individuals/mariya-kriv", ["mariya-kriv-0008.jpg","mariya-kriv-0033.jpg","mariya-kriv-0043.jpg","mariya-kriv-0057.jpg","mariya-kriv-0077.jpg","mariya-kriv-0078.jpg","mariya-kriv-0090.jpg","mariya-kriv-0099.jpg","mariya-kriv-0118.jpg","mariya-kriv-0120.jpg","mariya-kriv-0125.jpg","mariya-kriv-0127.jpg","mariya-kriv-0137.jpg","mariya-kriv-0147.jpg","mariya-kriv-0161.jpg","mariya-kriv-0162.jpg","mariya-kriv-0180.jpg","mariya-kriv-0181.jpg","mariya-kriv-0204.jpg","mariya-kriv-0213.jpg"]),
    get count() { return this.photos.length; } },
  { id: "preston-smiles", title: "Preston Smiles", cat: "portraits", sub: "individuals",
    cover: "assets/photography/portraits/individuals/preston-smiles/preston-smiles-0002.jpg",
    photos: P("portraits/individuals/preston-smiles", ["preston-smiles-0002.jpg","preston-smiles-0007.jpg","preston-smiles-0010.jpg","preston-smiles-0016.jpg","preston-smiles-0025.jpg","preston-smiles-0050.jpg","preston-smiles-0065.jpg","preston-smiles-0070.jpg","preston-smiles-0090.jpg","preston-smiles-0091.jpg","preston-smiles-0095.jpg","preston-smiles-0115.jpg","preston-smiles-0122.jpg","preston-smiles-0123.jpg","preston-smiles-0125.jpg","preston-smiles-0134.jpg","preston-smiles-0137.jpg","preston-smiles-0140.jpg","preston-smiles-0145.jpg","preston-smiles-0155.jpg","preston-smiles-0160.jpg","preston-smiles-0163.jpg","preston-smiles-0205.jpg","preston-smiles-0220.jpg"]),
    get count() { return this.photos.length; } },
  { id: "ron-smoorenburg", title: "Ron Smoorenburg", cat: "portraits", sub: "individuals",
    cover: "assets/photography/portraits/individuals/ron-smoorenburg/ron-smoorenburg-gallery.jpg",
    photos: P("portraits/individuals/ron-smoorenburg", ["ron-smoorenburg-gallery-0801.jpg","ron-smoorenburg-gallery-0803.jpg","ron-smoorenburg-gallery-0812.jpg","ron-smoorenburg-gallery-0816.jpg","ron-smoorenburg-gallery-0817.jpg","ron-smoorenburg-gallery-0819.jpg","ron-smoorenburg-gallery-0820.jpg","ron-smoorenburg-gallery-0821.jpg","ron-smoorenburg-gallery-0823.jpg","ron-smoorenburg-gallery-0826.jpg","ron-smoorenburg-gallery-0827-3.jpg","ron-smoorenburg-gallery-0828-2.jpg","ron-smoorenburg-gallery-0831.jpg","ron-smoorenburg-gallery-0837.jpg","ron-smoorenburg-gallery-0841.jpg","ron-smoorenburg-gallery-0846.jpg","ron-smoorenburg-gallery-0848.jpg","ron-smoorenburg-gallery-0851.jpg","ron-smoorenburg-gallery-0854.jpg","ron-smoorenburg-gallery-0855.jpg","ron-smoorenburg-gallery-0856.jpg","ron-smoorenburg-gallery-0857.jpg","ron-smoorenburg-gallery.jpg","ron-smoorenburg-headshot-1680-0837.jpg"]),
    get count() { return this.photos.length; } },
  { id: "topanga-editorial", title: "Topanga Editorial", cat: "portraits", sub: "individuals",
    cover: "assets/photography/portraits/individuals/topanga-editorial/topanga-editorial-0122.jpg",
    photos: P("portraits/individuals/topanga-editorial", ["topanga-editorial-0122.jpg","topanga-editorial-0126.jpg","topanga-editorial-0143.jpg","topanga-editorial-0211.jpg","topanga-editorial-0233.jpg"]),
    get count() { return this.photos.length; } },

  // ===== WIZARD LIGHT PAINTING =====
  { id: "af-lightbulb", title: "AF Lightbulb", cat: "light",
    cover: "assets/photography/wizard-light-painting/af-lightbulb/af-lightbulb.jpg",
    photos: P("wizard-light-painting/af-lightbulb", ["af-lightbulb.jpg"]),
    get count() { return this.photos.length; } },
  { id: "light-art", title: "Light Art", cat: "light",
    cover: "assets/photography/wizard-light-painting/light-art/light-art-0028.jpg",
    photos: P("wizard-light-painting/light-art", ["light-art-0028.jpg","light-art-0031.jpg","light-art-0033.jpg"]),
    get count() { return this.photos.length; } },

  // ===== ADVERTISEMENTS =====
  { id: "robert-kato", title: "Robert Kato", cat: "ads",
    cover: "assets/photography/advertisement/robert-kato/robert-kato-best-branded-0177.jpg",
    photos: P("advertisement/robert-kato", ["robert-kato-best-branded-0177.jpg","robert-kato-best-branded-0365-2.jpg","robert-kato-best-branded-0394.jpg","robert-kato-best-branded-0556.jpg","robert-kato-best-branded-0693-2.jpg","robert-kato-best-branded-0811.jpg","robert-kato-best-branded-0952-2.jpg","robert-kato-best-branded-1069-2.jpg"]),
    get count() { return this.photos.length; } },

  // ===== EXPERIMENTAL AND ABSTRACT — Art =====
  { id: "6006lacyst", title: "6006 Lacy St", cat: "abstract", sub: "art",
    cover: "assets/photography/experimental-abstract/art/6006lacyst/6006lacyst-024.jpg",
    photos: P("experimental-abstract/art/6006lacyst", ["6006lacyst-024.jpg","6006lacyst-038.jpg","6006lacyst-046.jpg","6006lacyst-184.jpg","6006lacyst-189.jpg"]),
    get count() { return this.photos.length; } },
  { id: "ali", title: "Ali", cat: "abstract", sub: "art",
    cover: "assets/photography/experimental-abstract/art/ali/ali-dark-art-tedshot-3.jpg",
    photos: P("experimental-abstract/art/ali", ["ali-dark-art-tedshot-3.jpg","ali-dark-art-tedshot-fbook-1.jpg","ali-headshot-brown-portrait-ts.jpg","ali-headsot-terrorist-portrait-ts.jpg","ali-s-bluegraphic.jpg"]),
    get count() { return this.photos.length; } },
  { id: "capecod09", title: "Cape Cod 09", cat: "abstract", sub: "art",
    cover: "assets/photography/experimental-abstract/art/capecod09/capecod09-379.jpg",
    photos: P("experimental-abstract/art/capecod09", ["capecod09-379.jpg","capecod09-441.jpg","capecod09-447.jpg"]),
    get count() { return this.photos.length; } },
  { id: "solstice-canyon-ruins", title: "Solstice Canyon Ruins", cat: "abstract", sub: "art",
    cover: "assets/photography/experimental-abstract/art/solstice-canyon-ruins/solstice-canyon-ruins-168.jpg",
    photos: P("experimental-abstract/art/solstice-canyon-ruins", ["solstice-canyon-ruins-126.jpg","solstice-canyon-ruins-168.jpg","solstice-canyon-ruins-173.jpg","solstice-canyon-ruins-188.jpg","solstice-canyon-ruins-239.jpg","solstice-canyon-ruins-241.jpg","solstice-canyon-ruins-247.jpg","solstice-canyon-ruins-253.jpg","solstice-canyon-ruins-320-3.jpg","solstice-canyon-ruins-320-4.jpg","solstice-canyon-ruins-331-a.jpg","solstice-canyon-ruins-331-b.jpg","solstice-canyon-ruins-90.jpg","solstice-canyon-ruins-91.jpg"]),
    get count() { return this.photos.length; } },
  { id: "stephanie-simbari", title: "Stephanie Simbari", cat: "abstract", sub: "art",
    cover: "assets/photography/experimental-abstract/art/stephanie-simbari/stephanie-simbari-art-portrait-green.jpg",
    photos: P("experimental-abstract/art/stephanie-simbari", ["stephanie-simbari-art-landscape-green.jpg","stephanie-simbari-art-portrait-green.jpg","stephanie-simbari-portrait-portrait5-naked-7532.jpg"]),
    get count() { return this.photos.length; } },
  { id: "venjupmorn-tafreshi", title: "VenJupMorn Tafreshi", cat: "abstract", sub: "art",
    cover: "assets/photography/experimental-abstract/art/venjupmorn-tafreshi/venjupmorn-tafreshi.jpg",
    photos: P("experimental-abstract/art/venjupmorn-tafreshi", ["venjupmorn-tafreshi.jpg"]),
    get count() { return this.photos.length; } },
  { id: "will-postom", title: "Will Postom", cat: "abstract", sub: "art",
    cover: "assets/photography/experimental-abstract/art/will-postom/will-postom-landscape-art-jail1-69.jpg",
    photos: P("experimental-abstract/art/will-postom", ["will-postom-landscape-art-jail1-69.jpg","will-postom-portrait-landscape2-47.jpg","will-poston-fuck-you-art.jpg"]),
    get count() { return this.photos.length; } },
];

const PHOTO_SET_BY_ID = PHOTO_SETS.reduce((m, s) => { m[s.id] = s; return m; }, {});

function pgSetsFor(catKey, subKey) {
  return PHOTO_SETS.filter((s) => s.cat === catKey && (subKey ? s.sub === subKey : true));
}

// Flat photo lookup across all sets (for deep-link routing).
const PHOTO_BY_GID = (function() {
  var m = {};
  PHOTO_SETS.forEach(function(s) {
    s.photos.forEach(function(p) { m[p.id] = { photo: p, set: s }; });
  });
  return m;
})();

// Smart resource resolver — handles direct paths and legacy resource keys.
function pgResolve(key, fallback) {
  if (!key) return fallback || "assets/cosmic-bg.png";
  if (key.startsWith("assets/") || key.startsWith("/") || key.startsWith("http")) return key;
  return (window.__resources && window.__resources[key]) || fallback || "assets/cosmic-bg.png";
}

Object.assign(window, {
  PHOTO_CATS, PHOTO_CAT_BY_KEY, PHOTO_SETS, PHOTO_SET_BY_ID, pgSetsFor, PHOTO_BY_GID, pgResolve,
});
