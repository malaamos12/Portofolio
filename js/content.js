/* Content renderer.
   Reads window.SITE_CONTENT (js/content/en.js or js/content/ar.js) and fills
   the page: texts, images, links, list sections and section order. Loaded
   before js/main.js, which then wires up interactions on the rendered DOM.
   See docs/CONTENT.md. */
(function () {
  "use strict";
  const C = window.SITE_CONTENT;
  if (!C) return;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  const esc = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const get = (path) =>
    path.split(".").reduce((o, k) => (o == null ? o : o[k]), C);
  const ROOT = document.documentElement.dataset.root || "";

  /* ---------- meta ---------- */
  if (C.meta) {
    document.title = C.meta.title;
    const md = $('meta[name="description"]');
    if (md) md.setAttribute("content", C.meta.description);
  }

  /* ---------- simple text / html injection ---------- */
  $$("[data-k]").forEach((e) => {
    const v = get(e.dataset.k);
    if (v != null) e.textContent = v;
  });
  $$("[data-kh]").forEach((e) => {
    const v = get(e.dataset.kh);
    if (v != null) e.innerHTML = v;
  });
  $$("[data-attr-alt]").forEach((e) => {
    const v = get(e.getAttribute("data-attr-alt"));
    if (v != null) e.setAttribute("alt", v);
  });
  $$("[data-attr-data-title]").forEach((e) => {
    const v = get(e.getAttribute("data-attr-data-title"));
    if (v != null) e.dataset.title = v;
  });
  $$("[data-href]").forEach((e) => {
    const v = get(e.dataset.href);
    if (v != null) e.setAttribute("href", v);
  });

  /* ---------- icons ---------- */
  const ICONS = {
    target:
      '<circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="11"/><circle cx="24" cy="24" r="3.5"/><path d="M24 24 L41 7 M33 7 h8 v8"/>',
    content: '<rect height="30" rx="5" width="38" x="5" y="9"/><path d="M20 17 L33 24 L20 31 Z"/>',
    ads: '<path d="M7 19 v10 h9 l19 10 V9 L16 19 Z"/><path d="M16 29 l3 11"/><path d="M40 18 q3 6 0 12"/>',
    track: '<path d="M6 41 V7"/><path d="M6 41 H43"/><path d="M11 33 l10 -11 8 6 14 -17"/>',
    training:
      '<circle cx="16" cy="15" r="6"/><circle cx="34" cy="17" r="5"/><path d="M5 39 c0 -9 6 -13 11 -13 s11 4 11 13"/><path d="M30 28 c6 0 13 3 13 11"/>',
    identity:
      '<circle cx="24" cy="24" r="18"/><path d="M24 13 l3.2 6.6 7.3 1 -5.3 5.1 1.3 7.2 -6.2 -3.4 -6.2 3.4 1.3 -7.2 -5.3 -5.1 7.3 -1 Z"/>',
    design: '<path d="M30 8 L40 18 L18 40 L8 40 L8 30 Z"/><path d="M27 11 L37 21"/>',
    creator:
      '<rect x="7" y="9" width="34" height="24" rx="5"/><path d="M15 17 h18 M15 23 h12"/><path d="M20 33 l-4 7 8 -3"/>',
    photo:
      '<rect x="6" y="14" width="36" height="26" rx="5"/><circle cx="24" cy="27" r="8"/><path d="M16 14 l3 -5 h10 l3 5"/>',
  };
  const icon = (name) =>
    '<svg aria-hidden="true" class="ico" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" viewBox="0 0 48 48">' +
    (ICONS[name] || ICONS.target) +
    "</svg>";

  /* ---------- how ---------- */
  const howSteps = $("#howSteps");
  if (howSteps)
    C.how.steps.forEach((s) => {
      const d = el("div", "pr");
      d.append(el("span", "no", esc(s.n)), el("h3", null, esc(s.t)), el("p", null, esc(s.d)));
      howSteps.append(d);
    });

  /* ---------- metrics ---------- */
  const mRow = $("#metricsRow");
  if (mRow)
    C.metrics.items.forEach((m) => {
      const d = el("div", "m");
      const b = el("b", null, esc(m.count + m.suf));
      b.dataset.count = m.count;
      b.dataset.dec = m.dec;
      b.dataset.suf = m.suf;
      d.append(b, el("span", null, esc(m.label)));
      mRow.append(d);
    });

  /* ---------- services ---------- */
  const svcGrid = $("#svcGrid");
  if (svcGrid)
    C.services.items.forEach((s) => {
      const d = el("div", "svc");
      d.innerHTML = icon(s.icon);
      d.append(
        el("h3", null, s.t),
        el("p", null, esc(s.d)),
        el("span", "who " + (s.who === "team" ? "tm" : "me"), esc(s.whoLabel))
      );
      svcGrid.append(d);
    });

  /* ---------- projects ---------- */
  const projWrap = $("#projects");
  const adsImg = (id) => ROOT + "assets/images/ads-" + id.replace("i-mb", "") + ".jpg";
  const usedProof = {};
  if (projWrap)
    C.projects.forEach((p, pi) => {
      const art = el("article", "proj");
      art.id = p.id;
      const wrap = el("div", "wrap");
      const head = el("div", "head");
      const txt = el("div", "txt");
      txt.append(
        el("p", "eyebrow", C.shared.caseLabel + " " + String(pi + 1).padStart(2, "0") + " · " + p.eyebrow),
        el("h3", null, esc(p.title)),
        el("p", "plain", esc(p.plain))
      );
      const cover = el("div", "cover");
      const img = el("img");
      img.alt = p.cover.alt;
      img.loading = "lazy";
      img.src = ROOT + p.cover.src;
      img.setAttribute("data-px", "");
      cover.append(img, el("span", "chip", esc(p.cover.chip)));
      head.append(txt, cover);
      const det = el("details", "data");
      det.setAttribute("data-set", "");
      det.open = true;
      const sum = el("summary");
      sum.append(el("span", null, esc(C.shared.runsSummary)));
      const inner = el("div", "inner");
      if (p.guide) inner.append(el("p", "guide", C.shared.guideHtml));
      if (p.note) inner.append(el("p", "note", esc(p.note)));
      const runs = el("div", "runs");
      p.runs.forEach((r) => {
        const card = el("article", "run");
        const top = el("div", "run-top");
        top.append(el("span", "tag", esc(r.tag)));
        card.append(top, el("h4", null, r.title));
        const hero = el("div", "hero-n");
        hero.append(el("b", null, esc(r.heroN)), el("span", null, esc(r.heroL)));
        card.append(hero);
        const each = el("p", "each");
        each.append(el("b", null, esc(r.eachV)), document.createTextNode(" "), el("span", null, esc(r.eachL)));
        card.append(each);
        const dl = el("dl", "mini");
        r.mini.forEach(([dt, dd]) => {
          const dv = el("div");
          dv.append(el("dt", null, esc(dt)), el("dd", null, esc(dd)));
          dl.append(dv);
        });
        card.append(dl);
        if (r.proof) {
          usedProof[r.proof.src] = true;
          const b = el("button", "proof");
          b.type = "button";
          b.dataset.cap = r.proof.cap;
          b.setAttribute("data-lb", "");
          b.dataset.src = r.proof.src;
          const pi = el("img");
          pi.alt = r.proof.cap;
          pi.id = r.proof.src;
          pi.loading = "lazy";
          pi.src = adsImg(r.proof.src);
          b.append(pi, el("span", null, esc(C.shared.viewShot)));
          card.append(b);
        } else if (r.report) {
          const a = el("a", "proof");
          a.setAttribute("data-report", "");
          a.href = ROOT + "campaign_report.html?lang=" + C.lang;
          a.append(el("span", null, esc(C.shared.reportLink)));
          card.append(a);
        } else if (r.exp) {
          card.append(el("p", "exp", esc(r.exp)));
        }
        runs.append(card);
      });
      inner.append(runs);
      det.append(sum, inner);
      const story = el("div", "story");
      [
        [C.shared.storyGoal, p.goal],
        [C.shared.storyDid, p.did],
        [C.shared.storyResult, p.pres],
      ].forEach(([lb, v], i) => {
        const st = el("div", i === 2 ? "st res" : "st");
        st.append(el("b", null, esc(lb)), el("p", null, esc(v)));
        story.append(st);
      });
      const band = el("div", "casestats");
      p.kpis.forEach(([v, l]) => {
        const k = el("div", "cstat");
        k.append(el("b", null, esc(v)), el("span", null, esc(l)));
        band.append(k);
      });
      wrap.append(head, story, band, det);
      art.append(wrap);
      projWrap.append(art);
    });

  /* ---------- compare ---------- */
  const chart = $("#compareChart");
  if (chart && C.compare) {
    C.compare.rows.forEach((r) => {
      const b = el("button", "row");
      b.type = "button";
      b.dataset.cap = r.cap;
      b.setAttribute("data-lb", "");
      b.dataset.src = r.src;
      const lab = el("span", "lab");
      lab.append(el("span", "nm", esc(r.name)), el("small", null, esc(r.small)));
      const track = el("span", "track");
      const fill = el("span", "fill");
      fill.style.setProperty("--w", r.w + "%");
      track.append(fill);
      b.append(lab, track, el("span", "v", esc(r.v)));
      chart.append(b);
    });
    const store = $("#compareStore");
    if (store)
      C.compare.rows.forEach((r) => {
        if (usedProof[r.src]) return;
        usedProof[r.src] = true;
        const im = el("img");
        im.alt = r.cap;
        im.id = r.src;
        im.loading = "lazy";
        im.src = adsImg(r.src);
        store.append(im);
      });
  }

  /* ---------- posts wheel ---------- */
  const wheel = $("#postsWheel");
  if (wheel && C.posts) {
    wheel.closest(".wheelsec").style.setProperty("--n", C.posts.items.length);
    C.posts.items.forEach((p) => {
      const b = el("button", "wi");
      b.type = "button";
      b.dataset.cap = p.cap;
      b.setAttribute("data-lb", "");
      b.dataset.src = p.id;
      const im = el("img");
      im.alt = p.alt;
      im.id = p.id;
      im.loading = "lazy";
      im.src = ROOT + p.src;
      b.append(im);
      if (p.res) b.append(el("span", "wi-res", p.res));
      wheel.append(b);
    });
  }

  /* ---------- calculator ---------- */
  const calcBox = $("#calcBox");
  if (calcBox && C.calc) buildCalc(calcBox, C.calc);

  function buildCalc(box, K) {
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cl = el("div", "cl");
    cl.append(
      el("p", "eyebrow", esc(K.eyebrow)),
      el("h2", null, esc(K.title)),
      el("p", "sub-lead", esc(K.sub)),
      el("p", "note", esc(K.note))
    );
    const cr = el("div", "cr");
    const inputs = el("div", "inputs");
    const sel = (id, label, opts) => {
      const f = el("div", "f");
      const l = el("label", null, esc(label));
      l.htmlFor = id;
      const s = el("select");
      s.id = id;
      opts.forEach((o) => {
        const op = el("option", null, esc(o.label));
        op.value = o.id;
        s.append(op);
      });
      f.append(l, s);
      return f;
    };
    const inp = (id, label, val) => {
      const f = el("div", "f");
      const l = el("label", null, esc(label));
      l.htmlFor = id;
      const i = el("input");
      i.id = id;
      i.inputMode = "numeric";
      i.type = "text";
      i.value = val;
      f.append(l, i);
      return f;
    };
    inputs.append(
      sel("c-ind", K.fields.industry, K.industries),
      sel("c-cty", K.fields.country, K.countries),
      sel("c-obj", K.fields.objective, K.objectives),
      inp("c-b", K.fields.budget, "10000"),
      inp("c-v", K.fields.price, "2000")
    );
    const ass = el("div", "assumps");
    const out = el("div", "out");
    out.setAttribute("aria-live", "polite");
    const cells = {};
    [
      ["results", K.out.results],
      ["cust", K.out.cust],
      ["rev", K.out.rev],
      ["cpa", K.out.cpa],
      ["roas", K.out.roas],
    ].forEach(([k, label]) => {
      const d = el("div");
      const b = el("b", null, "0");
      const sp = el("span", null, esc(label));
      d.append(b, sp);
      out.append(d);
      cells[k] = { b, sp, label };
    });
    cr.append(inputs, ass, out);
    box.append(cl, cr);

    const num = (elm) => {
      const n = parseFloat(String(elm.value).replace(/[^\d.]/g, ""));
      return isFinite(n) ? n : 0;
    };
    const fmt = (n, d = 0) =>
      n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
    const cur = { results: 0, cust: 0, rev: 0, cpa: 0, roas: 0 };
    function tween(k, to, d, suffix) {
      const from = cur[k];
      cur[k] = to;
      const render = (v) => (cells[k].b.textContent = fmt(v, d) + (suffix || ""));
      if (rm) return render(to);
      const t0 = performance.now();
      (function s(t) {
        const p = Math.min((t - t0) / 600, 1),
          e = 1 - Math.pow(1 - p, 3);
        render(from + (to - from) * e);
        if (p < 1) requestAnimationFrame(s);
      })(t0);
    }
    function run() {
      const ind = K.industries.find((i) => i.id === $("#c-ind").value) || K.industries[0];
      const cty = K.countries.find((c) => c.id === $("#c-cty").value) || K.countries[0];
      const obj = $("#c-obj").value;
      const budget = num($("#c-b"));
      const price = num($("#c-v"));
      const mult = cty.cpm / K.countries[0].cpm; // vs Egypt for chats
      let costLo, costHi, convLo, convHi, costLabel, convLabel, resLabel;
      if (obj === "lead") {
        const um = cty.cpm / K.usCpm; // vs US for form leads
        costLo = ind.usCpl * K.egpPerUsd * um * 0.7;
        costHi = ind.usCpl * K.egpPerUsd * um * 1.4;
        convLo = ind.conv[0] * 2;
        convHi = Math.min(25, ind.conv[1] * 2);
        costLabel = K.costPerLead;
        convLabel = K.leadConvLabel;
        resLabel = K.out.resultsLead;
      } else {
        costLo = ind.chat[0] * mult;
        costHi = ind.chat[1] * mult;
        convLo = ind.conv[0];
        convHi = ind.conv[1];
        costLabel = K.costPerChat;
        convLabel = K.convLabel;
        resLabel = K.out.results;
      }
      const cost = (costLo + costHi) / 2;
      const conv = (convLo + convHi) / 2;
      const results = cost > 0 ? budget / cost : 0;
      const cust = (results * conv) / 100;
      const rev = cust * price;
      const cpa = cust > 0 ? budget / cust : 0;
      const roas = budget > 0 ? rev / budget : 0;
      cells.results.sp.textContent = resLabel;
      ass.innerHTML = "";
      const mk = (t) => ass.append(el("span", "chip2", esc(t)));
      const r2 = (v) => (v >= 100 ? fmt(v, 0) : fmt(v, 1));
      mk(K.assumed);
      mk(costLabel + ": EGP " + r2(cost) + " (" + K.range + " " + r2(costLo) + "–" + r2(costHi) + ")");
      mk(convLabel + ": " + fmt(conv, conv < 10 ? 1 : 0) + "%");
      tween("results", results, 0);
      tween("cust", cust, cust < 10 ? 1 : 0);
      tween("rev", rev, 0);
      tween("cpa", cpa, 0);
      tween("roas", roas, 1, "×");
    }
    ["c-ind", "c-cty", "c-obj", "c-b", "c-v"].forEach((id) =>
      $("#" + id).addEventListener("input", run)
    );
    run();
  }

  /* ---------- mentor ---------- */
  const mStats = $("#mentorStats");
  if (mStats)
    C.mentor.stats.forEach((m) => {
      const d = el("div", "m");
      const b = el("b", null, esc(m.count + m.suf));
      b.dataset.count = m.count;
      b.dataset.dec = 0;
      b.dataset.suf = m.suf;
      d.append(b, el("span", null, esc(m.label)));
      mStats.append(d);
    });
  const decks = $("#mentorDecks");
  if (decks)
    C.mentor.decks.forEach((dk) => {
      const d = el("div", "deck");
      d.append(el("span", "tag", esc(dk.tag)), el("h3", null, esc(dk.title)));
      const ul = el("ul");
      dk.items.forEach((i) => ul.append(el("li", null, esc(i))));
      d.append(ul);
      decks.append(d);
    });

  /* ---------- music ---------- */
  const muWrap = $("#musicItems");
  if (muWrap)
    C.music.items.forEach((m) => {
      const d = el("div", "mu");
      d.append(el("h3", null, esc(m.t)), el("p", null, esc(m.d)));
      muWrap.append(d);
    });

  /* ---------- skills ---------- */
  const skWrap = $("#skillsGrid");
  if (skWrap)
    C.skills.groups.forEach((g) => {
      const d = el("div", "sk");
      d.append(el("h3", null, esc(g.t)));
      const ul = el("ul", "chips");
      g.chips.forEach((c) => ul.append(el("li", null, esc(c))));
      d.append(ul);
      skWrap.append(d);
    });

  /* ---------- experience ---------- */
  const tl = $("#expTimeline");
  if (tl)
    C.experience.items.forEach((x) => {
      const d = el("div");
      const t = el("time", null, esc(x.time));
      const sp = el("span", null, esc(x.role));
      sp.append(el("small", null, esc(x.org)));
      d.append(t, sp);
      tl.append(d);
    });

  /* ---------- testimonials ---------- */
  const quoteGrid = $("#quoteGrid");
  if (quoteGrid && C.testimonials)
    C.testimonials.quotes.forEach((q) => {
      const d = el("div", "svc");
      if (q.img) {
        const im = el("img", "tq-img");
        im.src = ROOT + q.img.src;
        im.alt = q.img.alt || "";
        im.loading = "lazy";
        d.append(im);
      }
      d.append(
        el("p", "q", "\u201C" + q.q + "\u201D"),
        el("h3", null, q.name),
        el("span", "who " + (q.cls || "tm"), q.tag)
      );
      quoteGrid.append(d);
    });

  /* ---------- certificates ---------- */
  const certGrid = $("#certGrid");
  if (certGrid && C.certsec) {
    C.certsec.images.forEach((c) => {
      const d = el("div", "svc");
      const im = el("img", "tq-img");
      im.src = ROOT + c.src;
      im.alt = c.alt || "";
      im.loading = "lazy";
      d.append(im, el("h3", null, c.name), el("span", "who tm", c.tag));
      certGrid.append(d);
    });
    const certChips = $("#certChips");
    if (certChips && C.certsec.chips)
      C.certsec.chips.forEach((c) => {
        certChips.append(el("span", "cert", c.t + " \u00B7 " + c.org + (c.y ? ", " + c.y : "")));
      });
  }

  /* ---------- section order ---------- */
  if (C.order) {
    const main = $("main");
    const sections = {};
    $$("[data-section]", main).forEach((s) => (sections[s.dataset.section] = s));
    let prev = null;
    C.order.forEach((id) => {
      const s = sections[id];
      if (!s) return;
      if (prev) {
        if (prev.nextSibling !== s) main.insertBefore(s, prev.nextSibling);
      } else if (main.firstElementChild !== s) main.insertBefore(s, main.firstElementChild);
      prev = s;
    });
  }
})();
