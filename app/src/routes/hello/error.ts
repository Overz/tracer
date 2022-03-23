import { Router } from 'express';

const router = Router();

router.get('/hello/error', async () => {
  throw new Error('Error accessing endpoint...');
});

export { router as helloErrorRouter };
