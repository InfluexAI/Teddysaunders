// ============================================================
//  PhotoPageApp — the stills wing. Header → 3D gallery hero →
//  fixed category nav → featured category sections → minimal
//  closing strip. The set-album, photo lightbox and category
//  archive live above the scaled stage. 1920 stage, scaled.
// ============================================================
const { useState: usePpState, useCallback: usePpCb, useRef: usePpRef, useEffect: usePpEffect } = React;
const APR = (k, fb) => { if (!k) return fb || "assets/cosmic-bg.png"; if (typeof k === "string" && (k.startsWith("assets/") || k.startsWith("/") || k.startsWith("http"))) return k; return (window.__resources && window.__resources[k]) || fb || "assets/cosmic-bg.png"; };

const PP_TWEAKS = /*EDITMODE-BEGIN*/{
  "grain": 0.06,
  "motion": true,
  "accent": "Bronze Sheen"
}/*EDITMODE-END*/;

const PP_ACCENTS = {
  "Bronze Sheen": "linear-gradient(132deg, #FFE6C6 0%, #F8CB92 32%, #E9A968 64%, #C9803F 100%)",
  "Harvest Gold": "linear-gradient(132deg, #FBE9B6 0%, #ECC163 34%, #D89733 66%, #A9711F 100%)",
  "Ember": "linear-gradient(132deg, #FFD0A0 0%, #F0964E 36%, #D95F10 70%, #9C3D08 100%)",
};

function ToastShelfPP({ events, onDismiss }) {
  if (!events.length) return null;
  return (
    <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 99999, display: "flex", flexDirection: "column", gap: 8 }}>
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
    const t = setTimeout(apply, 400), t2 = setTimeout(apply, 1500), t3 = setTimeout(apply, 3000);
    return () => { window.removeEventListener("resize", apply); ro.disconnect(); clearTimeout(t); clearTimeout(t2); clearTimeout(t3); };
  }, [designWidth]);
  return { wrapRef, stageRef };
}

