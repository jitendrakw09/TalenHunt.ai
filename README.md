# Aurora Interview Studio

Aurora Interview Studio is a full-stack technical interview platform with real-time coding, video collaboration, session history, and problem practice.

## Features

- Real-time collaborative coding sessions
- 1:1 video interview rooms with Stream
- Auth and user management with Clerk
- Session lifecycle APIs with Node + Express + MongoDB
- Problem practice flow with live code execution

## Local Setup

1) Install dependencies

```bash
npm install --prefix backend
npm install --prefix frontend
```

2) Configure environment files

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3) Run backend

```bash
npm run dev --prefix backend
```

4) Run frontend (new terminal)

```bash
npm run dev --prefix frontend
```

## Production Build (without Docker)

```bash
npm run build
npm run start
```

This builds frontend assets and starts the backend server that serves `frontend/dist` in production mode.

## Docker Deployment

1) Create environment file:

```bash
cp backend/.env.example backend/.env
```

2) Build and run:

```bash
docker compose up --build -d
```

3) Verify:

```bash
curl http://localhost:3000/health
```

## Environment Variables

### Backend (`backend/.env`)

- `PORT` default `3000`
- `NODE_ENV` (`development` or `production`)
- `DB_URL`
- `INNGEST_EVENT_KEY`
- `INNGEST_SIGNING_KEY`
- `STREAM_API_KEY`
- `STREAM_API_SECRET`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLIENT_URL` (supports comma-separated origins)

### Frontend (`frontend/.env`)

- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_API_URL`
- `VITE_STREAM_API_KEY`

## Git Workflow (genuine)

Use meaningful, feature-based branches and commits:

- Branch names like `feature/session-filters`, `fix/cors-origin-check`, `docs/deployment-guide`
- Commits that describe real changes and pass build checks
- Open PRs for review instead of creating artificial branch/commit noise
