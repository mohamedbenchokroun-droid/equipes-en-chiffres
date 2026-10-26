@echo off
REM Lance la prévisualisation locale (Node.js requis : https://nodejs.org)
cd /d "%~dp0"
start "" http://localhost:5177
node serveur.js
