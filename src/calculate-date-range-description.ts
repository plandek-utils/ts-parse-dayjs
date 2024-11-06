import { type DayjsInput, formatDate } from "./base";
import { dayjsNow } from "./dayjs-now";
import type { GranularityEnumValues } from "./granularity";
import { isTodayOrFuture } from "./is-relative";
import { parseDayjs } from "./parse";
import { printRange, printSince } from "./print-utils";

/**
 * returns a string describing the date range
 *
 * @param opts
 * @param opts.from - start of date range (inclusive)
 * @param opts.to - end of date range (inclusive)
 * @param opts.granularity - optional description of the granularity of the date range, used to return a special description in case of the current day/week/month/year
 * @param opts.now - optional dayjs instance to use for determining the current moment (injected for testing, defaults to dayjsNow())
 */
export function calculateDateRangeDescription(opts: {
  from: DayjsInput | undefined;
  to: DayjsInput | undefined;
  granularity?: GranularityEnumValues;
  now?: DayjsInput; // note this is here for convenience of testing
}): string | null {
  const { from, to, granularity } = opts;
  const now = opts.now || dayjsNow();
  if (!from || !to) return null;
  const fromDate = parseDayjs(from);
  const toDate = parseDayjs(to);
  const nowDate = parseDayjs(now);

  if (!fromDate || !toDate || !nowDate) return null;

  if (toDate.isBefore(fromDate)) return null;

  if (!isTodayOrFuture(toDate)) {
    if (fromDate.isSame(toDate, "day")) {
      return formatDate(fromDate);
    }

    return printRange({ from: fromDate, to: toDate });
  }

  if (fromDate.isSame(nowDate, "day") && granularity === "day") return "Today";
  if (fromDate.isSame(nowDate, "week") && granularity === "week") return "This week";
  if (fromDate.isSame(nowDate, "month") && granularity === "month") return "This month";
  if (fromDate.isSame(nowDate, "year") && granularity === "year") return "This year";

  return printSince(fromDate);
}
