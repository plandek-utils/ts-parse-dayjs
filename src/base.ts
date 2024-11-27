import dayjs, { type Dayjs, isDayjs } from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/en-au";
import "dayjs/locale/en-ca";
import "dayjs/locale/en-gb";
import "dayjs/locale/en-ie";
import "dayjs/locale/en-il";
import "dayjs/locale/en-nz";
import "dayjs/locale/en-sg";

// main imports for plugins for the types.
import "dayjs/plugin/advancedFormat";
import "dayjs/plugin/duration";
import "dayjs/plugin/isBetween";
import "dayjs/plugin/isSameOrAfter";
import "dayjs/plugin/isSameOrBefore";
import "dayjs/plugin/minMax";
import "dayjs/plugin/updateLocale";
import "dayjs/plugin/utc";
import "dayjs/plugin/weekOfYear";
import "./dayjs-plugin/relative-time-plugin";

import advancedFormat from "dayjs/plugin/advancedFormat";
import durationPlugin, {
  type Duration,
  type DurationUnitsObjectType,
  type DurationUnitType,
} from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import minMax from "dayjs/plugin/minMax";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";

import { relativeTimeStrictPlugin } from "./dayjs-plugin/relative-time-plugin";

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

import { z } from "zod";
import { parseInteger } from "./utils";

// exporting the type
export type { Dayjs, Duration, DurationUnitsObjectType, DurationUnitType };
// exporting the isDayjs function
export { isDayjs };

export const min = dayjs.min;
export const max = dayjs.max;

export const duration = dayjs.duration;
export const isDuration = dayjs.isDuration;

/**
 * Utility type for deep comparison
 *
 * use it for checking the compatibility of the schema with the type:
 * e.g.:
 *   // If there is a type mismatch, TypeScript will throw an error here
 *   const _checkGridLine: DeepEqual<z.infer<typeof gridLineSchema>, GridLine> = true;
 */
export type DeepEqual<T, U> = (T extends U ? (U extends T ? true : never) : never) &
  (keyof T extends keyof U ? (keyof U extends keyof T ? true : never) : never);

// see https://github.com/colinhacks/zod/discussions/1259#discussioncomment-3954250
export const dayjsSchemaStrict = z.instanceof(dayjs as unknown as typeof Dayjs);

export type TYear = `${number}`;

const YEAR_REGEX = /^-?\d+$/;
export const tYearSchema = z.custom<TYear>((val) => {
  return typeof val === "string" ? YEAR_REGEX.test(val) : false;
});

export const tMonthSchema = z.enum(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]);
export type TMonth = z.infer<typeof tMonthSchema>;

export const tDaySchema = z.enum([
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
]);
export type TDay = z.infer<typeof tDaySchema>;

const TWO_DIGIT_NUMBER_REGEX = /^\d{2}$/;
const THREE_DIGIT_NUMBER_REGEX = /^\d{3}$/;

export type THours = `${number}${number}`;
export const tHoursSchema = z.custom<THours>((val) => {
  if (typeof val !== "string") return false;
  if (!TWO_DIGIT_NUMBER_REGEX.test(val)) return false;
  const parsed = parseInteger(val);
  return parsed >= 0 && parsed <= 23;
});

export type TMinutes = `${number}${number}`;
export const tMinutesSchema = z.custom<TMinutes>((val) => {
  if (typeof val !== "string") return false;
  if (!TWO_DIGIT_NUMBER_REGEX.test(val)) return false;
  const parsed = parseInteger(val);
  return parsed >= 0 && parsed <= 59;
});

export type TSeconds = TMinutes;
export const tSecondsSchema = tMinutesSchema;

type TMilliseconds = `${number}${number}${number}`;
export const tMillisecondsSchema = z.custom<TMilliseconds>((val) => {
  if (typeof val !== "string") return false;
  return THREE_DIGIT_NUMBER_REGEX.test(val);
});

/**
 * Represent a string like `2021-01-08`
 *
 * Checks that the month is between 01 and 12, and the day between 01 and 31. It does not check invalid dates like 2021-02-31.
 * Only checks that the year is a number.
 */
