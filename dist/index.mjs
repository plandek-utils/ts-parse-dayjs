import dayjs, { isDayjs } from 'dayjs';
export { isDayjs } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/en-au';
import 'dayjs/locale/en-ca';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/en-ie';
import 'dayjs/locale/en-il';
import 'dayjs/locale/en-nz';
import 'dayjs/locale/en-sg';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import durationPlugin from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { z } from 'zod';

// src/base.ts
var OPTIONS_RELATIVE = {};
var OPTIONS_STRICT = {
  rounding: Math.floor,
  thresholds: [
    { l: "s", r: 1 },
    { l: "ss", r: 59, d: "second" },
    { l: "m", r: 1 },
    { l: "mm", r: 59, d: "minute" },
    { l: "h", r: 1 },
    { l: "hh", r: 23, d: "hour" },
    { l: "d", r: 1 },
    { l: "dd", r: 29, d: "day" },
    { l: "M", r: 1 },
    { l: "MM", r: 11, d: "month" },
    { l: "y", r: 1 },
    { l: "yy", d: "year" }
  ]
};
var relativeTimeStrictPlugin = (_o, c, d) => {
  const proto = c.prototype;
  relativeTimePlugin(OPTIONS_RELATIVE, c, d);
  const fromToBaseRelative = c.prototype.fromToBase;
  relativeTimePlugin(OPTIONS_STRICT, c, d);
  const fromToBaseStrict = c.prototype.fromToBase;
  proto.to = function(input, withoutSuffix) {
    return fromToBaseRelative(input, withoutSuffix, this, true);
  };
  proto.toStrict = function(input, withoutSuffix) {
    return fromToBaseStrict(input, withoutSuffix, this, true);
  };
  proto.from = function(input, withoutSuffix) {
    return fromToBaseRelative(input, withoutSuffix, this);
  };
  proto.fromStrict = function(input, withoutSuffix) {
    return fromToBaseStrict(input, withoutSuffix, this);
  };
  const makeNow = (thisDay) => thisDay.isUTC() ? d.utc() : d();
  proto.toNow = function(withoutSuffix) {
    return this.to(makeNow(this), withoutSuffix);
  };
  proto.toNowStrict = function(withoutSuffix) {
    return this.toStrict(makeNow(this), withoutSuffix);
  };
  proto.fromNow = function(withoutSuffix) {
    return this.from(makeNow(this), withoutSuffix);
  };
  proto.fromNowStrict = function(withoutSuffix) {
    return this.fromStrict(makeNow(this), withoutSuffix);
  };
};

// src/time-options.ts
var TimeOverride = /* @__PURE__ */ ((TimeOverride2) => {
  TimeOverride2["StartOfDay"] = "startOfDay";
  TimeOverride2["EndOfDay"] = "endOfDay";
  return TimeOverride2;
})(TimeOverride || {});
var TimeDefault = /* @__PURE__ */ ((TimeDefault2) => {
  TimeDefault2["StartOfDayIfMissing"] = "startOfDayIfMissing";
  TimeDefault2["EndOfDayIfMissing"] = "endOfDayIfMissing";
  return TimeDefault2;
})(TimeDefault || {});

// src/utils.ts
function isValidNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
function parseInteger(value) {
  return Number.parseInt(value.trim(), 10);
}
function extractInteger(timeString, re) {
  const result = re.exec(timeString);
  if (!result) return null;
  const quantity = parseInteger(result[1]);
  if (Number.isNaN(quantity)) {
    throw new Error(`invalid number parsed number from: ${timeString}`);
  }
  return quantity;
}
function defaultToOverride(time) {
  if (time === "endOfDayIfMissing" /* EndOfDayIfMissing */) return "endOfDay" /* EndOfDay */;
  if (time === "startOfDayIfMissing" /* StartOfDayIfMissing */) return "startOfDay" /* StartOfDay */;
  return time;
}
function adaptTimeOption(value, time) {
  if (!time) return null;
  if (typeof value !== "string" || value.includes("T")) return time;
  return defaultToOverride(time);
}
function adaptTime(d, override) {
  if (override === "startOfDay" /* StartOfDay */) {
    return d.startOf("day");
  }
  if (override === "endOfDay" /* EndOfDay */) {
    return d.endOf("day");
  }
  return d;
}

