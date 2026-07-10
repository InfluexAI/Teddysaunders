/* app-v2.jsx — standalone Contact Page v2.
   Renders Option C or Option D as a real, full-scrolling page (no canvas),
   with a minimal C/D switcher + the on-brand Tweaks dock. */
const { useState, useEffect } = React;

function ControlDock() {
  const [open, setOpen] = useState(false);
  const [motion, setMotion] = useState(true);
  const [grain, setGrain] = useState(true);
  const [atmo, setAtmo] = useState(0.45);

  useEffect(() => {
    document.querySelectorAll(".cpage").forEach((p) => {
      p.classList.toggle("no-motion", !motion);
      p.classList.toggle("no-grain", !grain);
    });
    document.documentElement.style.setProperty("--atmo", String(atmo));
  }, [motion, grain, atmo]);

  const Row = ({ label, on, set }) => (
    <button onClick={() => set(!on)} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18,
      width: "100%", background: "transparent", border: 0, cursor: "pointer", padding: "9px 4px",
      fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 11, letterSpacing: "0.16em",
      textTransform: "uppercase", color: "#F4E7D2",
    }}>
      <span>{label}</span>
      <span style={{ width: 38, height: 20, borderRadius: 999, position: "relative",
        background: on ? "linear-gradient(180deg,#F7DBA0,#BD8332)" : "rgba(255,255,255,0.14)", transition: "background .3s" }}>
        <span style={{ position: "absolute", top: 2, left: on ? 20 : 2, width: 16, height: 16, borderRadius: "50%",
          background: "#0A0805", transition: "left .25s cubic-bezier(.2,.7,.3,1)" }}></span>
      </span>
    </button>
  );

  return (
    <div style={{ position: "fixed", left: 18, bottom: 18, zIndex: 9999, fontFamily: "var(--font-sans)" }}>
      {open && (
        <div style={{ marginBottom: 12, width: 248, padding: "18px 20px 20px", borderRadius: 16,
          background: "linear-gradient(180deg, rgba(22,17,12,0.97), rgba(8,6,4,0.97))",
          border: "1px solid rgba(209,157,99,0.3)", boxShadow: "0 24px 70px rgba(0,0,0,0.6)", backdropFilter: "blur(10px)" }}>
          <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase",
            background: "var(--grad-bronze)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", marginBottom: 14 }}>Tweaks</div>
          <Row label="Cinematic motion" on={motion} set={setMotion}/>
          <Row label="Film grain" on={grain} set={setGrain}/>
          <div style={{ padding: "12px 4px 2px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#F4E7D2", marginBottom: 10 }}>
              <span>Atmosphere</span><span style={{ color: "var(--c-bronze-2)" }}>{Math.round(atmo / 0.9 * 100)}%</span>
            </div>
            <input type="range" min="0" max="0.9" step="0.05" value={atmo} onChange={(e) => setAtmo(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: "#D29B5A" }}/>
          </div>
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} title="Tweaks" style={{
        display: "flex", alignItems: "center", gap: 10, height: 44, padding: "0 18px", borderRadius: 999, cursor: "pointer",
        background: "linear-gradient(180deg, rgba(22,17,12,0.96), rgba(8,6,4,0.96))", border: "1px solid rgba(209,157,99,0.4)",
        color: "#F4E7D2", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
        boxShadow: "0 12px 36px rgba(0,0,0,0.5)" }}>
        <span style={{ display: "inline-flex" }}><Compass size={22} angle={open ? 234 : 18} id="dock-cmp" showCardinals={false} mark={false}/></span>
        Tweaks
      </button>
    </div>
  );
}

function Switcher({ dir, setDir }) {
  const Btn = ({ id, letter, label }) => (
    <button onClick={() => setDir(id)} style={{
      display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 3, cursor: "pointer",
      padding: "8px 16px", borderRadius: 10, border: 0,
      background: dir === id ? "linear-gradient(180deg, rgba(247,219,160,0.16), rgba(189,131,50,0.12))" : "transparent",
      transition: "background .3s",
    }}>
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 12, letterSpacing: "0.18em",
        background: dir === id ? "var(--grad-bronze)" : "none", WebkitBackgroundClip: dir === id ? "text" : "initial",
        backgroundClip: dir === id ? "text" : "initial", color: dir === id ? "transparent" : "rgba(255,255,255,0.5)" }}>
        OPTION {letter}
      </span>
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 9, letterSpacing: "0.1em",
        textTransform: "uppercase", color: dir === id ? "rgba(255,234,202,0.7)" : "rgba(255,255,255,0.3)" }}>{label}</span>
    </button>
  );
  return (
    <div style={{ position: "fixed", right: 18, bottom: 18, zIndex: 9999, display: "flex", gap: 4, padding: 5,
      borderRadius: 14, background: "linear-gradient(180deg, rgba(22,17,12,0.96), rgba(8,6,4,0.96))",
      border: "1px solid rgba(209,157,99,0.4)", boxShadow: "0 12px 36px rgba(0,0,0,0.5)" }}>
      <Btn id="C" letter="A" label="Opening Frame"/>
      <Btn id="D" letter="B" label="The Console"/>
    </div>
  );
}

function AppV2() {
  const [dir, setDir] = useState(() => {
    try { return localStorage.getItem("ts-contact-v2-dir") || "C"; } catch (e) { return "C"; }
  });
  useEffect(() => { try { localStorage.setItem("ts-contact-v2-dir", dir); } catch (e) {} window.scrollTo({ top: 0 }); }, [dir]);

  return (
    <React.Fragment>
      <div className="v2-stage">
        <DirectionC/>
      </div>
      <ControlDock/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AppV2/>);
