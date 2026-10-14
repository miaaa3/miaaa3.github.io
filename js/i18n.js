/* French strings. English lives in the HTML itself and is captured at load. */
window.I18N_FR = {
  'skip': 'Aller aux projets',
  'hero.l1': 'Meryem Belmouaddine,',
  'hero.l2': 'développeuse full-stack',
  'hero.sub': 'Je construis des applis de l’API jusqu’au dernier pixel et, pour le plaisir, des villes entières remplies de voitures. Je cherche un stage de 6 mois à partir de février 2027.',
  'hero.cta': 'Télécharger mon CV',
  'lang.switch': 'English',
  'city.born': 'où je suis née',
  'city.studied': 'où j’ai étudié',
  'city.now': 'où j’étudie',
  'city.fallback': 'Une carte vivante de la ville, avec mes voitures sur ses vraies rues. Il faut JavaScript.',
  'city.cars': 'Voitures',
  'city.hint': 'Touchez une rue pour créer un bouchon.',

  'work.title': 'Projets',
  'filter.all': 'Tout', 'filter.web': 'Applis web', 'filter.graphics': 'Simulation', 'filter.systems': 'C et vision',

  'about.l1': 'Née à Casablanca.',
  'about.l2': 'Je code à Mulhouse.',
  'about.h1': 'Le parcours',
  'about.p1': 'Un BTS et une licence pro au Maroc, une licence d’informatique à La Rochelle, et maintenant le Master Informatique et Mobilité à l’Université de Haute-Alsace. Quatre stages en route : IBM deux fois, AGILTEEM et La Rochelle Université.',
  'about.h2': 'Ce que je cherche',
  'about.p2': 'Un stage de fin d’études de 6 mois à partir de février 2027, sur site. L’Alsace d’abord, partout en France sinon. Full-stack, mobile, ou n’importe quoi avec une carte dedans.',
  'about.cta': 'M’écrire',

  'lineup.title': 'Expériences, études et outils',
  'g.morocco': 'Maroc, de 2021 à 2024',
  'g.lr': 'La Rochelle, de 2024 à 2025',
  'g.mul': 'Mulhouse, de 2025 à 2027',
  'g.tools': 'Outils',
  'r.bts': 'BTS, développement des systèmes d’information',
  'r.ibm1': 'Développeuse web, appli de gestion du personnel',
  'r.ibm2': 'Développeuse full-stack, réseau du bénévolat',
  'r.est': 'Licence pro, systèmes informatiques et web',
  'r.agil': 'Développeuse web, sites de grandes entreprises',
  'r.lic': 'Licence d’informatique, troisième année',
  'r.lingo': 'Développeuse full-stack, LingoBingo',
  'r.master': 'Master informatique et mobilité',
  'r.next': 'Votre équipe, j’espère',
  'r.next2': 'six mois, sur site',
  'k.studies': 'études', 'k.intern': 'stage',
  'd.ibm1': 'août 2022', 'd.ibm2': 'août–sept. 2023', 'd.agil': 'avr.–mai 2024', 'd.lingo': 'avr.–juin 2025', 'd.next': 'dès fév. 2027',
  't.daily': 'au quotidien', 't.projects': 'en projet',
  't.langs': 'Arabe, français, anglais', 't.langs2': 'maternelle, courant, avancé',

  'contact.line': 'Écrivez-moi pour un stage, un projet, ou pour savoir où trouver le meilleur bretzel de Mulhouse.',
  'contact.place': 'Mulhouse, France. Originaire de Casablanca.',
  'foot.what': 'Meryem Belmouaddine, développeuse',
  'foot.term': 'Ouvrir le terminal',
  'foot.credits': 'Images : porte de la mosquée Hassan II par Tinuzzo (CC BY 4.0) ; La Rochelle, vue du port, vers 1905 (domaine public) ; plan de La Rochelle par Nicolas Chalmandrier, 1773, BnF Gallica (domaine public) ; Bugatti Type 30 à la Cité de l’Automobile par Zairon (CC BY-SA 4.0) ; via Wikimedia Commons. Rues © contributeurs OpenStreetMap (ODbL).',
  'close': 'Fermer'
};

