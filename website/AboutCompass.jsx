// AboutCompass.jsx — the TedOps Compass as a scroll-driven navigator.
//
// MEDIA CONCEPT (from brief): the compass starts centered & full, then as you
// scroll it docks to the left edge (only ~half visible) and rotates. Each notch
// brings one expression to the fixed right-pointing pointer; the editorial panel
// on the right cross-fades to that expression's thumbnail, header, subheader and
// call-to-action. Rendered at true viewport scale with a sticky pin.
const { useRef: useAcRef, useEffect: useAcEffect, useState: useAcState } = React;

// Scroll order = clockwise by compass bearing (N → NE → E → … → NW).
const AB_NODES = [
  { key: "plots",    name: "TedPlots",    medium: "Films",        dir: "N",  angle: 0,
    desc: "Films that change how you see the world.",            cta: "Explore Films" },
  { key: "shots",    name: "TedShots",    medium: "Photography",  dir: "NE", angle: 45,
    desc: "Photography that celebrates the beauty of all people.", cta: "Explore Photography" },
  { key: "drops",    name: "TedDrops",    medium: "Music",        dir: "E",  angle: 90,
    desc: "Music built to melt your insides and awaken your mind.", cta: "Explore Music" },
  { key: "bots",     name: "TedBots",     medium: "Technology",   dir: "SE", angle: 135,
    desc: "Technology in service of human storytelling.",        cta: "Explore Technology" },
  { key: "unlocks",  name: "TedUnlocks",  medium: "Coaching",     dir: "S",  angle: 180,
    desc: "Coaching for men ready to build a meaningful life.",   cta: "Explore Coaching" },
  { key: "crops",    name: "TedCrops",    medium: "Hair & Clothing Design", dir: "SW", angle: 225,
    desc: "Elevating style with future-ancient designs.",        cta: "Explore Design" },
  { key: "thoughts", name: "TedThoughts", medium: "Philosophy",   dir: "W",  angle: 270,
    desc: "Philosophy for people who dare to think different.",   cta: "Explore Philosophy" },
  { key: "props",    name: "TedProps",    medium: "Acting",       dir: "NW", angle: 315,
    desc: "Expression through embodied acting.",                 cta: "Explore Acting" },
];

const AB_TINTS = {
  plots:    ["#5A3A1E", "#241408"], shots:   ["#6A5230", "#281D0E"],
  drops:    ["#4A2E5A", "#1A0F24"], bots:    ["#2E4A50", "#0E1E22"],
  unlocks:  ["#6A4420", "#281806"], crops:   ["#5A4A22", "#231C0C"],
  thoughts: ["#3E3A5A", "#161426"], props:   ["#5E2E2A", "#241010"],
};

// Cinematic preview placeholder per destination (swap src for a real still later).
function abPreview(name, medium, tint) {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const nm = esc(name.toUpperCase()), md = esc(medium.toUpperCase());
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='760' height='480' viewBox='0 0 760 480'>
    <defs>
      <radialGradient id='g' cx='36%' cy='30%' r='95%'>
        <stop offset='0%' stop-color='${tint[0]}'/><stop offset='60%' stop-color='${tint[1]}'/><stop offset='100%' stop-color='#080502'/>
      </radialGradient>
      <linearGradient id='v' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='52%' stop-color='rgba(0,0,0,0)'/><stop offset='100%' stop-color='rgba(8,5,2,0.9)'/>
      </linearGradient>
      <pattern id='s' width='34' height='34' patternUnits='userSpaceOnUse' patternTransform='rotate(38)'>
        <line x1='0' y1='0' x2='0' y2='34' stroke='rgba(247,219,160,0.07)' stroke-width='1'/>
      </pattern>
    </defs>
    <rect width='760' height='480' fill='url(#g)'/><rect width='760' height='480' fill='url(#s)'/><rect width='760' height='480' fill='url(#v)'/>
    <text x='44' y='418' font-family='ui-monospace, monospace' font-size='16' letter-spacing='6' fill='rgba(247,219,160,0.62)'>${nm}</text>
    <text x='44' y='446' font-family='ui-monospace, monospace' font-size='12' letter-spacing='4' fill='rgba(255,234,202,0.34)'>${md} · CINEMATIC PREVIEW</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };

