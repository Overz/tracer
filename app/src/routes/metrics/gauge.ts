import { metrics } from '@services';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/metrics/gauge', async (req: Request, res: Response) => {
  const { data, contenttype } = await metrics.getGaugeData(req.params.id);

  res.set('Content-Type', contenttype);
  res.send(data);
});

export { router as gaugeMetricsRouter };
