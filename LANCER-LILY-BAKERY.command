#!/bin/bash
cd "$(dirname "$0")"
[ -d backend/node_modules ] || (cd backend && npm install)
[ -d frontend/node_modules ] || (cd frontend && npm install)
(cd backend && npm start) &
sleep 2
cd frontend && npm run dev -- --open
