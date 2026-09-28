import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'production-bundle-flag',
      transformIndexHtml(html) {
        if (command === 'build') {
          return html.replace(
            '<!-- %PROD_FLAG% -->',
            '<script>window.__IS_PROD_BUNDLE__ = true;</script>'
          );
        }
        return html;
      },
    },
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
}));
