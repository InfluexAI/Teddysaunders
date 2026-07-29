// ============================================================
//  MusicSections — the sonic environments of the Music page.
//  Reveal hook + SoundCloud-style player + waveform separator,
//  plus the overview, DJ sets, releases, cassette archive,
//  featured highlights, media/visualizer, and closing CTA.
//  Exposed on window for MusicPageApp.
// ============================================================
const { useRef: useMsRef, useEffect: useMsEffect, useState: useMsState, useCallback: useMsCb } = React;
const MS_R = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

/* ---- icons ---- */
function MsSoundCloud() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 14v4h1v-4H2zm2-1v5h1v-5H4zm2-1v6h1v-6H6zm2-2v8h1V10H8zm2-1.5V18h1V8.5h-1zm2 .5V18h1V9.5c-.3-.2-.7-.4-1-.5zM14 8v10h6a3 3 0 0 0 0-6c-.2 0-.5 0-.7.1A5 5 0 0 0 14 8z"/>
    </svg>
  );
}
function MsPlay() { return (<svg viewBox="0 0 24 24" aria-hidden="true"><polygon className="tri" points="7,4 21,12 7,20" /></svg>); }
function MsPause() { return (<svg viewBox="0 0 24 24" aria-hidden="true"><rect className="pause" x="6" y="4" width="4" height="16" rx="1"/><rect className="pause" x="14" y="4" width="4" height="16" rx="1"/></svg>); }
function MsArrowR() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>); }
function MsArrowL() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>); }

/* ---- Reveal-on-scroll — safety interval so content never strands hidden ---- */
function useMpReveal() {
  const ref = useMsRef(null);
  useMsEffect(() => {
    const el = ref.current; if (!el) return;
    const show = (n) => {
      if (n.classList.contains("is-in")) return;
      n.classList.add("is-in");
      setTimeout(() => { n.style.transition = "none"; n.style.opacity = "1"; if (!n.hasAttribute("data-par")) n.style.transform = "none"; }, 1100);
    };
    const reveal = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      el.querySelectorAll(".lp-reveal").forEach((n) => { const r = n.getBoundingClientRect(); if (r.top < vh * 0.93 && r.bottom > 0) show(n); });
    };
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    const iv = setInterval(reveal, 500);
    return () => { window.removeEventListener("scroll", reveal); window.removeEventListener("resize", reveal); clearInterval(iv); };
  }, []);
  return ref;
}

/* ---- Editorial banner — reuses lp-banner markup ---- */
function MpBanner({ img, side, eyebrow, title, blurb }) {
  return (
    <div className="lp-banner lp-reveal">
      {side ? <div className="lp-banner__side" aria-hidden="true">{side}</div> : null}
      <div className="lp-banner__media">
        <img src={img} alt="" aria-hidden="true" />
        <div className="lp-banner__vig" />
      </div>
      <div className="lp-banner__card">
        {eyebrow ? <div className="lp-banner__eyebrow">{eyebrow}</div> : null}
        <h2 className="lp-banner__title">{title}</h2>
        <div className="lp-banner__bar" />
      </div>
      {blurb ? <p className="lp-banner__blurb">{blurb}</p> : null}
    </div>
  );
}

/* ---- Animated waveform separator ---- */
function MpWaveSep({ bars = 96 }) {
  const arr = [];
  for (let i = 0; i < bars; i++) {
    const h = 12 + Math.abs(Math.sin(i * 0.5) * 46) + (i % 5) * 4;
    arr.push({ h, d: (i % 12) * 0.09 });
  }
  return (
    <div className="mp-wavesep" aria-hidden="true">
      {arr.map((b, i) => (<i key={i} style={{ height: b.h + "px", animationDelay: b.d + "s" }} />))}
    </div>
  );
}

/* ---- SoundCloud-style player transport ---- */
function ScWave({ playing, progress }) {
  const bars = React.useMemo(() => {
    const out = [];
    for (let i = 0; i < 54; i++) { out.push(0.24 + Math.abs(Math.sin(i * 0.7) * 0.6) + (Math.sin(i * 2.3) + 1) * 0.16); }
    return out;
  }, []);
  return (
    <div className="mp-wf" aria-hidden="true">
      {bars.map((v, i) => {
        const played = i / bars.length <= progress;
        return <i key={i} className={played ? "mp-wf__played" : ""} style={{ height: (v * 100).toFixed(0) + "%", animationDelay: ((i % 9) * 0.07) + "s" }} />;
      })}
    </div>
  );
}

