(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
  };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = id => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;

  let lang = 'en';
  const t = () => window.UI[lang];
  const pick = v => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[lang] || v.en) : v;

  /* ============ hero code editor (typed) ============ */
  let codeTimer;
  function typeCode() {
    clearTimeout(codeTimer);
    const pre = $('#code'), tokens = t().snippet;
    $('#codeOk').textContent = '';
    const cls = { k: 'tok-k', v: 'tok-v', p: 'tok-p', s: 'tok-s', n: 'tok-n', c: 'tok-c' };
    // flatten into characters with their token class
    const chars = [];
    tokens.forEach(([k, text]) => [...text].forEach(ch => chars.push([k, ch])));
    const render = n => {
      let html = '', line = 1, cur = null, buf = '';
      const flush = () => { if (buf) { html += cur && cls[cur] ? `<span class="${cls[cur]}">${esc(buf)}</span>` : esc(buf); buf = ''; } };
      html += `<span class="ln">1</span>`;
      for (let i = 0; i < n; i++) {
        const [k, ch] = chars[i];
        if (ch === '\n') { flush(); html += `\n<span class="ln">${++line}</span>`; cur = null; continue; }
        if (k !== cur) { flush(); cur = k; }
        buf += ch;
      }
      flush();
      pre.innerHTML = html + '<span class="caret"></span>';
    };
    if (reduceMotion) { render(chars.length); $('#codeOk').textContent = t().codeOk; return; }
    let i = 0;
    const step = () => {
      i = Math.min(chars.length, i + (chars[i] && chars[i][1] === ' ' ? 2 : 1));
      render(i);
      if (i < chars.length) codeTimer = setTimeout(step, 14 + Math.random() * 30);
      else codeTimer = setTimeout(() => { $('#codeOk').textContent = t().codeOk; }, 300);
    };
    codeTimer = setTimeout(step, 400);
  }

  /* ============ projects ============ */
  const pad = n => String(n).padStart(2, '0');
  function entry(p, i, total) {
    return `
      <article class="entry reveal" data-cat="${p.cat}">
        <div class="idx">${pad(i + 1)} / ${pad(total)}</div>
        <div class="entry-text">
          <p class="role-line">${esc(pick(p.role))} · ${p.year}</p>
          <h3>${p.title}</h3>
          <p class="desc">${pick(p.desc)}</p>
          <div class="figures">${p.figures.map(f => `<div><b>${esc(pick(f.v))}</b><span>${esc(pick(f.l))}</span></div>`).join('')}</div>
          <div class="tags">${p.tags.map(x => `<span class="tag">${x}</span>`).join('')}</div>
          <div class="entry-links">
            <button type="button" class="btn btn-secondary btn-sm" data-open="${p.id}">${t().details}${icon('arrow')}</button>
            <a class="text-link" href="${p.repo}" target="_blank" rel="noopener">${icon('github')}${t().code}</a>
          </div>
        </div>
        <button type="button" class="media" data-open="${p.id}" aria-label="${esc(p.title)}: ${t().details}">
          <img src="${p.cover}" alt="" loading="lazy" decoding="async">
          ${p.video ? `<video muted loop playsinline preload="none" poster="${p.cover}" data-src="${p.video}"></video>` : ''}
          <span class="media-hint">${p.video ? t().watch : t().screens} ↗</span>
        </button>
      </article>`;
  }

  let videoObserver, currentFilter = 'all';
  function renderProjects() {
    $('#work').innerHTML = PROJECTS.map((p, i) => entry(p, i, PROJECTS.length)).join('');
    applyFilter(currentFilter);
    observeReveal($$('#projects .reveal'));
    if (videoObserver) videoObserver.disconnect();
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    videoObserver = new IntersectionObserver(entries => entries.forEach(({ target, isIntersecting }) => {
      const v = $('video', target);
      if (!v) return;
      if (isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        v.play().then(() => target.classList.add('playing')).catch(() => {});
      } else v.pause();
    }), { threshold: 0.5 });
    $$('.media').forEach(m => videoObserver.observe(m));
  }
  function applyFilter(f) {
    currentFilter = f;
    $$('.filters button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === f)));
    $$('.entry').forEach(c => c.classList.toggle('hidden', !(f === 'all' || c.dataset.cat.split(' ').includes(f))));
  }
  $$('.filters button').forEach(b => b.addEventListener('click', () => applyFilter(b.dataset.filter)));

  /* ============ modal ============ */
  const modal = $('#modal');
  let slides = [], idx = 0;
  function show(i) {
    idx = (i + slides.length) % slides.length;
    const s = slides[idx];
    const nav = slides.length > 1
      ? `<button class="stage-nav prev" type="button" data-step="-1" aria-label="Previous">${icon('left')}</button><button class="stage-nav next" type="button" data-step="1" aria-label="Next">${icon('right')}</button>` : '';
    $('#stageView').innerHTML = (s.type === 'video'
      ? `<video src="${s.src}" controls autoplay muted loop playsinline></video>`
      : `<img src="${s.src}" alt="">`) + nav;
    $$('#thumbs button').forEach((b, j) => b.setAttribute('aria-current', String(j === idx)));
  }
  function openProject(id) {
    const p = PROJECTS.find(x => x.id === id);
    if (!p) return;
    slides = [...(p.video ? [{ type: 'video', src: p.video }] : []), ...p.gallery.map(src => ({ type: 'img', src }))];
    $('#thumbs').hidden = slides.length < 2;
    $('#thumbs').innerHTML = slides.map((s, i) => s.type === 'video'
      ? `<button type="button" class="vid" data-go="${i}" aria-label="video">▶ demo</button>`
      : `<button type="button" data-go="${i}" aria-label="image ${i + 1}"><img src="${s.src}" alt="" loading="lazy"></button>`).join('');
    $('#modalInfo').innerHTML = `
      <div class="card-top"><span class="kind">${t().kinds[p.kind]}</span><span class="year">${p.year}</span></div>
      <h3 id="modalTitle">${p.title}</h3>
      <p>${pick(p.desc)}</p>
      <ul>${pick(p.points).map(x => `<li>${x}</li>`).join('')}</ul>
      <div class="tags">${p.tags.map(x => `<span class="tag">${x}</span>`).join('')}</div>
      <a class="btn btn-primary" href="${p.repo}" target="_blank" rel="noopener">${icon('github')}${t().code}</a>`;
    show(0);
    modal.showModal();
  }
  document.addEventListener('click', e => {
    const o = e.target.closest('[data-open]'); if (o) return openProject(o.dataset.open);
    const st = e.target.closest('[data-step]'); if (st) return show(idx + +st.dataset.step);
    const go = e.target.closest('[data-go]'); if (go) return show(+go.dataset.go);
  });
  $('#modalClose').addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
  modal.addEventListener('close', () => { $('#stageView').innerHTML = ''; });
  modal.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
  });

  /* ============ reveal + counters + nav state ============ */
  const revealObs = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }) : null;
  function observeReveal(els) { els.forEach(el => revealObs ? revealObs.observe(el) : el.classList.add('visible')); }
  observeReveal($$('.reveal'));

  const fmt = n => n.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US');
  function count(el) {
    const to = +el.dataset.to;
    if (reduceMotion) { el.textContent = fmt(to); return; }
    const t0 = performance.now();
    const tick = now => {
      const k = Math.min(1, (now - t0) / 1400);
      el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  const countObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { count(e.target); countObs.unobserve(e.target); }
  }), { threshold: 0.8 });
  $$('.count').forEach(el => countObs.observe(el));

  const nav = $('#nav'), sections = $$('main section[id]'), links = $$('.nav-links a');
  function onScroll() {
    nav.classList.toggle('scrolled', scrollY > 8);
    let cur = '';
    sections.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * 0.3) cur = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ============ mobile menu ============ */
  const menuBtn = $('#menuBtn'), navLinks = $('#navLinks');
  const setMenu = open => { menuBtn.setAttribute('aria-expanded', String(open)); navLinks.classList.toggle('open', open); };
  menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  navLinks.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ============ copy email ============ */
  const toast = $('#toast');
  const say = msg => { toast.textContent = msg; toast.classList.add('show'); clearTimeout(say.t); say.t = setTimeout(() => toast.classList.remove('show'), 2000); };
  $('#emailBig').addEventListener('click', e => {
    if (!navigator.clipboard) return;
    e.preventDefault();
    navigator.clipboard.writeText('belmouaddine.ptech@gmail.com').then(() => say(t().copied), () => { location.href = 'mailto:belmouaddine.ptech@gmail.com'; });
  });

  /* ============ terminal ============ */
  const out = $('#termOut'), input = $('#termInput');
  const CHIPS = ['help', 'whoami', 'internship', 'projects', 'cv', 'coffee', 'joke', 'sudo'];
  const ALL = CHIPS.concat(['stack', 'contact', 'github', 'linkedin', 'lang', 'clear']);
  const history = []; let hi = 0;
  const line = (html, cls = 'out') => { const d = document.createElement('div'); d.className = cls; d.innerHTML = html; out.appendChild(d); out.scrollTop = out.scrollHeight; };
  const openUrl = url => setTimeout(() => window.open(url, '_blank', 'noopener'), 450);
  function run(raw) {
    const cmd = raw.trim().toLowerCase(), T = t().term;
    line(esc(raw), 'cmd');
    if (!cmd) return;
    history.push(raw); hi = history.length;
    switch (cmd) {
      case 'help': line(esc(T.help)); break;
      case 'whoami': line(esc(T.whoami)); break;
      case 'internship': case 'stage': line(esc(T.internship), 'ok'); break;
      case 'projects': case 'ls': line(esc(T.projects)); setTimeout(() => $('#projects').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }), 700); break;
      case 'stack': case 'skills': line(esc(T.stack)); break;
      case 'cv': line(esc(T.cv)); openUrl('assets/CV-Meryem-Belmouaddine.pdf'); break;
      case 'contact': line('<a href="mailto:belmouaddine.ptech@gmail.com">belmouaddine.ptech@gmail.com</a>  ·  <a href="https://www.linkedin.com/in/meryem-belmouaddine" target="_blank" rel="noopener">linkedin</a>'); break;
      case 'github': line(esc(T.github)); openUrl('https://github.com/miaaa3'); break;
      case 'linkedin': line(esc(T.linkedin)); openUrl('https://www.linkedin.com/in/meryem-belmouaddine'); break;
      case 'lang': line(esc(T.lang)); setTimeout(() => setLang(lang === 'en' ? 'fr' : 'en'), 500); break;
      case 'coffee': line(esc(T.coffee)); break;
      case 'joke': line(esc(T.jokes[Math.floor(Math.random() * T.jokes.length)])); break;
      case 'clear': out.innerHTML = ''; break;
      default:
        if (cmd.startsWith('sudo')) line(esc(T.sudo), 'err');
        else line(esc(T.notFound.replace('{cmd}', cmd.split(' ')[0])), 'err');
    }
  }
  $('#termForm').addEventListener('submit', e => { e.preventDefault(); run(input.value); input.value = ''; });
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && hi > 0) { input.value = history[--hi]; e.preventDefault(); }
    else if (e.key === 'ArrowDown') { hi = Math.min(history.length, hi + 1); input.value = history[hi] || ''; }
    else if (e.key === 'Tab' && input.value) {
      const m = ALL.find(c => c.startsWith(input.value.toLowerCase()));
      if (m) { input.value = m; e.preventDefault(); }
    }
  });
  $('#termChips').innerHTML = CHIPS.map(c => `<button type="button" data-cmd="${c}">${c}</button>`).join('');
  $('#termChips').addEventListener('click', e => { const b = e.target.closest('[data-cmd]'); if (b) run(b.dataset.cmd); });
  function termWelcome() { out.innerHTML = ''; line(t().term.welcome); }
  // The first time the terminal scrolls into view, it types a command by itself.
  let demoed = false;
  new IntersectionObserver((es, obs) => es.forEach(e => {
    if (!e.isIntersecting || demoed) return;
    demoed = true; obs.disconnect();
    if (reduceMotion) { run('whoami'); return; }
    const cmd = 'whoami'; let i = 0;
    const tick = () => { input.value = cmd.slice(0, ++i); if (i < cmd.length) setTimeout(tick, 110); else setTimeout(() => { run(cmd); input.value = ''; }, 350); };
    setTimeout(tick, 500);
  }), { threshold: 0.6 }).observe($('.terminal'));

  /* ============ i18n ============ */
  const EN = {};
  $$('[data-i18n]').forEach(el => { EN[el.dataset.i18n] = el.innerHTML; });
  function setLang(l) {
    lang = l === 'fr' ? 'fr' : 'en';
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => {
      const v = lang === 'fr' ? window.I18N_FR[el.dataset.i18n] : EN[el.dataset.i18n];
      if (v !== undefined) el.innerHTML = v;
    });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $$('.count').forEach(el => { el.textContent = fmt(+el.dataset.to); });
    store.set('lang', lang);
    renderProjects();
    typeCode();
    termWelcome();
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  $('#year').textContent = new Date().getFullYear();
  setLang(store.get('lang') || ((navigator.language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en'));
})();