window.UI = {
  en: {
    cars: n => `${n.toLocaleString('en-US')} cars`,
    rush: 'rush hour', jam: n => n === 1 ? '1 jam, not my fault' : `${n} jams, still not my fault`,
    code: 'Code on GitHub', demo: 'Demo',
    kinds: { master: "Master's project", intern: 'Internship', school: 'School project', team: 'Team project' },
    term: {
      welcome: 'Hi, this is Mia’s terminal. Type <b>help</b>.',
      help: 'whoami · internship · projects · cities · cv · contact · coffee · joke · sudo · lang · clear · exit',
      whoami: 'Meryem Belmouaddine, called Mia. From Casablanca, studying in Mulhouse. Full-stack and mobile developer. Probably 47 tabs open right now.',
      internship: '6 months, from February 2027, on site. Alsace first, anywhere in France works.',
      projects: 'nexusnexus  v2v  lingobingo  helpinghands  klosnowo  lbp-parking  togetherly',
      cities: 'casablanca (born) → la rochelle (studied) → mulhouse (now). Tap one above the map.',
      cv: 'Opening the CV…', contact: '<a href="mailto:belmouaddine.ptech@gmail.com">belmouaddine.ptech@gmail.com</a>',
      coffee: 'Brewing… cup number 248 today. Compiling faster already.',
      sudo: 'mia is not in the sudoers file. This incident will be reported to her mum.',
      lang: 'Je passe en français…',
      notFound: 'zsh: command not found: {cmd}. Try help.',
      jokes: ['Why do programmers prefer dark mode? Light attracts bugs.', 'I told my code I loved it. It returned undefined.', 'git commit -m "final fix" && git commit -m "final fix 2"', 'My A* finds the shortest path everywhere except to my keys.']
    }
  },
  fr: {
    cars: n => `${n.toLocaleString('fr-FR')} voitures`,
    rush: 'heure de pointe', jam: n => n === 1 ? '1 bouchon, pas ma faute' : `${n} bouchons, toujours pas ma faute`,
    code: 'Code sur GitHub', demo: 'Démo',
    kinds: { master: 'Projet de master', intern: 'Stage', school: 'Projet d’école', team: 'Projet d’équipe' },
    term: {
      welcome: 'Salut, c’est le terminal de Mia. Tape <b>help</b>.',
      help: 'whoami · internship · projects · cities · cv · contact · coffee · joke · sudo · lang · clear · exit',
      whoami: 'Meryem Belmouaddine, dite Mia. Née à Casablanca, étudiante à Mulhouse. Développeuse full-stack et mobile. Sûrement 47 onglets ouverts en ce moment.',
      internship: '6 mois, dès février 2027, sur site. L’Alsace d’abord, partout en France sinon.',
      projects: 'nexusnexus  v2v  lingobingo  helpinghands  klosnowo  lbp-parking  togetherly',
      cities: 'casablanca (née) → la rochelle (études) → mulhouse (maintenant). Choisis-en une au-dessus de la carte.',
      cv: 'J’ouvre le CV…', contact: '<a href="mailto:belmouaddine.ptech@gmail.com">belmouaddine.ptech@gmail.com</a>',
      coffee: 'Ça infuse… tasse n°248 aujourd’hui. Ça compile déjà plus vite.',
      sudo: 'mia n’est pas dans le fichier sudoers. Cet incident sera signalé à sa maman.',
      lang: 'Switching to English…',
      notFound: 'zsh: commande introuvable : {cmd}. Essaie help.',
      jokes: ['Pourquoi les devs préfèrent le mode sombre ? La lumière attire les bugs.', 'J’ai dit à mon code que je l’aimais. Il a renvoyé undefined.', 'git commit -m "dernier fix" && git commit -m "dernier fix 2"', 'Mon A* trouve le plus court chemin partout, sauf vers mes clés.']
    }
  }
};
