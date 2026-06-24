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
  const [active, setActive] = useState("Films");
  const [events, setEvents] = useState([]);
  const { wrapRef, stageRef } = useStageScale(1920);

  const fire = useCallback((text) => {
    const id = Date.now() + Math.random();
    setEvents((cur) => [...cur, { id, text }]);
    setTimeout(() => setEvents((cur) => cur.filter((x) => x.id !== id)), 2600);
  }, []);
  const dismiss = (id) => setEvents((cur) => cur.filter((x) => x.id !== id));

  return (
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
        <PressStrip />
        <Director onReadMore={() => fire("Open full story")} />
      </CosmicPanel>

      <FeatureVideo
        onPlay={() => fire("Play feature reel")}
        onCase={() => fire("View full case study")}
        onAll={() => fire("Explore all films")}
      />

      <Archive onOpen={(it) => fire(`Open: ${it.tag}`)} />

      <Footer />

      <ToastShelf events={events} onDismiss={dismiss} />
    </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
