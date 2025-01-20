'use strict';

var dayjs = require('dayjs');
require('dayjs/locale/en');
require('dayjs/locale/en-au');
require('dayjs/locale/en-ca');
require('dayjs/locale/en-gb');
require('dayjs/locale/en-ie');
require('dayjs/locale/en-il');
require('dayjs/locale/en-nz');
require('dayjs/locale/en-sg');
var advancedFormat = require('dayjs/plugin/advancedFormat');
var durationPlugin = require('dayjs/plugin/duration');
var isBetween = require('dayjs/plugin/isBetween');
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
var minMax = require('dayjs/plugin/minMax');
var updateLocale = require('dayjs/plugin/updateLocale');
var utc = require('dayjs/plugin/utc');
var weekOfYear = require('dayjs/plugin/weekOfYear');
var relativeTimePlugin = require('dayjs/plugin/relativeTime');
var zod = require('zod');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var dayjs__default = /*#__PURE__*/_interopDefault(dayjs);
var advancedFormat__default = /*#__PURE__*/_interopDefault(advancedFormat);
var durationPlugin__default = /*#__PURE__*/_interopDefault(durationPlugin);
var isBetween__default = /*#__PURE__*/_interopDefault(isBetween);
var isSameOrAfter__default = /*#__PURE__*/_interopDefault(isSameOrAfter);
var isSameOrBefore__default = /*#__PURE__*/_interopDefault(isSameOrBefore);
var minMax__default = /*#__PURE__*/_interopDefault(minMax);
var updateLocale__default = /*#__PURE__*/_interopDefault(updateLocale);
var utc__default = /*#__PURE__*/_interopDefault(utc);
var weekOfYear__default = /*#__PURE__*/_interopDefault(weekOfYear);
var relativeTimePlugin__default = /*#__PURE__*/_interopDefault(relativeTimePlugin);

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
  relativeTimePlugin__default.default(OPTIONS_RELATIVE, c, d);
  const fromToBaseRelative = c.prototype.fromToBase;
  relativeTimePlugin__default.default(OPTIONS_STRICT, c, d);
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
dayjs__default.default.extend(advancedFormat__default.default);
dayjs__default.default.extend(durationPlugin__default.default);
dayjs__default.default.extend(isBetween__default.default);
dayjs__default.default.extend(isSameOrAfter__default.default);
dayjs__default.default.extend(isSameOrBefore__default.default);
dayjs__default.default.extend(minMax__default.default);
dayjs__default.default.extend(relativeTimeStrictPlugin);
dayjs__default.default.extend(utc__default.default);
dayjs__default.default.extend(weekOfYear__default.default);
dayjs__default.default.extend(updateLocale__default.default);
var min = dayjs__default.default.min;
var max = dayjs__default.default.max;
var duration = dayjs__default.default.duration;
var isDuration = dayjs__default.default.isDuration;
var dayjsSchemaStrict = zod.z.instanceof(dayjs__default.default);
var TWO_DIGIT_NUMBER_REGEX = /^\d{2}$/;
var THREE_DIGIT_NUMBER_REGEX = /^\d{3}$/;
var YEAR_REGEX = /^-?\d+$/;
var tYearSchema = zod.z.custom((val) => {
  return typeof val === "string" ? YEAR_REGEX.test(val) : false;
});
var tMonthSchema = zod.z.custom((val) => {
  if (typeof val !== "string") return false;
  if (!TWO_DIGIT_NUMBER_REGEX.test(val)) return false;
  const parsed = parseInteger(val);
  return parsed >= 1 && parsed <= 12;
});
var tDaySchema = zod.z.custom((val) => {
  if (typeof val !== "string") return false;
  if (!TWO_DIGIT_NUMBER_REGEX.test(val)) return false;
  const parsed = parseInteger(val);
  return parsed >= 1 && parsed <= 31;
});
var tHoursSchema = zod.z.custom((val) => {
  if (typeof val !== "string") return false;
  if (!TWO_DIGIT_NUMBER_REGEX.test(val)) return false;
  const parsed = parseInteger(val);
  return parsed >= 0 && parsed <= 23;
});
var tMinutesSchema = zod.z.custom((val) => {
  if (typeof val !== "string") return false;
  if (!TWO_DIGIT_NUMBER_REGEX.test(val)) return false;
  const parsed = parseInteger(val);
  return parsed >= 0 && parsed <= 59;
});
var tSecondsSchema = tMinutesSchema;
var tMillisecondsSchema = zod.z.custom((val) => {
  return typeof val === "string" ? THREE_DIGIT_NUMBER_REGEX.test(val) : false;
});
var isoDateSchema = zod.z.custom((val) => {
  if (typeof val !== "string") return false;
  const [year, month, day] = val.split("-");
  if (!tYearSchema.safeParse(year).success) return false;
  if (!tMonthSchema.safeParse(month).success) return false;
  if (!tDaySchema.safeParse(day).success) return false;
  return true;
});
var isoTimeSchema = zod.z.custom((val) => {
  if (typeof val !== "string") return false;
  const [hours, minutes, seconds] = val.split(":");
  const [secondsPart, milliseconds] = (seconds ?? "").split(".");
  if (!tHoursSchema.safeParse(hours).success) return false;
  if (!tMinutesSchema.safeParse(minutes).success) return false;
  if (!tSecondsSchema.safeParse(secondsPart).success) return false;
  if (!tMillisecondsSchema.safeParse(milliseconds).success) return false;
  return true;
});
var isoDateStringSchema = zod.z.custom((val) => {
  if (typeof val !== "string") return false;
  const [date, rest] = val.split("T");
  if (!isoDateSchema.safeParse(date).success) return false;
  if (!rest.endsWith("Z")) return false;
  const time = rest.slice(0, -1);
  return isoTimeSchema.safeParse(time).success;
});
var serializedDateStringSchema = zod.z.union([isoDateSchema, isoDateStringSchema]);
function toISOString(d) {
  return d.toISOString();
}
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
dayjs__default.default.updateLocale("en-au" /* EnglishAU */, { relativeTime: relativeTimeConfig });
dayjs__default.default.updateLocale("en-ca" /* EnglishCA */, { relativeTime: relativeTimeConfig });
dayjs__default.default.updateLocale("en-gb" /* EnglishGB */, { relativeTime: relativeTimeConfig });
dayjs__default.default.updateLocale("en-ie" /* EnglishIE */, { relativeTime: relativeTimeConfig });
dayjs__default.default.updateLocale("en-il" /* EnglishIL */, { relativeTime: relativeTimeConfig });
dayjs__default.default.updateLocale("en-nz" /* EnglishNZ */, { relativeTime: relativeTimeConfig });
dayjs__default.default.updateLocale("en-SG" /* EnglishSG */, { relativeTime: relativeTimeConfig });
dayjs__default.default.updateLocale("en" /* EnglishUSA */, { relativeTime: relativeTimeConfig });
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
  return dayjs__default.default.utc().locale(locale);
}
function createFrom(value, locale) {
  if (!value) return null;
  const d = dayjs.isDayjs(value) ? value : dayjs__default.default.utc(value).locale(locale);
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
  return dayjs.isDayjs(x) || x instanceof Date || isValidNumber(x) || typeof x === "string";
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
var serializedDateSchema = zod.z.string().refine(
  (x) => {
    const d = parseDayjs(x);
    return !!d;
  },
  { message: "String must be a serialized date that can be parsed" }
);
var serializedDateSchemaForParsing = zod.z.union([zod.z.string(), zod.z.number(), zod.z.date(), dayjsSchemaStrict]).transform((x, ctx) => {
  const res = parseDayjs(x);
  if (!res) {
    ctx.addIssue({
      code: zod.z.ZodIssueCode.custom,
      message: "String must be a serialized date that can be parsed"
    });
    return zod.z.NEVER;
  }
  return res;
});
var serializedDateSchemaForSerialize = zod.z.union([zod.z.string(), zod.z.number(), zod.z.date(), dayjsSchemaStrict]).transform((x, ctx) => {
  const res = parseDayjs(x);
  if (!res) {
    ctx.addIssue({
      code: zod.z.ZodIssueCode.custom,
      message: "String must be a serialized date that can be parsed"
    });
    return zod.z.NEVER;
  }
  return res.toISOString();
});
var dayjsSchema = zod.z.union([dayjsSchemaStrict, serializedDateSchemaForParsing]);

Object.defineProperty(exports, "isDayjs", {
  enumerable: true,
  get: function () { return dayjs.isDayjs; }
});
exports.AvailableLocales = AvailableLocales;
exports.DEFAULT_DATETIME_FORMAT = DEFAULT_DATETIME_FORMAT;
exports.DEFAULT_DATE_FORMAT = DEFAULT_DATE_FORMAT;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
exports.InvalidDateError = InvalidDateError;
exports.TimeDefault = TimeDefault;
exports.TimeOverride = TimeOverride;
exports.calculateDateRangeDescription = calculateDateRangeDescription;
exports.createFrom = createFrom;
exports.createNow = createNow;
exports.dayjsNow = dayjsNow;
exports.dayjsSchema = dayjsSchema;
exports.dayjsSchemaStrict = dayjsSchemaStrict;
exports.dayjsTodayEOD = dayjsTodayEOD;
exports.duration = duration;
exports.durationBetween = durationBetween;
exports.formatDate = formatDate;
exports.formatDateTime = formatDateTime;
exports.fromNow = fromNow;
exports.fromNowStrict = fromNowStrict;
exports.getGranularityDescription = getGranularityDescription;
exports.getGranularityOptionsFromRange = getGranularityOptionsFromRange;
exports.isDayjsInput = isDayjsInput;
exports.isDuration = isDuration;
exports.isStrictDayjsInput = isStrictDayjsInput;
exports.isTodayOrFuture = isTodayOrFuture;
exports.isTodayOrPast = isTodayOrPast;
exports.isValidDate = isValidDate;
exports.isoDateSchema = isoDateSchema;
exports.isoDateStringSchema = isoDateStringSchema;
exports.isoTimeSchema = isoTimeSchema;
exports.makePrintWithPrefix = makePrintWithPrefix;
exports.max = max;
exports.maxDayjs = maxDayjs;
exports.min = min;
exports.minDayjs = minDayjs;
exports.parseDayjs = parseDayjs;
exports.parseDayjsEndOfDay = parseDayjsEndOfDay;
exports.parseDayjsOrError = parseDayjsOrError;
exports.parseDayjsStartOfDay = parseDayjsStartOfDay;
exports.parseFromStandardPeriods = parseFromStandardPeriods;
exports.parseISODateString = parseISODateString;
exports.parseISODateStringOrError = parseISODateStringOrError;
exports.parseToISOStringOrError = parseToISOStringOrError;
exports.printRange = printRange;
exports.printSince = printSince;
exports.printStarted = printStarted;
exports.serializedDateSchema = serializedDateSchema;
exports.serializedDateSchemaForParsing = serializedDateSchemaForParsing;
exports.serializedDateSchemaForSerialize = serializedDateSchemaForSerialize;
exports.serializedDateStringSchema = serializedDateStringSchema;
exports.tDaySchema = tDaySchema;
exports.tHoursSchema = tHoursSchema;
exports.tMillisecondsSchema = tMillisecondsSchema;
exports.tMinutesSchema = tMinutesSchema;
exports.tMonthSchema = tMonthSchema;
exports.tSecondsSchema = tSecondsSchema;
exports.tYearSchema = tYearSchema;
exports.toISODate = toISODate;
exports.toISOString = toISOString;
exports.toNow = toNow;
exports.toNowStrict = toNowStrict;
//# sourceMappingURL=mod.cjs.map
//# sourceMappingURL=mod.cjs.map