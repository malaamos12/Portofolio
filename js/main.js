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
      v.toLocaleString("en-US", {
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
  const wheelItems = wheelSec ? $$(".wi", wheelSec) : [];
  const wcap = $("#wcap");
  let live = false;

  function wheelLayout() {
    const vw = innerWidth,
      vh = innerHeight,
      N = wheelItems.length;
    const r = wheelSec.getBoundingClientRect();
    const total = wheelSec.offsetHeight - vh;
    const f = clamp(-r.top / total, 0, 1) * (N - 1);
    const R = Math.max(vw * 0.9, vh * 1.1, 640);
    const step = vw < 700 ? 20 : 17;
    const iw = Math.round(clamp(vw * 0.26, 210, 360));
    const cx = vw / 2,
      cy = vh * 0.56 + R;
    wheelItems.forEach((it, i) => {
      const d = i - f,
        ad = Math.abs(d),
        th = d * step,
        rad = (th * Math.PI) / 180;
      const x = cx + R * Math.sin(rad),
        y = cy - R * Math.cos(rad);
      it.style.width = iw + "px";
      it.style.transform =
        "translate(" +
        x +
        "px," +
        y +
        "px) translate(-50%,-50%) rotate(" +
        th +
        "deg) scale(" +
        (1 - Math.min(ad, 2) * 0.07) +
        ")";
      it.style.opacity = Math.max(0, 1 - ad * 0.3);
      it.style.zIndex = 50 - Math.round(ad * 10);
      it.style.pointerEvents = ad < 2.2 ? "auto" : "none";
    });
    wcap.textContent = wheelItems[Math.round(f)].getAttribute("data-cap");
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
    if (live) wheelLayout();
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
  addEventListener("resize", onScroll);
  if (wheelSec && !rm) {
    live = true;
    wheelSec.classList.add("live");
    wheelItems.forEach((it, i) =>
      it.addEventListener("focus", () => {
        const total = wheelSec.offsetHeight - innerHeight;
        const top = wheelSec.getBoundingClientRect().top + scrollY;
        scrollTo({
          top: top + (i / (wheelItems.length - 1)) * total + 1,
          behavior: "auto",
        });
      }),
    );
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
      const ROOT = document.documentElement.dataset.root || "";
      const v = document.createElement("video");
      v.src = ROOT + "assets/video/alx-interview.mp4?v=20261121";
      v.poster = ROOT + "assets/images/alx-interview-poster.jpg?v=20261121";
      v.title = this.dataset.title || "Video";
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      this.replaceChildren(v);
      this.style.cursor = "default";
      if (window.innerWidth < 768) this.style.aspectRatio = "9 / 16";
      v.play().catch(() => {});
    });
  }

})();
