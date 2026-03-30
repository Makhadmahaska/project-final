# Feedback Tracker Pro

Feedback Tracker Pro is an upgraded full-stack portfolio project built from the original feedback form starter. It now includes a public submission flow, a protected Firebase-powered admin dashboard, Prisma-backed PostgreSQL persistence, Tailwind styling, Zustand UI state, Zod validation, Winston logging, Jest tests, Docker, and GitHub Actions CI.

## Tech stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Zustand, Firebase Authentication
- Backend: Node.js, Express, TypeScript, Prisma, PostgreSQL, Zod, Winston
- Quality: Jest, ESLint
- DevOps: Docker, Docker Compose, GitHub Actions

## Features

- Public feedback form with category, rating, notification opt-in, and validation
- Responsive light and dark mode UI
- Firebase email/password sign-in for admins
- Protected dashboard for viewing and updating feedback statuses
- Live feedback summary cards powered by the backend
- Prisma schema and SQL demo data for local setup

## Project structure

- `frontend/` React client
- `backend/` Express API
- `docs/` ERD, wireframe notes, and SQL demo data

## Environment setup

1. Copy `backend/.env.example` to `backend/.env`
2. Copy `frontend/.env.example` to `frontend/.env`
3. Add your PostgreSQL connection string and Firebase credentials

## Run locally

### Backend

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Docker

Run the full stack with:

```bash
docker compose up --build
```

Frontend: `http://localhost:8080`

Backend: `http://localhost:3000`

## Database

- Prisma schema: `backend/prisma/schema.prisma`
- Demo SQL file: `docs/demo-data.sql`
- ERD: `docs/ERD.md`

## Testing and linting

```bash
cd backend && npm test
cd frontend && npm run lint
```

## CI

GitHub Actions is configured in `.github/workflows/ci.yml` to:

- install dependencies
- generate the Prisma client
- run backend tests
- run frontend lint
- build frontend and backend

## Deployment note

The project is deployment-ready, but it has not been published from this workspace because cloud deployment requires your own hosting account and Firebase project credentials. Good options are Vercel for the frontend and Render or Railway for the backend and PostgreSQL.