# RentDirect Starter (frontend + backend)

Estructura:
- backend/  -> Node.js + Express API (ESM)
- frontend/ -> React + Vite + Tailwind

Instrucciones rápidas:
1. Backend:
   - cd backend
   - cp .env.example .env  (ajusta credenciales)
   - npm install
   - Inicializa la DB con scripts/seed.sql
   - npm run dev

2. Frontend:
   - cd frontend
   - npm install
   - npm run dev

Si quieres, puedo crear también un archivo docker-compose.yml que levante backend y MySQL en contenedores.
