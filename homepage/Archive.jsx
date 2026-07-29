// Archive.jsx — "Explore the Archive" film/photo/music/literature tiles.
function Archive({ onOpen }) {
  const items = [
    { tag: "Film",        date: "AUG 25, 2011", title: "Stories that dare you to think differently." },
    { tag: "Photography", date: "JUN 02, 2018", title: "Stories that dare you to think differently." },
    { tag: "Music",       date: "NOV 14, 2020", title: "Stories that dare you to think differently." },
    { tag: "Literature",  date: "MAR 09, 2023", title: "Stories that dare you to think differently." },
  ];
  return (
    <section className="tk-archive-section">
      <div className="tk-section-head">
        <div className="tk-tedivider">
          <div className="rule" />
          <div className="disc"><img src={(window.__resources && window.__resources.logo) || "assets/logo.png"} alt="" /></div>
          <div className="rule" />
        </div>
        <div className="eyebrow">My Work</div>
        <h2>Explore the Archive</h2>
        <p className="blurb">
          Every medium in service of the same obsession — to reveal the beauty of humanity
          through a transformational new lens.
        </p>
      </div>

      <div className="tk-archive">
        {items.map((it, i) => (
          <a key={i} className="tk-archive-card"
             onClick={(e) => { e.preventDefault(); onOpen && onOpen(it); }}
             href="#">
            <div className="thumb">
              <div className="tag">{it.tag}</div>
            </div>
            <div>
              <div className="title">{it.title}</div>
              <div className="date">{it.date}</div>
            </div>
            <div className="arrow">→</div>
          </a>
        ))}
      </div>
    </section>
  );
}

window.Archive = Archive;
