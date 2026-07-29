// WorkApp.jsx — assembles the Work With Ted page:
//   Header · Hero · Compass Coaching · Brand Marketing · Investors · Footer.
const { useState: useWAppState, useCallback: useWAppCb } = React;

function WkToasts({ events, onDismiss }) {
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

// rAF smooth-scroll to a section id (the object-form scrollTo is a no-op in the
// preview iframe, so we tween manually).
function wkScrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const target = el.getBoundingClientRect().top + window.scrollY - 20;
  const start = window.scrollY, dist = target - start;
  if (Math.abs(dist) < 2) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { window.scrollTo(0, target); return; }
  const dur = Math.min(1100, 360 + Math.abs(dist) * 0.32);
  const t0 = performance.now();
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const step = (now) => {
    const k = Math.min(1, (now - t0) / dur);
    window.scrollTo(0, start + dist * ease(k));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function WorkApp() {
  const [events, setEvents] = useWAppState([]);
  const fire = useWAppCb((text) => {
    const id = Date.now() + Math.random();
    setEvents((c) => [...c, { id, text }]);
    setTimeout(() => setEvents((c) => c.filter((x) => x.id !== id)), 2600);
  }, []);
  const dismiss = (id) => setEvents((c) => c.filter((x) => x.id !== id));

  useReveal();

  const go = (label) => {
    const map = { Home: "index.html", Portfolio: "Portfolio.html", About: "About.html", Contact: "contact.html" };
    if (label === "Work With Ted") { wkScrollToId("wk-coaching"); return; }
    if (map[label]) { window.location.href = map[label]; return; }
    fire(`Nav → ${label}`);
  };

  return (
    <div className="work-page">
      <Header active="Work With Ted" onNav={go} onCta={() => { window.location.href = "index.html"; }} />
      <WorkHero onJump={wkScrollToId} />
      <WorkCoaching onApply={() => { window.location.href = "contact.html"; }} onActivate={() => {}} />
      <WorkBrand onStart={() => { window.location.href = "contact.html"; }} onStudios={() => fire("Go to Infinit Studios")} />
      <WorkInvestors onTedcast={() => fire("Apply to Tedcast")} />
      <Footer onSubscribe={(d) => fire(`Newsletter: ${(d && d.email) || ""}`)} />
      <WkToasts events={events} onDismiss={dismiss} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WorkApp />);
