/* Project data, rendered by main.js. Text fields are { en, fr }.
   label: the joke on the card. skin: how the card is dressed. accent: its colour. */
window.PROJECTS = [
  {
    id: 'nexus', featured: true, cat: 'web graphics', kind: 'master', year: '2026',
    title: 'NexusNexus',
    label: { en: 'the big brain project', fr: 'le projet gros cerveau' }, skin: 'feature', accent: 'mint', file: 'nexusnexus.ts', ic: 'ts',
    short: { en: 'a city, live', fr: 'une ville, en direct' },
    strip: [['nexus/loop.mp4',608],['nexus/4.jpg',754],['nexus/6.jpg',450],['nexus/5.jpg',764],['nexus/3.jpg',608]],
    role: { en: "Master's project · UHA · solo", fr: 'Projet de master · UHA · seule' },
    figures: [{ v: { en: '15,000+', fr: '15 000+' }, l: { en: 'vehicles at 60 FPS', fr: 'véhicules à 60 FPS' } }, { v: '<100 ms', l: { en: 'WebSocket latency', fr: 'latence WebSocket' } }, { v: '~5×', l: { en: 'less data with delta frames', fr: 'moins de données (deltas)' } }],
    desc: {
      en: 'Real-time smart-city traffic platform. Thousands of vehicles drive on the real streets of La Rochelle, streamed live to a WebGL dashboard with neighbourhood analytics.',
      fr: 'Plateforme de trafic de smart city en temps réel. Des milliers de véhicules roulent dans les vraies rues de La Rochelle, diffusés en direct vers un tableau de bord WebGL avec des analyses par quartier.'
    },
    metric: { en: '15,000+ vehicles at 60 FPS, <100 ms latency', fr: '15 000+ véhicules à 60 FPS, latence < 100 ms' },
    points: {
      en: ['<b>15,000+ vehicles</b> at 60 FPS, one instanced WebGL2 draw call per frame', 'Delta-encoded WebSocket frames: <b>about 5× less data</b>, under 100 ms latency', 'A* routing with a route cache and congestion-aware re-routing', 'Scenarios: rush hour, accidents, emergencies, heat-map, 3D view, replay'],
      fr: ['<b>15 000+ véhicules</b> à 60 FPS, un seul appel de rendu WebGL2 instancié par image', 'Trames WebSocket en delta : <b>environ 5× moins de données</b>, latence < 100 ms', 'Routage A* avec cache de routes et contournement des bouchons', 'Scénarios : heure de pointe, accidents, urgences, heatmap, vue 3D, replay']
    },
    tags: ['Angular', 'WebGL2', 'MapLibre', 'Spring Boot', 'Java 21', 'WebSocket'],
    repo: 'https://github.com/miaaa3/nexusnexus',
    video: 'assets/projects/nexus/demo.mp4', cover: 'assets/projects/nexus/cover.jpg',
    gallery: ['assets/projects/nexus/cover.jpg', 'assets/projects/nexus/heatmap.jpg', 'assets/projects/nexus/3d.jpg', 'assets/projects/nexus/iris.jpg']
  },
  {
    id: 'v2v', featured: true, cat: 'graphics systems', kind: 'master', year: '2026',
    title: 'V2V Simulator',
    label: { en: 'a surprisingly serious amount of C++', fr: 'une quantité étonnamment sérieuse de C++' }, skin: 'mission', accent: 'amber', file: 'v2v.cpp', ic: 'cpp',
    short: { en: 'cars that talk', fr: 'des voitures qui se parlent' },
    strip: [['v2v/1.jpg',688],['v2v/4.jpg',306],['v2v/2.jpg',676],['v2v/5.jpg',676],['v2v/3.jpg',676]],
    role: { en: "Master's project · UHA · with M. Chouadra", fr: 'Projet de master · UHA · avec M. Chouadra' },
    figures: [{ v: { en: '19,000', fr: '19 000' }, l: { en: 'vehicles simulated', fr: 'véhicules simulés' } }, { v: '120 FPS', l: { en: 'on a MacBook M2', fr: 'sur MacBook M2' } }, { v: { en: '~3.6 ms', fr: '~3,6 ms' }, l: { en: 'per frame', fr: 'par image' } }],
    desc: {
      en: 'Vehicle-to-vehicle communication simulator in C++/OpenGL. Cars drive on any OpenStreetMap city and form a live radio network you can watch and inspect.',
      fr: 'Simulateur de communication véhicule-à-véhicule en C++/OpenGL. Les voitures roulent sur n’importe quelle ville OpenStreetMap et forment un réseau radio vivant, observable et inspectable.'
    },
    metric: { en: 'goal 2,000 vehicles · reached 19,000 at 120 FPS', fr: 'objectif 2 000 véhicules · atteint 19 000 à 120 FPS' },
    points: {
      en: ['Target was 2,000 vehicles at 60 FPS, reached <b>19,000 at 120 FPS</b>', 'Instanced OpenGL 3.3 rendering and a spatial grid for neighbour queries', 'Map tiles loaded in the background (libcurl worker pool, LRU cache)', 'Multi-hop broadcasts, accidents, emergency vehicles, traffic lights, weather'],
      fr: ['Objectif : 2 000 véhicules à 60 FPS, atteint : <b>19 000 à 120 FPS</b>', 'Rendu OpenGL 3.3 instancié et grille spatiale pour les voisins', 'Tuiles chargées en arrière-plan (pool libcurl, cache LRU)', 'Broadcast multi-saut, accidents, véhicules d’urgence, feux, météo']
    },
    tags: ['C++20', 'OpenGL', 'GLSL', 'Dear ImGui', 'CMake'],
    repo: 'https://github.com/miaaa3/v2v',
    video: 'assets/projects/v2v/demo.mp4', cover: 'assets/projects/v2v/cover.jpg',
    gallery: ['assets/projects/v2v/cover.jpg', 'assets/projects/v2v/inspector.jpg', 'assets/projects/v2v/live.jpg']
  },
  {
    id: 'lingobingo', featured: true, cat: 'web', kind: 'intern', year: '2025',
    title: 'LingoBingo',
    label: { en: 'made for an actual teacher', fr: 'faite pour un vrai prof' }, skin: 'flashcard', accent: 'rose', file: 'lingobingo.ts', ic: 'ts',
    short: { en: 'quizzes, but fun', fr: 'des quiz, mais drôles' },
    strip: [['lingobingo/01-welcome.jpg',608],['lingobingo/10-student-dashboard.jpg',608],['lingobingo/12-flashcard.jpg',608],['lingobingo/02-teacher-dashboard.jpg',608],['lingobingo/08-generate.jpg',608],['lingobingo/13-practice.jpg',608]],
    role: { en: 'Internship · La Rochelle University', fr: 'Stage · La Rochelle Université' },
    figures: [{ v: '2', l: { en: 'sides: teachers and students', fr: 'côtés : profs et étudiants' } }, { v: '1', l: { en: 'Docker command to run it all', fr: 'commande Docker pour tout lancer' } }, { v: '0', l: { en: 'quiz answers sent to the browser', fr: 'réponse envoyée au navigateur' } }],
    desc: {
      en: 'Learning platform built during my internship at La Rochelle University: Quizlet-style flashcards and Kahoot-style live quizzes, for teachers and students.',
      fr: 'Plateforme d’apprentissage réalisée pendant mon stage à La Rochelle Université : cartes mémoire façon Quizlet et quiz en direct façon Kahoot, pour profs et étudiants.'
    },
    metric: { en: 'built for a real English teacher', fr: 'conçue pour un vrai enseignant d\u2019anglais' },
    points: {
      en: ['<b>Auto-translation</b> while writing flashcards, quiz generated from a set in one click', '"Type the translation" practice that forgives typos', 'XP, streaks, badges and a class leaderboard', 'Server-side scoring, JWT auth, whole stack starts with <b>one Docker command</b>'],
      fr: ['<b>Traduction automatique</b> pendant la saisie, quiz généré depuis un set en un clic', 'Mode « tape la traduction » qui pardonne les fautes de frappe', 'XP, séries, badges et classement de la classe', 'Notation côté serveur, auth JWT, toute la stack en <b>une commande Docker</b>']
    },
    tags: ['Angular', 'Tailwind', 'Spring Boot', 'MySQL', 'Docker'],
    repo: 'https://github.com/miaaa3/LingoBingo',
    video: 'assets/projects/lingobingo/demo.mp4', cover: 'assets/projects/lingobingo/cover.jpg',
    gallery: ['assets/projects/lingobingo/cover.jpg', 'assets/projects/lingobingo/student.jpg', 'assets/projects/lingobingo/teacher.jpg', 'assets/projects/lingobingo/flashcard.jpg', 'assets/projects/lingobingo/generator.jpg']
  },
  {
    id: 'helpinghands', featured: true, cat: 'web', kind: 'intern', year: '2023 – 2026',
    title: 'HelpingHands',
    label: { en: 'started at IBM, refused to stay unfinished', fr: 'commencé chez IBM, refuse de rester inachevé' }, skin: 'chat', accent: 'peri', file: 'helpinghands.ts', ic: 'ts',
    short: { en: 'volunteering, as an app', fr: 'le bénévolat, en appli' },
    strip: [['helpinghands/01-welcome.jpg',608],['helpinghands/03-home-feed.jpg',608],['helpinghands/04-opportunities.jpg',608],['helpinghands/05-messages.jpg',608],['helpinghands/08-org-dashboard.jpg',608],['helpinghands/09-admin.jpg',608]],
    role: { en: 'Started at IBM · rebuilt independently', fr: 'Commencé chez IBM · reconstruit ensuite' },
    figures: [{ v: '3', l: { en: 'role dashboards', fr: 'tableaux de bord par rôle' } }, { v: 'Live', l: { en: 'chat over WebSocket', fr: 'chat en WebSocket' } }, { v: 'CI', l: { en: 'GitHub Actions on every push', fr: 'GitHub Actions à chaque push' } }],
    desc: {
      en: 'Volunteering social network started during my IBM internship, then rebuilt. Volunteers find missions and chat with organisations; admins verify and moderate.',
      fr: 'Réseau social du bénévolat commencé pendant mon stage chez IBM, puis reconstruit. Les bénévoles trouvent des missions et discutent avec les associations ; les admins vérifient et modèrent.'
    },
    metric: { en: '3 roles · real-time chat · Stripe donations', fr: '3 rôles · chat temps réel · dons Stripe' },
    points: {
      en: ['Three roles with their own dashboards: volunteer, organisation, admin', 'Real-time chat over WebSocket, saved before it is displayed', 'Follow requests and interest-based recommendations', 'Stripe donations (test mode), Docker + nginx, CI on GitHub Actions'],
      fr: ['Trois rôles avec leurs tableaux de bord : bénévole, association, admin', 'Chat temps réel en WebSocket, enregistré avant d’être affiché', 'Demandes d’abonnement et recommandations selon les centres d’intérêt', 'Dons Stripe (mode test), Docker + nginx, CI GitHub Actions']
    },
    tags: ['Angular', 'Spring Boot', 'Spring Security', 'WebSocket', 'MySQL'],
    repo: 'https://github.com/miaaa3/HelpingHands',
    video: 'assets/projects/helpinghands/demo.mp4', cover: 'assets/projects/helpinghands/cover.jpg',
    gallery: ['assets/projects/helpinghands/cover.jpg', 'assets/projects/helpinghands/feed.jpg', 'assets/projects/helpinghands/opportunities.jpg', 'assets/projects/helpinghands/org.jpg', 'assets/projects/helpinghands/admin.jpg']
  },
  {
    id: 'klosnowo', cat: 'systems', kind: 'school', year: '2026',
    title: 'Klosnowo',
    label: { en: 'zero dependencies, one stubborn AI', fr: 'zéro dépendance, une IA têtue' }, skin: 'terminal', accent: 'mint', file: 'klosnowo.c', ic: 'cpp',
    short: { en: 'a game in C', fr: 'un jeu en C' },
    strip: [['klosnowo/3.jpg',1020],['klosnowo/24.jpg',1020]],
    role: { en: 'School project · ENSISA Immersion 2026', fr: 'Projet d\u2019école · ENSISA Immersion 2026' },
    figures: [{ v: '4', l: { en: 'game modes', fr: 'modes de jeu' } }, { v: 'depth 4', l: { en: 'Minimax + alpha-beta', fr: 'Minimax + alpha-bêta' } }, { v: '0', l: { en: 'dependencies', fr: 'dépendance' } }],
    desc: {
      en: 'Strategy board game in pure C, played in the terminal against a friend, a Minimax AI, or over the network.',
      fr: 'Jeu de plateau de stratégie en C pur, dans le terminal, contre un ami, une IA Minimax ou en réseau.'
    },
    metric: { en: 'Minimax depth 4 · TCP sockets', fr: 'Minimax profondeur 4 · sockets TCP' },
    points: {
      en: ['Pure rules engine with fixed-size arrays, no allocation', 'Minimax with alpha-beta pruning and a hand-tuned evaluation', 'Host / join network mode over TCP'],
      fr: ['Moteur de règles pur, tableaux fixes, aucune allocation', 'Minimax avec élagage alpha-bêta et une évaluation réglée à la main', 'Mode réseau hôte / client en TCP']
    },
    tags: ['C11', 'Minimax', 'Sockets'],
    repo: 'https://github.com/miaaa3/klosnowo',
    video: 'assets/projects/klosnowo/demo.mp4', cover: 'assets/projects/klosnowo/cover.jpg',
    gallery: ['assets/projects/klosnowo/cover.jpg']
  },
  {
    id: 'lbp', cat: 'systems', kind: 'master', year: '2026',
    title: 'LBP Parking Classifier',
    label: { en: 'no neural networks were harmed', fr: 'aucun réseau de neurones n’a été blessé' }, skin: 'viewer', accent: 'amber', file: 'lbp.cpp', ic: 'cpp',
    short: { en: 'free or taken?', fr: 'libre ou occupée ?' },
    strip: [['lbp/1.jpg',710],['lbp/3.jpg',396],['lbp/2.jpg',1378],['lbp/4.jpg',1138]],
    role: { en: "Master's lab · UHA · extended", fr: 'TP de master · UHA · enrichi' },
    figures: [{ v: { en: '94.5%', fr: '94,5 %' }, l: { en: 'accuracy on unseen images', fr: 'de réussite sur images inédites' } }, { v: '6', l: { en: 'distances compared', fr: 'distances comparées' } }, { v: '+2 pts', l: { en: 'from data augmentation', fr: 'grâce à l\u2019augmentation' } }],
    desc: {
      en: 'Computer vision without deep learning: a hand-written texture descriptor decides whether a parking spot is free.',
      fr: 'Vision par ordinateur sans deep learning : un descripteur de texture écrit à la main décide si une place de parking est libre.'
    },
    metric: { en: '94.5% accuracy on unseen images', fr: '94,5 % de réussite sur des images jamais vues' },
    points: {
      en: ['Local Binary Patterns + nearest neighbour in C++/OpenCV', '6 histogram distances and 3 descriptor variants compared', 'Data augmentation: <b>92.5% → 94.5%</b>', 'Bonus: multi-view 3D object recognition on ModelNet10'],
      fr: ['Local Binary Patterns + plus proche voisin en C++/OpenCV', '6 distances d’histogrammes et 3 variantes de descripteur comparées', 'Augmentation de données : <b>92,5 % → 94,5 %</b>', 'Bonus : reconnaissance d’objets 3D multi-vues sur ModelNet10']
    },
    tags: ['C++17', 'OpenCV', 'Python'],
    repo: 'https://github.com/miaaa3/lbp-parking-classifier',
    cover: 'assets/projects/lbp/cover.jpg',
    gallery: ['assets/projects/lbp/cover.jpg', 'assets/projects/lbp/sofa.jpg']
  },
  {
    id: 'togetherly', cat: 'web', kind: 'team', year: '2023',
    title: 'Togetherly',
    label: { en: 'merge conflicts: survived', fr: 'conflits de merge : survécu' }, skin: 'post', accent: 'lilac', file: 'togetherly.ts', ic: 'ts',
    short: { en: 'a social network', fr: 'un réseau social' },
    strip: [['togetherly/1.jpg',668],['togetherly/4.jpg',208],['togetherly/8.jpg',676],['togetherly/5.jpg',178],['togetherly/11.jpg',198]],
    role: { en: 'Team project · with Fattah Amil', fr: 'Projet d\u2019équipe · avec Fattah Amil' },
    figures: [{ v: '3', l: { en: 'roles with JWT', fr: 'rôles avec JWT' } }, { v: 'Live', l: { en: 'chat between friends', fr: 'chat entre amis' } }],
    desc: {
      en: 'Team project with Fattah Amil: a social network with roles, posts, follows that become friendships, and real-time chat.',
      fr: 'Projet d’équipe avec Fattah Amil : un réseau social avec rôles, posts, abonnements qui deviennent des amitiés, et chat temps réel.'
    },
    metric: { en: 'JWT roles · WebSocket chat', fr: 'rôles JWT · chat WebSocket' },
    points: {
      en: ['Role-based access with Spring Security and JWT', 'Mutual follow means friends, friends can chat over WebSocket', 'Responsive Angular UI'],
      fr: ['Accès par rôle avec Spring Security et JWT', 'Abonnement mutuel = amis, les amis discutent en WebSocket', 'Interface Angular responsive']
    },
    tags: ['Angular', 'Spring Boot', 'JWT'],
    repo: 'https://github.com/miaaa3/Togetherly-Angular-Spring-Boot',
    cover: 'assets/projects/togetherly/cover.jpg',
    gallery: ['assets/projects/togetherly/cover.jpg', 'assets/projects/togetherly/profile.jpg']
  }
];