// src/base.ts
dayjs.extend(advancedFormat);
dayjs.extend(durationPlugin);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(minMax);
dayjs.extend(relativeTimeStrictPlugin);
dayjs.extend(utc);
dayjs.extend(weekOfYear);
dayjs.extend(updateLocale);
var min = dayjs.min;
var max = dayjs.max;
var duration = dayjs.duration;
var isDuration = dayjs.isDuration;
var dayjsSchemaStrict = z.instanceof(dayjs);
var TWO_DIGIT_NUMBER_REGEX = /^\d{2}$/;
var THREE_DIGIT_NUMBER_REGEX = /^\d{3}$/;
var YEAR_REGEX = /^-?\d+$/;
var tYearSchema = z.custom((val) => {
  return typeof val === "string" ? YEAR_REGEX.test(val) : false;
});
var tMonthSchema = z.custom((val) => {
  if (typeof val !== "string") return false;
  if (!TWO_DIGIT_NUMBER_REGEX.test(val)) return false;
  const parsed = parseInteger(val);
  return parsed >= 1 && parsed <= 12;
});
var tDaySchema = z.custom((val) => {
  if (typeof val !== "string") return false;
  if (!TWO_DIGIT_NUMBER_REGEX.test(val)) return false;
  const parsed = parseInteger(val);
  return parsed >= 1 && parsed <= 31;
});
var tHoursSchema = z.custom((val) => {
  if (typeof val !== "string") return false;
  if (!TWO_DIGIT_NUMBER_REGEX.test(val)) return false;
  const parsed = parseInteger(val);
  return parsed >= 0 && parsed <= 23;
});
var tMinutesSchema = z.custom((val) => {
  if (typeof val !== "string") return false;
  if (!TWO_DIGIT_NUMBER_REGEX.test(val)) return false;
  const parsed = parseInteger(val);
  return parsed >= 0 && parsed <= 59;
});
var tSecondsSchema = tMinutesSchema;
var tMillisecondsSchema = z.custom((val) => {
  return typeof val === "string" ? THREE_DIGIT_NUMBER_REGEX.test(val) : false;
});
var isoDateSchema = z.custom((val) => {
  if (typeof val !== "string") return false;
  let yearPrefix = "";
  let strToSplit = val;
  if (strToSplit.startsWith("-")) {
    yearPrefix = "-";
    strToSplit = strToSplit.slice(1);
  }
  const [year, month, day] = strToSplit.split("-");
  if (!tYearSchema.safeParse(`${yearPrefix}${year}`).success) return false;
  if (!tMonthSchema.safeParse(month).success) return false;
  if (!tDaySchema.safeParse(day).success) return false;
  return true;
});
var isoTimeSchema = z.custom((val) => {
  if (typeof val !== "string") return false;
  const [hours, minutes, seconds] = val.split(":");
  const [secondsPart, milliseconds] = (seconds ?? "").split(".");
  if (!tHoursSchema.safeParse(hours).success) return false;
  if (!tMinutesSchema.safeParse(minutes).success) return false;
  if (!tSecondsSchema.safeParse(secondsPart).success) return false;
  if (!tMillisecondsSchema.safeParse(milliseconds).success) return false;
  return true;
});
var isoDateStringSchema = z.custom((val) => {
  if (typeof val !== "string") return false;
  const [date, rest] = val.split("T");
  if (!isoDateSchema.safeParse(date).success) return false;
  if (!rest.endsWith("Z")) return false;
  const time = rest.slice(0, -1);
  return isoTimeSchema.safeParse(time).success;
});
var serializedDateStringSchema = z.union([isoDateSchema, isoDateStringSchema]);
var ISO_DATE_STRING_REGEX = /^-?\d+-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
function isISODateString(x) {
  return typeof x === "string" && ISO_DATE_STRING_REGEX.test(x);
}
var ISO_DATE_REGEX = /^-?\d+-\d{2}-\d{2}$/;
function isISODate(x) {
  return typeof x === "string" && ISO_DATE_REGEX.test(x);
}
function toISOString(d) {
  return d.toISOString();
}
var toISODateString = toISOString;
var ISO_DATE_FORMAT = "YYYY-MM-DD";
function toISODate(d) {
  return d.format(ISO_DATE_FORMAT);
}
function durationBetween(from, to) {
  return duration(to.diff(from));
}
var relativeTimeConfig = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "a few seconds",
  m: "1 minute",
  mm: "%d minutes",
  h: "1 hour",
  hh: "%d hours",
  d: "1 day",
  dd: "%d days",
  M: "1 month",
  MM: "%d months",
  y: "1 year",
  yy: "%d years"
};
var AvailableLocales = /* @__PURE__ */ ((AvailableLocales2) => {
  AvailableLocales2["EnglishUSA"] = "en";
  AvailableLocales2["EnglishAU"] = "en-au";
  AvailableLocales2["EnglishCA"] = "en-ca";
  AvailableLocales2["EnglishGB"] = "en-gb";
  AvailableLocales2["EnglishIE"] = "en-ie";
  AvailableLocales2["EnglishIL"] = "en-il";
  AvailableLocales2["EnglishNZ"] = "en-nz";
  AvailableLocales2["EnglishSG"] = "en-SG";
  return AvailableLocales2;
})(AvailableLocales || {});
dayjs.updateLocale("en-au" /* EnglishAU */, { relativeTime: relativeTimeConfig });
dayjs.updateLocale("en-ca" /* EnglishCA */, { relativeTime: relativeTimeConfig });
dayjs.updateLocale("en-gb" /* EnglishGB */, { relativeTime: relativeTimeConfig });
dayjs.updateLocale("en-ie" /* EnglishIE */, { relativeTime: relativeTimeConfig });
dayjs.updateLocale("en-il" /* EnglishIL */, { relativeTime: relativeTimeConfig });
dayjs.updateLocale("en-nz" /* EnglishNZ */, { relativeTime: relativeTimeConfig });
dayjs.updateLocale("en-SG" /* EnglishSG */, { relativeTime: relativeTimeConfig });
dayjs.updateLocale("en" /* EnglishUSA */, { relativeTime: relativeTimeConfig });
var DEFAULT_LOCALE = "en-gb" /* EnglishGB */;
var DEFAULT_DATE_FORMAT = "Do MMM YYYY";
var DEFAULT_DATETIME_FORMAT = "Do MMM YYYY h:mm A";
function formatDate(date, dateFormat = DEFAULT_DATE_FORMAT) {
  return date ? date.format(dateFormat) : null;
}
function formatDateTime(date, dateFormat = DEFAULT_DATETIME_FORMAT) {
  return formatDate(date, dateFormat);
}
function createNow(locale) {
  return dayjs.utc().locale(locale);
}
function createFrom(value, locale) {
  if (!value) return null;
  const d = isDayjs(value) ? value : dayjs.utc(value).locale(locale);
  return d.isValid() ? d : null;
}

