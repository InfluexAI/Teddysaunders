// CompassOrrery.jsx — "Ted's Compass of Creations".
// A cinematic ORRERY COMPASS: storytelling is the sun at the center; eight
// creative expressions orbit it on engraved brass rings. Scroll drives the
// whole machine's rotation; whichever node reaches the top pointer becomes
// "active" and updates the editorial panel on the left. Rendered OUTSIDE the
// scaled stage so the pinned scroll + true-scale geometry work correctly.
const { useRef: useCoRef, useEffect: useCoEffect, useState: useCoState } = React;

const COMPASS_NODES = [
  { dir: "N",  key: "plots",    name: "TedPlots",    disc: "Original Films",
    tag: "Films that change how you see the world.",
    panel: "Films that change how you see the world.",
    cta: "Explore Films" },
  { dir: "NW", key: "props",    name: "TedProps",    disc: "Acting Portfolio",
    tag: "Expression through embodied acting.",
    panel: "Expression through embodied acting.",
    cta: "Explore Acting" },
  { dir: "W",  key: "thoughts", name: "TedThoughts", disc: "Philosophy & Poetry",
    tag: "Philosophy for people who dare to think different.",
    panel: "Philosophy for people who dare to think different.",
    cta: "Explore Philosophy" },
  { dir: "SW", key: "crops",    name: "TedCrops",    disc: "Hair Design",
    tag: "Elevating style with future-ancient designs.",
    panel: "Elevating style with future ancient designs.",
    cta: "Explore Design" },
  { dir: "S",  key: "unlocks",  name: "TedUnlocks",  disc: "Men\u2019s Coaching",
    tag: "Coaching for men ready to build a meaningful life.",
    panel: "Coaching for men ready to build a meaningful life.",
    cta: "Explore Coaching" },
  { dir: "SE", key: "bots",     name: "TedBots",     disc: "Software Engineering",
    tag: "Technology in service of human storytelling.",
    panel: "Technology in service of human storytelling.",
    cta: "Explore Technology" },
  { dir: "E",  key: "drops",    name: "TedDrops",    disc: "Music & DJing",
    tag: "Music built to melt your insides and awaken your mind.",
    panel: "Music built to melt your insides and awaken your mind.",
    cta: "Explore Music" },
  { dir: "NE", key: "shots",    name: "TedShots",    disc: "Photography",
    tag: "Photography that celebrates the beauty of all people.",
    panel: "Photography that celebrates the beauty of all people.",
    cta: "Explore Photography" },
];

