// AboutGallery.jsx — "The Director's Journey": a pinned, scroll-scrubbed 3D gallery.
// As the visitor scrolls, 10 photographs fly toward the camera out of the dark;
// near the end the scene fades to black and the origin-story copy resolves.
const { useRef: useGalRef, useEffect: useGalEffect } = React;

const GALLERY_IMAGES = [
  "assets/gallery/g1.jpg", "assets/gallery/g2.jpg", "assets/gallery/g3.jpg", "assets/gallery/g4.jpg",
  "assets/gallery/g5.jpg", "assets/gallery/g6.jpg", "assets/gallery/g7.jpg", "assets/gallery/g8.jpg",
];
const GAL_COUNT = 10; // total photos flown through

function AboutGallery() {
  const sectionRef = useGalRef(null);
  const mountRef = useGalRef(null);
  const introRef = useGalRef(null);
  const endRef = useGalRef(null);
  const hintRef = useGalRef(null);

  useGalEffect(() => {
    const THREE = window.THREE;
    const mount = mountRef.current;
    const section = sectionRef.current;
    if (!THREE || !mount || !section) return;

    let width = mount.clientWidth || 1;
    let height = mount.clientHeight || 1;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(new THREE.Color("#050301"), 4, 34);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (THREE.sRGBEncoding !== undefined) renderer.outputEncoding = THREE.sRGBEncoding;
    mount.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const textures = GALLERY_IMAGES.map((src) => {
      const t = loader.load(src);
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.minFilter = THREE.LinearFilter;
      return t;
    });

    const SPACING = 5.4, START = 6, TRAVEL = START + (GAL_COUNT - 1) * SPACING + 8; // last clears camera at end
    const SCRUB_END = 0.82; // photos finish; remainder is the fade-to-text
    const fadeNear = 1.5;
    const geo = new THREE.PlaneGeometry(1, 1);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const planes = [];

    for (let i = 0; i < GAL_COUNT; i++) {
      const mat = new THREE.MeshBasicMaterial({
        map: textures[i % textures.length], transparent: true, opacity: 1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const ha = i * golden, va = i * 1.618 + Math.PI / 3;
      const hr = 0.6 + (i % 3) * 0.9, vr = 0.5 + ((i + 1) % 4) * 0.62;
      const x = Math.sin(ha) * hr * 1.7;
      const y = Math.cos(va) * vr * 1.4;
      planes.push({ mesh, z0: -(START + i * SPACING), imageIndex: i % textures.length, x, y });
      scene.add(mesh);
    }

    function applyScale(p) {
      const im = p.mesh.material.map && p.mesh.material.map.image;
      const aspect = im && im.width ? im.width / im.height : 0.888;
      const base = 3.0;
      if (aspect > 1) p.mesh.scale.set(base * aspect, base, 1);
      else p.mesh.scale.set(base, base / aspect, 1);
    }

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

    let disp = 0;
    let raf;

    function frame() {
      // scroll progress through the pinned section (0 → 1)
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const target = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
      disp += (target - disp) * 0.12; // smooth scrub

      const pEff = clamp(disp / SCRUB_END, 0, 1);
      const travel = pEff * TRAVEL;

      planes.forEach((p) => {
        const zWorld = p.z0 + travel;
        p.mesh.position.set(p.x, p.y, zWorld);
        let op = 1;
        if (zWorld >= 0) op = 0;
        else if (zWorld > -fadeNear) op = (0 - zWorld) / fadeNear; // dissolve as it passes
        p.mesh.material.opacity = op;
        p.mesh.visible = op > 0.001;
        applyScale(p);
      });

      // overlays
      const introOp = 1 - smooth(0.02, 0.13, disp);
      if (introRef.current) introRef.current.style.opacity = String(introOp);
      if (hintRef.current) hintRef.current.style.opacity = String(introOp);
      const endOp = smooth(0.82, 0.97, disp);
      if (endRef.current) {
        endRef.current.style.opacity = String(endOp);
        endRef.current.style.pointerEvents = endOp > 0.5 ? "auto" : "none";
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    frame();

    const ro = new ResizeObserver(() => {
      width = mount.clientWidth || 1; height = mount.clientHeight || 1;
      camera.aspect = width / height; camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geo.dispose();
      textures.forEach((t) => t.dispose());
      planes.forEach((p) => p.mesh.material.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="ao-gallery3d" id="ao-story" ref={sectionRef} aria-label="The Director's Journey">
      <div className="ao-gallery3d__sticky">
        <div className="ao-gallery3d__canvas" ref={mountRef}></div>

        <div className="ao-gallery3d__intro" ref={introRef} aria-hidden="true">
          <p className="ao-gallery3d__eyebrow">Origin story</p>
          <h2 className="ao-gallery3d__title ab-textured">The Director&rsquo;s Journey</h2>
          <p className="ao-gallery3d__sub">A camera became more than a tool. It became a portal.</p>
        </div>

        <div className="ao-gallery3d__end" ref={endRef}>
          <div className="ao-gallery3d__endcopy">
            <p>Ted Saunders discovered filmmaking before he understood what filmmaking was.</p>
            <p>The same curiosity that began in childhood still drives the work today: wonder, imagination, emotion, transformation, and meaning.</p>
            <p>What started as fascination eventually became a lifelong search for truth through storytelling.</p>
          </div>
        </div>

        <p className="ao-gallery3d__hint" ref={hintRef}>Scroll to move through the frames</p>
      </div>
    </section>
  );
}

window.AboutGallery = AboutGallery;