function PanelSlide({ node, idx, onCta, slideRef }) {
  return (
    <div className="ab-panel__slide" ref={slideRef}>
      <div className="ab-panel__meta">
        <span className="ab-panel__badge"><CompassIcon name={node.key} size={24} /></span>
        <span className="ab-panel__num">Expression {String(idx + 1).padStart(2, "0")} · {node.dir}</span>
      </div>
      <h3 className="ab-panel__name ab-textured">{node.name}</h3>
      <p className="ab-panel__medium">{node.medium}</p>
      <div className="ab-panel__thumb">
        <img src={abPreview(node.name, node.medium, AB_TINTS[node.key])} alt={node.name + " preview"} />
        <span className="ab-panel__play"><PlayTriangle size={26} id={"abp-" + node.key} /></span>
      </div>
      <p className="ab-panel__desc">{node.desc}</p>
      <button className="ab-panel__cta" onClick={() => onCta && onCta(node)}>
        {node.cta}
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>
    </div>
  );
}

function AboutCompass({ onActivate }) {
  const N = AB_NODES.length;
  const OVERVIEW_END = 0.10, DOCK_END = 0.20;
  const sectionRef = useAcRef(null);
  const compassRef = useAcRef(null);
  const dialRef = useAcRef(null);
  const nodeRefs = useAcRef([]);
  const innerRefs = useAcRef([]);
  const slideRefs = useAcRef([]);
  const dotRefs = useAcRef([]);
  const dotsRef = useAcRef(null);
  const pointerRef = useAcRef(null);
  const panelRef = useAcRef(null);
  const activeRef = useAcRef(-1);
  const [mobile, setMobile] = useAcState(
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );

  // Click a node (or the dots) to scroll the page to that expression's position.
  // Uses a rAF tween rather than native smooth scrollTo (the object-form smooth
  // scroll is a silent no-op inside the preview iframe).
  const goToIndex = (i) => {
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    const p = DOCK_END + (i / (N - 1)) * (1 - DOCK_END);
    const target = section.getBoundingClientRect().top + window.scrollY + p * total;
    const start = window.scrollY;
    const dist = target - start;
    if (Math.abs(dist) < 2) return;
    const dur = Math.min(900, 300 + Math.abs(dist) * 0.35);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { window.scrollTo(0, target); return; }
    const t0 = performance.now();
    const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      window.scrollTo(0, start + dist * ease(k));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useAcEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onMq = () => setMobile(mq.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useAcEffect(() => {
    if (mobile) return;                       // mobile uses the static fallback below
    const section = sectionRef.current;
    const compass = compassRef.current;
    const dial = dialRef.current;
    if (!section || !compass || !dial) return;

    const R0 = 90;                            // Plots(N) parked at the east pointer

    // Place each node at its fixed bearing on the dial (in px, unscaled layout size).
    const place = () => {
      const size = compass.offsetWidth;
      const r = size * 0.38;
      AB_NODES.forEach((nd, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;
        const a = nd.angle * Math.PI / 180;
        el.style.transform = `translate(${r * Math.sin(a)}px, ${-r * Math.cos(a)}px)`;
      });
    };

    let raf = 0;
    const frame = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = clamp(-rect.top / total, 0, 1);

      const dock = smooth(OVERVIEW_END, DOCK_END, p);
      const dockX = dock * (-window.innerWidth * 0.45);
      const scale = 1.0 - 0.06 * smooth(0, DOCK_END, p);

      let indexFloat = 0;
      if (p >= DOCK_END) indexFloat = ((p - DOCK_END) / (1 - DOCK_END)) * (N - 1);
      const Rdeg = R0 - 45 * indexFloat;

      compass.style.transform = `translate(-50%, -50%) translateX(${dockX}px) scale(${scale})`;
      dial.style.transform = `rotate(${Rdeg}deg)`;
      innerRefs.current.forEach((el) => { if (el) el.style.transform = `rotate(${-Rdeg}deg)`; });

      // panel fades in with the dock
      if (panelRef.current) panelRef.current.style.opacity = String(dock);
      // pointer only appears once the compass has docked left
      if (pointerRef.current) pointerRef.current.style.opacity = String(dock);
      // progress dots only appear once the compass has docked left
      if (dotsRef.current) {
        dotsRef.current.style.opacity = String(dock);
        dotsRef.current.style.pointerEvents = dock > 0.5 ? "auto" : "none";
      }

      // per-slide cross-fade
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = indexFloat - i;
        const op = clamp(1 - Math.abs(d) * 1.5, 0, 1) * dock;
        el.style.opacity = String(op);
        el.style.transform = `translateY(${d * 30}px)`;
        el.classList.toggle("is-on", op > 0.6);
      });

      const active = p < OVERVIEW_END ? -1 : clamp(Math.round(indexFloat), 0, N - 1);
      if (active !== activeRef.current) {
        activeRef.current = active;
        nodeRefs.current.forEach((el, i) => el && el.classList.toggle("is-active", i === active));
        dotRefs.current.forEach((el, i) => el && el.classList.toggle("on", i === active));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame); };

    place();
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { place(); frame(); });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mobile]);

  // engraved brass dial artwork
  const rings = [486, 430, 372, 300, 232];
  const dialSvg = (
    <svg className="ab-comp__svg" viewBox="0 0 1000 1000" aria-hidden="true">
      <defs>
        <linearGradient id="abBrass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9C7B38" /><stop offset="28%" stopColor="#F4D58E" />
          <stop offset="55%" stopColor="#A9863F" /><stop offset="80%" stopColor="#E8C98A" />
          <stop offset="100%" stopColor="#6E5226" />
        </linearGradient>
      </defs>
      <circle cx="500" cy="500" r="486" fill="none" stroke="url(#abBrass)" strokeWidth="2" opacity="0.85" />
      <circle cx="500" cy="500" r="454" fill="none" stroke="#3A2C16" strokeWidth="26" opacity="0.5" />
      <circle cx="500" cy="500" r="454" fill="none" stroke="url(#abBrass)" strokeWidth="1.2" opacity="0.7" />
      {rings.map((r, i) => (
        <circle key={r} cx="500" cy="500" r={r} fill="none" stroke="url(#abBrass)"
                strokeWidth={i === 0 ? 2.2 : 1.1} opacity={0.3 + i * 0.06} />
      ))}
      <g opacity="0.5">
        {Array.from({ length: 120 }).map((_, i) => {
          const a = (i * 3) * Math.PI / 180, r1 = 372, r2 = i % 5 === 0 ? 354 : 364;
          return <line key={i} x1={500 + r1 * Math.sin(a)} y1={500 - r1 * Math.cos(a)}
            x2={500 + r2 * Math.sin(a)} y2={500 - r2 * Math.cos(a)} stroke="#D9B96B" strokeWidth="1" />;
        })}
      </g>
      <circle cx="500" cy="500" r="400" fill="none" stroke="url(#abBrass)" strokeWidth="2.6" opacity="0.8" />
      {AB_NODES.map((_, i) => {
        const a = (i * 45) * Math.PI / 180;
        return <line key={i} x1={500 + 130 * Math.sin(a)} y1={500 - 130 * Math.cos(a)}
          x2={500 + 400 * Math.sin(a)} y2={500 - 400 * Math.cos(a)}
          stroke="url(#abBrass)" strokeWidth="2.4" opacity="0.55" />;
      })}
    </svg>
  );

  // ---------- MOBILE: static compass + stacked cards ----------
  if (mobile) {
    return (
      <section className="ab-compass ab-compass--mobile">
        <div className="ab-comp-static">
          <div className="ab-comp" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "none" }}>
            <div className="ab-comp__dial" style={{ transform: "none" }}>{dialSvg}
              {AB_NODES.map((nd, i) => {
                const a = nd.angle * Math.PI / 180;
                return (
                  <div key={nd.key} className="ab-node"
                       style={{ transform: `translate(${38 * Math.sin(a)}%, ${-38 * Math.cos(a)}%)` }}>
                    <div className="ab-node__inner">
                      <div className="ab-node__disc"><CompassIcon name={nd.key} size={22} /></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="ab-comp__core">
              <div className="ab-comp__core-name">Ted<br />Saunders</div>
              <div className="ab-comp__core-rule" />
              <div className="ab-comp__core-sub">Storytelling</div>
            </div>
          </div>
        </div>
        {AB_NODES.map((nd, i) => (
          <div className="ab-mcard" key={nd.key}>
            <div className="ab-panel__meta">
              <span className="ab-panel__badge"><CompassIcon name={nd.key} size={22} /></span>
              <span className="ab-panel__num">Expression {String(i + 1).padStart(2, "0")} · {nd.dir}</span>
            </div>
            <h3 className="ab-mcard__name ab-textured">{nd.name}</h3>
            <p className="ab-mcard__medium">{nd.medium}</p>
            <div className="ab-mcard__thumb"><img src={abPreview(nd.name, nd.medium, AB_TINTS[nd.key])} alt="" /></div>
            <p className="ab-mcard__desc">{nd.desc}</p>
            <button className="ab-panel__cta" onClick={() => onActivate && onActivate(nd)}>
              {nd.cta}
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        ))}
      </section>
    );
  }

  // ---------- DESKTOP: pinned scroll navigator ----------
  return (
    <section className="ab-compass" ref={sectionRef} style={{ height: "calc(100vh * 9.5)" }}>
      <div className="ab-compass__stage">
        <div className="ab-compass__glow" aria-hidden="true" />
        <div className="ab-compass__grain" aria-hidden="true" />
        <div className="ab-compass__vignette" aria-hidden="true" />

        {/* the instrument */}
        <div className="ab-comp" ref={compassRef}>
          <div className="ab-comp__dial" ref={dialRef}>
            {dialSvg}
            {AB_NODES.map((nd, i) => (
              <div key={nd.key} className="ab-node" ref={(el) => (nodeRefs.current[i] = el)}
                   onClick={() => goToIndex(i)} role="button" aria-label={"Go to " + nd.name}>
                <div className="ab-node__inner" ref={(el) => (innerRefs.current[i] = el)}>
                  <div className="ab-node__disc"><CompassIcon name={nd.key} size={46} /></div>
                  <div className="ab-node__label">{nd.name}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="ab-comp__core">
            <div className="ab-comp__core-name">Ted<br />Saunders</div>
            <div className="ab-comp__core-rule" />
            <div className="ab-comp__core-sub">Storytelling</div>
          </div>
          <div className="ab-comp__pointer" ref={pointerRef} aria-hidden="true">
            <svg viewBox="0 0 28 24" width="30" height="26"><path d="M28 12 L4 2 Q10 12 4 22 Z" fill="url(#abBrass)" stroke="#FBE6B8" strokeWidth="0.8" /></svg>
          </div>
        </div>

        {/* editorial panel */}
        <div className="ab-panel" ref={panelRef} style={{ opacity: 0 }}>
          <div className="ab-panel__card">
            {AB_NODES.map((nd, i) => (
              <PanelSlide key={nd.key} node={nd} idx={i} onCta={onActivate}
                          slideRef={(el) => (slideRefs.current[i] = el)} />
            ))}
          </div>
        </div>

        {/* progress dots */}
        <div className="ab-compass__dots" ref={dotsRef} style={{ opacity: 0 }}>
          {AB_NODES.map((nd, i) => (
            <i key={nd.key} ref={(el) => (dotRefs.current[i] = el)}
               onClick={() => goToIndex(i)} role="button" aria-label={"Go to " + nd.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

window.AboutCompass = AboutCompass;
