import { ENV } from '@utils';
import { Router, Request, Response } from 'express';
import { totalmem, uptime, version, freemem } from 'os';
import bytes from 'bytes';

const router = Router();

router.get('/health', async (req: Request, res: Response) => {
  const { heapTotal, heapUsed, rss } = process.memoryUsage();

  const data = {
    name: ENV['APP_NAME'],
    versions: ENV['VERSIONS'],
    date: new Date().toISOString(),
    totalmemory: bytes(totalmem()),
    freememory: bytes(freemem()),
    memoryusage: {
      heap: bytes(heapTotal),
      used: bytes(heapUsed),
      main: bytes(rss),
      total: bytes(rss + heapTotal),
    },
    uptime: uptime(),
    os: version(),
  };

  res.send(data);
});

export { router as healthCheckRouter };
