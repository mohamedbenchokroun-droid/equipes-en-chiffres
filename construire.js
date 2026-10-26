// Produit les versions autonomes, à ouvrir d'un double-clic sans serveur :
//   node construire.js
//   → autonome/equipes-en-chiffres.html   (date du jour)
//   → autonome/demo-26-10-2026.html        (date figée : mêmes chiffres que lors de la passation)
// À relancer après chaque modification de pilotage-talents.html.
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'pilotage-talents.html'), 'utf8');
const out = path.join(__dirname, 'autonome');
fs.mkdirSync(out, { recursive: true });
const page = date => '<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
  + (date ? `<script>window.REF_DATE='${date}'</script>` : '') + '</head><body>' + src + '</body></html>';
fs.writeFileSync(path.join(out, 'equipes-en-chiffres.html'), page(null));
fs.writeFileSync(path.join(out, 'demo-26-10-2026.html'), page('2026-10-26'));
console.log('Créés : autonome/equipes-en-chiffres.html et autonome/demo-26-10-2026.html');
