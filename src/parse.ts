import {
  DEFAULT_LOCALE,
  type Dayjs,
  type DayjsInput,
  type ISODateString,
  createFrom,
  isISODateString,
  toISOString,
} from "./base";
import { InvalidDateError } from "./errors";
import type { ParseOptions } from "./options";
import { TimeOverride } from "./time-options";
import { adaptTime, adaptTimeOption } from "./utils";

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
export function parseDayjs(value: DayjsInput, options: ParseOptions & { strict: true }): Dayjs;
export function parseDayjs(value: DayjsInput, options?: ParseOptions): Dayjs | null;
export function parseDayjs(
  value: DayjsInput,
  { locale = DEFAULT_LOCALE, strict = false, time = null }: ParseOptions = {},
): Dayjs | null {
  const d = createFrom(value, locale);
  if (d?.isValid()) {
    return adaptTime(d, adaptTimeOption(value, time || null));
  }

  if (strict) {
    throw new InvalidDateError(`invalid date to parse ${value}`);
  }
  return null;
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
export function parseDayjsOrError(value: DayjsInput, options: Omit<ParseOptions, "strict"> = {}): Dayjs {
  return parseDayjs(value, { ...options, strict: true });
}

/**
 * parses the Dayjs (in UTC) with the given input and modifies it to be at the beginning of the UTC day
 *
 * @param value
 * @param options
 * @see parseDayjs
 * @see TimeOverride.StartOfDay
 */
export function parseDayjsStartOfDay(value: DayjsInput, options: Omit<ParseOptions, "time"> = {}): Dayjs | null {
  return parseDayjs(value, { ...options, time: TimeOverride.StartOfDay });
}

/**
 * parses the Dayjs (in UTC) with the given input and modifies it to be at the end of the UTC day
 *
 * @param value
 * @param options
 * @see parseDayjs
 * @see TimeOverride.EndOfDay
 */
export function parseDayjsEndOfDay(value: DayjsInput, options: Omit<ParseOptions, "time"> = {}): Dayjs | null {
  return parseDayjs(value, { ...options, time: TimeOverride.EndOfDay });
}

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
export function parseISODateStringOrError(
  value: DayjsInput,
  options: Omit<ParseOptions, "strict"> = {},
): ISODateString {
  const d = parseDayjsOrError(value, options);
  return toISOString(d);
}

/**
 * @deprecated use parseISODateStringOrError
 */
export const parseToISOStringOrError = parseISODateStringOrError;

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
export function parseISODateString(value: DayjsInput, options: ParseOptions = {}): ISODateString | null {
  const d = parseDayjs(value, options);
  return d ? toISOString(d) : null;
}

/**
 * Speedy version of parseISODateString without parsing options, and returns the same ISODateString if it detects it is a valid one by REGEX (won't check that the date itself is valid, just the shape of the string)
 * @param x
 */
export function asISODateString(x: DayjsInput): ISODateString | null {
  if (isISODateString(x)) return x;
  return parseISODateString(x);
}

/**
 * Speedy version of parseISODateStringOrError without parsing options, and returns the same ISODateString if it detects it is a valid one by REGEX (won't check that the date itself is valid, just the shape of the string)
 * @param x
 */
export function asISODateStringOrError(x: DayjsInput): ISODateString {
  if (isISODateString(x)) return x;
  return parseISODateStringOrError(x);
}
