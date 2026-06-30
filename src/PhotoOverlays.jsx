// ============================================================
//  PhotoOverlays — the drill-down layer, above the scaled stage:
//    • SetAlbum     — a set's photos in a grid
//    • PhotoLightbox — one photo, prev/next within the set
//    • CategoryArchive — every set in a category (filterable)
//  Shareable URLs are mirrored into the hash:
//    #portfolio/photography/<cat>/<set>[/<photo>]
//  TODO(routing): on a real server, rewrite these to clean paths
//    /portfolio/photography/<cat>/<set>/<photo>.
// ============================================================
const { useState: useOvState, useEffect: useOvEffect, useRef: useOvRef } = React;
const OVR = (k, fb) => { if (!k) return fb || "assets/cosmic-bg.png"; if (typeof k === "string" && (k.startsWith("assets/") || k.startsWith("/") || k.startsWith("http"))) return k; return (window.__resources && window.__resources[k]) || fb || "assets/cosmic-bg.png"; };

function OvX() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>); }
function OvLink() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" strokeLinecap="round" strokeLinejoin="round" /></svg>); }
function OvChevL() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>); }
function OvChevR() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>); }
function OvBack() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>); }

function useBodyLock() {
  useOvEffect(() => {
    if (window.__pgLockCount == null) window.__pgLockCount = 0;
    window.__pgLockCount += 1;
    document.body.style.overflow = "hidden";
    return () => {
      window.__pgLockCount = Math.max(0, (window.__pgLockCount || 1) - 1);
      if (window.__pgLockCount === 0) document.body.style.overflow = "";
    };
  }, []);
}

/* ===================== SET ALBUM ===================== */
function SetAlbum({ set, catKey, catTitle, onClose, onOpenPhoto }) {
  const [copied, setCopied] = useOvState(false);
  useBodyLock();
  useOvEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    try { history.replaceState(null, "", "#portfolio/photography/" + catKey + "/" + set.id); } catch (e) {}
    return () => { window.removeEventListener("keydown", onKey); try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} };
  }, [set.id]);

  const shareUrl = "tedsaunders.com/portfolio/photography/" + catKey + "/" + set.id;
  const copy = () => { try { navigator.clipboard && navigator.clipboard.writeText("https://" + shareUrl); } catch (e) {} setCopied(true); setTimeout(() => setCopied(false), 1800); };
  const partial = set.photos.length < set.count;

  return ReactDOM.createPortal(
    <div className="pgalb" role="dialog" aria-modal="true" aria-label={set.title} onClick={onClose}>
      <button className="pgalb__x" aria-label="Close" onClick={onClose}><OvX /></button>
      <div className="pgalb__sheet" onClick={(e) => e.stopPropagation()}>
        <div className="pgalb__head">
          <div className="pgalb__badge">{catTitle} · Set</div>
          <h2 className="pgalb__title">{set.title}</h2>
          <p className="pgalb__sub"><b>{set.count}</b> {set.count === 1 ? "photo" : "photos"} in this set{partial ? <span> · showing {set.photos.length} featured</span> : null}</p>
        </div>
        <div className="pgalb__grid">
          {set.photos.map((p, i) => (
            <button type="button" className="pgalb__cell" key={p.id} aria-label={"Open frame " + (i + 1)} onClick={() => onOpenPhoto(p.id)}>
              <img src={OVR(p.thumb, "assets/cosmic-bg.png")} alt={set.title + " — frame " + (i + 1)} loading="lazy" />
            </button>
          ))}
        </div>
        {partial ? (
          <p className="pgalb__note">Showing the featured frames from this set — <i>the full {set.count}-photo set is delivered by Ted.</i></p>
        ) : null}
        <div className="pgalb__share" onClick={copy} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") copy(); }}>
          <OvLink /><code>{shareUrl}</code>{copied ? <span className="pgalb__copied">Copied</span> : null}
        </div>
      </div>
    </div>, document.body);
}

