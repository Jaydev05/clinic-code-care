// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Hostinger shared hosting serves static files only: emit an SPA shell so
    // every URL can be served from index.html via public/.htaccess.
    spa: { enabled: true },
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
