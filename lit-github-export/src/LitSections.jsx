// ============================================================
//  LitSections — the environments of the literary wing.
//  Reusable Row (Tedflix browse), reveal hook, and the six
//  section components. Exposed on window.
// ============================================================
const { useRef: useLsRef, useEffect: useLsEffect, useState: useLsState } = React;
const LR = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

// Render a single TedThought aphorism to a portrait "paper" card image
// (data URL) for the WebGL CircularGallery planes.
function litThoughtCardURL(text, i) {
  const W = 700, H = 900;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#11151d"); g.addColorStop(1, "#06080d");
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.strokeStyle = "rgba(232,183,119,0.32)"; x.lineWidth = 3;
  x.strokeRect(26, 26, W - 52, H - 52);
  x.fillStyle = "rgba(232,183,119,0.5)";
  x.font = "180px Georgia, 'Times New Roman', serif";
  x.textBaseline = "top";
  x.fillText("\u201C", 64, 70);
  x.fillStyle = "#f2e6d2";
  x.font = "italic 46px Georgia, 'Times New Roman', serif";
  const words = String(text).split(" ");
  const maxW = W - 150; let line = ""; const lines = [];
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (x.measureText(test).width > maxW && line) { lines.push(line); line = w; }
    else line = test;
  }
  if (line) lines.push(line);
  let y = 300;
  for (const l of lines) { x.fillText(l, 75, y); y += 64; }
  x.fillStyle = "rgba(232,183,119,0.72)";
  x.font = "bold 22px Arial, sans-serif";
  x.fillText("T E D T H O U G H T S", 75, H - 110);
  return c.toDataURL("image/jpeg", 0.86);
}

function LpPlay() { return (<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="7,4 21,12 7,20" /></svg>); }
function LpArrowR() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>); }
function LpArrowL() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>); }

// Reveal-on-scroll — safety interval so content never strands hidden.
function useLpReveal() {
  const ref = useLsRef(null);
  useLsEffect(() => {
    const el = ref.current; if (!el) return;
    const show = (n) => {
      if (n.classList.contains("is-in")) return;
      n.classList.add("is-in");
      setTimeout(() => { n.style.transition = "none"; n.style.opacity = "1"; if (!n.hasAttribute("data-par")) n.style.transform = "none"; }, 1100);
    };
    const reveal = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      el.querySelectorAll(".lp-reveal").forEach((n) => { const r = n.getBoundingClientRect(); if (r.top < vh * 0.92 && r.bottom > 0) show(n); });
    };
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    const iv = setInterval(reveal, 500);
    return () => { window.removeEventListener("scroll", reveal); window.removeEventListener("resize", reveal); clearInterval(iv); };
  }, []);
  return ref;
}

