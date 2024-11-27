import { type Dayjs } from "./base";
import type { ParseStandardPeriodOptions } from "./options";
export interface IDayjsRange {
    from: Dayjs | null;
    to: Dayjs | null;
}
export interface IDayjsRangeStrict {
    from: Dayjs;
    to: Dayjs;
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
export declare function parseFromStandardPeriods(value: string, { locale, origin }?: ParseStandardPeriodOptions): IDayjsRangeStrict | null;
