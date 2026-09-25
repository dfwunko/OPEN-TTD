import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API Health check & service entry point
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Nova Arcade Web Hub',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

  // API Catalog summary entry point
  app.get('/api/info', (_req, res) => {
    res.json({
      app: 'Nova Arcade',
      version: '1.0.0',
      environment: isProd ? 'production' : 'development',
      port: PORT
    });
  });

  if (!isProd) {
    // In development: mount Vite dev server middlewares for fast live preview
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true'
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // In production: serve pre-bundled static distribution
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));

    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Nova Arcade] Full-stack entry point listening on http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[Nova Arcade] Server failed to start:', err);
  process.exit(1);
});
