// ============================================================
//  PhotoSections — the set card and the per-category sections.
//  Reuses the films editorial banner (FpBanner) + browse row
//  (FpRow) + reveal (useFpReveal) from FilmsSections.jsx, plus
//  lit-page's gold CTA. Each content category renders its own
//  banner section with featured set rows. Exposed on window.
// ============================================================
const { useRef: usePsRef } = React;
const PSR = (k, fb) => { if (!k) return fb || "assets/cosmic-bg.png"; if (typeof k === "string" && (k.startsWith("assets/") || k.startsWith("/") || k.startsWith("http"))) return k; return (window.__resources && window.__resources[k]) || fb || "assets/cosmic-bg.png"; };
const FEATURED_PER_ROW = 6;   // curated count shown inline; rest behind "View all"
const FEATURED_PER_SUB = 5;

function PsExpand() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" strokeLinecap="round" /></svg>);
}
function PsStack() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="3" y="3" width="13" height="13" rx="2" /><path d="M8 21h11a2 2 0 0 0 2-2V8" strokeLinecap="round" /></svg>);
}
function PsArrow() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>); }

// Pick up to 4 cover photos — use cat.covers if curated, else spread across sets.
function pickCollagePhotos(cat) {
  if (cat.covers && cat.covers.length) return cat.covers.slice(0, 4);
  const sets = (window.pgSetsFor ? window.pgSetsFor(cat.key) : []).filter((s) => s.photos && s.photos.length);
  const n = Math.min(4, sets.length);
  if (!n) return cat.banner ? [cat.banner] : [];
  const step = sets.length / n;
  const out = [];
  for (let i = 0; i < n; i++) {
    const s = sets[Math.floor(i * step)];
    if (s && s.photos[0]) out.push(s.photos[0].thumb);
  }
  return out;
}

// Diagonal cinematic collage — four skewed parallelogram strips.
function PgCollage({ photos }) {
  const shown = photos.slice(0, 4);
  while (shown.length && shown.length < 4) shown.push(photos[shown.length % photos.length]);
  return (
    <div className="pg-collage">
      <div className="pg-collage__row">
        {shown.map((src, i) => (
          <div className="pg-collage__panel" key={i}>
            <img src={PSR(src, "assets/cosmic-bg.png")} alt="" loading="lazy" />
          </div>
        ))}
      </div>
      <div className="pg-collage__vignette" aria-hidden="true" />
    </div>
  );
}

// Photography-specific banner: collage image + title card (reuses lp-banner classes).
function PgBanner({ cat, eyebrow, title, blurb }) {
  const photos = pickCollagePhotos(cat);
  return (
    <div className="lp-banner lp-reveal">
      <div className="lp-banner__side" aria-hidden="true" style={{display:"none"}} />
      <div className="lp-banner__media">
        <PgCollage photos={photos} />
        <div className="lp-banner__vig" />
      </div>
      <div className="lp-banner__card">
        {eyebrow ? <div className="lp-banner__eyebrow">{eyebrow}</div> : null}
        <h2 className="lp-banner__title">{title}</h2>
        <div className="lp-banner__bar" />
      </div>
      {blurb ? <p className="lp-banner__blurb">{blurb}</p> : null}
    </div>
  );
}

// ---- a single set (album) card ----
function SetCard({ set, tag, onOpen }) {
  const many = set.count > 1;
  return (
    <button type="button" className={"pg-set" + (many ? " pg-set--many" : "")} aria-label={"Open " + set.title}
      onClick={() => onOpen(set)}>
      <div className="pg-set__art">
        <div className="pg-set__cover"><img src={PSR(set.cover, "assets/cosmic-bg.png")} alt={set.title} loading="lazy" /></div>
        <div className="pg-set__badge">{many ? <PsStack /> : null}{set.count} {set.count === 1 ? "photo" : "photos"}</div>
        <div className="pg-set__open"><PsExpand /></div>
        <div className="pg-set__meta">
          <h3 className="pg-set__name">{set.title}</h3>
          <div className="pg-set__tag">{tag}</div>
        </div>
      </div>
    </button>
  );
}

