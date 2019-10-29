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

export const DEFAULT_LOCALE = AvailableLocales.EnglishGB;

export type LocaleParam =
  | AvailableLocales
  | { name: string; [key: string]: any };

export type DayjsInput = Dayjs | Date | string | number | null;

/**
 * @internal
 */
export function createNow(locale: LocaleParam): Dayjs {
  return dayjs.utc().locale(locale);
}

/**
 * @internal
 */
export function createFrom(
  value: DayjsInput,
  locale: LocaleParam
): Dayjs | null {
  if (!value) return null;
  const d = isDayjs(value) ? value : dayjs.utc(value).locale(locale);
  return d.isValid() ? d : null;
}
