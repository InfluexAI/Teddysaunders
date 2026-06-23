/* ============================================================
 *  LitData — the written contents of Ted Saunders' literary wing.
 *  Sample copy in Ted's voice; swap real text in later.
 *  Exposed as window.LIT_DATA.
 * ============================================================ */
(function () {
  // ---- The Book of Ignorance — an evolving framework of virtues ----
  const VIRTUES = [
    { rune: "\u16B1", name: "Wonder", line: "To meet the world as if for the first time, and the thousandth." },
    { rune: "\u16A6", name: "Humility", line: "The wisest sentence I know still ends in a question." },
    { rune: "\u16DE", name: "Surrender", line: "Not defeat. The art of letting the river carry what you cannot." },
    { rune: "\u16C1", name: "Presence", line: "The only country I have never been exiled from is now." },
    { rune: "\u16D6", name: "Devotion", line: "To return, and return, to the thing that asks everything of you." },
    { rune: "\u16A0", name: "Courage", line: "To walk into the dark holding nothing but the next step." },
    { rune: "\u16C9", name: "Stillness", line: "Beneath every answer is a silence that knew it first." },
    { rune: "\u16E1", name: "Reverence", line: "To treat the ordinary as if it were on loan from the sacred." },
  ];

  // ---- TedThoughts — short philosophical fragments, each opens into the reader ----
  const POEMS = [
    { tag: "TedThought", title: "", lines: ["A fragile ego doesn't want to be wrong and wants to prove that they know best. An egoless person knows they can't know everything and is open learning new things while not needing to prove anything."] },
    { tag: "TedThought", title: "", lines: ["Any given argument is usually just two egos that refuse to listen. The remedy to create a solution is deep presence and listening."] },
    { tag: "TedThought", title: "", lines: ["Some things don't need to be figured out. Sometimes you just gotta let go and trust that the storm will pass."] },
    { tag: "TedThought", title: "", lines: ["Happiness is when you are courageously moving towards what you fear, knowing that it's not only possible, but also incredible, exciting and fulfilling."] },
    { tag: "TedThought", title: "", lines: ["The more noise outside you, the easier it is to find peace inside. For example, when at crowded or noisy places with many people, you stand out less, therefore you can connect deeper with your own essence.", "", "When one-on-one or in small groups, you have to be seen and can't hide."] },
    { tag: "TedThought", title: "", lines: ["Scarcity creates value.", "Ex: Release music video before an actual song"] },
    { tag: "TedThought", title: "", lines: ["Grudges are traps. Forgiveness is freedom."] },
    { tag: "TedThought", title: "", lines: ["Stories and judgements are excellent ways to avoid happiness of the presence. Remove your judgements/stories and become free in the infinite bliss of here and now."] },
    { tag: "TedThought", title: "", lines: ["Anyone who says that they are healed and done learning or healing is never done healing. That's their ego trying to have pride, which shows that there is more work to do. A healed person knows that they can't know all and that's ok."] },
    { tag: "TedThought", title: "", lines: ["Don't tell people your goals. Instead, show them your achievements."] },
    { tag: "TedThought", title: "", lines: ["Chills don't lie."] },
    { tag: "TedThought", title: "", lines: ["You won't know how good you are until you put yourself out there."] },
  ];

  // ---- Articles / Essays — philosophical transmissions ----
  const ESSAYS = [
    { imgKey: "hyperlapse",            img: "assets/hyperlapse.jpg",            date: "JAN 14, 2025", title: "The Art of the Hyperlapse" },
    { imgKey: "videoEditing",          img: "assets/video-editing.png",          date: "JAN 14, 2025", title: "The Art of Documentary-Style Video Editing" },
    { imgKey: "sixReasonsWix",         img: "assets/6-reasons-wix.jpg",          date: "JAN 03, 2025", title: "6 reasons why Wix, Squarespace and Wordpress are not good enough" },
    { imgKey: "emotionalStorytelling", img: "assets/emotional-storytelling.jpg", date: "DEC 27, 2024", title: "The Art of Emotional Storytelling in a World of AI" },
    { imgKey: "aiEndUs",               img: "assets/ai-end-us.jpg",              date: "DEC 27, 2024", title: "AI is going to end us - but you might not have to \"die\"" },
    { imgKey: "animatedExplainer",     img: "assets/animated-explainer.jpg",     date: "DEC 08, 2024", title: "6 Essential Points when Creating an Animated Explainer Video" },
  ];

  // ---- TedThoughts — aphorisms, scattered fragments ----
  const THOUGHTS = [
    "One second shots of moments. Celebrating, laughing, talking, hugging.",
    "Sometimes when I'm feeling stressed\nI remind myself, just do your best",
    "Carlos castineda - the art of Dreaming",
    "Damn. Life is but a sham.\nSaid the lamb. To the wolf.",
    "We are stories that became aware of themselves and got nervous.",
    "The future is not a place we go. It's a decision we keep almost making.",
    "Beauty is the universe remembering it has a witness.",
    "Most people aren't lost. They're loyal to a map that expired.",
    "Silence is the only language that never lied to me.",
    "You will never be more alive than the moment you admit you don't know.",
    "The soul keeps no appointments. It only keeps returning.",
    "Make the thing. The thing makes you back.",
  ];

  // ---- TedLyrics — song fragments, sung lines ----
  const LYRICS = [
    "This is a story about some sorcerers living on this planet knowing…",
    "We were lightning in a borrowed coat, two sparks the dark could not hold.",
    "Sing me the road I never took, the one that still remembers my feet.",
    "Every ending is a chorus we were too afraid to repeat.",
    "I traded all my certainties for one true, trembling note.",
    "Carry me home on a melody, where the silence learned to sing.",
    "The heart is a drum that keeps no time but its own.",
    "We danced until the morning broke its promise to the dark.",
    "Love is the only verse I keep forgetting how to end.",
    "Let the river take the words I couldn't say out loud.",
    "Strike the match, let the chorus catch — we burn the brightest live.",
    "Some songs aren't written. They're survived.",
  ];

  // ---- Worldbuilding — a drawer of unfinished universes ----
  const WORLDS = [
    { img: "ipFated", title: "The Fated", kind: "Cosmology", note: "A civilization that can see every outcome but one — its own choosing." },
    { img: "ipInevitable", title: "Inevitable", kind: "Architecture of Time", note: "What if the future already happened, and memory is just the echo running backward?" },
    { img: "ipProsopagnosia", title: "Prosopagnosia", kind: "A World Without Faces", note: "A society that recognizes souls by their weather, not their features." },
    { img: "ipJuiced", title: "Juiced", kind: "Field Sketch", note: "Appetite as a religion. A neon parable about the hunger that eats its own god." },
    { img: "filmStill", title: "The Bestiary of Virtues", kind: "Symbolic System", note: "Eight archetypal creatures, each the living embodiment of a virtue to attune to." },
  ];

  // ---- Films ----
  const PAST_FILMS = [
    { img: "posterPlaces", title: "Oh, the Places You\u2019ll Go", year: "2014", cat: "Documentary",
      note: "A psychedelic odyssey through the dust and devotion of the playa." },
    { img: "posterSynthesis", title: "The Great Synthesis", year: "2023", cat: "Experimental",
      note: "There is no light without shadow — a meditation on duality and return." },
  ];
  const FUTURE_FILMS = [
    { img: "ipInevitable", title: "Inevitable", year: "In Development", cat: "Sci-Fi Feature",
      note: "Time is not a line. It is a room we keep walking back into." },
    { img: "ipFated", title: "The Fated", year: "In Development", cat: "Mythic Drama",
      note: "To know your destiny is the only way to lose it." },
    { img: "ipProsopagnosia", title: "Prosopagnosia", year: "In Development", cat: "Psychological",
      note: "A man who cannot see faces falls in love with the shape of a presence." },
  ];

  window.LIT_DATA = { VIRTUES, POEMS, ESSAYS, THOUGHTS, LYRICS, WORLDS, PAST_FILMS, FUTURE_FILMS };
})();