// src/dayjs-now.ts
function dayjsNow({ locale = DEFAULT_LOCALE, time } = {}) {
  return adaptTime(createNow(locale), time);
}
function dayjsTodayEOD({ locale = DEFAULT_LOCALE } = {}) {
  return dayjsNow({ time: "endOfDay" /* EndOfDay */, locale });
}

// src/is-relative.ts
function isTodayOrFuture(date, now = dayjsNow()) {
  if (date.isSame(now, "day")) return true;
  return now.isBefore(date);
}
function isTodayOrPast(date, now = dayjsNow()) {
  if (date.isSame(now, "day")) return true;
  return date.isBefore(now);
}

// src/errors.ts
var InvalidDateError = class extends Error {
};

// src/parse.ts
function parseDayjs(value, { locale = DEFAULT_LOCALE, strict = false, time = null } = {}) {
  const d = createFrom(value, locale);
  if (d?.isValid()) {
    return adaptTime(d, adaptTimeOption(value, time || null));
  }
  if (strict) {
    throw new InvalidDateError(`invalid date to parse ${value}`);
  }
  return null;
}
function parseDayjsOrError(value, options = {}) {
  return parseDayjs(value, { ...options, strict: true });
}
function parseDayjsStartOfDay(value, options = {}) {
  return parseDayjs(value, { ...options, time: "startOfDay" /* StartOfDay */ });
}
function parseDayjsEndOfDay(value, options = {}) {
  return parseDayjs(value, { ...options, time: "endOfDay" /* EndOfDay */ });
}
function parseISODateStringOrError(value, options = {}) {
  const d = parseDayjsOrError(value, options);
  return toISOString(d);
}
var parseToISOStringOrError = parseISODateStringOrError;
function parseISODateString(value, options = {}) {
  const d = parseDayjs(value, options);
  return d ? toISOString(d) : null;
}
function asISODateString(x) {
  if (isISODateString(x)) return x;
  return parseISODateString(x);
}
function asISODateStringOrError(x) {
  if (isISODateString(x)) return x;
  return parseISODateStringOrError(x);
}
function parseISODateOrError(value, options = {}) {
  const d = parseDayjsOrError(value, options);
  return toISODate(d);
}
function parseISODate(value, options = {}) {
  const d = parseDayjs(value, options);
  return d ? toISODate(d) : null;
}
function asISODate(x) {
  if (isISODate(x)) return x;
  return parseISODate(x);
}
function asISODateOrError(x) {
  if (isISODate(x)) return x;
  return parseISODateOrError(x);
}

