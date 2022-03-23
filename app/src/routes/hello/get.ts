import { Router, Request, Response } from 'express';

const router = Router();

router.get('/hello', async (req: Request, res: Response) => {
  res.send({ get: true });
});

export { router as helloGetRouter };
