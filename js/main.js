/* Shared by the home page and the case-study pages. */
document.documentElement.classList.add('js');
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
  };
  const root = document.body.dataset.root || '';
  const caseId = document.body.dataset.case;
  let lang = 'en';
  const t = () => window.UI[lang];
  const pick = v => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[lang] || v.en) : v;
  const caseUrl = p => `${root}work/${CASES[p.id].slug}/`;

  /* =============== home: projects =============== */
  let filter = 'all';
  function renderProjects() {
    const list = $('#projectList');
    if (!list) return;
    list.innerHTML = PROJECTS.map((p, i) => {
      const first = p.strip[0][0];
      const media = first.endsWith('.mp4')
        ? `<video src="assets/strips/${first}" poster="assets/strips/${first.replace('.mp4', '.jpg')}" muted loop playsinline preload="none"></video>`
        : `<img src="assets/strips/${first}" alt="" loading="lazy" decoding="async">`;
      return `
      <article class="project rise" id="p-${p.id}" data-cat="${p.cat}">
        <a class="shot" href="${caseUrl(p)}" style="--r:${i % 2 ? 2.5 : -2.5}deg" aria-label="${esc(p.title)}: ${t().caseStudy}">
          <span class="polaroid">${media}<span class="cap">${esc(pick(p.short))}</span></span>
        </a>
        <div class="pcard">
          <div class="pcard-tab"><span>${p.file}</span><span>${p.year}</span></div>
          <div class="pcard-body">
            <p class="role">${esc(pick(p.role))}</p>
            <h3>${p.title}</h3>
            <p class="desc">${pick(p.desc)}</p>
            <div class="figs">${p.figures.map(f => `<div class="fig"><b>${esc(pick(f.v))}</b><span>${esc(pick(f.l))}</span></div>`).join('')}</div>
            <div class="tags">${p.tags.map(x => `<span class="tag">${x}</span>`).join('')}</div>
            <div class="actions">
              <a class="btn btn-violet" href="${caseUrl(p)}">${t().caseStudy} →</a>
              <a class="btn btn-ghost" href="${p.repo}" target="_blank" rel="noopener">${t().code} ↗</a>
            </div>
          </div>
        </div>
      </article>`;
    }).join('');
    applyFilter(filter);
    rise($$('.rise', list));
    playWhenVisible($$('video', list));
  }
  function applyFilter(f) {
    filter = f;
    $$('.filters button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === f)));
    $$('.project').forEach(el => el.classList.toggle('hidden', !(f === 'all' || el.dataset.cat.split(' ').includes(f))));
  }
  $$('.filters button').forEach(b => b.addEventListener('click', () => applyFilter(b.dataset.filter)));

  /* =============== case study page =============== */
  function renderCase() {
    const el = $('#case');
    if (!el || !caseId) return;
    const p = PROJECTS.find(x => x.id === caseId), c = CASES[caseId];
    const i = PROJECTS.indexOf(p), next = PROJECTS[(i + 1) % PROJECTS.length];
    const img = src => `${root}${src}`;
    document.title = `${p.title} · Mia OS`;
    const media = p.video
      ? `<video src="${img(p.video)}" poster="${img(p.cover)}" muted loop playsinline autoplay controls></video>`
      : `<img src="${img(p.cover)}" alt="${esc(p.title)}">`;
    el.innerHTML = `
      <a class="back" href="${root}#projects">← ${t().back}</a>
      <p class="crumb">portfolio › projects/ › ${p.file}</p>
      <header class="case-hero">
        <h1>${pick(c.headline)}</h1>
        <p class="case-intro">${pick(c.intro)}</p>
        <p class="case-meta">${esc(pick(c.meta))}</p>
        <div class="case-figs figs">${p.figures.map(f => `<div class="fig"><b>${esc(pick(f.v))}</b><span>${esc(pick(f.l))}</span></div>`).join('')}</div>
      </header>
      <figure class="case-media"><span class="polaroid">${media}<span class="cap">${esc(pick(p.short))}</span></span></figure>
      <section class="case-block rise"><p class="case-label">${t().problem}</p><p class="statement">${pick(c.problem)}</p></section>
      <section class="case-block rise"><p class="case-label">${t().hard}</p>
        <div class="hard">${c.hard.map((h, k) => `<article><p class="n">${k + 1}</p><h3>${esc(pick(h.t))}</h3><p>${esc(pick(h.d))}</p></article>`).join('')}</div></section>
      <section class="case-block rise"><p class="case-label">${t().how}</p><ul class="how">${pick(c.how).map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>
      ${p.gallery.length > 1 ? `<section class="case-block rise"><p class="case-label">${t().screens}</p>
        <div class="gallery">${p.gallery.slice(1).map(src => `<span class="polaroid"><img src="${img(src)}" alt="" loading="lazy"></span>`).join('')}</div></section>` : ''}
      <section class="case-block rise"><p class="case-label">${t().stack}</p>
        <div class="stack">${c.stack.map(([n, r]) => `<div><b>${esc(n)}</b><span>${esc(pick(r))}</span></div>`).join('')}</div></section>
      <section class="case-block rise"><p class="case-label">${t().links}</p>
        <div class="case-links"><a class="btn btn-violet" href="${p.repo}" target="_blank" rel="noopener">${t().code} ↗</a><a class="btn btn-ghost" href="${p.repo}#readme" target="_blank" rel="noopener">README ↗</a><a class="btn btn-ghost" href="mailto:belmouaddine.ptech@gmail.com">${t().ask} ✉</a></div></section>
      <a class="next-case" href="${caseUrl(next)}"><span><small>${t().next} · ${next.file}</small><strong>${next.title}</strong></span><span class="arrow">→</span></a>`;
    rise($$('.rise', el));
    playWhenVisible($$('video', el));
  }

  /* =============== shared helpers =============== */
  function playWhenVisible(videos) {
    if (reduce || !('IntersectionObserver' in window)) return;
    videos.forEach(v => new IntersectionObserver(es => { if (es[0].isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: .4 }).observe(v));
  }
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .1 }) : null;
  function rise(els) { els.forEach((el, i) => { el.classList.add('rise'); el.style.transitionDelay = `${(i % 3) * 70}ms`; io ? io.observe(el) : el.classList.add('in'); }); }
  rise($$('.commit, .about-text, .polaroid.big, .json, .contact > *'));

  /* =============== draggable stickers (home) =============== */
  const desk = $('#desk');
  if (desk) $$('.drag', desk).forEach(el => {
    let sx, sy, ox, oy, moved = false;
    el.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      el.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY; ox = el.offsetLeft; oy = el.offsetTop; moved = false;
      el.classList.add('dragging');
    });
    el.addEventListener('pointermove', e => {
      if (!el.classList.contains('dragging')) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
      el.style.left = `${Math.max(-el.offsetWidth * .4, Math.min(desk.clientWidth - el.offsetWidth * .4, ox + dx))}px`;
      el.style.top = `${Math.max(-20, Math.min(desk.clientHeight - el.offsetHeight * .4, oy + dy))}px`;
    });
    const end = () => el.classList.remove('dragging');
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    el.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; } });
  });

  /* =============== status bar + menu highlight =============== */
  const sections = $$('[data-file]');
  function onScroll() {
    const h = document.documentElement, k = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    const line = $('#sbLine'), coffee = $('#sbCoffee');
    if (line) line.textContent = `Ln ${Math.round(h.scrollTop / 24) + 1}, Col ${Math.round(k * 80) + 1}`;
    if (coffee) coffee.textContent = `☕ ${Math.max(3, Math.round(100 - k * 97))}%`;
    let cur = '';
    sections.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .35) cur = s.id; });
    $$('.topnav a').forEach(a => a.classList.toggle('active', a.getAttribute('href').endsWith('#' + cur)));
  }
  addEventListener('scroll', onScroll, { passive: true });

  /* =============== terminal =============== */
  const term = $('#term'), out = $('#termOut'), input = $('#termInput');
  const print = (html, cls) => { out.insertAdjacentHTML('beforeend', `<span${cls ? ` class="${cls}"` : ''}>${html}</span>\n`); out.scrollTop = out.scrollHeight; };
  function openTerm() {
    if (term.open) return;
    out.innerHTML = ''; print(t().term.welcome);
    term.showModal(); input.focus();
  }
  function run(raw) {
    const cmd = raw.trim().toLowerCase(), T = t().term;
    print(`<span class="p">mia@mulhouse</span> ~/portfolio $ ${esc(raw)}`);
    if (!cmd) return;
    const open = url => setTimeout(() => window.open(url, '_blank', 'noopener'), 400);
    if (cmd.startsWith('sudo')) { print(esc(T.sudo), 'r'); return; }
    switch (cmd) {
      case 'help': print(T.help); break;
      case 'whoami': print(esc(T.whoami)); break;
      case 'internship': case 'stage': print(esc(T.internship), 'y'); break;
      case 'ls': print(esc(T.ls)); break;
      case 'projects': case 'ls projects': print(esc(T.projects)); break;
      case 'cv': print(esc(T.cv)); open(`${root}assets/CV-Meryem-Belmouaddine.pdf`); break;
      case 'contact': print(T.contact); break;
      case 'coffee': print(esc(T.coffee)); break;
      case 'joke': print(esc(T.jokes[Math.floor(Math.random() * T.jokes.length)])); break;
      case 'lang': print(esc(T.lang)); setTimeout(() => setLang(lang === 'en' ? 'fr' : 'en'), 400); break;
      case 'clear': out.innerHTML = ''; break;
      case 'exit': case 'quit': term.close(); break;
      default: print(esc(T.notFound.replace('{cmd}', cmd.split(' ')[0])), 'r');
    }
  }
  $('#termForm').addEventListener('submit', e => { e.preventDefault(); run(input.value); input.value = ''; });
  $('#openTerm').addEventListener('click', openTerm);
  $('#termClose').addEventListener('click', () => term.close());
  term.addEventListener('click', e => { if (e.target === term) term.close(); });
  addEventListener('keydown', e => {
    const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
    if ((e.key === '`' || e.key === '²') && !typing) { e.preventDefault(); openTerm(); }
  });

  /* =============== language =============== */
  const mq = $('#marquee'); if (mq) mq.innerHTML += mq.innerHTML; // seamless loop
  const EN = {};
  $$('[data-i18n]').forEach(el => { EN[el.dataset.i18n] = el.innerHTML; });
  function setLang(l) {
    lang = l === 'fr' ? 'fr' : 'en';
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => {
      const v = lang === 'fr' ? window.I18N_FR[el.dataset.i18n] : EN[el.dataset.i18n];
      if (v !== undefined) el.innerHTML = v;
    });
    store.set('lang', lang);
    renderProjects(); renderCase(); onScroll();
  }
  $('#langBtn').addEventListener('click', () => setLang(lang === 'en' ? 'fr' : 'en'));

  setLang(store.get('lang') || ((navigator.language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en'));
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('loaded')));
})();
