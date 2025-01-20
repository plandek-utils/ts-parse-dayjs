import { describe, expect, it } from "vitest";

import dayjs from "dayjs";
import esLocale from "dayjs/locale/es";
import utc from "dayjs/plugin/utc";
import timekeeper from "timekeeper";
import {
  AvailableLocales,
  DEFAULT_LOCALE,
  InvalidDateError,
  parseDayjs,
  parseDayjsEndOfDay,
  parseDayjsOrError,
  parseDayjsStartOfDay,
  parseISODateString,
  parseISODateStringOrError,
} from "../mod";
import { TimeDefault, TimeOverride } from "../time-options";

dayjs.extend(utc);

describe("parseDayjs() and parseISODateString()", () => {
  describe("without 2nd param (uses DEFAULT_LOCALE)", () => {
    it("with null: returns null", async () => {
      expect(parseDayjs(null)).toBeNull();
      expect(parseISODateString(null)).toBeNull();
    });

    it("with empty string: returns null", async () => {
      expect(parseDayjs("")).toBeNull();
      expect(parseISODateString("")).toBeNull();
    });

    it("with an invalid date: returns null", async () => {
      expect(parseDayjs("waa")).toBeNull();
      expect(parseISODateString("waa")).toBeNull();
    });

    it("with a valid date: returns Date", async () => {
      const d = dayjs.utc(new Date("2018-01-01")).locale(DEFAULT_LOCALE);
      expect(parseDayjs("2018-01-01")).toEqual(d);
      expect(parseISODateString("2018-01-01")).toEqual(d.toISOString());
    });

    it("with a date: returns the object", async () => {
      const d = dayjs.utc("2018-01-01").locale(DEFAULT_LOCALE);
      expect(parseDayjs(d)).toBe(d);
      expect(parseISODateString(d)).toEqual(d.toISOString());
    });

    it("with a dayjs: returns the dayjs object", async () => {
      const d = new Date("2018-01-01");
      const djs = dayjs.utc(d).locale(DEFAULT_LOCALE);
      expect(parseDayjs(d)).toEqual(djs);
      expect(parseISODateString(d)).toEqual(djs.toISOString());
    });
    it("returns a dayjs with `fromNow` enabled", async () => {
      const s1 = "2018-01-01";
      const s2 = "2018-01-03";
      const d1 = parseDayjsOrError(s1);
      const d2 = parseDayjsOrError(s2);

      timekeeper.freeze(d2.toDate());
      expect(d1.fromNow()).toEqual("2 days ago");
      timekeeper.reset();
    });
  });

  for (const { locale, suffix } of [
    { locale: esLocale, suffix: "imported locale object" },
    { locale: AvailableLocales.EnglishUSA, suffix: "AvailableLocale" },
  ]) {
    describe(`with 2nd param { locale: anotherLocale } (${suffix}) -> uses the given Locale`, () => {
      it("with null: returns null", async () => {
        expect(parseDayjs(null, { locale })).toBeNull();
        expect(parseISODateString(null, { locale })).toBeNull();
      });

      it("with empty string: returns null", async () => {
        expect(parseDayjs("", { locale })).toBeNull();
        expect(parseISODateString("", { locale })).toBeNull();
      });

      it("with an invalid date: returns null", async () => {
        expect(parseDayjs("waa", { locale })).toBeNull();
        expect(parseISODateString("waa", { locale })).toBeNull();
      });

      it("with a valid date: returns Dayjs", async () => {
        const d = dayjs.utc(new Date("2018-01-01")).locale(locale);
        expect(parseDayjs("2018-01-01", { locale })).toEqual(d);
        expect(parseISODateString("2018-01-01", { locale })).toEqual(d.toISOString());
      });

      it("with a date: returns the object", async () => {
        const d = dayjs.utc("2018-01-01").locale(locale);
        expect(parseDayjs(d, { locale })).toBe(d);
        expect(parseISODateString(d, { locale })).toEqual(d.toISOString());
      });

      it("with a dayjs: returns the dayjs object", async () => {
        const d = new Date("2018-01-01");
        const djs = dayjs.utc(d).locale(locale);
        expect(parseDayjs(d, { locale })).toEqual(djs);
        expect(parseISODateString(d, { locale })).toEqual(djs.toISOString());
      });
    });
  }

  describe("with time option", () => {
    describe(TimeOverride.StartOfDay, () => {
      it("with a valid date string: returns Dayjs at start of day", async () => {
        const d = dayjs.utc(new Date("2018-01-01T00:00:00.000Z")).locale(DEFAULT_LOCALE);
        expect(parseDayjs("2018-01-01T10:11:12.123Z", { time: TimeOverride.StartOfDay })).toEqual(d);
        expect(parseISODateString("2018-01-01T10:11:12.123Z", { time: TimeOverride.StartOfDay })).toEqual(
          d.toISOString(),
        );
      });

      it("with a date: returns a Dayjs object at start of day", async () => {
        const d = dayjs.utc("2018-01-01T10:11:12.123Z").locale(DEFAULT_LOCALE);
        const d2 = dayjs.utc(new Date("2018-01-01T00:00:00.000Z")).locale(DEFAULT_LOCALE);
        expect(parseDayjs(d, { time: TimeOverride.StartOfDay })).toEqual(d2);
        expect(parseISODateString(d, { time: TimeOverride.StartOfDay })).toEqual(d2.toISOString());
      });

      it("with a dayjs: returns a clone of the dayjs object at start of day", async () => {
        const d = new Date("2018-01-01T10:11:12.123Z");
        const djs = dayjs.utc(d).locale(DEFAULT_LOCALE);
        const djs2 = dayjs.utc(new Date("2018-01-01T00:00:00.000Z")).locale(DEFAULT_LOCALE);
        expect(parseDayjs(djs, { time: TimeOverride.StartOfDay })).toEqual(djs2);
        expect(parseISODateString(djs, { time: TimeOverride.StartOfDay })).toEqual(djs2.toISOString());
      });
    });

    describe(TimeDefault.StartOfDayIfMissing, () => {
      it("with a valid date string that has NO time inside: returns Dayjs without adapting the time", async () => {
        const d2 = dayjs.utc(new Date("2018-01-01T00:00:00.000Z")).locale(DEFAULT_LOCALE);
        expect(parseDayjs("2018-01-01", { time: TimeDefault.StartOfDayIfMissing })).toEqual(d2);
        expect(parseISODateString("2018-01-01", { time: TimeDefault.StartOfDayIfMissing })).toEqual(d2.toISOString());
      });

      it("with a valid date string that has time inside: returns Dayjs without adapting the time", async () => {
        const d2 = dayjs.utc(new Date("2018-01-01T10:11:12.123Z")).locale(DEFAULT_LOCALE);
        expect(parseDayjs("2018-01-01T10:11:12.123Z", { time: TimeDefault.StartOfDayIfMissing })).toEqual(d2);
        expect(parseISODateString("2018-01-01T10:11:12.123Z", { time: TimeDefault.StartOfDayIfMissing })).toEqual(
          d2.toISOString(),
        );
      });

      it("with a date: returns a Dayjs object without adapting the time", async () => {
        const d = dayjs.utc("2018-01-01T10:11:12.123Z").locale(DEFAULT_LOCALE);
        const d2 = dayjs.utc(new Date("2018-01-01T10:11:12.123Z")).locale(DEFAULT_LOCALE);
        expect(parseDayjs(d, { time: TimeDefault.StartOfDayIfMissing })).toEqual(d2);
        expect(parseISODateString(d, { time: TimeDefault.StartOfDayIfMissing })).toEqual(d2.toISOString());
      });

      it("with a dayjs: returns the same dayjs (without adapting the time)", async () => {
        const d = new Date("2018-01-01T10:11:12.123Z");
        const djs = dayjs.utc(d).locale(DEFAULT_LOCALE);
        expect(parseDayjs(djs, { time: TimeDefault.StartOfDayIfMissing })).toBe(djs);
        expect(parseISODateString(djs, { time: TimeDefault.StartOfDayIfMissing })).toBe(djs.toISOString());
      });
    });

    describe(TimeOverride.EndOfDay, () => {
      it("with a valid date string: returns Dayjs at end of day", async () => {
        const d = dayjs.utc(new Date("2018-01-01T23:59:59.999Z")).locale(DEFAULT_LOCALE);
        expect(parseDayjs("2018-01-01T10:11:12.123Z", { time: TimeOverride.EndOfDay })).toEqual(d);
        expect(parseISODateString("2018-01-01T10:11:12.123Z", { time: TimeOverride.EndOfDay })).toEqual(
          d.toISOString(),
        );
      });

      it("with a date: returns a Dayjs object at end of day", async () => {
        const d = dayjs.utc("2018-01-01T10:11:12.123Z").locale(DEFAULT_LOCALE);
        const d2 = dayjs.utc(new Date("2018-01-01T23:59:59.999Z")).locale(DEFAULT_LOCALE);
        expect(parseDayjs(d, { time: TimeOverride.EndOfDay })).toEqual(d2);
        expect(parseISODateString(d, { time: TimeOverride.EndOfDay })).toEqual(d2.toISOString());
      });

      it("with a dayjs: returns a clone of the dayjs object at end of day", async () => {
        const d = new Date("2018-01-01T10:11:12.123Z");
        const djs = dayjs.utc(d).locale(DEFAULT_LOCALE);
        const djs2 = dayjs.utc(new Date("2018-01-01T23:59:59.999Z")).locale(DEFAULT_LOCALE);
        expect(parseDayjs(djs, { time: TimeOverride.EndOfDay })).toEqual(djs2);
        expect(parseISODateString(djs, { time: TimeOverride.EndOfDay })).toEqual(djs2.toISOString());
      });
    });

    describe(TimeDefault.EndOfDayIfMissing, () => {
      it("with a valid date string that has NO time inside: returns Dayjs without adapting the time", async () => {
        const d = dayjs.utc(new Date("2018-01-01T23:59:59.999Z")).locale(DEFAULT_LOCALE);
        expect(parseDayjs("2018-01-01", { time: TimeDefault.EndOfDayIfMissing })).toEqual(d);
        expect(parseISODateString("2018-01-01", { time: TimeDefault.EndOfDayIfMissing })).toEqual(d.toISOString());
      });

      it("with a valid date string that has time inside: returns Dayjs without adapting the time", async () => {
        const d = dayjs.utc(new Date("2018-01-01T10:11:12.123Z")).locale(DEFAULT_LOCALE);
        expect(parseDayjs("2018-01-01T10:11:12.123Z", { time: TimeDefault.EndOfDayIfMissing })).toEqual(d);
        expect(parseISODateString("2018-01-01T10:11:12.123Z", { time: TimeDefault.EndOfDayIfMissing })).toEqual(
          d.toISOString(),
        );
      });

      it("with a date: returns a Dayjs object without adapting the time", async () => {
        const d = dayjs.utc("2018-01-01T10:11:12.123Z").locale(DEFAULT_LOCALE);
        const d2 = dayjs.utc(new Date("2018-01-01T10:11:12.123Z")).locale(DEFAULT_LOCALE);
        expect(parseDayjs(d, { time: TimeDefault.EndOfDayIfMissing })).toEqual(d2);
        expect(parseISODateString(d, { time: TimeDefault.EndOfDayIfMissing })).toEqual(d2.toISOString());
      });

      it("with a dayjs: returns the same dayjs (without adapting the time)", async () => {
        const d = new Date("2018-01-01T10:11:12.123Z");
        const djs = dayjs.utc(d).locale(DEFAULT_LOCALE);
        expect(parseDayjs(djs, { time: TimeDefault.EndOfDayIfMissing })).toBe(djs);
        expect(parseISODateString(djs, { time: TimeDefault.EndOfDayIfMissing })).toBe(djs.toISOString());
      });
    });
  });
});

