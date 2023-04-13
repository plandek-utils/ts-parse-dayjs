import dayjs, { Dayjs, isDayjs } from "dayjs";
// tslint:disable:no-submodule-imports
// tslint:disable:no-duplicate-imports
import "dayjs/locale/en";
import "dayjs/locale/en-au";
import "dayjs/locale/en-ca";
import "dayjs/locale/en-gb";
import "dayjs/locale/en-ie";
import "dayjs/locale/en-il";
import "dayjs/locale/en-nz";
import "dayjs/locale/en-sg";
import advancedFormat from "dayjs/plugin/advancedFormat";
import durationPlugin, { Duration, DurationUnitsObjectType, DurationUnitType } from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import minMax from "dayjs/plugin/minMax";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";
import updateLocale from "dayjs/plugin/updateLocale";

import { relativeTimeStrictPlugin } from "./relative-time-plugin";
// tslint:enable:no-duplicate-imports
// tslint:enable:no-submodule-imports

dayjs.extend(advancedFormat);
dayjs.extend(durationPlugin);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(minMax);
dayjs.extend(relativeTimeStrictPlugin);
dayjs.extend(utc);
dayjs.extend(weekOfYear);
dayjs.extend(updateLocale);

// exporting the type
export { Dayjs, Duration, DurationUnitsObjectType, DurationUnitType };

// exporting the isDayjs function
export { isDayjs };

const duration = dayjs.duration;
const isDuration = dayjs.isDuration;

// exporting the duration functions
export { duration, isDuration };

/**
 * returns the Duration between the given 2 dates as a dayjs Duration object
 * @param from
 * @param to
 */
export function durationBetween(from: Dayjs, to: Dayjs): Duration {
  return duration(to.diff(from));
}

/**
 * List of imported locales.
 * If you import more dayjs locales in your app, pass the actual locale object as param instead of the name
 */
export enum AvailableLocales {
  EnglishUSA = "en",
  EnglishAU = "en-au",
  EnglishCA = "en-ca",
  EnglishGB = "en-gb",
  EnglishIE = "en-ie",
  EnglishIL = "en-il",
  EnglishNZ = "en-nz",
  EnglishSG = "en-SG",
}

export const DEFAULT_LOCALE = AvailableLocales.EnglishGB;

export type LocaleParam = AvailableLocales | ILocale;

export type DayjsInput = Dayjs | Date | string | number | null | undefined;
export type StrictDayjsInput = Exclude<Dayjs, null | undefined>;

export const DEFAULT_DATE_FORMAT = "Do MMM YYYY";
export const DEFAULT_DATETIME_FORMAT = "Do MMM YYYY h:mm A";

export function formatDate(date: null | undefined, dateFormat?: string): null;
export function formatDate(date: Dayjs, dateFormat?: string): string;
export function formatDate(date: Dayjs | null | undefined, dateFormat?: string): string | null;
export function formatDate(date: Dayjs | null | undefined, dateFormat: string = DEFAULT_DATE_FORMAT): string | null {
  return date ? date.format(dateFormat) : null;
}

export function formatDateTime(date: null | undefined, dateFormat?: string): null;
export function formatDateTime(date: Dayjs, dateFormat?: string): string;
export function formatDateTime(date: Dayjs | null | undefined, dateFormat?: string): string | null;
export function formatDateTime(
  date: Dayjs | null | undefined,
  dateFormat: string = DEFAULT_DATETIME_FORMAT
): string | null {
  return formatDate(date, dateFormat);
}

/**
 * @internal
 */
export function createNow(locale: LocaleParam): Dayjs {
  return dayjs.utc().locale(locale);
}

/**
 * @internal
 */
export function createFrom(value: DayjsInput, locale: LocaleParam): Dayjs | null {
  if (!value) return null;
  const d = isDayjs(value) ? value : dayjs.utc(value).locale(locale);
  return d.isValid() ? d : null;
}
