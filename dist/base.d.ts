import dayjs, { type Dayjs, isDayjs } from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/en-au";
import "dayjs/locale/en-ca";
import "dayjs/locale/en-gb";
import "dayjs/locale/en-ie";
import "dayjs/locale/en-il";
import "dayjs/locale/en-nz";
import "dayjs/locale/en-sg";
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
import durationPlugin, { type Duration, type DurationUnitsObjectType, type DurationUnitType } from "dayjs/plugin/duration";
export type { Dayjs, Duration, DurationUnitsObjectType, DurationUnitType };
export { isDayjs };
export declare const min: typeof dayjs.min;
export declare const max: typeof dayjs.max;
export declare const duration: durationPlugin.CreateDurationType;
export declare const isDuration: typeof dayjs.isDuration;
type TYear = `${number}`;
type TMonth = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";
type TDay = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31";
type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;
type TSeconds = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;
/**
 * Represent a string like `2021-01-08`
 *
 * Checks that the month is between 01 and 12, and the day between 01 and 31. It does not check invalid dates like 2021-02-31.
 * Only checks that the year is a number.
 */
export type ISODate = `${TYear}-${TMonth}-${TDay}`;
/**
 * Represent a string like `14:42:34.678`
 */
export type ISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;
/**
 * Represent a string like `2021-01-08T14:42:34.678Z` (format: ISO 8601).
 *
 * It is not possible to type more precisely (list every possible values for months, hours, etc.) as
 * it would result in a warning from TypeScript:
 *   "Expression produces a union type that is too complex to represent. ts(2590)"
 */
export type ISODateString = `${ISODate}T${ISOTime}Z`;
/**
 * Convert a Dayjs object to an ISO string.
 * @param d
 */
export declare function toISOString(d: Dayjs): ISODateString;
/**
 * Converts a Dayjs object to an ISO date string. YYYY-MM-DD
 * @param d
 */
export declare function toISODate(d: Dayjs): ISODate;
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
export declare function durationBetween(from: Dayjs, to: Dayjs): Duration;
/**
 * List of imported locales.
 * If you import more dayjs locales in your app, pass the actual locale object as param instead of the name
 */
export declare enum AvailableLocales {
    EnglishUSA = "en",
    EnglishAU = "en-au",
    EnglishCA = "en-ca",
    EnglishGB = "en-gb",
    EnglishIE = "en-ie",
    EnglishIL = "en-il",
    EnglishNZ = "en-nz",
    EnglishSG = "en-SG"
}
export declare const DEFAULT_LOCALE = AvailableLocales.EnglishGB;
export type LocaleParam = AvailableLocales | ILocale;
export type DayjsInput = Dayjs | Date | string | number | null | undefined;
export type StrictDayjsInput = Exclude<Dayjs, null | undefined>;
export declare const DEFAULT_DATE_FORMAT = "Do MMM YYYY";
export declare const DEFAULT_DATETIME_FORMAT = "Do MMM YYYY h:mm A";
export declare function formatDate(date: null | undefined, dateFormat?: string): null;
export declare function formatDate(date: Dayjs, dateFormat?: string): string;
export declare function formatDate(date: Dayjs | null | undefined, dateFormat?: string): string | null;
export declare function formatDateTime(date: null | undefined, dateFormat?: string): null;
export declare function formatDateTime(date: Dayjs, dateFormat?: string): string;
export declare function formatDateTime(date: Dayjs | null | undefined, dateFormat?: string): string | null;
/**
 * @internal
 */
export declare function createNow(locale: LocaleParam): Dayjs;
/**
 * @internal
 */
export declare function createFrom(value: DayjsInput, locale: LocaleParam): Dayjs | null;
