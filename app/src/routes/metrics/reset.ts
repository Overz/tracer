import { metrics } from '@services';
import { Router, Request, Response } from 'express';

const router = Router();

router.post('/metrics/reset', async (req: Request, res: Response) => {
  metrics.resetMetrics();
  res.send({ ok: true });
});

export { router as resetMetricsRouter };
