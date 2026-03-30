# Feedback Tracker Pro

Feedback Tracker Pro is a full-stack TypeScript portfolio project. Public visitors can submit feedback, and admins can sign in with Firebase Authentication to access a protected dashboard backed by an Express API and PostgreSQL with Prisma.

## Tech stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Firebase Authentication
- Backend: Node.js, Express, TypeScript, Prisma, PostgreSQL, Zod, Winston
- Quality: Jest, ESLint
- DevOps: Docker, Docker Compose, GitHub Actions

## Features

- Public feedback submission form
- Protected admin dashboard using Firebase Authentication
- Prisma-backed PostgreSQL persistence with JSON fallback for local development
- Zod request validation
- Winston logging
- Responsive layout with light and dark mode
- Dockerized frontend, backend, and database

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

## Testing and linting

```bash
cd backend
npm test

cd ../frontend
npm run lint
```

## Docker

```bash
docker compose up --build
```

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3000`

## Database and documentation

- Prisma schema: `backend/prisma/schema.prisma`
- Demo SQL: `docs/demo-data.sql`
- ERD: `docs/ERD.md`
- Wireframe notes: `docs/wireframe-notes.md`

## CI

GitHub Actions runs backend tests/builds and frontend lint/build from `.github/workflows/ci.yml`.
