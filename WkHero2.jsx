// WkHero2.jsx — cinematic "Work With Ted" hero: full-bleed parallax image,
// role eyebrow, textured wordmark, promise + lede, count-up stat row, scroll
// cue, and the sticky 3-tab chooser (scroll-spy) pinned at the hero base.
const { useState: useH2State, useRef: useH2Ref, useEffect: useH2Effect } = React;

const WK2_TABS = [
  { title: "Compass Coaching", to: "wk-coaching" },
  { title: "Brand Marketing", to: "wk-brand" },
  { title: "For Investors", to: "wk-investors" },
];

const WK2_STATS = [
  { to: 20, suffix: "+", lbl: "Years Directing" },
  { to: 100, suffix: "+", lbl: "Clients Served" },
  { to: 10, suffix: "M+", lbl: "Collective Views" },
  { to: 3, suffix: "", lbl: "Client Acquisitions" },
];

// count-up that fires once when the stat row scrolls into view
function Wk2Stat({ to, suffix, lbl }) {
  const [n, setN] = useH2State(0);
  const ref = useH2Ref(null);
  const done = useH2Ref(false);
  useH2Effect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => {
      if (done.current) return;
      done.current = true;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) { setN(to); return; }
      const dur = 1300, t0 = performance.now();
      const ease = (x) => 1 - Math.pow(1 - x, 3);
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        setN(Math.round(ease(k) * to));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      // guarantee the final value even if rAF is throttled (background tab)
      setTimeout(() => setN(to), dur + 400);
    };
    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } }), { threshold: 0.4 });
      io.observe(el);
    } else { run(); }
    const fail = setTimeout(run, 2500);
    return () => { if (io) io.disconnect(); clearTimeout(fail); };
  }, []);
  return (
    <div className="wk2-stat" ref={ref}>
      <span className="wk2-stat__num">{n}{suffix}</span>
      <span className="wk2-stat__lbl">{lbl}</span>
    </div>
  );
}

function WkHero2({ onJump }) {
  const barRef = useH2Ref(null);
  const bgRef = useH2Ref(null);
  const [stuck, setStuck] = useH2State(false);
  const [barH, setBarH] = useH2State(0);
  const [current, setCurrent] = useH2State(-1);

  useH2Effect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const hero = bar.closest(".wk2-hero");
    const bg = bgRef.current;

    const onScroll = () => {
      const bh = bar.offsetHeight;
      setBarH(bh);
      const rect = hero.getBoundingClientRect();
      const isStuck = rect.bottom <= bh + 1;
      setStuck(isStuck);
      // gentle parallax on the hero image while it's in view
      if (bg && rect.bottom > 0) bg.style.transform = "translateY(" + (-rect.top * 0.18) + "px)";
      if (!isStuck) { setCurrent(-1); return; }
      const line = bh + window.innerHeight * 0.3;
      let act = 0;
      WK2_TABS.forEach((t, i) => {
        const el = document.getElementById(t.to);
        if (el && el.getBoundingClientRect().top <= line) act = i;
      });
      setCurrent(act);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
    let ro = null;
    if ("ResizeObserver" in window) { ro = new ResizeObserver(onScroll); ro.observe(hero); }
    requestAnimationFrame(onScroll);
    const ticks = [80, 250, 600, 1200].map((ms) => setTimeout(onScroll, ms));
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
      if (ro) ro.disconnect();
      ticks.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="wk2-hero">
      <div className="wk2-hero__bg" ref={bgRef} aria-hidden="true">
        <img src="assets/teddy-hero.jpg" alt="" />
      </div>
      <div className="wk2-hero__aura" aria-hidden="true"></div>
      <div className="wk2-hero__scrim" aria-hidden="true"></div>
      <div className="wk-dust" aria-hidden="true"></div>
      <div className="wk2-grain" aria-hidden="true"></div>

      <span className="wk2-ret tl" aria-hidden="true"></span>
      <span className="wk2-ret tr" aria-hidden="true"></span>
      <span className="wk2-ret bl" aria-hidden="true"></span>
      <span className="wk2-ret br" aria-hidden="true"></span>

      <div className="wk2-hero__inner">
        <p className="wk2-eyebrow">Mentor<span className="sep">·</span>Director<span className="sep">·</span>Founder</p>
        <h1 className="wk2-wordmark wk2-textured">Work With Ted</h1>
        <p className="wk2-promise">Three doors. One fire.</p>
        <p className="wk2-lede">
          Whether you&rsquo;re building yourself, your brand, or backing the future &mdash;
          this is where the next chapter of your story gets made.
        </p>
        <div className="wk2-stats">
          {WK2_STATS.map((s) => <Wk2Stat key={s.lbl} {...s} />)}
        </div>
      </div>

      <button className="wk2-cue" onClick={() => onJump && onJump("wk2-paths")} aria-label="Choose your path">
        <span>Choose your path</span>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
      </button>

      {/* spacer keeps hero height constant once the bar goes fixed */}
      <div style={{ height: stuck ? barH : 0 }} aria-hidden="true"></div>

      <div className={"wk-tabbar" + (stuck ? " is-stuck" : "")} ref={barRef}>
        {WK2_TABS.map((t, i) => (
          <button className={"wk-tab" + (i === current ? " is-current" : "")} key={t.to} onClick={() => onJump && onJump(t.to)}>
            <span className="wk-tab__title">{t.title}</span>
            <span className="wk-tab__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

window.WkHero2 = WkHero2;
