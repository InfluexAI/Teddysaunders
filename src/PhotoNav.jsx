// ============================================================
//  PhotoNav — the fixed category spine. Rendered OUTSIDE the
//  scaled stage so it stays crisp. Appears once the hero scrolls
//  away, scroll-spies the active section, and jumps on click.
//  Empty categories show a dimmed "Soon" pill.
// ============================================================
const { useState: useNavState, useEffect: useNavEffect, useRef: useNavRef } = React;
const NAVR = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

function PhotoNav({ cats, counts }) {
  const [shown, setShown] = useNavState(false);
  const [active, setActive] = useNavState(null);
  const scrollRef = useNavRef(null);

  useNavEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      const hero = document.querySelector(".lph-scroll");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 600;
      setShown(heroBottom < 90);
      // active section = the one whose top is closest above the nav line
      let cur = null, best = -Infinity;
      cats.forEach((c) => {
        if (c.navOnly) return;
        const el = document.getElementById("pgsec-" + c.key);
        if (!el) return;
        const top = el.getBoundingClientRect().top - 120;
        if (top <= 0 && top > best) { best = top; cur = c.key; }
      });
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t = setTimeout(run, 500);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); clearTimeout(t); };
  }, [cats]);

  // keep the active chip in view inside the scroller
  useNavEffect(() => {
    const sc = scrollRef.current; if (!sc || !active) return;
    const chip = sc.querySelector('[data-key="' + active + '"]');
    if (chip) {
      const cl = chip.offsetLeft, cr = cl + chip.offsetWidth;
      if (cl < sc.scrollLeft || cr > sc.scrollLeft + sc.clientWidth) {
        sc.scrollTo({ left: cl - 40, behavior: "smooth" });
      }
    }
  }, [active]);

  const jump = (c) => {
    if (c.navOnly) return;
    const el = document.getElementById("pgsec-" + c.key);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav className={"pgnav" + (shown ? " is-shown" : "")} aria-label="Photography categories">
      <div className="pgnav__scroll" ref={scrollRef}>
        {cats.map((c) => (
          <button key={c.key} type="button" data-key={c.key}
            className={"pgnav__link" + (active === c.key ? " is-active" : "") + (c.navOnly ? " is-soon" : "")}
            aria-current={active === c.key ? "true" : undefined}
            onClick={() => jump(c)}>
            {c.title}
            {c.navOnly ? <span className="soon">Soon</span> : null}
          </button>
        ))}
      </div>
    </nav>
  );
}

window.PhotoNav = PhotoNav;
