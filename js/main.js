/* Portfolio behavior.
   The English page lives at the site root, the Arabic page at /ar/. Both load this file.
   Music lives in jazz.js, which is shared with the campaign report page. */
(function () {
  "use strict";
  const root = document.documentElement;
  const isAr = root.lang === "ar";
  const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  root.classList.add("js");

  /* ---------- language memory (14 days) ---------- */
  const KEY = "ma_lang";
  const TTL = 14 * 24 * 60 * 60 * 1000;
  const readLang = () => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "null");
      return s && Date.now() - s.at < TTL ? s.l : null;
    } catch (e) {
      return null;
    }
  };
  const saveLang = (l) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ l, at: Date.now() }));
    } catch (e) {}
  };
  const toggle = $("#langToggle");
  if (toggle)
    toggle.addEventListener("click", () => saveLang(isAr ? "en" : "ar"));

  /* ---------- language gate (English page only) ---------- */
  const gate = $("#langgate");
  const lockEls = $$("header.nav, main, footer");
  function lock(on) {
    lockEls.forEach((e) =>
      on ? e.setAttribute("inert", "") : e.removeAttribute("inert"),
    );
    document.body.style.overflow = on ? "hidden" : "";
  }
  function boot(user) {
    document.body.classList.add("go");
    if (typeof Jazz !== "undefined") Jazz.start(user);
  }
  if (isAr) {
    saveLang("ar");
    boot(false);
  } else if (gate) {
    const saved = readLang();
    if (saved === "ar") {
      location.replace("ar/" + location.hash);
    } else if (saved === "en") {
      boot(false);
    } else {
      gate.hidden = false;
      lock(true);
      $("[data-lang=en]", gate).focus();
      $$("[data-lang]", gate).forEach((b) =>
        b.addEventListener("click", () => {
          const l = b.dataset.lang;
          saveLang(l);
          if (l === "ar") {
            location.href = "ar/";
            return;
          }
          gate.hidden = true;
          lock(false);
          boot(true);
          $("#top").focus({ preventScroll: true });
        }),
      );
      gate.addEventListener("keydown", (e) => {
        if (e.key !== "Tab") return;
        const f = $$("button", gate);
        const i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && i === f.length - 1) {
          e.preventDefault();
          f[0].focus();
        }
      });
    }
  }

  /* ---------- scroll reveals ---------- */
  const reveal = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.classList.add("in");
        if (el.classList.contains("svc")) el.classList.add("drawn");
        reveal.unobserve(el);
        setTimeout(() => {
          el.classList.remove("rv", "in");
          el.style.transitionDelay = "";
        }, 1200);
      }),
    { threshold: 0.12 },
  );
  $$(
    ".pr, .svc, .runs, .sk, .m, .deck, .mu, .reportbar, .calcbox, .cover, .proj .plain, .tl > div",
  ).forEach((el, k) => {
    el.classList.add("rv");
    el.style.transitionDelay = (k % 4) * 90 + "ms";
    reveal.observe(el);
  });

  /* ---------- split headings (word by word) ---------- */
  function split(el) {
    const walk = (n) =>
      [...n.childNodes].forEach((c) => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach((t) => {
            if (!t) return;
            if (/^\s+$/.test(t))
              return frag.appendChild(document.createTextNode(" "));
            const o = document.createElement("span");
            o.className = "w";
            const i = document.createElement("span");
            i.textContent = t;
            o.appendChild(i);
            frag.appendChild(o);
          });
          c.replaceWith(frag);
        } else if (c.nodeType === 1) walk(c);
      });
    walk(el);
    $$(".w > span", el).forEach(
      (s, i) => (s.style.transitionDelay = i * 60 + "ms"),
    );
    el.classList.add("split");
  }
  if (!rm) {
    const heads = $$("main h2, .contact h2").filter((h) => !h.closest(".hero"));
    heads.forEach(split);
    const hio = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("done");
            hio.unobserve(e.target);
          }
        }),
      { threshold: 0.4 },
    );
    heads.forEach((h) => hio.observe(h));
  }

  /* ---------- counting numbers ---------- */
  const fmt = (el, v) => {
    const d = +el.dataset.dec || 0;
    el.textContent =
      (el.dataset.pre || "") +
      v.toLocaleString(document.documentElement.lang === "ar" ? "ar-EG" : "en-US", {
        minimumFractionDigits: d,
        maximumFractionDigits: d,
      }) +
      (el.dataset.suf || "");
  };
  const counters = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        counters.unobserve(e.target);
        const el = e.target;
        const to = +el.dataset.count;
        if (rm) return fmt(el, to);
        const t0 = performance.now();
        (function step(t) {
          const p = Math.min((t - t0) / 1500, 1);
          fmt(el, to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      }),
    { threshold: 0.6 },
  );
  $$("[data-count]").forEach((el) => counters.observe(el));

  /* ---------- tilt on cards (mouse only) ---------- */
  if (!rm && matchMedia("(hover: hover)").matches) {
    $$(".pr, .deck").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          "perspective(700px) rotateY(" +
          x * 6 +
          "deg) rotateX(" +
          -y * 6 +
          "deg) translateY(-4px)";
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
  }

  /* ---------- mouse spotlight ---------- */
  const spot = $("#spot");
  if (spot && !rm) {
    let tx = innerWidth / 2,
      ty = innerHeight / 3,
      cx = tx,
      cy = ty;
    addEventListener(
      "pointermove",
      (e) => {
        if (e.pointerType === "mouse") {
          tx = e.clientX;
          ty = e.clientY;
          spot.classList.add("on");
        }
      },
      { passive: true },
    );
    document.addEventListener("mouseleave", () => spot.classList.remove("on"));
    (function loop() {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      spot.style.setProperty("--sx", cx.toFixed(1) + "px");
      spot.style.setProperty("--sy", cy.toFixed(1) + "px");
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- scroll-linked effects ---------- */
  const bar = $("#pg");
  const glow = $("#glow");
  const parallax = $$("[data-px]");
  const timeline = $(".tl");
  const wheelSec = $("#posts");
  const wheelStage = wheelSec ? $(".stage", wheelSec) : null;
  const wheelItems = wheelSec ? $$(".wi", wheelSec) : [];
  const wcap = $("#wcap");
  let wres = null;
  let live = false;
  let wpos = 0;
  let iw = 300;
  let wanim = 0;

  const WMODE = new URLSearchParams(location.search).get("wheel") || "marquee";

  function wheelLayout() {
    const N = wheelItems.length;
    if (!N || !wheelStage || WMODE === "marquee" || WMODE === "grid") return;
    const sw = wheelStage.clientWidth,
      sh = wheelStage.clientHeight;
    const flat = WMODE === "flat",
      cover = WMODE === "cover",
      deck = WMODE === "deck",
      cyl = WMODE === "cyl",
      mini = WMODE === "mini";
    const R = mini
      ? Math.max(sw * 0.7, sh * 1.05, 420)
      : Math.max(sw * 0.9, sh * 1.1, 640);
    const step = mini ? (sw < 700 ? 24 : 20) : sw < 700 ? 20 : 17;
    iw = Math.round(
      cover
        ? Math.min(clamp(sw * 0.34, 230, 380), sh * 0.72)
        : deck || cyl
          ? Math.min(clamp(sw * 0.3, 220, 340), sh * 0.7)
          : cyl
            ? Math.min(clamp(sw * 0.26, 170, 270), sh * 0.62)
            : flat
            ? Math.min(clamp(sw * 0.24, 190, 300), sh * 0.66)
            : mini
              ? Math.min(clamp(sw * 0.2, 150, 230), sh * 0.6)
              : Math.min(clamp(sw * 0.26, 210, 360), sh * 0.66),
    );
    const cx = sw / 2,
      cy = mini
        ? sh * 0.55 + R
        : flat || cover || deck || cyl
          ? sh * 0.5
          : sh * 0.52 + R;
    const spacing = cover ? iw * 0.58 : iw * 1.08;
    wheelItems.forEach((it, i) => {
      let d = (i - wpos) % N;
      if (d > N / 2) d -= N;
      if (d < -N / 2) d += N;
      const ad = Math.abs(d);
      let tf, op, zi;
      if (cyl) {
        const ang = d * (sw < 700 ? 30 : 24),
          rad = (ang * Math.PI) / 180,
          Rz = iw * 1.7;
        tf =
          "translate(" +
          cx +
          "px," +
          cy +
          "px) translate(-50%,-50%) rotateY(" +
          ang +
          "deg) translateZ(" +
          Rz +
          "px)";
        op = Math.max(0, Math.pow(Math.cos(rad), 1.3));
        zi = Math.round(Math.cos(rad) * 100);
      } else if (deck) {
        const vd = clamp(d, -3, 3);
        tf =
          "translate(" +
          (cx + vd * 16) +
          "px," +
          (cy + vd * 12) +
          "px) translate(-50%,-50%) rotate(" +
          vd * 3 +
          "deg) scale(" +
          (1 - Math.min(ad, 4) * 0.05) +
          ")";
        op = ad < 0.5 ? 1 : Math.max(0, 1 - (ad - 0.5) * 0.34);
      } else if (flat || cover) {
        const cd = clamp(d, -1, 1);
        tf =
          "translate(" +
          (cx + d * spacing) +
          "px," +
          cy +
          "px) translate(-50%,-50%)" +
          (cover
            ? " rotateY(" +
              (-cd * 30) +
              "deg) scale(" +
              (1 - Math.min(ad, 2) * 0.08) +
              ")"
            : " scale(" + (1 - Math.min(ad, 2) * 0.12) + ")");
        op = Math.max(0, 1 - ad * (cover ? 0.45 : 0.38));
      } else {
        const th = d * step,
          rad = (th * Math.PI) / 180;
        tf =
          "translate(" +
          (cx + R * Math.sin(rad)) +
          "px," +
          (cy - R * Math.cos(rad)) +
          "px) translate(-50%,-50%) rotate(" +
          th +
          "deg) scale(" +
          (1 - Math.min(ad, 2) * 0.07) +
          ")";
        op = Math.max(0, 1 - ad * 0.38);
      }
      it.style.width = iw + "px";
      it.style.transform = tf;
      it.style.opacity = op;
      it.style.zIndex = zi != null ? zi : 50 - Math.round(ad * 10);
      it.style.pointerEvents = (cyl ? ad < 0.6 : ad < 2.2) ? "auto" : "none";
    });
    const ci = ((Math.round(wpos) % N) + N) % N;
    const cur = wheelItems[ci];
    wcap.textContent = cur.getAttribute("data-cap");
    if (wres) {
      const r = cur.querySelector(".wi-res");
      wres.textContent = r ? r.textContent : "";
    }
  }
  function wheelTo(target) {
    cancelAnimationFrame(wanim);
    const N = wheelItems.length;
    let d = (target - wpos) % N;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    const from = wpos,
      to = wpos + d,
      t0 = performance.now(),
      dur = 420;
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      wpos = from + (to - from) * e;
      wheelLayout();
      if (t < 1) wanim = requestAnimationFrame(tick);
    };
    wanim = requestAnimationFrame(tick);
  }
  function onScroll() {
    const h = root.scrollHeight - root.clientHeight;
    if (bar) bar.style.width = (scrollY / h) * 100 + "%";
    if (glow && !rm)
      glow.style.transform = "translateY(" + scrollY * 0.18 + "px)";
    if (!rm) {
      parallax.forEach((img) => {
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        img.style.transform = "translateY(" + (-p * 36).toFixed(1) + "px)";
      });
    }
    if (timeline) {
      const r = timeline.getBoundingClientRect();
      timeline.style.setProperty(
        "--p",
        clamp((innerHeight * 0.7 - r.top) / r.height, 0, 1).toFixed(3),
      );
    }
  }
  let ticking = false;
  addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
      }
    },
    { passive: true },
  );
  addEventListener("resize", () => {
    onScroll();
    if (live) wheelLayout();
  });
  if (wheelSec && wheelStage && !rm && WMODE !== "grid") {
    live = true;
    wheelSec.classList.add("live", "w-" + WMODE);
    const wheelBox = $("#postsWheel");
    wres = document.createElement("p");
    wres.className = "wres";
    wcap.after(wres);
    if (WMODE === "marquee" && wheelBox) {
      // run-through marquee: two card sets separated by a fixed empty gap
      // (half the stage width), so the last card exits and card 1 re-enters
      // from the other side after a deliberate pause, never glued together.
      // The loop distance is exactly one set + one gap, so the restart
      // frame is identical to the start frame: no snap, no dead time.
      const gap = document.createElement("div");
      gap.className = "wloopgap";
      gap.setAttribute("aria-hidden", "true");
      wheelBox.append(gap);
      wheelItems.forEach((it) => wheelBox.append(it.cloneNode(true)));
      wheelBox.append(gap.cloneNode(true));
      const PX_PER_SEC = 44.35; // same travel speed as the old 46s loop
      const setLoop = () => {
        const g = Math.max(120, Math.round(wheelStage.clientWidth / 2));
        $$(".wloopgap", wheelBox).forEach((el) => (el.style.width = g + "px"));
        wheelBox.style.animationDuration =
          wheelBox.scrollWidth / 2 / PX_PER_SEC + "s";
      };
      setLoop();
      addEventListener("resize", setLoop);
    }
    const rt = root.dir === "rtl";
    const nav = document.createElement("div");
    nav.className = "wnav";
    const mkBtn = (dir, labelAr, labelEn) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "wbtn";
      b.setAttribute("aria-label", isAr ? labelAr : labelEn);
      b.textContent = dir < 0 ? "\u2039" : "\u203A";
      b.addEventListener("click", () => wheelTo(Math.round(wpos) + dir));
      return b;
    };
    nav.append(
      mkBtn(-1, "\u0627\u0644\u0644\u064A \u0642\u0628\u0644\u0647", "Previous post"),
      mkBtn(1, "\u0627\u0644\u0644\u064A \u0628\u0639\u062F\u0647", "Next post"),
    );
    if (WMODE !== "marquee") {
      wheelSec.append(nav);
      wheelSec.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          wheelTo(Math.round(wpos) + (rt ? 1 : -1));
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          wheelTo(Math.round(wpos) + (rt ? -1 : 1));
        }
      });
      let dragging = false,
        startX = 0,
        startPos = 0,
        moved = 0,
        dragTarget = 0,
        dragRaf = 0;
      const dragFollow = () => {
        wpos += (dragTarget - wpos) * 0.22;
        wheelLayout();
        dragRaf =
          dragging || Math.abs(dragTarget - wpos) > 0.002
            ? requestAnimationFrame(dragFollow)
            : 0;
      };
      wheelStage.addEventListener("pointerdown", (e) => {
        if (e.button > 0) return;
        dragging = true;
        moved = 0;
        startX = e.clientX;
        startPos = wpos;
        dragTarget = wpos;
        cancelAnimationFrame(wanim);
        try {
          wheelStage.setPointerCapture(e.pointerId);
        } catch (err) {}
        wheelStage.classList.add("dragging");
      });
      wheelStage.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        moved = Math.max(moved, Math.abs(dx));
        dragTarget = startPos - dx / Math.max(140, iw * 0.85);
        if (!dragRaf) dragRaf = requestAnimationFrame(dragFollow);
      });
      const endDrag = () => {
        if (!dragging) return;
        dragging = false;
        cancelAnimationFrame(dragRaf);
        dragRaf = 0;
        wheelStage.classList.remove("dragging");
        if (moved >= 6) wheelTo(Math.round(wpos + (dragTarget - wpos) * 0.4));
      };
      wheelStage.addEventListener("pointerup", endDrag);
      wheelStage.addEventListener("pointercancel", endDrag);
      wheelStage.addEventListener(
        "click",
        (e) => {
          if (moved >= 6) {
            e.preventDefault();
            e.stopPropagation();
            moved = 0;
          }
        },
        true,
      );
      wheelItems.forEach((it, i) =>
        it.addEventListener("focus", () => wheelTo(i)),
      );
    }
    wheelLayout();
  }

  onScroll();

  /* ---------- lightbox ---------- */
  const lb = $("#lb"),
    li = $("#lbi"),
    lc = $("#lbc");
  let set = [],
    idx = 0,
    last = null;
  function show(n) {
    idx = (n + set.length) % set.length;
    const b = set[idx],
      im = document.getElementById(b.dataset.src);
    li.src = im.src;
    li.alt = im.alt;
    lc.textContent = b.dataset.cap + "  (" + (idx + 1) + "/" + set.length + ")";
  }
  $$("[data-lb]").forEach((b) =>
    b.addEventListener("click", () => {
      set = $$("[data-lb]", b.closest("[data-set]"));
      last = b;
      show(set.indexOf(b));
      lb.showModal();
    }),
  );
  $("#pv").onclick = () => show(idx - 1);
  $("#nx").onclick = () => show(idx + 1);
  $("#cl").onclick = () => lb.close();
  lb.addEventListener("keydown", (e) => {
    const rt = root.dir === "rtl";
    if (e.key === "ArrowLeft") show(idx + (rt ? 1 : -1));
    if (e.key === "ArrowRight") show(idx + (rt ? -1 : 1));
  });
  lb.addEventListener("click", (e) => {
    if (e.target === lb) lb.close();
  });
  lb.addEventListener("close", () => last && last.focus());

  /* ---------- ranked chart bars ---------- */
  const chart = $(".chart");
  if (chart) {
    const cio = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            chart.classList.add("in");
            cio.unobserve(chart);
          }
        }),
      { threshold: 0.2 },
    );
    cio.observe(chart);
  }

  /* ---------- video (loads only on click) ---------- */
  const vid = $("#vid");
  if (vid) {
    vid.addEventListener("click", function () {
      const holder = this;
      if (holder.dataset.vheld !== "1") {
        /* Hard-stop the background music synchronously on the first tap,
           before the video starts; release it when the video ends. */
        holder.dataset.vheld = "1";
        holder.dataset.vmusic =
          typeof Jazz !== "undefined" && Jazz.videoHold
            ? Jazz.videoHold()
              ? "1"
              : ""
            : "";
        $$("audio")
          .filter((a) => !a.paused)
          .forEach((a) => a.pause());
      }
      const ROOT = document.documentElement.dataset.root || "";
      const v = document.createElement("video");
      v.src = ROOT + "assets/video/alx-interview.mp4?v=20261121";
      v.poster = ROOT + "assets/images/alx-interview-poster.jpg?v=20261121";
      v.title = this.dataset.title || "Video";
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      v.addEventListener("ended", () => {
        if (holder.dataset.vheld === "1") {
          holder.dataset.vheld = "";
          const was = holder.dataset.vmusic === "1";
          holder.dataset.vmusic = "";
          if (typeof Jazz !== "undefined" && Jazz.videoRelease)
            Jazz.videoRelease(was);
        }
      });
      this.replaceChildren(v);
      this.style.cursor = "default";
      if (window.innerWidth < 768) this.style.aspectRatio = "9 / 16";
      v.play().catch(() => {});
    });
  }

  /* ---------- intro video pop-up (hero portrait play button) ---------- */
  const introOpen = $("#introOpen");
  const introGate = $("#introgate");
  if (introOpen && introGate) {
    const ROOT = document.documentElement.dataset.root || "";
    const iv = $("video", introGate);
    const ivClose = $(".ivclose", introGate);
    /* Pick one rendition once (no double download): small screens or slow /
       data-saver connections get the 480x854 450kbps file, everything else
       the 720x1280 800kbps file. Served from the jsDelivr CDN (pinned to an
       immutable commit), falling back to the Pages copy if the CDN errors. */
    const IV_CDN =
      "https://cdn.jsdelivr.net/gh/malaamos12/Portofolio@8219f442602956e0453ee164c6101edaec61dc40/assets/video/";
    const ivConn = navigator.connection || {};
    const ivSlow =
      !!ivConn.saveData ||
      ivConn.effectiveType === "slow-2g" ||
      ivConn.effectiveType === "2g" ||
      ivConn.effectiveType === "3g";
    const ivSmall = Math.min(screen.width, screen.height) < 500;
    const ivRend = ivSlow || ivSmall ? "intro-mobile.mp4" : "intro.mp4";
    iv.src = IV_CDN + ivRend;
    iv.dataset.localSrc = ROOT + "assets/video/" + ivRend + "?v=20261128d";
    iv.addEventListener(
      "error",
      () => {
        if (iv.dataset.localSrc && iv.src !== iv.dataset.localSrc) {
          const t = iv.currentTime;
          iv.src = iv.dataset.localSrc;
          iv.dataset.localSrc = "";
          iv.load();
          try {
            iv.currentTime = t;
          } catch (e) {}
          if (!introGate.hidden) iv.play().catch(() => {});
        }
      },
      true,
    );
    iv.poster = ROOT + "assets/images/intro-poster.jpg?v=20261128d";
    let ivMusic = false;
    let ivAudio = [];
    /* Start buffering in the background once the page is idle, so the
       pop-up does not begin downloading from zero on click. Skipped when
       the user asked their browser to save data. */
    function armIntroPreload() {
      if (ivConn.saveData) return;
      iv.preload = "auto";
      iv.load();
    }
    if ("requestIdleCallback" in window)
      requestIdleCallback(armIntroPreload, { timeout: 4000 });
    else setTimeout(armIntroPreload, 2500);
    function ivBufferedAhead() {
      try {
        const t = iv.currentTime;
        for (let i = 0; i < iv.buffered.length; i++) {
          if (iv.buffered.start(i) <= t && t <= iv.buffered.end(i))
            return iv.buffered.end(i) - t;
        }
      } catch (e) {}
      return 0;
    }
    function openIntro() {
      ivMusic =
        typeof Jazz !== "undefined" && Jazz.videoHold ? Jazz.videoHold() : false;
      ivAudio = $$("audio").filter((a) => !a.paused);
      ivAudio.forEach((a) => a.pause());
      introGate.hidden = false;
      lock(true);
      iv.currentTime = 0;
      /* Synchronous play() inside the tap/click gesture: starts playback when
         buffered enough and, on mobile browsers, unlocks the element so the
         buffered retry below is allowed. */
      iv.play().catch(() => {});
      if (iv.readyState < 3 || ivBufferedAhead() < 3) {
        iv.pause();
        introGate.classList.add("ivloading");
        const t0 = Date.now();
        (function poll() {
          if (introGate.hidden) {
            introGate.classList.remove("ivloading");
            return;
          }
          if (
            (iv.readyState >= 3 && ivBufferedAhead() >= 3) ||
            Date.now() - t0 > 4000
          ) {
            introGate.classList.remove("ivloading");
            iv.play().catch(() => {});
            return;
          }
          setTimeout(poll, 100);
        })();
      }
      ivClose.focus();
    }
    function closeIntro() {
      iv.pause();
      introGate.hidden = true;
      lock(false);
      if (typeof Jazz !== "undefined" && Jazz.videoRelease)
        Jazz.videoRelease(ivMusic);
      ivAudio.forEach((a) => a.play().catch(() => {}));
      ivAudio = [];
      introOpen.focus();
    }
    introOpen.addEventListener("click", openIntro);
    ivClose.addEventListener("click", closeIntro);
    iv.addEventListener("ended", closeIntro);
    introGate.addEventListener("click", (e) => {
      if (e.target === introGate) closeIntro();
    });
    introGate.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeIntro();
        return;
      }
      if (e.key !== "Tab") return;
      const f = [iv, ivClose];
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && i === f.length - 1) {
        e.preventDefault();
        f[0].focus();
      }
    });
  }

})();