// src/print-utils.ts
function makePrintWithPrefix(prefix, defaultDateFormat) {
  return function printWithPrefix(from, dateFormat = defaultDateFormat) {
    const fromFormatted = formatDate(from, dateFormat);
    return `${prefix}${fromFormatted}`;
  };
}
var printSince = makePrintWithPrefix("Since ", DEFAULT_DATE_FORMAT);
var printStarted = makePrintWithPrefix("Started ", DEFAULT_DATE_FORMAT);
function printRange({ from, to }, dateFormat = DEFAULT_DATE_FORMAT) {
  if (!from || !to) return null;
  const fromFormatted = from.format(dateFormat);
  const toFormatted = to.format(dateFormat);
  if (fromFormatted === toFormatted) return `${fromFormatted}`;
  return `${fromFormatted} - ${toFormatted}`;
}

// src/calculate-date-range-description.ts
function calculateDateRangeDescription(opts) {
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

// src/granularity.ts
var GranularityDescription = {
  day: "daily",
  week: "weekly",
  month: "monthly",
  year: "yearly"
};
function getGranularityDescription(granularity) {
  return GranularityDescription[granularity || "day"];
}
function getGranularityOptionsFromRange({ from, to }) {
  const granularityOptions = ["day"];
  const validFrom = parseDayjsStartOfDay(from);
  const validTo = parseDayjsEndOfDay(to);
  if (!validFrom || !validTo) return [];
  const isEnough = (unit) => {
    const intervals = validTo.diff(validFrom, unit) + 1;
    return intervals >= 2;
  };
  if (isEnough("week") && validFrom.day() === 1) granularityOptions.push("week");
  if (isEnough("month") && validFrom.date() === 1) granularityOptions.push("month");
  if (isEnough("year") && validFrom.date() === 1 && validFrom.month() === 0) granularityOptions.push("year");
  return granularityOptions;
}

// src/is-dayjs-input.ts
function isStrictDayjsInput(x) {
  if (isNil(x)) return false;
  return isDayjs(x) || x instanceof Date || isValidNumber(x) || typeof x === "string";
}
function isDayjsInput(x) {
  return isNil(x) || isStrictDayjsInput(x);
}
function isNil(x) {
  return x === null || x === undefined;
}

// src/is-valid-date.ts
function isValid(x) {
  const parsed = parseDayjs(x);
  return !!parsed && parsed.isValid();
}
function isValidDate(x) {
  if (typeof x === "string") {
    return isValid(new Date(x));
  }
  return isValid(x ?? null);
}

// src/min-max.ts
function isEmptyArray(x) {
  return x.length === 0;
}
function minDayjs(list) {
  return isEmptyArray(list) ? null : min(list);
}
function maxDayjs(list) {
  return isEmptyArray(list) ? null : max(list);
}

// src/parse-from-standard-periods.ts
var PERIODS = [
  { re: /^([\d]+)y$/, unit: "year" },
  { re: /^([\d]+)m$/, unit: "month" },
  { re: /^([\d]+)w$/, unit: "week" },
  { re: /^([\d]+)d$/, unit: "day" }
];
function extractPeriod(value) {
  for (const { re, unit } of PERIODS) {
    const q = extractInteger(value, re);
    if (isValidNumber(q)) {
      return { q, unit };
    }
  }
  return null;
}
function calculateFrom(value, origin, locale) {
  const period = extractPeriod(value);
  if (!period) return null;
  return origin.locale(locale).subtract(period.q, period.unit).startOf(period.unit);
}
function parseFromStandardPeriods(value, { locale = DEFAULT_LOCALE, origin } = {}) {
  const o = origin || dayjsNow({ locale });
  const from = calculateFrom(value, o, locale);
  if (!from) return null;
  const to = o.endOf("day");
  return { from, to };
}

// src/relative-time.ts
function fromNow(value, withoutSuffix) {
  return value.fromNow(withoutSuffix);
}
function fromNowStrict(value, withoutSuffix) {
  return value.fromNowStrict(withoutSuffix);
}
function toNow(value, withoutSuffix) {
  return value.toNow(withoutSuffix);
}
function toNowStrict(value, withoutSuffix) {
  return value.toNowStrict(withoutSuffix);
}
var serializedDateSchema = z.string().refine(
  (x) => {
    const d = parseDayjs(x);
    return !!d;
  },
  { message: "String must be a serialized date that can be parsed" }
);
var serializedDateSchemaForParsing = z.union([z.string(), z.number(), z.date(), dayjsSchemaStrict]).transform((x, ctx) => {
  const res = parseDayjs(x);
  if (!res) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "String must be a serialized date that can be parsed"
    });
    return z.NEVER;
  }
  return res;
});
var serializedDateSchemaForSerialize = z.union([z.string(), z.number(), z.date(), dayjsSchemaStrict]).transform((x, ctx) => {
  const res = parseDayjs(x);
  if (!res) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "String must be a serialized date that can be parsed"
    });
    return z.NEVER;
  }
  return res.toISOString();
});
var dayjsSchema = z.union([dayjsSchemaStrict, serializedDateSchemaForParsing]);

