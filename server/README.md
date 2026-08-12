# Hospital API (Node + Express + MariaDB/MySQL)

Standalone backend for the hospital website. Deployed separately from the
frontend on Hostinger (VPS or Node.js hosting). It is the ONLY component that
talks to the database — the React frontend never holds DB credentials.

## What it stores

Only dynamic data:

- `appointments` — appointment requests from the website
- `feedback` — patient feedback (unapproved until an admin approves it)
- `admin_users` — admin logins (bcrypt hashes)

Doctors, services, gallery and hospital information are static content in the
frontend repo (`src/content/*`), not in the database.

## Setup

```bash
cd server
npm install
cp .env.example .env      # fill in Hostinger DB credentials + JWT_SECRET
```

Import the schema into your Hostinger database (phpMyAdmin → Import, or):

```bash
mysql -u DB_USER -p DB_NAME < db/schema.sql
```

Create the first admin:

```bash
npm run create-admin -- admin "a-strong-password"
```

Run:

```bash
npm start          # production
npm run dev        # local, with --watch
```

Health check: `GET /api/health`.

## Endpoints

Public:
- `POST /api/appointments`
- `POST /api/feedback`
- `GET  /api/feedback/approved`

Admin (JWT in an httpOnly cookie):
- `POST /api/admin/login`, `POST /api/admin/logout`, `GET /api/admin/me`
- `GET /api/appointments`, `PATCH /api/appointments/:id`
- `GET /api/feedback`, `PATCH /api/feedback/:id`, `DELETE /api/feedback/:id`

## Security notes

- All input validated with zod; all SQL uses parameterised queries.
- CORS is restricted to `CORS_ORIGINS`; credentials are allowed so the admin
  cookie works cross-origin. Cookie is `httpOnly`, `SameSite=None`, `Secure`
  (requires HTTPS on both the site and the API).
- Rate limits: 20 public form posts / 10 min, 10 login attempts / 15 min.
- Keep `.env` out of version control and off the public web root.

## Hostinger deployment

1. Upload the `server/` folder outside `public_html` (e.g. `~/api`).
2. In hPanel → Node.js app, set the application root to that folder, startup
   file `src/index.js`, and add the environment variables from `.env`.
3. Point a subdomain (e.g. `api.your-domain.com`) at the Node app and enable
   SSL.
4. Set `VITE_API_BASE_URL=https://api.your-domain.com` in the frontend build.
