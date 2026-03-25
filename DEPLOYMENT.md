# Deployment Runbook

## Prerequisites

- Docker and Docker Compose installed
- Required secrets configured (Clerk, Stream, MongoDB, Inngest)

## Build and Run

```bash
cp backend/.env.example backend/.env
# update backend/.env values for target environment
# required for docker-compose local stack:
# - CLIENT_URL=http://localhost:3000
# - keep DB_URL as-is; docker-compose injects container-safe DB_URL automatically

docker compose up --build -d
```

## Smoke Checks

```bash
curl http://localhost:3000/health
```

Expected result includes:

- `status: ok`
- `environment`
- `uptimeSeconds`

## Logs and Rollback

```bash
docker compose logs -f app
```

To rollback, redeploy the previous image tag or previous git release branch.

## Post-Deploy Verification

- Frontend loads from server root
- Auth login flow works
- Creating and joining session works
- Problems list and single problem page load

## Common Deployment Targets

- Local Docker: `docker compose up --build -d`
- Single container hosts (Render/Railway/Fly): build with `npm run build`, start with `npm run start`

## Render Deployment (Recommended for this repo)

### 1) Create Web Service

- In Render, connect this GitHub repository.
- Use Blueprint deploy with `render.yaml` (recommended) or create a Web Service manually.

### 2) Build and Start Commands

- Build command: `npm run build`
- Start command: `npm run start`
- Health check path: `/health`

### 3) Required Environment Variables

Set these in Render service settings:

- `NODE_ENV=production`
- `PORT=3000`
- `DB_URL` (use MongoDB Atlas URI)
- `CLIENT_URL` (your Render app URL, e.g. `https://your-app.onrender.com`)
- `CLERK_SECRET_KEY`
- `CLERK_PUBLISHABLE_KEY`
- `VITE_CLERK_PUBLISHABLE_KEY`
- `STREAM_API_KEY`
- `STREAM_API_SECRET`
- `VITE_STREAM_API_KEY`
- `INNGEST_EVENT_KEY`
- `INNGEST_SIGNING_KEY`

### 4) Notes

- `VITE_API_URL` is optional in production because frontend and API are served from the same origin.
- Ensure Clerk allowed origins and redirect URLs include your Render domain.
- If using Atlas, allow Render egress in your MongoDB network access rules.
