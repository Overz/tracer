import { metrics } from '@services';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/metrics/counter/:id', async (req: Request, res: Response) => {
  const { data, contenttype } = await metrics.getCounterData(req.params.id);

  res.set('Content-Type', contenttype);
  res.send(data);
});

export { router as counterMetricsRouter };
