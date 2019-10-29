import dayjs, { Dayjs, isDayjs } from "dayjs";
// tslint:disable:no-submodule-imports
import "dayjs/locale/en";
import "dayjs/locale/en-au";
import "dayjs/locale/en-ca";
import "dayjs/locale/en-gb";
import "dayjs/locale/en-ie";
import "dayjs/locale/en-il";
import "dayjs/locale/en-nz";
import "dayjs/locale/en-SG";
// tslint:disable-next-line:no-submodule-imports
import utc from "dayjs/plugin/utc";
// tslint:enable:no-submodule-imports

dayjs.extend(utc);

/**
 * error class to signal that the given input does not end up with a valid Dayjs object
 */
export class InvalidDateError extends Error {}

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
  EnglishSG = "en-SG"
}

export type LocaleParam =
  | AvailableLocales
  | { name: string; [key: string]: any };

export type DayjsInput = Dayjs | Date | string | number | null;

type LocaleOptions = { locale?: LocaleParam };

export const DEFAULT_LOCALE = AvailableLocales.EnglishGB;

/**
 * returns the current Dayjs (in UTC)
 * @param locale locale to use (by default DEFAULT_LOCALE)
 * @see DEFAULT_LOCALE
 */
export function dayjsNow({
  locale = DEFAULT_LOCALE
}: LocaleOptions = {}): Dayjs {
  return dayjs.utc().locale(locale);
}

/**
 * it returns a Dayjs object (in UTC) representing the given date, unless:
 * - it receives null, or empty string (then returns null)
 * - it produces an invalid Dayjs (then returns null)
 * - it receives a Dayjs object (then returns the same object)
 * @param value input to create the Dayjs object
 * @param locale locale to use (by default DEFAULT_LOCALE)
 * @see DEFAULT_LOCALE
 */
export function parseDayjs(
  value: DayjsInput,
  { locale = DEFAULT_LOCALE }: LocaleOptions = {}
): Dayjs | null {
  if (!value) return null;
  if (isDayjs(value)) return value;

  const d = dayjs.utc(value).locale(locale);
  if (!d.isValid()) return null;

  return d;
}

/**
 * it returns a Dayjs object (in UTC) representing the given date, unless:
 * - it receives null, or empty string (then throws an error)
 * - it produces an invalid Dayjs (then throws an error)
 * - it receives a Dayjs object (then returns the same object)
 * @param value
 * @param options
 * @throws InvalidDateError
 */
export function parseDayjsOrError(
  value: DayjsInput,
  options: LocaleOptions = {}
): Dayjs {
  const parsed = parseDayjs(value, options);
  if (!parsed) {
    throw new InvalidDateError(`invalid date to parse ${value}`);
  }
  return parsed;
}

/**
 * parses the Dayjs (in UTC) with the given input and modifies it to be at the beginning of the UTC day
 * @param value
 * @param options
 * @see parseDayjs
 */
export function parseDayjsStartOfDay(
  value: DayjsInput,
  options: LocaleOptions = {}
): Dayjs | null {
  const d = parseDayjs(value, options);
  return d ? d.utc().startOf("day") : null;
}

/**
 * parses the Dayjs (in UTC) with the given input and modifies it to be at the end of the UTC day
 * @param value
 * @param options
 * @see parseDayjs
 */
export function parseDayjsEndOfDay(
  value: DayjsInput,
  options: LocaleOptions = {}
): Dayjs | null {
  const d = parseDayjs(value, options);
  return d ? d.utc().endOf("day") : null;
}