// Cinematic preview placeholder for each destination — a distinct warm tint,
// soft vignette, the category name and a faint engraving. Built as a data-URI
// <img> so swapping in a real still later is a one-line src change per node.
function compassPreview(key, name, tint, sub) {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const caption = esc((sub || "Cinematic Preview").toUpperCase());
  const safeName = esc(name);
  const [c1, c2] = tint || ["#2A1C10", "#0A0703"];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='720' height='460' viewBox='0 0 720 460'><rect width='720' height='460' fill='${c2}'/><rect width='720' height='460' fill='${c1}' opacity='0.7'/><rect width='720' height='460' fill='#000000' opacity='0.3'/><text x='40' y='402' font-family='ui-monospace,monospace' font-size='15' letter-spacing='5' fill='#F7DBA0' fill-opacity='0.6'>${safeName}</text><text x='40' y='428' font-family='ui-monospace,monospace' font-size='12' letter-spacing='3' fill='#FFEACA' fill-opacity='0.32'>${caption}</text></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

// Per-destination tints (warm brass family, each shifted so every chapter
// reads as its own visual world).
const COMPASS_TINTS = {
  plots:    ["#5A3A1E", "#241408"],
  props:    ["#5E2E2A", "#241010"],
  thoughts: ["#3E3A5A", "#161426"],
  crops:    ["#5A4A22", "#231C0C"],
  unlocks:  ["#6A4420", "#281806"],
  bots:     ["#2E4A50", "#0E1E22"],
  drops:    ["#4A2E5A", "#1A0F24"],
  shots:    ["#6A5230", "#281D0E"],
};

function CompassOrrery({ onActivate }) {
  const rootRef = useCoRef(null);
  const rotorRef = useCoRef(null);    // SVG group that visibly rotates (spokes/ticks)
  const nodesRef = useCoRef([]);      // the 8 HTML medallions
  const [active, setActive] = useCoState(0);
  const [hoverIdx, setHoverIdx] = useCoState(null);
  const activeRef = useCoRef(0);
  const targetAngleRef = useCoRef(0);  // continuous target rotation (deg)
  const currentAngleRef = useCoRef(0); // live spring angle (deg)
  const goToRef = useCoRef(null);      // click handler set up inside effect
  const userInteractedRef = useCoRef(false);  // stops auto-rotate once user clicks
  const autoTimerRef = useCoRef(null);        // single shared auto-rotate interval
  const N = COMPASS_NODES.length;

  useCoEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stage = root.querySelector(".orrery-stage");
    const STEP = 360 / N;                 // 45° between notches

    const place = (spinDeg) => {
      const rect = stage.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const radius = Math.min(rect.width, rect.height) * 0.40;
      for (let i = 0; i < N; i++) {
        const el = nodesRef.current[i];
        if (!el) continue;
        const baseAngle = i * STEP;       // 0 = top, clockwise
        const a = (baseAngle + spinDeg) * Math.PI / 180;
        el.style.left = (cx + radius * Math.sin(a)) + "px";
        el.style.top = (cy - radius * Math.cos(a)) + "px";
      }
    };

    // ---- Click → destination. Whichever node is clicked rotates to the top
    //      pointer via a weighted spring (accelerate, overshoot, settle). No
    //      scroll lock — the visitor drives the machine directly. ----
    const stopAuto = () => {
      if (autoTimerRef.current) { clearInterval(autoTimerRef.current); autoTimerRef.current = null; }
    };
    const goTo = (i, isAuto) => {
      if (!isAuto) { userInteractedRef.current = true; stopAuto(); }  // manual disables auto
      let desired = -i * STEP;
      const cur = currentAngleRef.current;
      while (desired - cur > 180) desired -= 360;   // always take the short way
      while (desired - cur < -180) desired += 360;
      targetAngleRef.current = desired;
      activeRef.current = i;
      setActive(i);
      if (onActivate) onActivate(COMPASS_NODES[i]);
    };
    goToRef.current = goTo;

    // ---- Auto-rotate: advance one expression every 5.5s until the visitor
    //      takes manual control. Guarded so only ONE interval ever runs. ----
    stopAuto();
    if (!userInteractedRef.current) {
      autoTimerRef.current = setInterval(() => {
        if (userInteractedRef.current) { stopAuto(); return; }
        goTo((activeRef.current + 1) % N, true);
      }, 5500);
    }

    // ---- Weighted spring: accelerate, overshoot 3–5°, recoil, settle ----
    let current = 0, velocity = 0, raf = 0;
    const STIFF = 0.055, DAMP = 0.78;      // underdamped → mechanical overshoot
    const tick = () => {
      const target = targetAngleRef.current;
      velocity += (target - current) * STIFF;
      velocity *= DAMP;
      current += velocity;
      currentAngleRef.current = current;
      if (rotorRef.current) rotorRef.current.style.transform = `rotate(${current}deg)`;
      place(current);
      raf = requestAnimationFrame(tick);
    };

    targetAngleRef.current = -activeRef.current * STEP;
    current = targetAngleRef.current;
    currentAngleRef.current = current;
    tick();
    const onResize = () => place(current);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      stopAuto();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Panel content is driven only by the locked destination — exactly one
  // active at a time. Hover merely highlights a disc, it doesn't switch chapters.
  const node = COMPASS_NODES[active];

  // Concentric ring radii (in the 1000-unit SVG space)
  const rings = [488, 430, 372, 300, 232];

  return (
    <section className="tk-compass" ref={rootRef}>
      <div className="compass-bg" aria-hidden="true">
        <div className="compass-photo" />
        <div className="compass-vignette" />
        <div className="compass-dust" />
      </div>

      <div className="compass-pin">
        <div className="compass-header">
          <div className="compass-eyebrow">Ted&rsquo;s Compass of Creations</div>
          <h2 className="compass-head">One obsession. Eight expressions.</h2>
          <p className="compass-sub">
            Over four decades, Ted Saunders built an interconnected creative universe
            spanning cinema, philosophy, music, photography, storytelling, AI, and
            transformation. Each point on the compass is another expression of the same
            question: what does it mean to be fully human?
          </p>
        </div>
        <div className="compass-grid">
          {/* LEFT — active destination */}
          <div className="compass-left">

            <div className="compass-active" key={active}>
              <div className="compass-active__head">
                <span className="compass-active__badge"><CompassIcon name={node.key} size={22} /></span>
                <span className="compass-active__num">Expression {String(active + 1).padStart(2, "0")} &middot; {node.dir}</span>
              </div>
              <div className="compass-active__name">{node.name}</div>
              <div className="compass-active__preview">
                <img src={compassPreview(node.key, node.name, COMPASS_TINTS[node.key], node.disc)} alt={node.name + " preview"} />
                <span className="compass-active__previewedge" />
              </div>
              <p className="compass-active__desc">{node.panel}</p>
              <button className="compass-active__cta" onClick={() => onActivate && onActivate(node)}>
                {node.cta}
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>

          {/* Brass connector — ties the active node (top pointer) to the panel */}
          <div className="compass-link" aria-hidden="true">
            <span className="compass-link__dot" />
            <span className="compass-link__line" />
          </div>

          {/* RIGHT — the orrery machine */}
          <div className="compass-right">
            <div className="orrery-stage">
              <svg className="orrery-svg" viewBox="0 0 1000 1000" aria-hidden="true">
                <defs>
                  <radialGradient id="brassCore" cx="42%" cy="38%" r="70%">
                    <stop offset="0%" stopColor="#FBE6B8" />
                    <stop offset="42%" stopColor="#C9A24B" />
                    <stop offset="100%" stopColor="#5A4220" />
                  </radialGradient>
                  <linearGradient id="brassRing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#9C7B38" />
                    <stop offset="28%" stopColor="#F4D58E" />
                    <stop offset="55%" stopColor="#A9863F" />
                    <stop offset="80%" stopColor="#E8C98A" />
                    <stop offset="100%" stopColor="#6E5226" />
                  </linearGradient>
                  <path id="ringText" d="M500,500 m-454,0 a454,454 0 1,1 908,0 a454,454 0 1,1 -908,0" />
                </defs>

                {/* Engraved outer text ring */}
                <circle cx="500" cy="500" r="488" fill="none" stroke="url(#brassRing)" strokeWidth="2" opacity="0.85" />
                <circle cx="500" cy="500" r="454" fill="none" stroke="#3A2C16" strokeWidth="30" opacity="0.55" />
                <circle cx="500" cy="500" r="454" fill="none" stroke="url(#brassRing)" strokeWidth="1.2" opacity="0.7" />

                {/* Static concentric rings */}
                {rings.map((r, i) => (
                  <circle key={r} cx="500" cy="500" r={r} fill="none"
                          stroke="url(#brassRing)" strokeWidth={i === 0 ? 2.4 : 1.2}
                          opacity={0.32 + i * 0.06} />
                ))}

                {/* Fine tick ring */}
                <g opacity="0.5">
                  {Array.from({ length: 120 }).map((_, i) => {
                    const a = (i * 3) * Math.PI / 180;
                    const r1 = 372, r2 = i % 5 === 0 ? 356 : 364;
                    return <line key={i}
                      x1={500 + r1 * Math.sin(a)} y1={500 - r1 * Math.cos(a)}
                      x2={500 + r2 * Math.sin(a)} y2={500 - r2 * Math.cos(a)}
                      stroke="#D9B96B" strokeWidth="1" />;
                  })}
                </g>

                {/* Rotating mechanism — spokes + gear teeth + orbit ring */}
                <g ref={rotorRef} style={{ transformOrigin: "500px 500px" }}>
                  <circle cx="500" cy="500" r="400" fill="none" stroke="url(#brassRing)" strokeWidth="3" opacity="0.85" />
                  {Array.from({ length: 72 }).map((_, i) => {
                    const a = (i * 5) * Math.PI / 180;
                    const r1 = 400, r2 = 412;
                    return <line key={i}
                      x1={500 + r1 * Math.sin(a)} y1={500 - r1 * Math.cos(a)}
                      x2={500 + r2 * Math.sin(a)} y2={500 - r2 * Math.cos(a)}
                      stroke="#C9A24B" strokeWidth="2" opacity="0.7" />;
                  })}
                  {COMPASS_NODES.map((_, i) => {
                    const a = (i * 45) * Math.PI / 180;
                    return <line key={i}
                      x1={500 + 120 * Math.sin(a)} y1={500 - 120 * Math.cos(a)}
                      x2={500 + 400 * Math.sin(a)} y2={500 - 400 * Math.cos(a)}
                      stroke="url(#brassRing)" strokeWidth="3" opacity="0.6" />;
                  })}
                </g>

                {/* Center hub ring */}
                <circle cx="500" cy="500" r="120" fill="#120C06" stroke="url(#brassRing)" strokeWidth="3" />
                <circle cx="500" cy="500" r="132" fill="none" stroke="url(#brassRing)" strokeWidth="1.2" opacity="0.6" />
              </svg>

              {/* Top pointer / indicator */}
              <div className="orrery-pointer" aria-hidden="true">
                <svg viewBox="0 0 24 28" width="26" height="30"><path d="M12 28 L2 4 Q12 10 22 4 Z" fill="url(#brassRing)" stroke="#FBE6B8" strokeWidth="0.8" /></svg>
              </div>

              {/* Center medallion (fixed, sacred) */}
              <div className="orrery-core">
                <div className="orrery-core__inner">
                  <img
                    className="orrery-core__mark"
                    src={(window.__resources && window.__resources.logoMark) || "assets/logo-mark.png"}
                    alt="Ted Saunders"
                  />
                </div>
              </div>

              {/* Orbiting destination medallions (positioned by JS) */}
              {COMPASS_NODES.map((d, i) => (
                <div key={d.name}
                     ref={(el) => (nodesRef.current[i] = el)}
                     className={"orrery-node" + (i === active ? " is-active" : "") + (i === hoverIdx ? " is-hover" : "")}
                     onMouseEnter={() => setHoverIdx(i)}
                     onMouseLeave={() => setHoverIdx(null)}
                     onClick={() => goToRef.current && goToRef.current(i)}>
                  <div className="orrery-node__disc">
                    <CompassIcon name={d.key} size={38} />
                  </div>
                  <div className="orrery-node__label">{d.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.CompassOrrery = CompassOrrery;
