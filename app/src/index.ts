import { server } from './app';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { resolve } from 'path';
import { ENV, envs, LOGS_PATH } from '@utils';
import {
  setupLogger,
  logger,
  removeLogs,
  metricsCounterCriticalError,
} from '@services';
import { setupMetrics } from 'metrics';

const start = async (): Promise<void> => {
  try {
    console.log('[ENVIRONMENTS] Reading environments...');
    expand(config({ path: resolve(__dirname, '..', '.env') }));

    envs();

    if (ENV['DEBUG']) {
      console.log('[ENVIRONMENT] Printing:', ENV);
    }
  } catch (err) {
    exit('[ENVIRONMENTS] Error reading environments!', err);
  }

  try {
    console.log('[LOGGER] Settings up logger...');
    setupLogger({
      colored: ENV['LOG_COLORED'],
      fileName: ENV['LOG_FILE_NAME'],
      level: ENV['LOG_LEVEL'],
      maxFiles: ENV['LOG_MAX_FILES'],
      maxsize: ENV['LOG_MAX_SIZE'],
      path: LOGS_PATH,
    });
  } catch (err) {
    exit('[LOGGER] Error setting up logger!', err);
  }

  try {
    setupMetrics();
  } catch (err) {
    exit('[APP] Error settings up Metrics!', err);
  }

  try {
    logger.info('Starting server...', { label: '[APP]' });
    const app = server();
    app.listen(ENV['PORT'], () =>
      logger.info(`${ENV['APP_NAME']} Running on port ${ENV['PORT']}`, {
        label: '[APP]',
      })
    );
  } catch (err) {
    exit('[APP] Error starting application!', err);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const exit = (msg: string, err?: any): void => {
  if (logger) {
    logger.error(msg, { err });
  } else {
    console.error(msg, '\n', err);
  }

  metricsCounterCriticalError.inc(1);

  process.exit(1);
};

const finish = async (): Promise<never> => {
  if (logger) {
    logger.warn('Cleaning up...', { label: '[APP]' });

    if (ENV['DEBUG']) {
      await removeLogs(LOGS_PATH);
    }

    logger.close();
  } else {
    console.log('[APP] Cleaning up...');
  }

  process.exit(0);
};

process.on('SIGINT', finish);
process.on('SIGTERM', finish);

start();