describe("parseDayjsOrError() and parseISODateStringOrError()", () => {
  it("with null: throws error", async () => {
    expect(() => parseDayjsOrError(null)).toThrowError(InvalidDateError);
    expect(() => parseISODateStringOrError(null)).toThrowError(InvalidDateError);
  });

  it("with empty string: throws error", async () => {
    expect(() => parseDayjsOrError("")).toThrowError(InvalidDateError);
    expect(() => parseISODateStringOrError("")).toThrowError(InvalidDateError);
  });

  it("with an invalid date: throws error", async () => {
    expect(() => parseDayjsOrError("waa")).toThrowError(InvalidDateError);
    expect(() => parseISODateStringOrError("waa")).toThrowError(InvalidDateError);
  });

  it("with a valid date: returns Dayjs", async () => {
    expect(parseDayjsOrError("2018-01-01")).toEqual(dayjs.utc(new Date("2018-01-01")).locale(DEFAULT_LOCALE));
    expect(parseISODateStringOrError("2018-01-01")).toEqual(
      dayjs.utc(new Date("2018-01-01")).locale(DEFAULT_LOCALE).toISOString(),
    );
  });

  it("with a date: returns the object", async () => {
    const d = dayjs.utc("2018-01-01").locale(DEFAULT_LOCALE);
    expect(parseDayjsOrError(d)).toBe(d);
    expect(parseISODateStringOrError(d)).toEqual(d.toISOString());
  });

  it("with a dayjs: returns the dayjs object", async () => {
    const d = new Date("2018-01-01");
    const djs = dayjs.utc(d).locale(DEFAULT_LOCALE);
    expect(parseDayjsOrError(d)).toEqual(djs);
    expect(parseISODateStringOrError(d)).toEqual(djs.toISOString());
  });
});

