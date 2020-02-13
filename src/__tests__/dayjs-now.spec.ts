import dayjs, { isDayjs } from "dayjs";
// tslint:disable:no-submodule-imports
// @ts-ignore
import utc from "dayjs/plugin/utc";
// tslint:enable:no-submodule-imports
import timekeeper from "timekeeper";
import { dayjsNow } from "..";

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

  it("can be formatted (end of day)", () => {
    const d = new Date("2017-08-15T23:59:59.999Z");
    timekeeper.freeze(d);
    const actual = dayjsNow();
    timekeeper.reset();
    expect(actual.toDate()).toEqual(d);
    expect(actual.format("Do MMM YYYY")).toEqual("15th Aug 2017");
  });

  it("can be formatted (start of day)", () => {
    const d = new Date("2017-08-15T00:00:00.000Z");
    timekeeper.freeze(d);
    const actual = dayjsNow();
    timekeeper.reset();
    expect(actual.toDate()).toEqual(d);
    expect(actual.format("Do MMM YYYY")).toEqual("15th Aug 2017");
  });

  it("supports week of year", () => {
    const d = new Date("2017-01-10T00:00:00.000Z");
    timekeeper.freeze(d);
    const actual = dayjsNow();
    timekeeper.reset();
    expect(actual.toDate()).toEqual(d);
    expect(actual.week()).toEqual(2);
  });
});
