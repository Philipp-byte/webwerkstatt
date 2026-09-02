import { defineConfig } from 'vite';

// base: "/webwerkstatt/" für GitHub Pages; für den Schulserver
// (Flask liefert die App unter /) beim Bauen WEBWERKSTATT_BASE=/ setzen.
export default defineConfig({
  base: process.env.WEBWERKSTATT_BASE ?? '/webwerkstatt/',
  server: {
    port: 5174,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    target: 'es2020',
  },
});
