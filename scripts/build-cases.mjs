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
  const accent = { mint: '#8FE3C8', amber: '#F6C177', rose: '#F3A9CF', peri: '#8E9CE6', lilac: '#DCD0F2', bloom: '#E7A8E0' }[p.accent];
  const desc = attr(strip(c.intro.en));
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#141019">
<style>body{--accent:${accent}}</style>
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
<a class="skip" href="#case" data-i18n="skip">Skip to content</a>
<header class="menubar">
  <a class="brand" href="../../" aria-label="Mia OS, home"><span class="brand-mark" aria-hidden="true">✿</span> Mia OS <span class="hide-sm path-inline">~/projects/${p.file}</span></a>
  <nav class="topnav" aria-label="Sections">
    <a href="../../#projects" data-i18n="nav.work">Projects</a>
    <a href="../../#experience" data-i18n="nav.exp">Experience</a>
    <a href="../../#about" data-i18n="nav.about">About</a>
    <a href="../../#contact" data-i18n="nav.contact">Contact</a>
  </nav>
  <div class="menubar-right">
    <button type="button" class="pill pill-term" id="openTerm" aria-label="Open the terminal"><span aria-hidden="true">&gt;_</span><span class="hide-sm" data-i18n="nav.term">terminal</span></button>
    <button type="button" class="pill" id="langBtn" data-i18n="lang" aria-label="Passer en français">FR</button>
    <a class="pill pill-rose" href="../../assets/CV-Meryem-Belmouaddine.pdf" target="_blank" rel="noopener">cv.pdf ↓</a>
  </div>
</header>

<main class="case" id="case">
  <noscript><h1>${p.title}</h1><p>${strip(c.intro.en)}</p>${p.repo ? `<p><a href="${p.repo}">Code on GitHub</a></p>` : ''}</noscript>
</main>

<footer class="statusbar">
  <span class="hide-sm">⎇ main</span>
  <button type="button" class="sb-btn" id="bugBtn" data-i18n="sb.bugs">✓ 0 bugs<span class="hide-sm"> (that I know of)</span></button>
  <span class="sb-msg" id="sbMsg" aria-live="polite"></span>
  <span class="sb-right"><span class="hide-sm" id="sbLine">Ln 1, Col 1</span><button type="button" class="sb-btn" id="sbCoffee" aria-label="Refill coffee">☕ 100%</button></span>
</footer>

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
