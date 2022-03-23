import { Router, Request, Response } from 'express';

const router = Router();

router.post('/hello', async (req: Request, res: Response) => {
  res.send({ post: true });
});

export { router as helloPostRouter };
