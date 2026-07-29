// ============================================================
//  FilmsPageApp — the cinema wing. Header → 3D gallery hero →
//  Watch the Reels → Festival rail → Commercial rail →
//  Experimental rail → TEDFLIX → The Library → Original IP →
//  Footer. Reel lightbox, Tedflix player and the popup video
//  module live above the scaled stage. 1920 stage, scaled.
// ============================================================
const { useState: useFpState, useCallback: useFpCb, useRef: useFpRef, useEffect: useFpEffect } = React;
const AFR = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

const FP_TWEAKS = /*EDITMODE-BEGIN*/{
  "grain": 0.06,
  "motion": true,
  "accent": "Bronze Sheen"
}/*EDITMODE-END*/;

const FP_ACCENTS = {
  "Bronze Sheen": "linear-gradient(132deg, #FFE6C6 0%, #F8CB92 32%, #E9A968 64%, #C9803F 100%)",
  "Harvest Gold": "linear-gradient(132deg, #FBE9B6 0%, #ECC163 34%, #D89733 66%, #A9711F 100%)",
  "Ember": "linear-gradient(132deg, #FFD0A0 0%, #F0964E 36%, #D95F10 70%, #9C3D08 100%)",
};

function ToastShelfFP({ events, onDismiss }) {
  if (!events.length) return null;
  return (
    <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 99999, display: "flex", flexDirection: "column", gap: 8 }}>
      {events.map((e) => (
        <div key={e.id} onClick={() => onDismiss(e.id)} style={{ background: "linear-gradient(180deg, #FFF2C6 0%, #BD8332 100%)", color: "#000", padding: "12px 18px", borderRadius: 4, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", boxShadow: "0 12px 36px rgba(0,0,0,0.4)", cursor: "pointer", maxWidth: 360 }}>{e.text}</div>
      ))}
    </div>
  );
}

