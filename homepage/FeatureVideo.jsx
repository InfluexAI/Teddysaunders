// FeatureVideo.jsx — "Disrupting Culture" section with section head,
// video poster, three testimonials, then primary+outline CTA pair.
function FeatureVideo({ onPlay, onCase, onAll }) {
  return (
    <section className="tk-feature-section">
      <div className="tk-section-head">
        <div className="eyebrow">Featured Work</div>
        <h2>Disrupting Culture<br />By Impacting Millions</h2>
        <p className="blurb">
          With over 4 million views, this film tripled Burning Man&rsquo;s ticket sales,
          selling them out for the first time. Over a decade later, people still watch it
          religiously, stating that it gives them hope during hard times.
        </p>
      </div>

      <div className="tk-video" onClick={onPlay} role="button" aria-label="Play feature reel">
        <div className="play"><PlayTriangle size={42} id="pgFeat" /></div>
      </div>

      <Testimonials />

      <div className="tk-feature-cta">
        <Button variant="bronze"  onClick={onCase}>VIEW FULL CASE STUDY</Button>
        <Button variant="outline" onClick={onAll}>EXPLORE ALL FILMS</Button>
      </div>
    </section>
  );
}

window.FeatureVideo = FeatureVideo;
