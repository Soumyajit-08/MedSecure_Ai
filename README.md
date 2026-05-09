# MadSecure AI

MadSecure AI is a comprehensive, AI-powered healthcare security and patient management platform. It integrates advanced machine learning to provide secure data handling, diagnostic assistance, and streamlined clinical workflows.

## Monorepo Structure

- `frontend` - Next.js 14 frontend app and UI modules
- `backend` - Node.js + Express API
- `ai-service` - FastAPI AI/ML service (next step)
- `infra` - deployment and platform assets

## Step-by-Step Build Plan

1. Backend architecture (auth, RBAC, healthcare APIs)
2. Frontend premium SaaS UI with dashboards
3. AI training/inference pipelines (FastAPI + Transformers)
4. Frontend-backend-AI integration
5. Motion polish, charts, and production hardening

## Local Run (Backend + Frontend)

```bash
# Backend terminal
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend terminal
cd ../frontend
npm install
cp .env.example .env.local
npm run dev
```

## Environment

Set values in `backend/.env`:

- `NODE_ENV`
- `PORT`
- `MONGO_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_ACCESS_EXPIRES_IN`
- `JWT_REFRESH_EXPIRES_IN`
- `CLIENT_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `ALLOW_START_WITHOUT_DB` (use `true` only in local dev)

Set values in `frontend/.env.local`:

- `NEXT_PUBLIC_API_URL` (example: `http://localhost:8090/api/v1`)

## API Health

- `GET /api/v1/health`

## Medical Dataset

The backend includes a public, non-PHI symptom-to-disease reference dataset for
local illness search and fallback predictions:

- `GET /api/v1/illness/dataset`
- `POST /api/v1/illness/search`
- Source: Kaggle Symptom2Disease public dataset, CC0 Public Domain
- Scope: 24 disease-symptom association records for educational triage support

## Why startup errors happened

- Mongo URI had placeholder host (`<CLUSTER_HOST>`) and malformed value once.
- Backend and frontend were run before required dependencies/files existed.
- Port conflict (`EADDRINUSE`) occurred when multiple backend instances used `8080`.

## Production Deployment

### Backend on Render

1. Connect repo to Render and choose `backend` as root directory.
2. Build command: `npm install`
3. Start command: `npm start`
4. Add env vars from `backend/.env.example` with production values.
5. Set `ALLOW_START_WITHOUT_DB=false`.
6. Health check path: `/api/v1/health`

### Frontend on Vercel

1. Import repo in Vercel and choose `frontend` as project root.
2. Framework preset: Next.js.
3. Add env var:
   - `NEXT_PUBLIC_API_URL=https://<your-render-backend-domain>/api/v1`
4. Deploy.

## Security Note

- Rotate DB password if it has been shared in chat/logs.
