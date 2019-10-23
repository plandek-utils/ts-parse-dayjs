import dayjs, { Dayjs, isDayjs } from "dayjs";
// tslint:disable-next-line:no-submodule-imports
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/**
 * returns the current Dayjs (in UTC)
 */
export function dayjsNow(): Dayjs {
  return dayjs.utc();
}

type ParseDayjsInput = Dayjs | Date | string | number | null;

/**
 * it returns a Dayjs object (in UTC) representing the given date, unless:
 * - it receives null, or empty string (then returns null)
 * - it produces an invalid Dayjs (then returns null)
 * - it receives a Dayjs object (then returns the same object)
 * @param value
 */
export function parseDayjs(value: ParseDayjsInput): Dayjs | null {
  if (!value) return null;
  if (isDayjs(value)) return value;
  if (value instanceof Date) return dayjs.utc(value);

  const d = dayjs.utc(value);
  return d.isValid() ? d : null;
}

/**
 * error class to signal that the given input does not end up with a valid Dayjs object
 */
export class InvalidDateError extends Error {}

/**
 * it returns a Dayjs object (in UTC) representing the given date, unless:
 * - it receives null, or empty string (then throws an error)
 * - it produces an invalid Dayjs (then throws an error)
 * - it receives a Dayjs object (then returns the same object)
 * @param value
 * @throws InvalidDateError
 */
export function parseDayjsOrError(value: ParseDayjsInput): Dayjs {
  const parsed = parseDayjs(value);
  if (!parsed) {
    throw new InvalidDateError(`invalid date to parse ${value}`);
  }
  return parsed;
}

/**
 * parses the Dayjs (in UTC) with the given input and modifies it to be at the beginning of the UTC day
 * @param value
 * @see parseDayjs
 */
export function parseDayjsStartOfDay(value: ParseDayjsInput): Dayjs | null {
  const d = parseDayjs(value);
  return d ? dayjs.utc(d).startOf("day") : null;
}

/**
 * parses the Dayjs (in UTC) with the given input and modifies it to be at the end of the UTC day
 * @param value
 * @see parseDayjs
 */
export function parseDayjsEndOfDay(value: ParseDayjsInput): Dayjs | null {
  const d = parseDayjs(value);
  return d ? dayjs.utc(d).endOf("day") : null;
}
