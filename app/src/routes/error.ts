import { Router } from 'express';

const router = Router();

router.get('/error', async () => {
  throw new Error('Error accessing endpoint...');
});

export { router as errorRouter };
