// App.jsx — assembles the marketing site.
const { useState, useCallback } = React;

function ToastShelf({ events, onDismiss }) {
  if (!events.length) return null;
  return (
    <div style={{
      position: "fixed", right: 24, bottom: 24, zIndex: 9999,
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      {events.map((e) => (
        <div key={e.id}
          onClick={() => onDismiss(e.id)}
          style={{
            background: "linear-gradient(180deg, #FFF2C6 0%, #BD8332 100%)",
            color: "#000", padding: "12px 18px", borderRadius: 4,
            fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700,
            letterSpacing: "0.04em", textTransform: "uppercase",
            boxShadow: "0 12px 36px rgba(0,0,0,0.4)",
            cursor: "pointer", maxWidth: 360,
          }}>
          {e.text}
        </div>
      ))}
    </div>
  );
}

// Scaler hook — applies transform: scale to a 1920-design stage and
// sets the wrapper's height to (natural height × scale) so the rest
// of the page lays out correctly underneath.
function useStageScale(designWidth = 1920) {
  const wrapRef = React.useRef(null);
  const stageRef = React.useRef(null);
  React.useEffect(() => {
    const MOBILE_BP = 768;
    const apply = () => {
      const stage = stageRef.current;
      const wrap = wrapRef.current;
      if (!stage || !wrap) return;
      const vw = window.innerWidth;
      if (vw < MOBILE_BP) {
        // Mobile: true responsive layout, no scaling.
        stage.classList.add("is-mobile");
        stage.style.transform = "none";
        stage.style.width = "100%";
        wrap.style.height = "auto";
      } else {
        // Tablet / desktop: pixel-perfect 1920 stage scaled to viewport.
        stage.classList.remove("is-mobile");
        const scale = vw / designWidth;
        stage.style.width = designWidth + "px";
        stage.style.transform = `scale(${scale})`;
        const naturalH = stage.scrollHeight;
        wrap.style.height = (naturalH * scale) + "px";
      }
    };
    apply();
    window.addEventListener("resize", apply);
    const ro = new ResizeObserver(apply);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => { window.removeEventListener("resize", apply); ro.disconnect(); };
  }, [designWidth]);
  return { wrapRef, stageRef };
}

function App() {
  const [active, setActive] = useState("Home");
  const [events, setEvents] = useState([]);
  const { wrapRef, stageRef } = useStageScale(1920);
  const { wrapRef: wrap2Ref, stageRef: stage2Ref } = useStageScale(1920);
  const { wrapRef: wrap3Ref, stageRef: stage3Ref } = useStageScale(1920);

  // Toasts removed — actions no longer surface a pop-up confirmation.
  const fire = useCallback(() => {}, []);

  return (
    <React.Fragment>
    <div className="tk-scaler" ref={wrapRef}>
      <div className="tk-stage" ref={stageRef}>
    <div className="site">
      <Hero
        active={active}
        onNav={(label) => { setActive(label); fire(`Nav → ${label}`); }}
        onCta={() => fire("Explore the work")}
        onPrimary={() => fire("Explore the work")}
        onSecondary={() => fire("View the reel")}
      />

      <CosmicPanel>
        <Director onReadMore={() => fire("Open full story")} />
      </CosmicPanel>
    </div>
      </div>
    </div>

      {/* Featured Work — 3D ContainerScroll (video unfolds as you scroll),
          with testimonials + CTA directly below. Rendered OUTSIDE the scaled
          stage for true-scale perspective. */}
      <FeatureScroll
        onPlay={() => fire("Play feature reel")}
        onCase={() => fire("View full case study")}
        onAll={() => fire("Explore all films")}
      />

      {/* TEDFLIX portfolio — pinned scroll-driven coverflow, OUTSIDE the scaled
          stage so the sticky pin works at true viewport scale. */}
      <Portfolio onExplore={(w) => { if (w && w.href) window.location.href = w.href; }} />

      {/* Slanted film-strip marquee bridging TEDFLIX → Imperfection. */}
      <FilmStrip />

      {/* Pinned scroll intro — rendered OUTSIDE the scaled stage so its
          sticky pin works at true viewport scale. */}
      <CinematicManifesto onCta={() => fire("Work with Ted")} />

      {/* Compass of Creations — orrery centerpiece, outside the scaled stage
          for true-scale geometry + pinned scroll rotation. */}
      <CompassOrrery onActivate={(n) => fire(`Compass → ${n.name}`)} />

      {/* Pathways — three cinematic world-portals (expand on hover). */}
      <Pathways
        onPath={(p) => fire(`Pathway → ${p.label}`)}
        onConverge={() => fire("Start a conversation")}
      />

      {/* Original IP in Development — vault of four cinematic worlds. */}
      <OriginalIP
        onExplore={() => fire("Explore the IP")}
        onContact={() => fire("Contact about a project")}
      />

      {/* Financial Strategy — full-bleed navigator's-ledger scene. */}
      <FinancialStrategy
        onApply={() => fire("Apply for a Strategy Session")}
        onCoaching={() => fire("Explore Men's Coaching")}
      />

      {/* Get Free Insights — aperture-motif newsletter finale. */}
      <InsightsCTA
        onSubscribe={(d) => fire(`Subscribe: ${d.email || ""}`)}
        onConsult={() => fire("Book a consultation")}
      />

    <div className="tk-scaler" ref={wrap2Ref}>
      <div className="tk-stage" ref={stage2Ref}>
    <div className="site">
      <Footer onSubscribe={(email) => fire(`Newsletter: ${email || ""}`)} />
    </div>
      </div>
    </div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
