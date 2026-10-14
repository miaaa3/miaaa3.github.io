/* French strings. English lives in the HTML itself and is captured at load. */
window.I18N_FR = {
  'skip': 'Aller au contenu',
  'nav.projects': 'Projets', 'nav.exp': 'Parcours', 'nav.skills': 'Compétences', 'nav.about': 'À propos', 'nav.contact': 'Contact', 'nav.cv': 'CV',

  'hero.status': 'Disponible pour un <b>stage de 6 mois</b> dès février 2027',
  'hero.title': 'Je construis des applis de bout en bout, <em class="hl">de l\u2019API au dernier pixel.</em>',
  'hero.lead': 'Développeuse full-stack, M2 Informatique et Mobilité à l\u2019Université de Haute-Alsace. Quatre stages (IBM ×2, AGILTEEM, La Rochelle Université), une ville WebGL de 15 000 voitures en direct, et un simulateur C++ qui fait rouler 19 000 véhicules à 120 FPS.',
  'tl.k': 'le fil rouge',
  'tl.v': 'Je prends quelque chose de réel et de désordonné (le cours d\u2019un prof, le réseau routier d\u2019une ville, une communauté de bénévoles) et j\u2019en fais un logiciel que les gens utilisent vraiment.',
  'hero.cta1': 'Voir mes projets', 'hero.cta2': 'Télécharger mon CV',


  'proj.title': 'Projets choisis',
  'proj.sub': 'Tous open source, documentés et lançables. Ouvrez-en un pour les captures et les détails.',
  'filter.all': 'tout', 'filter.web': 'web full-stack', 'filter.graphics': 'graphisme &amp; simulation', 'filter.systems': 'C / C++ &amp; vision',

  'exp.title': 'Expériences',
  'exp.sub': 'Quatre stages, à chaque fois un vrai produit pour de vrais utilisateurs.',
  'exp.1.date': 'avr. – juin 2025', 'exp.1.role': 'Stage, développeuse full-stack',
  'exp.1.desc': 'Conception et développement de LingoBingo pour un enseignant d’anglais : cartes mémoire façon Quizlet et quiz en direct façon Kahoot dans une seule appli. J’ai recueilli les besoins pédagogiques, puis développé le back-end Spring Boot et le front-end Angular + Tailwind.',
  'exp.2.date': 'avr. – mai 2024', 'exp.2.role': 'Stage, développeuse web',
  'exp.2.desc': 'Travail sur des sites web pour de grandes entreprises au sein d’une équipe agile, et découverte de la façon dont un vrai projet client est planifié et livré.',
  'exp.3.date': 'août – sept. 2023', 'exp.3.role': 'Stage, développeuse full-stack',
  'exp.3.desc': 'Développement d’un réseau social du bénévolat (utilisateurs, posts, abonnements, chat) et conception de son architecture front-end et back-end. Il est devenu HelpingHands, que j’ai ensuite reconstruit et enrichi.',
  'exp.4.date': 'août 2022', 'exp.4.role': 'Stage, développeuse web',
  'exp.4.desc': 'Création en binôme d’une application de gestion du personnel, avec Symfony côté back-end et Angular côté front-end.',
  'edu.title': 'Formation',
  'edu.1': 'Master Informatique et Mobilité',
  'edu.1.desc': 'iOS, JavaScript front-end et back-end, cloud, sécurité des applications, apprentissage automatique et profond, NoSQL, modélisation 2D/3D.',
  'edu.2': 'Licence Informatique (3ᵉ année)',
  'edu.3': 'Licence pro. Systèmes Informatiques et Technologies Web',
  'edu.4': 'BTS Développement des Systèmes d’Information',

  'sk.title': 'Compétences',
  'sk.sub': 'Ce que j’utilise au quotidien, et ce avec quoi j’ai livré en projet ou en stage.',
  'sk.lang': 'Langages', 'sk.front': 'Front-end', 'sk.back': 'Back-end &amp; données', 'sk.tools': 'Outils',
  'sk.spoken': 'langues = [ <b>arabe</b> (maternelle), <b>français</b> (courant), <b>anglais</b> (avancé) ]',

  'about.title': 'À propos',
  'about.p1': 'Moi c’est <b>Meryem</b>, mais on m’appelle souvent <b>Mia</b>. J’ai commencé par un BTS au Maroc, puis une licence pro en technologies web, une licence d’informatique à La Rochelle, et maintenant un Master à Mulhouse.',
  'about.p2': 'J’aime les projets qui doivent <b>marcher pour de vrai</b> : un prof qui utilise mon appli en classe, 15 000 voitures qui ne doivent pas figer le navigateur, une IA de jeu de plateau qui doit être une vraie adversaire.',
  'about.p3': 'En dehors du code : trop de café, trop d’onglets ouverts, et une liste grandissante des meilleurs bretzels de Mulhouse.',
  'f.loc.k': 'localisation', 'f.loc.v': 'Mulhouse, mobile partout en France',
  'f.start.k': 'début du stage', 'f.start.v': 'Février 2027, 6 mois',
  'f.mode.k': 'mode', 'f.mode.v': 'Sur site, Alsace en priorité',
  'f.fuel.k': 'carburant', 'f.fuel.v': 'Latte avoine, double shot',

  'contact.title': 'Disponible pour un stage de 6 mois dès février 2027, <em class="hl">en Alsace ou partout en France.</em>',
  'contact.text': 'Stage de fin d\u2019études, sur site. Chaque projet ci-dessus est livré avec son code et une démo.',
  'contact.copy': 'cliquer pour copier', 'contact.cv': 'CV (PDF)',
  'footer': '// HTML, CSS et JS écrits à la main. sans framework, sans template.',
  'footer.top': 'retour en haut ↑'
};

