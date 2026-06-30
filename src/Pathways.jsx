// Pathways.jsx — HOME SECTION 8: three cinematic "world portals" the visitor
// chooses between. Equal vertical panels that expand on hover (the hovered
// world opens, neighbours compress), each a full-height image the user drops
// in. Below: a calm convergence CTA for those who don't fit one box.
function Pathways({ onPath, onConverge }) {
  const paths = [
    {
      id: "brands", index: "01",
      label: "Brands & Clients", category: "Commercial & Brand Work",
      copy: "You need a director who understands story at a cellular level. Ted has helmed campaigns for Salesforce, Ancestry.com, and Comcast — with the emotional intelligence and visual command to match any scale.",
      cta: "View Commercial Work",
      img: "assets/pathways/brands.jpg", res: "pathBrands",
    },
    {
      id: "individuals", index: "02",
      label: "Individual Clients", category: "Compass Coaching",
      copy: "You're a man ready to find your path and optimize your life. Ted works with men to master the four core dimensions that determine everything: career, finances, health, and relationships.",
      cta: "Apply for Coaching",
      img: "assets/pathways/individuals.jpg", res: "pathIndividuals",
    },
    {
      id: "investors", index: "03",
      label: "Investors", category: "Original IP & Ventures",
      copy: "You believe in the kind of platforms that dare to shift the paradigm of today's culture. Ted has developed original cinematic worlds for visionary investors who back what matters.",
      cta: "Explore Original IP",
      img: "assets/pathways/investors.jpg", res: "pathInvestors",
    },
  ];

  return (
    <section className="tk-pathways">
      <div className="pathways-head">
        <div className="pathways-eyebrow">Choose your transformation</div>
        <h2 className="pathways-title">There is a path here for you.</h2>
        <p className="pathways-sub">
          Whether you need a director, a collaborator, a guide or a return on
          investment — Ted can help you build something meaningful.
        </p>
      </div>

      <div className="pathways-row">
        {paths.map((p) => (
          <div className={"pathway pathway--" + p.id} key={p.id}>
            <img
              className="pathway__img"
              src={(window.__resources && window.__resources[p.res]) || p.img}
              alt={p.label}
            />
            <div className="pathway__atmos" aria-hidden="true" />
            <div className="pathway__scrim" aria-hidden="true" />
            <div className="pathway__index" aria-hidden="true">{p.index}</div>
            <div className="pathway__hint" aria-hidden="true">
              <span>Hover</span>
              <i>+</i>
            </div>

            <div className="pathway__content">
              <div className="pathway__category">{p.label}</div>
              <h3 className="pathway__label">{p.category}</h3>
              <p className="pathway__copy">{p.copy}</p>
              <button className="pathway__cta" onClick={() => onPath && onPath(p)}>
                {p.cta}
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.Pathways = Pathways;
