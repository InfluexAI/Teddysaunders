// WorkShared.jsx — helpers shared across the Work With Ted sections:
//   useReveal()      — IntersectionObserver scroll-reveal
//   ArchetypeGlyph   — engraved brass line-glyphs for the 4 coaching archetypes
//   TestimonialSlider — auto-advancing quote slider (personal / brand clients)
const { useRef: useWkRef, useEffect: useWkEffect, useState: useWkState } = React;

// Attach .is-in to any .wk-reveal element as it scrolls into view — with
// reflow-gated animation (so the transition has a clean start) and tiered
// hard-show failsafes so content is NEVER stuck hidden if the environment
// hangs CSS transitions / IntersectionObserver.
function useReveal() {
  useWkEffect(() => {
    const q = () => Array.prototype.slice.call(document.querySelectorAll(".wk-reveal"));
    const animate = (el) => {
      if (el.dataset.shown) return;
      el.dataset.shown = "1";
      void el.offsetHeight;            // reflow → transition starts cleanly
      el.classList.add("is-in");
    };
    const hardShow = (el) => {         // bypass the transition entirely
      el.dataset.shown = "1";
      el.classList.add("is-in");
      el.style.opacity = "1";
      el.style.transform = "none";
    };
    const inView = (el, slack) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * (slack || 1) && r.bottom > 0;
    };

    const tick = () => q().forEach((el) => { if (!el.dataset.shown && inView(el, 0.9)) animate(el); });

    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.14 });
      q().forEach((el) => io.observe(el));
    }
    const onScroll = () => tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    tick();

    // failsafe 1: anything in view but still hidden after 1s → hard show
    const t1 = setTimeout(() => q().forEach((el) => { if (!el.classList.contains("is-in") && inView(el)) hardShow(el); }), 1000);
    // failsafe 2 (ultimate): never leave anything permanently invisible
    const t2 = setTimeout(() => q().forEach((el) => { if (!el.classList.contains("is-in")) hardShow(el); }), 3000);

    return () => {
      if (io) io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t1); clearTimeout(t2);
    };
  }, []);
}

// Archetype glyphs — thin-stroke engravings; currentColor drives the brass tint.
function ArchetypeGlyph({ name, size = 40 }) {
  const c = { width: size, height: size, viewBox: "0 0 48 48", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  const g = {
    // The King — crown
    king: (
      <g>
        <path d="M10 32 L8 16 L17 24 L24 12 L31 24 L40 16 L38 32 Z" />
        <path d="M10 32 H38" />
        <circle cx="8" cy="16" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="24" cy="12" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="40" cy="16" r="1.4" fill="currentColor" stroke="none" />
      </g>
    ),
    // The Lover — twin hearts / union
    lover: (
      <g>
        <path d="M24 36 C14 28 12 20 17 16 C20.5 13 24 16 24 19 C24 16 27.5 13 31 16 C36 20 34 28 24 36 Z" />
        <path d="M24 19 V36" opacity="0.5" />
      </g>
    ),
    // The Magician — star within circle (alchemy)
    magician: (
      <g>
        <circle cx="24" cy="24" r="14" />
        <path d="M24 12 L27.5 21 L37 21 L29.5 27 L32.5 36 L24 30.5 L15.5 36 L18.5 27 L11 21 L20.5 21 Z" />
      </g>
    ),
    // The Warrior — shield + sword
    warrior: (
      <g>
        <path d="M24 8 L37 13 V25 C37 33 31 39 24 41 C17 39 11 33 11 25 V13 Z" />
        <path d="M24 17 V33 M19 22 H29" />
      </g>
    ),
  };
  return <svg {...c}>{g[name] || null}</svg>;
}

// Auto-advancing testimonial slider with arrows + dots.
function TestimonialSlider({ title, items }) {
  const [i, setI] = useWkState(0);
  const N = items.length;
  const timer = useWkRef(null);
  const reset = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setI((c) => (c + 1) % N), 6000);
  };
  useWkEffect(() => { reset(); return () => timer.current && clearInterval(timer.current); }, []);
  const go = (n) => { setI((n + N) % N); reset(); };

  return (
    <div className="wk-slider">
      {title && <p className="wk-slider__title">{title}</p>}
      <div className="wk-slider__track">
        {items.map((t, idx) => (
          <figure className={"wk-slide" + (idx === i ? " is-on" : "")} key={idx}>
            <div className="wk-slide__mark" aria-hidden="true"></div>
            <blockquote className="wk-slide__body">{t.body}</blockquote>
            <figcaption className="wk-slide__by">{t.by}</figcaption>
          </figure>
        ))}
      </div>
      <div className="wk-slider__nav">
        <button className="wk-slider__arrow" aria-label="Previous" onClick={() => go(i - 1)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <div className="wk-slider__dots">
          {items.map((_, idx) => (
            <i key={idx} className={idx === i ? "on" : ""} onClick={() => go(idx)} role="button" aria-label={"Testimonial " + (idx + 1)} />
          ))}
        </div>
        <button className="wk-slider__arrow" aria-label="Next" onClick={() => go(i + 1)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { useReveal, ArchetypeGlyph, TestimonialSlider });
