import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  base: './',
  plugins: [
    {
      name: 'html-entry-resolver',
      enforce: 'pre',
      transformIndexHtml(html) {
        // If index.html points to the compiled bundle, feed /src/main.tsx to Vite for compilation and dev
        return html
          .replace(/<link[^>]*href=["'][^"']*assets\/index[^"']*\.css["'][^>]*>/gi, '')
          .replace(/<script[^>]*src=["'][^"']*assets\/index[^"']*\.js["'][^>]*><\/script>/gi, '<script type="module" src="/src/main.tsx"></script>');
      },
    },
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
}));
