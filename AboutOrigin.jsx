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
  const [videoOpen, setVideoOpen] = useAoState(false);
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
      {videoOpen && ReactDOM.createPortal(
        <div className="ao-vmodal" role="dialog" aria-modal="true" onClick={() => setVideoOpen(false)}>
          <button className="ao-vmodal__x" aria-label="Close" onClick={() => setVideoOpen(false)}>×</button>
          <div className="ao-vmodal__frame" onClick={e => e.stopPropagation()}>
            <div className="ao-vmodal__placeholder">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="31" stroke="rgba(232,183,119,0.5)" strokeWidth="1.5"/>
                <polygon points="26,20 50,32 26,44" fill="url(#vplay)" />
                <defs><linearGradient id="vplay" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#BF8753"/><stop offset="50%" stopColor="#FAC288"/><stop offset="100%" stopColor="#C9915C"/></linearGradient></defs>
              </svg>
              <p>Video placeholder &mdash; replace <code>src</code> with the real URL</p>
            </div>
            {/* Swap the div above for: <iframe src="YOUR_VIDEO_URL" allow="autoplay" allowFullScreen /> */}
          </div>
        </div>,
        document.body
      )}
      <div className="ao-teaser__inner">
        <h2 className="ao-teaser__headline">
          <span className="ao-th-serif">
            <span className="ab-textured">The b</span><button
              className="ao-play-o"
              aria-label="Watch Ted's story"
              onClick={() => setVideoOpen(true)}
            >
              <svg className="ao-play-o__svg" viewBox="0 0 100 100" aria-hidden="true">
                <defs>
                  <pattern id="aoGoldTex" patternUnits="userSpaceOnUse" width="100" height="100">
                    <image href="assets/heading-texture.jpg" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
                  </pattern>
                </defs>
                <circle cx="50" cy="50" r="45" fill="none" stroke="url(#aoGoldTex)" strokeWidth="7" />
                <polygon points="41,29 73,50 41,71" fill="url(#aoGoldTex)" />
              </svg>
            </button><span className="ab-textured">y who reached</span>
          </span>
          <span className="ao-th-sans">for the camera.</span>
        </h2>
        <div className="ao-teaser__body">
          <p>He was 6 years old when he first asked the question that would define his life:<br /><span className="ao-q">&ldquo;What does that button do?&rdquo;</span></p>
          <p>His father handed him the camera. And something woke up.</p>
          <p className="ao-teaser__bio">Forty years later, Ted Saunders has directed everything from Burning Man documentaries to Salesforce campaigns. He has built studios, lost everything, found himself in the dark, and come back with a philosophy that runs through every frame he shoots.</p>
        </div>
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
          <p className="ao-story__sub">A camera became more than a tool. It became a portal for his greatest impact.</p>
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
  { year: "1984", label: "1984", imgSrc: "assets/slots/ao-tl-1984.jpg",
    cap: "Little Teddy is Born",
    desc: "Growing up in the safe suburbs of Newton Massachusetts, Teddy's father would always have a camcorder around to archive the family. By the age of 6 Teddy was using the camera to make stop-motion animations of chess pieces, and create digital-magic tricks to show his friends on TV. With a passion for sci-fi and fantasy, Teddy has a huge imagination and hunger to explore and innovate, as he would build his own computers and push the limits of technology." },
  { year: "1990s", label: "1990s–2000s",
    cap: "A Rebel Creator",
    desc: "In middle school and high school, when other students went on to play football after school, Ted would gather his friends to direct action films. Using fake blood packets and fireworks as special effects, he would go on to become an award-winning creator for his local TV station. In college he then studied TV production, excelling as the teachers pet in all film and TV related classes. All while producing hip-hop music on the side. Immediately upon graduating college at Boston University, Ted then moves to Hollywood to become the personal assistant for his favorite actor on his favorite TV show, after Steve Martin's masseuse tells him to pretend to be a celebrity assistant and introduces him to Jeremy Piven." },
  { year: "2007", label: "2007", imgSrc: "assets/slots/ao-tl-2007.png",
    cap: "Assistant to Jeremy Piven",
    desc: "Ted Spent a year with Jeremy Piven, who at the time has just won his second Emmy for Entourage. Jeremy was Ted's favorite actor on Teds favorite show. together they did a feature film with Will Ferrel, Entourage season 5 and a Broadway play in Manhattan." },
  { year: "2008", label: "2008",
    cap: "Assistant to Greg Yaitanes",
    desc: "Greg was the Co-Executive Producer and director of House MD, which was the number one drama on TV at the time. While working with Greg, Ted created the first ever iPhone app for a TV show, bringing fans behind the scenes to access bonus materials and watch secret content that Ted would shoot on set." },
  { year: "2010", label: "2010",
    cap: "Tedshots Productions",
    desc: "Ted leaves the corporate TV world to create Tedshots Productions. With a clear schedule Ted gets back to film and photography. In the process he gets invited to Burning man and conscious music festivals, where he applies his talent to share the festival culture in a way that nobody has before- with original narrative films." },
  { year: "2012", label: "2012",
    cap: "Ted “Disrupts” Burning Man",
    desc: "Ted releases “Oh, The Places You'll Go at Burning Man” which goes viral, reaching the front page of Reddit and the Huffington Post. This triples Burning Man's ticket sales, selling them out for the first time. As a result Salesforce.com hires ted, at age 26, to spearhead global marketing videos for them, including many animated videos." },
  { year: "2013", label: "2013",
    cap: "Infinit Studios is Born",
    desc: "With Tedshots Productions growing into a team that is bigger than just him, Ted launches Infinit Studios, a creative agency, to focus not just on film, but also on animations, web, graphic and social media. To this day Infinit still serves clients in all of these departments, with a heavy focus on AI." },
  { year: "2018", label: "2018",
    cap: "Death of his Father",
    desc: "After a five year battle with mental health, Teds father, who ran a global Architecture magazine at Harvard, passes away. This begins Ted's journey into the shadows, and his early years of true manhood, as he is now the sole patriarch of his mother and sister. This elevated his passion for natural medicine and wellness, having witnessed first hand how western medicine kept his father in a “corrupt” trap of pharmacology and western therapy." },
  { year: "2022", label: "2022",
    cap: "Death of Mother",
    desc: "After an unexpected diagnosis of stage 3 cancer, after 10 months of being undiscovered and wrongly diagnosed, Ted's mother also falls to the perils of western medicine, with radiation quickly sending her to terminal stage four. Ted spends a week by his moms side, ushering her into her full transition, witnessing her last breaths. This was the peak of teds explorations of the shadow, and helped shape Ted into the man and philosopher he is today, as it also caused him to fall into the grips of addition and darkness, where he also nearly lost his life in the process." },
  { year: "2023", label: "2023",
    cap: "Engagement with Zoe",
    desc: "Returning from his shadow, Ted re-kindles his relationship with his long time beloved, Zoe Dane, and proposes to her on a hot air balloon. Shortly after, they move to Austin, TX and buy a house together.",
    href: "https://www.youtube.com/watch?v=l-SHU1q1FtI" },
  { year: "2024", label: "2024",
    cap: "The Fated is Born from the Shadows",
    desc: "Ted writes his third script, The Fated, which is a save-the world sci fi adventure co-written by Bonnay Bartron. It took 6 months just to build the lore, backstory and physics of how the world works and then another 6 months to write the script. The Fated is Ted's biggest IP to date, as it tells the tale of harmonizing the worlds darkness and light back into balance." },
  { year: "2026", label: "2026",
    cap: "The Launch of Tedsaunders.com",
    href: "https://tedsaunders.com",
    hrefLabel: "tedsaunders.com →",
    desc: "Ted partners with Influex to launch his personal website, showcasing the multiverse of creations that Ted has created in his lifetime. This website is an experiment in transparency as well as a digital legacy. Today Teddy is excited to explore new realms of innovation and creation and he is pleased that you can join him in his quest to beautify humanity by celebrating the raw truth and opportunity of the human experience." },
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
                  <img className="ao-frame__img" src={(window.__resources && window.__resources["tl" + m.year]) || m.imgSrc || ("assets/slots/ao-tl-" + m.year + ".webp")} alt={m.cap} />
                  <span className="ao-frame__year">{m.label}</span>
                  <span className="ao-frame__pic-vig"></span>
                </div>
                <p className="ao-frame__cap">{m.cap}</p>
                {m.desc && <p className="ao-frame__desc">{m.desc}{m.href && <> <a className="ao-frame__link" href={m.href} target="_blank" rel="noopener noreferrer">{m.hrefLabel || "(Watch \u2192)"}</a></>}</p>}
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
