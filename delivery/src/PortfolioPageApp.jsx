// PortfolioPageApp — cinematic publication. Header → archive hero (Ted in
// his study) → four numbered editorial rooms → footer. 1920 stage, scaled.
const { useState: usePpState, useCallback: usePpCb, useRef: usePpRef, useEffect: usePpEffect } = React;
const R = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

function ToastShelfPP({ events, onDismiss }) {
  if (!events.length) return null;
  return (
    <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {events.map((e) => (
        <div key={e.id} onClick={() => onDismiss(e.id)} style={{ background: "linear-gradient(180deg, #FFF2C6 0%, #BD8332 100%)", color: "#000", padding: "12px 18px", borderRadius: 4, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", boxShadow: "0 12px 36px rgba(0,0,0,0.4)", cursor: "pointer", maxWidth: 360 }}>{e.text}</div>
      ))}
    </div>
  );
}

function usePpStageScale(designWidth = 1920) {
  const wrapRef = usePpRef(null);
  const stageRef = usePpRef(null);
  usePpEffect(() => {
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
    const t = setTimeout(apply, 400), t2 = setTimeout(apply, 1500);
    return () => { window.removeEventListener("resize", apply); ro.disconnect(); clearTimeout(t); clearTimeout(t2); };
  }, [designWidth]);
  return { wrapRef, stageRef };
}

function PortfolioPageApp() {
  const [events, setEvents] = usePpState([]);
  const { wrapRef, stageRef } = usePpStageScale(1920);
  const heroRef = usePpRef(null);
  const stickyRef = usePpRef(null);
  const galleryRef = usePpRef(null);

  // Scroll-reveal 3D gallery (ContainerScroll pattern). A tall track drives a
  // JS-pinned sticky stage: the gallery starts steeply tilted (rotateX 75°,
  // scaled up) and eases upright + down to scale 1 across the first half of the
  // scroll; columns parallax over the second half. Pin/transform math runs in
  // JS so it stays correct inside the scaled (transform:scale) stage.
  usePpEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = heroRef.current, sticky = stickyRef.current, gal = galleryRef.current;
    if (!track || !sticky || !gal) return;
    const cols = Array.prototype.slice.call(gal.querySelectorAll(".pp-gallery__col"));
    let raf = 0;
    const run = () => {
      raf = 0;
      const mobile = window.innerWidth < 768;
      if (mobile) {
        sticky.style.transform = "";
        gal.style.transform = "none";
        cols.forEach((c) => { c.style.transform = ""; });
        return;
      }
      const s = window.innerWidth / 1920;
      const vh = window.innerHeight;
      const r = track.getBoundingClientRect();
      const pinReal = Math.max(1, r.height - vh);
      const scrolled = Math.min(pinReal, Math.max(0, -r.top));
      // pin the sticky stage to the viewport top while inside the track
      sticky.style.transform = "translateY(" + (scrolled / s).toFixed(1) + "px)";
      const p = scrolled / pinReal;
      if (reduce) { gal.style.transform = "rotateX(0deg) scale(1)"; return; }
      const rot = 75 * (1 - Math.min(1, p / 0.5));
      const scl = 1.2 - 0.2 * Math.min(1, Math.max(0, (p - 0.5) / 0.4));
      gal.style.transform = "rotateX(" + rot.toFixed(2) + "deg) scale(" + scl.toFixed(3) + ")";
      const pp = Math.min(1, Math.max(0, (p - 0.5) / 0.5));
      cols.forEach((c, i) => {
        const range = i === 1 ? 80 : -52; // mid column rises, sides drop
        c.style.transform = "translateY(" + (range * pp).toFixed(1) + "px)";
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t = setTimeout(run, 400), t2 = setTimeout(run, 1500);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); clearTimeout(t); clearTimeout(t2); };
  }, []);

  const fire = usePpCb((text) => {
    const id = Date.now() + Math.random();
    setEvents((c) => [...c, { id, text }]);
    setTimeout(() => setEvents((c) => c.filter((x) => x.id !== id)), 2600);
  }, []);
  const dismiss = (id) => setEvents((c) => c.filter((x) => x.id !== id));

  const filmData = {
    reel: R("heroFilm", "assets/heroes/cinematographer.jpg"),
    posters: [
      { src: R("posterPlaces", "assets/portfolio/poster-places.png"), title: "Oh, The Places You’ll Go", year: "2014", cat: "Documentary", desc: "A psychedelic odyssey through the dust and devotion of the playa." },
      { src: R("posterSynthesis", "assets/portfolio/poster-synthesis.png"), title: "The Great Synthesis", year: "2023", cat: "Experimental", desc: "There is no light without shadow — a meditation on duality." },
      { src: R("posterEudaimonia", "assets/portfolio/poster-eudaimonia.png"), title: "The Crossroads to Eudaimonia", year: "2021", cat: "Short Film", desc: "A seeker chooses between comfort and meaning at the edge of a new world." },
      { src: R("posterBubbles", "assets/portfolio/poster-bubbles.png"), title: "Lovers of the Playa", year: "2020", cat: "Documentary", desc: "Two souls, one horizon, and the ephemeral magic of Black Rock City." },
    ],
  };
  const galleryData = { env: R("heroPhoto", "assets/heroes/photographer.jpg"), featured: R("ipFated", "assets/ip/fated.jpg"), second: R("film2", "assets/film/photo-2.jpg") };
  const galleryPhotos = [
    { src: R("tedCinematic", "assets/ted-cinematic.jpg"), label: "Cinematic Portrait" },
    { src: R("film4", "assets/film/photo-4.jpg"), label: "Surreal Experiment" }, { src: R("film8", "assets/film/photo-8.jpg"), label: "Light Painting" },
    { src: R("film5", "assets/film/photo-5.jpg"), label: "Commercial Composite" }, { src: R("film6", "assets/film/photo-6.jpg"), label: "The Wedding" },
    { src: R("film7", "assets/film/photo-7.jpg"), label: "Headshot" }, { src: R("film3", "assets/film/photo-3.jpg"), label: "Long Exposure" },
  ];
  const musicData = { reel: R("heroMusic", "assets/heroes/musician.jpg") };
  const musicClips = [
    { src: R("film1", "assets/film/photo-1.jpg"), label: "Music Video", placeholder: "Drop a music video" },
    { src: R("film8", "assets/film/photo-8.jpg"), label: "Live Set", placeholder: "Drop performance footage" },
    { src: R("film3", "assets/film/photo-3.jpg"), label: "Studio Session", placeholder: "Drop a studio session" },
    { src: R("film2", "assets/film/photo-2.jpg"), label: "Behind the Scenes", placeholder: "Drop a BTS montage" },
    { src: R("film6", "assets/film/photo-6.jpg"), label: "Soundscape", placeholder: "Drop a soundscape visual" },
    { src: R("film7", "assets/film/photo-7.jpg"), label: "Archive", placeholder: "Drop an archive clip" },
  ];
  const journalData = { spread: R("heroPhil", "assets/heroes/philosopher.jpg") };
  const heroCols = [
    [R("posterPlaces"), R("film1"), R("ipFated"), R("film4"), R("posterBubbles"), R("film7")],
    [R("ipInevitable"), R("film2"), R("posterSynthesis"), R("film6"), R("ipProsopagnosia"), R("tedCinematic")],
    [R("posterEudaimonia"), R("film3"), R("ipJuiced"), R("film5"), R("burningMan"), R("film8")],
  ];
  const excerpts = [
    { cat: "The Nature of Ignorance", quote: "The greatest frontier is not out there, it is within." },
    { cat: "Creativity & Consciousness", quote: "Creation is a conversation between the seen and unseen." },
    { cat: "The Human Experience", quote: "We are stories becoming aware of themselves." },
  ];
  return (
    <React.Fragment>
      <div className="tk-scaler" ref={wrapRef}>
        <div className="tk-stage" ref={stageRef}>
          <div className="site">
            <section className="pp-scroll" ref={heroRef}>
              <div className="pp-sticky pp-grain" ref={stickyRef}>
                <div className="pp-gallery" aria-hidden="true" ref={galleryRef}>
                  {heroCols.map((col, ci) => (
                    <div className={"pp-gallery__col" + (ci === 1 ? " pp-gallery__col--mid" : "")} key={ci}>
                      {col.map((src, ii) => (
                        <div className="pp-gallery__tile" key={ii}><img src={src} alt="" /></div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="pp-hero__veil" />
                <div className="pp-hero__wash" />
                <Header active="Portfolio" onNav={(label) => fire(`Nav → ${label}`)} onCta={() => fire("Explore the work")} />
                <div className="pp-hero__copy">
                  <div className="pp-hero__kicker">A Cinematic Archive</div>
                  <h1 className="pp-hero__title">Portfolio</h1>
                  <div className="pp-hero__rule" />
                  <p className="pp-hero__motto">Four disciplines. One obsession.</p>
                  <p className="pp-hero__sub">A lifetime of creative work, curated as a living cinematic archive.</p>
                </div>
                <div className="pp-hero__scrollcue"><span>Scroll</span><span className="bar" /></div>
              </div>
            </section>

            <div className="pp-sections">
              <FilmSection data={filmData} onCta={() => fire("Explore the Films")} onPlay={() => fire("Play the Reel")} onPoster={(t) => fire(`Open ${t}`)} />
              <PhotoSection data={galleryData} photos={galleryPhotos} onCta={() => fire("Explore the Photography")} />
              <MusicSection data={musicData} clips={musicClips} onCta={() => fire("Explore the Music")} onPlay={(l) => fire(typeof l === "string" ? `Play ${l}` : "Play the Set")} />
              <JournalSection data={journalData} excerpts={excerpts} onCta={() => fire("Explore the Philosophy")} />
            </div>

            <Footer onSubscribe={(d) => fire(`Newsletter: ${(d && d.email) || ""}`)} />
          </div>
        </div>
      </div>
      <ToastShelfPP events={events} onDismiss={dismiss} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PortfolioPageApp />);
