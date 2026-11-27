/* Aggregate visit + calculator analytics (PostHog, US cloud).
   - No cookies, no session replay, no autocapture, no person profiles.
   - Visitor id lives in sessionStorage only, so it resets when the tab closes.
   - Own visits: open the site once with ?notrack=1 to exclude this browser
     (?track=1 turns it back on).
   GoatCounter keeps running separately. */
(function () {
  "use strict";
  var KEY = "phc_qLmboB8QBtGu9nRg9CzbdUgTarw7YHr92CS3PvQFT4bi";
  var HOST = "https://us.i.posthog.com/i/v0/e/";
  var q = new URLSearchParams(location.search);
  try {
    if (q.get("notrack") === "1") localStorage.setItem("ph_ignore", "1");
    if (q.get("track") === "1") localStorage.removeItem("ph_ignore");
    if (localStorage.getItem("ph_ignore") === "1") return;
  } catch (e) {}
  var debug = q.get("phdebug") === "1";
  var local = /^(localhost|127\.|\[::1\]|$)/.test(location.hostname);
  if (local && !debug) return;
  if (navigator.doNotTrack === "1") return;

  var sid;
  try {
    sid = sessionStorage.getItem("ph_sid");
    if (!sid) {
      sid = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));
      sessionStorage.setItem("ph_sid", sid);
    }
  } catch (e) {
    sid = String(Date.now()) + Math.random().toString(16).slice(2);
  }

  function base() {
    var ref = document.referrer, rd = "";
    try { rd = ref ? new URL(ref).hostname : ""; } catch (e) {}
    if (rd === location.hostname) { ref = ""; rd = ""; }
    return {
      $current_url: location.origin + location.pathname,
      $pathname: location.pathname,
      $host: location.host,
      $referrer: ref || "$direct",
      $referring_domain: rd || "$direct",
      $raw_user_agent: navigator.userAgent,
      $screen_width: screen.width,
      $viewport_width: innerWidth,
      $session_id: sid,
      $process_person_profile: false,
      site_lang: document.documentElement.lang || "",
      test_traffic: debug || undefined
    };
  }
  function send(event, props) {
    var p = base();
    for (var k in props) p[k] = props[k];
    var body = JSON.stringify({ api_key: KEY, event: event, distinct_id: sid, properties: p, timestamp: new Date().toISOString() });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(HOST, new Blob([body], { type: "text/plain" }))) return;
    } catch (e) {}
    try { fetch(HOST, { method: "POST", body: body, keepalive: true, headers: { "Content-Type": "text/plain" } }); } catch (e) {}
  }

  send("$pageview", {});

  /* Button clicks: same names GoatCounter uses (data-goatcounter-click). Kept apart from pageviews. */
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-goatcounter-click]") : null;
    if (t) send("button_click", { button: t.getAttribute("data-goatcounter-click") });
  }, true);

  /* Calculator */
  var seen = false, first = false, timer;
  var ids = { industry: "c-ind", country: "c-cty", objective: "c-obj", budget: "c-b", price: "c-v" };
  function val(id) { var el = document.getElementById(id); return el ? el.value : ""; }
  function label(id) {
    var el = document.getElementById(id);
    return el && el.options ? el.options[el.selectedIndex].text : el ? el.value : "";
  }
  function inputs() {
    return {
      industry: val(ids.industry), industry_label: label(ids.industry),
      country: val(ids.country), country_label: label(ids.country),
      objective: val(ids.objective),
      budget: parseFloat(String(val(ids.budget)).replace(/[^\d.]/g, "")) || 0,
      price: parseFloat(String(val(ids.price)).replace(/[^\d.]/g, "")) || 0
    };
  }
  function outputs() {
    var out = document.querySelectorAll("#calcBox .out > div b");
    var keys = ["results", "customers", "revenue", "cost_per_customer", "roas", "roi"], o = {};
    for (var i = 0; i < out.length && i < keys.length; i++) o["out_" + keys[i]] = out[i].textContent;
    return o;
  }
  function init() {
    var box = document.getElementById("calcBox");
    if (!box) return;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es, ob) {
        if (es[0].isIntersecting && !seen) { seen = true; send("calc_viewed", {}); ob.disconnect(); }
      }, { threshold: 0.35 }).observe(box);
    }
    box.addEventListener("input", function (e) {
      var field = "";
      for (var k in ids) if (ids[k] === e.target.id) field = k;
      if (!field) return;
      if (!first) { first = true; send("calc_started", { field: field }); }
      clearTimeout(timer);
      timer = setTimeout(function () {
        var p = inputs();
        for (var k2 in p) p[k2] = p[k2];
        var o = outputs();
        for (var k3 in o) p[k3] = o[k3];
        p.last_field_changed = field;
        send("calc_calculated", p);
      }, 1200);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