// Horizontal browse row with ‹ › arrows (transform-driven).
function LpRow({ children, par }) {
  const viewRef = useLsRef(null);
  const trackRef = useLsRef(null);
  const [x, setX] = useLsState(0);
  const [lim, setLim] = useLsState(0);
  const measure = () => {
    const v = viewRef.current, t = trackRef.current;
    if (!v || !t) return 0;
    return Math.min(0, v.clientWidth - t.scrollWidth);
  };
  const apply = (nx, animate) => {
    const t = trackRef.current; if (!t) return;
    t.style.transition = animate ? "transform .6s cubic-bezier(.4,0,.2,1)" : "none";
    t.style.transform = "translateX(" + nx + "px)";
  };
  const step = (dir) => {
    const v = viewRef.current; if (!v) return;
    const min = measure(); setLim(min);
    setX((cur) => { const nx = Math.max(min, Math.min(0, cur + dir * -v.clientWidth * 0.7)); apply(nx, true); return nx; });
  };
  useLsEffect(() => {
    const onResize = () => { const min = measure(); setLim(min); setX((cur) => { const nx = Math.max(min, Math.min(0, cur)); apply(nx, false); return nx; }); };
    onResize();
    const t1 = setTimeout(onResize, 250), t2 = setTimeout(onResize, 1000);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div className="lp-row lp-reveal" data-par={par}>
      <button className="lp-row__arrow lp-row__arrow--prev" aria-label="Previous" data-dim={x >= 0 ? "" : undefined} onClick={() => step(-1)}><LpArrowL /></button>
      <div className="lp-row__view" ref={viewRef}>
        <div className="lp-row__track" ref={trackRef}>{children}</div>
      </div>
      <button className="lp-row__arrow lp-row__arrow--next" aria-label="Next" data-dim={x <= lim ? "" : undefined} onClick={() => step(1)}><LpArrowR /></button>
    </div>
  );
}

function LpHead({ eyebrow, title, blurb, par }) {
  return (
    <div className="lp-head lp-reveal" data-par={par}>
      <div className="lp-head__eyebrow">{eyebrow}</div>
      <h2 className="lp-head__title lp-title-fill">{title}</h2>
      {blurb && <p className="lp-head__blurb">{blurb}</p>}
    </div>
  );
}

// Editorial section banner — full-bleed cinematic still with the section
// title in a card straddling the bottom edge (gold accent bar), intro below.
function LpBanner({ img, eyebrow, title, blurb, side, compass }) {
  return (
    <div className="lp-banner lp-reveal">
      {side ? <div className="lp-banner__side" aria-hidden="true">{side}</div> : null}
      {compass ? (
        <div className="lp-banner__compass" aria-hidden="true">
          <svg viewBox="0 0 360 360" fill="none" stroke="currentColor">
            <circle cx="180" cy="180" r="150" strokeWidth="1.2" />
            <circle cx="180" cy="180" r="140" strokeWidth="7" strokeDasharray="1.6 13" opacity="0.85" />
            <circle cx="180" cy="180" r="112" strokeWidth="0.9" />
            <circle cx="180" cy="180" r="72" strokeWidth="0.9" />
            <path d="M180 24 L180 336 M24 180 L336 180" strokeWidth="0.8" opacity="0.55" />
            <path d="M52 52 L308 308 M308 52 L52 308" strokeWidth="0.6" opacity="0.35" />
            <path d="M180 40 L196 180 L180 320 L164 180 Z" fill="currentColor" fillOpacity="0.18" stroke="none" />
            <path d="M40 180 L180 196 L320 180 L180 164 Z" fill="currentColor" fillOpacity="0.12" stroke="none" />
            <circle cx="180" cy="180" r="7" fill="currentColor" fillOpacity="0.55" stroke="none" />
          </svg>
        </div>
      ) : null}
      <div className="lp-banner__media">
        <img src={img} alt="" aria-hidden="true" />
        <div className="lp-banner__vig" />
      </div>
      <div className="lp-banner__card">
        {eyebrow ? <div className="lp-banner__eyebrow">{eyebrow}</div> : null}
        <h2 className="lp-banner__title">{title}</h2>
        <div className="lp-banner__bar" />
      </div>
      {blurb ? <p className="lp-banner__blurb">{blurb}</p> : null}
    </div>
  );
}

/* ============ THE BOOK OF IGNORANCE ============ */
const BOOK_CHAPTERS = [
  { no: "01", title: "Truth",        line: "Why the first act of wisdom is to lay down the weight of certainty.", img: "film1", file: "assets/film/photo-1.jpg" },
  { no: "02", title: "Safety",       line: "Leaving a door in every belief, so the weather of truth can pass through.", img: "film2", file: "assets/film/photo-2.jpg" },
  { no: "03", title: "Compassion",   line: "To meet the world as if for the first time, and the thousandth.", img: "film3", file: "assets/film/photo-3.jpg" },
  { no: "04", title: "Relationships", line: "The wisest sentence I know still ends in a question.", img: "film4", file: "assets/film/photo-4.jpg" },
  { no: "05", title: "Surrender",           line: "Not defeat — the art of letting the river carry what you cannot.", img: "film5", file: "assets/film/photo-5.jpg" },
  { no: "06", title: "Presence",            line: "The only country I have never been exiled from is now.", img: "film6", file: "assets/film/photo-6.jpg" },
  { no: "07", title: "Devotion",            line: "To return, and return, to the thing that asks everything of you.", img: "film7", file: "assets/film/photo-7.jpg" },
  { no: "08", title: "The Strange Beauty",  line: "On uncertainty as the last open field where meaning is still allowed to grow.", img: "film8", file: "assets/film/photo-8.jpg" },
];

function BookOfIgnorance({ virtues, bg, onCta }) {
  const ref = useLpReveal();
  return (
    <section className="lp-sec lp-sec--book lp-grain" id="book-of-ignorance" data-screen-label="The Book of Ignorance" ref={ref}>
      <div className="lp-seam-top" />
      <LpBanner img={bg || LR("parchmentDesk", "assets/opt/parchment-desk.jpg")}
        side="The Book of Ignorance"
        compass={true}
        eyebrow="A Living Framework · A Book of Virtues"
        title={<span>The Book of Ignorance</span>}
        blurb={<span>Not a doctrine but a practice — a living framework built on a single idea: that truth cannot be possessed, only passed through. A paradigm-shifting book of virtues to attune to, the way a sailor attunes to weather.</span>} />
      <LpRow par="0.04">
        {BOOK_CHAPTERS.map((c, i) => (
          <div className="lp-chapter" key={i} onClick={onCta} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onCta(); }}>
            <div className="lp-chapter__content">
              <div className="lp-chapter__no" aria-hidden="true">{c.no}</div>
              <div className="lp-chapter__tag">Chapter {c.no}</div>
              <h3 className="lp-chapter__title">{c.title}</h3>
              <span className="lp-chapter__read">Read<span aria-hidden="true">→</span></span>
            </div>
          </div>
        ))}
      </LpRow>
      <div className="lp-book__cta-wrap lp-reveal">
        <button className="lp-cta lp-cta--gold" onClick={onCta}>Explore The Book of Ignorance<span className="arr">→</span></button>
      </div>
    </section>
  );
}

