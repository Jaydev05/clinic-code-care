// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// NOTE: a fully static (SPA/prerendered) build is not supported by this template —
// enabling `spa`/`prerender` breaks the build because the bundled server entry and
// the prerender preview server disagree on the output path. The frontend therefore
// needs a Node/edge runtime (Lovable hosting or a Hostinger VPS), while the Express
// API + MariaDB backend runs separately as designed.
export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    server: {
      // Dev only: forward /api/* to the local Express API (server/, port 4000)
      // so the appointment, feedback and admin calls work without CORS setup.
      proxy: {
        "/api": {
          target: process.env["DEV_API_TARGET"] ?? "http://localhost:4000",
          changeOrigin: true,
        },
      },
    },
  },
});
