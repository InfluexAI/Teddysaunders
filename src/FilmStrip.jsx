// FilmStrip.jsx — a slanted, infinitely-scrolling strip of film frames that
// bridges the TEDFLIX archive and the "Imperfection is the story" section,
// bleeding diagonally between them like a continuous reel.
function FilmStrip() {
  const R = (typeof window !== "undefined" && window.__resources) || {};
  const photos = [1, 2, 3, 4, 5, 6, 7, 8].map(
    (n) => R["film" + n] || `assets/film/photo-${n}.jpg`
  );
  // Duplicate the set so the marquee can loop seamlessly (-50%).
  const cells = photos.concat(photos);
  return (
    <div className="tk-filmstrip" aria-hidden="true">
      <div className="film-strip">
        <div className="film-track">
          {cells.map((src, i) => (
            <div className="film-cell" key={i}>
              <div className="film-photo"><img src={src} alt="" draggable="false" /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.FilmStrip = FilmStrip;
