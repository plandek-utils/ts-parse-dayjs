import { Dayjs } from "dayjs";
import { createNow, DEFAULT_LOCALE } from "./base";
import { NowOptions } from "./options";
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
