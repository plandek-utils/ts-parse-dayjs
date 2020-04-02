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
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import minMax from "dayjs/plugin/minMax";
import weekOfYear from "dayjs/plugin/weekOfYear";
// tslint:enable:no-submodule-imports

dayjs.extend(utc);
dayjs.extend(AdvancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(weekOfYear);
dayjs.extend(minMax);

// exporting the type
export { Dayjs };

// exporting the isDayjs function
export { isDayjs };

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

export type DayjsInput = Dayjs | Date | string | number | null;

export const DEFAULT_DATE_FORMAT = "Do MMM YYYY";

export function formatDate(date: null | undefined, dateFormat?: string): null;
export function formatDate(date: Dayjs, dateFormat?: string): string;
export function formatDate(date: Dayjs | null | undefined, dateFormat?: string): string | null;
export function formatDate(
  date: Dayjs | null | undefined,
  dateFormat: string = DEFAULT_DATE_FORMAT
): string | null {
  return date ? date.format(dateFormat) : null;
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
