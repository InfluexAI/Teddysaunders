// AboutOrigin.jsx — the autobiographical run beneath the compass:
//   Teaser → The Director's Journey → interactive cinematic Timeline.
// Image placeholders use <image-slot> so the client can drop real assets in.
const { useRef: useAoRef, useState: useAoState, useEffect: useAoEffect } = React;

// rAF tween (native smooth scroll is a no-op inside the preview iframe).
function aoTween(getter, setter, target, dur, onDone) {
  const start = getter();
  const dist = target - start;
  if (Math.abs(dist) < 2) { setter(target); if (onDone) onDone(); return; }
  const t0 = performance.now();
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const step = (now) => {
    const k = Math.min(1, (now - t0) / dur);
    setter(start + dist * ease(k));
    if (k < 1) requestAnimationFrame(step);
    else if (onDone) onDone();
  };
  requestAnimationFrame(step);
}

function AboutOriginTeaser() {
  const goStory = () => {
    const el = document.getElementById("ao-story");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 20;
    aoTween(() => window.scrollY, (v) => window.scrollTo(0, v), top, 700);
  };
  return (
    <section className="ao-teaser">
      <div className="ao-teaser__collage" aria-hidden="true"></div>
      <div className="ao-teaser__bg" aria-hidden="true"></div>
      <div className="ao-teaser__scrim" aria-hidden="true"></div>
      <div className="ao-teaser__flash" aria-hidden="true"></div>
      <div className="ao-teaser__reticles" aria-hidden="true">
        <span className="r tl"></span><span className="r tr"></span>
        <span className="r bl"></span><span className="r br"></span>
      </div>
      <div className="ao-teaser__inner">
        <h2 className="ao-teaser__headline">
          <span className="ao-th-serif ab-textured">The boy who reached</span>
          <span className="ao-th-sans">for the camera.</span>
        </h2>
        <div className="ao-teaser__body">
          <p>He was 6 years old when he first asked the question that would define his life: <span className="ao-q">&ldquo;What does that button do?&rdquo;</span></p>
          <p>His father handed him the camera. And something woke up.</p>
          <p className="ao-teaser__bio">Forty years later, Ted Saunders has directed everything from Burning Man documentaries to Salesforce campaigns. He has built studios, lost everything, found himself in the dark, and come back with a philosophy that runs through every frame he shoots.</p>
        </div>
        <p className="ao-teaser__kicker">This is not a portfolio. This is a world.</p>
        <button className="ao-cta" onClick={goStory}>
          Read the Full Story
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </div>
    </section>
  );
}

const AO_MEDIA = [
  { id: "ao-media-portraits", cap: "Cinematic Portraits", cls: "ao-col--main", res: "storyBridge", img: "assets/story-bridge.jpg" },
  { id: "ao-media-archival",  cap: "Archival Imagery",    cls: "ao-col--arch", res: "colArchival", img: "assets/slots/ao-media-archival.webp" },
  { id: "ao-media-studio",    cap: "Studio Photography",  cls: "ao-col--studio", res: "colStudio", img: "assets/slots/ao-media-studio.webp" },
  { id: "ao-media-bts",       cap: "Behind-the-Scenes",   cls: "ao-col--bts", res: "colBts", img: "assets/slots/ao-media-bts.webp" },
];

