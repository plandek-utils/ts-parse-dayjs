import { Dayjs } from "dayjs";
import { LocaleParam } from "./base";
import { TimeDefault, TimeOverride } from "./time-options";

/**
 * @internal
 */
type LocaleOptions = { locale?: LocaleParam };

/**
 * @internal
 */
type StrictOptions = { strict?: boolean };

/**
 * @internal
 */
type OriginOptions = { origin?: Dayjs };

/**
 * @internal
 */
type FullTimeOptions = { time?: TimeDefault | TimeOverride | null };

/**
 * @internal
 */
type TimeOverrideOptions = { time?: TimeDefault | TimeOverride | null };

/**
 * options for dayjsNow()
 */
export type NowOptions = StrictOptions & LocaleOptions & TimeOverrideOptions;

/**
 * options for parseDayjs()
 */
export type ParseOptions = StrictOptions & LocaleOptions & FullTimeOptions;

/**
 * options for parseFromStandardPeriods()
 */
export type ParseStandardPeriodOptions = StrictOptions &
  LocaleOptions &
  OriginOptions;
