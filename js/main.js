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

  /* =============== game: XP, levels, achievements =============== */
  const ACH = ['boot', 'project', 'drag', 'log', 'term', 'sudo', 'lang', 'contact'];
  const ICON = { boot: '✿', project: '{}', drag: '✦', log: '⎇', term: '>_', sudo: '#', lang: 'FR', contact: '✉' };
  let done = new Set(JSON.parse(store.get('mia-ach') || '[]').filter(a => ACH.includes(a)));
  const toast = $('#toast'); const queue = []; let showing = false;
  function nextToast() {
    if (showing || !queue.length) return;
    showing = true;
    const [icon, small, text] = queue.shift();
    toast.innerHTML = `<b class="ic2">${icon}</b><span><small>${small}</small>${text}</span>`;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => { showing = false; nextToast(); }, 400); }, 2600);
  }
  const level = () => Math.min(5, 1 + Math.floor(done.size / 2));
  function renderGame(bumped) {
    $('#achCount').textContent = `${done.size}/${ACH.length}`;
    $('#achList').innerHTML = ACH.map(a => {
      const [name, how] = t().ach[a];
      return `<li class="${done.has(a) ? 'done' : ''}${bumped === a ? ' just' : ''}"><b>${done.has(a) ? '✓' : ICON[a]}</b><span>${done.has(a) ? esc(name) : '???'}<br><small style="color:var(--faint)">${esc(how)}</small></span></li>`;
    }).join('');
    const xp = done.size * 125;
    $('#xpFill').style.width = `${(done.size / ACH.length) * 100}%`;
    $('#xpText').textContent = `${xp} XP`;
    $('#lvl').textContent = `Lv ${level()} · ${t().levels[level() - 1]}`;
  }
  function unlock(a) {
    if (done.has(a)) return;
    const before = level();
    done.add(a);
    store.set('mia-ach', JSON.stringify([...done]));
    renderGame(a);
    const [name] = t().ach[a];
    queue.push([ICON[a], t().unlocked, esc(name)]);
    if (level() > before) {
      queue.push(['★', t().levelUp(level()), esc(t().levels[level() - 1])]);
      const xp = $('.xp'); xp.classList.remove('bump'); void xp.offsetWidth; xp.classList.add('bump');
    }
    if (done.size === ACH.length) queue.push(['♛', 'GG', esc(t().final)]);
    nextToast();
  }

  /* =============== projects =============== */
  let filter = 'all';
  function renderProjects() {
    $('#projectFiles').innerHTML = PROJECTS.map(p => `<a class="file" href="#p-${p.id}"><b class="ic ${p.ic}">${p.ic === 'ts' ? 'TS' : 'C++'}</b>${p.file}</a>`).join('');
    $('#projectList').innerHTML = PROJECTS.map((p, i) => {
      const first = p.strip[0][0];
      const media = first.endsWith('.mp4')
        ? `<video src="assets/strips/${first}" poster="assets/strips/${first.replace('.mp4', '.jpg')}" muted loop playsinline preload="none"></video>`
        : `<img src="assets/strips/${first}" alt="" loading="lazy" decoding="async">`;
      return `
      <article class="project rise" id="p-${p.id}" data-cat="${p.cat}">
        <button type="button" class="shot" data-open="${p.id}" style="--r:${i % 2 ? 2.5 : -2.5}deg" aria-label="${esc(p.title)}: ${t().details}">
          <span class="level">${esc(pick(p.level))}</span>
          <span class="polaroid">${media}<span class="cap">${esc(pick(p.short))}</span>${p.video ? `<span class="play">${t().demo}</span>` : ''}</span>
        </button>
        <div class="pcard">
          <div class="pcard-tab"><span>${p.file}</span><span>${p.year}</span></div>
          <div class="pcard-body">
            <p class="role">${esc(pick(p.role))}</p>
            <h3>${p.title}</h3>
            <p class="desc">${pick(p.desc)}</p>
            <div class="figs">${p.figures.map(f => `<div class="fig"><b>${esc(pick(f.v))}</b><span>${esc(pick(f.l))}</span></div>`).join('')}</div>
            <div class="tags">${p.tags.map(x => `<span class="tag">${x}</span>`).join('')}</div>
            <div class="actions">
              <button type="button" class="btn btn-violet" data-open="${p.id}">${t().details} →</button>
              <a class="btn btn-ghost" href="${p.repo}" target="_blank" rel="noopener">${t().code} ↗</a>
            </div>
          </div>
        </div>
      </article>`;
    }).join('');
    applyFilter(filter);
    rise($$('#projectList .rise'));
    if (!reduce) $$('#projectList video').forEach(v => new IntersectionObserver(es => {
      if (es[0].isIntersecting) v.play().catch(() => {}); else v.pause();
    }, { threshold: .4 }).observe(v));
  }
  function applyFilter(f) {
    filter = f;
    $$('.filters button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === f)));
    $$('.project').forEach(el => el.classList.toggle('hidden', !(f === 'all' || el.dataset.cat.split(' ').includes(f))));
  }
  $$('.filters button').forEach(b => b.addEventListener('click', () => applyFilter(b.dataset.filter)));

  /* =============== project sheet =============== */
  const sheet = $('#sheet');
  function openProject(id) {
    const p = PROJECTS.find(x => x.id === id);
    if (!p) return;
    $('#sheetTab').textContent = p.file;
    $('#sheetMedia').innerHTML = (p.video ? `<video src="${p.video}" poster="${p.cover}" controls muted loop playsinline autoplay></video>` : '')
      + p.gallery.map(src => `<img src="${src}" alt="" loading="lazy">`).join('');
    $('#sheetText').innerHTML = `
      <span class="level" style="position:static;display:inline-block;margin-bottom:14px">${esc(pick(p.level))}</span>
      <h3 id="sheetTitle">${p.title}</h3>
      <p class="role">${esc(pick(p.role))} · ${p.year}</p>
      <p>${pick(p.desc)}</p>
      <div class="figs">${p.figures.map(f => `<div class="fig"><b>${esc(pick(f.v))}</b><span>${esc(pick(f.l))}</span></div>`).join('')}</div>
      <ul>${pick(p.points).map(x => `<li>${x}</li>`).join('')}</ul>
      <div class="tags">${p.tags.map(x => `<span class="tag">${x}</span>`).join('')}</div>
      <a class="btn btn-violet" href="${p.repo}" target="_blank" rel="noopener">${t().code} ↗</a>`;
    sheet.showModal();
    unlock('project');
  }
  document.addEventListener('click', e => { const o = e.target.closest('[data-open]'); if (o) openProject(o.dataset.open); });
  $('#sheetClose').addEventListener('click', () => sheet.close());
  sheet.addEventListener('click', e => { if (e.target === sheet) sheet.close(); });
  sheet.addEventListener('close', () => { $('#sheetMedia').innerHTML = ''; });

  /* =============== draggable stickers =============== */
  const desk = $('#desk');
  $$('.drag', desk).forEach(el => {
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
      const maxX = desk.clientWidth - el.offsetWidth * .4, maxY = desk.clientHeight - el.offsetHeight * .4;
      el.style.left = `${Math.max(-el.offsetWidth * .4, Math.min(maxX, ox + dx))}px`;
      el.style.top = `${Math.max(-20, Math.min(maxY, oy + dy))}px`;
    });
    const end = () => { el.classList.remove('dragging'); if (moved) unlock('drag'); };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    el.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; } });
  });

  /* =============== explorer, tab, status bar =============== */
  const sections = $$('[data-file]');
  const fileLinks = () => $$('.explorer a.file');
  function onScroll() {
    let cur = sections[0];
    sections.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .35) cur = s; });
    $('#currentTab').textContent = cur.dataset.file;
    fileLinks().forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur.id));
    const h = document.documentElement, k = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    $('#sbLine').textContent = `Ln ${Math.round(h.scrollTop / 24) + 1}, Col ${Math.round(k * 80) + 1}`;
    $('#sbCoffee').textContent = `☕ ${Math.max(3, Math.round(100 - k * 97))}%`;
  }
  addEventListener('scroll', onScroll, { passive: true });

  /* =============== entrances + section achievements =============== */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 }) : null;
  function rise(els) { els.forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 70}ms`; io ? io.observe(el) : el.classList.add('in'); }); }
  rise($$('.commit, .about-text, .polaroid.big, .json, .contact > *'));
  $$('.commit, .about-text, .polaroid.big, .json, .contact > *').forEach(el => el.classList.add('rise'));
  const watch = (el, a) => el && new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { unlock(a); o.disconnect(); } }, { threshold: .6 }).observe(el);
  watch($('.commit.root'), 'log');
  watch($('.email'), 'contact');

  /* =============== terminal =============== */
  const term = $('#term'), out = $('#termOut'), input = $('#termInput');
  const print = (html, cls) => { out.insertAdjacentHTML('beforeend', `<span${cls ? ` class="${cls}"` : ''}>${html}</span>\n`); out.scrollTop = out.scrollHeight; };
  function openTerm() {
    if (term.open) return;
    out.innerHTML = ''; print(t().term.welcome);
    term.showModal(); input.focus();
    unlock('term');
  }
  function run(raw) {
    const cmd = raw.trim().toLowerCase(), T = t().term;
    print(`<span class="p">mia@mulhouse</span> ~/portfolio $ ${esc(raw)}`);
    if (!cmd) return;
    const open = url => setTimeout(() => window.open(url, '_blank', 'noopener'), 400);
    if (cmd.startsWith('sudo')) { print(esc(T.sudo), 'r'); unlock('sudo'); return; }
    switch (cmd) {
      case 'help': print(T.help); break;
      case 'whoami': print(esc(T.whoami)); break;
      case 'internship': case 'stage': print(esc(T.internship), 'y'); break;
      case 'ls': print(esc(T.ls)); break;
      case 'projects': case 'ls projects': print(esc(T.projects)); break;
      case 'cv': print(esc(T.cv)); open('assets/CV-Meryem-Belmouaddine.pdf'); break;
      case 'contact': print(T.contact); break;
      case 'coffee': print(esc(T.coffee)); break;
      case 'joke': print(esc(T.jokes[Math.floor(Math.random() * T.jokes.length)])); break;
      case 'achievements': print(ACH.map(a => `${done.has(a) ? '[x]' : '[ ]'} ${done.has(a) ? t().ach[a][0] : '???'}`).join('\n')); break;
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
  const mq = $('#marquee'); mq.innerHTML += mq.innerHTML; // duplicate for a seamless loop
  const EN = {};
  $$('[data-i18n]').forEach(el => { EN[el.dataset.i18n] = el.innerHTML; });
  function setLang(l, silent) {
    lang = l === 'fr' ? 'fr' : 'en';
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => {
      const v = lang === 'fr' ? window.I18N_FR[el.dataset.i18n] : EN[el.dataset.i18n];
      if (v !== undefined) el.innerHTML = v;
    });
    store.set('lang', lang);
    renderProjects(); renderGame(); onScroll();
    if (!silent) unlock('lang');
  }
  $('#langBtn').addEventListener('click', () => setLang(lang === 'en' ? 'fr' : 'en'));

  setLang(store.get('lang') || ((navigator.language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en'), true);
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('loaded')));
  setTimeout(() => unlock('boot'), 1400);
})();
