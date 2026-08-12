# Architecture analysis: Hostinger + Express + MariaDB

## What exists today (verified)

This project is still the untouched starter template. There is no hospital website in it yet:

- `src/routes/` contains only `__root.tsx` and `index.tsx`, and `index.tsx` is the blank placeholder graphic.
- `src/components/` contains only the shadcn `ui/` primitives — no hospital components.
- No database, no Supabase/Cloud, no API layer, no server functions. `package.json` has React 19, TanStack Start v1, Vite, Tailwind v4, shadcn, react-hook-form, zod, sonner.

So "prepare the existing hospital website" cannot mean modifying pages here — those pages do not exist in this project. The kshirsagarorthopaedic code has not been brought in (the repo 404s to anonymous access, and GitHub is not to be connected yet).

## Answer to the earlier database question

1. **No** — the project as it stands is not compatible with Hostinger MariaDB/MySQL, because it has no data layer at all.
2. Current database: **none**.

## Changes required for the target architecture

### 1. Rendering mode: SSR must go
TanStack Start's default output is a server bundle for an edge/Node runtime. Hostinger shared hosting serves static files (plus your own Node process if it is a VPS). Required change: build the frontend as a static SPA (`prerender`/SPA mode, no server functions, no SSR-only logic) so `dist/` can be uploaded to `public_html`. Consequence: **no `createServerFn` anywhere** — every dynamic read/write goes over `fetch` to the Express API.

### 2. A separate Express backend repo/folder
A `server/` Node + Express app, deployed separately on Hostinger (VPS or Node hosting), with:
- `mysql2/promise` connection pool to Hostinger MariaDB
- `zod` validation on every request body
- CORS restricted to the site domain
- `helmet`, request rate limiting on the public POST endpoints
- `bcrypt` password hashing + JWT (httpOnly cookie) for admin auth
- `.env` for DB host/user/password/JWT secret (never in the frontend bundle)

This backend cannot live inside the Lovable project's runtime; it is a sibling deliverable that we author here and you deploy on Hostinger.

### 3. API surface
Public:
- `POST /api/appointments` — create appointment request
- `POST /api/feedback` — create patient feedback

Admin (JWT-protected):
- `POST /api/admin/login`, `POST /api/admin/logout`, `GET /api/admin/me`
- `GET /api/appointments`, `PATCH /api/appointments/:id` (status)
- `GET /api/feedback`, `PATCH /api/feedback/:id` (approve/hide), `DELETE /api/feedback/:id`

### 4. MySQL/MariaDB schema (3 tables only)
- `appointments` — id, name, phone, email, preferred_date, preferred_time, doctor_key, service_key, message, status enum, created_at
- `feedback` — id, name, rating tinyint, message, is_approved tinyint, created_at
- `admin_users` — id, username unique, password_hash, role, created_at

Delivered as a plain `.sql` file you import via Hostinger phpMyAdmin. No ORM migrations, no Postgres syntax.

### 5. Static content stays in the repo
Doctors, hospital info, services, gallery, timings, contact details live as typed TS data modules under `src/content/` (e.g. `doctors.ts`, `services.ts`, `gallery.ts`) with images imported from `src/assets/`. No DB tables, no CMS. Editing content = editing those files and redeploying — that is the intended tradeoff.

### 6. Frontend data layer
- One `src/lib/api.ts` wrapper around `fetch` using `import.meta.env.VITE_API_BASE_URL` (safe to expose; it is just the API origin).
- TanStack Query `useMutation` for appointment/feedback forms, `useQuery` for admin lists.
- Admin routes guarded client-side by an auth check against `/api/admin/me`; real enforcement is server-side in Express.

### 7. Routing/deploy details
- Hostinger needs an `.htaccess` rewrite so SPA deep links (`/doctors`, `/admin`) fall back to `index.html`.
- Vite `base` stays `/` assuming the site sits at the domain root.
- Site pages needed: home, about, doctors, services, gallery, appointment, feedback, contact, plus `/admin` (login + dashboard).

### 8. Things that must be avoided
- Lovable Cloud / Supabase / Postgres / Mongo — none used.
- `createServerFn`, `src/routes/api/*` server routes, SSR loaders touching secrets — all incompatible with a static Hostinger frontend.
- DB credentials anywhere in `src/` or any `VITE_` variable.

## Open question before implementation

The hospital site's actual pages and design still need to get into this project. Options: make the repo public, upload a ZIP, or rebuild the pages here from your content. Nothing is implemented until you pick one and approve this architecture.
