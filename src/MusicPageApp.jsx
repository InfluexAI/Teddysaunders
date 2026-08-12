// ============================================================
//  MusicPageApp — the listening wing. Header → 3D gallery hero
//  with audio-reactive waveform → Sonic Overview → TedDrops &
//  Mastercodes DJ sets → Latest Releases → Childhood Archive →
//  Featured Highlights → Media Experience + Visualizer → CTA →
//  Footer. 1920 stage, scaled. Mirrors FilmsPageApp.
// ============================================================
const { useState: useMpState, useCallback: useMpCb, useRef: useMpRef, useEffect: useMpEffect } = React;
const AMR = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

const MP_TWEAKS = /*EDITMODE-BEGIN*/{
  "grain": 0.06,
  "motion": true,
  "accent": "Bronze Sheen"
}/*EDITMODE-END*/;

const MP_ACCENTS = {
  "Bronze Sheen": "linear-gradient(132deg, #FFE6C6 0%, #F8CB92 32%, #E9A968 64%, #C9803F 100%)",
  "Harvest Gold": "linear-gradient(132deg, #FBE9B6 0%, #ECC163 34%, #D89733 66%, #A9711F 100%)",
  "Ember": "linear-gradient(132deg, #FFD0A0 0%, #F0964E 36%, #D95F10 70%, #9C3D08 100%)",
};

function ToastShelfMP({ events, onDismiss }) {
  if (!events.length) return null;
  return (
    <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 99999, display: "flex", flexDirection: "column", gap: 8 }}>
      {events.map((e) => (
        <div key={e.id} onClick={() => onDismiss(e.id)} style={{ background: "linear-gradient(180deg, #FFF2C6 0%, #BD8332 100%)", color: "#000", padding: "12px 18px", borderRadius: 4, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", boxShadow: "0 12px 36px rgba(0,0,0,0.4)", cursor: "pointer", maxWidth: 360 }}>{e.text}</div>
      ))}
    </div>
  );
}

function useMpStageScale(designWidth = 1920) {
  const wrapRef = useMpRef(null);
  const stageRef = useMpRef(null);
  useMpEffect(() => {
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

function MusicPageApp() {
  const [events, setEvents] = useMpState([]);
  const [playingId, setPlayingId] = useMpState(null);
  const [t, setTweak] = useTweaks(MP_TWEAKS);
  const { wrapRef, stageRef } = useMpStageScale(1920);
  const rootRef = useMpRef(null);
  const djRef = useMpRef(null);
  const mediaRef = useMpRef(null);

  const fire = useMpCb((text) => {
    const id = Date.now() + Math.random();
    setEvents((c) => [...c, { id, text }]);
    setTimeout(() => setEvents((c) => c.filter((x) => x.id !== id)), 2400);
  }, []);
  const dismiss = (id) => setEvents((c) => c.filter((x) => x.id !== id));
  const togglePlay = useMpCb((id) => setPlayingId((cur) => (cur === id ? null : id)), []);

  // apply tweaks
  useMpEffect(() => {
    const el = rootRef.current; if (!el) return;
    el.style.setProperty("--lp-grain-op", String(t.grain));
    el.style.setProperty("--lp-peach", MP_ACCENTS[t.accent] || MP_ACCENTS["Bronze Sheen"]);
    el.classList.toggle("lp-still", !t.motion);
  }, [t.grain, t.motion, t.accent]);

  const scrollTo = useMpCb((ref) => {
    const el = ref && ref.current; if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 10;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  // 3D gallery hero — tilts in on scroll (mirrors Films / Literature)
  const heroRef = useMpRef(null);
  const stickyRef = useMpRef(null);
  const galleryRef = useMpRef(null);
  useMpEffect(() => {
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

  // hero CTA mini-wave bars
  const heroCtaWaves = [];
  for (let i = 0; i < 40; i++) { heroCtaWaves.push({ h: 8 + Math.abs(Math.sin(i * 0.55) * 30), d: (i % 10) * 0.08 }); }

  // hero frames — musician + album art + key art
  const heroCols = [
    [AMR("posterSynthesis"), AMR("musician"), AMR("film2"), AMR("posterBubbles"), AMR("ipProsopagnosia"), AMR("film7")],
    [AMR("posterEudaimonia"), AMR("ipFated"), AMR("musicianC"), AMR("posterPlaces"), AMR("film5"), AMR("ipInevitable")],
    [AMR("film4"), AMR("ipJuiced"), AMR("film8"), AMR("musician"), AMR("posterSynthesis"), AMR("film6")],
  ];

  const banner = { bg: "musician", blurb: "" };

  return (
    <React.Fragment>
      <div className="tk-scaler" ref={wrapRef}>
        <div className="tk-stage" ref={stageRef}>
          <div className="site mp-root lp-root" ref={rootRef}>

            {/* HERO — 3D gallery tilts in on scroll + audio-reactive waveform */}
            <section className="lph-scroll" data-screen-label="Music Hero" ref={heroRef}>
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
                <div className="mph-glowline" aria-hidden="true" />
                <Header active="Portfolio" onNav={(label) => fire(`Nav → ${label}`)} onCta={() => scrollTo(djRef)} />
                <div className="lph-copy">
                  <div className="lph-kicker">A Sonic Archive</div>
                  <h2 className="lph-title lp-title-fill">Music</h2>
                  <div className="lph-rule" />
                  <p className="lph-motto">Original music, DJ sets, soundtracks and Childhood beats.</p>
                  <div className="mp-cta__mini-wave" aria-hidden="true">
                    {heroCtaWaves.map((w, i) => (<i key={i} style={{ height: w.h + "px", animationDelay: w.d + "s" }} />))}
                  </div>
                </div>
                <div className="lph-scrollcue"><span>Scroll</span><span className="bar" /></div>
              </div>
            </section>

            <div className="mp-body-bg">
              <div ref={djRef}>
                <DjSetsSection sets={window.MUSIC_DJSETS} banner={banner}
                  onCta={() => { window.open("https://soundcloud.com/teddrops", "_blank"); }}
                  playingId={playingId} onToggle={togglePlay} />
              </div>

              <ReleasesSection releases={window.MUSIC_RELEASES} playingId={playingId} onToggle={togglePlay} />

              <ArchiveSection tapes={window.MUSIC_ARCHIVE} />

              <SoundtracksSection tracks={window.MUSIC_SOUNDTRACKS} />
            </div>

            <Footer onSubscribe={(d) => fire(`Newsletter: ${(d && d.email) || ""}`)} />
          </div>
        </div>
      </div>

      <ToastShelfMP events={events} onDismiss={dismiss} />

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

ReactDOM.createRoot(document.getElementById("root")).render(<MusicPageApp />);
