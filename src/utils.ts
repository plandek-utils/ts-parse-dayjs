import { Dayjs } from "dayjs";
import { DayjsInput } from "./base";
import { TimeDefault, TimeOverride } from "./time-options";

/**
 * @internal
 */
export function isValidNumber(value: any): value is number {
  return typeof value === "number" && !isNaN(value);
}

/**
 * @internal
 */
export function parseInteger(value: string): number {
  return parseInt(value.trim(), 10);
}

/**
 * @internal
 */
export function extractInteger(timeString: string, re: RegExp): number | null {
  const result = re.exec(timeString);
  if (!result) return null;

  const quantity = parseInteger(result[1]);
  if (isNaN(quantity)) {
    throw new Error(`invalid number parsed number from: ${timeString}`);
  }

  return quantity;
}

/**
 * @internal
 */
export function adaptTimeOption(
  value: DayjsInput,
  time: TimeDefault | TimeOverride | null
): TimeDefault | TimeOverride | null {
  if (!time) return null;
  if (typeof value !== "string" || value.includes("T")) return time;
  if (time === TimeDefault.EndOfDayIfMissing) return TimeOverride.EndOfDay;
  if (time === TimeDefault.StartOfDayIfMissing) return TimeOverride.StartOfDay;
  return time;
}

/**
 * @internal
 */
export function adaptTime(
  d: Dayjs,
  override?: TimeOverride | TimeDefault | null
): Dayjs {
  if (override === TimeOverride.StartOfDay) {
    return d.startOf("day");
  }
  if (override === TimeOverride.EndOfDay) {
    return d.endOf("day");
  }
  return d;
}