function PhotoPageApp() {
  const [events, setEvents] = usePpState([]);
  const [archiveKey, setArchiveKey] = usePpState(null);     // category archive overlay
  const [albumId, setAlbumId] = usePpState(null);           // open set album
  const [photo, setPhoto] = usePpState(null);               // { setId, photoId, fromAlbum }
  const [t, setTweak] = useTweaks(PP_TWEAKS);
  const { wrapRef, stageRef } = usePpStageScale(1920);
  const rootRef = usePpRef(null);

  const fire = usePpCb((text) => {
    const id = Date.now() + Math.random();
    setEvents((c) => [...c, { id, text }]);
    setTimeout(() => setEvents((c) => c.filter((x) => x.id !== id)), 2400);
  }, []);
  const dismiss = (id) => setEvents((c) => c.filter((x) => x.id !== id));

  usePpEffect(() => {
    const el = rootRef.current; if (!el) return;
    el.style.setProperty("--lp-grain-op", String(t.grain));
    el.style.setProperty("--lp-peach", PP_ACCENTS[t.accent] || PP_ACCENTS["Bronze Sheen"]);
    el.classList.toggle("lp-still", !t.motion);
  }, [t.grain, t.motion, t.accent]);

  // ---- open helpers ----
  const openSet = usePpCb((set) => {
    if (!set) return;
    if (set.photos.length <= 1) setPhoto({ setId: set.id, photoId: set.photos[0] && set.photos[0].id, fromAlbum: false });
    else setAlbumId(set.id);
  }, []);
  const openPhotoFromAlbum = usePpCb((photoId) => { setAlbumId((aid) => { setPhoto({ setId: aid, photoId, fromAlbum: true }); return aid; }); }, []);
  const selectPhoto = usePpCb((photoId) => { setPhoto((p) => (p ? { ...p, photoId } : p)); }, []);
  const backFromPhoto = usePpCb(() => { setPhoto(null); }, []);
  const closeAll = usePpCb(() => { setPhoto(null); setAlbumId(null); }, []);

  // ---- deep-link from the hash on load ----
  usePpEffect(() => {
    const m = (location.hash || "").match(/photography\/([\w-]+)\/([\w-]+)(?:\/([\w-]+))?/);
    if (!m) return;
    const setObj = window.PHOTO_SET_BY_ID[m[2]];
    if (!setObj) return;
    if (m[3] && setObj.photos.some((p) => p.id === m[3])) {
      const fromAlbum = setObj.photos.length > 1;
      if (fromAlbum) setAlbumId(setObj.id);
      setPhoto({ setId: setObj.id, photoId: m[3], fromAlbum });
    } else if (setObj.photos.length <= 1) {
      setPhoto({ setId: setObj.id, photoId: setObj.photos[0] && setObj.photos[0].id, fromAlbum: false });
    } else {
      setAlbumId(setObj.id);
    }
  }, []);

  // ---- 3D gallery hero ----
  const heroRef = usePpRef(null);
  const stickyRef = usePpRef(null);
  const galleryRef = usePpRef(null);
  usePpEffect(() => {
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

  const CATS = window.PHOTO_CATS;
  const SET_BY_ID = window.PHOTO_SET_BY_ID;
  const catCounts = {};
  CATS.forEach((c) => { catCounts[c.key] = window.pgSetsFor(c.key).length; });

  const heroCols = [
    [
      APR("assets/photography/events/odesza/odesza-0143.jpg"),
      APR("assets/photography/experimental-abstract/art/venjupmorn-tafreshi/venjupmorn-tafreshi.jpg"),
      APR("assets/photography/events/momentfeednov/momentfeednov-0136.jpg"),
      APR("assets/photography/wizard-light-painting/light-art/light-art-0031.jpg"),
      APR("assets/photography/advertisement/robert-kato/robert-kato-best-branded-0556.jpg"),
    ],
    [
      APR("assets/photography/portraits/individuals/brit/brit-fashion-0339.jpg"),
      APR("assets/photography/experimental-abstract/art/capecod09/capecod09-447.jpg"),
      APR("assets/photography/events/uber4th/uber4th-0578.jpg"),
      APR("assets/photography/experimental-abstract/art/6006lacyst/6006lacyst-184.jpg"),
      APR("assets/photography/events/momentfeed2/momentfeed2-296.jpg"),
    ],
    [
      APR("assets/photography/advertisement/robert-kato/robert-kato-best-branded-0811.jpg"),
      APR("assets/photography/wizard-light-painting/light-art/light-art-0028.jpg"),
      APR("assets/photography/events/bbq/bbq-198.jpg"),
      APR("assets/photography/experimental-abstract/art/will-postom/will-postom-landscape-art-jail1-69.jpg"),
      APR("assets/photography/portraits/individuals/curtis-jarvis/curtis-jarvis-0200.jpg"),
    ],
  ];

  // resolved overlay objects
  const albumSet = albumId ? SET_BY_ID[albumId] : null;
  const albumCat = albumSet ? window.PHOTO_CAT_BY_KEY[albumSet.cat] : null;
  const photoSet = photo ? SET_BY_ID[photo.setId] : null;
  const photoCat = photoSet ? window.PHOTO_CAT_BY_KEY[photoSet.cat] : null;
  const archiveCat = archiveKey ? window.PHOTO_CAT_BY_KEY[archiveKey] : null;
  const archiveSets = archiveKey ? window.pgSetsFor(archiveKey) : [];

  return (
    <React.Fragment>
      <PhotoNav cats={CATS} counts={catCounts} />

      <div className="tk-scaler" ref={wrapRef}>
        <div className="tk-stage" ref={stageRef}>
          <div className="site pg-root lp-root" ref={rootRef}>

            {/* HERO */}
            <section className="lph-scroll" data-screen-label="Photography Hero" ref={heroRef}>
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
                <Header active="Portfolio" onNav={(label) => fire(`Nav → ${label}`)} onCta={() => { const el = document.getElementById("pgsec-portraits"); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" }); }} />
                <div className="lph-copy">
                  <div className="lph-kicker">A Cinematic Archive</div>
                  <h2 className="lph-title lp-title-fill">Photography</h2>
                  <div className="lph-rule" />
                  <p className="lph-motto">Atmosphere captured in a single frame.</p>
                </div>
                <div className="lph-scrollcue"><span>Scroll</span><span className="bar" /></div>
              </div>
            </section>

            {/* STATEMENT — Minolta lens + editorial body (copy moved from hero) */}
            <section className="pg-statement lp-grain" data-screen-label="Photography Statement">
              <div className="pg-statement__media">
                <img src={APR("assets/heroes/photographer-macro.jpg")} alt="Vintage Minolta rangefinder lens" />
                <div className="pg-statement__veil" aria-hidden="true" />
              </div>
              <div className="pg-statement__text">
                <p className="pg-statement__lead">Photography was never just about documenting reality.</p>
                <p>For Ted Saunders, the camera became a tool for world-building — capturing emotion, mythology, personality, transformation, and atmosphere through light, texture, composition, and mood.</p>
                <p>From cinematic portraits and headshots to surreal visual experiments, commercial composites, live events, and long-exposure light painting, each image is designed to feel like a moment from a larger story.</p>
                <p>The work spans both polished commercial imagery and deeply personal experimentation — always guided by the same obsession: <strong>creating images that people feel before they fully understand.</strong></p>
              </div>
              <div className="pg-statement__bot-veil" aria-hidden="true" />
            </section>

            {/* CATEGORY SECTIONS */}
            <div className="pg-body-bg">
              {CATS.filter((c) => !c.navOnly).map((c) => (
                <CategorySection key={c.key} cat={c} sets={window.pgSetsFor(c.key)}
                  onOpenSet={openSet} onViewAll={(cat) => setArchiveKey(cat.key)} />
              ))}
            </div>

            {/* FINALE CTA */}
            <section className="pg-finale lp-grain" data-screen-label="Book a Shoot">
              <div className="pg-finale__bg" aria-hidden="true">
                <img src={APR("assets/photography/ted-with-camera.jpg")} alt="" />
              </div>
              <div className="pg-finale__inner">
                <h2 className="pg-finale__title">Let's Make<br />Something Real</h2>
                <div className="pg-finale__rule" />
                <p className="pg-finale__sub">Every great image starts with a conversation. Reach out to book a shoot — or explore the full TedShots portfolio at TedShots.com.</p>
                <div className="pg-finale__btns">
                  <a className="pg-finale__btn-solid" href="contact.html">Book a Shoot</a>
                  <a className="pg-finale__btn-ghost" href="https://tedshots.com" target="_blank" rel="noopener noreferrer">Visit TedShots.com</a>
                </div>
              </div>
            </section>

            <Footer onSubscribe={(d) => fire(`Newsletter: ${(d && d.email) || ""}`)} />

          </div>
        </div>
      </div>

      {/* OVERLAYS — above the scaled stage */}
      {archiveCat ? <CategoryArchive cat={archiveCat} sets={archiveSets} onClose={() => setArchiveKey(null)} onOpenSet={openSet} /> : null}
      {albumSet ? <SetAlbum set={albumSet} catKey={albumSet.cat} catTitle={albumCat && albumCat.title} onClose={() => setAlbumId(null)} onOpenPhoto={openPhotoFromAlbum} /> : null}
      {photoSet && photo ? <PhotoLightbox set={photoSet} catKey={photoSet.cat} catTitle={photoCat && photoCat.title} photoId={photo.photoId} onClose={closeAll} onBack={backFromPhoto} onSelect={selectPhoto} /> : null}

      <ToastShelfPP events={events} onDismiss={dismiss} />

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

ReactDOM.createRoot(document.getElementById("root")).render(<PhotoPageApp />);
