// FeatureScroll.jsx — "Featured Work". A full-bleed autoplaying reel (Burning
// Man film) sits behind the section at 80% opacity, fading at the top into the
// awards copy and at the bottom so the testimonials read. Real YouTube review
// comments rise from the bottom of the video and fade out as they reach its
// midpoint. A bronze play button stays centered (click to unmute/restart).
const { useRef: useFsRef, useState: useFsState } = React;

const FWORK_REVIEWS = [
  { src: "assets/reviews/r5.png", left: "4%",  w: 320, rise: "44vh", dur: 11, delay: 0 },
  { src: "assets/reviews/r1.png", left: "70%", w: 300, rise: "47vh", dur: 12, delay: 1.6 },
  { src: "assets/reviews/r3.png", left: "33%", w: 330, rise: "41vh", dur: 10.5, delay: 3.1 },
  { src: "assets/reviews/r7.png", left: "76%", w: 290, rise: "45vh", dur: 11.5, delay: 4.4 },
  { src: "assets/reviews/r2.png", left: "10%", w: 318, rise: "43vh", dur: 12.5, delay: 6.0 },
  { src: "assets/reviews/r6.png", left: "58%", w: 326, rise: "48vh", dur: 11, delay: 7.3 },
  { src: "assets/reviews/r8.png", left: "26%", w: 300, rise: "42vh", dur: 12, delay: 8.6 },
  { src: "assets/reviews/r4.png", left: "80%", w: 312, rise: "46vh", dur: 10.5, delay: 9.8 },
];

function FeatureScroll({ onPlay, onCase, onAll }) {
  const videoRef = useFsRef(null);
  const [muted, setMuted] = useFsState(true);

  const handlePlay = () => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.muted = false;
      v.play && v.play();
      setMuted(false);
    }
    onPlay && onPlay();
  };

  return (
    <section className="tk-fscroll fwork">
      <div className="fscroll-header">
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
              <Laurel className="award__laurel" />
              <div className="award__body">
                <div className="award__title">{a.title}</div>
                <div className="award__org">{a.org}</div>
                <div className="award__year">{a.year}</div>
              </div>
              <Laurel className="award__laurel" flip />
            </div>
          ))}
        </div>
      </div>

      {/* full-bleed autoplaying reel */}
      <div className="fwork-stage">
        <video
          ref={videoRef}
          className="fwork-video"
          src="assets/featured-reel.mp4"
          autoPlay muted={muted} loop playsInline preload="auto"
        />
        <div className="fwork-reviews" aria-hidden="true">
          {FWORK_REVIEWS.map((r, i) => (
            <img
              key={i} className="fwork-review" src={r.src} alt=""
              style={{ left: r.left, width: r.w + "px", "--rise": r.rise,
                       animationDuration: r.dur + "s", animationDelay: r.delay + "s" }}
            />
          ))}
        </div>
        <div className="fwork-fade" aria-hidden="true" />
        <button className="fwork-play" onClick={handlePlay} aria-label="Play feature reel">
          <PlayTriangle size={46} id="pgFScroll" />
        </button>
      </div>

      <div className="fscroll-after">
        <div className="tk-feature-cta">
          <Button variant="bronze"  onClick={onCase}>VIEW FULL CASE STUDY</Button>
          <Button variant="outline" onClick={onAll}>EXPLORE ALL FILMS</Button>
        </div>
      </div>
    </section>
  );
}

window.FeatureScroll = FeatureScroll;
