// ============================================================
//  LitPageApp — the literary wing. Header → hero (the study) →
//  Book of Ignorance → Poetry → Essays → TedThoughts →
//  Worldbuilding → Films → Footer. Fullscreen poetry reader
//  lives above the scaled stage. 1920 stage, scaled.
// ============================================================
const { useState: useApState, useCallback: useApCb, useRef: useApRef, useEffect: useApEffect } = React;
const AR = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

const LP_TWEAKS = /*EDITMODE-BEGIN*/{
  "mood": "Lantern Gold",
  "haze": 1,
  "grain": 0.06,
  "motion": true
}/*EDITMODE-END*/;

const MOOD_PRESETS = {
  "Lantern Gold": { g1: "#F7DBA0", g2: "#E8B777", g3: "#C9915C", g4: "#A26A30",
    peach: "linear-gradient(132deg, #FFE6C6 0%, #F8CB92 32%, #E9A968 64%, #C9803F 100%)" },
  "Peach Dawn":   { g1: "#FFE3CB", g2: "#F4C094", g3: "#E29B6C", g4: "#BE7244",
    peach: "linear-gradient(132deg, #FFE9D6 0%, #F8D0A4 32%, #ECB07C 64%, #D08A54 100%)" },
  "Brass Dusk":   { g1: "#E9D2A0", g2: "#C9A865", g3: "#9E7E45", g4: "#6E552C",
    peach: "linear-gradient(132deg, #ECD6A4 0%, #C9A463 32%, #A07C42 64%, #74542A 100%)" },
};

function ToastShelf({ events, onDismiss }) {
  if (!events.length) return null;
  return (
    <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 100000, display: "flex", flexDirection: "column", gap: 8 }}>
      {events.map((e) => (
        <div key={e.id} onClick={() => onDismiss(e.id)} style={{ background: "linear-gradient(180deg, #FFF2C6 0%, #BD8332 100%)", color: "#000", padding: "12px 18px", borderRadius: 4, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", boxShadow: "0 12px 36px rgba(0,0,0,0.4)", cursor: "pointer", maxWidth: 360 }}>{e.text}</div>
      ))}
    </div>
  );
}

function useLpStageScale(designWidth = 1920) {
  const wrapRef = useApRef(null);
  const stageRef = useApRef(null);
  useApEffect(() => {
    const MOBILE_BP = 768;
    const apply = () => {
      const stage = stageRef.current, wrap = wrapRef.current;
      if (!stage || !wrap) return;
      const vw = window.innerWidth;
      if (vw < MOBILE_BP) { stage.classList.add("is-mobile"); stage.style.transform = "none"; stage.style.width = "100%"; wrap.style.height = "auto"; }
      else { stage.classList.remove("is-mobile"); const scale = vw / designWidth; stage.style.width = designWidth + "px"; stage.style.transform = `scale(${scale})`; wrap.style.height = (stage.scrollHeight * scale) + "px"; }
    };
    apply();
    window.addEventListener("resize", apply);
    const ro = new ResizeObserver(apply);
    if (stageRef.current) ro.observe(stageRef.current);
    const t = setTimeout(apply, 400), t2 = setTimeout(apply, 1500), t3 = setTimeout(apply, 3000);
    return () => { window.removeEventListener("resize", apply); ro.disconnect(); clearTimeout(t); clearTimeout(t2); clearTimeout(t3); };
  }, [designWidth]);
  return { wrapRef, stageRef };
}

