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
function LpBanner({ img, eyebrow, title, blurb, side, compass, children }) {
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
        {title ? <h2 className="lp-banner__title">{title}</h2> : null}
        <div className="lp-banner__bar" />
        {children || null}
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

const CHAPTER_PREVIEWS = [
  "The first act of wisdom is not the finding of truth — it is the laying down of the need to have found it already. We carry our conclusions like armor, and wonder why we cannot feel the rain.\n\nTruth is not a destination you arrive at. It is a weather system you learn to read. And the reading begins the moment you stop insisting you already know the forecast.\n\nI have been wrong more times than I have been right. That is not a confession — it is a credential.",
  "A belief with no door is a prison. The wisest frameworks I have ever built were the ones I left deliberately unfinished — a gap at the edge where the next thing could enter without destroying what was already there.\n\nSafety is not the absence of threat. It is the presence of enough space inside you that the threat does not have to become your identity.\n\nLeave a door in everything you believe. Not because you are uncertain — because you are honest.",
  "I met a man once who had not been seen in forty years. Not unseen by others — unseen by himself. He moved through the world with tremendous efficiency and zero presence.\n\nCompassion begins where efficiency ends. It begins in the moment you choose to be inconvenienced by another person's reality.\n\nTo meet the world as if for the first time, and the thousandth — that is not naivety. That is the discipline of remaining open.",
  "Every relationship is a translation. You speak your language; they speak theirs. The space between — the gap where meaning gets lost and remade — that is where love actually lives.\n\nWe spend so much time trying to be understood. Very little time learning to understand. The wisest sentence I know still ends in a question.\n\nAsk more. Conclude less. That is the whole of it.",
  "The river does not struggle to arrive at the sea. We, who were made of the same water, spend entire lifetimes fighting the current we came from.\n\nSurrender is not the white flag of the defeated. It is the open hand of someone who has finally understood what they were holding was never theirs to keep.\n\nNot defeat — the art of letting the river carry what you cannot.",
  "There is only one country I have never been exiled from. Its name is Now. It has no map. No border control. No memory of how you arrived. Only the fact of your being here.\n\nI have lived in the past like a tenant who refuses to move out. I have lived in the future like a man renovating a house he has not yet bought.\n\nThe only country I have never been exiled from is now. And I keep forgetting to live there.",
  "Return. That is the whole of it. After the doubt, after the distraction, after the long season of forgetting — return.\n\nDevotion is not the absence of wandering. It is the practice of coming back. The thing that asks everything of you is not cruel — it is simply honest about the price of becoming.\n\nTo return, and return, to the thing that asks everything of you. That is devotion. That is the only kind of loyalty that means anything.",
  "Uncertainty is not the enemy of meaning. It is the only field wide enough for meaning to grow in. Certainty closes the story too soon.\n\nThe strange beauty I am pointing at is not the beauty of suffering — it is the beauty of not-knowing as a permanent address. Of living in the question without demanding it resolve itself on your timeline.\n\nOn uncertainty as the last open field where meaning is still allowed to grow. Stay there. Build there. That is where the real work happens.",
];

function BookChapterModal({ chapter, idx, onClose }) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [err, setErr] = React.useState("");

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setErr("Please enter a valid email."); return; }
    setErr("");
    setSubmitted(true);
  }

  return ReactDOM.createPortal(
    <div className="lp-bmodal" role="dialog" aria-modal="true" onClick={onClose}>
      <button type="button" className="lp-ttmodal__x" aria-label="Close" onClick={onClose}>×</button>
      <div className="lp-bmodal__scroll" onClick={(e) => e.stopPropagation()}>
        <div className="lp-bmodal__card">
          <div className="lp-bmodal__eyebrow">Chapter {chapter.no} · The Book of Ignorance</div>
          <h2 className="lp-bmodal__title">{chapter.title}</h2>
          <div className="lp-ttmodal__divider" style={{ marginBottom: 32 }} />

          <div className="lp-bmodal__preview-wrap">
            <p className="lp-bmodal__preview-text">{CHAPTER_PREVIEWS[idx]}</p>
            <div className="lp-bmodal__preview-fade" aria-hidden="true" />
          </div>

          <div className="lp-bmodal__gate">
            <div className="lp-bmodal__gate-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            {submitted ? (
              <div className="lp-bmodal__success">
                <p>You're on the list. We'll reach you when the book arrives.</p>
              </div>
            ) : (
              <>
                <p className="lp-bmodal__gate-label">The full chapter is locked until publication.</p>
                <p className="lp-bmodal__gate-sub">Leave your email — be the first to know when <em>The Book of Ignorance</em> is released.</p>
                <form className="lp-bmodal__form" onSubmit={handleSubmit} noValidate>
                  <input
                    className="lp-bmodal__input"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErr(""); }}
                    aria-label="Email address"
                  />
                  <button className="lp-bmodal__submit" type="submit">Notify Me</button>
                </form>
                {err && <p className="lp-bmodal__err">{err}</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function BookOfIgnorance({ virtues, bg, onCta }) {
  const ref = useLpReveal();
  const [openIdx, setOpenIdx] = React.useState(null);
  return (
    <section className="lp-sec lp-sec--book lp-grain" id="book-of-ignorance" data-screen-label="The Book of Ignorance" ref={ref}>
      {openIdx !== null && (
        <BookChapterModal
          chapter={BOOK_CHAPTERS[openIdx]}
          idx={openIdx}
          onClose={() => setOpenIdx(null)}
        />
      )}
      <div className="lp-seam-top" />
      <LpBanner img={bg || LR("parchmentDesk", "assets/opt/parchment-desk.jpg")}
        compass={true}
        eyebrow="A Living Framework · A Book of Virtues"
        title={<span>The Book of Ignorance</span>}
        blurb={<span>Not a doctrine but a practice — a living framework built on a single idea: that truth cannot be possessed, only passed through. A paradigm-shifting book of virtues to attune to, the way a sailor attunes to weather.</span>} />
      <LpRow par="0.04">
        {BOOK_CHAPTERS.map((c, i) => (
          <div className="lp-chapter" key={i} onClick={() => setOpenIdx(i)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") setOpenIdx(i); }}>
            <div className="lp-chapter__content">
              <div className="lp-chapter__no" aria-hidden="true">{c.no}</div>
              <div className="lp-chapter__tag">Chapter {c.no}</div>
              <h3 className="lp-chapter__title">{c.title}</h3>
              <span className="lp-chapter__read">Read Preview<span aria-hidden="true">→</span></span>
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

/* ============ SHARED: shareable link button ============ */
function ShareBtn({ param, value, dark }) {
  const [copied, setCopied] = React.useState(false);
  const url = window.location.origin + window.location.pathname + "?" + param + "=" + encodeURIComponent(value);
  function copy(e) {
    e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2200); });
  }
  return (
    <button type="button" className={"lp-share-btn" + (dark ? " lp-share-btn--dark" : "")} onClick={copy}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      {copied ? "Link copied!" : "Copy link"}
    </button>
  );
}

/* ============ POETRY — scroll cards + Poems/Lyrics categories ============ */
function getPreview(t) {
  const text = typeof t === "object" && t.content ? t.content : (typeof t === "string" ? t : "");
  const clean = text.replace(/\n/g, " ").trim();
  const matches = clean.match(/[^.!?]+[.!?]+/g) || [];
  const snippet = matches.slice(0, 2).join(" ").trim();
  return snippet || clean.slice(0, 140);
}

function PoetryRow({ thoughts, lyrics }) {
  const ref = useLpReveal();
  const [mode, setMode] = useLsState("poem");
  const [openIdx, setOpenIdx] = useLsState(null);
  const items = mode === "lyrics" ? (lyrics || []) : (thoughts || []);
  const label = mode === "lyrics" ? "Lyrics" : "Poem";
  const openItem = openIdx === null ? null : items[openIdx];
  // For poem objects: use .content; for lyrics (strings): use the string itself
  const openParas = openItem
    ? (typeof openItem === "object" ? null : (TT_LYRIC_FULL[openIdx] || [openItem]))
    : null;
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
        blurb={<span>Fragments of meaning written down before they disappeared. Pull one from the desk — it opens into a quiet, fullscreen room built for a single poem.</span>}>
        <div className="lp-ttfilter lp-ttfilter--inline" role="tablist" aria-label="Choose category">
          <button type="button" role="tab" aria-selected={mode === "poem"}
            className={"lp-ttfilter__btn" + (mode === "poem" ? " is-on" : "")}
            onClick={() => setMode("poem")}>Poems</button>
          <button type="button" role="tab" aria-selected={mode === "lyrics"}
            className={"lp-ttfilter__btn" + (mode === "lyrics" ? " is-on" : "")}
            onClick={() => setMode("lyrics")}>Lyrics</button>
        </div>
      </LpBanner>
      <div className="lp-ttwrap">
        <LpRow par="0.04">
          {items.map((t, i) => (
            <div className="lp-tt" key={mode + i}>
              <p className="lp-tt__quote">{typeof t === "object" ? t.title : t}</p>
              <p className="lp-tt__preview">{getPreview(t)}</p>
              <button type="button" className="lp-tt__view"
                onClick={() => setOpenIdx(i)}>View {label}<span className="arr">→</span></button>
            </div>
          ))}
        </LpRow>
      </div>

      {openIdx !== null ? ReactDOM.createPortal(
        <div className="lp-pmodal" role="dialog" aria-modal="true" aria-label={label} onClick={() => setOpenIdx(null)}>
          <button type="button" className="lp-pmodal__x" aria-label="Close" onClick={() => setOpenIdx(null)}>×</button>
          <button type="button" className="lp-pmodal__nav lp-pmodal__nav--prev" aria-label={"Previous " + label}
            onClick={(e) => { e.stopPropagation(); setOpenIdx((openIdx - 1 + items.length) % items.length); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className="lp-pmodal__nav lp-pmodal__nav--next" aria-label={"Next " + label}
            onClick={(e) => { e.stopPropagation(); setOpenIdx((openIdx + 1) % items.length); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="lp-pmodal__count">
            <b>{String(openIdx + 1).padStart(2, "0")}</b> / {String(items.length).padStart(2, "0")}
          </div>
          <div className="lp-pmodal__scroll" onClick={(e) => e.stopPropagation()}>
            <div className="lp-pmodal__inner">
              {openItem && typeof openItem === "object" ? (
                <div className="lp-pmodal__body lp-pmodal__body--poem">
                  <div className="lp-pmodal__poem-date">{openItem.date}</div>
                  <h2 className="lp-pmodal__poem-title">{openItem.title}</h2>
                  <div className="lp-pmodal__poem-divider" />
                  {openItem.content.split(/\n\n+/).map((stanza, i) => (
                    <p key={i} className="lp-pmodal__poem-stanza">
                      {stanza.split("\n").map((ln, j, arr) => (
                        <span key={j}>{ln}{j < arr.length - 1 ? <br /> : null}</span>
                      ))}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="lp-pmodal__body">
                  {openParas && openParas.map((p, i) => (<p key={i}>{p}</p>))}
                </div>
              )}
              <div className="lp-pmodal__share">
                <ShareBtn param={mode === "lyrics" ? "lyrics" : "poem"} value={typeof openItem === "object" && openItem.title ? openItem.title : String(openIdx)} />
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

const ESSAY_BODY = {
  "The Art of the Hyperlapse": `A hyperlapse is not just a timelapse — it is a camera carried through space while time compresses around it. The technique demands patience: hundreds of frames, each shot a step apart. I first used it on the Kia Telluride campaign, a vast Nevada salt flat, a car that needed to feel like it owned the horizon.`,

  "The Art of Documentary-Style Video Editing": `Documentary editing is the art of finding the story inside the footage rather than imposing one onto it. You show up with a structure. You leave with a different one — better, stranger, more honest. A long pause before an answer tells the audience something no voiceover can. Silence is an edit. Color temperature is an edit.`,

  "6 reasons why Wix, Squarespace and Wordpress are not good enough": `They are builders for builders who do not want to build. The templates look finished — and that is exactly the problem. They look like everyone else's finished thing. SEO suffers. Page speed suffers. And your design, content, and customer data are tenants in someone else's building. A serious brand needs infrastructure it controls.`,

  "The Art of Emotional Storytelling in a World of AI": `AI can generate a story that is structurally correct. What it cannot do is bleed. The specific scar that makes a story irreplaceable is in the detail only one person on earth would think to include. As AI floods every channel, the story only you can tell — because only you lived it — is worth more than ever.`,

  "AI is going to end us - but you might not have to \"die\"": `The version of you that exists today — your assumptions, your habits, the identity you have been protecting — that version is already ending. AI is not killing it. Progress always was. The people who survive are the most narratively flexible: the ones who can tell a new story without requiring the old one to be vindicated first.`,

  "6 Essential Points when Creating an Animated Explainer Video": `Script before everything. The animation serves the words, never the reverse. A weak script with beautiful motion is a beautiful lie. Establish the emotional register in the first ten seconds or lose the audience. Voice and pacing matter more than visual style. Color is not decoration — it is communication. Music is the emotional architecture the animation moves through.`,
};

function EssayModal({ essays, idx, onClose, onNav }) {
  const essay = essays[idx];
  const [copied, setCopied] = React.useState(false);
  const shareUrl = window.location.origin + window.location.pathname + "?essay=" + encodeURIComponent(essay.title);
  const heroImg = essay.imgKey === "hyperlapse" ? "assets/hyperlapse-bts.jpg" : LR(essay.imgKey || "", essay.img);
  const body = ESSAY_BODY[essay.title] || "";
  const hasPrev = idx > 0;
  const hasNext = idx < essays.length - 1;

  React.useEffect(() => {
    setCopied(false);
  }, [idx]);

  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNav(idx - 1);
      if (e.key === "ArrowRight" && hasNext) onNav(idx + 1);
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [onClose, onNav, idx, hasPrev, hasNext]);

  function copyLink() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }

  return ReactDOM.createPortal(
    <div className="lp-emodal" role="dialog" aria-modal="true" onClick={onClose}>
      <button type="button" className="lp-ttmodal__x" aria-label="Close" onClick={onClose}>×</button>
      {hasPrev && (
        <button type="button" className="lp-emodal__nav lp-emodal__nav--prev" aria-label="Previous article"
          onClick={(e) => { e.stopPropagation(); onNav(idx - 1); }}>‹</button>
      )}
      {hasNext && (
        <button type="button" className="lp-emodal__nav lp-emodal__nav--next" aria-label="Next article"
          onClick={(e) => { e.stopPropagation(); onNav(idx + 1); }}>›</button>
      )}
      <div className="lp-emodal__scroll" onClick={(e) => e.stopPropagation()}>
        <div className="lp-emodal__card">
          {heroImg && <div className="lp-emodal__hero" style={{ backgroundImage: `url(${heroImg})` }} />}
          <div className="lp-emodal__body">
            <div className="lp-emodal__date">{essay.date}</div>
            <h2 className="lp-emodal__title">{essay.title}</h2>
            <div className="lp-ttmodal__divider" style={{ margin: "20px 0 28px" }} />
            {body.split("\n\n").map((para, i) => (
              <p key={i} className="lp-emodal__para">{para}</p>
            ))}
            <div className="lp-emodal__footer">
              <div className="lp-emodal__count">{idx + 1} / {essays.length}</div>
              <button type="button" className="lp-emodal__share-btn" onClick={copyLink}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                {copied ? "Link copied!" : "Copy shareable link"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function EssaysSection({ essays, onOpen }) {
  const ref = useLpReveal();
  const [openIdx, setOpenIdx] = React.useState(null);
  return (
    <section className="lp-sec lp-sec--essays lp-grain" id="essays" data-screen-label="Articles & Blog" ref={ref}>
      {openIdx !== null && (
        <EssayModal essays={essays} idx={openIdx} onClose={() => setOpenIdx(null)} onNav={setOpenIdx} />
      )}
      <div className="lp-seam-top" />
      <LpBanner img={LR("essaysBg", "assets/essays-bg.jpg")}
        eyebrow="Transmissions · Field Notes"
        title="Articles & Blog"
        blurb={<span>Not a blog — a frequency. Observations, meditations, and field notes filed from the edge of what Ted is still trying to understand.</span>} />
      <LpRow par="0.035">
        {essays.map((e, i) => {
          return (
            <div className="lp-essay lp-reveal" key={i} onClick={() => { onOpen(e.title); setOpenIdx(i); }} role="button" tabIndex={0}
              onKeyDown={(ev) => { if (ev.key === "Enter") { onOpen(e.title); setOpenIdx(i); } }}>
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
const TT_DATES = ["5/18/2026", "5/18/2026", "5/8/2026", "10/19/2025", "10/19/2025", "9/25/2025", "6/30/2025", "6/14/2025", "5/31/2025", "1/10/2025", "8/13/2024", "8/9/2024"];
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
  const items = poems || [];

  return (
    <section className="lp-sec lp-sec--thoughts lp-grain" id="tedthoughts" data-screen-label="TedThoughts" ref={ref}>
      <div className="lp-env"><div className="lp-env__veil" /></div>
      <div className="lp-seam-top" />
      <LpBanner img={LR("thoughtsBg", "assets/tedthoughts-bg-v4.png")}
        eyebrow="Epiphanies · Thought Sparks"
        title="TedThoughts"
        blurb={<span>Short philosophical fragments — aphorisms caught mid-flight. Scattered, discovered, alive.</span>} />
      <LpRow par="0.04">
        {items.map((p, i) => (
          <div className="lp-tc" key={i}>
            <p className="lp-tc__excerpt">{p.lines.join("\n\n")}</p>
            <div className="lp-tc__foot">
              <span className="lp-tc__date">{TT_DATES[i] || ""}</span>
              <ShareBtn param="thought" value={String(i)} />
            </div>
          </div>
        ))}
      </LpRow>
      <div className="lp-ttcta lp-reveal">
        <button className="lp-cta lp-cta--gold" onClick={onCta}>Follow TedThoughts on X<span className="arr">→</span></button>
      </div>
    </section>
  );
}

/* ============ WORLDBUILDING ============ */
const WORLD_DETAILS = {
  "The Fated": {
    blurb: "A civilization that can see every outcome but one — its own choosing.",
    synopsis: "In a world where every consequence of every action is visible before it is taken, an entire civilization has built its society around the certainty of prediction. Cities are planned for disasters that haven't happened yet. Wars are avoided — or started — before a single word is exchanged. The only thing the Seers cannot predict is the choice made at the moment of crisis. One woman discovers her own blind spot — and realizes it may be the last free act left in the world.",
    genre: "Mythic Sci-Fi · Philosophical Drama",
    characters: ["Ilara — the last unpredicted woman", "The Architect — designer of the prediction system", "The Blind Council — seven elders who govern by consensus of foreseen futures"],
  },
  "Inevitable": {
    blurb: "What if the future already happened, and memory is just the echo running backward?",
    synopsis: "A physicist discovers that memory and anticipation are the same neurological event — the brain cannot distinguish between remembering the past and remembering the future. As she follows this discovery, she realizes the world around her has already ended and begun again several times over. She is not predicting. She is remembering forward.",
    genre: "Hard Sci-Fi · Existential Thriller",
    characters: ["Dr. Maren Cole — the physicist who sees both directions", "The Residue — entities made entirely of events that haven't technically happened yet", "The Archive — a structure that exists outside linear time"],
  },
  "Prosopagnosia": {
    blurb: "A society that recognizes souls by their weather, not their features.",
    synopsis: "In this world, faces are invisible — literally blank to every perceiving mind. Identity is communicated entirely through emotional atmosphere: the quality of someone's presence, their behavioral weather, the particular texture of how they occupy a room. Two strangers fall in love without ever knowing what the other looks like. Then one of them develops the ability to see.",
    genre: "Surrealist Drama · Love Story",
    characters: ["Calla — who develops the ability to see faces", "The Weathered — a community that has evolved language around emotional atmosphere", "The Visible Man — the only person whose face can be seen by all"],
  },
  "Juiced": {
    blurb: "Appetite as a religion. A neon parable about the hunger that eats its own god.",
    synopsis: "In a near-future city where desire has been commodified at the neurological level, a black market emerges for raw, unfiltered wanting. The city runs on the energy of manufactured craving. A dealer in authentic hunger discovers that the most valuable commodity in the world is a single moment of wanting nothing at all.",
    genre: "Noir · Speculative Fiction",
    characters: ["Rael — the hunger dealer", "The Sated — a cult of people who have consumed themselves into emptiness", "The Origin — the source of the first manufactured desire"],
  },
  "The Bestiary of Virtues": {
    blurb: "Eight archetypal creatures, each the living embodiment of a virtue to attune to.",
    synopsis: "A living symbolic system in which each of the eight virtues from The Book of Ignorance is embodied by a mythic creature. Not allegory — these creatures are real within their world, and to encounter one is to be changed by it. The world is a cartography of moral weather, where the health of a civilization is measured by which creatures are still seen in the wild.",
    genre: "Mythic Cosmology · Illustrated World",
    characters: ["The Wanderer Bear — Wonder", "The Hollow Stag — Humility", "The Burning Moth — Devotion", "The Glass Whale — Presence", "The Root Fox — Surrender"],
  },
};

function WorldModal({ world, onClose }) {
  const details = WORLD_DETAILS[world.title] || {};
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [onClose]);
  return ReactDOM.createPortal(
    <div className="lp-wmodal" role="dialog" aria-modal="true" onClick={onClose}>
      <button type="button" className="lp-ttmodal__x" aria-label="Close" onClick={onClose}>×</button>
      <div className="lp-wmodal__scroll" onClick={(e) => e.stopPropagation()}>
        <div className="lp-wmodal__card">
          <div className="lp-wmodal__hero" style={{ backgroundImage: `url(${world.imgSrc})` }}>
            <div className="lp-wmodal__hero-veil" />
            <div className="lp-wmodal__hero-label">
              <span className="lp-wmodal__kind">{world.kind}</span>
              <h2 className="lp-wmodal__title">{world.title}</h2>
            </div>
          </div>
          <div className="lp-wmodal__body">
            <p className="lp-wmodal__blurb">{details.blurb || world.note}</p>
            <div className="lp-ttmodal__divider" style={{ margin: "24px 0 28px" }} />

            <div className="lp-wmodal__section">
              <div className="lp-wmodal__section-label">Synopsis</div>
              <p className="lp-wmodal__text">{details.synopsis}</p>
            </div>

            <div className="lp-wmodal__row">
              <div className="lp-wmodal__section lp-wmodal__section--half">
                <div className="lp-wmodal__section-label">Genre</div>
                <p className="lp-wmodal__text">{details.genre}</p>
              </div>
              {details.characters && (
                <div className="lp-wmodal__section lp-wmodal__section--half">
                  <div className="lp-wmodal__section-label">Characters</div>
                  <ul className="lp-wmodal__chars">
                    {details.characters.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              )}
            </div>

            <div className="lp-wmodal__cta-wrap">
              <div className="lp-wmodal__cta-label">Request the full world deck as a PDF</div>
              <a className="lp-wmodal__cta-btn" href={`mailto:ted@tedsaunders.com?subject=World Deck Request: ${encodeURIComponent(world.title)}&body=Hi Ted,%0A%0AI'd love to receive the full deck for "${world.title}".%0A%0AThanks`}>
                Email Ted for the full deck
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
              <div className="lp-wmodal__share-row"><ShareBtn param="world" value={world.title} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Worldbuilding({ worlds, bg, onOpen }) {
  const ref = useLpReveal();
  const [openWorld, setOpenWorld] = React.useState(null);
  return (
    <section className="lp-sec lp-sec--worlds" id="worldbuilding" data-screen-label="Worldbuilding" ref={ref}>
      {openWorld && <WorldModal world={openWorld} onClose={() => setOpenWorld(null)} />}
      <div className="lp-env"><img className="lp-poster lp-poster--par" src={bg} alt="" aria-hidden="true" data-par="0.12" /><div className="lp-env__veil" /></div>
      <div className="lp-seam-top" />
      <LpBanner img={bg}
        eyebrow="Unfinished Universes"
        title="Worldbuilding"
        blurb={<span>A drawer of symbolic systems, archetypes, and maps — cosmologies still being drawn. Each card is the seed of a world Ted is building toward.</span>} />
      <LpRow par="0.04">
        {worlds.map((w, i) => (
          <div className="lp-world" key={i} onClick={() => { onOpen(w.title); setOpenWorld({ ...w, imgSrc: LR(w.img, "assets/cosmic-bg.png") }); }} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") { onOpen(w.title); setOpenWorld({ ...w, imgSrc: LR(w.img, "assets/cosmic-bg.png") }); } }}>
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
