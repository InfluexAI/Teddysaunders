// PortfolioSections — four ENVIRONMENTS, one universe.
//   Films   — film archive: reel bleeds behind the whole section
//   Photo   — gallery wall: exhibited prints, asymmetry, negative space
//   Music   — performance space: stage light, beams, waveform
//   Journal — the study: the desk IS the section; excerpts are paper slips
const { useRef: useMsRef, useEffect: useMsEffect, useState: useMsState } = React;

function PlayGlyph() { return (<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="7,4 21,12 7,20" /></svg>); }

// Reveal-on-scroll with interval safety (never strands content hidden).
function useReveal() {
  const ref = useMsRef(null);
  useMsEffect(() => {
    const el = ref.current; if (!el) return;
    const nodes = Array.prototype.slice.call(el.querySelectorAll(".pp-reveal"));
    const show = (n) => {
      if (n.classList.contains("is-in")) return;
      n.classList.add("is-in");
      setTimeout(() => { n.style.transition = "none"; n.style.opacity = "1"; n.style.transform = "none"; }, 1050);
    };
    const reveal = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      nodes.forEach((n) => { const r = n.getBoundingClientRect(); if (r.top < vh * 0.94 && r.bottom > 0) show(n); });
    };
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    window.addEventListener("load", reveal);
    // Persistent low-cost safety scan — never strand content hidden.
    const iv = setInterval(reveal, 500);
    return () => { window.removeEventListener("scroll", reveal); window.removeEventListener("resize", reveal); window.removeEventListener("load", reveal); clearInterval(iv); };
  }, []);
  return ref;
}

