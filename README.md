# Mostafa Alaa — Portfolio

A bilingual (English / Egyptian Arabic) portfolio website for a marketing strategist and media buying lead, plus a separate animated campaign report page. Plain HTML, CSS and JavaScript: no build step, no framework, no dependencies.

## Structure

```
.
├── index.html               Main portfolio page
├── campaign_report.html     Campaign performance report (separate page)
├── css/
│   ├── style.css            Styles for the portfolio (colors and fonts are CSS variables at the top)
│   └── report.css           Styles for the report page
├── js/
│   ├── main.js              Portfolio behavior: language gate, animations, gallery wheel, lightbox
│   ├── jazz.js              Background music (shared by both pages, keeps playing across them)
│   ├── report.js            Report page behavior: charts, filters, sortable table
│   └── report-data.js       The 51 ad records shown in the report
└── assets/
    ├── images/              Photo, ad screenshots (ads-*.jpg) and published posts (post-*.jpg)
    ├── files/               CV (PDF and Word) and the campaign report PDF
    ├── audio/               Optional: put music.mp3 here
    └── favicon.svg
```

## Run it locally

Open `index.html` in a browser. For the most accurate behavior (music state between pages), run a tiny local server instead:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy on GitHub Pages

1. Create a new public repository on GitHub (for example `portfolio`).
2. Upload everything in this folder, keeping the structure above.
3. Go to **Settings → Pages**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, and save.
4. After a minute the site is live at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## Customize

| What | Where |
| --- | --- |
| Colors, fonts, roundness | `:root { ... }` at the top of `css/style.css` (and `css/report.css`) |
| English text | The text inside each tag in `index.html` |
| Arabic text | The `data-ar="..."` attribute on the same tag (written independently, in Egyptian Arabic) |
| WhatsApp number and email | The links with `id="wa"` and `id="mail"` in `index.html` |
| CV | Replace `assets/files/Mostafa_Alaa_CV.pdf` (keep the file name) |
| Photo | Replace `assets/images/mostafa.jpg` (square, at least 460 px) |
| Report numbers | Edit `js/report-data.js`, and replace the PDF in `assets/files/` |
| Background music | Add `assets/audio/music.mp3` (a track you have the rights to use). If it is missing, a soft jazz-style loop is generated in the browser instead |

## Notes

- Browsers only allow sound after a user action. The music starts when a visitor chooses a language. On the report page it may wait for the first tap.
- The page loads two Google Fonts (Fraunces, Inter, plus Cairo and Amiri for Arabic). Without internet access it falls back to system fonts.
- A request for `assets/audio/music.mp3` returning 404 in the browser console is expected when no music file is added.