function AboutOriginStory() {
  return (
    <section className="ao-story ao-story--light" id="ao-story">
      <div className="ao-story__grid">
        <div className="ao-story__copy">
          <h2 className="ao-story__title ab-textured">The Director&rsquo;s Journey</h2>
          <p className="ao-story__sub">A camera became more than a tool. It became a portal.</p>
          <div className="ao-story__body">
            <p>Ted Saunders discovered filmmaking before he understood what filmmaking was.</p>
            <p>The same curiosity that began in childhood still drives the work today: wonder, imagination, emotion, transformation, and meaning.</p>
            <p>What started as fascination eventually became a lifelong search for truth through storytelling.</p>
          </div>
        </div>
        <div className="ao-collage">
          {AO_MEDIA.map((m) => (
            <figure className={"ao-col " + m.cls} key={m.id}>
              <div className="ao-col__frame">
                {m.img
                  ? <img className="ao-col__img" src={(window.__resources && window.__resources[m.res]) || m.img} alt={m.cap} />
                  : <image-slot id={m.id} shape="rect" placeholder={m.cap}></image-slot>}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const AO_MILESTONES = [
  { year: "1990s", label: "1990s", cap: "Childhood filmmaking & music" },
  { year: "2000s", label: "2000s", cap: "School Projects \u00b7 Willing awards with Local TV" },
  { year: "2008",  label: "2008",  cap: "Jeremy Piven and Greg Yaitanes" },
  { year: "2010",  label: "2010",  cap: "Tedshots Productions \u00b7 Production Company" },
  { year: "2012",  label: "2012",  cap: "Burning Man Film goes Viral and wins awards" },
  { year: "2013",  label: "2013",  cap: "Infinit Studios \u00b7 Creative Agency is born" },
  { year: "2018",  label: "2018",  cap: "Death of father" },
  { year: "2022",  label: "2022",  cap: "Death of Mother" },
  { year: "2023",  label: "2023",  cap: "Engagement with Zoe" },
  { year: "2024",  label: "2024",  cap: "The Fated Script was born from shadow" },
  { year: "2026",  label: "2026",  cap: "Launch of tedsaunders.com" },
];

function AboutOriginTimeline() {
  const N = AO_MILESTONES.length;
  const reelRef = useAoRef(null);
  const frameRefs = useAoRef([]);
  const activeRef = useAoRef(0);
  const autoRef = useAoRef(null);
  const pausedRef = useAoRef(false);
  const [active, setActive] = useAoState(0);

  const centerFrame = (i) => {
    const reel = reelRef.current;
    const fr = frameRefs.current[i];
    if (!reel || !fr) return;
    const target = fr.offsetLeft - (reel.clientWidth - fr.clientWidth) / 2;
    const prevSnap = reel.style.scrollSnapType;
    reel.style.scrollSnapType = "none";          // don't let snap fight the tween
    aoTween(() => reel.scrollLeft, (v) => { reel.scrollLeft = v; }, target, 600,
      () => { reel.style.scrollSnapType = prevSnap; });
  };

  useAoEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const c = reel.scrollLeft + reel.clientWidth / 2;
      let best = 0, bd = Infinity;
      frameRefs.current.forEach((fr, i) => {
        if (!fr) return;
        const fc = fr.offsetLeft + fr.clientWidth / 2;
        const d = Math.abs(fc - c);
        if (d < bd) { bd = d; best = i; }
      });
      if (best !== activeRef.current) { activeRef.current = best; setActive(best); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(compute); };
    reel.addEventListener("scroll", onScroll, { passive: true });
    compute();

    // auto-advance through the chapters; pauses only while the pointer is over the strip
    autoRef.current = setInterval(() => {
      if (pausedRef.current) return;
      centerFrame((activeRef.current + 1) % N);
    }, 4200);
    const wrap = reel.closest(".ao-reelwrap") || reel;
    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; };
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      reel.removeEventListener("scroll", onScroll);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
      if (autoRef.current) clearInterval(autoRef.current);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const step = (dir) => { centerFrame(Math.max(0, Math.min(N - 1, active + dir))); };

  return (
    <section className="ao-timeline">
      <div className="ao-timeline__glow" aria-hidden="true"></div>
      <div className="ao-timeline__head">
        <h2 className="ao-timeline__title ab-textured">The Road Here</h2>
        <p className="ao-timeline__sub">A life built frame by frame.</p>
        <p className="ao-timeline__body">
          From childhood filmmaking to building Infinit Studios, documenting Burning Man,
          navigating personal loss, and developing original cinematic universes, every chapter
          shaped the philosophy behind the work. The journey was never linear. That&rsquo;s what
          made it meaningful.
        </p>
      </div>

      <div className="ao-axis">
        <div className="ao-axis__track">
          <span className="ao-axis__line" aria-hidden="true"></span>
          {AO_MILESTONES.map((m, i) => (
            <button key={m.year} className={"ao-tick" + (i === active ? " is-active" : "")}
              onClick={() => { centerFrame(i); }}>
              <span className="ao-tick__dot"></span>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="ao-reelwrap">
        <div className="ao-reel-sprocket ao-reel-sprocket--top" aria-hidden="true"></div>
        <div className="ao-reel" ref={reelRef}>
          {AO_MILESTONES.map((m, i) => (
            <div className={"ao-frame" + (i === active ? " is-active" : "")} key={m.year} ref={(el) => (frameRefs.current[i] = el)}>
              <div className="ao-frame__card">
                <div className="ao-frame__pic">
                  <img className="ao-frame__img" src={(window.__resources && window.__resources["tl" + m.year]) || ("assets/slots/ao-tl-" + m.year + ".webp")} alt={m.cap} />
                  <span className="ao-frame__year">{m.year}</span>
                  <span className="ao-frame__pic-vig"></span>
                </div>
                <p className="ao-frame__cap">{m.cap}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="ao-reel-sprocket ao-reel-sprocket--bot" aria-hidden="true"></div>
        <button className="ao-arrow ao-arrow--prev" aria-label="Previous chapter" onClick={() => step(-1)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <button className="ao-arrow ao-arrow--next" aria-label="Next chapter" onClick={() => step(1)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
    </section>
  );
}

function AboutOrigin() {
  return (
    <React.Fragment>
      <AboutOriginTeaser />
      <AboutOriginStory />
      <AboutOriginTimeline />
    </React.Fragment>
  );
}

window.AboutOrigin = AboutOrigin;
