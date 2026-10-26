/* ============================================================
   MOON VALLEY — main.js
   Behavior: rendering of structured content, i18n, modals,
   lightbox, parallax, reveal, navigation and a11y helpers.
   Vanilla JS, no dependencies.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- state ---------------- */
  var lang = "en";
  var I18N = window.MV_I18N;
  var CONTENT = window.MV_CONTENT;
  var CONFIG = window.MV_CONFIG;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  }
  function loc(item) {
    return item[lang] || item.en;
  }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------------- preloader ---------------- */
  var preloader = $("#preloader");
  function hidePreloader() {
    if (!preloader) return;
    preloader.classList.add("is-done");
    setTimeout(function () { preloader.remove(); }, 900);
  }
  if (document.readyState === "complete") hidePreloader();
  else window.addEventListener("load", hidePreloader);
  setTimeout(hidePreloader, 3500); /* never trap the user */

  /* ---------------- header ---------------- */
  var header = $("#siteHeader");
  function onScrollHeader() {
    header.classList.toggle("is-solid", window.scrollY > 40);
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* mobile nav */
  var navToggle = $("#navToggle");
  var siteNav = $("#siteNav");
  function closeNav() {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }
  navToggle.addEventListener("click", function () {
    var open = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  $all(".site-nav__link").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && siteNav.classList.contains("is-open")) {
      closeNav();
      navToggle.focus();
    }
  });

  /* active section highlighting */
  var navLinks = $all(".site-nav__link");
  var sections = ["home", "news", "why", "world", "classes", "profile", "books", "armory", "shop", "droplist", "ranking", "ranked", "roadmap", "features", "media", "youtube", "community"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------------- reveal on scroll ---------------- */
  var revealables = [];
  function registerReveals() {
    revealables = $all(".reveal:not(.is-in)");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealables.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealables.forEach(function (el, i) {
      el.style.setProperty("--reveal-delay", (i % 4) * 0.08 + "s");
      revealObserver.observe(el);
    });
    /* safety net: if the observer never fired (page loaded in a background
       tab, odd visibility states), reveal anything already inside the
       viewport as soon as the page becomes visible again */
    var sweepReveals = function () {
      revealables.forEach(function (el) {
        if (el.classList.contains("is-in")) return;
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
          el.classList.add("is-in");
          revealObserver.unobserve(el);
        }
      });
    };
    window.addEventListener("load", sweepReveals);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) sweepReveals();
    });
  }

  /* ---------------- hero photo backdrop ---------------- */
  var heroPhoto = $("#heroPhoto");
  var heroSection = $(".hero");
  if (heroPhoto && CONFIG.heroImage) {
    heroPhoto.src = CONFIG.heroImage;
    var revealPhoto = function () { heroSection.classList.add("hero--photo"); };
    if (heroPhoto.complete && heroPhoto.naturalWidth) revealPhoto();
    else heroPhoto.addEventListener("load", revealPhoto);
    heroPhoto.addEventListener("error", function () {
      /* graceful fallback: keep the layered SVG scene */
      heroSection.classList.remove("hero--photo");
      heroPhoto.removeAttribute("src");
    });
  }

  /* ---------------- hero parallax + particles ---------------- */
  var sceneLayers = $all(".hero .scene-layer[data-depth]");
  var heroContent = $(".hero__content");
  var scrollCue = $(".hero__scroll-cue");
  if (!reducedMotion && (sceneLayers.length || heroPhoto)) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        var vh = window.innerHeight || 800;
        if (y < vh * 1.3) {
          /* layered SVG scene: layers drift downwards (descending feel) */
          sceneLayers.forEach(function (layer) {
            var depth = parseFloat(layer.dataset.depth || 0);
            layer.style.transform = "translate3d(0," + (y * depth * 100).toFixed(2) + "px,0)";
          });
          /* photo hero: slow cinematic drift + gentle push-in */
          if (heroPhoto && heroSection && heroSection.classList.contains("hero--photo")) {
            var pf = Math.min(y / vh, 1);
            heroPhoto.style.transform =
              "translate3d(0," + (-pf * 120).toFixed(1) + "px,0) scale(" + (1 + pf * 0.12).toFixed(4) + ")";
          }
          /* hero content lifts away and dissolves as the vale appears */
          if (heroContent) {
            var cf = Math.min(y / (vh * 0.55), 1);
            heroContent.style.opacity = (1 - cf).toFixed(3);
            heroContent.style.transform = "translate3d(0," + (-cf * 70).toFixed(1) + "px,0)";
          }
          /* hide the scroll cue once the descent begins */
          if (scrollCue) scrollCue.classList.toggle("is-hidden", y > 70);
        }
        ticking = false;
      });
    }, { passive: true });
  }

  var particleHost = $("#heroParticles");
  if (particleHost && !reducedMotion) {
    var pCount = window.innerWidth < 640 ? 16 : 34;
    for (var p = 0; p < pCount; p++) {
      var dot = document.createElement("span");
      dot.className = "particle" + (Math.random() > 0.55 ? " particle--warm" : "");
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = 40 + Math.random() * 60 + "%";
      dot.style.animationDuration = 6 + Math.random() * 9 + "s";
      dot.style.animationDelay = -Math.random() * 12 + "s";
      dot.style.opacity = "0";
      var scale = 0.6 + Math.random() * 1.2;
      dot.style.width = dot.style.height = (3 * scale).toFixed(1) + "px";
      particleHost.appendChild(dot);
    }
  }

  /* ---------------- feature icons ---------------- */
  var ICONS = {
    sword: '<svg viewBox="0 0 48 48"><path fill="currentColor" d="M35.5 3.2 22.7 16l-2.4-2.4 12.8-12.8c-2.7-.9-5.4-1-7.7-.4L16.4 14.2 12.1 9.9 4.6 17.4l5.6 5.6-2.1 2.1-4.4-1-2.8 2.8 9.3 9.3 2.8-2.8-1-4.4 2.1-2.1 5.6 5.6 7.5-7.5-4.3-4.3 7.4-6.6c.6 2.3.5 5-.4 7.7zM11.6 23.8l-2.8-2.8 2.1-2.1 2.8 2.8-2.1 2.1z"/></svg>',
    shield: '<svg viewBox="0 0 48 48"><path fill="currentColor" d="M24 3.5 7 10.4v11.3C7 31.9 13.4 40.5 24 44.5c10.6-4 17-12.6 17-22.8V10.4L24 3.5zm0 5.4 12 4.9v8c0 8.1-4.9 14.5-12 17.5-7.1-3-12-9.4-12-17.5v-8l12-4.9z"/><path fill="currentColor" d="M24 13.5 27 20l7 .9-5.2 5 1.3 7L24 29.4l-6.1 3.5 1.3-7-5.2-5 7-.9 3-6.5z"/></svg>',
    compass: '<svg viewBox="0 0 48 48"><path fill="currentColor" d="M24 4a20 20 0 1 0 0 40 20 20 0 0 0 0-40zm0 4.5a15.5 15.5 0 1 1 0 31 15.5 15.5 0 0 1 0-31z"/><path fill="currentColor" d="m31.4 14.6-4.9 11.9-11.9 4.9 4.9-11.9 11.9-4.9zM24 21.4a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2z"/></svg>',
    beast: '<svg viewBox="0 0 48 48"><path fill="currentColor" d="M24 12c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7-3.9 1.7-6.8 5.3-7.6 9.7-.2 1 .6 1.9 1.6 1.7 2.1-.4 4-.4 5.8.2l1.1 3.4c.3.9 1.5 1.1 2 .3L23 34h2l.8 3c.5.8 1.7.6 2-.3l1.1-3.4c1.8-.6 3.7-.6 5.8-.2 1 .2 1.8-.7 1.6-1.7-.8-4.4-3.7-8-7.6-9.7.8-1 1.3-2.3 1.3-3.7 0-3.3-2.7-6-6-6zm-8.5-8c.9 0 1.7.9 2.4 2.4.5 1.2.8 2.5.9 3.5-1.6-.5-3-1.3-4-2.2-.6-.6-.4-1.7.4-2 .9-.4 1.9-.6 2.6-.7h-2.3zm17 0c.7.1 1.7.3 2.6.7.8.3 1 1.4.4 2-1 .9-2.4 1.7-4 2.2.1-1 .4-2.3.9-3.5.7-1.5 1.5-2.4 2.4-2.4z"/></svg>',
    star: '<svg viewBox="0 0 48 48"><path fill="currentColor" d="m24 3 5.4 12.3L43 17l-9.7 8.6L36.1 39 24 32.2 11.9 39l2.8-13.4L5 17l13.6-1.7L24 3z"/></svg>',
    banner: '<svg viewBox="0 0 48 48"><path fill="currentColor" d="M10 4h3v40h-3zM16 6h20l-4 6 4 6H16z"/><path fill="currentColor" d="m26 24 8 6-8 6v-4h-6v-4h6z" opacity=".55"/></svg>',
    moon: '<svg viewBox="0 0 48 48"><path fill="currentColor" d="M27 6a18 18 0 1 0 12 31A20.5 20.5 0 0 1 27 6z"/><path fill="currentColor" d="m38.5 5 1.7 4.3 4.3 1.7-4.3 1.7-1.7 4.3-1.7-4.3-4.3-1.7 4.3-1.7L38.5 5z"/></svg>',
    flame: '<svg viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M24 4c6 8 14 13 14 24a14 14 0 1 1-28 0C10 17 18 12 24 4zm0 13.5A10.5 10.5 0 0 0 13.5 28 10.5 10.5 0 0 0 24 38.5 10.5 10.5 0 0 0 34.5 28 10.5 10.5 0 0 0 24 17.5z"/></svg>',
    gun: '<svg viewBox="0 0 48 48"><path fill="currentColor" d="M23 22.4h18v3.2H23zM13 18.6h10.6v10.2H13z"/><path fill="currentColor" d="M13.4 22.5 5 26v6.8l8.4-3.6z"/><path fill="currentColor" d="M15 12.9h9v2.8h-9zM17.6 15.7h1.9v3.2h-1.9zM21.5 15.7h1.9v3.2h-1.9z"/><path fill="currentColor" d="M25.2 28.8h2.6v5.4h-2.6z"/></svg>',
    bow: '<svg viewBox="0 0 48 48"><path fill="currentColor" d="M24 4C12 9 6 16.5 6 24s6 15 18 20v-6.8C14.5 33.7 11 29 11 24s3.5-9.7 13-7.2V4z"/><path fill="currentColor" d="M23.3 4h1.4v40h-1.4z"/><path fill="currentColor" d="M15 22.9h22v2.2H15z"/><path fill="currentColor" d="m37 19.5 7 4.5-7 4.5v-9z"/></svg>',
    staff: '<svg viewBox="0 0 48 48"><circle cx="37" cy="9" r="6" fill="currentColor"/><path fill="currentColor" d="M34.4 13.6 38.8 18 15 41.8l-4.4-4.4z"/><path fill="currentColor" d="m10.5 23 3.2 3.2-3.2 3.2-3.2-3.2z"/><path fill="currentColor" d="m22 33 2.6 2.6L22 38.2 19.4 35.6z"/></svg>',
    helm: '<svg viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M24 4c9 0 15 5.4 15 14v10.5c0 8-5.6 13.6-15 15.5-9.4-1.9-15-7.5-15-15.5V18C9 9.4 15 4 24 4zm-8 16v4.5h16V20a8 8 0 0 0-16 0zm3 9h10v3.5H19z"/></svg>',
    ring: '<svg viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M24 8a17 17 0 1 0 0 34 17 17 0 0 0 0-34zm0 7a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"/><path fill="currentColor" d="m24 3 5.5 7.5h-11L24 3z"/><path fill="currentColor" d="m13.5 10.5 4-3.5 3.5 4-4 3.5zM34.5 10.5l-4-3.5-3.5 4 4 3.5z" opacity=".8"/></svg>',
    potion: '<svg viewBox="0 0 48 48"><path fill="currentColor" d="M20 3h8v5.5h-8z"/><path fill="currentColor" d="M21 8.5h6v6.8c5 2.8 8 7.8 8 13.2a13 13 0 0 1-26 0c0-5.4 3-10.4 8-13.2V8.5z"/><path fill="currentColor" d="M14 27.5a13 13 0 0 0 8.6 11.9 20 20 0 0 0 6.9-2.4c-3.8-1.6-6.4-4.6-7.3-9.5H14z" opacity=".55"/></svg>'
  };

  /* ---------------- NEWS ---------------- */
  var newsGrid = $("#newsGrid");
  var newsViewAll = $("#newsViewAll");

  function categoryClass(cat) {
    return cat === "event" ? " news-card__tag--event" : cat === "lore" ? " news-card__tag--lore" : "";
  }

  function formatDate(iso) {
    var d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString(lang === "pt" ? "pt-BR" : "en-GB", {
      day: "numeric", month: "long", year: "numeric"
    });
  }

  function renderNews() {
    newsGrid.innerHTML = "";
    CONTENT.news.forEach(function (item, index) {
      var c = loc(item);
      var card = document.createElement("article");
      card.className = "frame news-card reveal" +
        (index === 0 ? " news-card--featured" : "") +
        (index > 3 ? " is-extra" : "");
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", c.title);
      card.innerHTML =
        '<span class="gem gem--tl"></span><span class="gem gem--tr"></span>' +
        '<span class="gem gem--bl"></span><span class="gem gem--br"></span>' +
        '<div class="news-card__media">' +
        '<span class="news-card__tag' + categoryClass(item.category) + '">' + c.tag + "</span>" +
        '<img src="' + item.image + '" alt="" loading="lazy">' +
        "</div>" +
        '<div class="news-card__body">' +
        '<time class="news-card__date" datetime="' + item.date + '">' + formatDate(item.date) + "</time>" +
        '<h3 class="news-card__title">' + c.title + "</h3>" +
        '<p class="news-card__excerpt">' + c.excerpt + "</p>" +
        '<span class="news-card__more">' + t("news.readMore") + " →</span>" +
        "</div>";
      function open() { openArticle(item); }
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
      newsGrid.appendChild(card);
    });
    registerReveals();
  }

  newsViewAll.addEventListener("click", function () {
    var expanded = newsGrid.classList.toggle("is-expanded");
    newsViewAll.querySelector("span").textContent = expanded ? t("news.showLess") : t("news.viewAll");
  });

  /* ---------------- REGIONS ---------------- */
  var regionGrid = $("#regionGrid");

  function renderRegions() {
    regionGrid.innerHTML = "";
    CONTENT.regions.forEach(function (item) {
      var c = loc(item);
      var card = document.createElement("article");
      card.className = "frame region-card region-card--" + item.tone + " reveal";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", c.name);
      card.innerHTML =
        '<span class="gem gem--tl"></span><span class="gem gem--tr"></span>' +
        '<span class="gem gem--bl"></span><span class="gem gem--br"></span>' +
        '<div class="region-card__scene"><img src="' + item.scene + '" alt="" loading="lazy"></div>' +
        '<div class="region-card__body">' +
        '<span class="region-card__biome">' + c.biome + "</span>" +
        '<h3 class="region-card__name">' + c.name + "</h3>" +
        '<p class="region-card__desc">' + c.desc + "</p>" +
        '<span class="region-card__link">' + t("world.explore") + "</span>" +
        "</div>";
      function open() { openRegion(item); }
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
      regionGrid.appendChild(card);
    });
    registerReveals();
  }

  /* ---------------- WORLD MAP PINS ---------------- */
  var mapMarkers = $("#worldMapMarkers");
  var worldMapZoom = $("#worldMapZoom");

  function renderMapPins() {
    if (!mapMarkers) return;
    mapMarkers.innerHTML = "";
    CONTENT.regions.forEach(function (item) {
      if (!item.map) return;
      var c = loc(item);
      var pin = document.createElement("button");
      pin.type = "button";
      pin.className = "map-pin map-pin--" + item.tone;
      pin.style.left = item.map.x + "%";
      pin.style.top = item.map.y + "%";
      pin.setAttribute("aria-label", c.name);
      pin.innerHTML = '<span class="map-pin__label">' + c.name + "</span>";
      pin.addEventListener("click", function () { openRegion(item); });
      mapMarkers.appendChild(pin);
    });
  }

  if (worldMapZoom) {
    worldMapZoom.addEventListener("click", function () {
      var mapImg = $("#worldMapImg");
      openModal(
        '<h3 class="modal-title" id="modalTitle">' + t("world.title") + "</h3>" +
        '<img src="' + (mapImg ? mapImg.getAttribute("src") : "assets/world-map.jpg") + '" alt="' +
        (mapImg ? mapImg.alt.replace(/"/g, "&quot;") : "") +
        '" style="width:100%;max-height:68vh;object-fit:contain;background:#04101a;border:1px solid rgba(216,216,207,.2)">' +
        '<p class="modal-prose" style="margin-top:1.1rem">' + t("world.map.caption") + "</p>"
      );
    });
  }

  /* ---------------- FEATURES ---------------- */
  var featureGrid = $("#featureGrid");

  function renderFeatures() {
    featureGrid.innerHTML = "";
    CONTENT.features.forEach(function (item) {
      var c = loc(item);
      var card = document.createElement("article");
      card.className = "frame feature-item reveal";
      card.innerHTML =
        '<span class="gem gem--tl"></span><span class="gem gem--tr"></span>' +
        '<span class="gem gem--bl"></span><span class="gem gem--br"></span>' +
        '<div class="feature-item__art" aria-hidden="true">' + (ICONS[item.icon] || ICONS.star) + "</div>" +
        '<h3 class="feature-item__title">' + c.title + "</h3>" +
        '<p class="feature-item__text">' + c.text + "</p>";
      featureGrid.appendChild(card);
    });
    registerReveals();
  }

  /* ---------------- MEDIA ---------------- */
  var mediaGrid = $("#mediaGrid");
  var mediaFilters = $("#mediaFilters");
  var mediaFilterState = "all";

  var FILTERS = [
    { key: "all", labelKey: "media.filter.all" },
    { key: "trailer", labelKey: "media.filter.trailer" },
    { key: "video", labelKey: "media.filter.video" },
    { key: "screenshot", labelKey: "media.filter.screenshot" },
    { key: "art", labelKey: "media.filter.art" }
  ];

  var PLAY_ICON = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
  var IMAGE_ICON = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M21 5H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm-1 11.5-4.5-5.4-3.5 4.2-2.5-2.9L5 16.5V7h14v9.5z"/><circle fill="currentColor" cx="8.2" cy="10.2" r="1.5"/></svg>';

  function renderMediaFilters() {
    mediaFilters.innerHTML = "";
    FILTERS.forEach(function (f) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "media-filter" + (mediaFilterState === f.key ? " is-active" : "");
      btn.textContent = t(f.labelKey);
      btn.setAttribute("aria-pressed", mediaFilterState === f.key ? "true" : "false");
      btn.addEventListener("click", function () {
        mediaFilterState = f.key;
        renderMediaFilters();
        applyMediaFilter();
      });
      mediaFilters.appendChild(btn);
    });
  }

  function renderMedia() {
    mediaGrid.innerHTML = "";
    CONTENT.media.forEach(function (item) {
      var c = loc(item);
      var isVideo = item.kind === "trailer" || item.kind === "video";
      var card = document.createElement("button");
      card.type = "button";
      card.className = "frame media-card reveal";
      card.dataset.kind = item.kind;
      card.setAttribute("aria-label", (isVideo ? t("media.play") : t("media.view")) + ": " + c.title);
      card.innerHTML =
        '<span class="gem gem--tl"></span><span class="gem gem--tr"></span>' +
        '<span class="gem gem--bl"></span><span class="gem gem--br"></span>' +
        '<img src="' + item.thumb + '" alt="" loading="lazy">' +
        '<span class="media-card__overlay">' +
        '<span class="media-card__kind' + (isVideo ? "" : " media-card__kind--image") + '" aria-hidden="true">' +
        (isVideo ? PLAY_ICON : IMAGE_ICON) + "</span>" +
        '<span class="media-card__title">' + c.title + "</span>" +
        '<span class="media-card__sub">' + c.sub + "</span>" +
        "</span>";
      card.addEventListener("click", function () {
        if (isVideo) openTrailer(item);
        else openLightbox(item);
      });
      mediaGrid.appendChild(card);
    });
    applyMediaFilter();
    registerReveals();
  }

  function applyMediaFilter() {
    $all(".media-card", mediaGrid).forEach(function (card) {
      card.hidden = mediaFilterState !== "all" && card.dataset.kind !== mediaFilterState;
    });
  }

  /* ---------------- CLASSES ---------------- */
  var classTabs = $("#classTabs");
  var classPanel = $("#classPanel");
  var activeClass = 0;

  var CLASS_SIGILS = {
    blade: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10 8 34 32"/><path d="M38 8 14 32"/><path d="m8 34 6 6M40 34l-6 6"/><path fill="currentColor" stroke="none" d="m24 17 4.5 7L24 31l-4.5-7z"/></svg>',
    shield: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M24 5 8 11v12c0 9.5 6.6 16.4 16 19 9.4-2.6 16-9.5 16-19V11L24 5z"/><path fill="currentColor" stroke="none" d="m24 15 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L24 15z"/></svg>',
    arcane: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="24" cy="24" r="13"/><path d="M24 8v8M24 32v8M8 24h8M32 24h8M13 13l5.5 5.5M29.5 29.5 35 35M35 13l-5.5 5.5M18.5 29.5 13 35"/><circle fill="currentColor" stroke="none" cx="24" cy="24" r="3.5"/></svg>',
    bow: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 7c13 6.5 13 27.5 0 34"/><path d="M15 7v34"/><path d="M8 24h28"/><path d="m31 18 6 6-6 6"/></svg>',
    gun: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M23 24h18"/><path d="M13 20h10v7H13z"/><path d="M13 23.5 5 27v5l8-3.5"/><path d="M15 15.5h9M18 15.5v4.5M22 15.5v4.5"/><path d="M26 27v4"/></svg>'
  };

  function classGallery(item, c) {
    var entries = [];
    (item.images || []).forEach(function (src) {
      entries.push({ type: "image", src: src, title: c.name + " — " + t("classes.gallery") });
    });
    (item.videos || []).forEach(function (v) {
      entries.push({ type: "video", src: v.src, poster: v.poster, title: c.name });
    });
    return entries;
  }

  function openClassLightbox(entries, index, name) {
    var images = entries.filter(function (e) { return e.type === "image"; });
    if (!images.length) return;
    var clicked = entries[index];
    galleryItems = images.map(function (e) {
      return { thumb: e.src, en: { title: e.title, sub: name }, pt: { title: e.title, sub: name } };
    });
    lightboxIndex = clicked && clicked.type === "image" ? Math.max(0, images.indexOf(clicked)) : 0;
    openModal(lightboxHTML(galleryItems[lightboxIndex]));
    bindLightbox();
  }

  function renderClassPanel() {
    var item = CONTENT.classes[activeClass];
    if (!item || !classPanel) return;
    var c = loc(item);
    var entries = classGallery(item, c);
    var html = '<div class="class-panel class-panel--' + item.tone + '">';

    /* ---- art side ---- */
    html += '<div class="class-art">';
    if (entries.length) {
      var main = entries[0];
      if (main.type === "video") {
        html += '<button class="class-art__main class-art__main--video" type="button" data-class-media="0" aria-label="' + t("media.play") + ": " + c.name + '">' +
          '<img src="' + main.poster + '" alt="">' +
          '<span class="class-art__play"><span class="class-art__play-ring">' + PLAY_ICON + "</span></span>" +
          "</button>";
      } else {
        html += '<button class="class-art__main class-art__main--portrait" type="button" data-class-media="0" aria-label="' + t("media.view") + ": " + c.name + '">' +
          '<img src="' + main.src + '" alt="' + c.name + '">' +
          "</button>";
      }
      if (entries.length > 1) {
        html += '<div class="class-thumbs">';
        entries.forEach(function (entry, i) {
          html += '<button class="class-thumb' + (i === 0 ? " is-active" : "") + '" type="button" data-class-media="' + i +
            '" aria-label="' + (entry.type === "video" ? t("media.play") : t("media.view")) + ": " + c.name + " " + (i + 1) + '">' +
            '<img src="' + (entry.type === "video" ? entry.poster : entry.src) + '" alt="" loading="lazy">' +
            (entry.type === "video" ? '<span class="class-thumb__badge" aria-hidden="true">' + PLAY_ICON + "</span>" : "") +
            "</button>";
        });
        html += "</div>";
      }
    } else {
      /* honest crest fallback until class art exists */
      html += '<div class="class-crest">' +
        '<span class="class-crest__sigil" aria-hidden="true">' + (CLASS_SIGILS[item.sigil] || CLASS_SIGILS.arcane) + "</span>" +
        '<p class="class-crest__name">' + c.name + "</p>" +
        "</div>";
    }
    html += "</div>";

    /* ---- info side ---- */
    html += '<div class="class-info">' +
      '<p class="class-info__role">' + c.role + "</p>" +
      '<h3 class="class-info__name">' + c.name + "</h3>" +
      '<p class="class-info__text">' + c.text + "</p>";
    if (c.stats && c.stats.length) {
      html += '<div class="class-stats">';
      c.stats.forEach(function (st) {
        html += '<div class="class-stat">' +
          '<div class="class-stat__head"><span class="class-stat__label">' + st.label + '</span><span class="class-stat__val">' + st.value + "</span></div>" +
          '<div class="class-stat__track"><span class="class-stat__fill" style="--w:' + (st.value / 100) + '"></span></div>' +
          "</div>";
      });
      html += "</div>";
    }
    html += '<ul class="class-info__traits">';
    (c.traits || []).forEach(function (tr) {
      html += '<li class="class-trait"><span class="class-trait__label">' + tr.label + '</span><span class="class-trait__value">' + tr.value + "</span></li>";
    });
    html += "</ul>";
    if (item.videos && item.videos.length) {
      html += '<div class="class-info__actions">' +
        '<button class="btn btn--ghost" type="button" data-class-watch>' +
        '<svg class="btn__icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>' +
        "<span>" + t("classes.watch") + "</span></button>" +
        "</div>";
    }
    html += "</div></div>";
    classPanel.innerHTML = html;

    /* media interactions */
    $all("[data-class-media]", classPanel).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = parseInt(btn.dataset.classMedia, 10);
        var entry = entries[i];
        if (!entry) return;
        if (entry.type === "video") {
          openTrailer({ url: entry.src, en: { title: entry.title, sub: "" }, pt: { title: entry.title, sub: "" } });
        } else {
          openClassLightbox(entries, i, c.name);
        }
      });
    });
    var watchBtn = $("[data-class-watch]", classPanel);
    if (watchBtn) {
      watchBtn.addEventListener("click", function () {
        var v = item.videos[0];
        openTrailer({ url: v.src, en: { title: c.name, sub: "" }, pt: { title: c.name, sub: "" } });
      });
    }
  }

  function renderClasses() {
    if (!classTabs || !classPanel) return;
    classTabs.innerHTML = "";
    CONTENT.classes.forEach(function (item, i) {
      var c = loc(item);
      var tab = document.createElement("button");
      tab.type = "button";
      tab.className = "class-tab class-tab--" + item.tone + (i === activeClass ? " is-active" : "");
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", i === activeClass ? "true" : "false");
      tab.innerHTML = '<span class="class-tab__sigil" aria-hidden="true">' + (CLASS_SIGILS[item.sigil] || CLASS_SIGILS.arcane) +
        '</span><span class="class-tab__name">' + c.name + "</span>";
      tab.addEventListener("click", function () {
        activeClass = i;
        renderClasses();
      });
      classTabs.appendChild(tab);
    });
    renderClassPanel();
  }

  /* arrow-key navigation across class tabs (bound once) */
  if (classTabs) {
    classTabs.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var total = CONTENT.classes.length;
      activeClass = (activeClass + (e.key === "ArrowRight" ? 1 : total - 1)) % total;
      renderClasses();
      var tabs = $all(".class-tab", classTabs);
      if (tabs[activeClass]) tabs[activeClass].focus();
    });
  }

  /* ---------------- BOOKS ---------------- */
  var bookGrid = $("#bookGrid");

  function openBook(item) {
    var c = loc(item);
    openModal(
      (item.cover ? '<img class="book-modal__cover" src="' + item.cover + '" alt="">' : "") +
      '<span class="book-card__kind" style="position:static;display:inline-block;margin-bottom:.7rem">' + c.kind + "</span>" +
      '<h3 class="modal-title" id="modalTitle">' + c.title + "</h3>" +
      '<p class="modal-meta"><span class="book-card__status">' + c.status + "</span></p>" +
      '<div class="modal-prose"><p>' + c.text + "</p></div>"
    );
  }

  function renderBooks() {
    if (!bookGrid) return;
    bookGrid.innerHTML = "";
    CONTENT.books.forEach(function (item) {
      var c = loc(item);
      var card = document.createElement("article");
      card.className = "book-card book-card--" + item.tone + " reveal";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", c.title);
      card.innerHTML =
        (item.cover
          ? '<div class="book-cover book-cover--image">' +
            '<img class="book-cover__img" src="' + item.cover + '" alt="' + c.title + '" loading="lazy">' +
            "</div>"
          : '<div class="book-cover">' +
            '<span class="book-cover__sigil" aria-hidden="true">' + (ICONS[item.icon] || ICONS.star) + "</span>" +
            '<span class="book-cover__title">' + c.title + "</span>" +
            '<span class="book-cover__rule" aria-hidden="true"></span>' +
            "</div>") +
        '<div class="book-card__body">' +
        '<span class="book-card__kind">' + c.kind + "</span>" +
        '<span class="book-card__status">' + c.status + "</span>" +
        '<span class="book-card__open">' + t("books.open") + " →</span>" +
        "</div>";
      function open() { openBook(item); }
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
      bookGrid.appendChild(card);
    });
    registerReveals();
  }

  /* ---------------- PLAYER PROFILE ---------------- */
  var profileSlot = $("#profileSlot");
  var PROFILE_KEY = "mv-profile";
  var OWNED_KEY = "mv-owned-skins";
  var profileDraft = { name: "", classId: null, avatar: null, level: "", title: "", guild: "", server: "", bio: "", weapon: "", region: "", badges: [], accent: "solar" };
  var profileEditing = false;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function loadProfile() {
    try {
      var raw = localStorage.getItem(PROFILE_KEY);
      var p = raw ? JSON.parse(raw) : null;
      return p && p.name && findClass(p.classId) ? p : null;
    } catch (err) { return null; }
  }
  function storeProfile(p) {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (err) { /* private mode */ }
    if (fbReady && window.firebase.firestore && window.firebase.auth().currentUser) {
      try { window.firebase.firestore().collection("profiles").doc(window.firebase.auth().currentUser.uid).set(p, { merge: true }); } catch (e) {}
    }
  }
  function findClass(id) {
    for (var i = 0; i < CONTENT.classes.length; i++) if (CONTENT.classes[i].id === id) return CONTENT.classes[i];
    return null;
  }
  function profileDate(iso) {
    try {
      return new Date(iso).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
    } catch (err) { return iso || ""; }
  }
  var GEMS = '<span class="gem gem--tl"></span><span class="gem gem--tr"></span><span class="gem gem--bl"></span><span class="gem gem--br"></span>';

  /* profile extras: aura colours, badges and regions */
  var ACCENTS = { solar: "#E7C78E", aurora: "#A6B9CC", blood: "#E9876F", arcane: "#B9A2F8", frost: "#8FD4EE", moon: "#F2F4F8" };
  var ACCENT_ORDER = ["solar", "aurora", "blood", "arcane", "frost", "moon"];
  var BADGE_ORDER = ["pvp", "explorer", "collector", "lorekeeper", "trader", "nightowl"];
  var REGION_ORDER = ["americas", "europe", "asia", "oceania"];

  /* rarity rank symbols — crown (legendary), star (epic), shield (elite), gem (collector) */
  function tierIcon(tier) {
    var paths = {
      legendary: '<path d="M2 12.4 L3 4.6 L6.6 7.8 L8 3.4 L9.4 7.8 L13 4.6 L14 12.4 Z"/>',
      epic: '<path d="M8 1.6 L9.7 6.3 L14.4 8 L9.7 9.7 L8 14.4 L6.3 9.7 L1.6 8 L6.3 6.3 Z"/>',
      elite: '<path d="M8 1.8 L13.8 3.7 V8 C13.8 11.3 11.4 13.6 8 14.3 C4.6 13.6 2.2 11.3 2.2 8 V3.7 Z"/><path d="M5.6 7.9 L7.3 9.7 L10.5 6.4"/>',
      collector: '<path d="M8 1.8 L14.2 8 L8 14.2 L1.8 8 Z"/><path d="M4.7 5.7 H11.3"/><path d="M4.7 5.7 L8 14.2 L11.3 5.7"/><path d="M8 1.8 L4.7 5.7 M8 1.8 L11.3 5.7"/>'
    };
    return '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (paths[tier] || paths.collector) + "</svg>";
  }
  function findArmoryItem(id) {
    var list = CONTENT.armory || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  /* ---------------- owned skins (local collection) ---------------- */
  function findShopItem(id) {
    for (var i = 0; i < CONTENT.shop.length; i++) if (CONTENT.shop[i].id === id) return CONTENT.shop[i];
    return null;
  }
  function loadOwned() {
    try {
      var raw = localStorage.getItem(OWNED_KEY);
      var ids = raw ? JSON.parse(raw) : [];
      return Array.isArray(ids) ? ids.filter(function (id) { return !!findShopItem(id); }) : [];
    } catch (err) { return []; }
  }
  function storeOwned(ids) {
    try { localStorage.setItem(OWNED_KEY, JSON.stringify(ids)); } catch (err) { /* private mode */ }
  }
  function isOwned(id) { return loadOwned().indexOf(id) !== -1; }
  /* returns true when the item was added, false when removed */
  function toggleOwned(id) {
    var ids = loadOwned();
    var at = ids.indexOf(id);
    if (at === -1) ids.push(id); else ids.splice(at, 1);
    storeOwned(ids);
    return at === -1;
  }

  /* ---------------- avatar helpers ---------------- */
  /* downscale any (square-cropped) photo to a256px JPEG data URL */
  function processAvatarFile(file, cb) {
    if (!file || !/^image\/(png|jpeg|webp)$/.test(file.type) || file.size > 5 * 1024 * 1024) { cb(null); return; }
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var S = 256;
        var canvas = document.createElement("canvas");
        canvas.width = S;
        canvas.height = S;
        var ctx = canvas.getContext("2d");
        var side = Math.min(img.width, img.height);
        ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, S, S);
        try { cb(canvas.toDataURL("image/jpeg", 0.82)); } catch (err) { cb(null); }
      };
      img.onerror = function () { cb(null); };
      img.src = reader.result;
    };
    reader.onerror = function () { cb(null); };
    reader.readAsDataURL(file);
  }
  /* crest (fallback) + optional photo, inside .profile-avatar */
  function avatarMarkup(avatar, classId) {
    var item = findClass(classId);
    var tone = item ? item.tone : "moon";
    var sigil = (item && CLASS_SIGILS[item.sigil]) || CLASS_SIGILS.arcane;
    return '<span class="profile-card__crest profile-card__crest--' + tone + '" aria-hidden="true">' + sigil + "</span>" +
      (avatar ? '<img class="profile-avatar__img" src="' + avatar + '" alt="">' : "");
  }

  function updateProfileFormState() {
    var submit = $("#profileSubmit");
    if (!submit) return;
    var input = $("#profileName");
    var name = ((input && input.value) || "").trim();
    var err = $("#profileNameError");
    if (err) err.hidden = name.length === 0 || name.length >= 3;
    submit.disabled = name.length < 3 || !profileDraft.classId;
  }

  function renderProfileForm() {
    profileSlot.innerHTML =
      '<div class="profile-card profile-card--form frame reveal">' + GEMS +
      '<form class="profile-form" id="profileForm" novalidate>' +
        '<div class="profile-form__avatar-row">' +
          '<div class="profile-avatar profile-avatar--edit' + (profileDraft.avatar ? " profile-avatar--photo" : "") + '" id="profileAvatarPreview">' +
            avatarMarkup(profileDraft.avatar, profileDraft.classId) +
          "</div>" +
          '<div class="profile-form__avatar-btns">' +
            '<label class="btn btn--ghost btn--sm profile-form__avatar-label" for="profileAvatarInput">' + t("profile.avatarChoose") + "</label>" +
            '<input type="file" id="profileAvatarInput" accept="image/png,image/jpeg,image/webp" hidden>' +
            '<button class="profile-card__reset" type="button" data-avatar-remove' + (profileDraft.avatar ? "" : " hidden") + ">" + t("profile.avatarRemove") + "</button>" +
            '<p class="profile-form__hint">' + t("profile.avatarHint") + "</p>" +
            '<p class="profile-form__error" id="profileAvatarError" role="alert" hidden>' + t("profile.avatarError") + "</p>" +
          "</div>" +
        "</div>" +
        '<div class="profile-form__field">' +
          '<label class="profile-form__label" for="profileName">' + t("profile.nameLabel") + "</label>" +
          '<input class="profile-form__input" id="profileName" type="text" maxlength="20" autocomplete="off" placeholder="' + t("profile.namePlaceholder") + '" value="' + esc(profileDraft.name) + '">' +
          '<p class="profile-form__error" id="profileNameError" role="alert" hidden>' + t("profile.nameError") + "</p>" +
        "</div>" +
        '<div class="profile-form__grid">' +
          '<div class="profile-form__field">' +
            '<label class="profile-form__label" for="profileLevel">' + t("profile.levelLabel") + "</label>" +
            '<input class="profile-form__input" id="profileLevel" type="number" min="1" max="999" inputmode="numeric" placeholder="1" value="' + esc(profileDraft.level) + '">' +
          "</div>" +
          '<div class="profile-form__field">' +
            '<label class="profile-form__label" for="profileTitle">' + t("profile.titleLabel") + "</label>" +
            '<input class="profile-form__input" id="profileTitle" type="text" maxlength="26" autocomplete="off" placeholder="' + t("profile.titlePlaceholder") + '" value="' + esc(profileDraft.title) + '">' +
          "</div>" +
          '<div class="profile-form__field">' +
            '<label class="profile-form__label" for="profileGuild">' + t("profile.guildLabel") + "</label>" +
            '<input class="profile-form__input" id="profileGuild" type="text" maxlength="24" autocomplete="off" value="' + esc(profileDraft.guild) + '">' +
          "</div>" +
          '<div class="profile-form__field">' +
            '<label class="profile-form__label" for="profileServer">' + t("profile.serverLabel") + "</label>" +
            '<input class="profile-form__input" id="profileServer" type="text" maxlength="24" autocomplete="off" value="' + esc(profileDraft.server) + '">' +
          "</div>" +
          '<div class="profile-form__field">' +
            '<label class="profile-form__label" for="profileRegion">' + t("profile.regionLabel") + "</label>" +
            '<select class="profile-form__select" id="profileRegion">' +
              '<option value="">—</option>' +
              REGION_ORDER.map(function (id) {
                return '<option value="' + id + '"' + (profileDraft.region === id ? " selected" : "") + ">" + t("profile.region." + id) + "</option>";
              }).join("") +
            "</select>" +
          "</div>" +
          '<div class="profile-form__field">' +
            '<label class="profile-form__label" for="profileWeapon">' + t("profile.weaponLabel") + "</label>" +
            '<select class="profile-form__select" id="profileWeapon">' +
              '<option value="">' + t("profile.weaponNone") + "</option>" +
              (CONTENT.armory || []).map(function (it) {
                return '<option value="' + esc(it.id) + '"' + (profileDraft.weapon === it.id ? " selected" : "") + ">" + esc(loc(it).name) + "</option>";
              }).join("") +
            "</select>" +
          "</div>" +
        "</div>" +
        '<div class="profile-form__field">' +
          '<label class="profile-form__label" for="profileBio">' + t("profile.bioLabel") + "</label>" +
          '<textarea class="profile-form__textarea" id="profileBio" maxlength="160" rows="3" placeholder="' + t("profile.bioPlaceholder") + '">' + esc(profileDraft.bio) + "</textarea>" +
          '<span class="profile-form__counter" id="profileBioCount">' + String(profileDraft.bio).length + " / 160</span>" +
        "</div>" +
        '<fieldset class="profile-form__fieldset">' +
          "<legend>" + t("profile.badgesLabel") + "</legend>" +
          '<div class="profile-form__chips" id="profileBadges"></div>' +
        "</fieldset>" +
        '<fieldset class="profile-form__fieldset">' +
          "<legend>" + t("profile.accentLabel") + "</legend>" +
          '<div class="profile-form__swatches" id="profileAccents"></div>' +
        "</fieldset>" +
        '<fieldset class="profile-form__fieldset">' +
          "<legend>" + t("profile.chooseClass") + "</legend>" +
          '<div class="profile-picker" id="profilePicker"></div>' +
        "</fieldset>" +
        '<div class="profile-form__actions">' +
          '<button class="btn btn--primary" type="submit" id="profileSubmit" disabled>' + t(profileEditing ? "profile.save" : "profile.create") + "</button>" +
          (profileEditing ? '<button class="btn btn--ghost" type="button" data-profile-cancel>' + t("profile.cancel") + "</button>" : "") +
        "</div>" +
      "</form>" +
      '<p class="profile-card__note">' + t("profile.localNote") + "</p>" +
      "</div>";

    var picker = $("#profilePicker");
    CONTENT.classes.forEach(function (item) {
      var c = loc(item);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "profile-pick profile-pick--" + item.tone + (profileDraft.classId === item.id ? " is-active" : "");
      btn.setAttribute("aria-pressed", profileDraft.classId === item.id ? "true" : "false");
      btn.innerHTML =
        '<span class="profile-pick__sigil" aria-hidden="true">' + (CLASS_SIGILS[item.sigil] || CLASS_SIGILS.arcane) + "</span>" +
        '<span class="profile-pick__name">' + c.name + "</span>" +
        '<span class="profile-pick__role">' + c.role + "</span>";
      btn.addEventListener("click", function () {
        profileDraft.classId = profileDraft.classId === item.id ? null : item.id;
        $all(".profile-pick", picker).forEach(function (el) {
          el.classList.remove("is-active");
          el.setAttribute("aria-pressed", "false");
        });
        if (profileDraft.classId === item.id) {
          btn.classList.add("is-active");
          btn.setAttribute("aria-pressed", "true");
        }
        var preview = $("#profileAvatarPreview");
        if (preview) {
          preview.innerHTML = avatarMarkup(profileDraft.avatar, profileDraft.classId);
          preview.classList.toggle("profile-avatar--photo", !!profileDraft.avatar);
        }
        updateProfileFormState();
      });
      picker.appendChild(btn);
    });

    $("#profileName").addEventListener("input", function (e) {
      profileDraft.name = e.target.value;
      updateProfileFormState();
    });
    [["#profileLevel", "level"], ["#profileTitle", "title"], ["#profileGuild", "guild"], ["#profileServer", "server"]]
      .forEach(function (pair) {
        var field = $(pair[0]);
        if (field) field.addEventListener("input", function (e) { profileDraft[pair[1]] = e.target.value; });
      });

    /* chronicle line (bio) + live counter */
    var bioInput = $("#profileBio");
    if (bioInput) {
      bioInput.addEventListener("input", function (e) {
        profileDraft.bio = e.target.value;
        var counter = $("#profileBioCount");
        if (counter) {
          counter.textContent = profileDraft.bio.length + " / 160";
          counter.classList.toggle("is-max", profileDraft.bio.length >= 160);
        }
      });
    }
    var regionSel = $("#profileRegion");
    if (regionSel) regionSel.addEventListener("change", function (e) { profileDraft.region = e.target.value; });
    var weaponSel = $("#profileWeapon");
    if (weaponSel) weaponSel.addEventListener("change", function (e) { profileDraft.weapon = e.target.value; });

    /* badge chips (multi-select) */
    var badgesBox = $("#profileBadges");
    if (badgesBox) {
      BADGE_ORDER.forEach(function (id) {
        var on = profileDraft.badges.indexOf(id) !== -1;
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "profile-chip" + (on ? " is-active" : "");
        chip.setAttribute("aria-pressed", on ? "true" : "false");
        chip.textContent = t("profile.badge." + id);
        chip.addEventListener("click", function () {
          var at = profileDraft.badges.indexOf(id);
          if (at === -1) profileDraft.badges.push(id); else profileDraft.badges.splice(at, 1);
          var nowOn = at === -1;
          chip.classList.toggle("is-active", nowOn);
          chip.setAttribute("aria-pressed", nowOn ? "true" : "false");
        });
        badgesBox.appendChild(chip);
      });
    }

    /* aura swatches */
    var accentsBox = $("#profileAccents");
    if (accentsBox) {
      ACCENT_ORDER.forEach(function (id) {
        var on = (profileDraft.accent || "solar") === id;
        var sw = document.createElement("button");
        sw.type = "button";
        sw.className = "profile-swatch" + (on ? " is-active" : "");
        sw.style.setProperty("--sw", ACCENTS[id]);
        sw.setAttribute("aria-pressed", on ? "true" : "false");
        sw.setAttribute("aria-label", t("profile.accent." + id));
        sw.title = t("profile.accent." + id);
        sw.addEventListener("click", function () {
          profileDraft.accent = id;
          $all(".profile-swatch", accentsBox).forEach(function (el) {
            el.classList.remove("is-active");
            el.setAttribute("aria-pressed", "false");
          });
          sw.classList.add("is-active");
          sw.setAttribute("aria-pressed", "true");
        });
        accentsBox.appendChild(sw);
      });
    }

    /* avatar upload */
    var avatarInput = $("#profileAvatarInput");
    var avatarError = $("#profileAvatarError");
    if (avatarInput) {
      avatarInput.addEventListener("change", function (e) {
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        processAvatarFile(file, function (dataUrl) {
          if (!dataUrl) {
            avatarError.hidden = false;
            avatarInput.value = "";
            return;
          }
          avatarError.hidden = true;
          profileDraft.avatar = dataUrl;
          var preview = $("#profileAvatarPreview");
          if (preview) {
            preview.innerHTML = avatarMarkup(dataUrl, profileDraft.classId);
            preview.classList.add("profile-avatar--photo");
          }
          var rm = $("[data-avatar-remove]", profileSlot);
          if (rm) rm.hidden = false;
          avatarInput.value = "";
        });
      });
    }
    var avatarRemoveBtn = $("[data-avatar-remove]", profileSlot);
    if (avatarRemoveBtn) {
      avatarRemoveBtn.addEventListener("click", function () {
        profileDraft.avatar = null;
        var preview = $("#profileAvatarPreview");
        if (preview) {
          preview.innerHTML = avatarMarkup(null, profileDraft.classId);
          preview.classList.remove("profile-avatar--photo");
        }
        avatarRemoveBtn.hidden = true;
      });
    }

    $("#profileForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = profileDraft.name.trim();
      if (name.length < 3 || !profileDraft.classId) return;
      var prev = loadProfile();
      var lvl = parseInt(profileDraft.level, 10);
      storeProfile({
        name: name,
        classId: profileDraft.classId,
        avatar: profileDraft.avatar || null,
        level: lvl >= 1 && lvl <= 999 ? lvl : null,
        title: (profileDraft.title || "").trim().slice(0, 26),
        guild: (profileDraft.guild || "").trim().slice(0, 24),
        server: (profileDraft.server || "").trim().slice(0, 24),
        bio: (profileDraft.bio || "").trim().slice(0, 160),
        weapon: findArmoryItem(profileDraft.weapon) ? profileDraft.weapon : "",
        region: REGION_ORDER.indexOf(profileDraft.region) !== -1 ? profileDraft.region : "",
        badges: (profileDraft.badges || []).filter(function (id) { return BADGE_ORDER.indexOf(id) !== -1; }).slice(0, 6),
        accent: ACCENTS[profileDraft.accent] ? profileDraft.accent : "solar",
        since: profileEditing && prev && prev.since ? prev.since : new Date().toISOString()
      });
      profileEditing = false;
      renderProfile();
    });
    var cancelBtn = $("[data-profile-cancel]", profileSlot);
    if (cancelBtn) {
      cancelBtn.addEventListener("click", function () {
        profileEditing = false;
        profileDraft = draftFrom(loadProfile());
        renderProfile();
      });
    }
    updateProfileFormState();
  }

  /* profile -> form draft (null profile = empty draft) */
  function draftFrom(p) {
    return p
      ? {
          name: p.name,
          classId: p.classId,
          avatar: p.avatar || null,
          level: p.level || "",
          title: p.title || "",
          guild: p.guild || "",
          server: p.server || "",
          bio: p.bio || "",
          weapon: p.weapon || "",
          region: p.region || "",
          badges: Array.isArray(p.badges) ? p.badges.slice() : [],
          accent: p.accent || "solar"
        }
      : { name: "", classId: null, avatar: null, level: "", title: "", guild: "", server: "", bio: "", weapon: "", region: "", badges: [], accent: "solar" };
  }

  function collectionMarkup(accentHex) {
    var items = loadOwned().map(findShopItem).filter(Boolean);
    var list = items.length
      ? '<ul class="profile-collection__list">' + items.map(function (item) {
          var tier = item.tier || "collector";
          var badge = '<span class="owned-card__tier owned-card__tier--' + tier + '">' + tierIcon(tier) + "<span>" + t("shop.tier." + tier) + "</span></span>";
          return '<li class="owned-card owned-card--' + item.tone + '">' +
            (item.art
              ? '<div class="owned-card__art owned-card__art--cover"><img src="' + item.art + '" alt="" loading="lazy">' + badge + "</div>"
              : '<div class="owned-card__art"><span class="owned-card__sigil">' + shopSigil(item) + "</span>" + badge + "</div>") +
            '<div class="owned-card__body">' +
              '<span class="owned-card__name">' + esc(loc(item).name) + "</span>" +
              '<button class="owned-card__remove" type="button" data-own-remove="' + item.id + '" aria-label="' + t("profile.removeItem") + '" title="' + t("profile.removeItem") + '"><span aria-hidden="true">×</span></button>' +
            "</div>" +
            "</li>";
        }).join("") + "</ul>"
      : '<p class="profile-collection__empty">' + t("profile.collectionEmpty") + "</p>";
    return '<div class="profile-collection frame reveal" style="--p-accent:' + (accentHex || ACCENTS.solar) + '">' +
      '<h4 class="profile-collection__title">' + t("profile.collection") +
      ' <span class="profile-collection__count">' + items.length + "</span></h4>" +
      list +
      '<p class="profile-collection__note">' + t("profile.collectionNote") + "</p>" +
      "</div>";
  }

  function renderProfileCard(p) {
    var item = findClass(p.classId);
    var c = loc(item);
    var accentHex = ACCENTS[p.accent] || ACCENTS.solar;
    var stats = "";
    function stat(label, value) {
      if (!value) return "";
      return '<div class="profile-stat"><dt>' + label + "</dt><dd>" + esc(value) + "</dd></div>";
    }
    stats += stat(t("profile.levelLabel"), p.level ? String(p.level) : "");
    stats += stat(t("profile.titleLabel"), p.title || "");
    stats += stat(t("profile.guildLabel"), p.guild || "");
    stats += stat(t("profile.serverLabel"), p.server || "");
    stats += stat(t("profile.regionLabel"), p.region && REGION_ORDER.indexOf(p.region) !== -1 ? t("profile.region." + p.region) : "");
    var wItem = findArmoryItem(p.weapon);
    stats += stat(t("profile.weaponLabel"), wItem ? loc(wItem).name : "");
    stats += '<div class="profile-stat"><dt>' + t("profile.since") + "</dt><dd>" + profileDate(p.since) + "</dd></div>";
    var badges = (Array.isArray(p.badges) ? p.badges : []).filter(function (id) { return BADGE_ORDER.indexOf(id) !== -1; });
    var badgeRow = badges.length
      ? '<div class="profile-card__badges">' + badges.map(function (id) {
          return '<span class="profile-badge">' + t("profile.badge." + id) + "</span>";
        }).join("") + "</div>"
      : "";
    var bio = p.bio ? '<blockquote class="profile-card__bio">' + esc(p.bio) + "</blockquote>" : "";
    profileSlot.innerHTML =
      '<div class="profile-card profile-card--filled is-filled frame reveal" style="--p-accent:' + accentHex + '">' + GEMS +
      '<div class="profile-avatar' + (p.avatar ? " profile-avatar--photo" : "") + '">' +
        avatarMarkup(p.avatar, p.classId) +
      "</div>" +
      '<div class="profile-card__body">' +
        '<p class="profile-card__eyebrow">' + c.role + "</p>" +
        '<h3 class="profile-card__name">' + esc(p.name) + "</h3>" +
        '<div class="profile-card__meta">' +
          '<span class="profile-card__class">' + c.name + "</span>" +
        "</div>" +
        badgeRow +
        bio +
        '<dl class="profile-card__stats">' + stats + "</dl>" +
        '<p class="profile-card__note">' + t("profile.localNote") + "</p>" +
        '<div class="profile-card__actions">' +
          '<button class="btn btn--ghost btn--sm" type="button" data-profile-view>' + t("profile.viewClass") + "</button>" +
          '<button class="btn btn--ghost btn--sm" type="button" data-profile-edit>' + t("profile.edit") + "</button>" +
          '<button class="profile-card__reset" type="button" data-profile-reset>' + t("profile.reset") + "</button>" +
        "</div>" +
      "</div>" +
      "</div>" +
      collectionMarkup(accentHex);

    $all("[data-own-remove]", profileSlot).forEach(function (btn) {
      btn.addEventListener("click", function () {
        toggleOwned(btn.getAttribute("data-own-remove"));
        renderProfile();
        renderShop();
      });
    });
    $("[data-profile-view]", profileSlot).addEventListener("click", function () {
      for (var i = 0; i < CONTENT.classes.length; i++) {
        if (CONTENT.classes[i].id === p.classId) { activeClass = i; break; }
      }
      renderClasses();
      var section = $("#classes");
      if (section) section.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    });
    $("[data-profile-edit]", profileSlot).addEventListener("click", function () {
      profileDraft = draftFrom(p);
      profileEditing = true;
      renderProfile();
      var input = $("#profileName");
      if (input) input.focus();
    });
    $("[data-profile-reset]", profileSlot).addEventListener("click", function () {
      if (!window.confirm(t("profile.reset") + "?")) return;
      try { localStorage.removeItem(PROFILE_KEY); } catch (err) { /* private mode */ }
      profileEditing = false;
      profileDraft = draftFrom(null);
      renderProfile();
    });
  }

  function renderProfile() {
    if (!profileSlot) return;
    var p = loadProfile();
    if (p && !profileEditing) renderProfileCard(p);
    else renderProfileForm();
    registerReveals();
  }

  /* ---------------- ARMORY ---------------- */
  var armoryGrid = $("#armoryGrid");
  var armoryFilters = $("#armoryFilters");
  var armoryFilter = "all";
  var ARMORY_KINDS = ["all", "weapon", "armor", "item"];

  function renderArmoryFilters() {
    if (!armoryFilters) return;
    armoryFilters.innerHTML = "";
    ARMORY_KINDS.forEach(function (key) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "media-filter" + (armoryFilter === key ? " is-active" : "");
      btn.textContent = t("armory.filter." + key);
      btn.setAttribute("aria-pressed", armoryFilter === key ? "true" : "false");
      btn.addEventListener("click", function () {
        armoryFilter = key;
        renderArmoryFilters();
        renderArmory();
      });
      armoryFilters.appendChild(btn);
    });
  }

  function openArmoryItem(item) {
    var c = loc(item);
    var statsHtml = "";
    (c.stats || []).forEach(function (st) {
      statsHtml += '<div class="armory-stat">' +
        '<span class="armory-stat__label">' + st.label + "</span>" +
        '<span class="armory-stat__track"><span class="armory-stat__fill" style="width:' + st.value + '%"></span></span>' +
        '<span class="armory-stat__val">' + st.value + "</span>" +
        "</div>";
    });
    openModal(
      '<span class="book-card__kind" style="position:static;display:inline-block;margin-bottom:.7rem">' + c.type + "</span>" +
      '<h3 class="modal-title" id="modalTitle">' + c.name + "</h3>" +
      '<p class="modal-meta"><span class="rarity rarity--' + item.rarity + '">' + t("rarity." + item.rarity) + "</span></p>" +
      '<div class="modal-prose"><p>' + c.text + "</p></div>" +
      (statsHtml ? '<div class="armory-stats">' + statsHtml + "</div>" : "")
    );
  }

  function renderArmory() {
    if (!armoryGrid) return;
    armoryGrid.innerHTML = "";
    CONTENT.armory.forEach(function (item) {
      if (armoryFilter !== "all" && item.kind !== armoryFilter) return;
      var c = loc(item);
      var card = document.createElement("article");
      card.className = "frame armory-card armory-card--" + item.rarity + " reveal";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", c.name);
      card.innerHTML = GEMS +
        '<span class="armory-card__sigil" aria-hidden="true">' + (ICONS[item.icon] || ICONS.sword) + "</span>" +
        '<span class="rarity rarity--' + item.rarity + '">' + t("rarity." + item.rarity) + "</span>" +
        '<h3 class="armory-card__name">' + c.name + "</h3>" +
        '<span class="armory-card__type">' + c.type + "</span>";
      function open() { openArmoryItem(item); }
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
      armoryGrid.appendChild(card);
    });
    registerReveals();
  }

  /* ---------------- SHOP ---------------- */
  var shopGrid = $("#shopGrid");
  var shopView = "skins";

  var SHOP_TABS = [
    ["skins", "shop.tab.skins", function (item) { return item.kind === "skin"; }],
    ["frames", "shop.tab.frames", function (item) { return item.kind === "frame"; }],
    ["specific", "shop.tab.specific", function (item) { return item.kind !== "skin" && item.kind !== "frame"; }]
  ];

  function shopSigil(item) {
    return CLASS_SIGILS[item.sigil] || ICONS[item.sigil] || ICONS.star;
  }

  /* reward frames: kind "frame" with `rewardFrom` — earned by buying another
     shop entry (a skin or a bundle) instead of being bought directly. */
  function shopRewardSource(item) {
    if (!item.rewardFrom) return null;
    return CONTENT.shop.filter(function (i) { return i.id === item.rewardFrom; })[0] || null;
  }

  /* Price markup: items with currency "BRL" show Reais (R$ 249,90),
     everything else stays in Moon Shards (price + label). */
  function shopPrice(item) {
    if (item.currency === "BRL") {
      return "<strong>" + item.price.toLocaleString(lang === "pt" ? "pt-BR" : "en-US", { style: "currency", currency: "BRL" }) + "</strong>";
    }
    return "<strong>" + item.price + "</strong> " + t("shop.currency");
  }

  /* Compact price text — used inside the buy button (in place of "Buy"). */
  function shopPriceText(item) {
    if (item.currency === "BRL") {
      return item.price.toLocaleString(lang === "pt" ? "pt-BR" : "en-US", { style: "currency", currency: "BRL" });
    }
    return String(item.price);
  }

  function openShopPending() {
    modalBody.innerHTML =
      '<h3 class="modal-title" id="modalTitle">' + t("shop.pendingTitle") + "</h3>" +
      '<div class="modal-prose"><p>' + t("shop.pendingNote") + "</p></div>" +
      (CONFIG.discordUrl
        ? '<p class="modal-actions"><a class="btn btn--primary" href="' + CONFIG.discordUrl + '" target="_blank" rel="noopener noreferrer">' + t("shop.joinDiscord") + "</a></p>"
        : "");
    if (modalDialog) modalDialog.focus();
  }

  function openShopItem(item) {
    var c = loc(item);
    var tier = item.tier || "collector";
    var reward = shopRewardSource(item);
    openModal(
      (item.art
        ? '<div class="shop-modal__art shop-modal__art--' + item.tone + ' shop-modal__art--cover"><img src="' + item.art + '" alt=""></div>'
        : '<div class="shop-modal__art shop-modal__art--' + item.tone + '" aria-hidden="true">' + shopSigil(item) + "</div>") +
      '<span class="shop-card__tier shop-card__tier--' + tier + '" style="position:static;display:inline-flex;margin:0 .6rem .7rem 0">' + tierIcon(tier) + "<span>" + t("shop.tier." + tier) + "</span></span>" +
      '<span class="book-card__kind" style="position:static;display:inline-block;margin-bottom:.7rem">' + t("shop.kind." + item.kind) + "</span>" +
      '<h3 class="modal-title" id="modalTitle">' + c.name + "</h3>" +
      '<div class="modal-prose"><p>' + c.text + "</p></div>" +
      (reward
        ? '<div class="shop-buyrow"><span class="shop-modal__rewardNote">' + t("shop.rewardFor").replace("{skin}", esc(loc(reward).name)) + "</span></div>"
        : '<div class="shop-buyrow">' +
          '<button class="btn btn--primary" type="button" data-shop-buy>' + shopPrice(item) + "</button>" +
        "</div>") +
      '<button class="btn btn--ghost shop-modal__collect' + (isOwned(item.id) ? " is-owned" : "") + '" type="button" data-shop-collect>' +
        t(isOwned(item.id) ? "shop.removeFromCollection" : "shop.addToCollection") +
      "</button>"
    );
    var buyBtn = $("[data-shop-buy]", modalBody);
    if (buyBtn) buyBtn.addEventListener("click", openShopPending);
    var collectBtn = $("[data-shop-collect]", modalBody);
    if (collectBtn) collectBtn.addEventListener("click", function () {
      var added = toggleOwned(item.id);
      collectBtn.textContent = t(added ? "shop.removeFromCollection" : "shop.addToCollection");
      collectBtn.classList.toggle("is-owned", added);
      renderShop();
      renderProfile(); /* keep the collection panel in sync */
    });
  }

  function buildShopCard(item) {
    var c = loc(item);
    var tier = item.tier || "collector";
    var tierBadge = '<span class="shop-card__tier shop-card__tier--' + tier + '">' + tierIcon(tier) + "<span>" + t("shop.tier." + tier) + "</span></span>";
    var reward = shopRewardSource(item);
    var rewardBadge = reward
      ? '<span class="shop-card__owned shop-card__owned--reward">✦ ' + t("shop.rewardBadge") + "</span>"
      : "";
    var card = document.createElement("article");
    card.className = "frame shop-card shop-card--" + item.tone + " shop-card--tier-" + tier + (reward ? " shop-card--reward" : "") + " reveal";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", c.name);
    card.innerHTML = GEMS +
      '<span class="shop-card__ring" aria-hidden="true"></span>' +
      (isOwned(item.id) ? '<span class="shop-card__owned">✓ ' + t("shop.ownedChip") + "</span>" : "") +
      (item.art
        ? '<div class="shop-card__art shop-card__art--cover" aria-hidden="true">' + tierBadge + rewardBadge + '<img class="shop-card__img" src="' + item.art + '" alt="" loading="lazy"></div>'
        : '<div class="shop-card__art" aria-hidden="true">' + tierBadge + rewardBadge + '<span class="shop-card__sigil">' + shopSigil(item) + "</span></div>") +
      '<div class="shop-card__body">' +
        '<span class="shop-card__kind">' + t("shop.kind." + item.kind) + "</span>" +
        '<h3 class="shop-card__name">' + c.name + "</h3>" +
        '<div class="shop-card__foot">' +
          (reward
            ? '<span class="shop-card__buy shop-card__buy--reward">' + t("shop.rewardShort").replace("{skin}", esc(loc(reward).name)) + "</span>"
            : '<span class="shop-card__buy">' + shopPriceText(item) + "</span>") +
        "</div>" +
      "</div>";
    function open() { openShopItem(item); }
    card.addEventListener("click", open);
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
    return card;
  }

  function renderShop() {
    if (!shopGrid) return;
    var shopTabsEl = $("#shopTabs");
    if (shopTabsEl) {
      shopTabsEl.innerHTML = "";
      SHOP_TABS.forEach(function (tab) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "rank-tab" + (shopView === tab[0] ? " is-active" : "");
        btn.setAttribute("aria-pressed", shopView === tab[0] ? "true" : "false");
        btn.textContent = t(tab[1]);
        btn.addEventListener("click", function () {
          shopView = tab[0];
          renderShop();
        });
        shopTabsEl.appendChild(btn);
      });
    }
    var activeTab = SHOP_TABS.filter(function (tab) { return tab[0] === shopView; })[0] || SHOP_TABS[0];
    var viewItems = CONTENT.shop.filter(activeTab[2]);
    shopGrid.innerHTML = "";
    if (shopView === "frames") {
      /* frames render as a single flat grid — no tier grouping */
      var framesGrid = document.createElement("div");
      framesGrid.className = "shop-grid";
      viewItems.forEach(function (item) { framesGrid.appendChild(buildShopCard(item)); });
      shopGrid.appendChild(framesGrid);
    } else {
      /* items grouped by tier, in the order below */
      [
        { tier: "collector", label: t("shop.tierGroup.collector") },
        { tier: "legendary", label: t("shop.tierGroup.legendary") },
        { tier: "epic", label: t("shop.tierGroup.epic") },
        { tier: "elite", label: t("shop.tierGroup.elite") }
      ].forEach(function (group) {
        var items = viewItems.filter(function (item) { return (item.tier || "collector") === group.tier; });
        if (!items.length) return;
        var sec = document.createElement("div");
        sec.className = "shop-tier";
        var head = document.createElement("h3");
        head.className = "shop-tier__label shop-tier__label--" + group.tier;
        head.innerHTML = '<span class="shop-tier__icon" aria-hidden="true">' + tierIcon(group.tier) + "</span><span>" + esc(group.label) + "</span>";
        var grid = document.createElement("div");
        grid.className = "shop-grid";
        sec.appendChild(head);
        sec.appendChild(grid);
        items.forEach(function (item) { grid.appendChild(buildShopCard(item)); });
        shopGrid.appendChild(sec);
      });
    }
    registerReveals();
  }

  /* ---------------- DROPLIST ---------------- */
  var dropGrid = $("#dropGrid");
  var dropView = "guardians";

  function dropRarKey(rarity) {
    return rarity === "rare" || rarity === "common" ? "drop.rarity." + rarity : "shop.tier." + rarity;
  }
  function dropChanceText(chance) {
    return String(chance).replace(".", lang === "pt" ? "," : ".");
  }

  /* item index: every drop flattened, deduped and sorted by rarity */
  function renderDropItems() {
    var rarOrder = { legendary: 0, epic: 1, elite: 2, rare: 3, common: 4 };
    var merged = {};
    var order = [];
    (CONTENT.droplist || []).forEach(function (table) {
      var where = loc(table).name;
      table.drops.forEach(function (drop) {
        var name = loc(drop).name;
        if (!merged[name]) { merged[name] = { drop: drop, wheres: [] }; order.push(name); }
        merged[name].wheres.push(where);
      });
    });
    var rows = order
      .map(function (n) { return merged[n]; })
      .sort(function (a, b) { return rarOrder[a.drop.rarity] - rarOrder[b.drop.rarity]; })
      .map(function (entry) {
        var d = loc(entry.drop);
        var srcList = entry.wheres.length > 3
          ? entry.wheres.slice(0, 3).join(" · ") + " · …"
          : entry.wheres.join(" · ");
        return '<li class="drop-row">' +
          '<span class="rar-chip rar-chip--' + entry.drop.rarity + '">' + t(dropRarKey(entry.drop.rarity)) + "</span>" +
          '<span class="drop-row__name">' + esc(d.name) + "</span>" +
          '<span class="drop-row__where">' + esc(srcList) + "</span>" +
          '<span class="drop-row__chance">' + dropChanceText(entry.drop.chance) + "</span>" +
          "</li>";
      }).join("");
    var board = document.createElement("article");
    board.className = "frame drop-card drop-items reveal";
    board.innerHTML = GEMS + '<ul class="drop-list drop-list--items">' + rows + "</ul>";
    dropGrid.appendChild(board);
  }

  /* equipment droplist: 210 weapon names + 7 supreme featured (art + flavor) */
  function renderDropEquipment() {
    var eq = CONTENT.equipment || { categories: [], supreme: [] };
    var catOf = {};
    (eq.categories || []).forEach(function (c) { catOf[c.key] = c; });
    var supremeMap = {};
    (eq.supreme || []).forEach(function (s) { supremeMap[s.name] = s; });

    var legends = (eq.supreme || []).map(function (s) {
      var c = loc(s);
      var cat = catOf[s.cat];
      var art = s.art
        ? '<img class="weapon-legend__art" src="' + s.art + '" alt="' + esc(s.name) + '" loading="lazy">'
        : '<div class="weapon-legend__art weapon-legend__art--ph" aria-hidden="true">' + (cat ? cat.kanji : "刀") + "</div>";
      return '<article class="frame weapon-legend reveal">' +
        art +
        '<div class="weapon-legend__body">' +
          '<span class="weapon-legend__tier">' + esc(c.title) + "</span>" +
          '<h3 class="weapon-legend__name">' + esc(s.name) + "</h3>" +
          '<p class="weapon-legend__flavor">' + esc(c.text) + "</p>" +
          '<div class="weapon-legend__meta">' +
            '<span class="weapon-legend__cat">' + (cat ? esc(loc(cat)) + " " + cat.kanji : "") + "</span>" +
            '<span class="rar-chip rar-chip--legendary">' + dropChanceText(s.chance) + "</span>" +
          "</div>" +
        "</div>" +
      "</article>";
    }).join("");

    var chips = ['<button class="rank-tab is-active" type="button" data-eq-cat="all" aria-pressed="true">' + t("drop.equipAll") + "</button>"];
    (eq.categories || []).forEach(function (c) {
      chips.push('<button class="rank-tab" type="button" data-eq-cat="' + c.key + '" aria-pressed="false">' + esc(loc(c)) +
        ' <span class="eq-chip__kanji">' + c.kanji + "</span></button>");
    });
    var cells = [];
    (eq.categories || []).forEach(function (c) {
      /* a category is either a flat `names` list or `items` entries with art */
      var entries = (c.items || []).map(function (it) { return { name: it.name, art: it.art || "" }; })
        .concat((c.names || []).map(function (name) { return { name: name, art: "" }; }));
      entries.forEach(function (it) {
        var art = it.art
          ? '<img class="weapon-chip__img" src="' + it.art + '" alt="" loading="lazy">'
          : "";
        cells.push('<li class="weapon-chip' + (it.art ? " weapon-chip--art" : "") + (supremeMap[it.name] ? " weapon-chip--supreme" : "") +
          '" data-eq-item data-cat="' + c.key + '" data-name="' + it.name + '">' +
          art +
          '<span class="weapon-chip__name">' + esc(it.name) + "</span>" +
          '<span class="weapon-chip__cat">' + c.kanji + "</span>" +
          "</li>");
      });
    });

    var board = document.createElement("article");
    board.className = "frame drop-card drop-equip";
    board.innerHTML = GEMS +
      '<p class="drop-card__region">' + t("drop.equipTitle") + "</p>" +
      '<p class="drop-equip__note">' + t("drop.equipNote") + "</p>" +
      '<div class="weapon-legends">' + legends + "</div>" +
      '<div class="equip-controls">' +
        '<input class="profile-form__input equip-search" id="equipSearch" type="search" maxlength="30" placeholder="' + t("drop.equipSearch") + '" aria-label="' + t("drop.equipSearch") + '">' +
        '<div class="rank-tabs equip-tabs" role="tablist">' + chips.join("") + "</div>" +
      "</div>" +
      '<p class="equip-count" id="equipCount">' + t("drop.equipCount").replace("{n}", String(cells.length)) + "</p>" +
      '<ul class="equip-grid">' + cells.join("") + "</ul>";
    dropGrid.appendChild(board);

    var activeCat = "all", query = "";
    var countEl = $("#equipCount", board);
    function applyFilter() {
      var shown = 0;
      $all("[data-eq-item]", board).forEach(function (li) {
        var okCat = activeCat === "all" || li.getAttribute("data-cat") === activeCat;
        var okQ = !query || li.getAttribute("data-name").indexOf(query) > -1;
        li.hidden = !(okCat && okQ);
        if (okCat && okQ) shown++;
      });
      if (countEl) countEl.textContent = t("drop.equipCount").replace("{n}", String(shown));
    }
    $all("[data-eq-cat]", board).forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCat = btn.getAttribute("data-eq-cat");
        $all("[data-eq-cat]", board).forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        applyFilter();
      });
    });
    var search = $("#equipSearch", board);
    if (search) search.addEventListener("input", function () {
      query = search.value.trim().toUpperCase();
      applyFilter();
    });
  }

  function renderDroplist() {
    if (!dropGrid) return;
    var dropTabs = $("#dropTabs");
    if (dropTabs) {
      dropTabs.innerHTML = "";
      [["guardians", "droplist.tab.guardians"], ["items", "droplist.tab.items"], ["equipment", "droplist.tab.equipment"]].forEach(function (pair) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "rank-tab" + (dropView === pair[0] ? " is-active" : "");
        btn.setAttribute("aria-pressed", dropView === pair[0] ? "true" : "false");
        btn.textContent = t(pair[1]);
        btn.addEventListener("click", function () {
          dropView = pair[0];
          renderDroplist();
        });
        dropTabs.appendChild(btn);
      });
    }
    dropGrid.innerHTML = "";
    if (dropView === "items") {
      renderDropItems();
      registerReveals();
      return;
    }
    if (dropView === "equipment") {
      renderDropEquipment();
      registerReveals();
      return;
    }
    (CONTENT.droplist || []).forEach(function (table) {
      var c = loc(table);
      var card = document.createElement("article");
      card.className = "frame drop-card drop-card--" + table.tone + " reveal";
      var rows = table.drops.map(function (drop) {
        var d = loc(drop);
        return '<li class="drop-row">' +
          '<span class="rar-chip rar-chip--' + drop.rarity + '">' + t(dropRarKey(drop.rarity)) + "</span>" +
          '<span class="drop-row__name">' + esc(d.name) + "</span>" +
          '<span class="drop-row__chance">' + dropChanceText(drop.chance) + "</span>" +
          "</li>";
      }).join("");
      card.innerHTML = GEMS +
        '<p class="drop-card__region">' + esc(c.region) +
          '<span class="drop-type drop-type--' + table.kind + '">' + t("drop.type." + table.kind) + "</span></p>" +
        '<h3 class="drop-card__boss">' + esc(c.name) + "</h3>" +
        '<p class="drop-card__text">' + esc(c.text) + "</p>" +
        '<ul class="drop-list">' + rows + "</ul>";
      dropGrid.appendChild(card);
    });
    registerReveals();
  }

  /* ---------------- RANKING ---------------- */
  var rankTabs = $("#rankTabs");
  var rankBoard = $("#rankBoard");
  var rankedBoard = $("#rankedBoard");
  var rankBoardKey = "kills";

  function rankNum(n) {
    return n.toLocaleString(lang === "pt" ? "pt-BR" : "en-US");
  }

  var RANK_TIER_SIGIL =
    '<svg viewBox="0 0 48 48" aria-hidden="true">' +
      '<path fill="currentColor" d="M24 3 43 24 24 45 5 24 24 3zm0 7.5L12.5 24 24 36.5 35.5 24 24 10.5z"/>' +
      '<circle cx="24" cy="24" r="4.6" fill="currentColor"/>' +
    "</svg>";

  function rankTierRange(tier) {
    if (tier.max === null) return rankNum(tier.min) + "+";
    return rankNum(tier.min) + " – " + rankNum(tier.max);
  }

  function renderRanked() {
    if (!rankedBoard) return;
    var data = CONTENT.ranking && CONTENT.ranking.ranked;
    if (!data) {
      rankedBoard.innerHTML = "";
      return;
    }
    var season = loc(data.season);

    var tiers = data.tiers.map(function (tier) {
      var crest = tier.art
        ? '<img class="ranked-tier__art" src="' + esc(tier.art) + '" alt="" loading="lazy" decoding="async">'
        : '<span class="ranked-tier__emblem">' + RANK_TIER_SIGIL + "</span>";
      return '<article class="ranked-tier ranked-tier--' + tier.key + (tier.art ? " ranked-tier--art" : "") + '">' +
        crest +
        '<div class="ranked-tier__body">' +
          '<h3 class="ranked-tier__name">' + t("ranked.tier." + tier.key) + "</h3>" +
          '<p class="ranked-tier__range">' + rankTierRange(tier) + ' <em>' + t("ranked.mmr") + "</em></p>" +
          '<p class="ranked-tier__rank">' + t("ranked.rank") + " " + tier.rank + "</p>" +
          '<p class="ranked-tier__reward"><span>' + t("ranked.reward") + "</span>" + esc(loc(tier).reward) + "</p>" +
        "</div>" +
      "</article>";
    }).join("");

    var p = loadProfile();
    var you = p
      ? '<p class="ranked__you"><span>' + t("ranked.placement") + ":</span> <strong>" + esc(p.name) + "</strong> — " +
        t("ranked.unranked") + ". " + t("ranked.placementNote") + "</p>"
      : '<p class="ranked__you">' + t("ranking.createProfileHint") + "</p>";

    rankedBoard.innerHTML = '<div class="ranked">' +
      '<div class="ranked__season">' +
        "<div>" +
          '<p class="ranked__season-eyebrow">' + t("ranked.season") + "</p>" +
          '<h3 class="ranked__season-name">' + esc(season.name) + "</h3>" +
          '<p class="ranked__season-window">' + esc(season.window) + "</p>" +
        "</div>" +
        '<span class="ranked__season-badge">' + t("ranked.preSeason") + "</span>" +
      "</div>" +
      '<h3 class="ranked__title">' + t("ranked.tiers") + "</h3>" +
      '<div class="ranked__grid">' + tiers + "</div>" +
      you +
    "</div>";
  }

  function eloTierFor(index, total) {
    var tiers = (CONTENT.ranked && CONTENT.ranked.tiers) || [];
    if (!tiers.length) return null;
    var n = total || 10;
    var bucket = Math.floor(index / Math.max(1, Math.ceil(n / tiers.length)));
    var ti = tiers.length - 1 - Math.min(tiers.length - 1, bucket);
    return tiers[ti];
  }
  function eloTierFromValue(value) {
    var tiers = (CONTENT.ranked && CONTENT.ranked.tiers) || [];
    for (var i = tiers.length - 1; i >= 0; i--) {
      var t = tiers[i];
      if (value >= t.min && (t.max === null || value <= t.max)) return t;
    }
    return tiers[0] || null;
  }
  function eloCrest(tier) {
    if (!tier) return "";
    if (tier.art) return '<img class="rank-elo__crest" src="' + esc(tier.art) + '" alt="" loading="lazy">';
    return '<span class="rank-elo__crest rank-elo__crest--sigil">' + RANK_TIER_SIGIL + "</span>";
  }

  function renderRanking() {
    if (!rankTabs || !rankBoard) return;
    var keys = ["kills", "mobs", "arena"];
    rankTabs.innerHTML = "";
    keys.forEach(function (key) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "rank-tab" + (rankBoardKey === key ? " is-active" : "");
      btn.setAttribute("aria-pressed", rankBoardKey === key ? "true" : "false");
      btn.textContent = t("ranking.tab." + key);
      btn.addEventListener("click", function () {
        rankBoardKey = key;
        renderRanking();
      });
      rankTabs.appendChild(btn);
    });

    var rows = (CONTENT.ranking && CONTENT.ranking[rankBoardKey]) || [];
    var isArena = rankBoardKey === "arena";
    var html =
      '<div class="rank-row rank-row--head">' +
        '<span class="rank-row__num">#</span>' +
        '<span class="rank-row__player">' + t("ranking.col.player") + "</span>" +
        '<span class="rank-row__class">' + t("ranking.col.class") + "</span>" +
        '<span class="rank-row__elo">' + t("ranking.col.elo") + "</span>" +
        '<span class="rank-row__value">' + t("ranking.stat." + rankBoardKey) + "</span>" +
      "</div>";

    var p = loadProfile();
    if (p && findClass(p.classId)) {
      var pc = loc(findClass(p.classId));
      html +=
        '<div class="rank-row rank-row--you">' +
          '<span class="rank-row__num">—</span>' +
          '<span class="rank-row__player">' + esc(p.name) + ' <em class="rank-row__tag">' + t("ranking.you") + "</em></span>" +
          '<span class="rank-row__class"><i class="rank-dot rank-dot--' + findClass(p.classId).tone + '"></i>' + pc.name + "</span>" +
          '<span class="rank-row__elo"><span class="rank-elo"><span class="rank-elo__name">' + t("ranked.unranked") + "</span></span></span>" +
          '<span class="rank-row__value">—</span>' +
        "</div>";
    }

    html += rows.map(function (row, i) {
      var item = findClass(row.classId);
      var c = item ? loc(item) : { name: "" };
      var value = isArena
        ? rankNum(row.value) + ' <em class="rank-row__record">' + row.wins + "W / " + row.losses + "L</em>"
        : rankNum(row.value);
      var tier = isArena ? eloTierFromValue(row.value) : eloTierFor(i, rows.length);
      var tierName = tier ? t("ranked.tier." + tier.key) : "";
      return '<div class="rank-row rank-row--' + (i + 1) + '">' +
        '<span class="rank-row__num">' + (i + 1) + "</span>" +
        '<span class="rank-row__player">' + esc(row.name) + "</span>" +
        '<span class="rank-row__class"><i class="rank-dot rank-dot--' + (item ? item.tone : "moon") + '"></i>' + c.name + "</span>" +
        '<span class="rank-row__elo"><span class="rank-elo">' + eloCrest(tier) + '<span class="rank-elo__name">' + tierName + "</span></span></span>" +
        '<span class="rank-row__value">' + value + "</span>" +
        "</div>";
    }).join("");

    if (!p) {
      html += '<p class="rank-board__hint">' + t("ranking.createProfileHint") + "</p>";
    }
    rankBoard.innerHTML = html;
    registerReveals();
  }

  /* ---------------- GUILDS ---------------- */
  var guildsBoard = $("#guildsBoard");
  var GUILD_KEY = "mv-guild";
  var GUILDS_CREATED_KEY = "mv-guilds-created";

  function loadGuild() {
    try { return JSON.parse(localStorage.getItem(GUILD_KEY) || "null"); } catch (e) { return null; }
  }
  function storeGuild(g) { try { localStorage.setItem(GUILD_KEY, JSON.stringify(g)); } catch (e) {} }
  function leaveGuild() { try { localStorage.removeItem(GUILD_KEY); } catch (e) {} }
  function loadCreatedGuilds() {
    try { return JSON.parse(localStorage.getItem(GUILDS_CREATED_KEY) || "[]"); } catch (e) { return []; }
  }
  function storeCreatedGuilds(list) { try { localStorage.setItem(GUILDS_CREATED_KEY, JSON.stringify(list)); } catch (e) {} }

  function allGuilds() {
    var base = (CONTENT.guilds || []).slice();
    var created = loadCreatedGuilds();
    created.forEach(function (g) { base.push(g); });
    return base.sort(function (a, b) { return (b.power || 0) - (a.power || 0); });
  }

  function renderGuilds() {
    if (!guildsBoard) return;
    var myGuild = loadGuild();
    var list = allGuilds();
    var rankHtml = '<div class="guild-rank"><h3 class="guild-rank__title">' + t("guilds.rankTitle") + "</h3>" +
      '<ol class="guild-rank__list">' +
      list.map(function (g, i) {
        var l = loc(g);
        return '<li class="guild-rank__item"><span class="guild-rank__pos">' + (i + 1) + '</span>' +
          '<span class="guild-rank__tag">' + esc(g.tag) + '</span>' +
          '<span class="guild-rank__name">' + esc(l.name) + '</span>' +
          '<span class="guild-rank__meta">' + g.members + ' ' + t("guilds.members") + ' · ' + rankNum(g.power) + ' ' + t("guilds.power") + '</span>' +
          (g.recruiting ? '<span class="guild-rank__recruiting">' + t("guilds.recruiting") + "</span>" : "") +
        "</li>";
      }).join("") +
      "</ol></div>";

    if (myGuild) {
      var l = loc(myGuild);
      guildsBoard.innerHTML = '<div class="guilds">' +
        '<div class="guild-card guild-card--mine">' +
          '<div class="guild-card__head"><span class="guild-card__tag">' + esc(myGuild.tag) + '</span><h3 class="guild-card__name">' + esc(l.name) + '</h3></div>' +
          '<p class="guild-card__desc">' + esc(l.desc) + '</p>' +
          '<p class="guild-card__meta">' + t("guilds.leader") + ': ' + esc(myGuild.leader) + ' · ' + myGuild.members + ' ' + t("guilds.members") + ' · ' + rankNum(myGuild.power) + ' ' + t("guilds.power") + '</p>' +
          '<button class="btn btn--ghost btn--sm" type="button" data-guild-leave>' + t("guilds.leave") + '</button>' +
        '</div>' +
        rankHtml +
      "</div>";
      var leaveBtn = $("[data-guild-leave]", guildsBoard);
      if (leaveBtn) leaveBtn.addEventListener("click", function () { leaveGuild(); renderGuilds(); toast(t("guilds.left")); });
    } else {
      guildsBoard.innerHTML = '<div class="guilds">' +
        '<div class="guilds__actions">' +
          '<button class="btn btn--primary" type="button" data-guild-create>' + t("guilds.create") + '</button>' +
        '</div>' +
        '<div class="guild-list">' +
        list.map(function (g) {
          var l = loc(g);
          return '<div class="guild-card">' +
            '<div class="guild-card__head"><span class="guild-card__tag">' + esc(g.tag) + '</span><h3 class="guild-card__name">' + esc(l.name) + '</h3></div>' +
            '<p class="guild-card__desc">' + esc(l.desc) + '</p>' +
            '<p class="guild-card__meta">' + t("guilds.leader") + ': ' + esc(g.leader) + ' · ' + g.members + ' ' + t("guilds.members") + ' · ' + rankNum(g.power) + ' ' + t("guilds.power") + '</p>' +
            (g.recruiting
              ? '<button class="btn btn--ghost btn--sm" type="button" data-guild-join="' + g.id + '">' + t("guilds.join") + '</button>'
              : '<span class="guild-card__closed">' + t("guilds.closed") + '</span>') +
          '</div>';
        }).join("") +
        '</div>' +
        rankHtml +
      "</div>";

      $all("[data-guild-join]", guildsBoard).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-guild-join");
          var g = allGuilds().find(function (x) { return x.id === id; });
          if (g) { storeGuild(g); renderGuilds(); toast(t("guilds.joined").replace("{name}", loc(g).name)); }
        });
      });
      var createBtn = $("[data-guild-create]", guildsBoard);
      if (createBtn) createBtn.addEventListener("click", openGuildCreateModal);
    }
    registerReveals();
  }

  function openGuildCreateModal() {
    openModal(
      '<h3 class="modal-title">' + t("guilds.createTitle") + '</h3>' +
      '<form class="auth-form" novalidate>' +
        '<label class="profile-form__label" for="guildName">' + t("guilds.name") + '</label>' +
        '<input class="profile-form__input" id="guildName" type="text" maxlength="24" placeholder="' + t("guilds.namePlaceholder") + '">' +
        '<label class="profile-form__label" for="guildTag">' + t("guilds.tag") + '</label>' +
        '<input class="profile-form__input" id="guildTag" type="text" maxlength="4" placeholder="ABC">' +
        '<label class="profile-form__label" for="guildDesc">' + t("guilds.desc") + '</label>' +
        '<input class="profile-form__input" id="guildDesc" type="text" maxlength="80" placeholder="' + t("guilds.descPlaceholder") + '">' +
        '<p class="auth-error" id="guildError" role="alert" hidden></p>' +
        '<button class="btn btn--primary auth-submit" type="submit">' + t("guilds.create") + '</button>' +
      '</form>'
    );
    var form = $(".auth-form", modalBody);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#guildName").value.trim();
      var tag = $("#guildTag").value.trim().toUpperCase();
      var desc = $("#guildDesc").value.trim();
      var err = $("#guildError");
      if (name.length < 3) { err.textContent = t("guilds.errName"); err.hidden = false; return; }
      if (!/^[A-Z]{2,4}$/.test(tag)) { err.textContent = t("guilds.errTag"); err.hidden = false; return; }
      var created = loadCreatedGuilds();
      var g = { id: "g-" + Date.now(), tag: tag, en: { name: name, desc: desc || "A new guild of the Vale." }, pt: { name: name, desc: desc || "Uma nova guilda do Vale." }, leader: (currentAccount() ? currentAccount().name : "You"), members: 1, power: 0, region: "Moon Valley", recruiting: true, created: true };
      created.push(g);
      storeCreatedGuilds(created);
      storeGuild(g);
      closeModal();
      renderGuilds();
      toast(t("guilds.created").replace("{name}", name));
    });
  }

  /* ---------------- ROADMAP ---------------- */
  var planTabs = $("#planTabs");
  var planGrid = $("#planGrid");
  var planFilter = "all";

  function renderRoadmap() {
    if (!planGrid) return;
    if (planTabs) {
      planTabs.innerHTML = "";
      ["all", "idea", "planned", "development", "launch"].forEach(function (key) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "rank-tab" + (planFilter === key ? " is-active" : "");
        btn.setAttribute("aria-pressed", planFilter === key ? "true" : "false");
        btn.textContent = key === "all" ? t("roadmap.tab.all") : t("roadmap.status." + key);
        btn.addEventListener("click", function () {
          planFilter = key;
          renderRoadmap();
        });
        planTabs.appendChild(btn);
      });
    }
    var plans = (CONTENT.roadmap || []).filter(function (p) {
      return planFilter === "all" || p.status === planFilter;
    });
    if (!plans.length) {
      planGrid.innerHTML = '<p class="rank-board__hint">' + t("roadmap.empty") + "</p>";
      return;
    }
    planGrid.innerHTML = plans.map(function (p) {
      var c = loc(p);
      return '<article class="frame plan-card reveal">' + GEMS +
        '<div class="plan-card__head">' +
          '<span class="plan-status plan-status--' + p.status + '">' + t("roadmap.status." + p.status) + "</span>" +
          '<span class="plan-cat">' + t("roadmap.cat." + p.category) + "</span>" +
        "</div>" +
        '<h3 class="plan-card__title">' + esc(c.title) + "</h3>" +
        '<p class="plan-card__text">' + esc(c.text) + "</p>" +
        "</article>";
    }).join("");
    registerReveals();
  }

  /* ---------------- YOUTUBE ---------------- */
  var youtubeGrid = $("#youtubeGrid");

  function ytVideoId(url) {
    if (!url) return null;
    var m = String(url).match(/(?:youtube\.com\/.*v=|youtu\.be\/|youtube\.com\/(?:embed|shorts)\/)([\w-]{6,})/);
    return m ? m[1] : null;
  }
  function ytThumb(item) {
    if (item.thumb) return item.thumb;
    var id = ytVideoId(item.url);
    return id ? "https://img.youtube.com/vi/" + id + "/hqdefault.jpg" : "";
  }

  function renderYoutube() {
    if (!youtubeGrid) return;
    youtubeGrid.innerHTML = "";
    (CONTENT.youtube || []).forEach(function (item) {
      var c = loc(item);
      var ready = !!ytVideoId(item.url) || !!item.url;
      var card = document.createElement(ready ? "a" : "article");
      if (ready) {
        card.href = item.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        card.setAttribute("aria-label", t("youtube.watch") + ": " + c.title);
      } else {
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-disabled", "true");
        card.setAttribute("aria-label", c.title + " — " + t("youtube.soon"));
      }
      card.className = "yt-card frame reveal" + (ready ? "" : " yt-card--pending");
      card.innerHTML =
        '<div class="yt-card__media">' +
        '<img src="' + ytThumb(item) + '" alt="" loading="lazy">' +
        '<span class="yt-card__play" aria-hidden="true"><span class="yt-card__play-ring">' + PLAY_ICON + "</span></span>" +
        (ready ? "" : '<span class="yt-card__badge">' + t("youtube.soon") + "</span>") +
        "</div>" +
        '<div class="yt-card__body">' +
        '<h3 class="yt-card__title">' + c.title + "</h3>" +
        '<span class="yt-card__cta">' + (ready ? t("youtube.watch") + " →" : t("youtube.soon")) + "</span>" +
        "</div>";
      if (!ready) {
        function open() { openPending(); }
        card.addEventListener("click", open);
        card.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
        });
      }
      youtubeGrid.appendChild(card);
    });
    registerReveals();
  }

  /* ---------------- COOKIES ---------------- */
  var cookieBanner = $("#cookieBanner");
  if (cookieBanner) {
    var cookieChoice = null;
    try { cookieChoice = localStorage.getItem("mv-cookies"); } catch (err) { /* private mode: assume decided */ }
    if (!cookieChoice) {
      window.setTimeout(function () { cookieBanner.classList.add("is-shown"); }, 900);
    }
    $all("[data-cookie-choice]", cookieBanner).forEach(function (btn) {
      btn.addEventListener("click", function () {
        try { localStorage.setItem("mv-cookies", btn.dataset.cookieChoice); } catch (err) { /* private mode */ }
        cookieBanner.classList.remove("is-shown");
      });
    });
  }

  /* ---------------- STORE BADGES ---------------- */
  [{ sel: "#appStoreBadge", url: CONFIG.appStoreUrl }, { sel: "#googlePlayBadge", url: CONFIG.playStoreUrl }].forEach(function (store) {
    var badge = $(store.sel);
    if (!badge) return;
    if (store.url) {
      badge.href = store.url;
      badge.target = "_blank";
      badge.rel = "noopener noreferrer";
    } else {
      badge.addEventListener("click", function (e) {
        e.preventDefault();
        openPending();
      });
    }
  });

  /* ---------------- SOCIAL / DISCORD ---------------- */
  function socialButton(key, label, url) {
    var el;
    if (url) {
      el = document.createElement("a");
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    } else {
      el = document.createElement("button");
      el.type = "button";
      el.setAttribute("aria-disabled", "true");
      el.title = t("community.note");
    }
    el.className = "social-btn";
    el.setAttribute("aria-label", label);
    el.innerHTML = window.MV_SOCIAL_ICONS[key] || window.MV_SOCIAL_ICONS.discord;
    if (!url) el.addEventListener("click", function (e) { e.preventDefault(); openPending(); });
    return el;
  }

  function renderSocials() {
    /* Social network buttons live only in the footer (site's end). */
    var rows = [$("#footerSocialRow")].filter(Boolean);
    rows.forEach(function (row) { row.innerHTML = ""; });

    var items = [
      { key: "discord", label: "Discord", url: CONFIG.discordUrl },
      { key: "whatsapp", label: "WhatsApp", url: CONFIG.whatsappUrl }
    ].concat(CONFIG.socials || []);

    rows.forEach(function (row) {
      items.forEach(function (s) { row.appendChild(socialButton(s.key, s.label, s.url)); });
    });

    /* Discord buttons: enable or show honest pending state */
    var discordReady = !!CONFIG.discordUrl;
    ["#headerDiscord", "#communityDiscord"].forEach(function (sel) {
      var btn = $(sel);
      if (!btn) return;
      if (discordReady) {
        btn.href = CONFIG.discordUrl;
        btn.target = "_blank";
        btn.rel = "noopener noreferrer";
      } else {
        btn.removeAttribute("href");
        btn.setAttribute("role", "button");
        btn.setAttribute("aria-disabled", "true");
        btn.addEventListener("click", function () { openPending(); });
      }
    });

    /* WhatsApp button */
    var whatsappReady = !!CONFIG.whatsappUrl;
    var waBtn = $("#communityWhatsapp");
    if (waBtn) {
      if (whatsappReady) {
        waBtn.href = CONFIG.whatsappUrl;
        waBtn.target = "_blank";
        waBtn.rel = "noopener noreferrer";
      } else {
        waBtn.removeAttribute("href");
        waBtn.setAttribute("role", "button");
        waBtn.setAttribute("aria-disabled", "true");
        waBtn.addEventListener("click", function () { openPending(); });
      }
    }
    var note = $("#communityNote");
    if (note) note.hidden = discordReady || whatsappReady;
  }

  /* ---------------- MODALS ---------------- */
  var modalRoot = $("#modalRoot");
  var modalBody = $("#modalBody");
  var modalDialog = $(".modal__dialog", modalRoot);
  var lastFocused = null;

  function openModal(html) {
    lastFocused = document.activeElement;
    modalBody.innerHTML = html;
    modalRoot.hidden = false;
    document.body.style.overflow = "hidden";
    modalDialog.focus();
  }
  function closeModal() {
    if (modalRoot.hidden) return;
    modalRoot.hidden = true;
    modalBody.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }
  $all("[data-close-modal]", modalRoot).forEach(function (el) {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
  /* rudimentary focus trap */
  modalRoot.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var focusables = $all('a[href], button, [tabindex]:not([tabindex="-1"])', modalDialog)
      .filter(function (el) { return el.offsetParent !== null; });
    if (!focusables.length) return;
    var first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------------- AUTH (email + password) ----------------
     Two modes sharing one UI:
       - REAL login: Firebase Authentication (cloud, valid on every
         device) — active when MV_CONFIG.firebase is filled in.
       - Local fallback: accounts live in this browser only, stored
         as SHA-256 hashes of "moonvalley:email:password" (the modal
         honestly says so while cloud isn't configured).
     Local shape: mv-users = { email: { username, hash, since } }
                  mv-session = email while "logged in" */
  var AUTH_USERS = "mv-users";
  var AUTH_SESSION = "mv-session";
  var authNav = $("#authNav");
  var authMode = "login";
  var authSeq = 0; /* stale-async guard: only the latest action may report */
  var fbReady = false;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  /* signup verification code (EmailJS) — hidden while CONFIG.emailjs is empty */
  var otp = { code: "", email: "", expires: 0, cooldown: 0, sending: false, timer: 0 };
  var OTP_TTL_MS = 10 * 60 * 1000;    /* a code lives 10 minutes */
  var OTP_COOLDOWN_MS = 45000;        /* resend cooldown, also respects EmailJS's 1 req/sec */
  function otpOn() {
    var e = CONFIG.emailjs || {};
    return !!(e.publicKey && e.serviceId && e.templateId);
  }

  (function initFirebase() {
    var cfg = CONFIG.firebase;
    if (!cfg || !cfg.apiKey || !window.firebase) return;
    try {
      window.firebase.initializeApp(cfg);
      fbReady = true;
      window.firebase.auth().onAuthStateChanged(function (user) {
        if (user && window.firebase.firestore) {
          window.firebase.firestore().collection("profiles").doc(user.uid).get().then(function (snap) {
            if (snap.exists) {
              try { localStorage.setItem(PROFILE_KEY, JSON.stringify(snap.data())); } catch (e) {}
            }
          }).catch(function () {});
        }
        renderAuthNav();
      });
    } catch (e) { fbReady = false; }
  })();

  function loadUsers() {
    try { return JSON.parse(localStorage.getItem(AUTH_USERS) || "{}"); } catch (e) { return {}; }
  }
  function getSession() {
    try { return localStorage.getItem(AUTH_SESSION) || ""; } catch (e) { return ""; }
  }
  function hashPass(email, pass) {
    var data = "moonvalley:" + email.toLowerCase() + ":" + pass;
    if (window.crypto && crypto.subtle && crypto.subtle.digest) {
      return crypto.subtle.digest("SHA-256", new TextEncoder().encode(data)).then(function (buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function (b) {
          return ("0" + b.toString(16)).slice(-2);
        }).join("");
      });
    }
    var h = 5381; /* ancient-browser fallback */
    for (var i = 0; i < data.length; i++) h = ((h << 5) + h + data.charCodeAt(i)) >>> 0;
    return Promise.resolve("fb" + h.toString(16));
  }

  function toast(msg) {
    var el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("is-in"); });
    setTimeout(function () {
      el.classList.remove("is-in");
      setTimeout(function () { if (el.parentNode) el.remove(); }, 400);
    }, 2800);
  }

  function currentAccount() {
    if (fbReady) {
      var u = window.firebase.auth().currentUser;
      if (!u) return null;
      return { name: u.displayName || (u.email || "").split("@")[0], email: u.email || "" };
    }
    var email = getSession();
    var rec = email && loadUsers()[email];
    if (!rec) return null;
    return { name: rec.username || email.split("@")[0], email: email };
  }

  function renderAuthNav() {
    if (!authNav) return;
    var acc = currentAccount();
    if (acc) {
      authNav.innerHTML =
        '<span class="auth-user"><i class="auth-user__dot" aria-hidden="true"></i>' + esc(acc.name) + "</span>" +
        '<button class="btn btn--ghost btn--sm auth-btn" type="button" data-auth-logout>' + t("auth.logout") + "</button>";
      $("[data-auth-logout]", authNav).addEventListener("click", function () {
        if (fbReady) {
          window.firebase.auth().signOut().then(function () {
            renderAuthNav();
            toast(t("auth.bye"));
          });
        } else {
          try { localStorage.removeItem(AUTH_SESSION); } catch (e) {}
          renderAuthNav();
          toast(t("auth.bye"));
        }
      });
    } else {
      authNav.innerHTML =
        '<button class="btn btn--ghost btn--sm auth-btn" type="button" data-auth-login>' + t("auth.login") + "</button>" +
        '<button class="btn btn--primary btn--sm auth-btn" type="button" data-auth-register>' + t("auth.register") + "</button>";
      $("[data-auth-login]", authNav).addEventListener("click", function () { openAuthModal("login"); });
      $("[data-auth-register]", authNav).addEventListener("click", function () { openAuthModal("register"); });
    }
  }

  function authFormHTML(mode) {
    var isLogin = mode === "login";
    return '<h3 class="modal-title" id="modalTitle">' + t(isLogin ? "auth.loginTitle" : "auth.registerTitle") + "</h3>" +
      '<div class="rank-tabs auth-tabs" role="tablist">' +
        '<button class="rank-tab' + (isLogin ? " is-active" : "") + '" type="button" data-auth-tab="login" aria-pressed="' + isLogin + '">' + t("auth.login") + "</button>" +
        '<button class="rank-tab' + (!isLogin ? " is-active" : "") + '" type="button" data-auth-tab="register" aria-pressed="' + !isLogin + '">' + t("auth.register") + "</button>" +
      "</div>" +
      '<form class="auth-form" novalidate>' +
        (isLogin ? "" :
          '<label class="profile-form__label" for="authUser">' + t("auth.username") + "</label>" +
          '<input class="profile-form__input" id="authUser" type="text" maxlength="20" autocomplete="username" placeholder="' + t("auth.usernamePlaceholder") + '">') +
        '<label class="profile-form__label" for="authEmail">' + t("auth.email") + "</label>" +
        '<input class="profile-form__input" id="authEmail" type="email" maxlength="120" autocomplete="email" placeholder="' + t("auth.emailPlaceholder") + '">' +
        (isLogin || !otpOn() ? "" :
          '<div class="auth-otp">' +
            '<label class="profile-form__label" for="otpCode">' + t("auth.otpCode") + "</label>" +
            '<div class="auth-otp__row">' +
              '<button class="btn btn--ghost btn--sm auth-otp__send" type="button" data-otp-send>' + t("auth.otpSend") + "</button>" +
              '<input class="profile-form__input auth-otp__input" id="otpCode" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="' + t("auth.otpPlaceholder") + '">' +
            "</div>" +
            '<p class="auth-otp__status" id="otpStatus" role="status" aria-live="polite" hidden></p>' +
          "</div>") +
        '<label class="profile-form__label" for="authPass">' + t("auth.password") + "</label>" +
        '<input class="profile-form__input" id="authPass" type="password" maxlength="64" autocomplete="' + (isLogin ? "current-password" : "new-password") + '" placeholder="' + t("auth.passwordPlaceholder") + '">' +
        (isLogin
          ? '<button class="auth-forgot" type="button" data-auth-forgot>' + t("auth.forgot") + "</button>"
          : '<label class="profile-form__label" for="authPass2">' + t("auth.password2") + "</label>" +
            '<input class="profile-form__input" id="authPass2" type="password" maxlength="64" autocomplete="new-password" placeholder="' + t("auth.passwordPlaceholder") + '">') +
        '<p class="auth-error" id="authError" role="alert" hidden></p>' +
        '<button class="btn btn--primary auth-submit" type="submit">' + t(isLogin ? "auth.login" : "auth.register") + "</button>" +
      "</form>" +
      '<p class="auth-note">' + (fbReady ? t("auth.cloudNote") : t("auth.localNote")) + "</p>";
  }

  function openAuthModal(mode) {
    authMode = mode;
    openModal(authFormHTML(mode));
    wireAuthForm();
  }

  function authFail(msg) {
    var box = $("#authError");
    if (box) { box.textContent = msg; box.hidden = false; }
  }

  function fbErr(err) {
    var code = (err && err.code) || "";
    var map = {
      "auth/email-already-in-use": "auth.errTaken",
      "auth/invalid-email": "auth.errEmail",
      "auth/weak-password": "auth.errPass",
      "auth/user-not-found": "auth.errNoEmail",
      "auth/invalid-credential": "auth.errWrongPass",
      "auth/wrong-password": "auth.errWrongPass",
      "auth/too-many-requests": "auth.errThrottle",
      "auth/network-request-failed": "auth.errNetwork",
      "auth/operation-not-allowed": "auth.errDisabled"
    };
    return t(map[code] || "auth.errGeneric");
  }

  /* ---- email verification code (EmailJS) helpers ---- */
  function otpStatus(msg, kind) {
    var el = $("#otpStatus");
    if (!el) return;
    el.textContent = msg || "";
    el.className = "auth-otp__status" + (kind ? " is-" + kind : "");
    el.hidden = !msg;
  }

  function otpStartCooldown(btn) {
    clearInterval(otp.timer);
    otp.timer = setInterval(function () {
      var left = otp.cooldown - Date.now();
      if (left <= 0) {
        clearInterval(otp.timer);
        otp.timer = 0;
        btn.disabled = false;
        btn.textContent = t("auth.otpSend");
        return;
      }
      btn.disabled = true;
      btn.textContent = Math.ceil(left / 1000) + "s";
    }, 250);
  }

  function otpCheck(email, typed) {
    if (!otp.code) return "Missing";
    if (email.toLowerCase() !== otp.email.toLowerCase()) return "Changed";
    if (Date.now() > otp.expires) return "Expired";
    if (!typed || typed !== otp.code) return "Wrong";
    return "Ok";
  }

  function wireAuthForm() {
    $all("[data-auth-tab]", modalBody).forEach(function (btn) {
      btn.addEventListener("click", function () { openAuthModal(btn.getAttribute("data-auth-tab")); });
    });
    var forgot = $("[data-auth-forgot]", modalBody);
    if (forgot) {
      forgot.addEventListener("click", function () {
        var email = $("#authEmail") ? $("#authEmail").value.trim() : "";
        if (!fbReady) return authFail(t("auth.forgotLocal"));
        if (!EMAIL_RE.test(email)) return authFail(t("auth.errEmail"));
        var seq = ++authSeq;
        window.firebase.auth().sendPasswordResetEmail(email).then(function () {
          if (seq !== authSeq) return;
          closeModal();
          toast(t("auth.resetSent"));
        }).catch(function (err) {
          if (seq !== authSeq) return;
          authFail(fbErr(err));
        });
      });
    }
    var otpSend = $("[data-otp-send]", modalBody);
    if (otpSend) {
      if (otp.code && otp.email) otpStatus(t("auth.otpSent").replace("{email}", otp.email), "ok");
      if (otp.cooldown > Date.now()) otpStartCooldown(otpSend);
      otpSend.addEventListener("click", function () {
        var email = $("#authEmail") ? $("#authEmail").value.trim() : "";
        if (!EMAIL_RE.test(email)) return authFail(t("auth.errEmail"));
        if (otp.sending || Date.now() < otp.cooldown) return;
        if (!window.emailjs) return otpStatus(t("auth.otpUnavailable"), "err");
        var cfg = CONFIG.emailjs || {};
        var code = String(Math.floor(100000 + Math.random() * 900000));
        otp.sending = true;
        otpSend.disabled = true;
        otpSend.textContent = t("auth.otpSending");
        otpStatus("", "");
        window.emailjs.send(cfg.serviceId, cfg.templateId, {
          to_email: email,
          code: code,
          site: "Moon Valley",
          lang: lang === "pt" ? "pt-BR" : "en"
        }, { publicKey: cfg.publicKey }).then(function () {
          otp.sending = false;
          otp.code = code;
          otp.email = email;
          otp.expires = Date.now() + OTP_TTL_MS;
          otp.cooldown = Date.now() + OTP_COOLDOWN_MS;
          otpStatus(t("auth.otpSent").replace("{email}", email), "ok");
          var codeInput = $("#otpCode");
          if (codeInput) { codeInput.value = ""; codeInput.focus(); }
          otpStartCooldown(otpSend);
        }).catch(function () {
          otp.sending = false;
          otpSend.disabled = false;
          otpSend.textContent = t("auth.otpSend");
          otpStatus(t("auth.otpFail"), "err");
        });
      });
      var emailField = $("#authEmail", modalBody);
      if (emailField) {
        emailField.addEventListener("input", function () {
          if (otp.code && emailField.value.trim().toLowerCase() !== otp.email.toLowerCase()) {
            otpStatus(t("auth.otpChangedInfo"), "warn");
          }
        });
      }
      var codeField = $("#otpCode", modalBody);
      if (codeField) {
        codeField.addEventListener("input", function () {
          codeField.value = codeField.value.replace(/\D/g, "").slice(0, 6);
        });
      }
    } else {
      clearInterval(otp.timer);
      otp.timer = 0;
    }
    var form = $(".auth-form", modalBody);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var seq = ++authSeq;
      var email = $("#authEmail").value.trim();
      var pass = $("#authPass").value;
      var pass2El = $("#authPass2");
      var nameEl = $("#authUser");
      if (!EMAIL_RE.test(email)) return authFail(t("auth.errEmail"));
      if (pass.length < 4) return authFail(t("auth.errPass"));
      if (authMode !== "login") {
        if (!nameEl || nameEl.value.trim().length < 3) return authFail(t("auth.errUser"));
        if (!pass2El || pass2El.value !== pass) return authFail(t("auth.errMatch"));
        if (otpOn()) {
          var codeEl = $("#otpCode");
          var otpRes = otpCheck(email, codeEl ? codeEl.value.replace(/\D/g, "") : "");
          if (otpRes !== "Ok") return authFail(t("auth.otpErr" + otpRes));
        }
      }
      if (fbReady) {
        if (authMode === "login") {
          window.firebase.auth().signInWithEmailAndPassword(email, pass).then(function () {
            if (seq !== authSeq) return;
            closeModal();
            renderAuthNav();
            toast(t("auth.welcome").replace("{name}", currentAccount().name));
          }).catch(function (err) {
            if (seq !== authSeq) return;
            authFail(fbErr(err));
          });
        } else {
          var uname = nameEl.value.trim();
          window.firebase.auth().createUserWithEmailAndPassword(email, pass).then(function (cred) {
            return cred.user.updateProfile({ displayName: uname });
          }).then(function () {
            if (seq !== authSeq) return;
            otp.code = ""; otp.email = ""; otp.expires = 0;
            closeModal();
            renderAuthNav();
            toast(t("auth.created").replace("{name}", uname));
          }).catch(function (err) {
            if (seq !== authSeq) return;
            authFail(fbErr(err));
          });
        }
      } else {
        var users = loadUsers();
        if (authMode === "login") {
          var rec = users[email];
          if (!rec) return authFail(t("auth.errNoEmail"));
          hashPass(email, pass).then(function (hash) {
            if (seq !== authSeq) return;
            if (rec.hash !== hash) return authFail(t("auth.errWrongPass"));
            localStorage.setItem(AUTH_SESSION, email);
            closeModal();
            renderAuthNav();
            toast(t("auth.welcome").replace("{name}", rec.username || email.split("@")[0]));
          });
        } else {
          if (users[email]) return authFail(t("auth.errTaken"));
          var unameL = nameEl.value.trim();
          hashPass(email, pass).then(function (hash) {
            if (seq !== authSeq) return;
            users[email] = { username: unameL, hash: hash, since: new Date().toISOString().slice(0, 10) };
            localStorage.setItem(AUTH_USERS, JSON.stringify(users));
            otp.code = ""; otp.email = ""; otp.expires = 0;
            localStorage.setItem(AUTH_SESSION, email);
            closeModal();
            renderAuthNav();
            toast(t("auth.created").replace("{name}", unameL));
          });
        }
      }
    });
    var firstField = $("#authUser") || $("#authEmail");
    if (firstField) firstField.focus();
  }

  function embedUrl(raw) {
    if (!raw) return null;
    var yt = raw.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([\w-]{6,})/);
    if (yt) return "https://www.youtube.com/embed/" + yt[1] + "?autoplay=1&rel=0";
    if (/vimeo\.com\/(\d+)/.test(raw)) return "https://player.vimeo.com/video/" + raw.match(/vimeo\.com\/(\d+)/)[1] + "?autoplay=1";
    return null; /* unknown provider: never guess, show pending state */
  }

  function videoBlock(url) {
    var embed = embedUrl(url);
    if (embed) {
      return '<div class="video-frame"><iframe src="' + embed + '" title="Moon Valley video" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>';
    }
    if (/\.(mp4|webm|ogv|ogg)(\?.*)?$/i.test(url || "")) {
      return '<div class="video-frame"><video class="video-frame__player" controls autoplay playsinline preload="metadata" src="' + url + '"></video></div>';
    }
    return '<div class="video-frame"><div class="video-frame__pending">' +
      '<div class="rune-ring"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 14.5v-9l6 4.5-6 4.5z"/></svg></div>' +
      '<p class="video-frame__title">' + t("media.trailerSoon") + "</p>" +
      '<p class="video-frame__note">' + t("media.trailerSoonNote") + "</p>" +
      "</div></div>";
  }

  function openTrailer(item) {
    var data = item || { url: CONFIG.trailerUrl, en: { title: "Moon Valley — Official Trailer" }, pt: { title: "Moon Valley — Trailer Oficial" } };
    var c = item ? loc(item) : loc(data);
    openModal(
      videoBlock(data.url || CONFIG.trailerUrl) +
      '<h3 class="modal-title" id="modalTitle">' + c.title + "</h3>" +
      '<p class="modal-prose">' + c.sub + "</p>"
    );
  }
  $all("[data-open-trailer]").forEach(function (el) {
    el.addEventListener("click", function (e) { e.preventDefault(); openTrailer(null); });
  });

  function openArticle(item) {
    var c = loc(item);
    var body = c.body.map(function (p) { return "<p>" + p + "</p>"; }).join("");
    openModal(
      '<span class="news-card__tag' + categoryClass(item.category) + '" style="position:static;display:inline-block;margin-bottom:1rem">' + c.tag + "</span>" +
      '<h3 class="modal-title" id="modalTitle">' + c.title + "</h3>" +
      '<p class="modal-meta"><time datetime="' + item.date + '">' + formatDate(item.date) + "</time></p>" +
      '<img src="' + item.image + '" alt="" style="width:100%;margin-bottom:1.4rem;border:1px solid rgba(216,216,207,.18)">' +
      '<div class="modal-prose">' + body + "</div>"
    );
  }

  function openRegion(item) {
    var c = loc(item);
    var detail = c.detail.map(function (p) {
      return "<p>" + p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") + "</p>";
    }).join("");
    openModal(
      '<img src="' + item.scene + '" alt="" style="width:100%;margin-bottom:1.4rem;border:1px solid rgba(216,216,207,.18)">' +
      '<span class="region-card__biome" style="margin-bottom:.4rem">' + c.biome + "</span>" +
      '<h3 class="modal-title" id="modalTitle">' + c.name + "</h3>" +
      '<div class="modal-prose"><p>' + c.desc + "</p>" + detail + "</div>"
    );
  }

  function openPending() {
    openModal(
      '<h3 class="modal-title" id="modalTitle">' + t("community.title") + "</h3>" +
      '<div class="modal-prose"><p>' + t("community.note") + "</p></div>"
    );
  }

  function openLegal(kind) {
    var title = kind === "terms" ? t("legal.terms.title") : kind === "privacy" ? t("legal.privacy.title") : t("media.trailerSoon");
    openModal(
      '<h3 class="modal-title" id="modalTitle">' + title + "</h3>" +
      '<div class="modal-prose"><p>' + t("legal.pending") + "</p></div>"
    );
  }
  $all("[data-legal]").forEach(function (el) {
    el.addEventListener("click", function (e) { e.preventDefault(); openLegal(el.dataset.legal); });
  });

  /* ---------------- LIGHTBOX ---------------- */
  var lightboxIndex = -1;
  var galleryItems = [];

  function refreshGallery() {
    galleryItems = CONTENT.media.filter(function (m) {
      return m.kind === "screenshot" || m.kind === "art";
    });
  }

  function lightboxHTML(item) {
    var c = loc(item);
    return '<figure class="lightbox-figure">' +
      '<img src="' + item.thumb + '" alt="' + c.title + '">' +
      '<figcaption>' + c.title + " — " + c.sub + "</figcaption>" +
      "</figure>" +
      '<div class="lightbox-nav">' +
      '<button class="btn btn--ghost btn--sm" type="button" data-lb="prev">‹ ' + (lang === "pt" ? "Anterior" : "Prev") + "</button>" +
      '<button class="btn btn--ghost btn--sm" type="button" data-lb="close">' + t("modal.close") + "</button>" +
      '<button class="btn btn--ghost btn--sm" type="button" data-lb="next">' + (lang === "pt" ? "Próxima" : "Next") + " ›</button>" +
      "</div>";
  }

  function stepLightbox(delta) {
    lightboxIndex = (lightboxIndex + delta + galleryItems.length) % galleryItems.length;
    modalBody.innerHTML = lightboxHTML(galleryItems[lightboxIndex]);
    bindLightbox();
  }
  function bindLightbox() {
    $all("[data-lb]", modalBody).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var action = btn.dataset.lb;
        if (action === "prev") stepLightbox(-1);
        else if (action === "next") stepLightbox(1);
        else closeModal();
      });
    });
  }

  function openLightbox(item) {
    refreshGallery();
    var idx = galleryItems.indexOf(item);
    lightboxIndex = idx >= 0 ? idx : 0;
    if (!galleryItems.length) return;
    openModal(lightboxHTML(galleryItems[lightboxIndex]));
    bindLightbox();
  }

  document.addEventListener("keydown", function (e) {
    if (modalRoot.hidden) return;
    if (e.key === "ArrowLeft" && $all("[data-lb]", modalBody).length) stepLightbox(-1);
    if (e.key === "ArrowRight" && $all("[data-lb]", modalBody).length) stepLightbox(1);
  });

  /* ---------------- BACK TO TOP ---------------- */
  var backToTop = $("#backToTop");
  window.addEventListener("scroll", function () {
    backToTop.classList.toggle("is-visible", window.scrollY > 700);
  }, { passive: true });
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  /* ---------------- LANGUAGE ---------------- */
  function applyLanguage(next) {
    lang = next;
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = t("meta.default");

    $all("[data-i18n]").forEach(function (el) {
      var value = t(el.dataset.i18n);
      if (value) el.textContent = value;
    });

    $all(".lang-switch__btn").forEach(function (btn) {
      var active = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    renderNews();
    renderRegions();
    renderMapPins();
    renderClasses();
    renderProfile();
    renderBooks();
    renderArmoryFilters();
    renderArmory();
    renderShop();
    renderDroplist();
    renderRanking();
    renderRanked();
    renderGuilds();
    renderRoadmap();
    renderAuthNav();
    if (!modalRoot.hidden && $(".auth-form", modalBody)) openAuthModal(authMode);
    renderFeatures();
    renderMediaFilters();
    renderMedia();
    renderYoutube();

    /* refresh "view all" label state */
    var expanded = newsGrid.classList.contains("is-expanded");
    newsViewAll.querySelector("span").textContent = expanded ? t("news.showLess") : t("news.viewAll");

    try { localStorage.setItem("mv-lang", lang); } catch (err) { /* private mode */ }
  }

  $all(".lang-switch__btn").forEach(function (btn) {
    btn.addEventListener("click", function () { applyLanguage(btn.dataset.lang); });
  });

  /* ---------------- INIT ---------------- */
  var initialLang = "en";
  try {
    var stored = localStorage.getItem("mv-lang");
    if (stored === "pt" || stored === "en") initialLang = stored;
  } catch (err) { /* ignore */ }

  renderSocials();
  applyLanguage(initialLang);
  registerReveals();
})();
