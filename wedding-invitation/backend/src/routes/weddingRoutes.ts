import { Router, Request, Response } from 'express';
import { getWeddingData } from '../data/weddingData.js';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'kerala-wedding-invitation-api',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

router.get('/wedding', (_req: Request, res: Response) => {
  try {
    const data = getWeddingData();
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve wedding invitation details.',
    });
  }
});

export default router;
