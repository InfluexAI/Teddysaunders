// FeatureScroll-vercel.jsx — Vercel-import variant. Identical to FeatureScroll.jsx
// except the 20MB autoplay reel is swapped for the Burning Man film poster still,
// so the whole homepage inlines into a single file small enough to bundle.
const { useRef: useFsRefV, useState: useFsStateV } = React;

const FWORK_REVIEWS_V = [
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

      {/* full-bleed poster still (reel swapped for still in the Vercel bundle) */}
      <div className="fwork-stage">
        <img
          className="fwork-video"
          src="assets/portfolio/poster-places.png"
          alt="Oh, The Places You'll Go at Burning Man"
        />
        <div className="fwork-reviews" aria-hidden="true">
          {FWORK_REVIEWS_V.map((r, i) => (
            <img
              key={i} className="fwork-review" src={r.src} alt=""
              style={{ left: r.left, width: r.w + "px", "--rise": r.rise,
                       animationDuration: r.dur + "s", animationDelay: r.delay + "s" }}
            />
          ))}
        </div>
        <div className="fwork-fade" aria-hidden="true" />
        <button className="fwork-play" onClick={() => onPlay && onPlay()} aria-label="Play feature reel">
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
