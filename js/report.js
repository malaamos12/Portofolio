const L = {
  en: {
    back: "← Portfolio",
    dl: "Download PDF",
    eyebrow: "Meta Ads Manager export · 1 Nov 2024 – 10 Nov 2026",
    h1: "Campaign performance <em>report</em>",
    sub: "51 ad records across 34 campaign names, from the trainers’ ad account.",
    k1: "Total spend (EGP)",
    k2: "Chats started with customers",
    k3: "Post interactions (likes, comments, shares)",
    k4: "Ad-level reach (summed, not unique people)",
    k5: "Tracked sales + commission (EGP)",
    k6: "ROAS on tracked sales and commission",
    knote: "ROAS = 922,000 EGP tracked sales and commission ÷ 25,877 EGP ad spend (trainers’ account export 23,129 + real-estate campaigns 2,748). Sales are client-reported; spend is from Ads Manager.",
    e1: "Best value",
    h2a: "Cheapest chats",
    s1: "Ads that started 10 or more chats, ranked by cost per chat. Lower is better.",
    e2: "Budget",
    h2b: "Where the money went",
    s2: "Grouped by trainer. Names are hidden — ads without a trainer sit in their own group.",
    dsp: "EGP spent",
    e3: "Every ad",
    h2c: "All ad records",
    ph: "Search by ad name…",
    e4: "Reading guide",
    h2d: "How to read the numbers",
    g1t: "Chat started",
    g1: "Someone messaged the business after seeing the ad.",
    g2t: "Reach",
    g2: "People who saw the ad. It is summed per ad here, so one person can be counted twice.",
    g3t: "Cost per chat",
    g3: "Total spend divided by chats started. Lower means cheaper customers.",
    note: "Source: Meta Ads Manager CSV export supplied by Mostafa Alaa. Client and trainer names are anonymized; values are reproduced from the source. No sales or revenue outcomes are inferred. Cost averages are total spend divided by total results, not an average of individual ad costs.",
    all: "All",
    chat: "Chat ads",
    int: "Interaction ads",
    other: "Other",
    allg: "All groups",
    oth: "Other ads (no trainer)",
    chats: "chats",
    each: "each",
    of: "Showing",
    outof: "of",
    th: [
      "Ad",
      "Type",
      "Spend (EGP)",
      "Reach",
      "Impressions",
      "Chats",
      "Cost / chat",
      "Interactions",
    ],
    e5: "Full picture",
    h2e: "Beyond this export: every result in the portfolio",
    s5: "The Meta export above covers the trainers’ ad account only. Here is everything else the portfolio shows: real-estate commission, sales per campaign, the café and the clothing brand.",
    pf: [
      { h: "Real estate · 4 properties listed, all sold" },
      { n: "Faisal Apartment, 40 St", d: "644 chats at 2.16 EGP each · 1,392 EGP spent", r: "110,000 EGP commission on a 1.1M EGP deal" },
      { n: "Faisal Apartment", d: "122 chats at 1.67 EGP each · 204 EGP spent", r: "70,000 EGP commission on a 700K EGP deal" },
      { n: "Mansoura–Talkha land", d: "19,156 interactions at 0.037 EGP each", r: "360,000 EGP commission on 18M EGP of land" },
      { n: "Mansoura–Talkha, new design", d: "618 interactions at 0.72 EGP each", r: "220,000 EGP commission on 11M EGP of land" },
      { t: "Real estate total: 760,000 EGP commission on 30.8M EGP in closed deals" },
      { h: "Fitness trainers and the yoga retreat · tracked sales" },
      { n: "Trainer 1, refreshment", d: "64 chats at 1.85 EGP each", r: "27,000 EGP · 9 subscriptions" },
      { n: "Trainer 2, new offer", d: "41 chats at 30.06 EGP each", r: "13,000 EGP · 26 × 500 EGP" },
      { n: "Trainer 3, sales campaign", d: "181 chats at 7.72 EGP each", r: "16,500 EGP · 11 × 1,500 EGP" },
      { n: "Trainer 4, new offer", d: "", r: "13,500 EGP · 15 subscriptions" },
      { n: "Trainer 5, 50% offer", d: "138 chats at 10.11 EGP each", r: "20,000 EGP · 20 × 1,000 EGP" },
      { n: "Yoga retreat, Aswan", d: "65 chats at 16.33 EGP each", r: "72,000 EGP · 12 spots × 6,000 EGP" },
      { t: "Fitness total: 162,000 EGP in tracked sales" },
      { h: "Café and own brand" },
      { n: "Kapri Cafe, December", d: "67 chats at 2.46 EGP and 90 chats at 6.01 EGP", r: "Café reported about 30% income growth that month" },
      { n: "Nefr Story (own brand)", d: "1,516 clicks at 0.47 EGP each · 32,621 reached · 710 EGP spent", r: "Launched from zero on a small budget" },
      { t: "Grand total: 922,000 EGP in tracked sales and commission · 35.6x ROAS on 25,877 EGP tracked ad spend" },
    ],
    spentl: "spent",
    plain: (s, c, e, a, b) =>
      `<b>In plain words.</b> Across 51 ads, EGP ${s} started ${c} chats with potential customers and drew ${e} reactions to posts. On average a chat cost EGP ${a}, but it ranged from under EGP 2 to over EGP ${b} depending on the offer and the audience. That is why testing matters more than simply spending more. Tracked outcomes: <b>922,000 EGP</b> in sales and commission — 760K real-estate commission on 30.8M in closed deals and 162K in fitness and retreat sales. That is a 35.6x return on the tracked ad spend behind these results.`,
  },
  ar: {
    back: "← البورتفوليو",
    dl: "نزّل البي دي إف",
    eyebrow: "تصدير من مدير إعلانات ميتا · من ١ نوفمبر ٢٠٢٤ لحد ١٠ نوفمبر ٢٠٢٦",
    h1: "تقرير أداء <em>الحملات</em>",
    sub: "٥١ إعلان في ٣٤ اسم حملة، من الحساب الإعلاني بتاع المدربين.",
    k1: "إجمالي المصروف (جنيه)",
    k2: "محادثة اتفتحت مع عملاء",
    k3: "تفاعل على البوستات (لايك وكومنت وشير)",
    k4: "الوصول (مجموع كل إعلان، مش ناس مختلفة)",
    k5: "مبيعات وعمولات متسجلة (جنيه)",
    k6: "العائد على الإنفاق الإعلاني للمبيعات والعمولات المتسجلة",
    knote: "العائد على الإنفاق الإعلاني = ٩٢٢٬٠٠٠ جنيه مبيعات وعمولات متسجلة ÷ ٢٥٬٨٧٧ جنيه مصروف إعلانات (حساب المدربين ٢٣٬١٢٩ + حملات العقارات ٢٬٧٤٨). المبيعات من كلام العميل، والمصروف من مدير إعلانات ميتا.",
    e1: "أحسن قيمة",
    h2a: "أرخص المحادثات",
    s1: "إعلانات جابت ١٠ محادثات أو أكتر، مترتبة بتكلفة المحادثة. كل ما قلّت كان أحسن.",
    e2: "الميزانية",
    h2b: "الفلوس راحت فين",
    s2: "متقسّمة حسب المدرب. الأسماء متخفية، والإعلانات اللي مفيهاش مدرب في مجموعة لوحدها.",
    dsp: "جنيه اتصرفوا",
    e3: "كل الإعلانات",
    h2c: "سجل كل الإعلانات",
    ph: "دوّر باسم الإعلان…",
    e4: "دليل القراءة",
    h2d: "إزاي تقرا الأرقام",
    g1t: "المحادثة",
    g1: "يعني حد بعت رسالة للبيزنس بعد ما شاف الإعلان.",
    g2t: "الوصول",
    g2: "عدد الناس اللي شافوا الإعلان. هنا بيتجمع لكل إعلان لوحده، فالشخص الواحد ممكن يتعدّ أكتر من مرة.",
    g3t: "تكلفة المحادثة",
    g3: "إجمالي المصروف مقسوم على عدد المحادثات. كل ما قلّت يبقى العميل أرخص.",
    note: "المصدر: ملف البيانات من مدير إعلانات ميتا، اتسلّم من مصطفى علاء. أسماء العملاء والمدربين متخفية، والأرقام زي ما هي في الملف. ومفيش أي مبيعات أو إيرادات متحسبة. متوسط التكلفة هو إجمالي المصروف ÷ إجمالي النتايج، مش متوسط تكاليف الإعلانات الفردية.",
    all: "الكل",
    chat: "إعلانات رسائل",
    int: "إعلانات تفاعل",
    other: "أخرى",
    allg: "كل المجموعات",
    oth: "إعلانات تانية (من غير مدرب)",
    chats: "محادثة",
    each: "للمحادثة",
    of: "معروض",
    outof: "من",
    th: [
      "الإعلان",
      "النوع",
      "المصروف (ج.م)",
      "الوصول",
      "مرات الظهور",
      "المحادثات",
      "تكلفة المحادثة",
      "التفاعل",
    ],
    e5: "الصورة الكاملة",
    h2e: "كل نتايج شغلي، مش بس الأرقام اللي في الملف ده",
    s5: "التصدير اللي فوق بيغطي الحساب الإعلاني بتاع المدربين بس. هنا كل حاجة تانية موجودة في البورتفوليو: عمولات العقارات، ومبيعات كل حملة، والكافيه والبراند.",
    pf: [
      { h: "العقارات · ٤ عقارات اتعرضوا، كلهم اتباعوا" },
      { n: "شقة فيصل، شارع ٤٠", d: "٦٤٤ محادثة بتكلفة ٢٫١٦ جنيه · ١٬٣٩٢ جنيه مصروف", r: "١١٠٬٠٠٠ جنيه عمولة من صفقة ١٫١ مليون جنيه" },
      { n: "شقة فيصل", d: "١٢٢ محادثة بتكلفة ١٫٦٧ جنيه · ٢٠٤ جنيه مصروف", r: "٧٠٬٠٠٠ جنيه عمولة من صفقة ٧٠٠ ألف جنيه" },
      { n: "أرض منصورة–طلخة", d: "١٩٬١٥٦ تفاعل بتكلفة ٠٫٠٣٧ جنيه", r: "٣٦٠٬٠٠٠ جنيه عمولة من أرض بـ١٨ مليون جنيه" },
      { n: "منصورة–طلخة، تصميم جديد", d: "٦١٨ تفاعل بتكلفة ٠٫٧٢ جنيه", r: "٢٢٠٬٠٠٠ جنيه عمولة من أرض بـ١١ مليون جنيه" },
      { t: "إجمالي العقارات: ٧٦٠٬٠٠٠ جنيه عمولة على صفقات بـ٣٠٫٨ مليون جنيه" },
      { h: "المدربين وريتريت اليوجا · مبيعات متسجلة" },
      { n: "المدرب ١، ريفريشمنت", d: "٦٤ محادثة بتكلفة ١٫٨٥ جنيه", r: "٢٧٬٠٠٠ جنيه · ٩ اشتراكات" },
      { n: "المدرب ٢، عرض جديد", d: "٤١ محادثة بتكلفة ٣٠٫٠٦ جنيه", r: "١٣٬٠٠٠ جنيه · ٢٦ × ٥٠٠ جنيه" },
      { n: "المدرب ٣، حملة مبيعات", d: "١٨١ محادثة بتكلفة ٧٫٧٢ جنيه", r: "١٦٬٥٠٠ جنيه · ١١ × ١٬٥٠٠ جنيه" },
      { n: "المدرب ٤، عرض جديد", d: "", r: "١٣٬٥٠٠ جنيه · ١٥ اشتراك" },
      { n: "المدرب ٥، عرض خصم ٥٠٪", d: "١٣٨ محادثة بتكلفة ١٠٫١١ جنيه", r: "٢٠٬٠٠٠ جنيه · ٢٠ × ١٬٠٠٠ جنيه" },
      { n: "ريتريت يوجا، أسوان", d: "٦٥ محادثة بتكلفة ١٦٫٣٣ جنيه", r: "٧٢٬٠٠٠ جنيه · ١٢ مكان × ٦٬٠٠٠ جنيه" },
      { t: "إجمالي الفتنس: ١٦٢٬٠٠٠ جنيه مبيعات متسجلة" },
      { h: "الكافيه والبراند" },
      { n: "كابري كافيه، ديسمبر", d: "٦٧ محادثة بتكلفة ٢٫٤٦ جنيه و٩٠ محادثة بتكلفة ٦٫٠١ جنيه", r: "الكافيه قال إن دخله زاد حوالي ٣٠٪ في الشهر ده" },
      { n: "نفر ستوري (البراند بتاعي)", d: "١٬٥١٦ كليك بتكلفة ٠٫٤٧ جنيه · ٣٢٬٦٢١ وصول · ٧١٠ جنيه مصروف", r: "براند اتبنى من الصفر بميزانية صغيرة" },
      { t: "الإجمالي الكلي: ٩٢٢٬٠٠٠ جنيه مبيعات وعمولات متسجلة · عائد ٣٥٫٦ مرة على ٢٥٬٨٧٧ جنيه مصروف إعلانات متتبع" },
    ],
    spentl: "اتصرف",
    plain: (s, c, e, a, b) =>
      `<b>ببساطة.</b> في ٥١ إعلان، صرفنا ${s} جنيه وفتحنا ${c} محادثة مع ناس مهتمة وجِبنا ${e} تفاعل على البوستات. متوسط المحادثة طلع ${a} جنيه، بس الفرق كان كبير: من أقل من جنيهين لأكتر من ${b} جنيه حسب العرض والجمهور. عشان كده الاختبار أهم من إنك تصرف أكتر. النتايج المتسجلة: <b>٩٢٢٬٠٠٠ جنيه</b> مبيعات وعمولات — ٧٦٠ ألف عمولة عقارات على صفقات بـ٣٠٫٨ مليون جنيه و١٦٢ ألف مبيعات فتنس وريتريت. وده يعني عائد ٣٥٫٦ مرة على المصروف الإعلاني اللي اتسجلت عليه النتايج دي.`,
  },
};
const GN = { Other: "oth" };
let lang = (() => {
    const q = new URLSearchParams(location.search).get("lang");
    let st = null;
    try {
      const s = JSON.parse(localStorage.getItem("ma_lang") || "null");
      if (s && Date.now() - s.at < 1209600000) st = s.l;
    } catch (e) {}
    return q === "ar" || q === "en" ? q : st === "ar" ? "ar" : "en";
  })(),
  type = "all",
  grp = "all",
  sortK = "spend",
  sortD = -1,
  q = "";