function useFpStageScale(designWidth = 1920) {
  const wrapRef = useFpRef(null);
  const stageRef = useFpRef(null);
  useFpEffect(() => {
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

function FilmsPageApp() {
  const [events, setEvents] = useFpState([]);
  const [reel, setReel] = useFpState(null);        // reel/film lightbox item
  const [popup, setPopup] = useFpState(null);      // library popup film id
  const [tflix, setTflix] = useFpState(null);      // {shuffle, startId} or null
  const [filter, setFilter] = useFpState("All");
  const [t, setTweak] = useTweaks(FP_TWEAKS);
  const { wrapRef, stageRef } = useFpStageScale(1920);
  const rootRef = useFpRef(null);
  const libRef = useFpRef(null);

  const fire = useFpCb((text) => {
    const id = Date.now() + Math.random();
    setEvents((c) => [...c, { id, text }]);
    setTimeout(() => setEvents((c) => c.filter((x) => x.id !== id)), 2400);
  }, []);
  const dismiss = (id) => setEvents((c) => c.filter((x) => x.id !== id));

  // apply tweaks
  useFpEffect(() => {
    const el = rootRef.current; if (!el) return;
    el.style.setProperty("--lp-grain-op", String(t.grain));
    el.style.setProperty("--lp-peach", FP_ACCENTS[t.accent] || FP_ACCENTS["Bronze Sheen"]);
    el.classList.toggle("lp-still", !t.motion);
  }, [t.grain, t.motion, t.accent]);

  // open a film from the URL hash (#portfolio/film/<id>) on load
  useFpEffect(() => {
    const m = (location.hash || "").match(/film\/([\w-]+)/);
    if (m && window.FILM_BY_ID && window.FILM_BY_ID[m[1]]) setPopup(m[1]);
  }, []);

  const goLibrary = useFpCb((f) => {
    if (f) setFilter(f);
    const el = libRef.current; if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 10;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  // 3D gallery hero — tilts in on scroll (mirrors Literature / Portfolio)
  const heroRef = useFpRef(null);
  const stickyRef = useFpRef(null);
  const galleryRef = useFpRef(null);
  useFpEffect(() => {
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

  const D = window.FILM_LIBRARY;
  const BY = window.FILM_BY_ID;
  const rails = window.FILM_RAILS;
  const railFilms = (key) => rails[key].ids.map((id) => BY[id]).filter(Boolean);

  // hero frames — posters + frames + key art
  const heroCols = [
    [AFR("posterPlaces"), AFR("film1"), AFR("railFestival"), AFR("film4"), AFR("posterBubbles"), AFR("film7")],
    [AFR("posterSynthesis"), AFR("film2"), AFR("reelLive"), AFR("film6"), AFR("ipProsopagnosia"), AFR("posterEudaimonia")],
    [AFR("ipFated"), AFR("film3"), AFR("reelMotion"), AFR("film5"), AFR("burningMan"), AFR("film8")],
  ];

  return (
    <React.Fragment>
      <div className="tk-scaler" ref={wrapRef}>
        <div className="tk-stage" ref={stageRef}>
          <div className="site fp-root lp-root" ref={rootRef}>

            {/* HERO — 3D gallery tilts in on scroll */}
            <section className="lph-scroll" data-screen-label="Films Hero" ref={heroRef}>
              <div className="lph-sticky lp-grain" ref={stickyRef}>
                <div className="lph-gallery" aria-hidden="true" ref={galleryRef}>
                  {heroCols.map((col, ci) => (
                    <div className={"lph-col" + (ci === 1 ? " lph-col--mid" : "")} key={ci}>
                      {col.map((src, ti) => (<div className="lph-tile" key={ti}><img src={src} alt="" /></div>))}
                    </div>
                  ))}
                </div>
                <div className="lph-veil" />
                <div className="lph-wash" />
                <div className="lph-band" aria-hidden="true" />
                <div className="lph-glow lph-glow--bl" aria-hidden="true" />
                <div className="lph-glow lph-glow--tr" aria-hidden="true" />
                <Header active="Portfolio" onNav={(label) => fire(`Nav → ${label}`)} onCta={() => goLibrary("All")} />
                <div className="lph-copy">
                  <div className="lph-kicker">A Cinematic Archive</div>
                  <h2 className="lph-title lp-title-fill">Films</h2>
                  <div className="lph-rule" />
                  <p className="lph-motto">Stories that dare you to think differently.</p>
                  <p className="lph-sub">Film is the gravitational center of Ted Saunders' universe — from cinematic brand campaigns and Burning Man narratives to experimental shorts, music videos, philosophical essays, and original sci-fi worlds.<br /><br />Some projects are polished commercial productions. Others are deeply personal explorations of meaning, identity, imagination, and consciousness.</p>
                </div>
                <div className="lph-scrollcue"><span>Scroll</span><span className="bar" /></div>
              </div>
            </section>

            <div className="fp-body-bg">
              <ReelsSection reels={window.FILM_REELS} onPlay={(r) => setReel(r)} />

              <ProjectRail rail={rails.festival} films={railFilms("festival")} screenLabel="Festival & Narrative"
                onOpen={(id) => setPopup(id)} onCta={(f) => goLibrary(f)} />
              <ProjectRail rail={rails.commercial} films={railFilms("commercial")} screenLabel="Commercial Clients"
                onOpen={(id) => setPopup(id)} onCta={(f) => goLibrary(f)} />
              <ProjectRail rail={rails.experimental} films={railFilms("experimental")} screenLabel="Experimental & Music Video"
                onOpen={(id) => setPopup(id)} onCta={(f) => goLibrary(f)} />

              <TedflixSection films={D} onPlay={(shuffle, startId) => setTflix({ shuffle, startId })} />

              <FilmLibrary films={D} filters={window.FILM_FILTERS} active={filter}
                onFilter={(f) => setFilter(f)} onOpen={(id) => setPopup(id)} libRef={libRef} />

              <OriginalIP onExplore={() => fire("Explore the IP")} onContact={() => { window.location.href = "contact.html"; }} />
            </div>

            <Footer onSubscribe={(d) => fire(`Newsletter: ${(d && d.email) || ""}`)} />
          </div>
        </div>
      </div>

      {/* overlays — above the scaled stage */}
      {reel ? <FilmLightbox item={reel} onClose={() => setReel(null)} /> : null}
      <TedflixPlayer open={!!tflix} films={D} shuffle={tflix && tflix.shuffle} startId={tflix && tflix.startId} onClose={() => setTflix(null)} />
      {popup ? <FilmVideoModule film={BY[popup]} byId={BY} onClose={() => setPopup(null)} onOpen={(id) => setPopup(id)} /> : null}

      <ToastShelfFP events={events} onDismiss={dismiss} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Atmosphere" />
        <TweakRadio label="Accent" value={t.accent} options={["Bronze Sheen", "Harvest Gold", "Ember"]} onChange={(v) => setTweak("accent", v)} />
        <TweakSlider label="Film grain" value={t.grain} min={0} max={0.14} step={0.01} onChange={(v) => setTweak("grain", v)} />
        <TweakSection label="Motion" />
        <TweakToggle label="Animated drift" value={t.motion} onChange={(v) => setTweak("motion", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<FilmsPageApp />);