export { AvailableLocales, DEFAULT_DATETIME_FORMAT, DEFAULT_DATE_FORMAT, DEFAULT_LOCALE, ISO_DATE_REGEX, ISO_DATE_STRING_REGEX, InvalidDateError, TimeDefault, TimeOverride, asISODate, asISODateOrError, asISODateString, asISODateStringOrError, calculateDateRangeDescription, createFrom, createNow, dayjsNow, dayjsSchema, dayjsSchemaStrict, dayjsTodayEOD, duration, durationBetween, formatDate, formatDateTime, fromNow, fromNowStrict, getGranularityDescription, getGranularityOptionsFromRange, isDayjsInput, isDuration, isISODate, isISODateString, isStrictDayjsInput, isTodayOrFuture, isTodayOrPast, isValidDate, isoDateSchema, isoDateStringSchema, isoTimeSchema, makePrintWithPrefix, max, maxDayjs, min, minDayjs, parseDayjs, parseDayjsEndOfDay, parseDayjsOrError, parseDayjsStartOfDay, parseFromStandardPeriods, parseISODate, parseISODateOrError, parseISODateString, parseISODateStringOrError, parseToISOStringOrError, printRange, printSince, printStarted, serializedDateSchema, serializedDateSchemaForParsing, serializedDateSchemaForSerialize, serializedDateStringSchema, tDaySchema, tHoursSchema, tMillisecondsSchema, tMinutesSchema, tMonthSchema, tSecondsSchema, tYearSchema, toISODate, toISODateString, toISOString, toNow, toNowStrict };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map