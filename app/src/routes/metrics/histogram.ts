import { metrics } from '@services';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/metrics/histogram', async (req: Request, res: Response) => {
  const { data, contenttype } = await metrics.getHistogramData(req.params.id);

  res.set('Content-Type', contenttype);
  res.send(data);
});

export { router as histogramMetricsRouter };
