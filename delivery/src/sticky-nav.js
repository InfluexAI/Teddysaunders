/* sticky-nav.js — global scroll-activated sticky header.
 *
 * The site's real <header class="tk-header"> lives inside a transform:scale()
 * stage on most pages, so it can't be made position:fixed to the viewport.
 * Instead we clone it into a standalone bar appended directly to <body>
 * (outside any transformed ancestor) and slide it in once the user scrolls
 * past the original header. Pure-CSS hover mega-menu keeps working in the clone;
 * the clone's links navigate via their href, and the mobile hamburger is wired
 * to trigger the original header's button.
 *
 * Load once per page: <script src="src/sticky-nav.js?v=1"></script>
 */
(function () {
  "use strict";
  if (window.__tkStickyNavInit) return;
  window.__tkStickyNavInit = true;

  function build(sourceHeader) {
    if (document.querySelector(".tk-stickynav")) return;

    var bar = document.createElement("div");
    bar.className = "tk-stickynav";

    var clone = sourceHeader.cloneNode(true);
    // The clone's React onClick handlers are lost; hrefs still navigate.
    // Wire the cloned hamburger to click the live one so the mobile menu opens.
    var cloneToggle = clone.querySelector(".tk-menu-toggle");
    var liveToggle = sourceHeader.querySelector(".tk-menu-toggle");
    if (cloneToggle && liveToggle) {
      cloneToggle.addEventListener("click", function (e) {
        e.preventDefault();
        liveToggle.click();
      });
    }
    // Drop the cloned mobile-menu overlay — one on the page is enough.
    var cloneMobile = clone.querySelector(".tk-mobile-menu");
    if (cloneMobile) cloneMobile.remove();

    bar.appendChild(clone);
    document.body.appendChild(bar);

    // Appear right as the real header scrolls up out of view, so the sticky
    // bar reads as the same nav "following" rather than a delayed pop-in.
    function threshold() {
      var r = sourceHeader.getBoundingClientRect();
      var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      var headerBottom = r.bottom + scrollY;
      return Math.max(40, headerBottom - bar.offsetHeight - 8);
    }
    var SHOW_AT = threshold();
    window.addEventListener("resize", function () { SHOW_AT = threshold(); });

    var visible = false;
    function update() {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      var shouldShow = y > SHOW_AT;
      if (shouldShow !== visible) {
        visible = shouldShow;
        bar.classList.toggle("is-visible", visible);
        // Mark the original header so pages can hide it while the sticky
        // bar is showing (scoped per-page via CSS).
        sourceHeader.classList.toggle("tk-header--stuck", visible);
      }
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function waitForHeader() {
    var h = document.querySelector(".tk-header");
    if (h) { build(h); return; }
    var obs = new MutationObserver(function () {
      var el = document.querySelector(".tk-header");
      if (el) { obs.disconnect(); build(el); }
    });
    obs.observe(document.body, { childList: true, subtree: true });
    // Safety timeout so the observer doesn't run forever.
    setTimeout(function () { obs.disconnect(); }, 15000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitForHeader);
  } else {
    waitForHeader();
  }
})();
