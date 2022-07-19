import { DayjsInput } from "./base";
import { parseDayjsEndOfDay, parseDayjsStartOfDay } from "./parse";

/**
 * possible elements of granularity
 */
export type GranularityEnumValues = "day" | "week" | "month" | "year";

/**
 * possible elements of the description of granularity
 */
export type GranularityDescriptionEnumValues = "daily" | "weekly" | "monthly" | "yearly";

/**
 * matching granularity with its description
 */
const GranularityDescription: Record<GranularityEnumValues, GranularityDescriptionEnumValues> = {
  day: "daily",
  week: "weekly",
  month: "monthly",
  year: "yearly",
} as const;

/**
 * gets the granularity from the description
 * @param granularity uses day if blank
 */
export function getGranularityDescription(granularity: GranularityEnumValues | null): GranularityDescriptionEnumValues {
  return GranularityDescription[granularity || "day"];
}

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
export function getGranularityOptionsFromRange({ from, to }: OptionalRange): GranularityEnumValues[] {
  const granularityOptions: GranularityEnumValues[] = ["day"];
  const validFrom = parseDayjsStartOfDay(from);
  const validTo = parseDayjsEndOfDay(to);

  if (!validFrom || !validTo) return [];

  const isEnough = (unit: "week" | "month" | "year") => {
    const intervals = validTo.diff(validFrom, unit) + 1;
    return intervals >= 2;
  };

  if (isEnough("week") && validFrom.day() === 1) granularityOptions.push("week");
  if (isEnough("month") && validFrom.date() === 1) granularityOptions.push("month");
  if (isEnough("year") && validFrom.date() === 1 && validFrom.month() === 0) granularityOptions.push("year");

  return granularityOptions;
}
