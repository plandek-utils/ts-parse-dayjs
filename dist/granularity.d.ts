import type { DayjsInput } from "./base";
/**
 * possible elements of granularity
 */
export type GranularityEnumValues = "day" | "week" | "month" | "year";
/**
 * possible elements of the description of granularity
 */
export type GranularityDescriptionEnumValues = "daily" | "weekly" | "monthly" | "yearly";
/**
 * gets the granularity from the description
 * @param granularity uses day if blank
 */
export declare function getGranularityDescription(granularity: GranularityEnumValues | null): GranularityDescriptionEnumValues;
type OptionalRange = {
    from?: DayjsInput;
    to?: DayjsInput;
};
/**
 * gets the list of granularity values available for the given date range
 *
 * If the given date range is not valid, returns an empty array
 *
 * Otherwise, returns an array of granularity values. It always has "day", and optionally the rest:
 * - "week" if the range includes at least 2 weeks, and FROM is on the first day of the week
 * - "month" if the range includes at least 2 months, and FROM is on the first day of the month
 * - "year" if the range includes at least 2 years, and FROM is on the first day of the year
 *
 * @param from
 * @param to
 */
export declare function getGranularityOptionsFromRange({ from, to }: OptionalRange): GranularityEnumValues[];
export {};
