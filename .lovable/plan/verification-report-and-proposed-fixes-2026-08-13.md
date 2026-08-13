# Verification report and proposed fixes

Verification is complete. Nothing was changed. Below are the findings, then the fixes I propose if you approve.

## Verification results

1. Supabase / Lovable Cloud: fully removed from code. No client, no migrations, no packages, no env vars. The only remaining mentions are two documentation files (`ARCHITECTURE.md` and an archived plan note) that describe what was removed.
2. Express + MariaDB backend: code is complete and correct — connection pool, appointments, feedback, admin login (bcrypt + JWT httpOnly cookie), rate limiting, CORS allowlist, Helmet, health check, admin-creation script, and the 3-table schema (`appointments`, `feedback`, `admin_users`).
3. Frontend API calls: correct and matched to the API contract. Appointment form, feedback form, testimonials and the admin dashboard all call `src/lib/api.ts`, which sends `credentials: "include"` for the admin cookie.
4. Routes: all 15 routes exist, every internal link points to a real route, and the type check passes with zero errors. No missing dependencies in the frontend.

## Problems found

1. Blocking — no API is running yet. `VITE_API_BASE_URL` is unset, so browser calls go to the site's own origin and return 404 (this is exactly the `/api/admin/me` and `/api/admin/login` 404s in the preview). The forms and admin login cannot work until the Express API is deployed and that variable is set.
2. Blocking for Hostinger shared hosting — the frontend currently builds as a server-rendered app, not the static SPA that `public/.htaccess` assumes. Hostinger shared hosting (Apache + PHP) cannot run that output.
3. Backend dependencies are not installed (`server/node_modules` missing), so the API has never actually been started or exercised end to end.
4. Appointment "Department" sends display labels ("Joint Replacement") as `service_key`, while the static service files use slugs ("orthopaedic-services"). Values are stored fine but do not join to any service.
5. The appointment form never sends `doctorKey`, so the "book with a specific doctor" column is always empty.
6. Preferred time is supported by the API and the database but has no field in the form.
7. Testimonials still shows a heading that says the reviews are placeholders, even when approved patient feedback is loaded.
8. Hospital phone, address, email, map and social links in `src/data/site.ts` are still placeholders (`+91 00000 00000`).

## Proposed fixes

- Switch the frontend build to a fully static SPA/prerendered output so it can be uploaded to `public_html` with the existing `.htaccess`.
- Add local API config (`.env` with `VITE_API_BASE_URL`) and a dev proxy so the forms can be tested before deployment.
- Install backend dependencies and run the API against a local MariaDB to verify appointments, feedback, and admin login end to end.
- Map the department dropdown to service slugs, add an optional preferred-time field, and pass `doctorKey` when a doctor page initiates the booking.
- Update the testimonials heading to drop the "placeholder" wording once real feedback is present.
- Replace placeholder hospital contact details with the real ones (needs the real values from you).

## Technical notes

- Static output requires a prerender/SPA configuration in `vite.config.ts`; the admin route is already `ssr: false`, so it works as a client-only shell.
- Cross-origin admin cookies need `sameSite: "none"`, `secure: true`, HTTPS on both hosts, and the site domain listed in `CORS_ORIGINS`.
