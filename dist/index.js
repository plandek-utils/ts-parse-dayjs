"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AvailableLocales: () => AvailableLocales,
  DEFAULT_DATETIME_FORMAT: () => DEFAULT_DATETIME_FORMAT,
  DEFAULT_DATE_FORMAT: () => DEFAULT_DATE_FORMAT,
  DEFAULT_LOCALE: () => DEFAULT_LOCALE,
  InvalidDateError: () => InvalidDateError,
  TimeDefault: () => TimeDefault,
  TimeOverride: () => TimeOverride,
  calculateDateRangeDescription: () => calculateDateRangeDescription,
  createFrom: () => createFrom,
  createNow: () => createNow,
  dayjsNow: () => dayjsNow,
  dayjsSchema: () => dayjsSchema,
  dayjsSchemaStrict: () => dayjsSchemaStrict,
  dayjsTodayEOD: () => dayjsTodayEOD,
  duration: () => duration,
  durationBetween: () => durationBetween,
  formatDate: () => formatDate,
  formatDateTime: () => formatDateTime,
  fromNow: () => fromNow,
  fromNowStrict: () => fromNowStrict,
  getGranularityDescription: () => getGranularityDescription,
  getGranularityOptionsFromRange: () => getGranularityOptionsFromRange,
  isDayjs: () => import_dayjs.isDayjs,
  isDayjsInput: () => isDayjsInput,
  isDuration: () => isDuration,
  isStrictDayjsInput: () => isStrictDayjsInput,
  isTodayOrFuture: () => isTodayOrFuture,
  isTodayOrPast: () => isTodayOrPast,
  isValidDate: () => isValidDate,
  isoDateSchema: () => isoDateSchema,
  isoDateStringSchema: () => isoDateStringSchema,
  isoTimeSchema: () => isoTimeSchema,
  makePrintWithPrefix: () => makePrintWithPrefix,
  max: () => max,
  maxDayjs: () => maxDayjs,
  min: () => min,
  minDayjs: () => minDayjs,
  parseDayjs: () => parseDayjs,
  parseDayjsEndOfDay: () => parseDayjsEndOfDay,
  parseDayjsOrError: () => parseDayjsOrError,
  parseDayjsStartOfDay: () => parseDayjsStartOfDay,
  parseFromStandardPeriods: () => parseFromStandardPeriods,
  printRange: () => printRange,
  printSince: () => printSince,
  printStarted: () => printStarted,
  serializedDateSchema: () => serializedDateSchema,
  serializedDateSchemaForParsing: () => serializedDateSchemaForParsing,
  serializedDateSchemaForSerialize: () => serializedDateSchemaForSerialize,
  serializedDateStringSchema: () => serializedDateStringSchema,
  tDaySchema: () => tDaySchema,
  tHoursSchema: () => tHoursSchema,
  tMillisecondsSchema: () => tMillisecondsSchema,
  tMinutesSchema: () => tMinutesSchema,
  tMonthSchema: () => tMonthSchema,
  tSecondsSchema: () => tSecondsSchema,
  tYearSchema: () => tYearSchema,
  toISODate: () => toISODate,
  toISOString: () => toISOString,
  toNow: () => toNow,
  toNowStrict: () => toNowStrict
});
module.exports = __toCommonJS(src_exports);

// src/base.ts
var import_dayjs = __toESM(require("dayjs"));
var import_en = require("dayjs/locale/en");
var import_en_au = require("dayjs/locale/en-au");
var import_en_ca = require("dayjs/locale/en-ca");
var import_en_gb = require("dayjs/locale/en-gb");
var import_en_ie = require("dayjs/locale/en-ie");
var import_en_il = require("dayjs/locale/en-il");
var import_en_nz = require("dayjs/locale/en-nz");
var import_en_sg = require("dayjs/locale/en-sg");
var import_advancedFormat = require("dayjs/plugin/advancedFormat");
var import_duration = require("dayjs/plugin/duration");
var import_isBetween = require("dayjs/plugin/isBetween");
var import_isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
var import_isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
var import_minMax = require("dayjs/plugin/minMax");
var import_updateLocale = require("dayjs/plugin/updateLocale");
var import_utc = require("dayjs/plugin/utc");
var import_weekOfYear = require("dayjs/plugin/weekOfYear");

// src/dayjs-plugin/relative-time-plugin.ts
var import_relativeTime = __toESM(require("dayjs/plugin/relativeTime"));
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
  (0, import_relativeTime.default)(OPTIONS_RELATIVE, c, d);
  const fromToBaseRelative = c.prototype.fromToBase;
  (0, import_relativeTime.default)(OPTIONS_STRICT, c, d);
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

