# Synthèse du projet « Équipes en chiffres »

Document de passation : ce qui a été demandé, ce qui a été construit, pourquoi, et ce qu'il reste à faire.
Rédigé fin octobre 2026, à l'issue de la première session de conception (versions 1 à 35 de l'artefact).

## 1. Le besoin

Chaque manager doit pouvoir suivre, pour ses propres équipes, deux indicateurs :

- la **séniorité moyenne** (années d'ancienneté) ;
- le **TJM moyen** (taux journalier moyen, en MAD).

Trois vues filtrables par manager :

1. **Situation actuelle** : indicateurs clés et tableau Nom | Prénom | Intitulé de poste | Séniorité | TJM.
2. **Prévision fin d'année** : séniorité vieillie jusqu'au 31/12, TJM inchangé sauf règle automatique, recrutements actés et départs prévus inclus.
3. **Simulateur de recrutement** : recrues hypothétiques (profil, séniorité, TJM, date d'arrivée), recalcul immédiat, comparaison avant / après, plusieurs scénarios.

Sources prévues : 3 fichiers Excel fournis par la DRH et la DAF.

- Fichier 1 : ressources en fin de période, avec la séniorité.
- Fichier 2 : recrutements actés et départs prévus, avec séniorité et TJ.
- Fichier 3 : ressources en fin de période, avec le TJ.

**Les vrais fichiers sont confidentiels** et n'ont pas encore été fournis. Tout tourne sur des données fictives (badge « Données fictives » visible dans l'outil).

## 2. Ce qui existe aujourd'hui

### Deux types de session

- **Administrateur (DRH / DAF)** : vue de toute l'entreprise, tableau de bord global, fixe les objectifs, simulateur entreprise, sources et paramètres.
- **Manager** : uniquement ses équipes, ses objectifs, son simulateur.

Le choix se fait sur l'écran d'accueil, sans mot de passe. **L'isolement est seulement visuel** : ce n'est pas une sécurité. Avec de vraies données, il faudra une vraie authentification et un filtrage côté serveur.

### Les écrans

- **Tableau de bord global** (admin) : situation consolidée et comparaison des managers.
- **Situation actuelle** : indicateurs, répartition, tableau filtrable et triable, fiche par collaborateur.
- **Prévision fin d'année** : barre « Aujourd'hui → Fin d'année → Objectif » avec drapeau, arrivées et départs.
- **Simulateur**, en trois colonnes : profils | équipe | résultat en direct.
  - **Côté manager** : cartes « Scénario A, B, C » proposées automatiquement (le plus proche de l'objectif, le plus économique, avec de la marge, etc.), plus « + Nouveau » pour composer soi-même. Un clic sur une carte remplit l'équipe.
  - **Côté administrateur** : un **plan entreprise** unique. On passe d'un manager à l'autre, on choisit A, B ou C **pour ce manager seulement**, puis « Valider et continuer ». Le récapitulatif « Plan de recrutement d'ici au 31/12 » montre :
    - le total de l'entreprise ;
    - le calendrier des arrivées ;
    - une carte par manager : scénario retenu, recrues par profil, coût, séniorité et TJM d'aujourd'hui à la fin d'année puis avec le plan.
  - **Glisser-déposer** : des profils vers l'équipe, et d'une recrue vers la corbeille pour la retirer.
  - **Éditeur de recrue** : la séniorité et le TJM sont **bornés par profil**.

    | Profil | Séniorité | TJM (MAD) |
    |---|---|---|
    | Junior | 0 à 2,5 ans | 2 550 à 3 650 |
    | Confirmé | 3 à 5,5 ans | 3 700 à 4 800 |
    | Senior | 6 à 9,5 ans | 4 850 à 6 100 |
    | Expert | 10 à 20 ans | 6 150 à 8 150 |

  - **Jauges** : Aujourd'hui, Fin d'année et Objectif sont **fixes** ; seul le point du scénario bouge.
- **Équipes**, **Reporting** (diagnostic, analyse, recommandations) et **Sources & paramètres** (connecteur Excel, accès, règles de calcul).

### Version mobile

- Barre de navigation en bas, panneaux qui glissent depuis le bas, tableaux transformés en cartes.
- Simulateur dans l'ordre : résumé collant en haut, managers « ‹ › », scénarios, « Ajouter une recrue », équipe, résultat.
- Vérifié à 360 et 390 px de large : aucun défilement horizontal, aucun bloc qui se chevauche.

## 3. Fonctionnement technique

- **Un seul fichier** `pilotage-talents.html` : HTML, CSS et JavaScript sans framework, graphiques en SVG.
  - Polices : Inter (Google Fonts).
  - Lecture Excel : SheetJS `xlsx@0.18.5` (cdnjs).
- **Pas de `<!doctype>` ni de `<head>`** dans le fichier : la plateforme d'artefacts les ajoute à la publication. `serveur.js` et `construire.js` les ajoutent pour l'usage local.
- **État** : un objet global `S` (people, moves, managers, manager, session, goals, scen, activeScen, levels, targets, conn, access…). `ALL = '__all__'` désigne le périmètre « toute l'entreprise ».
- **Stockage navigateur** (`localStorage`) :
  - `pilotage-talents-v2` : réglages et scénarios (`scenV: 3`) ;
  - `pilotage-session` : le compte choisi ;
  - `pilotage-rail` : le menu replié ou non.

  Ce stockage est propre à chaque navigateur.
- **Stockage partagé** (capacité `db` de l'artefact, uniquement en ligne) :
  - `shared/goals` : les objectifs publiés par l'admin, de la forme `{def:{sen,tjm}, by:{[manager]:{sen,tjm}}}` ;
  - `shared/data-meta` et `shared/data-f1-*`, `f2`, `f3` : les données importées, par blocs de 500 lignes.
  - **Règles d'accès** : lecture pour tous, écriture réservée à l'admin.
  - **En local**, ce stockage n'existe pas : l'outil fonctionne avec ses valeurs par défaut.
- **Calculs principaux** (rechercher ces noms dans le fichier) :
  - `current()` et `forecast()` : la situation actuelle, puis la prévision vieillie au 31/12 (départs retirés, entrées au prorata).
  - `simulate(sc)` et `simFor(manager, rows)` : l'effet des recrues.
  - `proposeScenarios()` : les suggestions A, B, C, par recherche combinatoire jusqu'à 12 recrues.
  - `globalPlans()` : les plans de répartition de l'admin.
  - `analyse()` et `suggestions()` : le reporting.
  - `goalFor(m)` et `studioGoal()` : les objectifs.
- **Simulateur** :
  - **Rendu** : `viewSimulateur()`, `suggHtml()` (côté manager), `suggAllHtml()` (côté admin, par manager) et `recapHtml()` (plan entreprise).
  - **Mise à jour** : `updMeter()` pour les jauges, `refreshStudio()` et `renderLanes()`.
  - **Ajustements** : `lvlRange()` pour les bornes par profil, `seedPlan()` et `setMgrPick()` pour le plan admin.
- **Données fictives** : `buildDemo(ref)`, générées par un aléatoire à graine fixe (identiques partout) mais **calculées à partir de la date du jour**. Les chiffres glissent donc un peu avec le temps. Pour une démo figée, fixer `today` à une date précise.
- **Managers fictifs** :

  | Manager | Collaborateurs |
  |---|---|
  | Mohamed Diallo | 24 |
  | Sara Alaoui | 19 |
  | Karim Bennani | 21 |
  | Nadia El Fassi | 15 |

  Scénario de démonstration : on part d'aujourd'hui, la prévision fait une partie du chemin, et l'objectif est ambitieux.

## 4. Préférences de design à respecter

Ces règles viennent des retours faits pendant la conception.

- **Aucun texte ne doit déborder ni se chevaucher**, sur ordinateur comme sur mobile.
- **Pas de défilement horizontal**, nulle part.
- **La version mobile doit être aussi bonne que la version ordinateur** : vérifier à 360 et 390 px.
- **Ton neutre** : rien qui suggère de contrôler ou de surveiller quelqu'un. Les titres actuels sont « Équipes en chiffres » et « Vue d'ensemble de l'équipe : effectif, séniorité et TJM ».
- **Simplicité et clarté** avant tout : le simulateur doit se comprendre sans explication (glisser, cliquer, voir l'effet).
- **Identité visuelle** :
  - police Inter, bleu `#2563eb`, fond clair avec un léger effet verre ;
  - barre de progression avec un **drapeau vert** pour l'objectif ;
  - animations douces, qui respectent `prefers-reduced-motion`.
- Les **bulles et libellés des jauges** ne doivent jamais toucher le drapeau ni les autres libellés.

## 5. Reste à faire

1. **Connecter les vrais fichiers Excel** (fichiers 1, 2 et 3) une fois fournis.
   - L'import manuel existe déjà, avec détection automatique des colonnes.
   - Le connecteur Microsoft 365 / SharePoint n'est pas encore activé.
2. **Restreindre le partage** de l'artefact en ligne avant d'y mettre de vraies données : il est actuellement visible par toute personne ayant le lien.
3. **Prévoir une vraie authentification** et un filtrage par manager côté serveur avant tout usage réel.
4. **Partager le plan admin** entre comptes. Les choix A, B, C par manager sont aujourd'hui stockés dans le navigateur de l'admin seulement.
5. **Question ouverte** : faut-il figer la date de référence des données fictives pour les démonstrations ?

## 6. Publier

- La version en ligne est l'artefact https://claude.ai/artifact/Vk16GkVRFH4ee1SXj7fLy8 (version 35 au moment de la passation).
- Pour mettre à jour ce même lien, il faut un accès en modification à l'artefact. Demandez-le à son propriétaire, depuis le menu « Partager ».
- Dans Claude Code, demandez alors de publier `pilotage-talents.html` sur cette URL : Claude relit d'abord la version en ligne, puis publie par-dessus.
