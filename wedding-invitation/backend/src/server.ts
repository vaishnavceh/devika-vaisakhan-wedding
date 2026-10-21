import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/index.js';
import weddingRoutes from './routes/weddingRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// Security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Dynamic CORS configuration
const allowedOrigins = config.corsOrigin === '*' 
  ? '*' 
  : config.corsOrigin.split(',').map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins === '*') {
        return callback(null, true);
      }
      
      // Allow exact match or Vercel preview deploys (*.vercel.app)
      if (
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/.test(origin)
      ) {
        return callback(null, true);
      }
      
      return callback(null, false);
    },
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// API Routes
app.use('/api', weddingRoutes);

// Root informational endpoint
app.get('/', (_req, res) => {
  res.json({
    name: 'Devika & Vaisakhan Wedding Invitation API',
    status: 'running',
    endpoints: {
      health: '/api/health',
      wedding: '/api/wedding',
    },
  });
});

// 404 & Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(config.port, '0.0.0.0', () => {
  console.log(`[Wedding API] Server running on http://0.0.0.0:${config.port}`);
  console.log(`[Wedding API] Environment: ${config.nodeEnv}`);
});

// Graceful shutdown
const handleShutdown = (signal: string) => {
  console.log(`[Wedding API] Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('[Wedding API] HTTP server closed.');
    process.exit(0);
  });
  
  // Force shutdown after 10 seconds if hanging
  setTimeout(() => {
    console.error('[Wedding API] Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

export default app;