describe("parseDayjsStartOfDay()", () => {
  it("with null: returns null", async () => {
    expect(parseDayjsStartOfDay(null)).toBeNull();
  });

  it("with empty string: returns null", async () => {
    expect(parseDayjsStartOfDay("")).toBeNull();
  });

  it("with an invalid date: returns null", async () => {
    expect(parseDayjsStartOfDay("waa")).toBeNull();
  });

  it("with a valid date: returns Date at start of day", async () => {
    const d = parseDayjsStartOfDay("2018-01-01");
    expect(d).toEqual(dayjs.utc("2018-01-01T00:00:00.000Z").locale(DEFAULT_LOCALE));
    expect(d?.toISOString()).toEqual("2018-01-01T00:00:00.000Z");
  });
});

describe("parseDayjsEndOfDay()", () => {
  it("with null: returns null", async () => {
    expect(parseDayjsEndOfDay(null)).toBeNull();
  });

  it("with empty string: returns null", async () => {
    expect(parseDayjsEndOfDay("")).toBeNull();
  });

  it("with an invalid date: returns null", async () => {
    expect(parseDayjsEndOfDay("waa")).toBeNull();
  });

  it("with a valid date: returns Date at end of day", async () => {
    const d = parseDayjsEndOfDay("2018-01-01");
    expect(d).toEqual(dayjs.utc("2018-01-01T23:59:59.999Z").locale(DEFAULT_LOCALE));
    expect(d?.toISOString()).toEqual("2018-01-01T23:59:59.999Z");
  });
});