// Archive drawer — transform-driven strip with ‹ › arrows.
function Drawer({ children }) {
  const viewRef = useMsRef(null);
  const trackRef = useMsRef(null);
  const [x, setX] = useMsState(0);
  const [lim, setLim] = useMsState(0);

  const measure = () => {
    const v = viewRef.current, t = trackRef.current;
    if (!v || !t) return 0;
    return Math.min(0, v.clientWidth - t.scrollWidth);
  };
  const apply = (nx, animate) => {
    const t = trackRef.current; if (!t) return;
    t.style.transition = animate ? "transform .6s cubic-bezier(.4,0,.2,1)" : "none";
    t.style.transform = "translateX(" + nx + "px)";
    if (animate) setTimeout(() => { if (trackRef.current) { trackRef.current.style.transition = "none"; trackRef.current.style.transform = "translateX(" + nx + "px)"; } }, 650);
  };
  const step = (dir) => {
    const v = viewRef.current; if (!v) return;
    const min = measure(); setLim(min);
    setX((cur) => { const nx = Math.max(min, Math.min(0, cur + dir * -v.clientWidth * 0.75)); apply(nx, true); return nx; });
  };
  useMsEffect(() => {
    const onResize = () => { const min = measure(); setLim(min); setX((cur) => { const nx = Math.max(min, Math.min(0, cur)); apply(nx, false); return nx; }); };
    onResize();
    const t1 = setTimeout(onResize, 200), t2 = setTimeout(onResize, 900);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="pp-drawer pp-reveal">
      <button className="pp-drawer__arrow pp-drawer__arrow--prev" aria-label="Previous" data-dim={x >= 0 ? "" : undefined} onClick={() => step(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="pp-drawer__view" ref={viewRef}>
        <div className="pp-drawer__track" ref={trackRef}>{children}</div>
      </div>
      <button className="pp-drawer__arrow pp-drawer__arrow--next" aria-label="Next" data-dim={x <= lim ? "" : undefined} onClick={() => step(1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );
}

// Copy block shared by every environment.
function Copy({ num, title, tagline, body, cta, onCta }) {
  return (
    <div className="pp-copy pp-reveal">
      <div className="pp-num">{num}</div>
      <h2 className="pp-title">{title}</h2>
      <p className="pp-tagline">{tagline}</p>
      {body.map((p, i) => <p className="pp-body" key={i}>{p}</p>)}
      <button className="pp-btn" onClick={onCta}>{cta}<span className="arr">→</span></button>
    </div>
  );
}

/* ===================== FILMS · the film archive =================== */
function FilmSection({ data, onCta, onPlay, onPoster }) {
  const ref = useReveal();
  return (
    <section className="pp-sec pp-sec--films pp-grain" id="films" data-screen-label="Films" ref={ref}>
      <div className="pp-env">
        <img className="pp-poster" src={data.reel} alt="" aria-hidden="true" />
        <image-slot id="pp-film-reel" src={data.reel} fit="cover" radius="0" placeholder="Drop a clip from Ted’s reel"></image-slot>
        <div className="pp-env__veil" />
      </div>
      <div className="pp-copyzone">
        <Copy num="01" title="Films" tagline="Stories that dare you to think different."
          body={["Film is the gravitational center of Ted Saunders’ universe.", "From cinematic brand campaigns and Burning Man narratives to experimental short films, music videos, philosophical essays, and original sci-fi worlds, Ted’s filmmaking explores emotion, mythology, transformation, futurism, and atmosphere."]}
          cta="Explore the Films" onCta={onCta} />
      </div>
      <div className="pp-playpos pp-reveal"><div className="pp-play" onClick={onPlay} role="button" aria-label="Play the reel"><PlayGlyph /></div></div>
      <Drawer>
        {data.posters.map((p, i) => (
          <a className="pp-poster-item" key={i} href="#" onClick={(e) => { e.preventDefault(); onPoster(p.title); }}>
            <div className="pp-poster-item__art">
              <img src={p.src} alt={p.title} />
              <div className="pp-poster-item__desc">{p.desc}</div>
            </div>
            <div className="pp-poster-item__meta">
              <h3 className="pp-poster-item__title">{p.title}</h3>
              <div className="pp-poster-item__sub">{p.year} · {p.cat}</div>
            </div>
          </a>
        ))}
      </Drawer>
    </section>
  );
}

/* ===================== PHOTOGRAPHY · the gallery ================== */
function PhotoSection({ data, onCta, photos }) {
  const ref = useReveal();
  return (
    <section className="pp-sec pp-sec--photo pp-grain" id="photography" data-screen-label="Photography" ref={ref}>
      <div className="pp-env">
        <img className="pp-poster" src={data.env} alt="" aria-hidden="true" />
        <image-slot id="pp-photo-env" src={data.env} fit="cover" radius="0" placeholder="Drop a backdrop photograph"></image-slot>
        <div className="pp-env__veil" />
      </div>
      <div className="pp-wall">
        <div className="pp-wall__light" />
        <Copy num="02" title="Photography" tagline="Atmosphere captured in a single frame."
          body={["Photography became another tool for world-building. From cinematic portraits and headshots to surreal visual experiments, commercial composites, weddings, and long-exposure light painting, each image is designed to feel like a moment from a larger story."]}
          cta="Explore the Photography" onCta={onCta} />
      </div>
      <Drawer>
        {photos.map((s, i) => (
          <div className="pp-thumb" key={i}>
            <div className="pp-thumb__win">
              <img className="pp-poster" src={s.src} alt="" aria-hidden="true" />
              <image-slot id={"pp-photo-" + i} src={s.src} fit="cover" radius="0" placeholder="Drop a photograph"></image-slot>
            </div>
            {s.label ? <div className="pp-thumb__label">{s.label}</div> : null}
          </div>
        ))}
      </Drawer>
    </section>
  );
}

/* ===================== MUSIC · the performance space ============== */
function MusicSection({ data, onCta, onPlay, clips }) {
  const ref = useReveal();
  const bars = [];
  for (let i = 0; i < 110; i++) bars.push(<span key={i} style={{ animationDuration: (0.9 + (i % 7) * 0.16) + "s", animationDelay: (-(i % 11) * 0.13) + "s" }} />);
  return (
    <section className="pp-sec pp-sec--music pp-grain" id="music" data-screen-label="Music" ref={ref}>
      <div className="pp-env">
        <img className="pp-poster" src={data.reel} alt="" aria-hidden="true" />
        <image-slot id="pp-music-reel" src={data.reel} fit="cover" radius="0" placeholder="Drop DJ / performance footage"></image-slot>
        <div className="pp-env__veil" />
      </div>
      <div className="pp-beams" />
      <div className="pp-copyzone">
        <Copy num="03" title="Music" tagline="Adding rhythm and harmony to life’s vibrations."
          body={["Music has always been another language for Ted Saunders — one that bypasses the intellect and speaks directly to emotion, tension, and atmosphere.", "From bass-heavy DJ sets and cinematic soundscapes to experimental compositions and personal archives, the music exists as both emotional release and world-building tool."]}
          cta="Explore the Music" onCta={onCta} />
      </div>
      <div className="pp-playpos pp-reveal"><div className="pp-play" onClick={() => onPlay()} role="button" aria-label="Play the set"><PlayGlyph /></div></div>
      <div className="pp-waveline" aria-hidden="true">{bars}</div>
      <Drawer>
        {clips.map((c, i) => (
          <div className="pp-clipcard" key={i} onClick={() => onPlay(c.label)} role="button" aria-label={"Play " + c.label}>
            <img className="pp-poster" src={c.src} alt="" aria-hidden="true" />
            <image-slot id={"pp-music-clip-" + i} src={c.src} fit="cover" radius="0" placeholder={c.placeholder}></image-slot>
            <div className="pp-clipcard__play"><svg viewBox="0 0 24 24"><polygon points="7,4 21,12 7,20" /></svg></div>
            <div className="pp-clipcard__label">{c.label}</div>
          </div>
        ))}
      </Drawer>
    </section>
  );
}

/* ===================== LITERATURE · the study ===================== */
function JournalSection({ data, onCta, excerpts }) {
  const ref = useReveal();
  return (
    <section className="pp-sec pp-sec--journal pp-grain" id="literature" data-screen-label="Literature & Philosophy" ref={ref}>
      <div className="pp-env">
        <img className="pp-poster" src={data.spread} alt="" aria-hidden="true" />
        <image-slot id="pp-journal-spread" src={data.spread} fit="cover" radius="0" placeholder="Drop a journal page"></image-slot>
        <div className="pp-env__veil" />
      </div>
      <div className="pp-copyzone">
        <Copy num="04" title={<span>Literature &amp;<br />Philosophy</span>} tagline="Thoughts that refused to stay quiet."
          body={["Ted Saunders’ literary work explores philosophy, spirituality, creativity, mythology, consciousness, and the beauty of uncertainty.", <span key="b">At the center of this universe is <em>The Book of Ignorance</em> — an evolving philosophical framework built around the idea that truth cannot be fully possessed, only experienced.</span>]}
          cta="Explore the Philosophy" onCta={onCta} />
      </div>
      <div className="pp-slips pp-reveal">
        {excerpts.map((x, i) => (
          <div className="pp-slip" key={i}>
            <div className="pp-slip__tab" />
            <div className="pp-slip__no">{String(i + 1).padStart(2, "0")}</div>
            <div className="pp-slip__cat">{x.cat}</div>
            <p className="pp-slip__q">{x.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

window.FilmSection = FilmSection;
window.PhotoSection = PhotoSection;
window.MusicSection = MusicSection;
window.JournalSection = JournalSection;
