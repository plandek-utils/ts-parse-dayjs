import { isNil } from "lodash";
import { isDayjs } from "dayjs";
import { isValidNumber } from "./utils";
import { StrictDayjsInput, DayjsInput } from "./base";

/**
 * returns true if the given param is a Dayjs object, Date, number (except NaN) or string
 *
 * @param x
 */
export function isStrictDayjsInput(x: any): x is StrictDayjsInput {
  if (isNil(x)) return false;
  return isDayjs(x) || x instanceof Date || isValidNumber(x) || typeof x === "string";
}

/**
 * returns true if the given param is a Dayjs object, Date, number (except NaN), string, null or undefined
 * @param x
 */
export function isDayjsInput(x: any): x is DayjsInput {
  return isNil(x) || isStrictDayjsInput(x);
}