/* ===================== PHOTO LIGHTBOX ===================== */
function PhotoLightbox({ set, catKey, catTitle, photoId, onClose, onBack, onSelect }) {
  const [copied, setCopied] = useOvState(false);
  useBodyLock();
  const list = set.photos;
  const idx = list.findIndex((p) => p.id === photoId);
  const photo = list[idx] || list[0];

  const step = (dir) => { if (!list.length) return; const nx = list[(idx + dir + list.length) % list.length]; if (nx) onSelect(nx.id); };

  useOvEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onBack();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line
  }, [photoId, set.id]);

  useOvEffect(() => {
    setCopied(false);
    try { history.replaceState(null, "", "#portfolio/photography/" + catKey + "/" + set.id + "/" + photoId); } catch (e) {}
    return () => { try { history.replaceState(null, "", "#portfolio/photography/" + catKey + "/" + set.id); } catch (e) {} };
  }, [photoId]);

  if (!photo) return null;
  const shareUrl = "tedsaunders.com/portfolio/photography/" + catKey + "/" + set.id + "/" + photo.id;
  const copy = () => { try { navigator.clipboard && navigator.clipboard.writeText("https://" + shareUrl); } catch (e) {} setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return ReactDOM.createPortal(
    <div className="pglb" role="dialog" aria-modal="true" aria-label={set.title + " — frame " + (idx + 1)}>
      <div className="pglb__top">
        <button className="pglb__back" onClick={onBack}><OvBack />Back to {set.title}</button>
        <div className="pglb__count">{String(idx + 1).padStart(2, "0")} <b>/ {String(list.length).padStart(2, "0")}</b></div>
        <button className="pglb__x" aria-label="Close" onClick={onClose}><OvX /></button>
      </div>
      <div className="pglb__stage">
        <div className="pglb__imgwrap">
          <div className="pglb__frameno">FRAME · {String(idx + 1).padStart(2, "0")}</div>
          <img src={OVR(photo.thumb, "assets/cosmic-bg.png")} alt={set.title} key={photo.id} />
          {list.length > 1 ? (
            <React.Fragment>
              <button className="pglb__nav pglb__nav--prev" aria-label="Previous" onClick={() => step(-1)}><OvChevL /></button>
              <button className="pglb__nav pglb__nav--next" aria-label="Next" onClick={() => step(1)}><OvChevR /></button>
            </React.Fragment>
          ) : null}
        </div>
        <div className="pglb__info">
          <div className="pglb__badge">{catTitle}</div>
          <h2 className="pglb__title">{set.title}</h2>
          <div className="pglb__rule" />
          <p className="pglb__desc">Frame {idx + 1} of {set.count} from the {set.title} set — part of Ted's {catTitle.toLowerCase()} archive, where every image is made to feel like a moment from a larger story.</p>
          <div className="pglb__spacer" />
          {list.length > 1 ? (
            <React.Fragment>
              <div className="pglb__rail-h">In this set</div>
              <div className="pglb__rail">
                {list.map((p) => (
                  <button type="button" className={"pglb__thumb" + (p.id === photo.id ? " is-cur" : "")} key={p.id} aria-label="Frame" onClick={() => onSelect(p.id)}>
                    <img src={OVR(p.thumb, "assets/cosmic-bg.png")} alt="" />
                  </button>
                ))}
              </div>
            </React.Fragment>
          ) : null}
          <div className="pglb__share" onClick={copy} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") copy(); }}>
            <OvLink /><code>{shareUrl}</code>{copied ? <span className="pglb__copied">Copied</span> : null}
          </div>
        </div>
      </div>
    </div>, document.body);
}

/* ===================== CATEGORY ARCHIVE ===================== */
function CategoryArchive({ cat, sets, onClose, onOpenSet }) {
  const [sub, setSub] = useOvState("all");
  useBodyLock();
  useOvEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Stack = window.SetCard;
  const shown = (sub === "all" ? sets : sets.filter((s) => s.sub === sub)).slice().sort((a, b) => b.count - a.count);
  const tagFor = (s) => { if (s.sub && cat.subs) { const f = cat.subs.find((x) => x.key === s.sub); if (f) return f.label; } return cat.title; };

  return ReactDOM.createPortal(
    <div className="pgarc" role="dialog" aria-modal="true" aria-label={cat.title + " archive"} onClick={onClose}>
      <button className="pgalb__x" aria-label="Close" onClick={onClose}><OvX /></button>
      <div className="pgarc__sheet" onClick={(e) => e.stopPropagation()}>
        <div className="pgarc__head">
          <div className="pgarc__eyebrow">The Full Archive · {sets.length} sets</div>
          <h2 className="pgarc__title">{cat.title}</h2>
        </div>
        {cat.subs ? (
          <div className="pgarc__filters">
            <button type="button" className={"pgarc__chip" + (sub === "all" ? " is-on" : "")} onClick={() => setSub("all")}>All<span> · {sets.length}</span></button>
            {cat.subs.map((x) => {
              const n = sets.filter((s) => s.sub === x.key).length;
              return (<button type="button" key={x.key} className={"pgarc__chip" + (sub === x.key ? " is-on" : "")} onClick={() => setSub(x.key)}>{x.label}<span> · {n}</span></button>);
            })}
          </div>
        ) : null}
        <div className="pgarc__grid">
          {shown.map((s) => (Stack ? <Stack key={s.id} set={s} tag={tagFor(s)} onOpen={onOpenSet} /> : null))}
        </div>
      </div>
    </div>, document.body);
}

Object.assign(window, { SetAlbum, PhotoLightbox, CategoryArchive });
