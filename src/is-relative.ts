import { Dayjs } from "dayjs";
import { dayjsNow } from "./dayjs-now";

export function isTodayOrFuture(date: Dayjs, now: Dayjs = dayjsNow()): boolean {
  if (date.isSame(now, "day")) return true;
  return now.isBefore(date);
}

export function isTodayOrPast(date: Dayjs, now: Dayjs = dayjsNow()): boolean {
  if (date.isSame(now, "day")) return true;
  return date.isBefore(now);
}