/* ---- resolve a track's live SoundCloud artwork via oEmbed (client-side, CORS-enabled) ---- */
function useScArtwork(scUrl) {
  const [art, setArt] = useMsState(null);
  useMsEffect(() => {
    if (!scUrl) return;
    let cancelled = false;
    fetch("https://soundcloud.com/oembed?format=json&url=" + encodeURIComponent(scUrl))
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || !d || !d.thumbnail_url) return;
        setArt(d.thumbnail_url.replace("-large", "-t500x500"));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [scUrl]);
  return art;
}

function ScPlayer({ item, playingId, onToggle }) {
  const playing = playingId === item.id;
  const [progress, setProgress] = useMsState(0);
  useMsEffect(() => {
    if (!playing) return;
    let raf, t0 = performance.now(), base = progress;
    const tick = (t) => {
      const p = Math.min(1, base + (t - t0) / 90000); // slow simulated playhead
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const total = item.run || "0:00";
  const elapsed = (() => {
    const parts = total.split(":").map(Number);
    let secs = 0; parts.forEach((n) => { secs = secs * 60 + n; });
    const e = Math.floor(secs * progress);
    const hh = Math.floor(e / 3600), mm = Math.floor((e % 3600) / 60), ss = e % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return hh > 0 ? hh + ":" + pad(mm) + ":" + pad(ss) : mm + ":" + pad(ss);
  })();

  if (item.scUrl) {
    return (
      <div className="mp-scplayer">
        <iframe className="mp-player__iframe" height="166" scrolling="no" frameBorder="no" loading="lazy"
          title={item.title}
          allow="autoplay; encrypted-media; fullscreen"
          src={"https://w.soundcloud.com/player/?url=" + encodeURIComponent(item.scUrl) + "&color=%23e8b777&inverse=true&auto_play=false&show_user=true&visual=false&show_artwork=false&hide_related=true&show_comments=false&show_reposts=false"}></iframe>
      </div>
    );
  }
  return (
    <div className="mp-scplayer">
      <div className="mp-scplayer__row">
        <button className="mp-scbtn" aria-label={playing ? "Pause" : "Play"} onClick={() => onToggle(item.id)}>
          {playing ? <MsPause /> : <MsPlay />}
        </button>
        <ScWave playing={playing} progress={progress} />
        <div className="mp-sctime">{playing ? elapsed : "0:00"} / {total}</div>
      </div>
      <div className="mp-scmeta">
        <span><b>{item.plays || "—"}</b> plays</span>
        <span className="dot" />
        <span>{item.tag}</span>
      </div>
    </div>
  );
}

/* ===================== SONIC OVERVIEW ===================== */
function OverviewSection({ worlds }) {
  const ref = useMpReveal();
  return (
    <section className="mp-intro lp-grain" data-screen-label="Music Overview" ref={ref}>
      <div className="mp-intro__aura" aria-hidden="true" />
      <div className="mp-intro__inner">
        <div className="mp-eyebrow lp-reveal">Another Form of Storytelling</div>
        <h2 className="mp-intro__title mp-tex lp-reveal">Music has always been another form of storytelling.</h2>
        <p className="mp-intro__lede lp-reveal">Long before the camera, there was rhythm — the first language, the one the body understood before the mind.</p>
        <p className="mp-intro__copy lp-reveal">Ted moves fluidly across sonic worlds: bass-heavy DJ performances and original productions, ambient sound design and cinematic scores, restless electronic experimentation and soundtrack concepts for films not yet made — every one of them an attempt to tell a story you can feel before you can name it.</p>
        <div className="mp-worlds lp-reveal">
          {worlds.map((w) => (<span className="mp-world" key={w}>{w}</span>))}
        </div>
      </div>
    </section>
  );
}

/* ---- a single DJ-set card (owns its own oEmbed-cover hook) ---- */
function DjSetCard({ s, playingId, onToggle }) {
  const liveArt = useScArtwork(!s.cover ? s.scUrl : null);
  return (
    <div className={"mp-release lp-reveal" + (playingId === s.id ? " is-playing" : "")}>
      <div className="mp-release__art">
        <img src={s.cover || liveArt || MS_R(s.art, "assets/heroes/musician.jpg")} alt={s.title} loading="lazy" />
      </div>
      <div className="mp-release__meta">
        <div className="mp-release__gy"><span>{s.kicker}</span><span className="dot" style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor", opacity: 0.6 }} /><span>{s.tag}</span></div>
        <h3 className="mp-release__title">{s.title}</h3>
        <p className="mp-release__desc">{s.desc}</p>
        <ScPlayer item={s} playingId={playingId} onToggle={onToggle} />
      </div>
    </div>
  );
}

/* ===================== DJ SETS ===================== */
function DjSetsSection({ sets, banner, onCta, playingId, onToggle }) {
  const ref = useMpReveal();
  const perSlide = 4;
  const slides = [];
  for (let i = 0; i < sets.length; i += perSlide) slides.push(sets.slice(i, i + perSlide));
  const [slide, setSlide] = useMsState(0);
  const go = (n) => setSlide((n + slides.length) % slides.length);
  return (
    <section className="mp-djs lp-grain" data-screen-label="DJ Sets" ref={ref}>
      <div className="lp-seam-top" />
      <MpBanner img={MS_R(banner.bg, "assets/heroes/musician.jpg")}
        eyebrow="Live DJ Performances" title="TedDrops & Mastercodes" blurb={banner.blurb} />
      <div className="mp-carousel">
        <div className="mp-carousel__track" style={{ transform: "translateX(-" + (slide * 100) + "%)" }}>
          {slides.map((group, gi) => (
            <div className="mp-players mp-carousel__slide" key={gi}>
              {group.map((s) => (<DjSetCard s={s} playingId={playingId} onToggle={onToggle} key={s.id} />))}
            </div>
          ))}
        </div>
        {slides.length > 1 ? (
          <div className="mp-carousel__nav">
            <button className="mp-carousel__arrow" aria-label="Previous" onClick={() => go(slide - 1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="mp-carousel__dots">
              {slides.map((_, i) => (<button key={i} className={"mp-carousel__dot" + (i === slide ? " is-active" : "")} aria-label={"Slide " + (i + 1)} onClick={() => setSlide(i)} />))}
            </div>
            <button className="mp-carousel__arrow" aria-label="Next" onClick={() => go(slide + 1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        ) : null}
      </div>
      <div className="mp-rail-cta lp-reveal">
        <button className="lp-cta lp-cta--gold" onClick={onCta}>Follow TedDrops on SoundCloud<span className="arr">→</span></button>
      </div>
    </section>
  );
}

/* ===================== LATEST RELEASES ===================== */
function ReleasesSection({ releases, playingId, onToggle }) {
  const ref = useMpReveal();
  return (
    <section className="mp-releases lp-grain" data-screen-label="Latest Releases" ref={ref}>
      <div className="mp-releases__seam" />
      <div className="mp-head lp-reveal">
        <div className="mp-eyebrow">Latest Releases</div>
        <h2 className="mp-head__title mp-tex">Original Music</h2>
      </div>
      <div className="mp-relgrid">
        {releases.map((r) => (
          <div className={"mp-release lp-reveal" + (playingId === r.id ? " is-playing" : "")} key={r.id}>
            <div className="mp-release__art">
              <img src={MS_R(r.art, "assets/portfolio/poster-synthesis.png")} alt={r.title} loading="lazy" />
              {r.isNew ? <div className="mp-release__new">New</div> : null}
              <button className="mp-release__play" aria-label={"Play " + r.title} onClick={() => onToggle(r.id)}>
                {playingId === r.id ? <MsPause /> : <PlayTriangle size={26} id={"relpl-" + r.id} />}
              </button>
            </div>
            <div className="mp-release__meta">
              <div className="mp-release__gy"><span>{r.genre}</span><span className="dot" style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor", opacity: 0.6 }} /><span>{r.year}</span></div>
              <h3 className="mp-release__title">{r.title}</h3>
              <p className="mp-release__desc">{r.desc}</p>
              <ScPlayer item={r} playingId={playingId} onToggle={onToggle} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===================== CHILDHOOD ARCHIVE (cassettes) ===================== */
function ArchiveSection({ tapes }) {
  const ref = useMpReveal();
  return (
    <section className="mp-archive lp-grain" data-screen-label="Childhood Archive" ref={ref}>
      <div className="lp-seam-top" />
      <div className="mp-head lp-reveal">
        <div className="mp-eyebrow">Original Music · The Archives</div>
        <h2 className="mp-head__title mp-tex">High School &amp; Childhood</h2>
      </div>
      <div className="mp-relgrid">
        {tapes.map((t) => (
          <div className="mp-release lp-reveal" key={t.id}>
            <div className="mp-release__art">
              <img src={MS_R(t.strip, "assets/film/photo-4.jpg")} alt={t.title} loading="lazy" />
            </div>
            <div className="mp-release__meta">
              <div className="mp-release__gy"><span>{t.label}</span><span className="dot" style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor", opacity: 0.6 }} /><span>{t.year}</span></div>
              <h3 className="mp-release__title">{t.title}</h3>
              <p className="mp-release__desc">{t.note}</p>
              <div className="mp-release__foot"><span>{t.genre}</span><span>{t.len}</span></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mp-archive__cta lp-reveal" style={{ display: "flex", justifyContent: "center", marginTop: "clamp(40px,6vh,72px)" }}>
        <button className="lp-cta lp-cta--gold" onClick={() => { window.location.href = "Film.html"; }}>View All Childhood Music<span className="arr">→</span></button>
      </div>
    </section>
  );
}

/* ===================== FEATURED HIGHLIGHTS ===================== */
function HighlightsSection({ items }) {
  const ref = useMpReveal();
  return (
    <section className="mp-highlights lp-grain" data-screen-label="Featured Highlights" ref={ref}>
      <div className="lp-seam-top" />
      <div className="mp-head mp-head--center lp-reveal">
        <div className="mp-eyebrow mp-eyebrow--solo" style={{ justifyContent: "center" }}>Featured Highlights</div>
        <h2 className="mp-head__title mp-tex">Signals Worth Hearing</h2>
        <p className="mp-head__blurb">A curated shelf of the work that best defines the sound — from the dancefloor to the edge of unmade film worlds.</p>
      </div>
      <div className="mp-hlgrid">
        {items.map((h) => (
          <div className={"mp-hl lp-reveal mp-hl--" + h.size} key={h.id} role="button" tabIndex={0}>
            <div className="mp-hl__img"><img src={MS_R(h.img, "assets/heroes/musician.jpg")} alt={h.title} loading="lazy" /></div>
            <div className="mp-hl__glow" aria-hidden="true" />
            <div className="mp-hl__pill"><span className="dot" />{h.pill}</div>
            <div className="mp-hl__body">
              <div className="mp-hl__no">{h.no}</div>
              <div className="mp-hl__tag">{h.tag}</div>
              <h3 className="mp-hl__title">{h.title}</h3>
              <p className="mp-hl__desc">{h.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===================== MEDIA EXPERIENCE + VISUALIZER ===================== */
function AudioVisualizer({ mode, running }) {
  const canvasRef = useMsRef(null);
  useMsEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, tPrev = 0, phase = 0;
    const NB = 72;
    const amps = new Array(NB).fill(0).map((_, i) => 0.3 + Math.abs(Math.sin(i * 0.6)) * 0.5);
    const targets = amps.slice();
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = (t) => {
      const dt = Math.min(50, t - tPrev); tPrev = t;
      phase += (running ? dt * 0.004 : dt * 0.0008);
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(247,219,160,0.95)");
      grad.addColorStop(0.55, "rgba(232,151,51,0.85)");
      grad.addColorStop(1, "rgba(201,145,60,0.2)");
      // retarget occasionally for organic movement
      for (let i = 0; i < NB; i++) {
        const beat = running ? (Math.sin(phase * 2 + i * 0.5) * 0.5 + 0.5) : 0.5;
        const noise = running ? (Math.sin(phase * 5.3 + i * 1.7) * 0.5 + 0.5) : 0.5;
        targets[i] = 0.12 + (beat * 0.6 + noise * 0.3) * (running ? 1 : 0.35);
        amps[i] += (targets[i] - amps[i]) * 0.18;
      }
      if (mode === "spectrum") {
        const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.24;
        ctx.save(); ctx.translate(cx, cy);
        for (let i = 0; i < NB; i++) {
          const a = (i / NB) * Math.PI * 2;
          const len = R + amps[i] * R * 1.15;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * R, Math.sin(a) * R);
          ctx.lineTo(Math.cos(a) * len, Math.sin(a) * len);
          ctx.strokeStyle = grad; ctx.lineWidth = 3.2; ctx.lineCap = "round";
          ctx.globalAlpha = 0.5 + amps[i] * 0.5;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(0, 0, R - 4, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(209,157,99,0.35)"; ctx.lineWidth = 1; ctx.stroke();
        ctx.restore();
      } else {
        const gap = 4, bw = (w - gap * (NB - 1)) / NB;
        for (let i = 0; i < NB; i++) {
          const bh = Math.max(3, amps[i] * h * 0.82);
          const x = i * (bw + gap), y = (h - bh) / 2;
          ctx.fillStyle = grad; ctx.globalAlpha = 0.55 + amps[i] * 0.45;
          const r = Math.min(bw / 2, 3);
          ctx.beginPath();
          ctx.moveTo(x + r, y); ctx.arcTo(x + bw, y, x + bw, y + r, r); ctx.arcTo(x + bw, y + bh, x + bw - r, y + bh, r);
          ctx.arcTo(x, y + bh, x, y + bh - r, r); ctx.arcTo(x, y, x + r, y, r); ctx.closePath(); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [mode, running]);
  return <canvas className="mp-viz__canvas" ref={canvasRef} />;
}

function MediaSection({ nowPlaying }) {
  const ref = useMpReveal();
  const [mode, setMode] = useMsState("bars");
  const [running, setRunning] = useMsState(true);
  const [np, setNp] = useMsState(0);
  useMsEffect(() => {
    if (!running) return;
    const t = setInterval(() => setNp((n) => (n + 1) % nowPlaying.length), 6000);
    return () => clearInterval(t);
  }, [running, nowPlaying.length]);
  const cur = nowPlaying[np] || {};
  return (
    <section className="mp-media lp-grain" data-screen-label="Media Experience" ref={ref}>
      <div className="mp-media__bg" aria-hidden="true"><img src={MS_R("musicianC", MS_R("musician", "assets/heroes/musician.jpg"))} alt="" /></div>
      <div className="mp-orb mp-orb--1" aria-hidden="true" />
      <div className="mp-orb mp-orb--2" aria-hidden="true" />
      <div className="mp-orb mp-orb--3" aria-hidden="true" />
      <div className="mp-media__inner lp-reveal">
        <div className="mp-eyebrow mp-eyebrow--solo" style={{ justifyContent: "center" }}>The Media Experience</div>
        <h2 className="mp-media__title mp-tex">Alive, Even in Silence</h2>
        <p className="mp-media__sub">An immersive room of sound and light — waveforms breathing, gradients drifting, the whole space tuned to move whether or not a track is playing.</p>
        <div className="mp-viz">
          {mode === "spectrum" ? (
            <React.Fragment>
              <AudioVisualizer mode={mode} running={running} />
              <div className="mp-viz__ring"><div className="mp-viz__now">
                <div className="mp-viz__nowtag">{running ? "Now Playing" : "Paused"}</div>
                <div className="mp-viz__nowtitle">{cur.title}</div>
              </div></div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <AudioVisualizer mode={mode} running={running} />
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <div className="mp-viz__nowtag">{running ? "Now Playing" : "Paused"} · {cur.sub}</div>
                <div className="mp-viz__nowtitle" style={{ marginTop: 6 }}>{cur.title}</div>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="mp-viz__ctrls lp-reveal">
          <button className="mp-viz__toggle" onClick={() => setRunning((r) => !r)}>
            {running ? <MsPause /> : <MsPlay />}{running ? "Pause Visualizer" : "Play Visualizer"}
          </button>
          <div className="mp-viz__mode" role="tablist">
            <button className={"mp-viz__modebtn" + (mode === "bars" ? " is-on" : "")} onClick={() => setMode("bars")}>Bars</button>
            <button className={"mp-viz__modebtn" + (mode === "spectrum" ? " is-on" : "")} onClick={() => setMode("spectrum")}>Spectrum</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== CLOSING CTA ===================== */
function MusicCta({ onListen, onDrops, onFollow }) {
  const ref = useMpReveal();
  const waves = [];
  for (let i = 0; i < 40; i++) waves.push({ h: 8 + Math.abs(Math.sin(i * 0.55) * 30), d: (i % 10) * 0.08 });
  return (
    <section className="mp-cta lp-grain" data-screen-label="Music CTA" ref={ref}>
      <div className="mp-cta__seam" />
      <div className="mp-cta__aura" aria-hidden="true" />
      <div className="mp-cta__inner">
        <div className="mp-cta__btns lp-reveal">
          <button className="lp-cta lp-cta--gold" onClick={onListen}>Listen Now<span className="arr">→</span></button>
          <button className="lp-cta" onClick={onDrops}>Explore TedDrops<span className="arr">→</span></button>
          <button className="lp-cta" onClick={onFollow}>Follow on SoundCloud<span className="arr">→</span></button>
        </div>
        <div className="mp-cta__mini-wave" aria-hidden="true">
          {waves.map((w, i) => (<i key={i} style={{ height: w.h + "px", animationDelay: w.d + "s" }} />))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  useMpReveal, MpBanner, MpWaveSep, ScPlayer, OverviewSection, DjSetsSection,
  ReleasesSection, ArchiveSection, HighlightsSection, MediaSection, MusicCta,
});