export type ISODate = `${TYear}-${TMonth}-${TDay}`;
export const isoDateSchema = z.custom<ISODate>((val) => {
  if (typeof val !== "string") return false;
  const [year, month, day] = val.split("-");

  if (!tYearSchema.safeParse(year).success) return false;
  if (!tMonthSchema.safeParse(month).success) return false;
  if (!tDaySchema.safeParse(day).success) return false;

  return true;
});

/**
 * Represent a string like `14:42:34.678`
 */
export type ISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;

/**
 *
 */
export const isoTimeSchema = z.custom<ISOTime>((val) => {
  if (typeof val !== "string") return false;

  const [hours, minutes, seconds] = val.split(":");
  const [secondsPart, milliseconds] = (seconds ?? "").split(".");
  if (!tHoursSchema.safeParse(hours).success) return false;
  if (!tMinutesSchema.safeParse(minutes).success) return false;
  if (!tSecondsSchema.safeParse(secondsPart).success) return false;
  if (!tMillisecondsSchema.safeParse(milliseconds).success) return false;

  return true;
});

/**
 * Represent a string like `2021-01-08T14:42:34.678Z` (format: ISO 8601).
 *
 * It is not possible to type more precisely (list every possible values for months, hours, etc.) as
 * it would result in a warning from TypeScript:
 *   "Expression produces a union type that is too complex to represent. ts(2590)"
 */
export type ISODateString = `${ISODate}T${ISOTime}Z`;

export const isoDateStringSchema = z.custom<ISODateString>((val) => {
  if (typeof val !== "string") return false;

  const [date, rest] = val.split("T");
  if (!isoDateSchema.safeParse(date).success) return false;

  if (!rest.endsWith("Z")) return false;

  const time = rest.slice(0, -1);
  return isoTimeSchema.safeParse(time).success;
});

/**
 * Convert a Dayjs object to an ISO string.
 * @param d
 */
export function toISOString(d: Dayjs): ISODateString {
  return d.toISOString() as ISODateString;
}

const ISO_DATE_FORMAT = "YYYY-MM-DD";

/**
 * Converts a Dayjs object to an ISO date string. YYYY-MM-DD
 * @param d
 */
export function toISODate(d: Dayjs): ISODate {
  return d.format(ISO_DATE_FORMAT) as ISODate;
}

declare module "dayjs" {
  interface Dayjs {
    toISOString(): ISODateString;
  }
}

/**
 * returns the Duration between the given 2 dates as a dayjs Duration object
 * @param from
 * @param to
 */
export function durationBetween(from: Dayjs, to: Dayjs): Duration {
  return duration(to.diff(from));
}

const relativeTimeConfig = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "a few seconds",
  m: "1 minute",
  mm: "%d minutes",
  h: "1 hour",
  hh: "%d hours",
  d: "1 day",
  dd: "%d days",
  M: "1 month",
  MM: "%d months",
  y: "1 year",
  yy: "%d years",
};

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

dayjs.updateLocale(AvailableLocales.EnglishAU, { relativeTime: relativeTimeConfig });
dayjs.updateLocale(AvailableLocales.EnglishCA, { relativeTime: relativeTimeConfig });
dayjs.updateLocale(AvailableLocales.EnglishGB, { relativeTime: relativeTimeConfig });
dayjs.updateLocale(AvailableLocales.EnglishIE, { relativeTime: relativeTimeConfig });
dayjs.updateLocale(AvailableLocales.EnglishIL, { relativeTime: relativeTimeConfig });
dayjs.updateLocale(AvailableLocales.EnglishNZ, { relativeTime: relativeTimeConfig });
dayjs.updateLocale(AvailableLocales.EnglishSG, { relativeTime: relativeTimeConfig });
dayjs.updateLocale(AvailableLocales.EnglishUSA, { relativeTime: relativeTimeConfig });

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
  dateFormat: string = DEFAULT_DATETIME_FORMAT,
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
