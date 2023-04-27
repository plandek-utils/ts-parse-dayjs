import { Dayjs } from "./base";

import { DEFAULT_DATE_FORMAT, formatDate } from "./base";

export function makePrintWithPrefix(
  prefix: string,
  defaultDateFormat: string
): (from: Dayjs, dateFormat?: string) => string {
  return function printWithPrefix(from, dateFormat = defaultDateFormat) {
    const fromFormatted = formatDate(from, dateFormat);
    return `${prefix}${fromFormatted}`;
  };
}

export const printSince = makePrintWithPrefix("Since ", DEFAULT_DATE_FORMAT);
export const printStarted = makePrintWithPrefix("Started ", DEFAULT_DATE_FORMAT);

type MaybeDateRange = {
  from: Dayjs | null | undefined;
  to: Dayjs | null | undefined;
};

export function printRange({ from, to }: MaybeDateRange, dateFormat: string = DEFAULT_DATE_FORMAT): string | null {
  if (!from || !to) return null;

  const fromFormatted = from.format(dateFormat);
  const toFormatted = to.format(dateFormat);

  if (fromFormatted === toFormatted) return `${fromFormatted}`;

  return `${fromFormatted} - ${toFormatted}`;
}
