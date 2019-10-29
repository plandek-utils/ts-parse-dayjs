import { Dayjs, OpUnitType } from "dayjs";
import { dayjsNow } from "./base";
import { extractInteger, isValidNumber } from "./utils";

export interface IDayjsRange {
  from: Dayjs | null;
  to: Dayjs | null;
}

export interface IDayjsRangeStrict {
  from: Dayjs;
  to: Dayjs;
}

/**
 * @internal
 */
interface IPeriod {
  re: RegExp;
  unit: OpUnitType;
}

/**
 * @internal
 */
const PERIODS: IPeriod[] = [
  { re: /^([\d]+)y$/, unit: "year" },
  { re: /^([\d]+)m$/, unit: "month" },
  { re: /^([\d]+)w$/, unit: "week" },
  { re: /^([\d]+)d$/, unit: "day" }
];

/**
 * @internal
 */
function extractPeriod(value: string): { unit: OpUnitType; q: number } | null {
  for (const { re, unit } of PERIODS) {
    const q = extractInteger(value, re);
    if (isValidNumber(q)) {
      return { q, unit };
    }
  }

  return null;
}

/**
 * @internal
 */
function calculateFrom(value: string, origin: Dayjs): Dayjs | null {
  const period = extractPeriod(value);
  if (!period) return null;

  return origin.subtract(period.q, period.unit).startOf(period.unit);
}

export function parseFromStandardPeriods(
  value: string,
  { origin = dayjsNow() }: { origin?: Dayjs } = {}
): IDayjsRangeStrict | null {
  const from = calculateFrom(value, origin);
  if (!from) return null;
  const to = origin.endOf("day");
  return { from, to };
}
