/* direction-c.jsx — "THE OPENING FRAME"
   Cinematic top-to-bottom scroll. Pathways are a 5-up tab row that docks
   into the form box below; tabs 4 & 5 smooth-scroll to their sections. */

function cScrollTo(el) {
  if (!el) return;
  const scrollable = (n) => { const s = getComputedStyle(n); return /(auto|scroll)/.test(s.overflowY) && n.scrollHeight > n.clientHeight + 4; };
  let p = el.parentElement;
  while (p && p !== document.body && !scrollable(p)) p = p.parentElement;
  if (p && p !== document.body && scrollable(p)) {
    const top = p.scrollTop + (el.getBoundingClientRect().top - p.getBoundingClientRect().top) - 36;
    p.scrollTo({ top, behavior: "smooth" });
  } else {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
  el.classList.remove("c-pulse"); void el.offsetWidth; el.classList.add("c-pulse");
}

function DirectionC() {
  const [inquiry, setInquiry] = React.useState("film");
  const q = inquiryById(inquiry);
  const newsRef = React.useRef(null);
  const socialRef = React.useRef(null);

  const onTab = (e, p) => {
    e.preventDefault();
    if (p.action === "subscribe") cScrollTo(newsRef.current);
    else if (p.action === "follow") cScrollTo(socialRef.current);
    else if (p.inquiry) setInquiry(p.inquiry);
  };

  return (
    <div className="cpage">
      <BgStack plain/>
      <div className="cpage__inner">

        {/* HERO — full-screen, Ted weighted right, heading left */}
        <section className="c-hero c-hero--c">
          <div className="c-hero__photo"><img src={TEDDY} alt="Ted Saunders"/></div>
          <div className="c-hero__shade"></div>
          <Reticles/>
          <div className="c-hero__top"><Header active="Contact"/></div>
          <div className="c-hero__content" style={{ padding: "0 64px" }}>
            <div style={{ maxWidth: 820 }}>
              <h1 className="c-display c-textured reveal d1" style={{ fontSize: 100 }}>
                LET&rsquo;S BUILD SOMETHING<br/><span className="ink-sans">MEANINGFUL.</span>
              </h1>
              <p className="c-lead reveal d2" style={{ marginTop: 26, fontSize: 28 }}>Every great story starts with a conversation.</p>
              <p className="c-body reveal d3" style={{ marginTop: 20, fontSize: 21 }}>
                Whether you have a project, collaboration, investment opportunity, speaking request, or creative idea — Ted reads his messages.
              </p>
            </div>
          </div>
        </section>

        {/* CHOOSE YOUR PATH — heading, tabs + form all sit on the rustic backdrop */}
        <div className="c-choosepath">
          <section style={{ padding: "130px 64px 0", textAlign: "center" }}>
            <h2 className="c-display reveal d1" style={{ fontSize: 64, margin: "0 0 40px" }}>CHOOSE YOUR PATH</h2>
            <div className="c-ptabs">
              {PATHWAYS.map((p, i) => (
                <a className={"c-ptab reveal " + ("d" + (i + 1)) + (p.inquiry && p.inquiry === inquiry ? " is-on" : "")} key={p.n} href="#"
                   onClick={(e) => onTab(e, p)}>
                  <span className="pt-title">{p.title}</span>
                </a>
              ))}
            </div>
          </section>

          {/* FORM — the box the tabs dock into */}
          <section style={{ padding: "26px 64px 56px" }}>
            <div className="c-formbox reveal d2" style={{
              border: "1px solid rgba(209,157,99,0.22)", borderRadius: "var(--r-xl)", padding: "48px 56px 52px",
              background: "linear-gradient(180deg, rgba(20,16,11,0.8) 0%, rgba(8,6,4,0.88) 100%)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "0.66fr 1.34fr", gap: 48, alignItems: "start" }}>
                <div>
                  <h3 className="c-display" style={{ fontSize: 46, margin: "0 0 16px" }}>WRITE TO TED</h3>
                  <p className="c-body" style={{ maxWidth: 340, marginBottom: 0, fontSize: 18 }}>
                    Choose your inquiry and the compass will route your message to the right place.
                  </p>
                </div>
                <AdaptiveForm inquiry={inquiry} setInquiry={setInquiry} selectMode="chips" showDesc/>
              </div>
            </div>
          </section>
        </div>

        {/* NEWSLETTER */}
        <section style={{ padding: "44px 64px 0" }}><div ref={newsRef}><NewsletterModule split/></div></section>

        {/* SOCIAL */}
        <section className="c-follow" style={{ padding: "96px 64px 60px", textAlign: "center" }}>
          <div ref={socialRef}>
            <h3 className="c-display" style={{ fontSize: 38, margin: "0 0 16px" }}>Follow Ted in Real Time</h3>
            <p className="c-body reveal d2" style={{ margin: "0 auto 26px", maxWidth: 880, whiteSpace: "nowrap" }}>
              Get real-time updates from social platforms.
            </p>
            <div className="reveal d3" style={{ display: "flex", justifyContent: "center" }}><SocialRow/></div>
          </div>
        </section>

        <div style={{ padding: "60px 64px 0" }}></div>
        <Footer/>
      </div>
    </div>
  );
}
window.DirectionC = DirectionC;