/* ============ POETRY — scroll cards + Poems/Lyrics categories ============ */
function PoetryRow({ thoughts, lyrics }) {
  const ref = useLpReveal();
  const [mode, setMode] = useLsState("poem");
  const [openIdx, setOpenIdx] = useLsState(null);
  const items = mode === "lyrics" ? (lyrics || []) : (thoughts || []);
  const label = mode === "lyrics" ? "Lyrics" : "Poem";
  const openParas = openIdx === null ? null : ((mode === "lyrics" ? TT_LYRIC_FULL : TT_POEM_FULL)[openIdx] || [items[openIdx]]);
  // lock body scroll + close on Escape while the reader is open
  useLsEffect(() => {
    if (openIdx === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setOpenIdx(null); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [openIdx]);
  return (
    <section className="lp-sec lp-sec--poetry" id="poetry" data-screen-label="Poetry" ref={ref}>
      <div className="lp-seam-top" />
      <LpBanner img={LR("poetryBg", "assets/poetry-bg.jpg")}
        side="Poetry"
        eyebrow="Sixteen Pages · Fullscreen Reading"
        title="Poetry"
        blurb={<span>Fragments of meaning written down before they disappeared. Pull one from the desk — it opens into a quiet, fullscreen room built for a single poem.</span>} />
      <div className="lp-ttwrap">
        <div className="lp-ttfilter" role="tablist" aria-label="Choose category">
          <button type="button" role="tab" aria-selected={mode === "poem"}
            className={"lp-ttfilter__btn" + (mode === "poem" ? " is-on" : "")}
            onClick={() => setMode("poem")}>Poems</button>
          <button type="button" role="tab" aria-selected={mode === "lyrics"}
            className={"lp-ttfilter__btn" + (mode === "lyrics" ? " is-on" : "")}
            onClick={() => setMode("lyrics")}>Lyrics</button>
        </div>
        <LpRow par="0.04">
          {items.map((t, i) => (
            <div className="lp-tt" key={mode + i}>
              <p className="lp-tt__quote">{t}</p>
              <button type="button" className="lp-tt__view"
                onClick={() => setOpenIdx(i)}>View {label}<span className="arr">→</span></button>
            </div>
          ))}
        </LpRow>
      </div>

      {openIdx !== null ? ReactDOM.createPortal(
        <div className="lp-pmodal" role="dialog" aria-modal="true" aria-label={label} onClick={() => setOpenIdx(null)}>
          <button type="button" className="lp-pmodal__x" aria-label="Close" onClick={() => setOpenIdx(null)}>×</button>
          <div className="lp-pmodal__scroll" onClick={(e) => e.stopPropagation()}>
            <div className="lp-pmodal__inner">
              <span className="lp-pmodal__kicker">{label}</span>
              <div className="lp-pmodal__body">
                {openParas.map((p, i) => (<p key={i}>{p}</p>))}
              </div>
            </div>
          </div>
        </div>, document.body) : null}
    </section>
  );
}

/* ============ ESSAYS ============ */
const ESSAY_IMGS = [
  ["film1", "assets/film/photo-1.jpg"], ["ipInevitable", "assets/ip/inevitable.jpg"],
  ["film3", "assets/film/photo-3.jpg"], ["ipProsopagnosia", "assets/ip/prosopagnosia.jpg"],
  ["film5", "assets/film/photo-5.jpg"], ["ipFated", "assets/ip/fated.jpg"],
  ["film7", "assets/film/photo-7.jpg"], ["ipJuiced", "assets/ip/juiced.jpg"],
];

function EssaysSection({ essays, onOpen }) {
  const ref = useLpReveal();
  return (
    <section className="lp-sec lp-sec--essays lp-grain" id="essays" data-screen-label="Articles & Blog" ref={ref}>
      <div className="lp-seam-top" />
      <LpBanner img={LR("essaysBg", "assets/essays-bg.jpg")}
        side="Articles & Blog"
        eyebrow="Transmissions · Field Notes"
        title="Articles & Blog"
        blurb={<span>Not a blog — a frequency. Observations, meditations, and field notes filed from the edge of what Ted is still trying to understand.</span>} />
      <LpRow par="0.035">
        {essays.map((e, i) => {
          return (
            <div className="lp-essay lp-reveal" key={i} onClick={() => onOpen(e.title)} role="button" tabIndex={0}
              onKeyDown={(ev) => { if (ev.key === "Enter") onOpen(e.title); }}>
              {e.img && <div className="lp-essay__thumb" style={{backgroundImage:`url(${LR(e.imgKey || '', e.img)})`}} />}
              <div className="lp-essay__meta">
                <h3 className="lp-essay__title">{e.title}</h3>
                <div className="lp-essay__date">{e.date}</div>
              </div>

            </div>
          );
        })}
      </LpRow>
    </section>
  );
}

/* ============ TEDTHOUGHTS ============ */
const TT_DATES = ["5/21", "5/20", "5/18", "5/15", "5/12", "5/09", "5/06", "5/02", "4/28", "4/24", "4/19", "4/15"];
// Full poem text for the reader popup, keyed by card index. Index 0 is written out;
// others fall back to their card line until full versions are supplied.
const TT_POEM_FULL = {
  0: [
    "One second shots of moments.\nCelebrating, laughing, talking, hugging.",
    "Did you catch that?\nThose were moments created from decisions that took a split second of action.",
    "You see our minds think fast. And one little smile or hello can change your entire destiny.",
    "Like right now. I could do this. Or this. Or this. It's all up to me.",
    "Because we. Are each a miracle. An individual. With the power to shift.",
  ],
  1: [
    "Sometimes when I'm feeling stressed\nI remind myself, just do your best\nFor best is all that one can do\nAnd there's no need for feeling blue.",
    "And when you feel you have no time\nRemind yourself, it's in your mind\nFor time is just a silly thing\nThat humans made to measure lines.",
  ],
  2: [
    "Carlos castineda - the art of Dreaming",
    "There once was a mother unique as can be\nBecause she's the mother who gave birth to me.\nIf it wasn't for her, I'd be but a blur\nSo I'm thankful for the time she spent raising we.",
    "My sister and I, are the people we are,\nBecause of my mother commitment thus far,\nShe nurtured us well,\nAnd gave us hell.\nBut mostly when blasting the bass from my car.",
    "So thank you mom. For being the bomb. For singing us songs and keeping us calm.\nFor trusting that we would be safe when we play.\nFor teaching us things and showing the way.",
    "Thank you for craftfully cooking us meals and thank you for truth in keeping us real.\nWithout you dearest mom, we wouldn't be us. Never making a fuss because we have trust.",
    "I wish I could see you more offten these days,\nbut I'm glad that you let me explore life's great maze.\nI love you dearest mom\nSo here is a poem\nTo show you how proud that I am to say...",
    "My mom is the best. I wouldn't change a hair. She's perfect and beautiful and smart and she cares.\nSo cheers to you boo.\nThe mom that's so coo.\nI hope that you know how much we love you.",
  ],
  3: [
    "Damn. Life is but a sham.\nSaid the lamb. To the wolf.\nIn sheeps clothing.\n\u201cBut why the loathing?\u201d\nSaid the wolf.",
  ],
};
// Full lyric text for the reader popup, keyed by lyrics-card index.
const TT_LYRIC_FULL = {
  0: [
    "This is a story about some sorcerers living on this planet knowing that their force of words aren't given granted because everything do and say are spells casted powerful to change our destinay.",
    "So shoot the magic out your fingertips, out your hips, out your lips knowing it's a gift\nto up lift every person, every moment lived, around you; to be the party for those feeling blue.",
    "What I'm saying is that there is nothing you can't do; with this magic that you have deep inside of you. Any moment you can choose to be the light you spread. Even if alone and feeling trapped inside your head.",
    "Cause sorceress know that hexes are a state of mind. And enchantments can effect you in a wink of time. But knowing YOU are the one who is the wizard here. How about you make an aura for those far and near.",
    "CHORUS:\nCause we are we are the magic and it feels so right.\nWe are we are the magic and we spread that light.\nX2",
    "This second verse is about the curse: Knowing that we are the same yet have different brains.\nBecause you and I yes we both are one consciousness; experiencing itself from two different rifts.",
    "But knowing we're the same light\nmakes it hella tight--the same source of course, sharing the same force.\nConnected deeper than we'll ever really know. With His life effected strongly from Her clever flow.",
    "The power's in our hands to be each others glee. Perhaps by droppin' pants or bouncin' round with your titties--to make a smile that we both enjoy for miles. That's why we're here together in this super sexy pile.",
    "So thank you for what you contribute.\nFor sharing things and speaking up when your typically mute. And for your magic that we hardly ever see. To me this magic is what makes us all Resourcery.",
    "CHORUS:\nCause we are we are the magic and it feels so right.\nWe are we are the magic and we spread that light.\nX2",
    "you The sparkle pony or the sincere hug to",
    "smoke a Spliff get it lit and uplift to the fifth d. Mention to infinity. Cause you and me together we write the story if the destiny they didn't see. Coming disruptive original in every way, created from the games we played, on these grounds we made, and this trust we must",
    "Cause we are, we are the magic and it feels so right.\nWe are we are the magic,\nCause these stars theses stars inside us make us shine so bright.",
  ],
};
function TedThoughts({ poems, onOpen, onCta }) {
  const ref = useLpReveal();
  return (
    <section className="lp-sec lp-sec--thoughts lp-grain" id="tedthoughts" data-screen-label="TedThoughts" ref={ref}>
      <div className="lp-env"><div className="lp-env__veil" /></div>
      <div className="lp-seam-top" />
      <LpBanner img={LR("thoughtsBg", "assets/tedthoughts-bg.jpg")}
        side="TedThoughts"
        eyebrow="Epiphanies · Thought Sparks"
        title="TedThoughts"
        blurb={<span>Short philosophical fragments — aphorisms caught mid-flight. Scattered, discovered, alive.</span>} />
      <LpRow par="0.04">
        {(poems || []).map((p, i) => (
          <div className="lp-tc" key={i} onClick={() => onOpen(i)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onOpen(i); }}>
            <p className="lp-tc__excerpt">{(() => { const words = p.lines.join(" ").split(/\s+/); return words.slice(0, 16).join(" ") + (words.length > 16 ? "…" : ""); })()}</p>
            <div className="lp-tc__foot">
              <span className="lp-tc__date">5/18/2026</span>
              <span className="lp-tc__read">Read<span aria-hidden="true">→</span></span>
            </div>
          </div>
        ))}
      </LpRow>
      <div className="lp-ttcta lp-reveal">
        <button className="lp-cta lp-cta--gold" onClick={onCta}>Follow TedThoughts<span className="arr">→</span></button>
      </div>
    </section>
  );
}

/* ============ WORLDBUILDING ============ */
function Worldbuilding({ worlds, bg, onOpen }) {
  const ref = useLpReveal();
  return (
    <section className="lp-sec lp-sec--worlds" id="worldbuilding" data-screen-label="Worldbuilding" ref={ref}>
      <div className="lp-env"><img className="lp-poster lp-poster--par" src={bg} alt="" aria-hidden="true" data-par="0.12" /><div className="lp-env__veil" /></div>
      <div className="lp-seam-top" />
      <LpBanner img={bg}
        side="Worldbuilding"
        eyebrow="Unfinished Universes"
        title="Worldbuilding"
        blurb={<span>A drawer of symbolic systems, archetypes, and maps — cosmologies still being drawn. Each card is the seed of a world Ted is building toward.</span>} />
      <LpRow par="0.04">
        {worlds.map((w, i) => (
          <div className="lp-world" key={i} onClick={() => onOpen(w.title)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onOpen(w.title); }}>
            <div className="lp-world__art">
              <img src={LR(w.img, "assets/cosmic-bg.png")} alt={w.title} />
              <div className="lp-world__inner">
                <h3 className="lp-world__title">{w.title}</h3>
                <span className="lp-world__kind">{w.kind}</span>
              </div>
            </div>
          </div>
        ))}
      </LpRow>
    </section>
  );
}

