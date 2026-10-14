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

  let lang = 'en';
  const t = () => window.UI[lang];
  const pick = v => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[lang] || v.en) : v;

  /* ---------- the city ---------- */
  const readout = $('#cityReadout');
  let stats = [700, 60, 0];
  function showStats(n, fps, jams) {
    stats = [n, fps, jams];
    const extra = jams ? ` · ${t().jam(jams)}` : n >= 3000 ? ` · ${t().rush}` : '';
    readout.textContent = `${t().cars(n)} · ${fps} fps${extra}`;
  }
  const slider = $('#carCount');
  if (matchMedia('(max-width: 900px)').matches) slider.value = 400;
  City.init($('#cityCanvas'), { count: +slider.value, onStats: showStats });
  City.show('casablanca');
  slider.addEventListener('input', () => City.setCount(+slider.value));
  $$('.city-tabs [data-city]').forEach(b => b.addEventListener('click', () => {
    $$('.city-tabs [data-city]').forEach(x => x.setAttribute('aria-selected', String(x === b)));
    City.show(b.dataset.city);
  }));

  /* ---------- work strips ---------- */
  let filter = 'all';
  function renderWork() {
    $('#strips').innerHTML = PROJECTS.map(p => `
      <button type="button" class="strip" data-open="${p.id}" data-cat="${p.cat}" aria-label="${esc(p.title)}">
        <span class="strip-row">${p.strip.map(([src, w]) => src.endsWith('.mp4')
          ? `<video src="assets/strips/${src}" poster="assets/strips/${src.replace('.mp4', '.jpg')}" width="${w / 2}" height="190" muted loop playsinline preload="none" aria-hidden="true"></video>`
          : `<img src="assets/strips/${src}" width="${w / 2}" height="190" alt="" loading="lazy" decoding="async">`).join('')}</span>
        <span class="strip-cap"><span class="n">${p.title}</span><span class="d">${esc(pick(p.short))}</span><span class="y">${p.year}</span></span>
      </button>`).join('');
    applyFilter(filter);
    rise($$('.strip'));
    if (!reduce) $$('.strip video').forEach(v => new IntersectionObserver(es => {
      if (es[0].isIntersecting) v.play().catch(() => {}); else v.pause();
    }, { threshold: 0.3 }).observe(v));
  }
  function applyFilter(f) {
    filter = f;
    $$('.filters button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === f)));
    $$('.strip').forEach(s => s.classList.toggle('hidden', !(f === 'all' || s.dataset.cat.split(' ').includes(f))));
  }
  $$('.filters button').forEach(b => b.addEventListener('click', () => applyFilter(b.dataset.filter)));

  /* ---------- project sheet ---------- */
  const sheet = $('#sheet');
  function openProject(id) {
    const p = PROJECTS.find(x => x.id === id);
    if (!p) return;
    $('#sheetMedia').innerHTML =
      (p.video ? `<video src="${p.video}" poster="${p.cover}" controls muted loop playsinline autoplay></video>` : '') +
      p.gallery.map(src => `<img src="${src}" alt="" loading="lazy">`).join('');
    $('#sheetText').innerHTML = `
      <h3 id="sheetTitle">${p.title}</h3>
      <p class="meta">${esc(pick(p.role))} · ${p.year}</p>
      <p>${pick(p.desc)}</p>
      <div class="figs">${p.figures.map(f => `<div><b>${esc(pick(f.v))}</b><span>${esc(pick(f.l))}</span></div>`).join('')}</div>
      <ul>${pick(p.points).map(x => `<li>${x}</li>`).join('')}</ul>
      <p class="stack">${p.tags.join(', ')}</p>
      <a class="button" href="${p.repo}" target="_blank" rel="noopener">${t().code}</a>`;
    sheet.showModal();
  }
  document.addEventListener('click', e => { const o = e.target.closest('[data-open]'); if (o) openProject(o.dataset.open); });
  $('#sheetClose').addEventListener('click', () => sheet.close());
  sheet.addEventListener('click', e => { if (e.target === sheet) sheet.close(); });
  sheet.addEventListener('close', () => { $('#sheetMedia').innerHTML = ''; });

  /* ---------- entrances ---------- */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
  }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }) : null;
  function rise(els) {
    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 75}ms`;
      io ? io.observe(el) : el.classList.add('in');
    });
  }
  rise($$('.rise'));

  /* ---------- terminal easter egg ---------- */
  const term = $('#term'), out = $('#termOut'), input = $('#termInput');
  const print = (html, cls) => { out.insertAdjacentHTML('beforeend', (cls ? `<${cls}>${html}</${cls}>` : html) + '\n'); out.scrollTop = out.scrollHeight; };
  function openTerm() {
    if (term.open) return;
    out.innerHTML = '';
    print(t().term.welcome);
    term.showModal();
    input.focus();
  }
  function run(raw) {
    const cmd = raw.trim().toLowerCase(), T = t().term;
    print(`<i>$</i> ${esc(raw)}`);
    if (!cmd) return;
    const open = url => setTimeout(() => window.open(url, '_blank', 'noopener'), 400);
    switch (cmd) {
      case 'help': print(T.help); break;
      case 'whoami': print(esc(T.whoami)); break;
      case 'internship': case 'stage': print(esc(T.internship), 'b'); break;
      case 'projects': case 'ls': print(esc(T.projects)); break;
      case 'cities': print(esc(T.cities)); break;
      case 'cv': print(esc(T.cv)); open('assets/CV-Meryem-Belmouaddine.pdf'); break;
      case 'contact': print(T.contact); break;
      case 'coffee': print(esc(T.coffee)); break;
      case 'joke': print(esc(T.jokes[Math.floor(Math.random() * T.jokes.length)])); break;
      case 'lang': print(esc(T.lang)); setTimeout(() => setLang(lang === 'en' ? 'fr' : 'en'), 400); break;
      case 'clear': out.innerHTML = ''; break;
      case 'exit': case 'quit': term.close(); break;
      default: print(esc(cmd.startsWith('sudo') ? T.sudo : T.notFound.replace('{cmd}', cmd.split(' ')[0])), 'i');
    }
  }
  $('#termForm').addEventListener('submit', e => { e.preventDefault(); run(input.value); input.value = ''; });
  $('#openTerm').addEventListener('click', openTerm);
  term.addEventListener('click', e => { if (e.target === term) term.close(); });
  addEventListener('keydown', e => {
    const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
    if ((e.key === '`' || e.key === '²') && !typing) { e.preventDefault(); openTerm(); }
  });

  /* ---------- language ---------- */
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
    renderWork();
    showStats(...stats);
  }
  $('#langLink').addEventListener('click', () => setLang(lang === 'en' ? 'fr' : 'en'));

  $('#year').textContent = new Date().getFullYear();
  setLang(store.get('lang') || ((navigator.language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en'));
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('loaded')));
})();
