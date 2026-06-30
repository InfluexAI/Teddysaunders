/* direction-d.jsx — "THE CONSOLE" (side-by-side)
   Left: a compass whose needle + a connector line point at the active
   pathway in a vertical list. Right: the matching module, always in view.
   No scroll needed — selection fills the adjacent panel instantly. */

function DirectionD() {
  const [sel, setSel] = React.useState(0);
  const [inquiry, setInquiry] = React.useState("general");
  const path = PATHWAYS[sel];

  // Console geometry (left column is a fixed 540×560 stage)
  const CX = 130, CY = 280;          // compass center
  const NX = 412;                    // node center-x
  const nodeY = [80, 180, 280, 380, 480];
  const angleTo = (i) => Math.atan2(NX - CX, -(nodeY[i] - CY)) * 180 / Math.PI;
  const needleAngle = angleTo(sel);

  const pick = (i) => { setSel(i); if (PATHWAYS[i].inquiry) setInquiry(PATHWAYS[i].inquiry); };

  return (
    <div className="cpage">
      <BgStack plain/>
      <div className="cpage__inner">

        {/* HERO — full-screen, Ted weighted right, heading left */}
        <section className="c-hero c-hero--d">
          <div className="c-hero__photo"><img src={TEDDY} alt="Ted Saunders"/></div>
          <div className="c-hero__shade"></div>
          <Reticles/>
          <div className="c-hero__top"><Header active="Contact"/></div>
          <div className="c-hero__content" style={{ padding: "0 64px" }}>
            <div style={{ maxWidth: 820 }}>
              <h1 className="c-display c-textured reveal d2" style={{ fontSize: 100, marginTop: 20 }}>
                LET&rsquo;S BUILD SOMETHING<br/><span className="ink-sans">MEANINGFUL.</span>
              </h1>
              <p className="c-lead reveal d3" style={{ marginTop: 26, fontSize: 28 }}>Every great story starts with a conversation.</p>
              <p className="c-body reveal d3" style={{ marginTop: 20, fontSize: 21 }}>
                Whether you have a project, collaboration, investment opportunity, speaking request, or creative idea — Ted reads his messages.
              </p>
            </div>
          </div>
        </section>

        {/* CONSOLE */}
        <section style={{ padding: "40px 64px 0", display: "grid", gridTemplateColumns: "540px 1fr", gap: 44, alignItems: "center" }}>
          {/* LEFT — compass + vertical node list */}
          <div className="reveal d3" style={{ position: "relative", width: 540, height: 560 }}>
            {/* connector + spokes */}
            <svg viewBox="0 0 540 560" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              {nodeY.map((y, i) => (
                <line key={i} x1={CX} y1={CY} x2={NX - 132} y2={y}
                  stroke="rgba(209,157,99,0.14)" strokeWidth="1" strokeDasharray="2 6"/>
              ))}
              <line x1={CX} y1={CY} x2={NX - 132} y2={nodeY[sel]}
                stroke="url(#dline)" strokeWidth="2"
                style={{ transition: "all .7s cubic-bezier(.2,.7,.3,1)" }}/>
              <circle cx={NX - 132} cy={nodeY[sel]} r="4" fill="#F6D36B"
                style={{ transition: "cy .7s cubic-bezier(.2,.7,.3,1)" }}/>
              <defs>
                <linearGradient id="dline" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(240,170,64,0)"/><stop offset="100%" stopColor="#E8B777"/>
                </linearGradient>
              </defs>
            </svg>
            {/* compass */}
            <div style={{ position: "absolute", left: CX, top: CY, transform: "translate(-50%,-50%)" }}>
              <Compass size={200} angle={needleAngle} id="d-cmp"/>
            </div>
            {/* node list */}
            {PATHWAYS.map((p, i) => {
              const on = i === sel;
              return (
                <button key={p.n} onClick={() => pick(i)}
                  style={{
                    position: "absolute", left: NX, top: nodeY[i], transform: "translate(-50%,-50%)",
                    width: 256, textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
                    background: on ? "linear-gradient(180deg, rgba(40,30,20,0.92), rgba(14,10,7,0.92))" : "rgba(8,6,4,0.5)",
                    border: "1px solid " + (on ? "rgba(209,157,99,0.7)" : "rgba(209,157,99,0.2)"),
                    borderRadius: "var(--r-md)", padding: "16px 18px",
                    boxShadow: on ? "0 16px 44px rgba(0,0,0,0.5), 0 1px 24px rgba(240,170,64,0.22)" : "none",
                    transition: "border-color .4s, background .4s, box-shadow .4s, transform .18s",
                  }}
                  onMouseEnter={(e) => { if (!on) e.currentTarget.style.transform = "translate(-50%,-50%) translateX(4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(-50%,-50%)"; }}>
                  <span style={{ flex: "none", width: 8, height: 8, borderRadius: "50%",
                    background: on ? "var(--c-butter)" : "rgba(209,157,99,0.4)",
                    boxShadow: on ? "0 0 10px rgba(246,211,107,0.7)" : "none", transition: "background .4s, box-shadow .4s" }}></span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 19, lineHeight: 1.16,
                    textTransform: "uppercase", color: on ? "#FBF3E4" : "rgba(255,255,255,0.74)" }}>{p.title}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT — live stage */}
          <div key={sel} style={{ animation: "c-fade-up .55s cubic-bezier(.2,.7,.3,1) both",
            border: "1px solid rgba(209,157,99,0.22)", borderRadius: "var(--r-xl)", padding: "40px 44px",
            background: "linear-gradient(180deg, rgba(18,14,10,0.82) 0%, rgba(7,5,4,0.9) 100%)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5)", minHeight: 540, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {path.action === "subscribe" ? (
              <React.Fragment>
                <div className="c-display" style={{ fontSize: 28, margin: "0 0 8px" }}>{path.title}</div>
                <p className="c-body" style={{ marginBottom: 26 }}>{path.desc}</p>
                <NewsletterModule/>
              </React.Fragment>
            ) : path.action === "follow" ? (
              <React.Fragment>
                <div className="c-display" style={{ fontSize: 28, margin: "0 0 8px" }}>{path.title}</div>
                <p className="c-body" style={{ marginBottom: 26 }}>{path.desc}</p>
                <SocialRow/>
              </React.Fragment>
            ) : (
              <AdaptiveForm inquiry={inquiry}
                setInquiry={(v) => { setInquiry(v); const pi = PATHWAYS.findIndex((x) => x.inquiry === v); if (pi >= 0) setSel(pi); }}
                showDesc/>
            )}
          </div>
        </section>

        <div style={{ padding: "56px 64px 0" }}><Tedivider/></div>
        <Footer/>
      </div>
    </div>
  );
}
window.DirectionD = DirectionD;
