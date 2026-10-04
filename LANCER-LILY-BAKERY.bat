@echo off
title Lily Bakery
cd /d "%~dp0"
echo ==== Lily Bakery : demarrage ====
if not exist backend\node_modules (
  echo Premiere fois : installation du backend...
  cd backend && call npm install && cd ..
)
if not exist frontend\node_modules (
  echo Premiere fois : installation du site...
  cd frontend && call npm install && cd ..
)
start "Lily Bakery - Backend (ne pas fermer)" cmd /k "cd /d %~dp0backend && npm start"
start "Lily Bakery - Site (ne pas fermer)" cmd /k "cd /d %~dp0frontend && npm run dev -- --open"
echo Le site s'ouvre dans ton navigateur. Pour arreter : ferme les 2 fenetres noires.
timeout /t 5 >nul
