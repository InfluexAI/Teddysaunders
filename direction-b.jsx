/* direction-b.jsx — "CHOOSE YOUR PATH"
   The compass is the centerpiece. Five pathways orbit it; selecting one
   rotates the needle toward it and swaps the module below (form / newsletter
   / socials). */

function DirectionB() {
  const [sel, setSel] = React.useState(0); // default → Simple Message / General
  const [inquiry, setInquiry] = React.useState("general");
  const path = PATHWAYS[sel];
  const nodeAngle = sel * 72;

  const cx = 536, cy = 322, rx = 430, ry = 250;
  const pos = (i) => {
    const t = (i * 72) * Math.PI / 180;
    return { left: cx + rx * Math.sin(t), top: cy - ry * Math.cos(t) };
  };

  const pick = (i) => { setSel(i); if (PATHWAYS[i].inquiry) setInquiry(PATHWAYS[i].inquiry); };

  return (
    <div className="cpage">
      <BgStack/>
      <Reticles/>
      <div className="cpage__inner">
        <Header active="Contact"/>

        {/* HERO TEXT */}
        <section style={{ padding: "56px 64px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="reveal d1"><Eyebrow gold>Contact</Eyebrow></div>
          <h1 className="c-display reveal d2" style={{ fontSize: 60, marginTop: 22 }}>
            LET&rsquo;S BUILD SOMETHING <span className="ink">MEANINGFUL.</span>
          </h1>
          <p className="c-lead reveal d3" style={{ marginTop: 22 }}>Every great story starts with a conversation.</p>
          <p className="c-body reveal d3" style={{ marginTop: 16, maxWidth: 720 }}>
            Whether you have a project, collaboration, investment opportunity, speaking request, or creative idea — Ted reads his messages.
          </p>
        </section>

        {/* RADIAL */}
        <section className="reveal d4" style={{ position: "relative", height: 668, margin: "16px 64px 0" }}>
          {/* orbit guide */}
          <svg viewBox="0 0 1072 668" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="rgba(209,157,99,0.18)" strokeWidth="1" strokeDasharray="2 7"/>
          </svg>
          {/* center compass */}
          <div style={{ position: "absolute", left: cx, top: cy, transform: "translate(-50%,-50%)" }}>
            <Compass size={300} angle={nodeAngle} id="b-cmp"/>
          </div>
          {/* nodes */}
          {PATHWAYS.map((p, i) => {
            const { left, top } = pos(i);
            const on = i === sel;
            return (
              <button key={p.n} onClick={() => pick(i)}
                style={{
                  position: "absolute", left, top, transform: "translate(-50%,-50%)",
                  width: 224, textAlign: "center", cursor: "pointer",
                  background: on ? "linear-gradient(180deg, rgba(40,30,20,0.92), rgba(14,10,7,0.92))" : "rgba(8,6,4,0.55)",
                  border: "1px solid " + (on ? "rgba(209,157,99,0.7)" : "rgba(209,157,99,0.2)"),
                  borderRadius: "var(--r-md)", padding: "16px 18px",
                  boxShadow: on ? "0 18px 50px rgba(0,0,0,0.5), 0 1px 26px rgba(240,170,64,0.22)" : "none",
                  transition: "border-color .4s, background .4s, box-shadow .4s, transform .2s",
                }}
                onMouseEnter={(e) => { if (!on) e.currentTarget.style.transform = "translate(-50%,-50%) scale(1.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(-50%,-50%)"; }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 200, fontSize: 20,
                    background: "var(--grad-bronze)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{p.n}</span>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: on ? "var(--c-butter)" : "rgba(209,157,99,0.4)", boxShadow: on ? "0 0 10px rgba(246,211,107,0.7)" : "none" }}></span>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 15, lineHeight: 1.18,
                  textTransform: "uppercase", color: on ? "#FBF3E4" : "rgba(255,255,255,0.74)" }}>{p.title}</div>
              </button>
            );
          })}
        </section>

        {/* STAGE — swaps with selection */}
        <section style={{ padding: "8px 64px 0" }}>
          <div key={sel} style={{ animation: "c-fade-up .6s cubic-bezier(.2,.7,.3,1) both",
            border: "1px solid rgba(209,157,99,0.2)", borderRadius: "var(--r-xl)", padding: "44px 48px",
            background: "linear-gradient(180deg, rgba(18,14,10,0.8) 0%, rgba(7,5,4,0.88) 100%)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 6 }}>
              <Eyebrow gold>{path.n}</Eyebrow>
            </div>
            <div className="c-display" style={{ fontSize: 30, margin: "8px 0 6px" }}>{path.title}</div>
            <p className="c-body" style={{ maxWidth: 640, marginBottom: 28 }}>{path.desc}</p>

            {path.action === "subscribe" ? (
              <NewsletterModule/>
            ) : path.action === "follow" ? (
              <SocialRow/>
            ) : (
              <AdaptiveForm inquiry={inquiry} setInquiry={(v) => { setInquiry(v); const pi = PATHWAYS.findIndex((x) => x.inquiry === v); if (pi >= 0) setSel(pi); }} selectMode="select"/>
            )}
          </div>
        </section>

        <div style={{ padding: "56px 64px 0" }}><div className="c-divider"><div className="rule"></div><span className="c-eyebrow c-eyebrow--gold" style={{ letterSpacing: "0.3em" }}>TS</span><div className="rule"></div></div></div>
        <Footer/>
      </div>
    </div>
  );
}
window.DirectionB = DirectionB;
