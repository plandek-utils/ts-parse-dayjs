import { Dayjs } from "dayjs";

type TYear = `${number}`;
type TMonth = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";
type TDay =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31";
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
export function toISOString(d: Dayjs): ISODateString {
  return d.toISOString() as ISODateString;
}
