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

  // ---- 16 poems — each opens into the fullscreen reader ----
  const POEMS = [
    { no: "I", title: "The Doorway", tag: "On Not Knowing",
      lines: ["I spent my youth", "building rooms of certainty —", "walls, and walls, and walls.", "", "It was the doorway", "I forgot to love.", "", "Now I keep one wall unfinished,", "so the weather can come in", "and tell me what I am." ] },
    { no: "II", title: "Salt", tag: "Suffering",
      lines: ["They asked the sea", "why it tasted of grief.", "", "The sea said:", "everything I have ever held", "I have also had to release.", "", "What you call salt", "is only the memory", "of loving the tide." ] },
    { no: "III", title: "What the Fire Knows", tag: "Creation",
      lines: ["To make a thing", "you must agree", "to be consumed by it.", "", "The candle does not mourn", "the wax.", "", "It calls it light." ] },
    { no: "IV", title: "Field Notes from the Dark", tag: "Consciousness",
      lines: ["I went looking for the self", "with a lantern.", "", "Every face it lit", "turned out to be a window.", "", "Behind each window,", "another lantern,", "looking back." ] },
    { no: "V", title: "Polarity", tag: "Duality",
      lines: ["There is no light", "that did not first agree", "to a shadow.", "", "Tell me you love the morning", "and I will know", "you have made peace", "with the long night", "that carried it." ] },
    { no: "VI", title: "The Unfinished", tag: "Imperfection",
      lines: ["I used to fear", "the crack in the bowl.", "", "Now I pour the gold there first —", "", "because that is where", "the story", "got honest." ] },
    { no: "VII", title: "Prosopagnosia", tag: "Identity",
      lines: ["I forgot your face", "but not the weather of you —", "", "the way the air changed", "when you entered a room,", "as if the room", "had been holding its breath", "for someone." ] },
    { no: "VIII", title: "Inheritance", tag: "Lineage",
      lines: ["My father gave me", "a question he could not answer.", "", "I have carried it", "the way one carries a seed —", "", "not to solve it,", "but to find the soil", "where it finally grows." ] },
    { no: "IX", title: "The Long Exposure", tag: "Time",
      lines: ["Hold the shutter open", "long enough", "and the crowd disappears.", "", "Only what stayed", "stays.", "", "I am trying to live", "like a photograph", "that keeps the still things." ] },
    { no: "X", title: "Apophatic", tag: "The Sacred",
      lines: ["Everything I said about God", "was a fence", "around an open field.", "", "So I stopped naming it,", "and the field", "came closer." ] },
    { no: "XI", title: "The Watch", tag: "Mortality",
      lines: ["The old watch on my wrist", "lost three minutes a day.", "", "I never fixed it.", "", "I liked being reminded", "that time is something", "you fall behind", "by living." ] },
    { no: "XII", title: "Bardo", tag: "Transition",
      lines: ["Between who I was", "and who I am becoming", "is a hallway", "with no clock.", "", "I have learned", "to call it home —", "", "the only address", "the soul ever keeps." ] },
    { no: "XIII", title: "The Machine Dreams", tag: "Technology",
      lines: ["We taught the machine", "to speak in our voice.", "", "It learned everything", "except the pause —", "", "the small, human silence", "where we decide", "whether to mean it." ] },
    { no: "XIV", title: "Confession to the Sea", tag: "Healing",
      lines: ["I brought the sea", "every name I had been called.", "", "It did not argue.", "", "It only kept arriving,", "kept arriving,", "until the names", "were smooth enough", "to hold." ] },
    { no: "XV", title: "Threshold", tag: "Becoming",
      lines: ["The caterpillar does not", "improve into a butterfly.", "", "It dissolves.", "", "Remember this", "the next time", "you cannot recognize", "the shape", "of your own undoing." ] },
    { no: "XVI", title: "Proem", tag: "The Book of Ignorance",
      lines: ["This is not a book of answers.", "", "It is a book of better questions —", "the kind that do not close the door", "but leave it", "swinging in the wind,", "", "so the light", "and the dark", "can keep their argument", "going." ] },
  ];

  // ---- Articles / Essays — philosophical transmissions ----
  const ESSAYS = [
    { cat: "Field Note", date: "MAR 04, 2026", title: "The Tyranny of Certainty", read: "9 min",
      dek: "We mistook confidence for truth, and built a century on the misunderstanding. A case for the discipline of staying unsure." },
    { cat: "Meditation", date: "FEB 18, 2026", title: "The Beauty of the Imperfect Frame", read: "6 min",
      dek: "Why the flaw is not the failure of the image but the place where it becomes human enough to enter." },
    { cat: "Transmission", date: "JAN 27, 2026", title: "Suffering as Curriculum", read: "11 min",
      dek: "Pain is not punishment and not poetry. It is a syllabus we did not choose, taught by a teacher who never repeats themselves." },
    { cat: "Observation", date: "DEC 09, 2025", title: "Notes Toward a Theory of Wonder", read: "7 min",
      dek: "Wonder is not naivety. It is the most advanced form of attention a mind can practice, and the first thing a culture forgets." },
    { cat: "Field Note", date: "NOV 15, 2025", title: "The Machine and the Soul", read: "13 min",
      dek: "On building intelligences in our image while we are still arguing about what the image is for." },
    { cat: "Meditation", date: "OCT 02, 2025", title: "Why I Make Films About Endings", read: "8 min",
      dek: "Every story I have loved was secretly about how to leave a room with grace. A director's confession." },
  ];

  // ---- TedThoughts — aphorisms, scattered fragments ----
  const THOUGHTS = [
    "The opposite of faith is not doubt. It's certainty.",
    "You don't find your voice. You stop apologizing for it.",
    "Every map is a confession about what the cartographer was afraid to leave out.",
    "Healing is just grief that learned to walk.",
    "We are stories that became aware of themselves and got nervous.",
    "The future is not a place we go. It's a decision we keep almost making.",
    "Beauty is the universe remembering it has a witness.",
    "Most people aren't lost. They're loyal to a map that expired.",
    "Silence is the only language that never lied to me.",
    "You will never be more alive than the moment you admit you don't know.",
    "The soul keeps no appointments. It only keeps returning.",
    "Make the thing. The thing makes you back.",
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

  window.LIT_DATA = { VIRTUES, POEMS, ESSAYS, THOUGHTS, WORLDS, PAST_FILMS, FUTURE_FILMS };
})();
