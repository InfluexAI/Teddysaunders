/* direction-a.jsx — "THE CORRESPONDENCE"
   Editorial split: cinematic statement + compass on the left, the
   adaptive form on the right, pathways as a credit-roll list below. */

function DirectionA() {
  const [inquiry, setInquiry] = React.useState("general");
  const q = inquiryById(inquiry);

  const onPath = (p) => { if (p.inquiry) setInquiry(p.inquiry); };

  return (
    <div className="cpage">
      <BgStack/>
      <Reticles/>
      <div className="cpage__inner">
        <Header active="Contact"/>

        {/* HERO SPLIT */}
        <section style={{ padding: "64px 64px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div className="reveal d1">
            <Eyebrow gold>Contact</Eyebrow>
            <h1 className="c-display" style={{ fontSize: 64, marginTop: 24 }}>
              LET&rsquo;S BUILD<br/>SOMETHING<br/><span className="ink">MEANINGFUL.</span>
            </h1>
            <p className="c-lead" style={{ marginTop: 28, maxWidth: 440 }}>Every great story starts with a conversation.</p>
            <p className="c-body" style={{ marginTop: 22, maxWidth: 470 }}>
              Whether you have a project, collaboration, investment opportunity, speaking request, or creative idea — Ted reads his messages.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 30, marginTop: 40 }}>
              <Compass size={132} angle={q.angle} id="a-cmp"/>
              <div>
                <p className="c-body" style={{ fontSize: 13, letterSpacing: "0.04em", maxWidth: 190, marginBottom: 14 }}>
                  The needle finds your path as you choose.
                </p>
                <button className="c-btn c-btn--ghost"><ArrowGlyph size={13}/>Watch the Reel</button>
              </div>
            </div>
          </div>

          {/* FORM PANEL */}
          <div className="reveal d3" style={{
            border: "1px solid rgba(209,157,99,0.22)", borderRadius: "var(--r-xl)",
            padding: "40px 40px 44px",
            background: "linear-gradient(180deg, rgba(20,16,11,0.78) 0%, rgba(8,6,4,0.86) 100%)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          }}>
            <Eyebrow>Send a Message</Eyebrow>
            <div style={{ height: 22 }}></div>
            <AdaptiveForm inquiry={inquiry} setInquiry={setInquiry} selectMode="chips"/>
          </div>
        </section>

        {/* PATHWAYS */}
        <section style={{ padding: "84px 64px 0" }}>
          <div className="reveal d2" style={{ marginBottom: 22 }}>
            <Eyebrow gold>Pathways for Connection</Eyebrow>
          </div>
          <div className="c-paths reveal d3">
            {PATHWAYS.map((p) => (
              <a className="c-pathway" key={p.n} href="#" onClick={(e) => { e.preventDefault(); onPath(p); }}>
                <span className="idx">{p.n}</span>
                <span>
                  <p className="pt">{p.title}</p>
                  <p className="pd">{p.desc}</p>
                </span>
                <span className="go">&rarr;</span>
              </a>
            ))}
          </div>
        </section>

        {/* NEWSLETTER + SOCIAL */}
        <section style={{ padding: "72px 64px 8px", display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 36, alignItems: "stretch" }}>
          <NewsletterModule/>
          <div className="reveal d5" style={{
            border: "1px solid rgba(209,157,99,0.18)", borderRadius: "var(--r-xl)", padding: "44px 44px",
            background: "linear-gradient(180deg, rgba(16,13,9,0.7) 0%, rgba(6,5,3,0.82) 100%)",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <Eyebrow>Follow Ted</Eyebrow>
            <p className="c-body" style={{ margin: "16px 0 24px" }}>
              Social platforms, creative ecosystems, ventures, films, music, and future worlds.
            </p>
            <SocialRow/>
          </div>
        </section>

        <div style={{ padding: "60px 64px 0" }}><div className="c-divider"><div className="rule"></div><Compass size={56} angle={q.angle} id="a-div" showCardinals={false}/><div className="rule"></div></div></div>
        <Footer/>
      </div>
    </div>
  );
}
window.DirectionA = DirectionA;