/* ============ FILMS — past & future ============ */
function FilmCard({ f, onPlay }) {
  return (
    <div className="lp-film" onClick={() => onPlay(f.title)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") onPlay(f.title); }}>
      <div className="lp-film__art">
        <img src={LR(f.img, "assets/cosmic-bg.png")} alt={f.title} />
        <div className="lp-film__play"><LpPlay /></div>
        <div className="lp-film__desc">{f.note}</div>
      </div>
      <div className="lp-film__meta">
        <h3 className="lp-film__title">{f.title}</h3>
        <div className="lp-film__sub">{f.year} · {f.cat}</div>
      </div>
    </div>
  );
}

function FilmsSection({ past, future, onPlay }) {
  const ref = useLpReveal();
  const films = [].concat(past, future).map((f, i) => ({
    id: "film-" + i,
    title: f.title,
    meta: f.year + " · " + f.cat,
    description: f.note,
    imageSrc: LR(f.img, "assets/cosmic-bg.png"),
    videoUrl: "",
  }));
  return (
    <section className="lp-sec lp-sec--films lp-grain" id="films" data-screen-label="Films" ref={ref}>
      <div className="lp-seam-top" />
      <LpBanner img={LR("filmStill", "assets/opt/film-still.jpg")}
        eyebrow="Moving Pictures · The Archive & The Horizon"
        title="Films"
        blurb={<span>Where the philosophy becomes light and motion. Work already cast into the world, and worlds still waiting to be filmed.</span>} />
      <div className="lp-films-rail lp-reveal">
        <FocusRail items={films} loop={true} arrows={true}
          controlsCta={<button className="lp-cta lp-cta--gold" onClick={() => onPlay("Explore all films")}>Explore all films<span className="arr">→</span></button>} />
      </div>
    </section>
  );
}

Object.assign(window, { LpRow, LpHead, LpBanner, useLpReveal, BookOfIgnorance, PoetryRow, EssaysSection, TedThoughts, Worldbuilding, FilmsSection });
