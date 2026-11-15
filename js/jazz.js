/* ===== background music: soft jazz-style loop generated live with Web Audio (no audio file, no copyright).
   Drop an mp3 you have the rights to next to the pages, named music.mp3 (in assets/audio/, or next to the page), and it plays instead (auto-detected).
   Both pages share one music "session": the report continues the music instead of restarting it. ===== */
const Jazz = (function () {
  const ROOT = document.documentElement.dataset.root || "",
    FILES = [ROOT + "assets/audio/music.mp3", ROOT + "music.mp3"],
    KEY = "ma_music",
    BPM = 68,
    B = 60 / BPM,
    SW = 0.64,
    VOL = 0.4,
    FVOL = 0.4,
    ID = Math.random().toString(36).slice(2),
    AC = window.AudioContext || window.webkitAudioContext;
  let ctx = null,
    out = null,
    timer = null,
    next = 0,
    bar = 0,
    bar0 = 0,
    t0 = 0,
    lastN = 72,
    audio = null,
    mode = "",
    on = false,
    wantOn = true,
    held = false,
    hid = false,
    pend = null,
    bc = null,
    fadeT = null;
  try {
    bc = new BroadcastChannel("ma-music");
  } catch (e) {}
  const f = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const CH = [
    [50, 1, [53, 57, 60, 64], [62, 64, 65, 67, 69, 71, 72, 74, 76]],
    [43, 0, [53, 59, 62, 64], [62, 65, 67, 69, 71, 72, 74, 76, 77, 79]],
    [48, 0, [52, 55, 59, 62], [64, 67, 69, 71, 72, 74, 76, 79]],
    [45, 1, [55, 59, 60, 64], [64, 67, 69, 71, 72, 74, 76, 79]],
    [41, 0, [52, 57, 60, 64], [65, 67, 69, 71, 72, 74, 76, 77, 79]],
    [47, 1, [53, 57, 59, 62], [62, 64, 65, 67, 69, 71, 72, 74]],
    [40, 0, [50, 56, 59, 64], [64, 66, 68, 69, 71, 73, 74, 76]],
    [45, 1, [55, 59, 60, 64], [64, 67, 69, 71, 72, 74, 76, 79]],
  ];
  const PAT = [
    [
      [0.5, 0.9],
      [1.6, 0.7],
      [2.5, 1.3],
    ],
    [
      [0, 1.4],
      [1.5, 0.5],
      [2, 0.5],
      [2.67, 1.2],
    ],
    [
      [1, 1.8],
      [3, 0.8],
    ],
    [
      [0.67, 0.6],
      [1.33, 0.6],
      [2, 2],
    ],
    [
      [0, 0.8],
      [1, 0.8],
      [2, 1.8],
    ],
    [[1.5, 2.2]],
  ];
  function env(g, t, a, d, s, r, len, pk) {
    const e = t + Math.max(len, a + d);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(pk, t + a);
    g.gain.linearRampToValueAtTime(pk * s, t + a + d);
    g.gain.setValueAtTime(pk * s, e);
    g.gain.linearRampToValueAtTime(0.0001, e + r);
  }
  function NB(c) {
    if (!c._nb) {
      const n = c.sampleRate,
        b = c.createBuffer(1, n, n),
        d = b.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
      c._nb = b;
    }
    return c._nb;
  }
  function tick(c, o, t, fr, len, v, type) {
    const s = c.createBufferSource();
    s.buffer = NB(c);
    const bp = c.createBiquadFilter();
    bp.type = type;
    bp.frequency.value = fr;
    bp.Q.value = type === "bandpass" ? 1.1 : 0.7;
    const g = c.createGain();
    g.gain.setValueAtTime(v, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    s.connect(bp);
    bp.connect(g);
    g.connect(o);
    s.start(t, Math.random() * 0.5);
    s.stop(t + len + 0.02);
  }
  function key(c, o, t, m, len, v) {
    const a = c.createOscillator(),
      b = c.createOscillator(),
      lp = c.createBiquadFilter(),
      g = c.createGain();
    a.type = "triangle";
    b.type = "sine";
    a.frequency.value = f(m);
    b.frequency.value = f(m) * 2;
    lp.type = "lowpass";
    lp.frequency.value = 1700;
    env(g, t, 0.015, 0.5, 0.35, 0.5, len, v);
    a.connect(lp);
    b.connect(lp);
    lp.connect(g);
    g.connect(o);
    a.start(t);
    b.start(t);
    const e = t + len + 0.8;
    a.stop(e);
    b.stop(e);
  }
  function bass(c, o, t, m, len) {
    const a = c.createOscillator(),
      lp = c.createBiquadFilter(),
      g = c.createGain();
    a.type = "triangle";
    a.frequency.value = f(m);
    lp.type = "lowpass";
    lp.frequency.value = 520;
    env(g, t, 0.01, 0.12, 0.6, 0.12, len, 0.2);
    a.connect(lp);
    lp.connect(g);
    g.connect(o);
    a.start(t);
    a.stop(t + len + 0.3);
  }
  function sax(c, o, t, m, len, v) {
    const a = c.createOscillator(),
      b = c.createOscillator(),
      lp = c.createBiquadFilter(),
      g = c.createGain(),
      lfo = c.createOscillator(),
      lg = c.createGain(),
      m1 = c.createGain(),
      m2 = c.createGain();
    a.type = "sawtooth";
    b.type = "square";
    a.frequency.value = f(m);
    b.frequency.value = f(m);
    b.detune.value = 5;
    lfo.frequency.value = 5.2;
    lg.gain.setValueAtTime(0, t);
    lg.gain.linearRampToValueAtTime(7, t + 0.35);
    lfo.connect(lg);
    lg.connect(a.detune);
    lg.connect(b.detune);
    lp.type = "lowpass";
    lp.Q.value = 1.4;
    lp.frequency.setValueAtTime(700, t);
    lp.frequency.linearRampToValueAtTime(1700, t + 0.12);
    lp.frequency.linearRampToValueAtTime(1200, t + len);
    m1.gain.value = 0.6;
    m2.gain.value = 0.25;
    a.connect(m1);
    b.connect(m2);
    m1.connect(lp);
    m2.connect(lp);
    env(g, t, 0.06, 0.15, 0.8, 0.28, len, v);
    lp.connect(g);
    g.connect(o);
    tick(c, o, t, 2400, 0.2, v * 0.12, "bandpass");
    a.start(t);
    b.start(t);
    lfo.start(t);
    const e = t + len + 0.45;
    a.stop(e);
    b.stop(e);
    lfo.stop(e);
  }
  function nearest(sc, m) {
    let bi = 0;
    sc.forEach((x, i) => {
      if (Math.abs(x - m) < Math.abs(sc[bi] - m)) bi = i;
    });
    return bi;
  }
  function phrase(c, o, t0, ci) {
    if (Math.random() < 0.28) return;
    const sc = CH[ci][3],
      P = PAT[(Math.random() * PAT.length) | 0];
    let i = nearest(sc, lastN);
    P.forEach(([b, d]) => {
      i = Math.max(
        0,
        Math.min(
          sc.length - 1,
          i + [-2, -1, -1, 0, 1, 1, 2][(Math.random() * 7) | 0],
        ),
      );
      const m = sc[i];
      lastN = m;
      const bb = Math.round((b % 1) * 100) === 50 ? Math.floor(b) + SW : b;
      sax(c, o, t0 + bb * B, m, d * B, 0.085);
    });
  }
  function schedBar(c, o, t0, ci) {
    const [r, minor, comp] = CH[ci],
      nx = CH[(ci + 1) % 8][0],
      ap = nx > r ? nx - 1 : nx + 1;
    comp.forEach((m, i) => key(c, o, t0 + i * 0.012, m, B * 2.4, 0.045));
    if (Math.random() < 0.7)
      comp.forEach((m, i) =>
        key(c, o, t0 + (2 + SW) * B + i * 0.01, m, B * 1.2, 0.03),
      );
    [r, r + 7, r + (minor ? 3 : 4), ap].forEach((m, i) =>
      bass(c, o, t0 + i * B, m, B * 0.9),
    );
    for (let k = 0; k < 4; k++)
      tick(c, o, t0 + k * B, 6500, 0.3, 0.009, "highpass");
    [1, 3].forEach((k) => {
      tick(c, o, t0 + (k + SW) * B, 6500, 0.22, 0.006, "highpass");
      tick(c, o, t0 + k * B, 350, 0.09, 0.05, "lowpass");
    });
    phrase(c, o, t0, ci);
  }
  function build(c) {
    const master = c.createGain(),
      cm = c.createDynamicsCompressor(),
      vb = c.createConvolver(),
      wet = c.createGain(),
      bus = c.createGain(),
      n = Math.floor(2.6 * c.sampleRate),
      ir = c.createBuffer(2, n, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < n; i++)
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.4);
    }
    vb.buffer = ir;
    wet.gain.value = 0.3;
    bus.connect(master);
    bus.connect(vb);
    vb.connect(wet);
    wet.connect(master);
    master.connect(cm);
    cm.connect(c.destination);
    return { master, bus };
  }
  function pump() {
    while (ctx && out && next < ctx.currentTime + 1.6) {
      schedBar(ctx, out.bus, next, bar % 8);
      bar++;
      next += 4 * B;
    }
  }
  /* ---- shared state across the two pages ---- */
  function save() {
    try {
      let pos = 0;
      if (mode === "file" && audio) pos = audio.currentTime;
      else if (mode === "gen" && ctx)
        pos = bar0 * 4 * B + Math.max(0, ctx.currentTime - t0);
      localStorage.setItem(
        KEY,
        JSON.stringify({ on: wantOn, pos, mode, at: Date.now() }),
      );
    } catch (e) {}
  }
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "null");
      return s && Date.now() - s.at < 7200000 ? s : null;
    } catch (e) {
      return null;
    }
  }
  function ui() {
    const b = document.getElementById("musicBtn");
    if (!b) return;
    b.classList.toggle("playing", on);
    b.classList.toggle("wait", wantOn && !on && !held);
    b.setAttribute("aria-pressed", on);
    const ar = document.documentElement.lang === "ar",
      l = ar
        ? on
          ? "إيقاف الموسيقى"
          : "تشغيل الموسيقى"
        : on
          ? "Mute music"
          : "Play music";
    b.setAttribute("aria-label", l);
    b.title = l;
  }
  function say(t) {
    try {
      bc && bc.postMessage({ t, id: ID });
    } catch (e) {}
  }
  function armGesture(fn) {
    if (pend) return;
    const h = () => {
      ["pointerdown", "keydown", "touchend"].forEach((e) =>
        removeEventListener(e, h, true),
      );
      pend = null;
      fn();
    };
    pend = h;
    ["pointerdown", "keydown", "touchend"].forEach((e) =>
      addEventListener(e, h, { capture: true, passive: true }),
    );
  }
  function fadeA(to, ms, done) {
    if (!audio) return;
    clearInterval(fadeT);
    const a = audio,
      st = (to - a.volume) / (ms / 60);
    fadeT = setInterval(() => {
      const v = a.volume + st;
      if ((st >= 0 && v >= to) || (st < 0 && v <= to)) {
        a.volume = Math.max(0, Math.min(1, to));
        clearInterval(fadeT);
        done && done();
      } else a.volume = Math.max(0, Math.min(1, v));
    }, 60);
  }
  function fadeG(to, sec) {
    if (!ctx || !out) return;
    const g = out.master.gain,
      t = ctx.currentTime;
    g.cancelScheduledValues(t);
    g.setValueAtTime(g.value, t);
    g.linearRampToValueAtTime(to, t + sec);
  }
  function startGen(pos) {
    if (!ctx) ctx = new AC();
    mode = "gen";
    out = build(ctx);
    out.master.gain.setValueAtTime(0, ctx.currentTime);
    out.master.gain.linearRampToValueAtTime(VOL, ctx.currentTime + 4);
    bar0 = pos ? Math.ceil(pos / (4 * B)) : 0;
    bar = bar0;
    t0 = ctx.currentTime + 0.25;
    next = t0;
    pump();
    clearInterval(timer);
    timer = setInterval(pump, 300);
    ctx.onstatechange = () => {
      on = ctx.state === "running" && !held && wantOn;
      ui();
    };
    if (ctx.state === "suspended") {
      armGesture(() => {
        ctx.resume();
      });
    } else {
      on = true;
      say("take");
    }
    ui();
  }
  function begin(pos, user, i) {
    i = i || 0;
    if (i >= FILES.length) {
      startGen(pos);
      return;
    }
    const a = new Audio(FILES[i]);
    a.loop = true;
    a.volume = 0;
    a.addEventListener(
      "loadedmetadata",
      () => {
        if (pos && a.duration && isFinite(a.duration))
          try {
            a.currentTime = pos % a.duration;
          } catch (e) {}
      },
      { once: true },
    );
    const p = a.play();
    if (!p || !p.then) {
      startGen(pos);
      return;
    }
    p.then(() => {
      audio = a;
      mode = "file";
      if (ctx) {
        try {
          ctx.close();
        } catch (e) {}
        ctx = null;
      }
      on = true;
      fadeA(FVOL, 3000);
      say("take");
      ui();
      save();
    }).catch((err) => {
      if (err && err.name === "NotAllowedError") {
        armGesture(() => start(true));
        ui();
      } else {
        begin(pos, user, i + 1);
      }
    });
  }
  function start(user) {
    if (on) return;
    const st = load();
    wantOn = st ? st.on !== false : true;
    if (!wantOn) {
      ui();
      return;
    }
    if (user && !ctx && AC) {
      try {
        ctx = new AC();
        ctx.resume();
      } catch (e) {}
    }
    begin(st && st.on ? st.pos + (Date.now() - st.at) / 1000 : 0, user);
  }
  function pauseQuiet() {
    if (mode === "file" && audio) {
      fadeA(0, 500, () => audio.pause());
    } else if (ctx && out) {
      fadeG(0, 0.5);
      setTimeout(() => {
        if (!on) ctx.suspend();
      }, 650);
    }
  }
  function resumeQuiet() {
    if (mode === "file" && audio) {
      audio.play();
      fadeA(FVOL, 1500);
    } else if (ctx) {
      ctx.resume();
      fadeG(VOL, 1.2);
    }
  }
  function toggle() {
    if (on) {
      wantOn = false;
      on = false;
      pauseQuiet();
      save();
      say("release");
      ui();
      return;
    }
    wantOn = true;
    held = false;
    if (!ctx && !audio) {
      start(true);
      return;
    }
    on = true;
    resumeQuiet();
    say("take");
    save();
    ui();
  }
  if (bc)
    bc.onmessage = (e) => {
      const m = e.data || {};
      if (m.id === ID) return;
      if (m.t === "take" && on) {
        on = false;
        held = true;
        pauseQuiet();
        ui();
      } else if (m.t === "release" && held && wantOn) {
        held = false;
        on = true;
        resumeQuiet();
        ui();
      }
    };
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      save();
      if (on) {
        hid = true;
        on = false;
        if (mode === "file" && audio) audio.pause();
        else if (ctx) ctx.suspend();
        ui();
      }
    } else if (hid) {
      hid = false;
      if (wantOn && !held) {
        on = true;
        resumeQuiet();
        ui();
      }
    }
  });
  addEventListener("pagehide", () => {
    save();
    if (on || hid) say("release");
  });
  addEventListener("pageshow", (e) => {
    if (e.persisted && wantOn && !on && !held) {
      start(false);
    }
  });
  setInterval(() => {
    if (on) save();
  }, 2000);
  const btn = document.getElementById("musicBtn");
  if (btn) btn.addEventListener("click", toggle);
  return {
    start,
    ui,
    init: () => start(false),
    dbg: () => ({
      mode,
      on,
      wantOn,
      held,
      bar0,
      ct: ctx ? +ctx.currentTime.toFixed(2) : null,
      state: ctx ? ctx.state : null,
      hasAudio: !!audio,
    }),
    _render: (sec) => {
      const c = new OfflineAudioContext(2, Math.floor(44100 * sec), 44100),
        o = build(c);
      o.master.gain.value = VOL;
      for (let b = 0; b * 4 * B < sec; b++)
        schedBar(c, o.bus, b * 4 * B + 0.05, b % 8);
      return c.startRendering();
    },
  };
})();