// src/base.ts
var import_advancedFormat2 = __toESM(require("dayjs/plugin/advancedFormat"));
var import_duration2 = __toESM(require("dayjs/plugin/duration"));
var import_isBetween2 = __toESM(require("dayjs/plugin/isBetween"));
var import_isSameOrAfter2 = __toESM(require("dayjs/plugin/isSameOrAfter"));
var import_isSameOrBefore2 = __toESM(require("dayjs/plugin/isSameOrBefore"));
var import_minMax2 = __toESM(require("dayjs/plugin/minMax"));
var import_updateLocale2 = __toESM(require("dayjs/plugin/updateLocale"));
var import_utc2 = __toESM(require("dayjs/plugin/utc"));
var import_weekOfYear2 = __toESM(require("dayjs/plugin/weekOfYear"));
var import_zod = require("zod");

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
import_dayjs.default.extend(import_advancedFormat2.default);
import_dayjs.default.extend(import_duration2.default);
import_dayjs.default.extend(import_isBetween2.default);
import_dayjs.default.extend(import_isSameOrAfter2.default);
import_dayjs.default.extend(import_isSameOrBefore2.default);
import_dayjs.default.extend(import_minMax2.default);
import_dayjs.default.extend(relativeTimeStrictPlugin);
import_dayjs.default.extend(import_utc2.default);
import_dayjs.default.extend(import_weekOfYear2.default);
import_dayjs.default.extend(import_updateLocale2.default);
var min = import_dayjs.default.min;
var max = import_dayjs.default.max;
var duration = import_dayjs.default.duration;
var isDuration = import_dayjs.default.isDuration;
var dayjsSchemaStrict = import_zod.z.instanceof(import_dayjs.default);
var TWO_DIGIT_NUMBER_REGEX = /^\d{2}$/;
var THREE_DIGIT_NUMBER_REGEX = /^\d{3}$/;
var YEAR_REGEX = /^-?\d+$/;
var tYearSchema = import_zod.z.custom((val) => {
  return typeof val === "string" ? YEAR_REGEX.test(val) : false;
});
var tMonthSchema = import_zod.z.custom((val) => {
  if (typeof val !== "string") return false;
  if (!TWO_DIGIT_NUMBER_REGEX.test(val)) return false;
  const parsed = parseInteger(val);
  return parsed >= 1 && parsed <= 12;
});
var tDaySchema = import_zod.z.custom((val) => {
  if (typeof val !== "string") return false;
  if (!TWO_DIGIT_NUMBER_REGEX.test(val)) return false;
  const parsed = parseInteger(val);
  return parsed >= 1 && parsed <= 31;
});
var tHoursSchema = import_zod.z.custom((val) => {
  if (typeof val !== "string") return false;
  if (!TWO_DIGIT_NUMBER_REGEX.test(val)) return false;
  const parsed = parseInteger(val);
  return parsed >= 0 && parsed <= 23;
});
var tMinutesSchema = import_zod.z.custom((val) => {
  if (typeof val !== "string") return false;
  if (!TWO_DIGIT_NUMBER_REGEX.test(val)) return false;
  const parsed = parseInteger(val);
  return parsed >= 0 && parsed <= 59;
});
var tSecondsSchema = tMinutesSchema;
var tMillisecondsSchema = import_zod.z.custom((val) => {
  return typeof val === "string" ? THREE_DIGIT_NUMBER_REGEX.test(val) : false;
});
var isoDateSchema = import_zod.z.custom((val) => {
  if (typeof val !== "string") return false;
  const [year, month, day] = val.split("-");
  if (!tYearSchema.safeParse(year).success) return false;
  if (!tMonthSchema.safeParse(month).success) return false;
  if (!tDaySchema.safeParse(day).success) return false;
  return true;
});
var isoTimeSchema = import_zod.z.custom((val) => {
  if (typeof val !== "string") return false;
  const [hours, minutes, seconds] = val.split(":");
  const [secondsPart, milliseconds] = (seconds ?? "").split(".");
  if (!tHoursSchema.safeParse(hours).success) return false;
  if (!tMinutesSchema.safeParse(minutes).success) return false;
  if (!tSecondsSchema.safeParse(secondsPart).success) return false;
  if (!tMillisecondsSchema.safeParse(milliseconds).success) return false;
  return true;
});
var isoDateStringSchema = import_zod.z.custom((val) => {
  if (typeof val !== "string") return false;
  const [date, rest] = val.split("T");
  if (!isoDateSchema.safeParse(date).success) return false;
  if (!rest.endsWith("Z")) return false;
  const time = rest.slice(0, -1);
  return isoTimeSchema.safeParse(time).success;
});
var serializedDateStringSchema = import_zod.z.union([isoDateSchema, isoDateStringSchema]);
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
import_dayjs.default.updateLocale("en-au" /* EnglishAU */, { relativeTime: relativeTimeConfig });
import_dayjs.default.updateLocale("en-ca" /* EnglishCA */, { relativeTime: relativeTimeConfig });
import_dayjs.default.updateLocale("en-gb" /* EnglishGB */, { relativeTime: relativeTimeConfig });
import_dayjs.default.updateLocale("en-ie" /* EnglishIE */, { relativeTime: relativeTimeConfig });
import_dayjs.default.updateLocale("en-il" /* EnglishIL */, { relativeTime: relativeTimeConfig });
import_dayjs.default.updateLocale("en-nz" /* EnglishNZ */, { relativeTime: relativeTimeConfig });
import_dayjs.default.updateLocale("en-SG" /* EnglishSG */, { relativeTime: relativeTimeConfig });
import_dayjs.default.updateLocale("en" /* EnglishUSA */, { relativeTime: relativeTimeConfig });
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
  return import_dayjs.default.utc().locale(locale);
}
function createFrom(value, locale) {
  if (!value) return null;
  const d = (0, import_dayjs.isDayjs)(value) ? value : import_dayjs.default.utc(value).locale(locale);
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
  return (0, import_dayjs.isDayjs)(x) || x instanceof Date || isValidNumber(x) || typeof x === "string";
}
function isDayjsInput(x) {
  return isNil(x) || isStrictDayjsInput(x);
}
function isNil(x) {
  return x === null || x === void 0;
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

// src/zod-schema.ts
var import_zod2 = require("zod");
var serializedDateSchema = import_zod2.z.string().refine(
  (x) => {
    const d = parseDayjs(x);
    return !!d;
  },
  { message: "String must be a serialized date that can be parsed" }
);
var serializedDateSchemaForParsing = import_zod2.z.union([import_zod2.z.string(), import_zod2.z.number(), import_zod2.z.date(), dayjsSchemaStrict]).transform((x, ctx) => {
  const res = parseDayjs(x);
  if (!res) {
    ctx.addIssue({
      code: import_zod2.z.ZodIssueCode.custom,
      message: "String must be a serialized date that can be parsed"
    });
    return import_zod2.z.NEVER;
  }
  return res;
});
var serializedDateSchemaForSerialize = import_zod2.z.union([import_zod2.z.string(), import_zod2.z.number(), import_zod2.z.date(), dayjsSchemaStrict]).transform((x, ctx) => {
  const res = parseDayjs(x);
  if (!res) {
    ctx.addIssue({
      code: import_zod2.z.ZodIssueCode.custom,
      message: "String must be a serialized date that can be parsed"
    });
    return import_zod2.z.NEVER;
  }
  return res.toISOString();
});
var dayjsSchema = import_zod2.z.union([dayjsSchemaStrict, serializedDateSchemaForParsing]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvailableLocales,
  DEFAULT_DATETIME_FORMAT,
  DEFAULT_DATE_FORMAT,
  DEFAULT_LOCALE,
  InvalidDateError,
  TimeDefault,
  TimeOverride,
  calculateDateRangeDescription,
  createFrom,
  createNow,
  dayjsNow,
  dayjsSchema,
  dayjsSchemaStrict,
  dayjsTodayEOD,
  duration,
  durationBetween,
  formatDate,
  formatDateTime,
  fromNow,
  fromNowStrict,
  getGranularityDescription,
  getGranularityOptionsFromRange,
  isDayjs,
  isDayjsInput,
  isDuration,
  isStrictDayjsInput,
  isTodayOrFuture,
  isTodayOrPast,
  isValidDate,
  isoDateSchema,
  isoDateStringSchema,
  isoTimeSchema,
  makePrintWithPrefix,
  max,
  maxDayjs,
  min,
  minDayjs,
  parseDayjs,
  parseDayjsEndOfDay,
  parseDayjsOrError,
  parseDayjsStartOfDay,
  parseFromStandardPeriods,
  printRange,
  printSince,
  printStarted,
  serializedDateSchema,
  serializedDateSchemaForParsing,
  serializedDateSchemaForSerialize,
  serializedDateStringSchema,
  tDaySchema,
  tHoursSchema,
  tMillisecondsSchema,
  tMinutesSchema,
  tMonthSchema,
  tSecondsSchema,
  tYearSchema,
  toISODate,
  toISOString,
  toNow,
  toNowStrict
});
//# sourceMappingURL=index.js.map