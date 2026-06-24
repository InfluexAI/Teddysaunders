// FeatureScroll.jsx — "Featured Work", ported from the Aceternity
// ContainerScroll (framer-motion → plain React + scroll math). The headline
// block translates up while a 3D video card rotates from tilted to flat and
// scales as you scroll through the section — the video unfolds into view in
// the SAME scroll, no separate section. Rendered outside the scaled stage so
// the perspective + scroll mapping run at true viewport scale.
const { useRef: useFsRef, useEffect: useFsEffect, useState: useFsState } = React;

function FeatureScroll({ onPlay, onCase, onAll }) {
  const containerRef = useFsRef(null);
  const headerRef = useFsRef(null);
  const cardRef = useFsRef(null);

  useFsEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isMobile = () => window.innerWidth <= 768;
    const lerp = (a, b, t) => a + (b - a) * t;

    const apply = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const rect = container.getBoundingClientRect();
      const card = cardRef.current;
      // Untransformed center of the card in viewport space (offset-based so
      // the live scale/rotate transform doesn't feed back into the measure).
      const cardTop = rect.top + (card ? card.offsetTop : 0);
      const cardH = card ? card.offsetHeight : 0;
      const cardCenter = cardTop + cardH / 2;
      // 0 when the card's center is at the viewport bottom (just entering),
      // reaching 1 (fully flat) by the time it hits the vertical MIDDLE of
      // the viewport — so it settles flat halfway down, not off-screen.
      let q = (vh - cardCenter) / (vh * 0.5);
      q = Math.max(0, Math.min(1, q));
      q = q * q * (3 - 2 * q);

      const rotate = lerp(22, 0, q);
      const scale = isMobile() ? lerp(0.72, 0.92, q) : lerp(1.06, 1, q);
      const translate = lerp(40, -110, q);

      if (headerRef.current) headerRef.current.style.transform = `translateY(${translate}px)`;
      if (cardRef.current) cardRef.current.style.transform = `perspective(1100px) rotateX(${rotate}deg) scale(${scale})`;
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  return (
    <section className="tk-fscroll" ref={containerRef}>
      <div className="fscroll-inner">
        <div className="fscroll-header" ref={headerRef}>
          <div className="fintro-eyebrow">Featured Work</div>
          <h2 className="fintro-head">Disrupting Culture<br />By Impacting Millions</h2>
          <p className="fintro-blurb">
            With over 4 million views, this film tripled Burning Man&rsquo;s ticket sales,
            selling them out for the first time. Over a decade later, people still watch it
            religiously, stating that it gives them hope during hard times.
          </p>

          <div className="fintro-awards" aria-label="Awards">
            {[
              { title: "Best Short", org: "New Media Film Festival", year: "2012" },
              { title: "Best Short", org: "Ascona Film Festival", year: "2012" },
              { title: "Best Film Score", org: "Moondance International Film Festival", year: "2012" },
            ].map((a, i) => (
              <div className="award" key={i}>
                <Laurel className="award__laurel--l" />
                <div className="award__body">
                  <div className="award__title">{a.title}</div>
                  <div className="award__org">{a.org}</div>
                  <div className="award__year">{a.year}</div>
                </div>
                <Laurel className="award__laurel--r" flip />
              </div>
            ))}
          </div>
        </div>

        <div className="fscroll-card" ref={cardRef}>
          <div className="fscroll-screen">
            <div className="tk-video" onClick={onPlay} role="button" aria-label="Play feature reel">
              <div className="play"><PlayTriangle size={42} id="pgFScroll" /></div>
            </div>
          </div>
        </div>

        <div className="fscroll-after">
          <Testimonials />
          <div className="tk-feature-cta">
            <Button variant="bronze"  onClick={onCase}>VIEW FULL CASE STUDY</Button>
            <Button variant="outline" onClick={onAll}>EXPLORE ALL FILMS</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

window.FeatureScroll = FeatureScroll;
