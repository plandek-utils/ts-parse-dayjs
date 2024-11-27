import { type DayjsInput } from "./base";
import type { GranularityEnumValues } from "./granularity";
/**
 * returns a string describing the date range
 *
 * @param opts
 * @param opts.from - start of date range (inclusive)
 * @param opts.to - end of date range (inclusive)
 * @param opts.granularity - optional description of the granularity of the date range, used to return a special description in case of the current day/week/month/year
 * @param opts.now - optional dayjs instance to use for determining the current moment (injected for testing, defaults to dayjsNow())
 */
export declare function calculateDateRangeDescription(opts: {
    from: DayjsInput | undefined;
    to: DayjsInput | undefined;
    granularity?: GranularityEnumValues;
    now?: DayjsInput;
}): string | null;
