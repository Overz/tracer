import { format as winstonFormartter } from 'winston';
import { format as consoleFormatter } from 'util';
import { ENV, Indexable } from '@utils';
import fs from 'fs/promises';
import { logger } from './logger';
import { Format } from 'logform';

const { colorize, combine, metadata, printf } = winstonFormartter;

const meta = metadata({
  fillExcept: ['message', 'level', 'timestamp', 'label'],
});

const sanitizeLevel = (level: string): string => {
  const regex = /info|warn|error/gi;
  const tmp = level.match(regex);

  if (tmp) {
    const [value] = tmp;
    level = level.replace(value, value.toUpperCase());
  }

  return level;
};

const print = printf(({ level, message, label, metadata }) => {
  let msg = `${sanitizeLevel(level)}: ts="${new Date().toISOString()}" `;

  msg +=
    label && !message.match(/label=".*"/gi) ? `label="${label}" ` : message;

  msg += !message.match(/msg=".*"/gi) ? `msg="${message}" ` : message;

  if (metadata && JSON.stringify(metadata) !== '{}') {
    const { error, err, ...rest } = metadata;
    // should get the rest first
    msg = getRestOfMessage(msg, rest);
    // and error be second
    msg = getMessageErrors(msg, error || err);
  }

  return msg.trim().replace(/\s+/g, ' ');
});

const getMessageErrors = (msg: string, err: Indexable): string => {
  if (err) {
    if (err.isAxiosError) {
      msg = getAxiosError(err, msg);
    } else if (err.isCustomError) {
      msg = consoleFormatter(msg, err);
    } else {
      // msg += !msg.match(/error=".*"/gi) && `error="${err.message}"`;
      msg += err.stack && `\n${err.stack}\n`;
    }
  }

  return msg;
};

const getRestOfMessage = (msg: string, rest: Indexable): string => {
  if (rest && JSON.stringify(rest) !== '{}') {
    const { meta, ...others } = rest;

    if (meta) {
      if (typeof meta === 'object') {
        msg = metaPropertyFormart(msg, meta);
      } else {
        msg += ` ${meta} `;
      }
    }

    if (others && JSON.stringify(others) !== '{}') {
      msg = consoleFormatter(msg, others);
    }
  }

  return msg;
};

const withColor = combine(
  meta,
  colorize({ message: true, level: true }),
  print
);

const withoutColor = combine(meta, print);

export const loggerFormatter = (colored = false): Format =>
  colored ? withColor : withoutColor;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAxiosError = (e: any, msg: string): string => {
  const { data } = e.response;
  if (data) {
    const keys = Object.keys(data);

    for (const key of keys) {
      if (['string', 'number', 'bigint', 'boolean'].includes(data[key])) {
        msg += ` ${key}="${data[key]}" `;
      } else {
        msg = consoleFormatter(msg, data[key]);
      }
    }
  }

  return msg;
};

const metaPropertyFormart = (msg: string, meta: Indexable): string => {
  const keys = Object.keys(meta);

  for (const key of keys) {
    const isObject = typeof meta[key] === 'object';
    msg += isObject ? JSON.stringify(meta[key]) : ` ${key}="${meta[key]}" `;
  }

  return msg;
};

export const removeLogs = async (path: string): Promise<void> => {
  if (!ENV['DEBUG']) {
    throw new Error(`Tried to delete logs without debugging`);
  }

  const files = await fs.readdir(path);

  for (const file of files) {
    try {
      if (!file.endsWith('.log')) {
        continue;
      }

      await fs.unlink(`${path}/${file}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error(`msg="Error removing logs!"`, { err, label: '[LOGS]' });
    }
  }
};