function LitPageApp() {
  const D = window.LIT_DATA;
  const [events, setEvents] = useApState([]);
  const [poem, setPoem] = useApState(null);   // open poem index, or null
  const [t, setTweak] = useTweaks(LP_TWEAKS);
  const { wrapRef, stageRef } = useLpStageScale(1920);
  const rootRef = useApRef(null);

  const fire = useApCb((text) => {
    const id = Date.now() + Math.random();
    setEvents((c) => [...c, { id, text }]);
    setTimeout(() => setEvents((c) => c.filter((x) => x.id !== id)), 2600);
  }, []);
  const dismiss = (id) => setEvents((c) => c.filter((x) => x.id !== id));

  // apply tweaks to the root
  useApEffect(() => {
    const el = rootRef.current; if (!el) return;
    const m = MOOD_PRESETS[t.mood] || MOOD_PRESETS["Lantern Gold"];
    el.style.setProperty("--lp-gold-1", m.g1);
    el.style.setProperty("--lp-gold-2", m.g2);
    el.style.setProperty("--lp-gold-3", m.g3);
    el.style.setProperty("--lp-gold-4", m.g4);
    el.style.setProperty("--lp-peach", m.peach);
    el.style.setProperty("--lp-haze", String(t.haze));
    el.style.setProperty("--lp-grain-op", String(t.grain));
    el.classList.toggle("lp-still", !t.motion);
  }, [t.mood, t.haze, t.grain, t.motion]);

  const scrollToId = useApCb((id) => {
    const el = document.getElementById(id); if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 10;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  // Parallax — offset any [data-par] layer by its distance from viewport
  // centre × speed, giving the lit sections layered depth on scroll.
  useApEffect(() => {
    const root = rootRef.current; if (!root) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const run = () => {
      raf = 0;
      if (!t.motion || reduce) { root.querySelectorAll("[data-par]").forEach((n) => { n.style.transform = ""; }); return; }
      const vpC = (window.innerHeight || 800) / 2;
      root.querySelectorAll("[data-par]").forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.bottom < -400 || r.top > (window.innerHeight || 800) + 400) return;
        const elC = r.top + r.height / 2;
        const speed = parseFloat(n.getAttribute("data-par")) || 0;
        const ty = (vpC - elC) * speed;
        n.style.transform = "translate3d(0," + ty.toFixed(1) + "px,0)";
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t1 = setTimeout(run, 400), t2 = setTimeout(run, 1500);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); };
  }, [t.motion]);

  // 3D gallery hero — tilts in on scroll (mirrors the Portfolio hero). Pin math
  // runs in JS so it stays correct inside the scaled (transform:scale) stage.
  const heroRef = useApRef(null);
  const stickyRef = useApRef(null);
  const galleryRef = useApRef(null);
  useApEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = heroRef.current, sticky = stickyRef.current, gal = galleryRef.current;
    if (!track || !sticky || !gal) return;
    const cols = Array.prototype.slice.call(gal.querySelectorAll(".lph-col"));
    let raf = 0;
    const run = () => {
      raf = 0;
      const mobile = window.innerWidth < 768;
      if (mobile) { sticky.style.transform = ""; gal.style.transform = "none"; cols.forEach((c) => { c.style.transform = ""; }); return; }
      const s = window.innerWidth / 1920;
      const vh = window.innerHeight;
      const r = track.getBoundingClientRect();
      const pinReal = Math.max(1, r.height - vh);
      const scrolled = Math.min(pinReal, Math.max(0, -r.top));
      sticky.style.transform = "translateY(" + (scrolled / s).toFixed(1) + "px)";
      const p = scrolled / pinReal;
      if (reduce) { gal.style.transform = "rotateX(0deg) scale(1)"; return; }
      const rot = 75 * (1 - Math.min(1, p / 0.5));
      const scl = 1.2 - 0.2 * Math.min(1, Math.max(0, (p - 0.5) / 0.4));
      gal.style.transform = "rotateX(" + rot.toFixed(2) + "deg) scale(" + scl.toFixed(3) + ")";
      const pp = Math.min(1, Math.max(0, (p - 0.5) / 0.5));
      cols.forEach((c, i) => { const range = i === 1 ? 80 : -52; c.style.transform = "translateY(" + (range * pp).toFixed(1) + "px)"; });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const ht1 = setTimeout(run, 400), ht2 = setTimeout(run, 1500);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); clearTimeout(ht1); clearTimeout(ht2); };
  }, []);

  const litTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => AR("litTile" + n, "assets/lit-hero/tile" + n + ".png"));
  const heroCols = [
    [litTiles[0], litTiles[3], litTiles[6], litTiles[9], litTiles[2], litTiles[5]],
    [litTiles[1], litTiles[4], litTiles[7], litTiles[0], litTiles[8], litTiles[3]],
    [litTiles[2], litTiles[5], litTiles[8], litTiles[1], litTiles[6], litTiles[9]],
  ];

  return (
    <React.Fragment>
      <div className="tk-scaler" ref={wrapRef}>
        <div className="tk-stage" ref={stageRef}>
          <div className="site lp-root" ref={rootRef}>

            {/* HERO — 3D gallery that tilts in on scroll (mirrors Portfolio) */}
            <section className="lph-scroll" data-screen-label="Literature & Philosophy Hero" ref={heroRef}>
              <div className="lph-sticky lp-grain" ref={stickyRef}>
                <div className="lph-gallery" aria-hidden="true" ref={galleryRef}>
                  {heroCols.map((col, ci) => (
                    <div className={"lph-col" + (ci === 1 ? " lph-col--mid" : "")} key={ci}>
                      {col.map((src, ti) => (
                        <div className="lph-tile" key={ti}><img src={src} alt="" /></div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="lph-veil" />
                <div className="lph-wash" />
                <div className="lph-band" aria-hidden="true" />
                <div className="lph-glow lph-glow--bl" aria-hidden="true" />
                <div className="lph-glow lph-glow--tr" aria-hidden="true" />
                <Header active="Portfolio" onNav={(label) => fire(`Nav → ${label}`)} onCta={() => scrollToId("book-of-ignorance")} />
                <div className="lph-copy">
                  <div className="lph-kicker">A Cinematic Archive</div>
                  <h2 className="lph-title lp-title-fill">Literature &amp; Philosophy</h2>
                  <div className="lph-rule" />
                  <p className="lph-motto">Thoughts that refused to stay quiet.</p>
                  <p className="lph-sub">Philosophy, poetry, essays, observations, or fragments of meaning written down before they disappear.<br /><br />Ted&rsquo;s literary work explores human behavior, spirituality, creativity, suffering, polarity, technology, healing, mythology, consciousness, and the strange beauty of uncertainty.<br /><br />At the center sits <em>The Book of Ignorance</em>, an evolving framework built on the idea that truth cannot be possessed, only experienced.</p>
                </div>
                <div className="lph-scrollcue"><span>Scroll</span><span className="bar" /></div>
              </div>
            </section>

            <div className="lp-body-bg">
              <BookOfIgnorance virtues={D.VIRTUES} bg={AR("bookOfIgnorance", "assets/book-of-ignorance.jpg")} onCta={() => fire("The Book of Ignorance — joined the waitlist")} />
              <PoetryRow poems={D.POEMS} onOpen={(i) => setPoem(i)} />
              <EssaysSection essays={D.ESSAYS} onOpen={(title) => fire(`Open: ${title}`)} />
              <TedThoughts thoughts={D.THOUGHTS} onCta={() => fire("Following TedThoughts")} />
              <Worldbuilding worlds={D.WORLDS} bg={AR("worldBg", "assets/worldbuilding-bg.jpg")} onOpen={(title) => fire(`Enter world: ${title}`)} />

              <section className="lp-excerpt" data-screen-label="Closing Quote"
                style={{ background: "url(" + AR("excerptBg", "assets/excerpt-bg.png") + ") right center / cover no-repeat" }}>
                <span className="lp-excerpt__label">Featured Excerpt</span>
                <span className="lp-excerpt__mark" aria-hidden="true">&ldquo;</span>
                <blockquote className="lp-excerpt__q">
                  &ldquo;No matter what I say, it can&rsquo;t possibly be true. So I have permission to say everything.&rdquo;
                </blockquote>
                <span className="lp-excerpt__tick" aria-hidden="true"></span>
                <cite className="lp-excerpt__by">Ted Saunders</cite>
              </section>
            </div>

            <Footer onSubscribe={(d) => fire(`Newsletter: ${(d && d.email) || ""}`)} />
          </div>
        </div>
      </div>

      {/* Fullscreen reader — above the scaled stage */}
      <PoetryReader poems={D.POEMS} index={poem} onClose={() => setPoem(null)} onIndex={(i) => setPoem(i)} />

      <ToastShelf events={events} onDismiss={dismiss} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Atmosphere" />
        <TweakRadio label="Mood" value={t.mood} options={["Lantern Gold", "Peach Dawn", "Brass Dusk"]} onChange={(v) => setTweak("mood", v)} />
        <TweakSlider label="Haze" value={t.haze} min={0} max={1.8} step={0.1} onChange={(v) => setTweak("haze", v)} />
        <TweakSlider label="Film grain" value={t.grain} min={0} max={0.14} step={0.01} onChange={(v) => setTweak("grain", v)} />
        <TweakSection label="Motion" />
        <TweakToggle label="Animated drift" value={t.motion} onChange={(v) => setTweak("motion", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LitPageApp />);
