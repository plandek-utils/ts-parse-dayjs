import dayjs, { isDayjs } from "dayjs";
// tslint:disable-next-line:no-submodule-imports
import utc from "dayjs/plugin/utc";
import {
  dayjsNow,
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
    expect(actual.isAfter(d2)).toBeFalsy();
    expect(actual.isBefore(d1)).toBeFalsy();
  });
});

describe("parseDayjs()", () => {
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
    expect(parseDayjs("2018-01-01")).toEqual(dayjs.utc(new Date("2018-01-01")));
  });

  it("with a date: returns the object", async () => {
    const d = dayjs.utc("2018-01-01");
    expect(parseDayjs(d)).toBe(d);
  });

  it("with a dayjs: returns the dayjs object", async () => {
    const d = new Date("2018-01-01");
    const djs = dayjs.utc(d);
    expect(parseDayjs(d)).toEqual(djs);
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
      dayjs.utc(new Date("2018-01-01"))
    );
  });

  it("with a date: returns the object", async () => {
    const d = dayjs.utc("2018-01-01");
    expect(parseDayjsOrError(d)).toBe(d);
  });

  it("with a dayjs: returns the dayjs object", async () => {
    const d = new Date("2018-01-01");
    const djs = dayjs.utc(d);
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
    expect(d).toEqual(dayjs.utc("2018-01-01T00:00:00.000Z"));
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
    expect(d).toEqual(dayjs.utc("2018-01-01T23:59:59.999Z"));
    expect(d && d.toISOString()).toEqual("2018-01-01T23:59:59.999Z");
  });
});
