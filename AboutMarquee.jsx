// AboutMarquee.jsx — full-width dark credits reel that scrolls infinitely.
// Sits directly beneath the opening hero teaser.
const AB_ROLES = [
  "Director", "Producer", "Cinematographer", "Editor", "Music Producer",
  "Photographer", "Writer", "Designer", "Creator", "Strategist",
];

function AboutRolesMarquee() {
  // Two identical tracks laid end-to-end so the loop is seamless.
  const track = (key) => (
    <div className="ab-marquee__track" key={key} aria-hidden={key === "b" ? "true" : undefined}>
      {AB_ROLES.map((r, i) => (
        <span className="ab-marquee__item" key={r + i}>
          <span className="ab-marquee__role">{r}</span>
          <span className="ab-marquee__dot" aria-hidden="true">&bull;</span>
        </span>
      ))}
    </div>
  );
  return (
    <section className="ab-marquee" aria-label="Roles">
      {window.Sparkles ? (
        <Sparkles className="ab-marquee__sparkles" density={140} size={1.3} speed={0.4} opacity={0.6} color="#F7DBA0" />
      ) : null}
      <div className="ab-marquee__viewport">
        {track("a")}
        {track("b")}
      </div>
    </section>
  );
}

window.AboutRolesMarquee = AboutRolesMarquee;
