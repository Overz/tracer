import { Router, Request, Response } from 'express';
import { metrics } from '@services';

// const options: HttpsRequestOptions | HttpRequestOptions = {};
// const gateway = new Pushgateway('', options, register);

const router = Router();

router.get('/metrics', async (req: Request, res: Response) => {
  const { contenttype, data } = await metrics.getMetricData();

  res.set('Content-Type', contenttype);
  res.send(data);
});

export { router as customMetricsRouter };
