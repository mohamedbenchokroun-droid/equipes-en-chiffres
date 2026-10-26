# Consignes pour Claude : projet « Équipes en chiffres »

Lis `SYNTHESE.md` avant toute modification : il décrit le besoin, l'architecture et les préférences de l'utilisateur.

## Le projet

- Tout l'outil tient dans `pilotage-talents.html` (HTML, CSS et JS sans framework). Le fichier n'a pas de `<!doctype>` ni de `<head>`, et c'est voulu : la plateforme d'artefacts les ajoute à la publication.
- **Prévisualisation** : `node serveur.js`, puis http://localhost:5177. Dans l'application Claude, la configuration `pilotage` de `.claude/launch.json` fait la même chose.
- **Version autonome** : `node construire.js` produit `autonome/equipes-en-chiffres.html`. Relance-le après chaque modification pour la garder à jour.
- **Langue** : l'interface, les commentaires du code et les échanges avec l'utilisateur sont en français.

## Règles à respecter

- **Aucun texte ne déborde ni ne se chevauche, et pas de défilement horizontal.** Vérifie chaque modification visible à 1536 px, puis à 390 et 360 px de large.
- **La version mobile compte autant que la version ordinateur.**
- **Ton neutre** dans tous les textes : rien qui évoque le contrôle ou la surveillance des personnes.
- **Garde le style existant** : police Inter, variables CSS (`--blue`, `--green`, `--ink-*`, etc.), courbes `--ease-out`, et respect de `prefers-reduced-motion`.
- **Les jauges** gardent Aujourd'hui, Fin d'année et Objectif fixes ; seul le scénario bouge. Le drapeau vert marque l'objectif.
- **Les recrues simulées** restent dans les bornes de leur profil (`lvlRange()`).
- **Ajoute le nouveau CSS juste avant le repère `/* Feuille « Plus » */`**, à la fin de la feuille de style, pour qu'il prenne le pas sur les règles plus anciennes.

## Démarche de design utilisée

- **Repères visuels** : les maquettes de départ sont dans `maquettes/originales/`, et les retours successifs dans `maquettes/retours/`.
- **Skills Claude** : si elles sont installées sur ta machine (`~/.claude/skills`), le projet a été conçu avec celles-ci.
  - Goût et design : `design-taste-frontend` et `impeccable`.
  - Animation : `emil-design-eng`, `animate`, `animation-performance` et `apple-design`.
  - Avant de livrer une animation : `review-animations`.
- **Si elles ne sont pas installées**, applique les mêmes principes :
  - une animation n'existe que si elle aide à comprendre ;
  - courbes ease-out, durées courtes (150 à 450 ms) ;
  - n'animer que `transform` et `opacity` ;
  - toujours prévoir `prefers-reduced-motion`.
- **Vérifie visuellement chaque changement** dans la prévisualisation (`node serveur.js`) avant de publier : ordinateur (1536 px), puis téléphone (390 et 360 px).

## Confidentialité

- **Les vrais fichiers Excel DRH / DAF sont confidentiels.** Ne les versionne jamais (le `.gitignore` les exclut) et ne les mets jamais dans le code.
- **Tant que l'outil tourne sur des données fictives**, garde le badge « Données fictives » visible.
- **Avant d'importer de vraies données dans la version en ligne**, rappelle à l'utilisateur de restreindre le partage de l'artefact : il est aujourd'hui accessible à toute personne ayant le lien.
