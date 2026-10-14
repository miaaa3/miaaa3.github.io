/* Project data — rendered by main.js. Text fields are { en, fr }. */
window.PROJECTS = [
  {
    id: 'nexus',
    featured: true,
    cat: 'web graphics',
    kind: 'master',
    title: 'NexusNexus',
    tagline: { en: '“what if a whole city fit in a browser tab?”', fr: '« et si une ville entière tenait dans un onglet ? »' },
    desc: {
      en: 'Real-time smart-city traffic platform. A Spring Boot simulation routes thousands of vehicles on La Rochelle’s real OpenStreetMap roads and streams them over WebSocket to an Angular + WebGL2 dashboard, with INSEE IRIS neighbourhood analytics on top.',
      fr: 'Plateforme de trafic de smart city en temps réel. Une simulation Spring Boot route des milliers de véhicules sur les vraies routes OpenStreetMap de La Rochelle et les pousse par WebSocket vers un tableau de bord Angular + WebGL2, avec des analyses par quartier INSEE IRIS.'
    },
    points: {
      en: ['<b>15,000+ vehicles</b> at 60 FPS, one instanced WebGL2 draw call per frame', 'Delta-encoded WebSocket frames: <b>~5× less payload</b>, &lt;100 ms latency', 'A* with route cache and congestion-aware re-routing', 'Scenarios: rush hour, accidents, emergencies, heat-map, 3D view, replay'],
      fr: ['<b>15 000+ véhicules</b> à 60 FPS, un seul appel de rendu WebGL2 instancié par image', 'Trames WebSocket en delta : <b>~5× moins de données</b>, latence &lt; 100 ms', 'A* avec cache de routes et contournement des bouchons', 'Scénarios : heure de pointe, accidents, urgences, heatmap, vue 3D, replay']
    },
    tags: ['Angular 17', 'WebGL2', 'MapLibre', 'Spring Boot 3', 'Java 21', 'WebSocket'],
    repo: 'https://github.com/miaaa3/nexusnexus',
    video: 'assets/projects/nexus/demo.mp4',
    cover: 'assets/projects/nexus/cover.jpg',
    gallery: ['assets/projects/nexus/cover.jpg', 'assets/projects/nexus/heatmap.jpg', 'assets/projects/nexus/3d.jpg', 'assets/projects/nexus/iris.jpg']
  },
  {
    id: 'v2v',
    featured: true,
    cat: 'graphics systems',
    kind: 'master',
    title: 'V2V Simulator',
    tagline: { en: '“the cars talk to each other, and I listen”', fr: '« les voitures se parlent, et je les écoute »' },
    desc: {
      en: 'Real-time Vehicle-to-Vehicle communication simulator in modern C++. Vehicles drive on any OpenStreetMap city, route with A*, and form a live radio network with multi-hop broadcasts, accidents and emergency vehicles — all inspectable from a Dear ImGui dashboard.',
      fr: 'Simulateur temps réel de communication véhicule-à-véhicule en C++ moderne. Les véhicules roulent sur n’importe quelle ville OpenStreetMap, se routent en A* et forment un réseau radio vivant (broadcast multi-saut, accidents, véhicules d’urgence), le tout inspectable depuis un dashboard Dear ImGui.'
    },
    points: {
      en: ['Target was 2,000 vehicles at 60 FPS — reached <b>19,000 at 120 FPS</b>', 'Instanced OpenGL 3.3 rendering + uniform spatial grid for neighbour queries', 'Async map tiles (libcurl worker pool, LRU cache), Web Mercator projection', '5 vehicle types, traffic lights, weather, vehicle inspector'],
      fr: ['Objectif : 2 000 véhicules à 60 FPS — atteint : <b>19 000 à 120 FPS</b>', 'Rendu OpenGL 3.3 instancié + grille spatiale pour les voisins', 'Tuiles chargées en asynchrone (pool libcurl, cache LRU), projection Web Mercator', '5 types de véhicules, feux, météo, inspecteur de véhicule']
    },
    tags: ['C++20', 'OpenGL 3.3', 'GLSL', 'Dear ImGui', 'CMake', 'OpenStreetMap'],
    repo: 'https://github.com/miaaa3/v2v',
    video: 'assets/projects/v2v/demo.mp4',
    cover: 'assets/projects/v2v/cover.jpg',
    gallery: ['assets/projects/v2v/cover.jpg', 'assets/projects/v2v/inspector.jpg', 'assets/projects/v2v/live.jpg']
  },
  {
    id: 'lingobingo',
    featured: true,
    cat: 'web',
    kind: 'intern',
    title: 'LingoBingo',
    tagline: { en: '“learning, but make it a video game”', fr: '« apprendre, mais en mode jeu vidéo »' },
    desc: {
      en: 'Built during my internship at La Rochelle University for an English teacher: one app combining Quizlet-style flashcards and Kahoot-style live quizzes. Teachers create courses, flashcards and graded quizzes; students learn, practise and compete.',
      fr: 'Réalisée pendant mon stage à La Rochelle Université pour un enseignant d’anglais : une seule appli qui réunit des cartes mémoire façon Quizlet et des quiz en direct façon Kahoot. Les profs créent cours, flashcards et quiz notés ; les étudiants apprennent, s’entraînent et s’affrontent.'
    },
    points: {
      en: ['<b>Auto-translation</b> while authoring flashcards, quiz generated from a set in one click', 'Duolingo-style “type the translation” practice with typo tolerance', 'XP, streaks, badges and a class leaderboard', 'Server-side scoring, JWT auth, whole stack up with <b>one Docker command</b>'],
      fr: ['<b>Traduction automatique</b> pendant la saisie, quiz généré depuis un set en un clic', 'Mode « tape la traduction » façon Duolingo, tolérant aux fautes de frappe', 'XP, séries, badges et classement de la classe', 'Notation côté serveur, auth JWT, toute la stack en <b>une commande Docker</b>']
    },
    tags: ['Angular', 'Tailwind CSS', 'Spring Boot', 'MySQL', 'Docker'],
    repo: 'https://github.com/miaaa3/LingoBingo',
    video: 'assets/projects/lingobingo/demo.mp4',
    cover: 'assets/projects/lingobingo/cover.jpg',
    gallery: ['assets/projects/lingobingo/cover.jpg', 'assets/projects/lingobingo/student.jpg', 'assets/projects/lingobingo/teacher.jpg', 'assets/projects/lingobingo/flashcard.jpg', 'assets/projects/lingobingo/generator.jpg']
  },
  {
    id: 'helpinghands',
    featured: true,
    cat: 'web',
    kind: 'intern',
    title: 'HelpingHands',
    tagline: { en: '“volunteering, as an app”', fr: '« le bénévolat, version appli »' },
    desc: {
      en: 'Volunteering social network started during my IBM internship, then rebuilt as a full monorepo. Volunteers discover opportunities, apply, follow organisations, chat and donate; organisations manage applicants; admins verify and moderate.',
      fr: 'Réseau social du bénévolat commencé pendant mon stage chez IBM, puis reconstruit en monorepo complet. Les bénévoles trouvent des missions, postulent, suivent des associations, discutent et font des dons ; les associations gèrent leurs candidats ; les admins vérifient et modèrent.'
    },
    points: {
      en: ['Three roles with dedicated dashboards (volunteer, organisation, admin)', 'Real-time chat over STOMP/WebSocket, persisted before it’s shown', 'Instagram-style follow requests and interest-based recommendations', 'Stripe donations (test mode), Docker + nginx, CI on GitHub Actions'],
      fr: ['Trois rôles avec leurs tableaux de bord (bénévole, association, admin)', 'Chat temps réel en STOMP/WebSocket, enregistré avant d’être affiché', 'Abonnements façon Instagram et recommandations selon les centres d’intérêt', 'Dons Stripe (mode test), Docker + nginx, CI GitHub Actions']
    },
    tags: ['Angular', 'Spring Boot', 'Spring Security', 'WebSocket', 'MySQL', 'Stripe'],
    repo: 'https://github.com/miaaa3/HelpingHands',
    video: 'assets/projects/helpinghands/demo.mp4',
    cover: 'assets/projects/helpinghands/cover.jpg',
    gallery: ['assets/projects/helpinghands/cover.jpg', 'assets/projects/helpinghands/feed.jpg', 'assets/projects/helpinghands/opportunities.jpg', 'assets/projects/helpinghands/org.jpg', 'assets/projects/helpinghands/admin.jpg']
  },
  {
    id: 'klosnowo',
    cat: 'systems',
    kind: 'school',
    title: 'Klosnowo',
    tagline: { en: '“chess\u2019s chaotic cousin, in a terminal”', fr: '« le cousin chaotique des échecs, dans un terminal »' },
    desc: {
      en: 'Tafl-style strategy board game in pure C11: local 2-player, a Minimax AI with alpha-beta pruning, or network play over TCP sockets — with an animated ANSI terminal UI.',
      fr: 'Jeu de plateau de stratégie façon Tafl en C11 pur : à deux en local, contre une IA Minimax avec élagage alpha-bêta, ou en réseau via sockets TCP — avec une interface terminal ANSI animée.'
    },
    points: {
      en: ['Pure rules engine with fixed-size arrays, no allocation', 'Minimax depth 4 with a hand-tuned evaluation', 'Host/join network mode over TCP'],
      fr: ['Moteur de règles pur, tableaux fixes, aucune allocation', 'Minimax profondeur 4 avec une évaluation réglée à la main', 'Mode réseau hôte / client en TCP']
    },
    tags: ['C11', 'Minimax', 'Sockets', 'Makefile'],
    repo: 'https://github.com/miaaa3/klosnowo',
    video: 'assets/projects/klosnowo/demo.mp4',
    cover: 'assets/projects/klosnowo/cover.jpg',
    gallery: ['assets/projects/klosnowo/cover.jpg']
  },
  {
    id: 'lbp',
    cat: 'systems',
    kind: 'master',
    title: 'LBP Parking Classifier',
    tagline: { en: '“free or taken? ask the texture”', fr: '« libre ou occupée ? demande à la texture »' },
    desc: {
      en: 'Computer vision without deep learning: a from-scratch Local Binary Patterns descriptor and a nearest-neighbour classifier in C++/OpenCV decide if a parking spot is free — plus a multi-view 3D follow-up on ModelNet10.',
      fr: 'De la vision par ordinateur sans deep learning : un descripteur LBP écrit à la main et un classifieur plus-proche-voisin en C++/OpenCV décident si une place de parking est libre — avec un prolongement 3D multi-vues sur ModelNet10.'
    },
    points: {
      en: ['6 histogram distances compared, 3 descriptor variants', 'Data augmentation: <b>92.5 % → 94.5 %</b> accuracy', 'Multi-view 3D recognition: 50 % on 5 classes (chance 20 %)'],
      fr: ['6 distances d’histogrammes comparées, 3 variantes de descripteur', 'Augmentation de données : <b>92,5 % → 94,5 %</b> de réussite', 'Reconnaissance 3D multi-vues : 50 % sur 5 classes (hasard : 20 %)']
    },
    tags: ['C++17', 'OpenCV', 'Python', 'Computer vision'],
    repo: 'https://github.com/miaaa3/lbp-parking-classifier',
    cover: 'assets/projects/lbp/cover.jpg',
    gallery: ['assets/projects/lbp/cover.jpg', 'assets/projects/lbp/sofa.jpg']
  },
  {
    id: 'togetherly',
    cat: 'web',
    kind: 'team',
    title: 'Togetherly',
    tagline: { en: '“a homemade social network”', fr: '« un réseau social fait maison »' },
    desc: {
      en: 'Team project with Fattah Amil: a social network with JWT authentication, roles (admin, teacher, student), posts, likes, comments, follows that turn into friendships, notifications and real-time chat.',
      fr: 'Projet d’équipe avec Fattah Amil : un réseau social avec authentification JWT, rôles (admin, prof, étudiant), posts, likes, commentaires, abonnements qui deviennent des amitiés, notifications et chat temps réel.'
    },
    points: {
      en: ['Role-based access control with Spring Security + JWT', 'Mutual follow = friends = chat over WebSocket', 'Responsive Angular UI, desktop and mobile'],
      fr: ['Contrôle d’accès par rôle avec Spring Security + JWT', 'Abonnement mutuel = amis = chat en WebSocket', 'Interface Angular responsive, desktop et mobile']
    },
    tags: ['Angular', 'Spring Boot', 'JWT', 'WebSocket'],
    repo: 'https://github.com/miaaa3/Togetherly-Angular-Spring-Boot',
    cover: 'assets/projects/togetherly/cover.jpg',
    gallery: ['assets/projects/togetherly/cover.jpg', 'assets/projects/togetherly/profile.jpg']
  }
];
