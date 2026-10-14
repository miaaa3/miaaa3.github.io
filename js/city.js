/* The live city in the hero: real OpenStreetMap streets (assets/cities/*.json,
   extracted from the same .osm files NexusNexus and V2V run on) with small cars
   that drive the graph, choose a turn at every junction and queue in jams. */
window.City = (() => {
  const COLORS = ['#F3A9CF', '#8FE3C8', '#F6C177', '#C9B8F0', '#6E7FD0', '#F4EEFB'];
  const JAM = '#FF8FA3';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let canvas, ctx, roads, dpr = 1, W = 0, H = 0, size = 0;
  let graph = null, cars = [], wanted = 700, jams = [];
  let running = false, visible = true, last = 0, frames = 0, fpsT = 0, fps = 60;
  let onStats = () => {};
  const cache = {};

  async function load(name) {
    if (!cache[name]) cache[name] = fetch(`assets/cities/${name}.json`).then(r => r.json());
    return cache[name];
  }

  function build(data) {
    // Fit the city to the square canvas (cover), keep it centred.
    const s = Math.max(W / data.w, H / data.h);
    const ox = (W - data.w * s) / 2, oy = (H - data.h * s) / 2;
    const n = data.p.length / 2;
    const x = new Float32Array(n), y = new Float32Array(n);
    for (let i = 0; i < n; i++) { x[i] = data.p[2 * i] * s + ox; y[i] = data.p[2 * i + 1] * s + oy; }
    const adj = Array.from({ length: n }, () => []);
    const edges = [];
    for (const way of data.r) {
      const rank = way[0];
      for (let k = 1; k < way.length - 1; k++) {
        const a = way[k], b = way[k + 1];
        if (a === b) continue;
        adj[a].push(b); adj[b].push(a);
        edges.push([a, b, rank]);
      }
    }
    return { n, x, y, adj, edges, data };
  }

  function drawRoads() {
    const g = roads.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = '#141019'; g.fillRect(0, 0, W, H);
    g.lineCap = 'round';
    for (const rank of [1, 2, 3]) {
      g.strokeStyle = rank === 1 ? '#2B2438' : rank === 2 ? '#3A3049' : '#4A3E5C';
      g.lineWidth = rank === 1 ? 1.2 : rank === 2 ? 2 : 3;
      g.beginPath();
      for (const [a, b, r] of graph.edges) {
        if (r !== rank) continue;
        g.moveTo(graph.x[a], graph.y[a]); g.lineTo(graph.x[b], graph.y[b]);
      }
      g.stroke();
    }
  }

  function spawn() {
    const { n, adj } = graph;
    for (let tries = 0; tries < 50; tries++) {
      const a = (Math.random() * n) | 0;
      if (!adj[a].length) continue;
      const b = adj[a][(Math.random() * adj[a].length) | 0];
      return { a, b, t: Math.random(), v: 18 + Math.random() * 34, c: COLORS[(Math.random() * COLORS.length) | 0], stuck: 0 };
    }
    return null;
  }

  function fill() {
    while (cars.length < wanted) { const c = spawn(); if (!c) break; cars.push(c); }
    if (cars.length > wanted) cars.length = wanted;
  }

  function jammed(px, py, now) {
    for (const j of jams) if (now < j.until && (px - j.x) ** 2 + (py - j.y) ** 2 < j.r * j.r) return true;
    return false;
  }

  function step(dt, now) {
    const { x, y, adj } = graph;
    jams = jams.filter(j => now < j.until);
    for (const c of cars) {
      const dx = x[c.b] - x[c.a], dy = y[c.b] - y[c.a];
      const len = Math.hypot(dx, dy) || 1;
      const px = x[c.a] + dx * c.t, py = y[c.a] + dy * c.t;
      if (jammed(px, py, now)) { c.stuck = 1; continue; }
      c.stuck = 0;
      c.t += (c.v * dt) / len;
      while (c.t >= 1) {
        c.t -= 1;
        const options = adj[c.b].filter(k => k !== c.a);
        const next = options.length ? options[(Math.random() * options.length) | 0] : c.a;
        c.a = c.b; c.b = next;
      }
    }
  }

  function render() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(roads, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const { x, y } = graph;
    for (const c of cars) {
      const px = x[c.a] + (x[c.b] - x[c.a]) * c.t, py = y[c.a] + (y[c.b] - y[c.a]) * c.t;
      ctx.fillStyle = c.stuck ? JAM : c.c;
      ctx.fillRect(px - 1.4, py - 1.4, 2.8, 2.8);
    }
    for (const j of jams) {
      ctx.strokeStyle = JAM; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(j.x, j.y, j.r, 0, Math.PI * 2); ctx.stroke();
    }
  }

  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000 || 0);
    last = now;
    if (visible && graph) {
      step(dt, now); render();
      frames++;
      if (now - fpsT > 500) { fps = Math.round((frames * 1000) / (now - fpsT)); frames = 0; fpsT = now; onStats(cars.length, fps, jams.length); }
    }
    requestAnimationFrame(loop);
  }

  function resize() {
    const box = canvas.parentElement.getBoundingClientRect();
    W = Math.round(box.width); H = Math.round(box.height); size = Math.min(W, H);
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = roads.width = W * dpr;
    canvas.height = roads.height = H * dpr;
    ctx = canvas.getContext('2d');
  }

  async function show(name) {
    const data = await load(name);
    resize();
    graph = build(data);
    cars = []; jams = [];
    fill(); drawRoads(); render();
    onStats(cars.length, fps, jams.length);
  }

  function setCount(n) { wanted = n; if (graph) { fill(); if (reduce) render(); onStats(cars.length, fps, jams.length); } }

  function jam(clientX, clientY) {
    const r = canvas.getBoundingClientRect();
    const px = ((clientX - r.left) / r.width) * W, py = ((clientY - r.top) / r.height) * H;
    jams.push({ x: px, y: py, r: Math.max(22, size * 0.07), until: performance.now() + 5000 });
    if (reduce) render();
    onStats(cars.length, fps, jams.length);
  }

  function init(el, opts = {}) {
    canvas = el;
    roads = document.createElement('canvas');
    onStats = opts.onStats || onStats;
    wanted = opts.count || wanted;
    canvas.addEventListener('pointerdown', e => jam(e.clientX, e.clientY));
    new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(canvas);
    let t; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => graph && show(current), 200); });
    if (!reduce) { running = true; requestAnimationFrame(n => { last = n; fpsT = n; loop(n); }); }
  }

  let current = 'casablanca';
  return {
    init,
    show: name => { current = name; return show(name); },
    setCount,
  };
})();
