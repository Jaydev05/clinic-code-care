# Bring in kshirsagarorthopaedic + Hostinger MySQL direction

## Database answers (current project)

1. **No** — not compatible with Hostinger MariaDB/MySQL as-is.
2. Current database: **None**. This project is a fresh TanStack Start template with no backend wired up. If a database were added through Lovable Cloud it would be **PostgreSQL**, not MySQL/MariaDB.

## Getting the repo in

`github.com/Jaydev05/kshirsagarorthopaedic` returns 404 to anonymous access, so it is private or renamed. Lovable also cannot import an existing GitHub repository into a project — the GitHub integration creates a repo *from* this project and then syncs two-way.

Practical path:

1. You connect GitHub from the chat Plus (+) menu → GitHub → Connect project, and create the repo link for this project.
2. Because direct import is unsupported, the existing site's code is brought over one of two ways:
   - You push the existing code into the newly connected Lovable repo (same default branch); it then syncs down into this project, or
   - You share the source (public repo, ZIP upload, or key files pasted) and the pages are rebuilt here.
3. Once the code lands, the site structure is reviewed and the existing routes/pages are mapped onto TanStack Start routes under `src/routes`.

Nothing can be pulled until one of those happens — this is the blocking step.

## Hostinger (MySQL/PHP) implications

Since hosting is Hostinger with MySQL:

- Lovable Cloud (Postgres) is not used. No Supabase client, no `createServerFn` DB access against Postgres.
- Any data layer talks to your MySQL/MariaDB through a small PHP or Node API you host on Hostinger; the frontend calls it over HTTPS with `fetch`.
- The Lovable app is built as a static/SPA-friendly frontend so it can be uploaded to Hostinger; server-only features (server functions, SSR-dependent logic) are avoided.
- Contact/appointment forms, if any, post to your PHP endpoint rather than a Lovable backend.

If the existing repo is already a PHP/MySQL site, we decide whether to keep that backend and only rebuild the frontend here, or rebuild both — that decision needs a look at the code.

## Technical notes

- Stack here is fixed: React 19 + TanStack Start v1 + Vite 7 + Tailwind v4. PHP files can live in the repo but do not run in the Lovable preview.
- Routes are file-based in `src/routes`; `src/routes/index.tsx` currently holds the placeholder home page and is replaced first.
- Design tokens go in `src/styles.css`; no hardcoded colors in components.
- Each page route gets its own `head()` with unique title/description/OG tags for SEO (important for a clinic site).

## Next step

Connect GitHub, then tell me which transfer route you want for the existing code.
