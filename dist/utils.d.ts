import type { Dayjs, DayjsInput } from "./base";
import { TimeDefault, TimeOverride } from "./time-options";
/**
 * @internal
 */
export declare function isValidNumber(value: unknown): value is number;
/**
 * @internal
 */
export declare function parseInteger(value: string): number;
/**
 * @internal
 */
export declare function extractInteger(timeString: string, re: RegExp): number | null;
/**
 * @internal
 */
export declare function adaptTimeOption(value: DayjsInput, time: TimeDefault | TimeOverride | null): TimeDefault | TimeOverride | null;
/**
 * @internal
 */
export declare function adaptTime(d: Dayjs, override?: TimeOverride | TimeDefault | null): Dayjs;
