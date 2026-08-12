# Production architecture

```text
Browser
   |
   |  static files (HTML/JS/CSS)        HTTPS JSON (fetch)
   v                                     |
Hostinger public_html  <---------------  |
   (React + TanStack Start build)        v
                                 api.your-domain.com
                                 Node.js + Express (server/)
                                         |
                                         v
                                 Hostinger MariaDB / MySQL
                                 appointments | feedback | admin_users
```

No Lovable Cloud, Supabase, PostgreSQL or MongoDB is used anywhere.

## Split of responsibilities

| Data | Where it lives |
| --- | --- |
| Doctors, services, gallery, hospital info, timings, contact | `src/content/*.ts` + `src/assets` (static, in the repo) |
| Appointment requests | MySQL `appointments`, via Express |
| Patient feedback | MySQL `feedback`, via Express |
| Admin users | MySQL `admin_users`, via Express |

## Frontend rules for this architecture

- **No server functions.** Do not use `createServerFn`, `src/routes/api/*`
  server routes, or SSR loaders that touch secrets. Every dynamic read/write
  goes through `src/lib/api.ts` → Express.
- **No DB credentials in the frontend.** The only exposed variable is
  `VITE_API_BASE_URL` (see `.env.example`).
- Forms use `react-hook-form` + `zod`, submitted with a TanStack Query
  `useMutation` calling `api.createAppointment` / `api.createFeedback`.
  The same zod rules are re-validated server-side in Express.
- Admin pages check `api.me()` on load; enforcement is server-side.
- Static content is imported directly from `src/content/*` — no fetching.

## Building for Hostinger

The Lovable preview runs the app with SSR. For Hostinger shared hosting the
site must be produced as static output:

1. Build the project.
2. Upload the client build output plus `public/.htaccess` into `public_html`.
3. `.htaccess` forces HTTPS and rewrites deep links to `index.html`.

If the site is instead hosted on a Hostinger VPS running Node, the same Express
app can serve the static build with `express.static()` on one origin — in that
case `VITE_API_BASE_URL` can be left empty and requests become same-origin.

## Backend

See `server/README.md` for setup, endpoints, security and deployment.
