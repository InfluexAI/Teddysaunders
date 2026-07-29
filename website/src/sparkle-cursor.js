// sparkle-cursor.js — a magical gold sparkle trail that follows the cursor.
// Self-contained, no deps. Respects prefers-reduced-motion and pointer type.
(function () {
  if (window.__sparkleCursorOn) return;
  window.__sparkleCursorOn = true;

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  if (reduce || coarse) return; // no trail on touch / reduced-motion

  var canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;";
  var ctx;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function start() {
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    resize();
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);

  // Gold palette pulled from the site's bronze tokens.
  var COLORS = ["#F4D58E", "#E8B777", "#D19D63", "#C9913F", "#FBE7C4"];
  var parts = [];
  var last = { x: 0, y: 0, t: 0, has: false };
  var pointer = { x: 0, y: 0, moved: false };

  function spawn(x, y, count, speedBoost) {
    for (var i = 0; i < count; i++) {
      var ang = Math.random() * Math.PI * 2;
      var spd = (Math.random() * 0.5 + 0.15) * (speedBoost || 1);
      var isStar = Math.random() < 0.32; // some 4-point stars, some dust
      parts.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 0.25, // slight upward drift, like embers
        life: 0,
        max: (isStar ? 620 : 460) + Math.random() * 320,
        size: isStar ? 4.5 + Math.random() * 4 : 1.2 + Math.random() * 2.2,
        spin: (Math.random() - 0.5) * 0.12,
        rot: Math.random() * Math.PI,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        star: isStar
      });
    }
    if (parts.length > 380) parts.splice(0, parts.length - 380);
  }

  function onMove(e) {
    var x = e.clientX, y = e.clientY;
    pointer.x = x; pointer.y = y; pointer.moved = true;
    var now = performance.now();
    if (!last.has) { last.x = x; last.y = y; last.t = now; last.has = true; return; }
    var dx = x - last.x, dy = y - last.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    // Emit proportionally to movement so fast flicks throw more sparkle.
    var n = Math.min(8, Math.floor(dist / 7));
    if (dist > 2) spawn(x, y, n + 1, 1 + Math.min(dist / 60, 1.6));
    last.x = x; last.y = y; last.t = now;
  }
  window.addEventListener("mousemove", onMove, { passive: true });

  // A gentle sparkle burst on click — a little flourish.
  window.addEventListener("mousedown", function (e) {
    spawn(e.clientX, e.clientY, 14, 2.2);
  }, { passive: true });

  function drawStar(p, alpha) {
    var s = p.size;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalCompositeOperation = "lighter";
    // 4-point sparkle via two crossed gradients
    var g = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 2.2);
    g.addColorStop(0, p.color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.globalAlpha = alpha * 0.9;
    ctx.beginPath();
    for (var i = 0; i < 4; i++) {
      var a = (Math.PI / 2) * i;
      ctx.lineTo(Math.cos(a) * s * 2.2, Math.sin(a) * s * 2.2);
      ctx.lineTo(Math.cos(a + Math.PI / 4) * s * 0.5, Math.sin(a + Math.PI / 4) * s * 0.5);
    }
    ctx.closePath();
    ctx.fill();
    // bright core
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#FFF6E2";
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.42, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawDust(p, alpha) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = alpha;
    var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.4);
    g.addColorStop(0, p.color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  var prev = performance.now();
  function frame(now) {
    var dt = Math.min(48, now - prev); prev = now;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i];
      p.life += dt;
      if (p.life >= p.max) { parts.splice(i, 1); continue; }
      var k = p.life / p.max;
      // ease-out drift + slowdown
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.97; p.vy *= 0.97;
      p.vy += 0.0006 * dt; // faint gravity once embers slow
      p.rot += p.spin;
      var alpha = k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85;
      alpha = Math.max(0, Math.min(1, alpha));
      if (p.star) drawStar(p, alpha); else drawDust(p, alpha);
    }
    requestAnimationFrame(frame);
  }

  if (document.body) start();
  else document.addEventListener("DOMContentLoaded", start);
})();
