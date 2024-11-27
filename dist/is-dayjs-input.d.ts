import { type DayjsInput, type StrictDayjsInput } from "./base";
/**
 * returns true if the given param is a Dayjs object, Date, number (except NaN) or string
 *
 * @param x
 */
export declare function isStrictDayjsInput(x: unknown): x is StrictDayjsInput;
/**
 * returns true if the given param is a Dayjs object, Date, number (except NaN), string, null or undefined
 * @param x
 */
export declare function isDayjsInput(x: unknown): x is DayjsInput;
