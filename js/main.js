(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
  };

  let lang = 'en';
  const t = () => window.UI[lang];
  const pick = v => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[lang] || v.en) : v;

  /* ===================== projects ===================== */
  const icon = id => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;

  function projectCard(p, mini) {
    const media = `
      <button type="button" class="p-media" data-open="${p.id}" aria-label="${p.title} — ${t().screens}">
        <img src="${p.cover}" alt="" loading="lazy" decoding="async">
        ${p.video ? `<video muted loop playsinline preload="none" poster="${p.cover}" data-src="${p.video}"></video>` : ''}
        <span class="play-hint">${icon(p.video ? 'play' : 'eye')}<span>${p.video ? t().watch : t().screens}</span></span>
      </button>`;
    const points = mini ? '' : `<ul>${pick(p.points).map(x => `<li>${x}</li>`).join('')}</ul>`;
    return `
      <article class="${mini ? 'mini' : 'project'} reveal" data-cat="${p.cat}" id="p-${p.id}">
        ${media}
        <div class="p-body">
          <span class="kind ${p.kind}">${t().kinds[p.kind]}</span>
          <h3>${p.title}</h3>
          <p class="tagline">${pick(p.tagline)}</p>
          <p>${pick(p.desc)}</p>
          ${points}
          <div class="tag-row">${p.tags.map(x => `<span class="tag">${x}</span>`).join('')}</div>
          <div class="p-links">
            <a class="link-btn" href="${p.repo}" target="_blank" rel="noopener">${icon('github')}${t().code}</a>
            <button type="button" class="link-btn soft" data-open="${p.id}">${icon('eye')}${t().details}</button>
          </div>
        </div>
      </article>`;
  }

  let videoObserver;
  function renderProjects() {
    $('#featured').innerHTML = PROJECTS.filter(p => p.featured).map(p => projectCard(p, false)).join('');
    $('#miniGrid').innerHTML = PROJECTS.filter(p => !p.featured).map(p => projectCard(p, true)).join('');
    applyFilter(currentFilter);
    observeReveal($$('#projects .reveal'));
    setupTilt($$('.mini'));

    // Autoplay previews only while visible (and never when the user prefers less motion).
    if (videoObserver) videoObserver.disconnect();
    if (!reduceMotion && 'IntersectionObserver' in window) {
      videoObserver = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
          const v = $('video', target);
          if (!v) return;
          if (isIntersecting) {
            if (!v.src) v.src = v.dataset.src;
            v.play().then(() => target.classList.add('playing')).catch(() => {});
          } else {
            v.pause();
          }
        });
      }, { threshold: 0.45 });
      $$('.p-media').forEach(m => videoObserver.observe(m));
    }
  }

  let currentFilter = 'all';
  function applyFilter(f) {
    currentFilter = f;
    $$('.filter-row button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === f)));
    $$('.project, .mini').forEach(card => {
      const show = f === 'all' || card.dataset.cat.split(' ').includes(f);
      card.classList.toggle('hidden', !show);
    });
  }
  $$('.filter-row button').forEach(b => b.addEventListener('click', () => applyFilter(b.dataset.filter)));

  /* ===================== modal ===================== */
  const modal = $('#projectModal');
  let slides = [], slideIdx = 0;
  function showSlide(i) {
    slideIdx = (i + slides.length) % slides.length;
    const s = slides[slideIdx];
    $('#modalView').innerHTML = s.type === 'video'
      ? `<video src="${s.src}" controls autoplay muted loop playsinline></video>`
      : `<img src="${s.src}" alt="">`;
    $$('#modalThumbs button').forEach((b, j) => b.setAttribute('aria-current', String(j === slideIdx)));
    const multi = slides.length > 1;
    $('#modalPrev').hidden = !multi; $('#modalNext').hidden = !multi; $('#modalThumbs').hidden = !multi;
  }
  function openProject(id) {
    const p = PROJECTS.find(x => x.id === id);
    if (!p) return;
    slides = [...(p.video ? [{ type: 'video', src: p.video }] : []), ...p.gallery.map(src => ({ type: 'img', src }))];
    $('#modalThumbs').innerHTML = slides.map((s, i) => s.type === 'video'
      ? `<button type="button" class="vid-thumb" aria-label="video">▶</button>`
      : `<button type="button" aria-label="${i + 1}"><img src="${s.src}" alt="" loading="lazy"></button>`).join('');
    $$('#modalThumbs button').forEach((b, i) => b.addEventListener('click', () => showSlide(i)));
    $('#modalInfo').innerHTML = `
      <span class="kind ${p.kind}">${t().kinds[p.kind]}</span>
      <h3 id="modalTitle">${p.title}</h3>
      <p class="tagline">${pick(p.tagline)}</p>
      <p>${pick(p.desc)}</p>
      <ul>${pick(p.points).map(x => `<li>${x}</li>`).join('')}</ul>
      <div class="tag-row">${p.tags.map(x => `<span class="tag">${x}</span>`).join('')}</div>
      <div class="p-links"><a class="link-btn" href="${p.repo}" target="_blank" rel="noopener">${icon('github')}${t().code}</a></div>`;
    showSlide(0);
    modal.showModal();
  }
  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-open]');
    if (opener) openProject(opener.dataset.open);
  });
  $('#modalClose').addEventListener('click', () => modal.close());
  $('#modalPrev').addEventListener('click', () => showSlide(slideIdx - 1));
  $('#modalNext').addEventListener('click', () => showSlide(slideIdx + 1));
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
  modal.addEventListener('close', () => { $('#modalView').innerHTML = ''; });
  modal.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') showSlide(slideIdx + 1);
    if (e.key === 'ArrowLeft') showSlide(slideIdx - 1);
  });

  /* ===================== reveal + counters + timeline ===================== */
  const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 }) : null;
  function observeReveal(els) {
    els.forEach(el => revealObserver ? revealObserver.observe(el) : el.classList.add('visible'));
  }
  observeReveal($$('.reveal'));
  $$('.tab-chip').forEach((el, i) => { el.style.transitionDelay = (i * 0.04) + 's'; });

  function animateCount(el) {
    const to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0);
    const fmt = v => v.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (reduceMotion) { el.textContent = fmt(to); return; }
    const t0 = performance.now(), dur = 1600;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur), eased = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(to * eased);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); countObserver.unobserve(e.target); } });
  }, { threshold: 0.6 });
  $$('.count').forEach(el => countObserver.observe(el));

  const progress = $('#progress'), timeline = $('#timeline'), lineFill = $('#lineFill');
  const sections = $$('main section[id]');
  const navAnchors = $$('.nav-links a');
  function onScroll() {
    const h = document.documentElement;
    progress.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
    const r = timeline.getBoundingClientRect();
    const filled = Math.min(Math.max(innerHeight * 0.6 - r.top, 0), r.height - 12);
    lineFill.style.height = filled + 'px';
    let current = '';
    sections.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * 0.35) current = s.id; });
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ===================== hero ===================== */
  function splitTitle() {
    const h = $('#heroTitle');
    const text = h.textContent;
    h.setAttribute('aria-label', text);
    let i = 0;
    // Letters are wrapped per word so a line never breaks inside a word.
    h.innerHTML = text.split(' ').map(word =>
      `<span class="w">${[...word].map(c =>
        `<span class="ch" aria-hidden="true" style="animation-delay:${0.15 + (i++) * 0.045}s">${c}</span>`).join('')}</span>`
    ).join(' ');
  }

  let typeTimer, lineIndex = 0, charIndex = 0, deleting = false;
  function typeLoop() {
    const lines = t().typed, el = $('#typedText');
    const current = lines[lineIndex % lines.length];
    if (reduceMotion) { el.textContent = current; return; }
    if (!deleting) {
      el.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) { deleting = true; typeTimer = setTimeout(typeLoop, 1900); return; }
    } else {
      el.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) { deleting = false; lineIndex++; }
    }
    typeTimer = setTimeout(typeLoop, deleting ? 26 : 48);
  }
  function restartTyping() { clearTimeout(typeTimer); lineIndex = 0; charIndex = 0; deleting = false; typeLoop(); }

  // magnetic buttons
  if (finePointer && !reduceMotion) {
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ===================== cursor star + sparkle trail ===================== */
  if (finePointer && !reduceMotion) {
    const star = $('#cursorStar');
    let mx = 0, my = 0, cx = 0, cy = 0, last = 0;
    addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY; star.style.opacity = 1;
      const now = performance.now();
      if (now - last > 45) {
        last = now;
        const s = document.createElement('span');
        s.className = 'sparkle-trail';
        s.style.left = mx + 'px'; s.style.top = my + 'px';
        s.style.setProperty('--dx', (Math.random() * 30 - 15) + 'px');
        s.style.setProperty('--dy', (Math.random() * 30 + 5) + 'px');
        s.style.background = Math.random() > 0.5 ? 'var(--rose-deep)' : 'var(--gold)';
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 800);
      }
    });
    document.addEventListener('mouseleave', () => { star.style.opacity = 0; });
    (function loop() {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      star.style.transform = `translate(${cx - 9}px,${cy - 9}px) rotate(${cx * 0.3}deg)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ===================== star fields ===================== */
  function makeStars(id, count) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = Array.from({ length: count }, () => {
      const size = (Math.random() * 2 + 1).toFixed(1);
      return `<div class="star" style="width:${size}px;height:${size}px;top:${(Math.random() * 100).toFixed(1)}%;left:${(Math.random() * 100).toFixed(1)}%;animation-delay:${(Math.random() * 4).toFixed(1)}s"></div>`;
    }).join('');
  }
  makeStars('starField', 80); makeStars('starFieldTalk', 40); makeStars('starFieldFooter', 30);

  // duplicate marquee content for a seamless loop
  const track = $('#marqueeTrack');
  const marqueeBase = track.innerHTML;
  function fillMarquee() { track.innerHTML = marqueeBase + marqueeBase.replace(/data-i18n="[^"]*"/g, ''); }

  /* ===================== tilt (mini cards) ===================== */
  function setupTilt(cards) {
    if (!finePointer || reduceMotion) return;
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -6, ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ===================== mobile menu ===================== */
  const menuBtn = $('#menuBtn'), navLinks = $('#navLinks');
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') !== 'true';
    menuBtn.setAttribute('aria-expanded', String(open));
    navLinks.classList.toggle('open', open);
  });
  navLinks.addEventListener('click', e => {
    if (e.target.closest('a')) { menuBtn.setAttribute('aria-expanded', 'false'); navLinks.classList.remove('open'); }
  });

  /* ===================== toast / email copy ===================== */
  const toast = $('#toast');
  function showToast(msg) { toast.textContent = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1800); }
  $('#emailLink').addEventListener('click', () => {
    if (navigator.clipboard) navigator.clipboard.writeText('belmouaddine.ptech@gmail.com').then(() => showToast(t().copied)).catch(() => {});
  });

  /* ===================== terminal ===================== */
  const termOutput = $('#termOutput'), termInput = $('#termInput');
  const HINTS = ['help', 'whoami', 'internship', 'projects', 'cv', 'contact', 'vibe', 'joke', 'coffee', 'sudo', 'clear'];
  const history = []; let hIdx = 0;
  function printLine(html, cls) {
    const div = document.createElement('div');
    if (cls) div.className = cls;
    div.innerHTML = html;
    termOutput.appendChild(div);
    termOutput.scrollTop = termOutput.scrollHeight;
  }
  const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rand = arr => arr[Math.floor(Math.random() * arr.length)];
  function termWelcome() { termOutput.innerHTML = ''; printLine(t().term.welcome); }
  function handleCommand(raw) {
    const cmd = raw.trim().toLowerCase(), T = t().term;
    printLine('meryem@brain:~$ ' + esc(raw), 'sys');
    if (!cmd) return;
    history.push(raw); hIdx = history.length;
    const open = url => setTimeout(() => window.open(url, '_blank', 'noopener'), 400);
    switch (true) {
      case cmd === 'help': printLine(T.help); break;
      case cmd === 'whoami': printLine(esc(T.whoami)); break;
      case cmd === 'internship' || cmd === 'stage': printLine(esc(T.internship), 'accent'); break;
      case cmd === 'projects' || cmd === 'projets':
        printLine(esc(T.projects)); setTimeout(() => $('#projects').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }), 500); break;
      case cmd === 'skills': printLine(esc(T.skills)); break;
      case cmd === 'cv': printLine(T.cv); open('assets/CV-Meryem-Belmouaddine.pdf'); break;
      case cmd === 'contact': printLine('<a href="mailto:belmouaddine.ptech@gmail.com">belmouaddine.ptech@gmail.com</a> · <a href="https://www.linkedin.com/in/meryem-belmouaddine" target="_blank" rel="noopener">LinkedIn</a>'); break;
      case cmd === 'github': printLine(T.github); open('https://github.com/miaaa3'); break;
      case cmd === 'linkedin': printLine(T.linkedin); open('https://www.linkedin.com/in/meryem-belmouaddine'); break;
      case cmd === 'lang' || cmd === 'fr' || cmd === 'en': printLine(T.lang); setTimeout(() => setLang(lang === 'en' ? 'fr' : 'en'), 500); break;
      case cmd === 'vibe': printLine(esc(rand(T.vibes))); break;
      case cmd === 'joke': printLine(esc(rand(T.jokes))); break;
      case cmd === 'coffee': printLine(esc(T.coffee)); break;
      case cmd === 'tabs': printLine(esc(T.tabs + [...T.tabList].sort(() => 0.5 - Math.random()).slice(0, 4).join(', '))); break;
      case cmd.startsWith('sudo'): printLine(esc(T.sudo), 'accent'); break;
      case cmd === 'clear': termOutput.innerHTML = ''; break;
      default: printLine(esc(T.notFound.replace('{cmd}', cmd)), 'accent');
    }
  }
  $('#termForm').addEventListener('submit', e => { e.preventDefault(); handleCommand(termInput.value); termInput.value = ''; });
  termInput.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && hIdx > 0) { termInput.value = history[--hIdx]; e.preventDefault(); }
    if (e.key === 'ArrowDown') { hIdx = Math.min(history.length, hIdx + 1); termInput.value = history[hIdx] || ''; }
    if (e.key === 'Tab' && termInput.value) {
      const m = HINTS.concat(['skills', 'github', 'linkedin', 'lang', 'tabs']).find(h => h.startsWith(termInput.value.toLowerCase()));
      if (m) { termInput.value = m; e.preventDefault(); }
    }
  });
  $('#termHints').innerHTML = HINTS.map(h => `<button type="button" data-cmd="${h}">${h}</button>`).join(' · ');
  $('#termHints').addEventListener('click', e => {
    const b = e.target.closest('[data-cmd]');
    if (b) { handleCommand(b.dataset.cmd); termInput.focus({ preventScroll: true }); }
  });

  /* ===================== i18n ===================== */
  const EN = {};
  $$('[data-i18n]').forEach(el => { EN[el.dataset.i18n] = el.innerHTML; });
  function setLang(l) {
    lang = l === 'fr' ? 'fr' : 'en';
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = lang === 'fr' ? window.I18N_FR[key] : EN[key];
      if (val !== undefined) el.innerHTML = val;
    });
    $$('.lang-toggle button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    store.set('lang', lang);
    splitTitle();
    fillMarquee();
    renderProjects();
    restartTyping();
    termWelcome();
    $$('.count').forEach(el => { if (el.textContent !== '0') animateCount(el); });
  }
  $$('.lang-toggle button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  $('#year').textContent = new Date().getFullYear();
  const initial = store.get('lang') || ((navigator.language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en');
  setLang(initial);
})();
