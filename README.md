# Équipes en chiffres

Outil RH de suivi de la séniorité moyenne et du TJM moyen des équipes, avec prévision au 31/12 et simulateur de recrutement.
Une seule page web (`pilotage-talents.html`), sans installation ni base de données.

> **Données fictives.** Cette version tourne sur des données chiffrées fictives.
> Les vrais fichiers Excel DRH / DAF seront connectés plus tard : **ne jamais les ajouter à ce dépôt** (le `.gitignore` les exclut).

- **Version en ligne** (artefact Claude) : https://claude.ai/artifact/Vk16GkVRFH4ee1SXj7fLy8
- **À lire en premier** : [`SYNTHESE.md`](SYNTHESE.md), qui donne tout l'historique, les décisions et le reste à faire.

## Lancer l'outil

**1. Le plus simple, sans rien installer**

Ouvrez d'un double-clic :

- `autonome/demo-26-10-2026.html` : **exactement la même démo qu'à la passation** (date figée au 26/10/2026, mêmes chiffres) ;
- `autonome/equipes-en-chiffres.html` : la même chose, mais à la date du jour.

**2. Pour développer : prévisualisation locale**

Node.js requis (https://nodejs.org). Sous Windows, double-cliquez sur `lancer.bat`, ou :

```bash
node serveur.js
```

Puis ouvrez :

- http://localhost:5177 pour la date du jour ;
- http://localhost:5177/?date=2026-10-26 pour les chiffres de la passation.

Rechargez la page après chaque modification de `pilotage-talents.html`, puis relancez `node construire.js` pour mettre à jour le dossier `autonome/`.

**Comptes de démonstration.** L'écran d'accueil propose « Administrateur » (vue entreprise) ou un manager (vue limitée à ses équipes). Il n'y a pas de mot de passe : c'est une démonstration, pas un contrôle d'accès.

**Connexion Internet.** Elle sert seulement à charger la police Inter (Google Fonts) et le lecteur Excel SheetJS (`xlsx@0.18.5`, cdnjs). Tout le reste est dans le fichier.

## Contenu du dépôt

| Élément | Rôle |
|---|---|
| `pilotage-talents.html` | **L'outil complet** (HTML, CSS, JavaScript). C'est le seul fichier à modifier. |
| `autonome/` | Versions prêtes à ouvrir d'un double-clic, générées par `construire.js`. |
| `donnees-fictives/` | Les 3 fichiers de démonstration au format des futurs fichiers DRH / DAF (CSV), pour tester l'import dans « Sources & paramètres ». |
| `maquettes/originales/` | Les 3 maquettes de départ (vues, police, mise en page). |
| `maquettes/references/` | Références d'interface partagées pendant la conception (propositions de scénarios). |
| `maquettes/retours/` | Captures des retours faits pendant la conception, dans l'ordre chronologique. |
| `SYNTHESE.md` | Besoin, fonctionnalités, architecture, préférences de design, reste à faire. |
| `CLAUDE.md` | Consignes lues automatiquement par Claude Code dans ce dossier. |
| `serveur.js` | Serveur local de prévisualisation (port 5177). |
| `construire.js` | Régénère le dossier `autonome/`. |
| `lancer.bat` | Lance le serveur et ouvre le navigateur (Windows). |
| `.claude/launch.json` | Configuration de prévisualisation pour l'application Claude. |

## Les données fictives

- **Comment elles sont produites** : elles sont générées dans le code (`buildDemo`) par un aléatoire à graine fixe. Elles sont donc identiques sur toutes les machines, mais calculées à partir de la date de référence.
- **Pour retrouver les chiffres de la passation**, fixez la date au 26/10/2026 (fichier `demo-26-10-2026.html` ou `?date=2026-10-26`).
- **Le contenu** : 4 managers fictifs, 79 collaborateurs, 16 mouvements prévus (8 entrées, 8 sorties).
- **Les fichiers CSV** de `donnees-fictives/` en sont l'export. Ils servent de modèle de colonnes pour les vrais fichiers.

## Continuer avec Claude Code

1. Clonez le dépôt :

   ```bash
   git clone <adresse-du-depot>
   ```

2. Ouvrez le dossier dans Claude Code (application de bureau ou terminal).
3. Claude lit `CLAUDE.md` tout seul. Demandez-lui : « Lis SYNTHESE.md puis lance la prévisualisation ».
4. Décrivez la modification voulue, comme dans une conversation normale.

Pour publier sur le **même lien en ligne**, il faut un accès en modification à l'artefact (menu « Partager » de la page, à demander à son propriétaire). Sans cet accès, Claude publiera un nouvel artefact, avec un nouveau lien.
