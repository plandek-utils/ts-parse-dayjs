import { type Dayjs } from "./base";
import type { NowOptions } from "./options";
/**
 * returns the current Dayjs (in UTC)
 *
 * @param options
 * @param options.locale locale to use (by default DEFAULT_LOCALE)
 * @param options.time null, or one of TimeOverride
 * @see DEFAULT_LOCALE
 * @see TimeOverride
 */
export declare function dayjsNow({ locale, time }?: NowOptions): Dayjs;
/**
 * calling dayjsNow with time: TimeOverride.EndOfDay
 *
 * @param options
 * @param options.locale locale to use (by default DEFAULT_LOCALE)
 * @see DEFAULT_LOCALE
 * @see TimeOverride
 * @see dayjsNow
 */
export declare function dayjsTodayEOD({ locale }?: Omit<NowOptions, "time">): Dayjs;
