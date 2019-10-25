import dayjs, { isDayjs } from "dayjs";
// tslint:disable:no-submodule-imports
// @ts-ignore
import esLocale from "dayjs/locale/es";
import utc from "dayjs/plugin/utc";
// tslint:enable:no-submodule-imports
import timekeeper from "timekeeper";
import {
  AvailableLocales,
  dayjsNow,
  DEFAULT_LOCALE,
  InvalidDateError,
  parseDayjs,
  parseDayjsEndOfDay,
  parseDayjsOrError,
  parseDayjsStartOfDay
} from "..";

dayjs.extend(utc);

describe("dayjsNow()", () => {
  it("returns a Dayjs (in UTC) of the current time", () => {
    const d1 = new Date();
    const actual = dayjsNow();
    const d2 = new Date();
    expect(isDayjs(actual)).toBeTruthy();
    expect(actual.isUTC()).toBeTruthy();
    expect(actual.isAfter(d2)).toBeFalsy();
    expect(actual.isBefore(d1)).toBeFalsy();
  });

  it("ensures it is the current time", () => {
    const d = new Date();
    timekeeper.freeze(d);
    const actual = dayjsNow();
    timekeeper.reset();
    expect(actual.toDate()).toEqual(d);
  });
});

describe("parseDayjs()", () => {
  describe("without 2nd param (uses DEFAULT_LOCALE)", () => {
    it("with null: returns null", async () => {
      expect(parseDayjs(null)).toBeNull();
    });

    it("with empty string: returns null", async () => {
      expect(parseDayjs("")).toBeNull();
    });

    it("with an invalid date: returns null", async () => {
      expect(parseDayjs("waa")).toBeNull();
    });

    it("with a valid date: returns Date", async () => {
      expect(parseDayjs("2018-01-01")).toEqual(
        dayjs.utc(new Date("2018-01-01")).locale(DEFAULT_LOCALE)
      );
    });

    it("with a date: returns the object", async () => {
      const d = dayjs.utc("2018-01-01").locale(DEFAULT_LOCALE);
      expect(parseDayjs(d)).toBe(d);
    });

    it("with a dayjs: returns the dayjs object", async () => {
      const d = new Date("2018-01-01");
      const djs = dayjs.utc(d).locale(DEFAULT_LOCALE);
      expect(parseDayjs(d)).toEqual(djs);
    });
  });

  [
    { locale: esLocale, suffix: "imported locale object" },
    { locale: AvailableLocales.EnglishUSA, suffix: "AvailableLocale" }
  ].forEach(({ locale, suffix }) => {
    describe(`with 2nd param Locale (${suffix}) -> uses the given Locale`, () => {
      it("with null: returns null", async () => {
        expect(parseDayjs(null, locale)).toBeNull();
      });

      it("with empty string: returns null", async () => {
        expect(parseDayjs("", locale)).toBeNull();
      });

      it("with an invalid date: returns null", async () => {
        expect(parseDayjs("waa", locale)).toBeNull();
      });

      it("with a valid date: returns Date", async () => {
        expect(parseDayjs("2018-01-01", locale)).toEqual(
          dayjs.utc(new Date("2018-01-01"), locale).locale(locale)
        );
      });

      it("with a date: returns the object", async () => {
        const d = dayjs.utc("2018-01-01").locale(locale);
        expect(parseDayjs(d, locale)).toBe(d);
      });

      it("with a dayjs: returns the dayjs object", async () => {
        const d = new Date("2018-01-01");
        const djs = dayjs.utc(d).locale(locale);
        expect(parseDayjs(d, locale)).toEqual(djs);
      });
    });
  });
});

describe("parseDayjsOrError()", () => {
  it("with null: throws error", async () => {
    expect(() => parseDayjsOrError(null)).toThrowError(InvalidDateError);
  });

  it("with empty string: throws error", async () => {
    expect(() => parseDayjsOrError("")).toThrowError(InvalidDateError);
  });

  it("with an invalid date: throws error", async () => {
    expect(() => parseDayjsOrError("waa")).toThrowError(InvalidDateError);
  });

  it("with a valid date: returns Date", async () => {
    expect(parseDayjsOrError("2018-01-01")).toEqual(
      dayjs.utc(new Date("2018-01-01")).locale(DEFAULT_LOCALE)
    );
  });

  it("with a date: returns the object", async () => {
    const d = dayjs.utc("2018-01-01").locale(DEFAULT_LOCALE);
    expect(parseDayjsOrError(d)).toBe(d);
  });

  it("with a dayjs: returns the dayjs object", async () => {
    const d = new Date("2018-01-01");
    const djs = dayjs.utc(d).locale(DEFAULT_LOCALE);
    expect(parseDayjsOrError(d)).toEqual(djs);
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
    expect(d).toEqual(
      dayjs.utc("2018-01-01T00:00:00.000Z").locale(DEFAULT_LOCALE)
    );
    expect(d && d.toISOString()).toEqual("2018-01-01T00:00:00.000Z");
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
    expect(d).toEqual(
      dayjs.utc("2018-01-01T23:59:59.999Z").locale(DEFAULT_LOCALE)
    );
    expect(d && d.toISOString()).toEqual("2018-01-01T23:59:59.999Z");
  });
});
