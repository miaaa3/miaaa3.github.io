/* Mia OS · shared by the home page, the case-study pages and the 404 page. */
document.documentElement.classList.add('js');
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wide = matchMedia('(min-width: 1101px) and (pointer: fine)');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
  };
  const root = document.body.dataset.root || '';
  const caseId = document.body.dataset.case;
  const PROJECTS = window.PROJECTS || [], CASES = window.CASES || {};
  let lang = 'en';
  const t = () => window.UI[lang];
  const pick = v => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[lang] || v.en) : v;
  const caseUrl = p => `${root}work/${CASES[p.id].slug}/`;
  const strip = html => String(html).replace(/<[^>]+>/g, '');

  /* status-bar messages: one line, replaced, fades after a few seconds */
  let msgTimer;
  function say(text) {
    const m = $('#sbMsg');
    if (!m) return;
    m.textContent = text; m.classList.add('on');
    clearTimeout(msgTimer); msgTimer = setTimeout(() => m.classList.remove('on'), 4200);
  }

  /* =============== dialogs shared by every page =============== */
  document.body.insertAdjacentHTML('beforeend', `
<dialog class="term" id="term" aria-labelledby="termTitle">
  <div class="term-bar"><span class="lights" aria-hidden="true"><i></i><i></i><i></i></span><span id="termTitle">mia@mulhouse: ~/portfolio</span><button type="button" id="termClose" aria-label="Close">×</button></div>
  <pre class="term-out" id="termOut" aria-live="polite"></pre>
  <form class="term-in" id="termForm" autocomplete="off"><label for="termInput">mia@mulhouse ~ $</label><input id="termInput" type="text" spellcheck="false" autocapitalize="off" enterkeyhint="send"></form>
</dialog>
<dialog class="bugrep" id="bugrep" aria-labelledby="bugTitle">
  <p class="bug-title" id="bugTitle"></p>
  <pre class="bug-body" id="bugBody"></pre>
  <button type="button" class="btn btn-ghost" id="bugClose"></button>
</dialog>`);

  /* =============== home: projects =============== */
  const figs = p => `<div class="figs">${p.figures.map(f => `<div class="fig"><b>${esc(pick(f.v))}</b><span>${esc(pick(f.l))}</span></div>`).join('')}</div>`;
  const info = p => `
    <div class="proj-info">
      <p class="label">${esc(pick(p.label))}</p>
      <h3><a href="${caseUrl(p)}">${p.title}</a></h3>
      <p class="role">${esc(pick(p.role))} · ${p.year}</p>
      <p class="desc">${pick(p.desc)}</p>
      ${figs(p)}
      <div class="tags">${p.tags.map(x => `<span class="tag">${x}</span>`).join('')}</div>
      <div class="actions">
        <a class="btn btn-accent" href="${caseUrl(p)}">${t().caseStudy} →</a>
        <a class="btn btn-ghost" href="${p.repo}" target="_blank" rel="noopener">${t().code} ↗</a>
      </div>
    </div>`;
  const bar = (title, extra = '') => `<div class="win-bar"><span class="lights" aria-hidden="true"><i></i><i></i><i></i></span><span class="win-title">${title}</span>${extra}</div>`;
  const shot = (p, src, alt = '') => `<a class="shot" href="${caseUrl(p)}" tabindex="-1"><img src="${root}${src}" alt="${esc(alt)}" loading="lazy" decoding="async"></a>`;

  const SKINS = {
    feature: p => `
      <div class="win proj-media">${bar(`${p.file.replace('.ts', '')}.app`, `<span class="win-meta">demo.mp4</span>`)}
        <a class="shot" href="${caseUrl(p)}" tabindex="-1"><video src="${root}${p.video}" poster="${root}${p.cover}" muted loop playsinline preload="none" aria-hidden="true"></video></a>
      </div>${info(p)}`,
    mission: p => `
      <div class="win proj-media mc">${bar('v2v · mission control', `<span class="win-meta rec">● rec</span>`)}
        <div class="telemetry">${p.figures.map(f => `<span><small>${esc(pick(f.l))}</small><b>${esc(pick(f.v))}</b></span>`).join('')}</div>
        <div class="mc-screen"><span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span><span class="radar" aria-hidden="true"></span>${shot(p, p.cover, 'V2V simulator dashboard')}</div>
      </div>${info(p)}`,
    flashcard: p => `
      <div class="proj-media card-stack"><div class="flash"><p class="flash-tab">set: projects · card 3/7</p><p class="flash-q">${esc(pick(p.short))}</p>${shot(p, 'assets/projects/lingobingo/flashcard.jpg', 'LingoBingo flashcard screen')}</div></div>${info(p)}`,
    chat: p => `
      <div class="win proj-media chat">${bar('messages · helpinghands')}
        <div class="chat-body">
          <p class="bubble them"><small>${esc(t().sections.problem[0])}</small>${strip(pick(CASES[p.id].problem))}</p>
          <p class="bubble me"><small>mia</small>${esc(t().chatFix)} ${esc(pick(p.metric))}.</p>
          <div class="bubble me img">${shot(p, p.cover, 'HelpingHands home page')}</div>
        </div>
      </div>${info(p)}`,
    terminal: p => `
      <div class="win proj-media tty">${bar('zsh · klosnowo')}
        <p class="tty-line"><span class="prompt">$</span> make &amp;&amp; ./klosnowo --vs-ai</p>
        ${shot(p, p.cover, 'Klosnowo board in the terminal')}
      </div>${info(p)}`,
    viewer: p => `
      <div class="win proj-media viewer">${bar('lbp · classifier.cpp')}
        <p class="viewer-ask">${esc(t().lbp.ask)}</p>
        <div class="patches">${['1-free', '2-taken', '3-free', '4-taken'].map(n => `
          <figure class="patch" data-truth="${n.split('-')[1]}"><img src="${root}assets/projects/lbp/patches/${n}.jpg" alt="Parking spot ${n[0]}" loading="lazy" width="200" height="200">
            <figcaption><button type="button" data-guess="free">${t().lbp.free}</button><button type="button" data-guess="taken">${t().lbp.taken}</button></figcaption></figure>`).join('')}
        </div>
        <p class="viewer-out" aria-live="polite"></p>
      </div>${info(p)}`,
    post: p => `
      <div class="proj-media post">
        <div class="post-head"><span class="avatars" aria-hidden="true"><i>MB</i><i>FA</i></span><p><b>Mia &amp; Fattah Amil</b><small>Togetherly · ${p.year}</small></p></div>
        <p class="post-text">${esc(strip(pick(CASES[p.id].problem)))}</p>
        ${shot(p, p.cover, 'Togetherly feed')}
        <button type="button" class="like" aria-pressed="false">${t().like[0]}</button>
      </div>${info(p)}`
  };

  function renderProjects() {
    const list = $('#projectList');
    if (!list) return;
    list.innerHTML = PROJECTS.map(p => `<article class="proj skin-${p.skin}" id="p-${p.id}" style="--accent:var(--${p.accent})">${SKINS[p.skin](p)}</article>`).join('');
    rise($$('.proj', list));
    playWhenVisible($$('video', list));
    $$('.patch', list).forEach(fig => $$('button', fig).forEach(b => b.addEventListener('click', () => {
      const ok = b.dataset.guess === fig.dataset.truth;
      fig.dataset.result = ok ? 'right' : 'wrong';
      $('.viewer-out', fig.closest('.viewer')).textContent = ok ? t().lbp.right : t().lbp.wrong;
    })));
    $$('.like', list).forEach(b => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on)); b.textContent = t().like[on ? 1 : 0];
    }));
  }

  /* =============== case-study page =============== */
  function renderCase() {
    const el = $('#case');
    if (!el || !caseId) return;
    const p = PROJECTS.find(x => x.id === caseId), c = CASES[caseId], S = t().sections;
    const i = PROJECTS.indexOf(p), next = PROJECTS[(i + 1) % PROJECTS.length];
    document.title = `${p.title} · Mia OS`;
    document.body.style.setProperty('--accent', `var(--${p.accent})`);
    let n = 0;
    const head = key => `<p class="case-label"><span class="n">${String(++n).padStart(2, '0')}</span> ${S[key][0]} <span class="aside">// ${S[key][1]}</span></p>`;
    const media = p.video
      ? `<video src="${root}${p.video}" poster="${root}${p.cover}" muted loop playsinline autoplay controls></video>`
      : `<img src="${root}${p.cover}" alt="${esc(p.title)}">`;
    el.innerHTML = `
      <a class="back" href="${root}#projects">← ${t().back}</a>
      <header class="case-hero">
        ${head('mission')}
        <p class="label">${esc(pick(p.label))}</p>
        <h1>${pick(c.headline)}</h1>
        <p class="case-intro">${pick(c.intro)}</p>
        <p class="case-meta">${esc(pick(c.meta))}</p>
        ${figs(p)}
      </header>
      <figure class="win case-media skin-${p.skin}">${bar(p.file, `<span class="win-meta">${p.video ? 'demo.mp4' : 'cover.jpg'}</span>`)}${media}</figure>
      <section class="case-block rise">${head('problem')}<p class="statement">${pick(c.problem)}</p></section>
      <section class="case-block rise">${head('twists')}
        <div class="twists">${c.hard.map((h, k) => `<article><p class="tn">#${k + 1}</p><h3>${esc(pick(h.t))}</h3><p>${esc(pick(h.d))}</p></article>`).join('')}</div></section>
      <section class="case-block rise">${head('solution')}
        <div><ul class="how">${pick(c.how).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <div class="stack" aria-label="${t().stack}">${c.stack.map(([nm, r]) => `<div><b>${esc(nm)}</b><span>${esc(pick(r))}</span></div>`).join('')}</div></div></section>
      ${c.bugs ? `<section class="case-block rise">${head('bugs')}
        <ol class="bugs">${c.bugs.map(b => `<li><p class="bug-tag">fix:</p><div><h3>${esc(pick(b.t))}</h3><p>${pick(b.d)}</p></div></li>`).join('')}</ol></section>` : ''}
      <section class="case-block rise">${head('result')}<p class="statement result">${esc(pick(c.result))}</p></section>
      ${c.improve ? `<section class="case-block rise">${head('improve')}<ul class="todo">${pick(c.improve).map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>` : ''}
      ${p.gallery.length > 1 ? `<section class="case-block rise"><p class="case-label">${S.screens[0]} <span class="aside">// ${S.screens[1]}</span></p>
        <div class="gallery">${p.gallery.slice(1).map(src => `<span class="polaroid"><img src="${root}${src}" alt="${esc(p.title)} screenshot" loading="lazy"></span>`).join('')}</div></section>` : ''}
      <div class="case-links rise"><a class="btn btn-accent" href="${p.repo}" target="_blank" rel="noopener">${t().code} ↗</a><a class="btn btn-ghost" href="${p.repo}#readme" target="_blank" rel="noopener">README ↗</a><a class="btn btn-ghost" href="mailto:belmouaddine.ptech@gmail.com?subject=${encodeURIComponent(p.title)}">${t().ask} ✉</a></div>
      <a class="next-case" href="${caseUrl(next)}" style="--accent:var(--${next.accent})"><span><small>${t().next} · ${esc(pick(next.label))}</small><strong>${next.title}</strong></span><span class="arrow" aria-hidden="true">→</span></a>`;
    rise($$('.rise', el));
    playWhenVisible($$('video', el));
  }

  /* =============== shared helpers =============== */
  function playWhenVisible(videos) {
    if (reduce || !('IntersectionObserver' in window)) return;
    videos.forEach(v => new IntersectionObserver(es => { if (es[0].isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: .35 }).observe(v));
  }
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .08 }) : null;
  function rise(els) { els.forEach((el, k) => { el.classList.add('rise'); el.style.transitionDelay = `${(k % 3) * 80}ms`; io ? io.observe(el) : el.classList.add('in'); }); }
  rise($$('.commit, .about-text > *, .about-desk > *, .json, .contact > *, .section-head > *'));
  if (reduce) $$('.hero video').forEach(v => { v.removeAttribute('autoplay'); v.pause(); });

  /* =============== the desktop (home) =============== */
  const desk = $('#desktop');
  if (desk) {
    let z = 10;
    $$('.win, .note, .drag', desk).forEach(el => {
      const handle = el.matches('.win') ? $('[data-drag]', el) : el;
      let sx, sy, ox, oy, moved = false, active = false;
      handle.addEventListener('pointerdown', e => {
        if (!wide.matches || e.button !== 0 || e.target.closest('button, a')) return;
        active = true; moved = false;
        handle.setPointerCapture(e.pointerId);
        sx = e.clientX; sy = e.clientY; ox = el.offsetLeft; oy = el.offsetTop;
        el.style.zIndex = ++z; el.classList.add('dragging');
      });
      handle.addEventListener('pointermove', e => {
        if (!active) return;
        const dx = e.clientX - sx, dy = e.clientY - sy;
        if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
        el.style.left = `${Math.max(-el.offsetWidth * .3, Math.min(desk.clientWidth - el.offsetWidth * .5, ox + dx))}px`;
        el.style.top = `${Math.max(-30, Math.min(desk.clientHeight - 60, oy + dy))}px`;
      });
      const end = () => { active = false; el.classList.remove('dragging'); };
      handle.addEventListener('pointerup', end);
      handle.addEventListener('pointercancel', end);
      handle.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; } });
      el.addEventListener('pointerdown', () => { el.style.zIndex = ++z; });
    });
    $$('.light-close', desk).forEach(b => b.addEventListener('click', () => {
      const w = b.closest('.win');
      w.classList.add('minimized');
      setTimeout(() => { w.classList.remove('minimized'); say(t().winBack); }, 1100);
    }));
    const nope = $('#nope');
    nope && nope.addEventListener('click', () => {
      nope.classList.remove('shake'); void nope.offsetWidth; nope.classList.add('shake');
      say(t().nope);
    });
  }
  const clock = $('#clock');
  const tick = () => { if (clock) clock.textContent = new Date().toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-GB', { weekday: 'short', hour: '2-digit', minute: '2-digit' }); };
  setInterval(tick, 30000);

  /* =============== status bar: line, coffee, menu highlight =============== */
  let k0 = 0, lastLevel = 100;
  const sections = $$('[data-file]');
  function progress() { const h = document.documentElement; return h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight); }
  function onScroll() {
    const h = document.documentElement, k = progress();
    const line = $('#sbLine'), coffee = $('#sbCoffee');
    if (line) line.textContent = `Ln ${Math.round(h.scrollTop / 24) + 1}, Col ${Math.round(k * 80) + 1}`;
    if (coffee) {
      const level = Math.round(Math.max(3, Math.min(100, 100 - Math.max(0, k - k0) / Math.max(.05, 1 - k0) * 97)));
      coffee.textContent = `☕ ${level}%`;
      coffee.classList.toggle('low', level <= 25);
      for (const th of [75, 50, 25, 8]) if (lastLevel > th && level <= th) say(t().coffee[th]);
      lastLevel = level;
    }
    let cur = '';
    sections.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .35) cur = s.id; });
    $$('.topnav a').forEach(a => a.classList.toggle('active', a.getAttribute('href').endsWith('#' + cur)));
  }
  function refill() { k0 = progress(); lastLevel = 100; onScroll(); say(t().coffee.refill); }
  addEventListener('scroll', onScroll, { passive: true });
  const cup = $('#sbCoffee'); cup && cup.addEventListener('click', refill);

  /* =============== bug report =============== */
  const bugrep = $('#bugrep');
  const bugBtn = $('#bugBtn');
  bugBtn && bugBtn.addEventListener('click', () => {
    $('#bugTitle').textContent = t().bug.title; $('#bugBody').innerHTML = t().bug.body; $('#bugClose').textContent = t().bug.close;
    bugrep.showModal();
  });
  $('#bugClose').addEventListener('click', () => bugrep.close());
  bugrep.addEventListener('click', e => { if (e.target === bugrep) bugrep.close(); });

  /* =============== terminal =============== */
  const term = $('#term'), out = $('#termOut'), input = $('#termInput');
  const history = []; let hi = 0;
  const COMMANDS = ['help', 'whoami', 'internship', 'projects', 'open ', 'git status', 'git log', 'debug', 'coffee', 'joke', 'cv', 'contact', 'lang', 'ls', 'clear', 'exit', 'sudo ', 'hello'];
  const SLUGS = PROJECTS.map(p => [CASES[p.id].slug, p]).concat(PROJECTS.map(p => [p.id, p]));
  const print = (html, cls) => { out.insertAdjacentHTML('beforeend', `<span${cls ? ` class="${cls}"` : ''}>${html}</span>\n`); out.scrollTop = out.scrollHeight; };
  function openTerm() {
    if (term.open) return;
    out.innerHTML = ''; print(t().term.welcome);
    term.showModal(); input.focus();
  }
  function run(raw) {
    const cmd = raw.trim().toLowerCase().replace(/\s+/g, ' '), T = t().term;
    print(`<span class="p">mia@mulhouse ~ $</span> ${esc(raw)}`);
    if (!cmd) return;
    history.push(raw); hi = history.length;
    const later = fn => setTimeout(fn, 450);
    if (cmd.startsWith('sudo')) return print(esc(T.sudo), 'r');
    if (cmd.startsWith('rm ')) return print(esc(T.rm), 'r');
    if (cmd.startsWith('open ') || cmd.startsWith('cd ')) {
      const name = cmd.split(' ')[1].replace(/\/$/, '');
      const hit = SLUGS.find(([s]) => s === name || s.startsWith(name));
      if (!hit) return print(esc(T.noProject.replace('{p}', name)), 'r');
      print(esc(T.opening.replace('{p}', hit[1].title)), 'y');
      return later(() => { location.href = caseUrl(hit[1]); });
    }
    switch (cmd) {
      case 'help': case 'man': print(T.help); break;
      case 'whoami': print(esc(T.whoami)); break;
      case 'internship': case 'stage': case 'hire mia': case 'hire': print(T.internship, 'y'); break;
      case 'git status': print(esc(T.gitStatus)); break;
      case 'git log': case 'git log --oneline': print(esc(T.gitLog)); break;
      case 'debug': print(esc(T.debug)); break;
      case 'ls': print(esc(T.ls)); break;
      case 'projects': case 'ls projects': case 'ls projects/': print(esc(T.projects)); break;
      case 'cv': print(esc(T.cv)); later(() => window.open(`${root}assets/CV-Meryem-Belmouaddine.pdf`, '_blank', 'noopener')); break;
      case 'contact': print(T.contact); break;
      case 'coffee': case 'make coffee': print(esc(T.coffee), 'y'); refill(); break;
      case 'joke': print(esc(T.jokes[Math.floor(Math.random() * T.jokes.length)])); break;
      case 'hello': case 'hi': case 'salut': case 'bonjour': print(esc(T.hello)); break;
      case 'lang': print(esc(T.lang)); later(() => setLang(lang === 'en' ? 'fr' : 'en')); break;
      case 'clear': out.innerHTML = ''; break;
      case 'exit': case 'quit': case ':q': term.close(); break;
      default: print(esc(T.notFound.replace('{cmd}', cmd.split(' ')[0])), 'r');
    }
  }
  $('#termForm').addEventListener('submit', e => { e.preventDefault(); run(input.value); input.value = ''; });
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && hi > 0) { e.preventDefault(); input.value = history[--hi]; }
    else if (e.key === 'ArrowDown') { e.preventDefault(); hi = Math.min(history.length, hi + 1); input.value = history[hi] || ''; }
    else if (e.key === 'Tab') {
      e.preventDefault();
      const v = input.value.toLowerCase();
      const pool = v.startsWith('open ') ? PROJECTS.map(p => 'open ' + CASES[p.id].slug) : COMMANDS;
      const hits = pool.filter(c => c.startsWith(v));
      if (hits.length === 1) input.value = hits[0];
      else if (hits.length > 1) print(esc(hits.join('  ')));
    }
  });
  $('#openTerm').addEventListener('click', openTerm);
  $('#termClose').addEventListener('click', () => term.close());
  term.addEventListener('click', e => { if (e.target === term) term.close(); });
  addEventListener('keydown', e => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if ((e.key === '`' || e.key === '²') && !typing) { e.preventDefault(); openTerm(); }
  });

  /* =============== language =============== */
  const EN = {}, ENA = {};
  $$('[data-i18n]').forEach(el => { EN[el.dataset.i18n] = el.innerHTML; });
  $$('[data-i18n-aria]').forEach(el => { ENA[el.dataset.i18nAria] = el.getAttribute('aria-label'); });
  function setLang(l) {
    lang = l === 'fr' ? 'fr' : 'en';
    document.documentElement.lang = lang;
    const FR = window.I18N_FR;
    $$('[data-i18n]').forEach(el => { const v = lang === 'fr' ? FR[el.dataset.i18n] : EN[el.dataset.i18n]; if (v !== undefined) el.innerHTML = v; });
    $$('[data-i18n-aria]').forEach(el => { const v = lang === 'fr' ? FR[el.dataset.i18nAria] : ENA[el.dataset.i18nAria]; if (v) el.setAttribute('aria-label', v); });
    const lb = $('#langBtn'); if (lb) lb.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en français');
    store.set('lang', lang);
    renderProjects(); renderCase(); tick(); onScroll();
  }
  $('#langBtn').addEventListener('click', () => setLang(lang === 'en' ? 'fr' : 'en'));

  setLang(store.get('lang') || ((navigator.language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en'));
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('loaded')));

  /* for the people who open the console */
  console.log('%c✿ Mia OS', 'font: 700 20px Georgia, serif; color: #F3A9CF');
  console.log('Hello, fellow console-opener. Since you are here: Mia is looking for a 6-month internship from February 2027.\nbelmouaddine.ptech@gmail.com · press ` for the terminal.');
})();
