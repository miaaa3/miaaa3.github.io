/* Case-study content, one entry per project (keyed by project id). Text is { en, fr }.
   Every number comes from the project's README or report. */
window.CASES = {
  nexus: {
    slug: 'nexusnexus',
    headline: { en: 'A whole city, live, <em>in a browser tab.</em>', fr: 'Une ville entière, en direct, <em>dans un onglet.</em>' },
    intro: {
      en: 'The real road network of La Rochelle, thousands of vehicles routed with A*, streamed over WebSocket to a WebGL2 dashboard that stays at 60 FPS, with neighbourhood analytics from INSEE IRIS zones.',
      fr: 'Le vrai réseau routier de La Rochelle, des milliers de véhicules routés en A*, diffusés en WebSocket vers un tableau de bord WebGL2 qui tient les 60 FPS, avec des analyses par quartier issues des zones IRIS de l’INSEE.'
    },
    meta: { en: "Master's project · Université de Haute-Alsace · 2026 · solo", fr: 'Projet de master · Université de Haute-Alsace · 2026 · seule' },
    problem: {
      en: 'Traffic dashboards usually show a handful of dots or a recorded video. I wanted a real city with real streets and real numbers: every vehicle simulated on the server, every frame drawn in the browser, live, <b>without the tab giving up.</b>',
      fr: 'Les tableaux de bord de trafic montrent souvent quelques points ou une vidéo enregistrée. Je voulais une vraie ville, de vraies rues et de vrais chiffres : chaque véhicule simulé côté serveur, chaque image dessinée dans le navigateur, en direct, <b>sans que l’onglet abandonne.</b>'
    },
    hard: [
      { t: { en: '15,000 moving things in a browser', fr: '15 000 objets qui bougent dans un navigateur' },
        d: { en: 'Map markers die at a few hundred. Every vehicle is one instance in a single WebGL2 draw call, with a shader that turns it into a heading-aware glyph.', fr: 'Les marqueurs de carte meurent à quelques centaines. Chaque véhicule est une instance dans un seul appel de rendu WebGL2, avec un shader qui en fait un glyphe orienté.' } },
      { t: { en: 'Too much data on the wire', fr: 'Trop de données sur le réseau' },
        d: { en: 'Sending every car ten times a second floods the socket. Frames carry only what changed, with a full keyframe every 2 s and a compact format: about 5× less data.', fr: 'Envoyer chaque voiture dix fois par seconde sature la socket. Les trames ne portent que ce qui a changé, avec une image complète toutes les 2 s et un format compact : environ 5× moins de données.' } },
      { t: { en: 'Routing that reacts to jams', fr: 'Un routage qui réagit aux bouchons' },
        d: { en: 'A* runs lazily under a budget of 400 searches per tick, with a 5-second route cache and a 2.5× cost on congested streets, so cars drive around jams.', fr: 'L’A* tourne à la demande avec un budget de 400 recherches par tick, un cache de routes de 5 secondes et un coût ×2,5 sur les rues encombrées : les voitures contournent les bouchons.' } }
    ],
    how: {
      en: ['A Spring Boot simulation engine ticks at 10 Hz and broadcasts over STOMP/SockJS', 'Angular 17 with signals and MapLibre GL draws the city, WebGL2 draws the vehicles', 'IRIS neighbourhoods are matched with a bounding-box prefilter that skips about 95% of checks', 'One-click scenarios: rush hour, accidents, emergencies, a 15K stress test, a 60-second replay', 'Any city can be imported at runtime from an OpenStreetMap file'],
      fr: ['Un moteur de simulation Spring Boot tourne à 10 Hz et diffuse en STOMP/SockJS', 'Angular 17 avec signals et MapLibre GL dessine la ville, WebGL2 dessine les véhicules', 'Les quartiers IRIS sont associés avec un préfiltre par boîte englobante qui évite environ 95 % des tests', 'Scénarios en un clic : heure de pointe, accidents, urgences, test à 15K, replay de 60 secondes', 'N’importe quelle ville s’importe à chaud depuis un fichier OpenStreetMap']
    },
    stack: [['Angular 17', { en: 'dashboard, signals', fr: 'tableau de bord, signals' }], ['WebGL2', { en: 'instanced vehicles', fr: 'véhicules instanciés' }], ['MapLibre GL', { en: 'base map', fr: 'fond de carte' }], ['Spring Boot 3', { en: 'simulation, REST, WebSocket', fr: 'simulation, REST, WebSocket' }], ['Java 21', { en: 'A*, geofencing', fr: 'A*, géorepérage' }], ['OpenStreetMap', { en: 'road graph', fr: 'graphe routier' }]]
  },

  v2v: {
    slug: 'v2v-simulator',
    headline: { en: 'The cars talk to each other, <em>and I listen.</em>', fr: 'Les voitures se parlent, <em>et je les écoute.</em>' },
    intro: {
      en: 'A real-time vehicle-to-vehicle simulator in C++20 and OpenGL. Vehicles drive any OpenStreetMap city, route with A*, and form a live radio network with multi-hop broadcasts, accidents and emergency vehicles.',
      fr: 'Un simulateur temps réel de communication véhicule-à-véhicule en C++20 et OpenGL. Les véhicules roulent sur n’importe quelle ville OpenStreetMap, se routent en A* et forment un réseau radio vivant, avec broadcast multi-saut, accidents et véhicules d’urgence.'
    },
    meta: { en: "Master's project · Université de Haute-Alsace · 2026 · with Mohammed Chouadra", fr: 'Projet de master · Université de Haute-Alsace · 2026 · avec Mohammed Chouadra' },
    problem: {
      en: 'The brief: 2,000 vehicles at 60 FPS, each one talking to its neighbours. Every frame means moving everyone, working out who can hear whom, and drawing it all <b>in about 16 milliseconds.</b> We ended at 19,000 vehicles at 120 FPS.',
      fr: 'Le sujet : 2 000 véhicules à 60 FPS, chacun parlant à ses voisins. Chaque image, il faut tout déplacer, savoir qui entend qui et tout dessiner <b>en environ 16 millisecondes.</b> On a fini à 19 000 véhicules à 120 FPS.'
    },
    hard: [
      { t: { en: 'Who can hear whom', fr: 'Qui entend qui' },
        d: { en: 'Checking every pair grows with the square of the fleet. A uniform 500 m grid turns it into a few cells per car, so the network is rebuilt every frame.', fr: 'Tester toutes les paires explose avec la taille de la flotte. Une grille uniforme de 500 m ramène ça à quelques cellules par voiture : le réseau est reconstruit à chaque image.' } },
      { t: { en: 'Thousands of vehicles to draw', fr: 'Des milliers de véhicules à dessiner' },
        d: { en: 'One static 3-vertex buffer and one buffer per instance: the whole fleet goes to the GPU in a single instanced draw call.', fr: 'Un buffer statique de 3 sommets et un buffer par instance : toute la flotte part au GPU en un seul appel de rendu instancié.' } },
      { t: { en: 'A map that never freezes', fr: 'Une carte qui ne gèle jamais' },
        d: { en: 'Tiles download on 4 libcurl workers and decode off the GL thread into a 512-tile cache. The render thread only uploads textures.', fr: 'Les tuiles se téléchargent sur 4 workers libcurl et se décodent hors du thread GL dans un cache de 512 tuiles. Le thread de rendu ne fait qu’envoyer les textures.' } }
    ],
    how: {
      en: ['Radio model s(d, R) = 1 − (d/R)², with multi-hop broadcasts rippling through the fleet', 'A* minimising travel time, with a budget of 32 searches per step', 'Five vehicle types, traffic lights, civilians yielding to emergency vehicles', 'Accidents trigger automatic V2V alerts; rain and fog shrink the radio range', 'A Dear ImGui dashboard with a vehicle inspector, radar and profiler'],
      fr: ['Modèle radio s(d, R) = 1 − (d/R)², avec des broadcasts multi-saut qui se propagent', 'A* qui minimise le temps de trajet, avec un budget de 32 recherches par pas', 'Cinq types de véhicules, feux, civils qui laissent passer les urgences', 'Les accidents déclenchent des alertes V2V ; pluie et brouillard réduisent la portée', 'Un dashboard Dear ImGui avec inspecteur de véhicule, radar et profiler']
    },
    stack: [['C++20', { en: 'engine', fr: 'moteur' }], ['OpenGL 3.3', { en: 'instanced rendering', fr: 'rendu instancié' }], ['GLSL', { en: 'shaders', fr: 'shaders' }], ['Dear ImGui', { en: 'dashboard', fr: 'dashboard' }], ['libcurl', { en: 'map tiles', fr: 'tuiles' }], ['CMake', { en: 'build', fr: 'build' }]]
  },

  lingobingo: {
    slug: 'lingobingo',
    headline: { en: 'Quizlet and Kahoot, <em>in one app.</em>', fr: 'Quizlet et Kahoot, <em>dans une seule appli.</em>' },
    intro: {
      en: 'Built during my internship at La Rochelle University for an English teacher. Teachers create courses, flashcards and graded quizzes; students learn, practise and compete on a gamified dashboard.',
      fr: 'Réalisée pendant mon stage à La Rochelle Université pour un enseignant d’anglais. Les profs créent cours, flashcards et quiz notés ; les étudiants apprennent, s’entraînent et s’affrontent sur un tableau de bord ludique.'
    },
    meta: { en: 'Internship · La Rochelle Université · April to June 2025', fr: 'Stage · La Rochelle Université · avril à juin 2025' },
    problem: {
      en: 'The teacher used one tool for flashcards, another for live quizzes and a spreadsheet for grades. Students lost their progress between them, and <b>nothing was scored in one place.</b>',
      fr: 'Le prof utilisait un outil pour les flashcards, un autre pour les quiz en direct et un tableur pour les notes. Les étudiants perdaient leur progression entre les trois, et <b>rien n’était noté au même endroit.</b>'
    },
    hard: [
      { t: { en: 'Writing flashcards is slow', fr: 'Écrire des flashcards prend du temps' },
        d: { en: 'While the teacher types a term, the translation for the other side is suggested, and a draft quiz can be generated from a set in one click.', fr: 'Pendant que le prof tape un terme, la traduction de l’autre face est proposée, et un brouillon de quiz se génère depuis un set en un clic.' } },
      { t: { en: 'Cheating from the browser', fr: 'Tricher depuis le navigateur' },
        d: { en: 'Quiz answers never reach the browser. Scoring happens on the server and every result lands in the teacher’s gradebook.', fr: 'Les réponses n’arrivent jamais dans le navigateur. La notation se fait côté serveur et chaque résultat arrive dans le carnet de notes du prof.' } },
      { t: { en: 'Making students come back', fr: 'Donner envie de revenir' },
        d: { en: 'XP, levels and daily streaks shared by quizzes and practice, badges, a class leaderboard, and a "type the translation" mode that forgives typos.', fr: 'XP, niveaux et séries partagés entre quiz et entraînement, badges, classement de la classe, et un mode « tape la traduction » qui pardonne les fautes de frappe.' } }
    ],
    how: {
      en: ['Classes with a join code, and courses, quizzes and flashcards assigned to a class', 'A planning calendar of deadlines and live sessions', 'JWT authentication with teacher and student roles', 'The whole stack (MySQL, Spring Boot, nginx-served Angular) starts with one Docker command', 'Seeded demo accounts so anyone can try it in a minute'],
      fr: ['Des classes avec code d’accès, et des cours, quiz et flashcards assignés à une classe', 'Un calendrier des échéances et des sessions en direct', 'Authentification JWT avec rôles prof et étudiant', 'Toute la stack (MySQL, Spring Boot, Angular servi par nginx) démarre en une commande Docker', 'Des comptes de démo pour l’essayer en une minute']
    },
    stack: [['Angular', { en: 'front end', fr: 'front-end' }], ['Tailwind CSS', { en: 'interface', fr: 'interface' }], ['Spring Boot', { en: 'API, scoring', fr: 'API, notation' }], ['Spring Security', { en: 'JWT, roles', fr: 'JWT, rôles' }], ['MySQL', { en: 'data', fr: 'données' }], ['Docker Compose', { en: 'one-command setup', fr: 'lancement en une commande' }]]
  },

  helpinghands: {
    slug: 'helpinghands',
    headline: { en: 'Volunteering, <em>as a social network.</em>', fr: 'Le bénévolat, <em>en réseau social.</em>' },
    intro: {
      en: 'Started during my full-stack internship at IBM, then rebuilt as a complete monorepo. Volunteers find missions, apply, follow organisations, chat and donate; organisations manage applicants; admins verify and moderate.',
      fr: 'Commencé pendant mon stage full-stack chez IBM, puis reconstruit en monorepo complet. Les bénévoles trouvent des missions, postulent, suivent des associations, discutent et font des dons ; les associations gèrent leurs candidats ; les admins vérifient et modèrent.'
    },
    meta: { en: 'Started at IBM in 2023 · rebuilt independently · 2026', fr: 'Commencé chez IBM en 2023 · reconstruit ensuite · 2026' },
    problem: {
      en: 'Associations post missions on social media and lose track of who applied. Volunteers can’t see what matches their interests, and <b>nobody knows which organisations are real.</b>',
      fr: 'Les associations publient leurs missions sur les réseaux et perdent la trace des candidats. Les bénévoles ne voient pas ce qui correspond à leurs centres d’intérêt, et <b>personne ne sait quelles associations sont fiables.</b>'
    },
    hard: [
      { t: { en: 'Three kinds of users', fr: 'Trois types d’utilisateurs' },
        d: { en: 'Volunteers, organisations and admins each get their own dashboard and permissions, enforced by Spring Security with JWT.', fr: 'Bénévoles, associations et admins ont chacun leur tableau de bord et leurs droits, appliqués par Spring Security avec JWT.' } },
      { t: { en: 'Messages that never vanish', fr: 'Des messages qui ne disparaissent pas' },
        d: { en: 'Messages are sent over HTTP so they’re saved before they’re shown, then pushed live over WebSocket. Unread counts update in real time.', fr: 'Les messages partent en HTTP pour être enregistrés avant d’être affichés, puis sont poussés en direct en WebSocket. Les non-lus se mettent à jour en temps réel.' } },
      { t: { en: 'A feed worth opening', fr: 'Un fil qui donne envie' },
        d: { en: 'Follow requests count only once accepted, and recommendations come from the interests each volunteer picks.', fr: 'Les abonnements ne comptent qu’une fois acceptés, et les recommandations viennent des centres d’intérêt choisis par chaque bénévole.' } }
    ],
    how: {
      en: ['Search and filter opportunities, apply, and track applications', 'Admins verify organisations before their missions go public', 'Donations through Stripe in test mode', 'Grouped notifications for follows, likes and comments', 'Docker Compose and nginx serve everything from one origin; CI runs on GitHub Actions'],
      fr: ['Chercher et filtrer les missions, postuler et suivre ses candidatures', 'Les admins vérifient les associations avant que leurs missions soient publiques', 'Dons via Stripe en mode test', 'Notifications groupées pour abonnements, likes et commentaires', 'Docker Compose et nginx servent tout depuis une seule origine ; CI sur GitHub Actions']
    },
    stack: [['Angular 16', { en: 'front end', fr: 'front-end' }], ['Spring Boot 3.1', { en: 'REST API', fr: 'API REST' }], ['Spring Security', { en: 'JWT, roles', fr: 'JWT, rôles' }], ['WebSocket / STOMP', { en: 'chat', fr: 'chat' }], ['MySQL 8', { en: 'data', fr: 'données' }], ['Stripe', { en: 'donations', fr: 'dons' }]]
  },

  klosnowo: {
    slug: 'klosnowo',
    headline: { en: 'A board game in C, <em>with an AI that fights back.</em>', fr: 'Un jeu de plateau en C, <em>avec une IA qui se défend.</em>' },
    intro: {
      en: 'A Tafl-style strategy game for two players on an 11 × 7 board, in pure C11. Play on one keyboard, against a Minimax AI, or over the network, in an animated terminal.',
      fr: 'Un jeu de stratégie façon Tafl pour deux joueurs sur un plateau de 11 × 7, en C11 pur. On joue sur un seul clavier, contre une IA Minimax ou en réseau, dans un terminal animé.'
    },
    meta: { en: 'School project · ENSISA Immersion 2026', fr: 'Projet d’école · ENSISA Immersion 2026' },
    problem: {
      en: 'The rules were given. The job was to build the game properly: <b>a clean engine, a real opponent, and two players on two machines.</b>',
      fr: 'Les règles étaient fournies. Le travail : construire le jeu proprement, avec <b>un moteur propre, un vrai adversaire, et deux joueurs sur deux machines.</b>'
    },
    hard: [
      { t: { en: 'Two ways to capture', fr: 'Deux façons de capturer' },
        d: { en: 'A piece that just moved captures by sandwiching an enemy, or when nothing supports it from behind. Captures can chain, and barricades protect the defender.', fr: 'La pièce qui vient de bouger capture en prenant un ennemi en sandwich, ou quand rien ne le soutient derrière. Les captures s’enchaînent et les barricades protègent le défenseur.' } },
      { t: { en: 'An opponent worth playing', fr: 'Un adversaire qui vaut le coup' },
        d: { en: 'Minimax with alpha-beta pruning at depth 4, scoring material, territory and the threat on each king.', fr: 'Minimax avec élagage alpha-bêta en profondeur 4, qui évalue le matériel, le territoire et la menace sur chaque roi.' } },
      { t: { en: 'Two machines, one game', fr: 'Deux machines, une partie' },
        d: { en: 'Plain TCP sockets: the host plays blue, the client red, and moves and barricades travel as small messages.', fr: 'De simples sockets TCP : l’hôte joue bleu, le client rouge, et les coups et barricades circulent en petits messages.' } }
    ],
    how: {
      en: ['The rules engine knows nothing about input or display, and uses fixed-size arrays only', 'The same game loop drives all four modes; only the source of each move changes', 'ANSI colours, territory shading, sliding-piece animation and capture flashes', 'Win by conquest, by capturing the king, or on points after 64 half-moves'],
      fr: ['Le moteur de règles ne sait rien de l’affichage ni de la saisie, et n’utilise que des tableaux fixes', 'La même boucle de jeu sert aux quatre modes ; seule la source des coups change', 'Couleurs ANSI, territoires, animation des pièces et flash des captures', 'Victoire par conquête, par capture du roi, ou aux points après 64 demi-coups']
    },
    stack: [['C11', { en: 'everything', fr: 'tout' }], ['POSIX sockets', { en: 'network play', fr: 'jeu en réseau' }], ['Make', { en: 'build', fr: 'build' }]]
  },

  lbp: {
    slug: 'lbp-parking-classifier',
    headline: { en: 'Is this spot free? <em>Ask the texture.</em>', fr: 'Cette place est libre ? <em>Demande à la texture.</em>' },
    intro: {
      en: 'Computer vision without deep learning: a hand-written Local Binary Patterns descriptor and a nearest-neighbour classifier in C++ and OpenCV decide whether a parking space is taken, then the same idea is extended to 3D objects.',
      fr: 'De la vision par ordinateur sans deep learning : un descripteur LBP écrit à la main et un classifieur plus-proche-voisin en C++ et OpenCV décident si une place est occupée, puis la même idée est étendue aux objets 3D.'
    },
    meta: { en: "Master's lab · Université de Haute-Alsace · 2026", fr: 'TP de master · Université de Haute-Alsace · 2026' },
    problem: {
      en: 'Decide from a 150 × 150 photo whether a parking space is empty or taken, using <b>only a texture signature</b> and the closest example in a small training set.',
      fr: 'Décider, à partir d’une photo de 150 × 150, si une place est vide ou occupée, avec <b>seulement une signature de texture</b> et l’exemple le plus proche d’un petit jeu d’entraînement.'
    },
    hard: [
      { t: { en: 'A picture as numbers', fr: 'Une image en chiffres' },
        d: { en: 'Each pixel is compared with its 8 neighbours to form an 8-bit code; the image becomes a 256-bin histogram of those codes.', fr: 'Chaque pixel est comparé à ses 8 voisins pour former un code sur 8 bits ; l’image devient un histogramme de 256 cases.' } },
      { t: { en: 'Which distance wins?', fr: 'Quelle distance gagne ?' },
        d: { en: 'Six histogram distances compared on gray, colour and multi-scale descriptors. Grayscale with SAD, Chi-square or Bhattacharyya came out on top.', fr: 'Six distances d’histogrammes comparées sur des descripteurs gris, couleur et multi-échelle. Le gris avec SAD, Chi² ou Bhattacharyya arrive en tête.' } },
      { t: { en: 'Too few examples', fr: 'Trop peu d’exemples' },
        d: { en: 'Mirror, small rotations, brightness and blur grow the training set from 200 to 1,400 images, taking the best score from 92.5% to 94.5%.', fr: 'Miroir, petites rotations, luminosité et flou font passer l’entraînement de 200 à 1 400 images, et le meilleur score de 92,5 % à 94,5 %.' } }
    ],
    how: {
      en: ['A small CLI: describe one image, build feature files, evaluate, compare, measure augmentation', 'Train and test images are always different', 'Multi-view 3D on ModelNet10: 6 renders per object, averaged LBP, 1-NN', '50% on 5 classes in 3D, against 20% for chance, with a confusion matrix'],
      fr: ['Une petite CLI : décrire une image, construire les fichiers, évaluer, comparer, mesurer l’augmentation', 'Les images de test ne sont jamais celles d’entraînement', 'Multi-vues 3D sur ModelNet10 : 6 rendus par objet, LBP moyenné, 1-NN', '50 % sur 5 classes en 3D, contre 20 % au hasard, avec matrice de confusion']
    },
    stack: [['C++17', { en: 'descriptor, classifier', fr: 'descripteur, classifieur' }], ['OpenCV 4', { en: 'images', fr: 'images' }], ['CMake', { en: 'build', fr: 'build' }], ['Python', { en: '3D extension', fr: 'extension 3D' }]]
  },

  togetherly: {
    slug: 'togetherly',
    headline: { en: 'A homemade social network, <em>built as a team.</em>', fr: 'Un réseau social fait maison, <em>en équipe.</em>' },
    intro: {
      en: 'Team project with Fattah Amil: JWT authentication and roles, posts, likes and comments, follows that turn into friendships, notifications and real-time chat.',
      fr: 'Projet d’équipe avec Fattah Amil : authentification JWT et rôles, posts, likes et commentaires, abonnements qui deviennent des amitiés, notifications et chat en temps réel.'
    },
    meta: { en: 'Team project · with Fattah Amil · 2023', fr: 'Projet d’équipe · avec Fattah Amil · 2023' },
    problem: {
      en: 'A small community network where teachers post, students comment, and <b>friends can talk in real time.</b>',
      fr: 'Un petit réseau communautaire où les profs publient, les étudiants commentent, et <b>les amis discutent en temps réel.</b>'
    },
    hard: [
      { t: { en: 'Who can do what', fr: 'Qui peut faire quoi' },
        d: { en: 'Admins, teachers and students see and do different things, enforced with Spring Security and JWT.', fr: 'Admins, profs et étudiants voient et font des choses différentes, grâce à Spring Security et JWT.' } },
      { t: { en: 'When is someone a friend?', fr: 'Quand devient-on amis ?' },
        d: { en: 'Following is one-way. When it becomes mutual, the two users are friends and can chat.', fr: 'Suivre quelqu’un est à sens unique. Quand c’est réciproque, les deux deviennent amis et peuvent discuter.' } },
      { t: { en: 'Everything live', fr: 'Tout en direct' },
        d: { en: 'Notifications for likes, comments and messages, and chat over WebSocket.', fr: 'Notifications pour les likes, commentaires et messages, et chat en WebSocket.' } }
    ],
    how: {
      en: ['Profiles with picture, name and password management', 'Teachers share posts, everyone likes and comments', 'A responsive Angular interface for desktop and phone'],
      fr: ['Profils avec photo, nom et mot de passe', 'Les profs publient, tout le monde aime et commente', 'Une interface Angular responsive, ordinateur et téléphone']
    },
    stack: [['Angular', { en: 'front end', fr: 'front-end' }], ['Spring Boot', { en: 'API', fr: 'API' }], ['JWT', { en: 'auth, roles', fr: 'auth, rôles' }], ['WebSocket', { en: 'chat', fr: 'chat' }]]
  }
};