// ---- one row of set cards (uses the films FpRow if present) ----
function SetRow({ sets, tagFor, onOpen }) {
  const Row = window.FpRow;
  const cards = sets.map((s) => <SetCard key={s.id} set={s} tag={tagFor(s)} onOpen={onOpen} />);
  if (Row) return <Row>{cards}</Row>;
  return <div className="pg-compact">{cards}</div>;
}

// ---- a full category section ----
function CategorySection({ cat, sets, onOpenSet, onViewAll }) {
  const reveal = window.useFpReveal ? window.useFpReveal() : usePsRef(null);
  const totalPhotos = sets.reduce((n, s) => n + (s.count || 0), 0);

  const subLabel = (s) => {
    if (s.sub && cat.subs) { const f = cat.subs.find((x) => x.key === s.sub); if (f) return f.label.replace(/'s Wedding$/, "'s"); }
    return cat.title;
  };

  const banner = <PgBanner cat={cat} eyebrow={cat.comingSoon ? "Coming Soon" : "Featured Sets"} title={cat.title} blurb={cat.blurb} />;

  let body;
  if (cat.comingSoon) {
    body = (
      <div className="pg-soon lp-reveal">
        {cat.subs ? (
          <div className="pg-soon__subs">
            {cat.subs.map((s) => (<span className="pg-soon__sub" key={s.key}>{s.label}</span>))}
          </div>
        ) : null}
        <p className="pg-soon__txt">These frames are being prepared for the archive.</p>
      </div>
    );
  } else if (cat.subs) {
    body = (
      <React.Fragment>
        {cat.subs.map((sub) => {
          const subSets = sets.filter((s) => s.sub === sub.key);
          return (
            <div className="pg-subrow lp-reveal" key={sub.key}>
              <div className="pg-subrow__head">
                <h3 className="pg-subrow__label">{sub.label}</h3>
                <span className="pg-subrow__count">{subSets.length ? subSets.length + " sets" : "Coming soon"}</span>
                <span className="pg-subrow__line" />
              </div>
              {subSets.length ? (
                <SetRow sets={subSets.slice().sort((a,b) => b.count - a.count).slice(0, FEATURED_PER_SUB)} tagFor={() => sub.label} onOpen={onOpenSet} />
              ) : (
                <div className="pg-soon" style={{ margin: "0 var(--pg-pad)", padding: 40 }}>
                  <p className="pg-soon__txt">New {sub.label.toLowerCase()} frames coming soon.</p>
                </div>
              )}
            </div>
          );
        })}
      </React.Fragment>
    );
  } else if (cat.compact) {
    body = (
      <div className="pg-compact lp-reveal">
        {sets.map((s) => (<SetCard key={s.id} set={s} tag={cat.title} onOpen={onOpenSet} />))}
      </div>
    );
  } else {
    body = (
      <div className="lp-reveal">
        <SetRow sets={sets.slice().sort((a,b) => b.count - a.count).slice(0, FEATURED_PER_ROW)} tagFor={() => cat.title} onOpen={onOpenSet} />
      </div>
    );
  }

  const showViewAll = !cat.comingSoon && !cat.compact && sets.length > 0;

  return (
    <section className={"pg-sec pg-sec--" + (cat.side || "left") + " lp-grain"} id={"pgsec-" + cat.key}
      data-screen-label={cat.title} ref={reveal}>
      <div className="pg-sec__seam" />
      <div className="pg-sec__aura" aria-hidden="true" />
      {!cat.comingSoon ? (
        <div className="pg-stat"><b>{sets.length}</b> {sets.length === 1 ? "set" : "sets"} · {totalPhotos.toLocaleString()} photos</div>
      ) : null}
      {banner}
      {body}
      {showViewAll ? (
        <div className="pg-viewall lp-reveal">
          <button className="lp-cta lp-cta--gold" onClick={() => onViewAll(cat)}>
            View all in {cat.title}<span className="arr"><PsArrow /></span>
          </button>
        </div>
      ) : null}
    </section>
  );
}

Object.assign(window, { SetCard, SetRow, CategorySection });
