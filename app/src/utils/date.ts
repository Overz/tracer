import { parseISO, startOfDay, endOfDay, format } from 'date-fns';

export type DateFormat = Date | string | number | null | undefined;

export interface DateParserOptions {
  pattern?: string;
  startOfTheDay?: boolean;
  isEndOfTheDay?: boolean;
}

export type DateParserResponse = [string, Date | null];
export type DateParser = (
  date: DateFormat,
  opts?: DateParserOptions
) => DateParserResponse;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ConversionOptions<T = any> {
  ignoreFalsy?: boolean;
  allowEmpty?: boolean;
  only?: (keyof T)[];
  except?: (keyof T)[];
  remap?: Partial<{ [K in keyof T]: string }>;
  dateParserFn?: DateParser;
}

export const fixDay = (day: number | Date): string => {
  let tmp = 0;

  if (typeof day === 'number') {
    if (day <= 9) {
      tmp = day;
    }
  }

  if (day instanceof Date) {
    tmp = day.getDate();
  }

  return tmp <= 9 ? `0${tmp}` : `${tmp}`;
};

/**
 * Realiza a normalização da data
 * para o horario local da maquina
 *
 * @param date data
 * @param options opções para converção
 * @returns [string, date | null]
 */
export const dateFormat: DateParser = (
  date: DateFormat,
  options = {} as DateParserOptions
): DateParserResponse => {
  if (!date) {
    return ['', null];
  }

  if (!options.pattern) {
    options.pattern = 'yyyy-MM-dd HH:mm:ss.SSS';
  }

  if (typeof date === 'string') {
    // unix em string
    if (date.match(/[0-9]{10,14}/g)) {
      date = new Date(Number(date));
    } else {
      date = parseISO(date);
    }
  }

  if (typeof date === 'number') {
    date = new Date(date);
  }

  if (options.startOfTheDay) {
    date = startOfDay(date);
  }

  if (options.isEndOfTheDay) {
    date = endOfDay(date);
  }

  const parsed = format(date, options.pattern);
  const s = parsed.split(' ');

  return [parsed, new Date(`${s[0]}T${s[1]}Z`)];
};
