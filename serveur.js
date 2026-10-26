// Serveur local de prévisualisation : http://localhost:5177
// Le fichier source n'a ni <!doctype> ni <head> (la plateforme d'artefacts les ajoute à la publication),
// ce serveur les ajoute de la même façon pour voir exactement ce qui sera publié.
const http = require('http'), fs = require('fs'), path = require('path');
const PORT = process.env.PORT || 5177;
const SOURCE = path.join(__dirname, 'pilotage-talents.html');

http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
  res.end('<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'
    + fs.readFileSync(SOURCE, 'utf8') + '</body></html>');
}).listen(PORT, () => console.log(`Équipes en chiffres : http://localhost:${PORT}`));