const f = (x, d = 0) =>
  x.toLocaleString(lang === "ar" ? "ar-EG" : "en-US", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
const T = DATA.reduce(
  (a, r) => ({
    spend: a.spend + r.spend,
    conv: a.conv + r.conv,
    eng: a.eng + r.eng,
    reach: a.reach + r.reach,
  }),
  { spend: 0, conv: 0, eng: 0, reach: 0 },
);
const ARD = "٠١٢٣٤٥٦٧٨٩";
const toAr = (x) => String(x).replace(/\d/g, (d) => ARD[+d]);
const AD_AR = {
  "Trainer 3 - Sales": "المدرب ٣ – مبيعات",
  "Trainer 5 - New Offer Sales - Poster": "المدرب ٥ – مبيعات العرض الجديد – بوستر",
  "Trainer 2 - 2nd try": "المدرب ٢ – المحاولة التانية",
  "New offer MSG - Trainer 4 insta": "عرض جديد رسايل – المدرب ٤ إنستجرام",
  "Trainer 2 - New Offer Sales - Carasoul": "المدرب ٢ – مبيعات العرض الجديد – كاروسيل",
  "New offer MSG - Trainer 5": "عرض جديد رسايل – المدرب ٥",
  "50% Offer": "عرض خصم ٥٠٪",
  "Trainer 2 - 2nd try - Lookalike": "المدرب ٢ – المحاولة التانية – جمهور مشابه",
  "Trainer 2 - New Offer Sales": "المدرب ٢ – مبيعات العرض الجديد",
  "Trainer 5 - New Offer Sales": "المدرب ٥ – مبيعات العرض الجديد",
  "Trainer 1 2nd try": "المدرب ١ – المحاولة التانية",
  "3 months offer MSG - Trainer 2 -": "عرض الـ٣ شهور رسايل – المدرب ٢",
  "New offer MSG - Trainer 2": "عرض جديد رسايل – المدرب ٢",
  "refreshment 1": "ريفريشمنت ١",
  "Trainer 1's pixel offer - 3rd": "عرض البكسل بتاع المدرب ١ – التالت",
  "New Engagement Ad": "إعلان تفاعل جديد",
  "Trainer 1 - Ramadan - Face": "المدرب ١ – رمضان – فيسبوك",
  "Weight-loss camp 1 - Weight loss": "معسكر خسارة الوزن ١",
  "2nd eposide - Trainer 1": "الحلقة التانية – المدرب ١",
  "Trainer 1 - Ramadan - Insta": "المدرب ١ – رمضان – إنستجرام",
  "Trainer 1's pixel offer": "عرض البكسل بتاع المدرب ١",
  "Trainer 1 - el Adha offer - Copy": "المدرب ١ – عرض الأضحى – نسخة",
  "New offer MSG": "عرض جديد رسايل",
  "Trainer 1's pixel offer - 3rd - Copy": "عرض البكسل بتاع المدرب ١ – التالت – نسخة",
  "Trainer 1 - el Adha offer": "المدرب ١ – عرض الأضحى",
  "Trainer 1's New post": "بوست جديد للمدرب ١",
  "Media 1": "ميديا ١",
  "Steroid post": "بوست الستيرويد",
  "Trainer 1 - el Adha offer - Copy 2": "المدرب ١ – عرض الأضحى – نسخة ٢",
  "Media 2": "ميديا ٢",
  "New offer MSG - Trainer 4 Facebook": "عرض جديد رسايل – المدرب ٤ فيسبوك",
  "video post": "بوست فيديو",
  "New Traffic Ad": "إعلان زيارات جديد",
  "Trainer 1's pixel offer - 2nd": "عرض البكسل بتاع المدرب ١ – التاني",
};
const arAd = (a) => (lang === "ar" ? AD_AR[a] || a : a);
const gname = (g) =>
  g === "Other"
    ? L[lang].oth
    : lang === "ar"
      ? g === "Weight-loss camp"
        ? "معسكر خسارة الوزن"
        : g.replace(/^Trainer (\d+)$/, (_, n) => "المدرب " + toAr(n))
      : g;
const COL = ["#C9A24B", "#E2C77F", "#9A7B2F", "#8a7a55", "#6b624a", "#4d4739"];
function count(el, t, dec) {
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  if (rm) {
    el.textContent = f(t, dec);
    return;
  }
  let s = null;
  (function st(ts) {
    s = s || ts;
    const p = Math.min((ts - s) / 1500, 1);
    el.textContent = f(t * (1 - Math.pow(1 - p, 3)), dec);
    if (p < 1) requestAnimationFrame(st);
  })(performance.now());
}
function texts() {
  const l = L[lang];
  document.querySelector(".logo > span").innerHTML =
    lang === "ar" ? "مصطفى <b>علاء</b>" : "Mostafa <b>Alaa</b>";
  document.getElementById("q").setAttribute("aria-label", lang === "ar" ? "دوّر باسم الإعلان" : "Search");
  document.getElementById("gsel").setAttribute("aria-label", lang === "ar" ? "المجموعة" : "Group");
  document.getElementById("lt").lang = lang === "ar" ? "en" : "ar";
  document.querySelectorAll("[data-k]").forEach((e) => {
    const v = l[e.dataset.k];
    if (typeof v === "string") {
      if (e.tagName === "INPUT") e.placeholder = v;
      else e.innerHTML = v;
    }
  });
  document.getElementById("plain").innerHTML = l.plain(
    f(T.spend, 0),
    f(T.conv),
    f(T.eng),
    f(T.spend / T.conv, 2),
    f(55),
  );
  document.getElementById("k5").textContent =
    lang === "ar" ? "٩٢٢٬٠٠٠" : "922,000";
  document.getElementById("k6").textContent =
    lang === "ar" ? "٣٥٫٦ ضعف" : "35.6x";
  document.getElementById("lt").textContent =
    lang === "ar" ? "English" : "العربية";
  document.title =
    lang === "ar"
      ? "تقرير أداء الحملات — مصطفى علاء"
      : "Campaign Performance Report — Mostafa Alaa";
}
function bars() {
  const l = L[lang],
    g = DATA.filter((r) => r.conv >= 10)
      .map((r) => ({ ...r, c: r.spend / r.conv }))
      .sort((a, b) => a.c - b.c)
      .slice(0, 6),
    mx = 55.3;
  document.getElementById("bars").innerHTML = g
    .map(
      (r) =>
        `<div class="bar"><span>${arAd(r.ad)}<small>${f(r.conv)} ${l.chats} · ${lang === "ar" ? f(r.spend, 0) + " جنيه" : "EGP " + f(r.spend, 0)}</small></span><span class="track"><span class="fill" data-w="${(r.c / mx) * 100}"></span></span><span class="v">${lang === "ar" ? f(r.c, 2) + " ج.م" : "EGP " + f(r.c, 2)}</span></div>`,
    )
    .join("");
  arm();
}
function donut() {
  const l = L[lang],
    m = {};
  DATA.forEach((r) => {
    m[r.g] = m[r.g] || { spend: 0, conv: 0 };
    m[r.g].spend += r.spend;
    m[r.g].conv += r.conv;
  });
  const gs = Object.entries(m).sort((a, b) => b[1].spend - a[1].spend),
    C = 2 * Math.PI * 74;
  let off = 0,
    svg = "",
    leg = "";
  gs.forEach(([n, v], i) => {
    const len = (v.spend / T.spend) * C;
    svg += `<circle cx="100" cy="100" r="74" stroke="${COL[i % 6]}" stroke-dasharray="0 ${C}" data-d="${len} ${C - len}" stroke-dashoffset="${-off}"></circle>`;
    off += len;
    leg += `<div class="lg"><i style="background:${COL[i % 6]}"></i><span>${gname(n)}<small>${f(v.conv)} ${v.conv === 1 && lang === "en" ? "chat" : l.chats}${v.conv ? " · " + (lang === "ar" ? f(v.spend / v.conv, 2) + " ج.م " + l.each : "EGP " + f(v.spend / v.conv, 2) + " " + l.each) : ""}</small></span><b>${(v.spend / T.spend) * 100 < 1 ? (lang === "ar" ? "<١٪" : "<1%") : f((v.spend / T.spend) * 100, 0) + "٪".replace("٪", lang === "ar" ? "٪" : "%")}</b></div>`;
  });
  document.getElementById("donut").innerHTML = svg;
  document.getElementById("leg").innerHTML = leg;
  document.getElementById("dtot").textContent = f(T.spend, 0);
  arm();
}
function table() {
  const l = L[lang],
    keys = ["ad", "t", "spend", "reach", "imp", "conv", "cpc", "eng"];
  document.getElementById("th").innerHTML = l.th
    .map(
      (h, i) =>
        `<th scope="col" data-s="${keys[i]}" tabindex="0" role="columnheader" ${sortK === keys[i] ? `aria-sort="${sortD > 0 ? "ascending" : "descending"}"` : ""}>${h}</th>`,
    )
    .join("");
  document.getElementById("chips").innerHTML = ["all", "chat", "int"]
    .map(
      (k) =>
        `<button class="chip" type="button" data-t="${k}" aria-pressed="${type === k}">${l[k]}</button>`,
    )
    .join(" ");
  const gs = [...new Set(DATA.map((r) => r.g))];
  document.getElementById("gsel").innerHTML =
    `<option value="all">${l.allg}</option>` +
    gs
      .map(
        (g) =>
          `<option value="${g}" ${grp === g ? "selected" : ""}>${gname(g)}</option>`,
      )
      .join("");
  let rs = DATA.map((r) => ({
    ...r,
    cpc: r.conv ? r.spend / r.conv : null,
  })).filter(
    (r) =>
      (type === "all" || r.t === type) &&
      (grp === "all" || r.g === grp) &&
      (r.ad.toLowerCase().includes(q) || (lang === "ar" && (AD_AR[r.ad] || "").includes(q))),
  );
  rs.sort((a, b) => {
    const x = a[sortK === "t" ? "t" : sortK],
      y = b[sortK === "t" ? "t" : sortK];
    if (x === null) return 1;
    if (y === null) return -1;
    return (typeof x === "string" ? x.localeCompare(y) : x - y) * sortD;
  });
  const mx = Math.max(...DATA.map((r) => r.spend));
  document.getElementById("tb").innerHTML = rs
    .map((r, i) => {
      const cls =
        r.cpc === null ? "" : r.cpc < 10 ? "good" : r.cpc > 25 ? "high" : "mid";
      return `<tr class="row" style="--i:${Math.min(i, 24)}"><td class="n">${arAd(r.ad)}</td><td><span class="tag">${l[r.t]}</span></td><td class="r">${f(r.spend, 2)}<span class="mb"><i style="width:${(r.spend / mx) * 100}%"></i></span></td><td class="r">${f(r.reach)}</td><td class="r">${f(r.imp)}</td><td class="r">${r.conv ? f(r.conv) : "—"}</td><td class="r ${cls}">${r.cpc === null ? "—" : lang === "ar" ? f(r.cpc, 2) + " ج.م" : "EGP " + f(r.cpc, 2)}</td><td class="r">${r.eng ? f(r.eng) : "—"}</td></tr>`;
    })
    .join("");
  document.getElementById("cnt").textContent =
    `${l.of} ${f(rs.length)} ${l.outof} ${f(DATA.length)}`;
  document.querySelectorAll("#th th").forEach((h) => {
    const go = () => {
      const k = h.dataset.s;
      if (sortK === k) sortD *= -1;
      else {
        sortK = k;
        sortD = k === "ad" || k === "t" ? 1 : -1;
      }
      table();
    };
    h.onclick = go;
    h.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    };
  });
  document.querySelectorAll(".chip").forEach(
    (c) =>
      (c.onclick = () => {
        type = c.dataset.t;
        table();
      }),
  );
}
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        e.target
          .querySelectorAll("[data-w]")
          .forEach((x) => (x.style.width = x.dataset.w + "%"));
        e.target
          .querySelectorAll("[data-d]")
          .forEach((x) => x.setAttribute("stroke-dasharray", x.dataset.d));
      }
    }),
  { threshold: 0.2 },
);
function arm() {
  document.querySelectorAll(".rv").forEach((e) => {
    if (e.classList.contains("in")) {
      e.querySelectorAll("[data-w]").forEach(
        (x) => (x.style.width = x.dataset.w + "%"),
      );
      e.querySelectorAll("[data-d]").forEach((x) =>
        x.setAttribute("stroke-dasharray", x.dataset.d),
      );
    }
  });
}
document.querySelectorAll(".rv").forEach((e) => io.observe(e));

