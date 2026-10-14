// Generates work/<slug>/index.html for every project in js/cases.js.
// Run from the repo root: node scripts/build-cases.mjs
import fs from 'node:fs';
import vm from 'node:vm';

const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ['js/projects.js', 'js/cases.js']) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx);
const { PROJECTS, CASES } = ctx.window;
const strip = html => html.replace(/<[^>]+>/g, '');
const attr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

for (const p of PROJECTS) {
  const c = CASES[p.id];
  const title = `${p.title} · Mia OS`;
  const desc = attr(strip(c.intro.en));
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#141019">
<meta name="color-scheme" content="dark">
<link rel="canonical" href="https://miaaa3.github.io/work/${c.slug}/">
<meta property="og:type" content="article">
<meta property="og:title" content="${attr(p.title)}: ${attr(strip(c.headline.en))}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="https://miaaa3.github.io/${p.cover}">
<link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,800;1,9..144,600&family=Outfit:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../css/style.css">
</head>
<body data-case="${p.id}" data-root="../../">
<header class="titlebar">
  <div class="lights" aria-hidden="true"><i></i><i></i><i></i></div>
  <a class="titlebar-name" href="../../">mia-os <span>~/portfolio/projects/${p.file}</span></a>
  <nav class="topnav" aria-label="Sections">
    <a href="../../#projects" data-i18n="nav.work">projects</a>
    <a href="../../#experience" data-i18n="nav.exp">experience</a>
    <a href="../../#about" data-i18n="nav.about">about</a>
    <a href="../../#contact" data-i18n="nav.contact">contact</a>
    <button type="button" id="openTerm">&gt;_ <span data-i18n="nav.term">terminal</span></button>
  </nav>
  <div class="titlebar-actions">
    <button type="button" class="pill" id="langBtn" data-i18n="lang">FR</button>
    <a class="pill pill-rose" href="../../assets/CV-Meryem-Belmouaddine.pdf" target="_blank" rel="noopener">cv.pdf ↓</a>
  </div>
</header>

<main class="case" id="case">
  <noscript><h1>${p.title}</h1><p>${strip(c.intro.en)}</p><p><a href="${p.repo}">Code on GitHub</a></p></noscript>
</main>

<footer class="statusbar">
  <span>⎇ main</span>
  <span class="hide-sm">${p.file}</span>
  <span class="sb-right"><span id="sbLine">Ln 1, Col 1</span><span class="hide-sm">UTF-8</span><span id="sbCoffee">☕ 100%</span></span>
</footer>

<dialog class="term" id="term" aria-label="Terminal">
  <div class="term-bar"><span>TERMINAL</span><button type="button" id="termClose" aria-label="Close">×</button></div>
  <pre class="term-out" id="termOut"></pre>
  <form class="term-in" id="termForm" autocomplete="off"><label for="termInput">mia@mulhouse ~/portfolio $</label><input id="termInput" type="text" spellcheck="false" autocapitalize="off"></form>
</dialog>

<script src="../../js/projects.js"></script>
<script src="../../js/i18n.js"></script>
<script src="../../js/cases.js"></script>
<script src="../../js/main.js"></script>
</body>
</html>
`;
  fs.mkdirSync(`work/${c.slug}`, { recursive: true });
  fs.writeFileSync(`work/${c.slug}/index.html`, html);
  console.log(`work/${c.slug}/index.html`);
}
