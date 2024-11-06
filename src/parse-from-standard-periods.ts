import { DEFAULT_LOCALE, type Dayjs, type LocaleParam } from "./base";
import { dayjsNow } from "./dayjs-now";
import type { ParseStandardPeriodOptions } from "./options";
import { extractInteger, isValidNumber } from "./utils";

export interface IDayjsRange {
  from: Dayjs | null;
  to: Dayjs | null;
}

export interface IDayjsRangeStrict {
  from: Dayjs;
  to: Dayjs;
}

/**
 * @internal
 */
const PERIODS = [
  { re: /^([\d]+)y$/, unit: "year" },
  { re: /^([\d]+)m$/, unit: "month" },
  { re: /^([\d]+)w$/, unit: "week" },
  { re: /^([\d]+)d$/, unit: "day" },
] as const;

type Unit = (typeof PERIODS)[number]["unit"];

/**
 * @internal
 */
function extractPeriod(value: string): { unit: Unit; q: number } | null {
  for (const { re, unit } of PERIODS) {
    const q = extractInteger(value, re);
    if (isValidNumber(q)) {
      return { q, unit };
    }
  }

  return null;
}

/**
 * @internal
 */
function calculateFrom(value: string, origin: Dayjs, locale: LocaleParam): Dayjs | null {
  const period = extractPeriod(value);
  if (!period) return null;

  return origin.locale(locale).subtract(period.q, period.unit).startOf(period.unit);
}

/**
 * given a string like `8d`, `12w`, `9m` or `2y`, it returns an object with the calculated range of 8 days, 12 weeks, 9 months and 2 years ago respectively.
 *
 * Optionally we can set an origin as second argument, otherwise the current time is used.
 *
 * *note: BREAKING CHANGE from 2.x to 3.x: The second argument is now an object like `{ origin: originDate }` instead of the origin directly**
 *
 * If the string cannot be parsed correctly, it will return `null`.
 *
 * If the string is parsed correctly, it will return an object with:
 *
 * - `to`: the given origin (or current time if missing), at EOD of UTC (e.g. today at 23:59:59.999Z)
 * - `from`: the calculated `from` after subtracting the given amount of the given unit, at the beginning of the period (beginning of the day, of the week, of the month or of the year)
 *
 * @param value string to parse
 * @param options
 * @param options.locale optional custom locale, defaults to DEFAULT_LOCALE
 * @param options.origin optional custom origin, defaults to NOW
 * @see dayjsNow
 * @see DEFAULT_LOCALE
 */
export function parseFromStandardPeriods(
  value: string,
  { locale = DEFAULT_LOCALE, origin }: ParseStandardPeriodOptions = {},
): IDayjsRangeStrict | null {
  const o = origin || dayjsNow({ locale });
  const from = calculateFrom(value, o, locale);
  if (!from) return null;
  const to = o.endOf("day");
  return { from, to };
}