/* Strings used from JS */
window.UI = {
  en: {
    open: 'open', code: 'Code', details: 'Details', watch: 'watch demo', screens: 'screenshots',
    kinds: { master: "master's project", intern: 'internship', school: 'school project', team: 'team project' },
    copied: 'email copied to clipboard',
    codeOk: '✓ 0 errors · 1 warning: too much coffee',
    snippet: [
      ['k','const '],['v','meryem'],['t',' = {\n'],
      ['p','  role'],['t',': '],['s','"full-stack & mobile developer"'],['t',',\n'],
      ['p','  school'],['t',': '],['s','"M2 CS & Mobility @ UHA"'],['t',',\n'],
      ['p','  lookingFor'],['t',': '],['s','"6-month internship"'],['t',',\n'],
      ['p','  from'],['t',': '],['s','"2027-02"'],['t',',\n'],
      ['p','  stack'],['t',': [\n    '],['s','"Angular"'],['t',', '],['s','"Spring Boot"'],['t',',\n    '],['s','"C++"'],['t',', '],['s','"Swift"'],['t',',\n  ],\n'],
      ['p','  internships'],['t',': '],['n','4'],['t',',\n'],
      ['p','  coffee'],['t',': '],['n','Infinity'],['t',',  '],['c','// non-negotiable'],['t','\n'],
      ['p','  openTabs'],['t',': '],['n','47'],['t',',      '],['c','// all important'],['t','\n'],
      ['t','};\n\n'],
      ['k','export default '],['v','meryem'],['t',';']
    ],
    term: {
      welcome: 'Type <b>help</b> or click a command below.',
      help: 'commands: whoami, internship, projects, stack, cv, contact, github, linkedin, lang, coffee, joke, sudo, clear',
      whoami: 'Meryem Belmouaddine (Mia). M2 Computer Science & Mobility at UHA, full-stack & mobile developer.',
      internship: '6 months · from February 2027 · on site · Alsace first, open to all of France.',
      projects: 'nexusnexus  v2v  lingobingo  helpinghands  klosnowo  lbp-parking  togetherly\n→ jumping to projects…',
      stack: 'Java, TypeScript, Angular, Spring Boot, C++, OpenGL/WebGL, Swift, SQL, Docker, Git',
      cv: 'opening CV-Meryem-Belmouaddine.pdf…', github: 'opening github.com/miaaa3…', linkedin: 'opening linkedin.com/in/meryem-belmouaddine…',
      lang: 'passage en français…',
      coffee: '☕ brewing… cup #248 today. compiling faster already.',
      sudo: 'meryem is not in the sudoers file. This incident will be reported.',
      notFound: 'zsh: command not found: {cmd}. try "help"',
      jokes: ['Why do programmers prefer dark mode? Because light attracts bugs.', 'I told my code I loved it. It returned undefined.', 'There are 10 types of people: those who understand binary and those who don’t.', 'git commit -m "final fix" && git commit -m "final fix 2"']
    }
  },
  fr: {
    open: 'ouvrir', code: 'Code', details: 'Détails', watch: 'voir la démo', screens: 'captures',
    kinds: { master: 'projet de master', intern: 'stage', school: 'projet d’école', team: 'projet d’équipe' },
    copied: 'email copié dans le presse-papiers',
    codeOk: '✓ 0 erreur · 1 avertissement : trop de café',
    snippet: [
      ['k','const '],['v','meryem'],['t',' = {\n'],
      ['p','  role'],['t',': '],['s','"développeuse full-stack & mobile"'],['t',',\n'],
      ['p','  ecole'],['t',': '],['s','"M2 Info & Mobilité @ UHA"'],['t',',\n'],
      ['p','  cherche'],['t',': '],['s','"stage de 6 mois"'],['t',',\n'],
      ['p','  debut'],['t',': '],['s','"2027-02"'],['t',',\n'],
      ['p','  stack'],['t',': [\n    '],['s','"Angular"'],['t',', '],['s','"Spring Boot"'],['t',',\n    '],['s','"C++"'],['t',', '],['s','"Swift"'],['t',',\n  ],\n'],
      ['p','  stages'],['t',': '],['n','4'],['t',',\n'],
      ['p','  cafe'],['t',': '],['n','Infinity'],['t',',     '],['c','// non négociable'],['t','\n'],
      ['p','  onglets'],['t',': '],['n','47'],['t',',        '],['c','// tous importants'],['t','\n'],
      ['t','};\n\n'],
      ['k','export default '],['v','meryem'],['t',';']
    ],
    term: {
      welcome: 'Tape <b>help</b> ou clique sur une commande ci-dessous.',
      help: 'commandes : whoami, internship, projects, stack, cv, contact, github, linkedin, lang, coffee, joke, sudo, clear',
      whoami: 'Meryem Belmouaddine (Mia). M2 Informatique et Mobilité à l’UHA, développeuse full-stack & mobile.',
      internship: '6 mois · dès février 2027 · sur site · Alsace d’abord, mobile partout en France.',
      projects: 'nexusnexus  v2v  lingobingo  helpinghands  klosnowo  lbp-parking  togetherly\n→ direction les projets…',
      stack: 'Java, TypeScript, Angular, Spring Boot, C++, OpenGL/WebGL, Swift, SQL, Docker, Git',
      cv: 'ouverture de CV-Meryem-Belmouaddine.pdf…', github: 'ouverture de github.com/miaaa3…', linkedin: 'ouverture de linkedin.com/in/meryem-belmouaddine…',
      lang: 'switching to English…',
      coffee: '☕ ça infuse… tasse n°248 aujourd’hui. ça compile déjà plus vite.',
      sudo: 'meryem n’est pas dans le fichier sudoers. Cet incident sera signalé.',
      notFound: 'zsh: commande introuvable : {cmd}. essaie "help"',
      jokes: ['Pourquoi les devs préfèrent le mode sombre ? Parce que la lumière attire les bugs.', 'J’ai dit à mon code que je l’aimais. Il a renvoyé undefined.', 'Il y a 10 types de personnes : celles qui comprennent le binaire et les autres.', 'git commit -m "dernier fix" && git commit -m "dernier fix 2"']
    }
  }
};
