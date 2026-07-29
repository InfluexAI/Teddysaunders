// LitGallery.jsx — CircularGallery (bent WebGL image rail) ported from the
// 21st.dev / OGL component to a dependency-free React global. OGL is loaded
// at runtime as an ES module from a CDN (via a Function-wrapped dynamic import
// so Babel leaves it intact). Exposes window.LitCircularGallery.
(function () {
  const { useRef: cgUseRef, useEffect: cgUseEffect } = React;

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  function lerp(p1, p2, t) { return p1 + (p2 - p1) * t; }
  function autoBind(instance) {
    const proto = Object.getPrototypeOf(instance);
    Object.getOwnPropertyNames(proto).forEach((key) => {
      if (key !== "constructor" && typeof instance[key] === "function") {
        instance[key] = instance[key].bind(instance);
      }
    });
  }

  function createTextTexture(OGL, gl, text, font, color) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    const textWidth = Math.ceil(metrics.width);
    const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
    canvas.width = textWidth + 20;
    canvas.height = textHeight + 20;
    context.font = font;
    context.fillStyle = color;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    const texture = new OGL.Texture(gl, { generateMipmaps: false });
    texture.image = canvas;
    return { texture, width: canvas.width, height: canvas.height };
  }

  class Title {
    constructor({ OGL, gl, plane, text, textColor, font }) {
      autoBind(this);
      this.OGL = OGL; this.gl = gl; this.plane = plane;
      this.text = text; this.textColor = textColor; this.font = font;
      this.createMesh();
    }
    createMesh() {
      const OGL = this.OGL;
      const { texture, width, height } = createTextTexture(OGL, this.gl, this.text, this.font, this.textColor);
      const geometry = new OGL.Plane(this.gl);
      const program = new OGL.Program(this.gl, {
        vertex: `attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragment: `precision highp float;uniform sampler2D tMap;varying vec2 vUv;void main(){vec4 color=texture2D(tMap,vUv);if(color.a<0.1)discard;gl_FragColor=color;}`,
        uniforms: { tMap: { value: texture } },
        transparent: true,
      });
      this.mesh = new OGL.Mesh(this.gl, { geometry, program });
      const aspect = width / height;
      const textHeight = this.plane.scale.y * 0.15;
      const textWidth = textHeight * aspect;
      this.mesh.scale.set(textWidth, textHeight, 1);
      this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
      this.mesh.setParent(this.plane);
    }
  }

  class Media {
    constructor(opts) {
      Object.assign(this, {
        extra: 0, widthTotal: 0, width: 0, x: 0, scale: 1, padding: 2,
        speed: 0, isBefore: false, isAfter: false,
      });
      this.OGL = opts.OGL;
      this.geometry = opts.geometry;
      this.gl = opts.gl;
      this.image = opts.image;
      this.index = opts.index;
      this.length = opts.length;
      this.scene = opts.scene;
      this.screen = opts.screen;
      this.text = opts.text;
      this.viewport = opts.viewport;
      this.bend = opts.bend;
      this.textColor = opts.textColor;
      this.borderRadius = opts.borderRadius || 0;
      this.font = opts.font;
      this.createShader();
      this.createMesh();
      this.createTitle();
      this.onResize();
    }
    createShader() {
      const OGL = this.OGL;
      const texture = new OGL.Texture(this.gl, { generateMipmaps: true });
      this.program = new OGL.Program(this.gl, {
        depthTest: false,
        depthWrite: false,
        vertex: `precision highp float;attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform float uTime;uniform float uSpeed;varying vec2 vUv;void main(){vUv=uv;vec3 p=position;p.z=(sin(p.x*4.0+uTime)*1.5+cos(p.y*2.0+uTime)*1.5)*(0.1+uSpeed*0.5);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
        fragment: `precision highp float;uniform vec2 uImageSizes;uniform vec2 uPlaneSizes;uniform sampler2D tMap;uniform float uBorderRadius;varying vec2 vUv;float roundedBoxSDF(vec2 p,vec2 b,float r){vec2 d=abs(p)-b;return length(max(d,vec2(0.0)))+min(max(d.x,d.y),0.0)-r;}void main(){vec2 ratio=vec2(min((uPlaneSizes.x/uPlaneSizes.y)/(uImageSizes.x/uImageSizes.y),1.0),min((uPlaneSizes.y/uPlaneSizes.x)/(uImageSizes.y/uImageSizes.x),1.0));vec2 uv=vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5,vUv.y*ratio.y+(1.0-ratio.y)*0.5);vec4 color=texture2D(tMap,uv);float d=roundedBoxSDF(vUv-0.5,vec2(0.5-uBorderRadius),uBorderRadius);float edgeSmooth=0.002;float alpha=1.0-smoothstep(-edgeSmooth,edgeSmooth,d);gl_FragColor=vec4(color.rgb,alpha);}`,
        uniforms: {
          tMap: { value: texture },
          uPlaneSizes: { value: [0, 0] },
          uImageSizes: { value: [0, 0] },
          uSpeed: { value: 0 },
          uTime: { value: 100 * Math.random() },
          uBorderRadius: { value: this.borderRadius },
        },
        transparent: true,
      });
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = this.image;
      img.onload = () => {
        texture.image = img;
        this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      };
    }
    createMesh() {
      this.plane = new this.OGL.Mesh(this.gl, { geometry: this.geometry, program: this.program });
      this.plane.setParent(this.scene);
    }
    createTitle() {
      if (!this.text) return;
      this.title = new Title({ OGL: this.OGL, gl: this.gl, plane: this.plane, text: this.text, textColor: this.textColor, font: this.font });
    }
    update(scroll, direction) {
      this.plane.position.x = this.x - scroll.current - this.extra;
      const x = this.plane.position.x;
      const H = this.viewport.width / 2;
      if (this.bend === 0) {
        this.plane.position.y = 0; this.plane.rotation.z = 0;
      } else {
        const B_abs = Math.abs(this.bend);
        const R = (H * H + B_abs * B_abs) / (2 * B_abs);
        const effectiveX = Math.min(Math.abs(x), H);
        const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
        if (this.bend > 0) {
          this.plane.position.y = -arc;
          this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
        } else {
          this.plane.position.y = arc;
          this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
        }
      }
      this.speed = scroll.current - scroll.last;
      this.program.uniforms.uTime.value += 0.04;
      this.program.uniforms.uSpeed.value = this.speed;
      const planeOffset = this.plane.scale.x / 2;
      const viewportOffset = this.viewport.width / 2;
      this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
      this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
      if (direction === "right" && this.isBefore) { this.extra -= this.widthTotal; this.isBefore = this.isAfter = false; }
      if (direction === "left" && this.isAfter) { this.extra += this.widthTotal; this.isBefore = this.isAfter = false; }
    }
    onResize({ screen, viewport } = {}) {
      if (screen) this.screen = screen;
      if (viewport) this.viewport = viewport;
      this.scale = this.screen.height / 1500;
      this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
      this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
      this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
      this.padding = 2;
      this.width = this.plane.scale.x + this.padding;
      this.widthTotal = this.width * this.length;
      this.x = this.width * this.index;
    }
  }

  class App {
    constructor(OGL, container, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase }) {
      this.OGL = OGL;
      this.container = container;
      this.scrollSpeed = scrollSpeed;
      this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0, position: 0 };
      this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
      this.isDown = false; this.start = 0;
      autoBind(this);
      this.createRenderer();
      this.createCamera();
      this.createScene();
      this.onResize();
      this.createGeometry();
      this.createMedias(items, bend, textColor, borderRadius, font);
      this.update();
      this.addEventListeners();
    }
    createRenderer() {
      this.renderer = new this.OGL.Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
      this.gl = this.renderer.gl;
      this.gl.clearColor(0, 0, 0, 0);
      this.container.appendChild(this.gl.canvas);
    }
    createCamera() {
      this.camera = new this.OGL.Camera(this.gl);
      this.camera.fov = 45;
      this.camera.position.z = 20;
    }
    createScene() { this.scene = new this.OGL.Transform(); }
    createGeometry() { this.planeGeometry = new this.OGL.Plane(this.gl, { heightSegments: 50, widthSegments: 100 }); }
    createMedias(items, bend, textColor, borderRadius, font) {
      const galleryItems = items && items.length ? items : [];
      this.mediasImages = galleryItems.concat(galleryItems);
      this.medias = this.mediasImages.map((data, index) => new Media({
        OGL: this.OGL, geometry: this.planeGeometry, gl: this.gl, image: data.image,
        index, length: this.mediasImages.length, scene: this.scene, screen: this.screen,
        text: data.text, viewport: this.viewport, bend, textColor, borderRadius, font,
      }));
    }
    onTouchDown(e) {
      this.isDown = true;
      this.scroll.position = this.scroll.current;
      this.start = "touches" in e ? e.touches[0].clientX : e.clientX;
    }
    onTouchMove(e) {
      if (!this.isDown) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const distance = (this.start - x) * (this.scrollSpeed * 0.025);
      this.scroll.target = this.scroll.position + distance;
    }
    onTouchUp() { this.isDown = false; this.onCheck(); }
    onWheel(e) {
      const delta = e.deltaY || e.wheelDelta || e.detail;
      this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
      this.onCheckDebounce();
    }
    onCheck() {
      if (!this.medias || !this.medias[0]) return;
      const width = this.medias[0].width;
      const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
      const item = width * itemIndex;
      this.scroll.target = this.scroll.target < 0 ? -item : item;
    }
    onResize() {
      const rect = this.container.getBoundingClientRect();
      const w = this.container.clientWidth || rect.width || window.innerWidth || 1280;
      const h = this.container.clientHeight || rect.height || 620;
      this.screen = { width: w, height: h };
      this.renderer.setSize(this.screen.width, this.screen.height);
      this.camera.perspective({ aspect: this.screen.width / this.screen.height });
      const fov = (this.camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
      const width = height * this.camera.aspect;
      this.viewport = { width, height };
      if (this.medias) this.medias.forEach((m) => m.onResize({ screen: this.screen, viewport: this.viewport }));
    }
    update() {
      this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
      const direction = this.scroll.current > this.scroll.last ? "right" : "left";
      if (this.medias) this.medias.forEach((m) => m.update(this.scroll, direction));
      this.renderer.render({ scene: this.scene, camera: this.camera });
      this.scroll.last = this.scroll.current;
      this.raf = window.requestAnimationFrame(this.update);
    }
    addEventListeners() {
      window.addEventListener("resize", this.onResize);
      window.addEventListener("mousewheel", this.onWheel);
      window.addEventListener("wheel", this.onWheel);
      this.container.addEventListener("mousedown", this.onTouchDown);
      window.addEventListener("mousemove", this.onTouchMove);
      window.addEventListener("mouseup", this.onTouchUp);
      this.container.addEventListener("touchstart", this.onTouchDown, { passive: true });
      window.addEventListener("touchmove", this.onTouchMove, { passive: true });
      window.addEventListener("touchend", this.onTouchUp);
      if (typeof ResizeObserver !== "undefined") {
        this.ro = new ResizeObserver(() => this.onResize());
        this.ro.observe(this.container);
      }
    }
    destroy() {
      window.cancelAnimationFrame(this.raf);
      if (this.ro) { this.ro.disconnect(); this.ro = null; }
      window.removeEventListener("resize", this.onResize);
      window.removeEventListener("mousewheel", this.onWheel);
      window.removeEventListener("wheel", this.onWheel);
      this.container.removeEventListener("mousedown", this.onTouchDown);
      window.removeEventListener("mousemove", this.onTouchMove);
      window.removeEventListener("mouseup", this.onTouchUp);
      this.container.removeEventListener("touchstart", this.onTouchDown);
      window.removeEventListener("touchmove", this.onTouchMove);
      window.removeEventListener("touchend", this.onTouchUp);
      if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
        this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
      }
    }
  }

  function LitCircularGallery(props) {
    const ref = cgUseRef(null);
    const items = props.items;
    const bend = props.bend != null ? props.bend : 3;
    const borderRadius = props.borderRadius != null ? props.borderRadius : 0.05;
    const scrollSpeed = props.scrollSpeed != null ? props.scrollSpeed : 2;
    const scrollEase = props.scrollEase != null ? props.scrollEase : 0.05;
    const textColor = props.textColor || "#E8B777";
    const font = props.font || "bold 30px serif";

    cgUseEffect(() => {
      if (!ref.current) return;
      let app = null, destroyed = false;
      const dynImport = new Function("u", "return import(u)");
      dynImport("https://esm.sh/ogl@1.0.11")
        .then((OGL) => {
          if (destroyed || !ref.current) return;
          app = new App(OGL, ref.current, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase });
          requestAnimationFrame(() => { if (app) app.onResize(); requestAnimationFrame(() => { if (app) app.onResize(); }); });
        })
        .catch((err) => { console.error("LitCircularGallery: OGL load failed", err); });
      return () => { destroyed = true; if (app) app.destroy(); };
    }, [items, bend, borderRadius, scrollSpeed, scrollEase]);

    return React.createElement("div", { ref, className: "lp-cgal" + (props.className ? " " + props.className : "") });
  }

  window.LitCircularGallery = LitCircularGallery;
})();
