/* app-404.jsx — cinematic 404 for the Ted Saunders site.
   Reuses the contact page chrome (Header, BgStack, Reticles, Tedivider,
   Footer) and a glitching "broken" compass. */
const { useEffect } = React;

function NotFound() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);
  return (
    <div className="cpage">
      <BgStack plain/>
      <div className="cpage__inner">
        <section className="c-hero" style={{ minHeight: "100vh", flexDirection: "column", justifyContent: "center" }}>
          <Reticles/>
          <div className="c-hero__top"><Header active=""/></div>

          <div className="c-hero__content" style={{ padding: "0 64px" }}>
            <div className="nf-wrap">
              <div className="nf-stack">
                <div className="nf-404 reveal d1">
                  <span className="nf-digit">4</span>
                  <Compass size={210} angle={0} id="nf-cmp" broken/>
                  <span className="nf-digit">4</span>
                </div>
                <h1 className="c-display reveal d2" style={{ fontSize: "clamp(44px, 7vw, 92px)", marginTop: 14 }}>
                  THIS FRAME<br/><span className="ink-sans">DOESN&rsquo;T EXIST.</span>
                </h1>
                <p className="c-lead reveal d3" style={{ marginTop: 24, fontSize: "clamp(18px, 2.05vw, 30px)", whiteSpace: "nowrap" }}>
                  Even the compass loses its bearings in the dark.
                </p>
                <p className="c-body reveal d3" style={{ marginTop: 18, width: "min(90vw, 900px)", maxWidth: "none", fontSize: "clamp(16px, 1.55vw, 22px)", textWrap: "balance" }}>
                  The page you were searching for has slipped between worlds. But every wrong
                  turn is part of the story — let it lead you back toward the light.
                </p>
                <div className="nf-actions reveal d4">
                  <a className="c-btn c-btn--bronze" href="index.html">Return Home<ArrowGlyph/></a>
                  <a className="c-btn c-btn--outline" href="contact.html">Contact Ted<ArrowGlyph size={13}/></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={{ padding: "0 64px 8px" }}><Tedivider/></div>
        <Footer/>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<NotFound/>);
