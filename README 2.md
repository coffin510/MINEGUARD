# MineGuard Backend

A REST API for MineGuard — mine worker safety monitoring. Provides
authentication, live environmental sensor readings per work area, worker
wearable ("band") vitals, and safety incident reporting.

## What's in here

```
backend/                      → the whole API, drop this folder into your MineGuard project root
frontend-files-to-copy-in/    → 3 files that replace/add to your existing frontend
```

## Features added

- JWT authentication (register/login) — real auth instead of the placeholder link
- Work area sensor data (temperature, humidity, AQI, gas levels) served from MongoDB
- Worker band vitals (heart rate, temperature, SpO2) served from MongoDB
- **Incident reporting** — log safety incidents by severity, tied to a work area/band, with a status you can update as they're investigated/resolved. This is the feature that matches the project's actual purpose and wasn't built into the UI yet.

## 1. Install the backend

Copy the `backend/` folder into your `MineGuard-main` project root (as a sibling to `src/`), then:

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and fill in your `MONGO_URI` (a free MongoDB Atlas cluster works fine)
and any `JWT_SECRET`. Note the port here is `5002` — pick something not already
used by another project.

Seed some demo data so the dashboard has something real to show:

```bash
npm run seed
```

Then start it:

```bash
npm run dev
```

## 2. Wire up the frontend

Copy these files from `frontend-files-to-copy-in/` into your existing
`MineGuard-main/src/`, overwriting the ones that already exist:

- `src/api.js` (new file — Axios client with auth token attached automatically)
- `src/components/LoginRegister.jsx` (replaces the fake login link with real API calls)
- `src/components/Dashboard.jsx` (replaces the hardcoded data with a live fetch, adds a "Report Incident" button)

In your frontend's `.env` (create one if it doesn't exist), add:

```
VITE_API_URL=http://localhost:5002/api
```

Then restart your frontend dev server (`npm run dev`) so it picks up the new `.env`.

## API overview

| Method | Endpoint                        | Description                          |
|--------|-----------------------------------|----------------------------------------|
| POST   | `/api/auth/register`             | Create an account                      |
| POST   | `/api/auth/login`                 | Log in, returns a JWT                  |
| GET    | `/api/workareas`                   | List all work areas                    |
| GET    | `/api/workareas/:areaId`           | Get one work area's sensor readings    |
| PATCH  | `/api/workareas/:areaId`           | Update sensor readings                 |
| GET    | `/api/bands`                        | List bands (supports `?active=true`)  |
| POST   | `/api/bands`                        | Register a new band/worker             |
| PATCH  | `/api/bands/:id`                     | Update a band's vitals                 |
| GET    | `/api/incidents`                     | List incidents (filter by status/severity) |
| POST   | `/api/incidents`                     | Report an incident                     |
| PATCH  | `/api/incidents/:id`                 | Update an incident's status             |

All routes except `/api/auth/*` require an `Authorization: Bearer <token>` header.

## What changed in the login form

The original design had a **Username** field on login that just linked to
`/dashboard` with no actual check. Since accounts are identified by email in
this backend, the login field is now **Email** — register with an email/password
first, then log in with those same credentials.
