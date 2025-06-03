# Errolian Club Calendar

This monorepo contains a basic full-stack calendar application.

## Requirements
- Node.js 18+
- npm

## Setup
### Backend
```
cd backend
cp .env.example .env
npm install
# edit .env if needed
# generate DB (requires prisma CLI)
# npx prisma generate
npm run seed
npm start
```

### Frontend
```
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend runs at `http://localhost:3000` and backend at `http://localhost:3001`.

## PWA
Add to home screen by visiting the site on mobile. Offline caching via service worker is included.
