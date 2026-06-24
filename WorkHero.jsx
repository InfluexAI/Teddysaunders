// WorkHero.jsx — "WORK WITH TED" full-bleed cinematic hero with a full-width
// tab bar (Compass Coaching · Brand Marketing · For Investors). The bar sits at
// the base of the hero, then sticks to the top once scrolled past — and the
// active tab tracks whichever section is currently in view (scroll-spy).
const { useState: useHeroState, useRef: useHeroRef, useEffect: useHeroEffect } = React;

const WK_TABS = [
  { title: "Compass Coaching", to: "wk-coaching" },
  { title: "Brand Marketing", to: "wk-brand" },
  { title: "For Investors", to: "wk-investors" },
];

function WorkHero({ onJump }) {
  const barRef = useHeroRef(null);
  const [stuck, setStuck] = useHeroState(false);
  const [barH, setBarH] = useHeroState(0);
  const [current, setCurrent] = useHeroState(-1);

  useHeroEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const hero = bar.closest(".wk-hero");

    const onScroll = () => {
      const bh = bar.offsetHeight;
      setBarH(bh);
      // bar sticks once the hero's bottom has scrolled up to the bar height
      const isStuck = hero.getBoundingClientRect().bottom <= bh + 1;
      setStuck(isStuck);

      // scroll-spy only once the bar is pinned (past the hero)
      if (!isStuck) { setCurrent(-1); return; }
      const line = bh + window.innerHeight * 0.28;
      let act = 0;
      WK_TABS.forEach((t, i) => {
        const el = document.getElementById(t.to);
        if (el && el.getBoundingClientRect().top <= line) act = i;
      });
      setCurrent(act);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);

    // re-evaluate whenever layout actually settles (fonts/img load grow the hero
    // to full height) — the mount-time call alone runs before that happens.
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
    <section className="wk-hero">
      <div className="wk-hero__bg" aria-hidden="true">
        <image-slot id="wk-hero-bg" shape="rect" placeholder="Ted — cinematic hero portrait / on set"></image-slot>
      </div>
      <div className="wk-hero__scrim" aria-hidden="true"></div>
      <div className="wk-dust" aria-hidden="true"></div>

      <div className="wk-hero__inner">
        <h1 className="wk-hero__title wk-textured">Work With Ted</h1>
        <p className="wk-hero__sub">How people work with Ted.</p>
      </div>

      {/* spacer keeps the hero height constant once the bar goes fixed */}
      <div style={{ height: stuck ? barH : 0 }} aria-hidden="true"></div>

      <div className={"wk-tabbar" + (stuck ? " is-stuck" : "")} ref={barRef}>
        {WK_TABS.map((t, i) => (
          <button
            className={"wk-tab" + (i === current ? " is-current" : "")}
            key={t.to}
            onClick={() => onJump && onJump(t.to)}
          >
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

window.WorkHero = WorkHero;
