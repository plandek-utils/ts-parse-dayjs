import { type Dayjs, type DayjsInput, type ISODateString } from "./base";
import type { ParseOptions } from "./options";
/**
 * it returns a Dayjs object (in UTC) representing the given date, unless:
 * - it receives null, or empty string (then returns null)
 * - it produces an invalid Dayjs (then returns null)
 * - it receives a Dayjs object (then returns the same object)
 * @param value input to create the Dayjs object
 * @param options
 * @param options.locale locale to use (by default DEFAULT_LOCALE)
 * @param options.time null, or one of TimeOverride or TimeDefault
 * @see DEFAULT_LOCALE
 * @see TimeOverride
 * @see TimeDefault
 */
export declare function parseDayjs(value: DayjsInput, options: ParseOptions & {
    strict: true;
}): Dayjs;
export declare function parseDayjs(value: DayjsInput, options?: ParseOptions): Dayjs | null;
/**
 * it returns a Dayjs object (in UTC) representing the given date, unless:
 * - it receives null, or empty string (then throws an error)
 * - it produces an invalid Dayjs (then throws an error)
 * - it receives a Dayjs object (then returns the same object)
 * @param value
 * @param options
 * @throws InvalidDateError
 */
export declare function parseDayjsOrError(value: DayjsInput, options?: Omit<ParseOptions, "strict">): Dayjs;
/**
 * parses the Dayjs (in UTC) with the given input and modifies it to be at the beginning of the UTC day
 *
 * @param value
 * @param options
 * @see parseDayjs
 * @see TimeOverride.StartOfDay
 */
export declare function parseDayjsStartOfDay(value: DayjsInput, options?: Omit<ParseOptions, "time">): Dayjs | null;
/**
 * parses the Dayjs (in UTC) with the given input and modifies it to be at the end of the UTC day
 *
 * @param value
 * @param options
 * @see parseDayjs
 * @see TimeOverride.EndOfDay
 */
export declare function parseDayjsEndOfDay(value: DayjsInput, options?: Omit<ParseOptions, "time">): Dayjs | null;
/**
 * it returns a Dayjs object (in UTC) serialized as ISODateString representing the given date, unless:
 * - it receives null, or empty string (then throws an error)
 * - it produces an invalid Dayjs (then throws an error)
 * - it receives a Dayjs object (then returns the ISODateString)
 *
 * @param value
 * @param options
 * @see parseDayjsOrError
 * @see toISOString
 */
export declare function parseISODateStringOrError(value: DayjsInput, options?: Omit<ParseOptions, "strict">): ISODateString;
/**
 * @deprecated use parseISODateStringOrError
 */
export declare const parseToISOStringOrError: typeof parseISODateStringOrError;
/**
 * it returns a Dayjs object (in UTC) serialized as ISODateString representing the given date, unless:
 * - it receives null, or empty string (then returns null)
 * - it produces an invalid Dayjs (then returns null)
 * - it receives a Dayjs object (then returns the ISODateString)
 *
 * @param value
 * @param options
 * @see parseDayjs
 * @see toISOString
 */
export declare function parseISODateString(value: DayjsInput, options?: ParseOptions): ISODateString | null;
/**
 * Speedy version of parseISODateString without parsing options, and returns the same ISODateString if it detects it is a valid one by REGEX (won't check that the date itself is valid, just the shape of the string)
 * @param x
 */
export declare function asISODateString(x: DayjsInput): ISODateString | null;
/**
 * Speedy version of parseISODateStringOrError without parsing options, and returns the same ISODateString if it detects it is a valid one by REGEX (won't check that the date itself is valid, just the shape of the string)
 * @param x
 */
export declare function asISODateStringOrError(x: DayjsInput): ISODateString;
