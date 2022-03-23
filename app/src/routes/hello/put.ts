import { Router, Request, Response } from 'express';

const router = Router();

router.put('/hello', async (req: Request, res: Response) => {
  res.send({ put: true });
});

export { router as helloPutRouter };
