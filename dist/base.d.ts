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
import { z } from "zod";
export type { Dayjs, Duration, DurationUnitsObjectType, DurationUnitType };
export { isDayjs };
export declare const min: typeof dayjs.min;
export declare const max: typeof dayjs.max;
export declare const duration: durationPlugin.CreateDurationType;
export declare const isDuration: typeof dayjs.isDuration;
/**
 * Utility type for deep comparison
 *
 * use it for checking the compatibility of the schema with the type:
 * e.g.:
 *   // If there is a type mismatch, TypeScript will throw an error here
 *   const _checkGridLine: DeepEqual<z.infer<typeof gridLineSchema>, GridLine> = true;
 */
export type DeepEqual<T, U> = (T extends U ? (U extends T ? true : never) : never) & (keyof T extends keyof U ? (keyof U extends keyof T ? true : never) : never);
export declare const dayjsSchemaStrict: z.ZodType<dayjs.Dayjs, z.ZodTypeDef, dayjs.Dayjs>;
export type TYear = `${number}` | `-${number}`;
export declare const tYearSchema: z.ZodType<TYear, z.ZodTypeDef, TYear>;
export type TMonth = `${number}${number}`;
export declare const tMonthSchema: z.ZodType<`${number}${number}`, z.ZodTypeDef, `${number}${number}`>;
export type TDay = `${number}${number}`;
export declare const tDaySchema: z.ZodType<`${number}${number}`, z.ZodTypeDef, `${number}${number}`>;
export type THours = `${number}${number}`;
export declare const tHoursSchema: z.ZodType<`${number}${number}`, z.ZodTypeDef, `${number}${number}`>;
export type TMinutes = `${number}${number}`;
export declare const tMinutesSchema: z.ZodType<`${number}${number}`, z.ZodTypeDef, `${number}${number}`>;
export type TSeconds = TMinutes;
export declare const tSecondsSchema: z.ZodType<`${number}${number}`, z.ZodTypeDef, `${number}${number}`>;
type TMilliseconds = `${number}${number}${number}`;
export declare const tMillisecondsSchema: z.ZodType<`${number}${number}${number}`, z.ZodTypeDef, `${number}${number}${number}`>;
/**
 * Represent a string like `2021-01-08`
 *
 * Checks that the month is between 01 and 12, and the day between 01 and 31. It does not check invalid dates like 2021-02-31.
 * Only checks that the year is a number.
 */
export type ISODate = `${TYear}-${TMonth}-${TDay}`;
export declare const isoDateSchema: z.ZodType<`${number}-${number}${number}-${number}${number}` | `-${number}-${number}${number}-${number}${number}`, z.ZodTypeDef, `${number}-${number}${number}-${number}${number}` | `-${number}-${number}${number}-${number}${number}`>;
/**
 * Represent a string like `14:42:34.678`
 */
export type ISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;
/** */
export declare const isoTimeSchema: z.ZodType<`${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}`, z.ZodTypeDef, `${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}`>;
/**
 * Represent a string like `2021-01-08T14:42:34.678Z` (format: ISO 8601).
 *
 * It is not possible to type more precisely (list every possible values for months, hours, etc.) as
 * it would result in a warning from TypeScript:
 *   "Expression produces a union type that is too complex to represent. ts(2590)"
 */
export type ISODateString = `${ISODate}T${ISOTime}Z`;
export declare const isoDateStringSchema: z.ZodType<`${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z` | `-${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z`, z.ZodTypeDef, `${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z` | `-${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z`>;
export declare const serializedDateStringSchema: z.ZodUnion<[z.ZodType<`${number}-${number}${number}-${number}${number}` | `-${number}-${number}${number}-${number}${number}`, z.ZodTypeDef, `${number}-${number}${number}-${number}${number}` | `-${number}-${number}${number}-${number}${number}`>, z.ZodType<`${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z` | `-${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z`, z.ZodTypeDef, `${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z` | `-${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z`>]>;
export type SerializedDateString = z.infer<typeof serializedDateStringSchema>;
export declare const ISO_DATE_STRING_REGEX: RegExp;
export declare function isISODateString(x: unknown): x is ISODateString;
/**
 * Convert a Dayjs object to an ISO string.
 * @param d
 */
export declare function toISOString(d: Dayjs): ISODateString;
export declare const toISODateString: typeof toISOString;
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
