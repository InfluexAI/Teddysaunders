// AboutApp.jsx — assembles the About page: Header · Hero · Compass · Ventures · Footer.
const { useState: useAppState, useCallback: useAppCb } = React;

function AbToasts({ events, onDismiss }) {
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

function AboutApp() {
  const [events, setEvents] = useAppState([]);
  const fire = useAppCb((text) => {
    const id = Date.now() + Math.random();
    setEvents((c) => [...c, { id, text }]);
    setTimeout(() => setEvents((c) => c.filter((x) => x.id !== id)), 2600);
  }, []);
  const dismiss = (id) => setEvents((c) => c.filter((x) => x.id !== id));

  const go = (label) => {
    const map = { Home: "index.html", Portfolio: "Portfolio.html", Contact: "contact.html" };
    if (map[label]) { window.location.href = map[label]; return; }
    fire(`Nav → ${label}`);
  };

  return (
    <div className="about-page">
      <Header active="About" onNav={go} onCta={() => { window.location.href = "index.html"; }} />
      <AboutOrigin />
      <AboutHero />
      <AboutCompass onActivate={(n) => fire(n.cta)} />
      <AboutVentures
        onVisit={(v) => fire(`Visit → ${v.title}`)}
        onFollow={(s) => fire(`Follow → ${s}`)}
      />
      <Footer onSubscribe={(d) => fire(`Newsletter: ${(d && d.email) || ""}`)} />
      <AbToasts events={events} onDismiss={dismiss} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AboutApp />);