function pf() {
  const l = L[lang];
  document.getElementById("pf").innerHTML = l.pf
    .map((r) =>
      r.h
        ? `<div class="pfh">${r.h}</div>`
        : r.t
          ? `<div class="pft">${r.t}</div>`
          : `<div class="pfr"><div><b>${r.n}</b>${r.d ? `<span>${r.d}</span>` : ""}</div><div class="pfr-r">${r.r}</div></div>`,
    )
    .join("");
}
function setLang(l) {
  lang = l;
  try {
    localStorage.setItem("ma_lang", JSON.stringify({ l, at: Date.now() }));
  } catch (e) {}
  document
    .querySelectorAll('a.logo, a[data-k="back"]')
    .forEach((a) => (a.href = l === "ar" ? "ar/" : "./"));
  document.documentElement.lang = l;
  document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  texts();
  bars();
  donut();
  table();
  pf();
  if (typeof Jazz !== "undefined") Jazz.ui();
}
document.getElementById("lt").onclick = () =>
  setLang(lang === "ar" ? "en" : "ar");
document.getElementById("q").oninput = (e) => {
  q = e.target.value.toLowerCase();
  table();
};
document.getElementById("gsel").onchange = (e) => {
  grp = e.target.value;
  table();
};
addEventListener(
  "scroll",
  () => {
    const h = document.documentElement;
    document.getElementById("pg").style.width =
      (scrollY / (h.scrollHeight - h.clientHeight)) * 100 + "%";
  },
  { passive: true },
);
(function () {
  const s = document.getElementById("spot");
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
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
        s.classList.add("on");
      }
    },
    { passive: true },
  );
  document.addEventListener("mouseleave", () => s.classList.remove("on"));
  (function loop() {
    cx += (tx - cx) * 0.14;
    cy += (ty - cy) * 0.14;
    s.style.setProperty("--sx", cx.toFixed(1) + "px");
    s.style.setProperty("--sy", cy.toFixed(1) + "px");
    requestAnimationFrame(loop);
  })();
})();

setLang(lang);
Jazz.init();
count(document.getElementById("k1"), T.spend, 2);
count(document.getElementById("k2"), T.conv, 0);
count(document.getElementById("k3"), T.eng, 0);
count(document.getElementById("k4"), T.reach, 0);
