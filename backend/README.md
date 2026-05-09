# MedSecure API

Production-oriented Express API for MedSecure AI.

## Architecture

- `src/controllers` request handling
- `src/routes` route definitions
- `src/models` MongoDB schemas
- `src/middleware` auth/errors/not-found
- `src/services` integrations (AI service)
- `src/config` environment/database

## Endpoints

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/forgot-password`
- `GET /api/v1/users/me`
- `GET /api/v1/users` (admin)
- `POST /api/v1/predictions`
- `GET /api/v1/predictions`
- `POST /api/v1/chatbot`
- `POST /api/v1/appointments`
- `GET /api/v1/appointments`
- `POST /api/v1/reports` (multipart field: `report`)
- `GET /api/v1/reports`
- `GET /api/v1/analytics/admin` (admin)
- `GET /api/v1/illness/dataset`
- `POST /api/v1/illness/search`
- `GET /api/v1/health`

## Medical Dataset

The local illness search and fallback diagnosis flow use a public Symptom2Disease-style
reference dataset in `src/data/localIllnessDataset.js`.

- Source: Kaggle Symptom2Disease public dataset
- License: CC0 Public Domain
- Scope: 24 disease-symptom association records
- Privacy: no patient identifiers or protected health information
- Use: educational triage support only; not a clinical diagnosis engine

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```
