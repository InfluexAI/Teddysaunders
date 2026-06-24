
// ===== Button.jsx =====
// Button.jsx — bronze / bronze-strong / outline
function Button({ variant = "bronze", children, onClick, type = "button" }) {
  const cls = "tk-btn tk-btn--" + variant;
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

// PlayTriangle — bronze-gradient triangle inside a circle.
// Used inside .tk-video .play and in iconography previews.
function PlayTriangle({ size = 38, id = "pg" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#BF8753" />
          <stop offset="35%"  stopColor="#FAC288" />
          <stop offset="70%"  stopColor="#C9915C" />
          <stop offset="100%" stopColor="#AB7442" />
        </linearGradient>
      </defs>
      <polygon points="7,4 21,12 7,20" fill={`url(#${id})`} />
    </svg>
  );
}

window.Button = Button;
window.PlayTriangle = PlayTriangle;


// ===== TypewriterMedium.jsx =====
// TypewriterMedium.jsx — cycles "FILM / PHOTOGRAPHY / MUSIC / STORY"
// with a type-in, hold, type-out animation every ~4 seconds.
// Rendered inline inside <div class="through"> so it inherits the
// black bold "FILM" styling.
function TypewriterMedium() {
  const words = ["Film", "Photography", "Music", "Story"];
  const TYPE_MS  = 90;    // per character on type-in
  const ERASE_MS = 50;    // per character on type-out
  const HOLD_MS  = 2400;  // pause once fully typed

  const [wordIdx, setWordIdx]   = React.useState(0);
  const [charCount, setCharCnt] = React.useState(0);
  const [phase, setPhase]       = React.useState("type"); // type | hold | erase

  React.useEffect(() => {
    const current = words[wordIdx];
    let t;
    if (phase === "type") {
      if (charCount < current.length) {
        t = setTimeout(() => setCharCnt((c) => c + 1), TYPE_MS);
      } else {
        t = setTimeout(() => setPhase("erase"), HOLD_MS);
      }
    } else if (phase === "erase") {
      if (charCount > 0) {
        t = setTimeout(() => setCharCnt((c) => c - 1), ERASE_MS);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("type");
      }
    }
    return () => clearTimeout(t);
  }, [phase, charCount, wordIdx]);

  const visible = words[wordIdx].slice(0, charCount);

  return (
    <span className="film">
      <span className="film-text">{visible || "\u00A0"}</span>
      <span className="film-caret" aria-hidden="true" />
    </span>
  );
}

window.TypewriterMedium = TypewriterMedium;


// ===== Header.jsx =====
// Header.jsx — top nav with a hamburger toggle on mobile.
const { useState: useStateHdr } = React;

function Header({ active = "Films", onNav, onCta }) {
  const items = ["About", "Work With Me", "Films", "Consulting"];
  const [open, setOpen] = useStateHdr(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const pick = (label) => { onNav && onNav(label); setOpen(false); };

  return (
    <header className="tk-header">
      <a className="tk-brand" onClick={() => onNav && onNav("Home")}>
        <img className="logo" src={(window.__resources && window.__resources.logo) || "assets/logo.png"} alt="Ted Saunders" />
      </a>

      <ul className="tk-nav">
        {items.map((label) => (
          <li key={label}>
            <a
              className={active === label ? "is-active" : ""}
              onClick={(e) => { e.preventDefault(); pick(label); }}
              href="#"
            >{label}</a>
          </li>
        ))}
      </ul>

      <Button variant="turquoise" onClick={onCta}>EXPLORE THE WORK</Button>

      {/* Hamburger — only renders on mobile via CSS */}
      <button
        className="tk-menu-toggle"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        </svg>
      </button>

      {/* Full-screen mobile menu overlay */}
      <div className={"tk-mobile-menu" + (open ? " is-open" : "")}>
        <button
          className="close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
        {items.map((label) => (
          <a
            key={label}
            className={active === label ? "is-active" : ""}
            onClick={(e) => { e.preventDefault(); pick(label); }}
            href="#"
          >{label}</a>
        ))}
        <Button variant="turquoise" onClick={() => { onCta && onCta(); setOpen(false); }}>
          EXPLORE THE WORK
        </Button>
      </div>
    </header>
  );
}

window.Header = Header;


// ===== StatRow.jsx =====
// StatRow.jsx — bronze stat number + label, with a count-up animation
// from 0 → target on first viewport entry. Parses values like "20+",
// "10m+", "100+", "3" — animates the integer portion, keeps the suffix.

function parseStat(value) {
  const m = String(value).match(/^(\d+)(.*)$/);
  if (!m) return { num: 0, suffix: String(value) };
  return { num: parseInt(m[1], 10), suffix: m[2] };
}

function useCountUp(target, durationMs = 1800) {
  const [current, setCurrent] = React.useState(0);
  const elRef = React.useRef(null);
  const startedRef = React.useRef(false);

  React.useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const t0 = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - t0) / durationMs);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        setCurrent(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    // Trigger when in view (or immediately if already in view)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) start(); });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, durationMs]);

  return [current, elRef];
}

function Stat({ num, lbl }) {
  const { num: target, suffix } = parseStat(num);
  const [val, ref] = useCountUp(target, 1800);
  return (
    <div className="tk-stat" ref={ref}>
      <div className="num">{val}{suffix}</div>
      <div className="lbl">{lbl}</div>
    </div>
  );
}
window.Stat = Stat;


// ===== Hero.jsx =====
// Hero.jsx — full-bleed video hero, exact recreation of
// "Header v2 — Futurism.png" reference.
function Hero({ active, onNav, onCta, onPrimary, onSecondary }) {
  return (
    <section className="tk-hero">
      {/* Full-bleed background video */}
      <video
        className="tk-hero__video"
        src={(window.__resources && window.__resources.heroVideo) || "assets/hero-bg.mp4"}
        autoPlay loop muted playsInline
      />
      <div className="tk-hero__vignette" />
      <div className="tk-hero__veil" />

      <div className="tk-hero__content">
        <Header active={active} onNav={onNav} onCta={onCta} />

        {/* Corner reticles */}
        <div className="tk-hero__reticles">
          <span className="r tl" />
          <span className="r tr" />
          <span className="r bl" />
          <span className="r br" />
        </div>

        {/* Center stack */}
        <div className="tk-hero__center">
          <div className="credits">
            <span className="c-director">Director</span>
            <span className="dot" />
            <span className="c-phil">Philosopher</span>
            <span className="dot" />
            <span className="c-architect">Architect of Worlds</span>
          </div>

          <h1 className="wordmark">Weilding&nbsp;Magic</h1>

          <div className="through">
            Through<TypewriterMedium />
          </div>

          <p className="subhead">
            From cinematic brand campaigns to original sci-fi universes, Ted&rsquo;s work
            delivers stories that are rich in myth and alive with humanity — at the
            intersection of technology, emotion, and transformation.
          </p>

          <div className="actions">
            <Button variant="bronze"        onClick={onPrimary}  >EXPLORE THE WORK</Button>
            <Button variant="gold-outline"  onClick={onSecondary}>VIEW THE REEL</Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="tk-hero__stats">
          <Stat num="20+"  lbl="Years directing" />
          <Stat num="10m+" lbl="Collective video views" />
          <Stat num="100+" lbl="Clients serviced" />
          <Stat num="3"    lbl="Client acquisitions" />
        </div>

        {/* Tedivider — gold hairlines with the monogram disc centered */}
        <div className="tk-hero__divider">
          <div className="rule" />
          <div className="disc">
            <img src={(window.__resources && window.__resources.logo) || "assets/logo.png"} alt="" />
          </div>
          <div className="rule" />
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;


// ===== PressStrip.jsx =====
// PressStrip.jsx — looping marquee with bundler-friendly resource lookup.
function PressStrip() {
  const map = (window.__resources) || {};
  const fallback = (id, file) => map[id] || `assets/press/${file}`;
  const logos = [
    fallback("pressNetflix", "netflix.svg"),
    fallback("pressAbc",     "abc.svg"),
    fallback("pressIheart",  "iheart.svg"),
    fallback("pressDrew",    "drew-large.svg"),
  ];
  return (
    <div className="tk-press" aria-label="As featured on">
      <div className="marquee">
        {[...logos, ...logos, ...logos, ...logos].map((src, i) => (
          <img key={i} src={src} alt="" />
        ))}
      </div>
    </div>
  );
}

function CosmicPanel({ children }) {
  return <section className="tk-press-section">{children}</section>;
}

window.PressStrip = PressStrip;
window.CosmicPanel = CosmicPanel;


// ===== Director.jsx =====
// Director.jsx — "The Visionary Director" section.
// Layered figure (vignetted base photo + warm lamp spill + sharp cutout)
// on the left, copy + CTA on the right.
function Director({ onReadMore }) {
  return (
    <div className="tk-director">
      <div className="tk-figure" aria-hidden="true">
        <img src={(window.__resources && window.__resources.directorImg) || "assets/director-composite.png"} alt="" />
      </div>

      <div className="copy">
        <div className="eyebrow">The Visionary Director</div>
        <h2>The Boy Who Brought<br />The Worlds He Imagined<br />To Life</h2>
        <p>
          Ted was six when he asked an innocent question that would unknowingly
          shape his entire life and career: &ldquo;What does that button do, Daddy?&rdquo;
          His father handed him the camera and he hasn&rsquo;t stopped using it since.
        </p>
        <p>
          Forty years later, Ted Saunders has directed everything from viral
          Burning Man narrative films to high-converting global Salesforce
          campaigns. He has gone from building studios, to losing everything,
          and much like his photography, had to develop in that darkness —
          reemerging with a strength, stamina and skill forged in the fires of
          transformation. Ted&rsquo;s philosophy, to show the beauty of humanity
          captured through our imperfection, is exposed through every frame he
          shoots.
        </p>
        <div className="cta-wrap">
          <Button variant="gold-outline" onClick={onReadMore}>READ THE FULL STORY</Button>
        </div>
      </div>
    </div>
  );
}

window.Director = Director;


// ===== Testimonials.jsx =====
// Testimonials.jsx — three-up bronze pull-quotes with vertical
// hairline separators between them (matching Featured Work section spec).
function Testimonials() {
  const items = [
    {
      body: "Ten years later, I still come here when the world gets dark and my soul needs a hug.",
      by:   "@FeatherzMcG",
    },
    {
      body: "I really think this is one of the loveliest things on Youtube.",
      by:   "@FeatherzMcG",
    },
    {
      body: "No matter how many times I watch this, it makes me cry every time. I love it more than words can express.",
      by:   "@FeatherzMcG",
    },
  ];
  return (
    <div className="tk-testimonials">
      <Testimonial {...items[0]} />
      <div className="tk-vrule" aria-hidden="true" />
      <Testimonial {...items[1]} />
      <div className="tk-vrule" aria-hidden="true" />
      <Testimonial {...items[2]} />
    </div>
  );
}

function Testimonial({ body, by }) {
  return (
    <div className="tk-testimonial">
      <div className="quote-icon" aria-hidden="true" />
      <div className="body">{body}</div>
      <div className="by">{by}</div>
    </div>
  );
}

window.Testimonials = Testimonials;
window.Testimonial = Testimonial;


// ===== FeatureVideo.jsx =====
// FeatureVideo.jsx — "Disrupting Culture" section with section head,
// video poster, three testimonials, then primary+outline CTA pair.
function FeatureVideo({ onPlay, onCase, onAll }) {
  return (
    <section className="tk-feature-section">
      <div className="tk-section-head">
        <div className="eyebrow">Featured Work</div>
        <h2>Disrupting Culture<br />By Impacting Millions</h2>
        <p className="blurb">
          With over 4 million views, this film tripled Burning Man&rsquo;s ticket sales,
          selling them out for the first time. Over a decade later, people still watch it
          religiously, stating that it gives them hope during hard times.
        </p>
      </div>

      <div className="tk-video" onClick={onPlay} role="button" aria-label="Play feature reel">
        <div className="play"><PlayTriangle size={42} id="pgFeat" /></div>
      </div>

      <Testimonials />

      <div className="tk-feature-cta">
        <Button variant="bronze"  onClick={onCase}>VIEW FULL CASE STUDY</Button>
        <Button variant="outline" onClick={onAll}>EXPLORE ALL FILMS</Button>
      </div>
    </section>
  );
}

window.FeatureVideo = FeatureVideo;


// ===== Archive.jsx =====
// Archive.jsx — "Explore the Archive" film/photo/music/literature tiles.
function Archive({ onOpen }) {
  const items = [
    { tag: "Film",        date: "AUG 25, 2011", title: "Stories that dare you to think differently." },
    { tag: "Photography", date: "JUN 02, 2018", title: "Stories that dare you to think differently." },
    { tag: "Music",       date: "NOV 14, 2020", title: "Stories that dare you to think differently." },
    { tag: "Literature",  date: "MAR 09, 2023", title: "Stories that dare you to think differently." },
  ];
  return (
    <section className="tk-archive-section">
      <div className="tk-section-head">
        <div className="tk-tedivider">
          <div className="rule" />
          <div className="disc"><img src={(window.__resources && window.__resources.logo) || "assets/logo.png"} alt="" /></div>
          <div className="rule" />
        </div>
        <div className="eyebrow">My Work</div>
        <h2>Explore the Archive</h2>
        <p className="blurb">
          Every medium in service of the same obsession — to reveal the beauty of humanity
          through a transformational new lens.
        </p>
      </div>

      <div className="tk-archive">
        {items.map((it, i) => (
          <a key={i} className="tk-archive-card"
             onClick={(e) => { e.preventDefault(); onOpen && onOpen(it); }}
             href="#">
            <div className="thumb">
              <div className="tag">{it.tag}</div>
            </div>
            <div>
              <div className="title">{it.title}</div>
              <div className="date">{it.date}</div>
            </div>
            <div className="arrow">→</div>
          </a>
        ))}
      </div>
    </section>
  );
}

window.Archive = Archive;


// ===== Footer.jsx =====
// Footer.jsx — simple footer
function Footer() {
  return (
    <footer className="tk-footer">
      <div>&copy; 2026 Ted Saunders</div>
      <div className="links">
        <a href="#">Instagram</a>
        <a href="#">Vimeo</a>
        <a href="#">YouTube</a>
        <a href="#">Contact</a>
      </div>
    </footer>
  );
}

window.Footer = Footer;


// ===== App.jsx =====
// App.jsx — assembles the marketing site.
const { useState, useCallback } = React;

function ToastShelf({ events, onDismiss }) {
  if (!events.length) return null;
  return (
    <div style={{
      position: "fixed", right: 24, bottom: 24, zIndex: 9999,
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      {events.map((e) => (
        <div key={e.id}
          onClick={() => onDismiss(e.id)}
          style={{
            background: "linear-gradient(180deg, #FFF2C6 0%, #BD8332 100%)",
            color: "#000", padding: "12px 18px", borderRadius: 4,
            fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700,
            letterSpacing: "0.04em", textTransform: "uppercase",
            boxShadow: "0 12px 36px rgba(0,0,0,0.4)",
            cursor: "pointer", maxWidth: 360,
          }}>
          {e.text}
        </div>
      ))}
    </div>
  );
}

// Scaler hook — applies transform: scale to a 1920-design stage and
// sets the wrapper's height to (natural height × scale) so the rest
// of the page lays out correctly underneath.
function useStageScale(designWidth = 1920) {
  const wrapRef = React.useRef(null);
  const stageRef = React.useRef(null);
  React.useEffect(() => {
    const MOBILE_BP = 768;
    const apply = () => {
      const stage = stageRef.current;
      const wrap = wrapRef.current;
      if (!stage || !wrap) return;
      const vw = window.innerWidth;
      if (vw < MOBILE_BP) {
        // Mobile: true responsive layout, no scaling.
        stage.classList.add("is-mobile");
        stage.style.transform = "none";
        stage.style.width = "100%";
        wrap.style.height = "auto";
      } else {
        // Tablet / desktop: pixel-perfect 1920 stage scaled to viewport.
        stage.classList.remove("is-mobile");
        const scale = vw / designWidth;
        stage.style.width = designWidth + "px";
        stage.style.transform = `scale(${scale})`;
        const naturalH = stage.scrollHeight;
        wrap.style.height = (naturalH * scale) + "px";
      }
    };
    apply();
    window.addEventListener("resize", apply);
    const ro = new ResizeObserver(apply);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => { window.removeEventListener("resize", apply); ro.disconnect(); };
  }, [designWidth]);
  return { wrapRef, stageRef };
}

function App() {
  const [active, setActive] = useState("Films");
  const [events, setEvents] = useState([]);
  const { wrapRef, stageRef } = useStageScale(1920);

  const fire = useCallback((text) => {
    const id = Date.now() + Math.random();
    setEvents((cur) => [...cur, { id, text }]);
    setTimeout(() => setEvents((cur) => cur.filter((x) => x.id !== id)), 2600);
  }, []);
  const dismiss = (id) => setEvents((cur) => cur.filter((x) => x.id !== id));

  return (
    <div className="tk-scaler" ref={wrapRef}>
      <div className="tk-stage" ref={stageRef}>
    <div className="site">
      <Hero
        active={active}
        onNav={(label) => { setActive(label); fire(`Nav → ${label}`); }}
        onCta={() => fire("Explore the work")}
        onPrimary={() => fire("Explore the work")}
        onSecondary={() => fire("View the reel")}
      />

      <CosmicPanel>
        <PressStrip />
        <Director onReadMore={() => fire("Open full story")} />
      </CosmicPanel>

      <FeatureVideo
        onPlay={() => fire("Play feature reel")}
        onCase={() => fire("View full case study")}
        onAll={() => fire("Explore all films")}
      />

      <Archive onOpen={(it) => fire(`Open: ${it.tag}`)} />

      <Footer />

      <ToastShelf events={events} onDismiss={dismiss} />
    </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

