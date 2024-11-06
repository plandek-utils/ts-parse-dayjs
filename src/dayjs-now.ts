import { DEFAULT_LOCALE, type Dayjs, createNow } from "./base";
import type { NowOptions } from "./options";
import { TimeOverride } from "./time-options";
import { adaptTime } from "./utils";

/**
 * returns the current Dayjs (in UTC)
 *
 * @param options
 * @param options.locale locale to use (by default DEFAULT_LOCALE)
 * @param options.time null, or one of TimeOverride
 * @see DEFAULT_LOCALE
 * @see TimeOverride
 */
export function dayjsNow({ locale = DEFAULT_LOCALE, time }: NowOptions = {}): Dayjs {
  return adaptTime(createNow(locale), time);
}

/**
 * calling dayjsNow with time: TimeOverride.EndOfDay
 *
 * @param options
 * @param options.locale locale to use (by default DEFAULT_LOCALE)
 * @see DEFAULT_LOCALE
 * @see TimeOverride
 * @see dayjsNow
 */
export function dayjsTodayEOD({ locale = DEFAULT_LOCALE }: Omit<NowOptions, "time"> = {}): Dayjs {
  return dayjsNow({ time: TimeOverride.EndOfDay, locale });
}
