import { Router, Request, Response } from 'express';

const router = Router();

router.delete('/hello', async (req: Request, res: Response) => {
  res.send({ delete: true });
});

export { router as helloDeleteRouter };
