// WorkApp2.jsx — v2 cinematic "Work With Ted":
//   Header · Hero2 · Choose-your-path portals · Compass Coaching ·
//   Brand Marketing · For Investors · Cinematic closing · Footer.
const { useState: useWA2State, useCallback: useWA2Cb } = React;

function WkToasts2({ events, onDismiss }) {
  if (!events.length) return null;
  return (
    <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {events.map((e) => (
        <div key={e.id} onClick={() => onDismiss(e.id)} style={{
          background: "linear-gradient(180deg, #FFF2C6 0%, #BD8332 100%)", color: "#000",
          padding: "12px 18px", borderRadius: 4, fontFamily: "var(--font-sans)", fontSize: 13,
          fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase",
          boxShadow: "0 12px 36px rgba(0,0,0,0.4)", cursor: "pointer", maxWidth: 360,
        }}>{e.text}</div>
      ))}
    </div>
  );
}

// rAF smooth-scroll to a section id (object-form scrollTo is a no-op in the
// preview iframe, so tween manually).
function wk2ScrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const target = el.getBoundingClientRect().top + window.scrollY - 20;
  const start = window.scrollY, dist = target - start;
  if (Math.abs(dist) < 2) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { window.scrollTo(0, target); return; }
  const dur = Math.min(1200, 380 + Math.abs(dist) * 0.3);
  const t0 = performance.now();
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const step = (now) => {
    const k = Math.min(1, (now - t0) / dur);
    window.scrollTo(0, start + dist * ease(k));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function WorkApp2() {
  const [events, setEvents] = useWA2State([]);
  const fire = useWA2Cb((text) => {
    const id = Date.now() + Math.random();
    setEvents((c) => [...c, { id, text }]);
    setTimeout(() => setEvents((c) => c.filter((x) => x.id !== id)), 2600);
  }, []);
  const dismiss = (id) => setEvents((c) => c.filter((x) => x.id !== id));

  useReveal();

  const go = (label) => {
    const map = { Home: "index.html", Portfolio: "Portfolio.html", About: "About.html", Contact: "contact.html" };
    if (label === "Work With Ted") { wk2ScrollToId("wk2-paths"); return; }
    if (map[label]) { window.location.href = map[label]; return; }
    fire("Nav \u2192 " + label);
  };
  const toContact = () => { window.location.href = "contact.html"; };

  return (
    <div className="work-page">
      <Header active="Work With Ted" onNav={go} onCta={toContact} />
      <WkHero2 onJump={wk2ScrollToId} />
      <WkPaths onJump={wk2ScrollToId} />
      <WorkCoaching onApply={toContact} onActivate={() => {}} />
      <WorkBrand onStart={toContact} onStudios={() => fire("Go to Infinit Studios")} />
      <WorkInvestors onTedcast={() => fire("Apply to Tedcast")} />
      <WkClosing onBegin={toContact} onPortfolio={() => { window.location.href = "Portfolio.html"; }} />
      <Footer onSubscribe={(d) => fire("Newsletter: " + ((d && d.email) || ""))} />
      <WkToasts2 events={events} onDismiss={dismiss} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WorkApp2 />);
