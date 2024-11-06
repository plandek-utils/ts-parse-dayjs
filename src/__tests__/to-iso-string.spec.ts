import { describe, expect, it } from "vitest";

import { type ISODate, type ISODateString, parseDayjsOrError, toISODate, toISOString } from "..";

describe("toISOString", () => {
  it("should return the ISO string of the given Dayjs", () => {
    const d = parseDayjsOrError("2020-01-01T12:34:56.789Z");
    const actual: ISODateString = toISOString(d);
    expect(actual).toBe("2020-01-01T12:34:56.789Z");
  });
});

describe("toISODate", () => {
  describe("returns the ISO string representing the DATE ONLY of the given Dayjs object", () => {
    for (const [input, expected] of [
      ["2020-01-01T12:34:56.789Z", "2020-01-01"],
      ["2020-01-01T00:00:00.000Z", "2020-01-01"],
      ["2020-01-01T23:59:59.999Z", "2020-01-01"],
    ]) {
      it(`${input} -> ${expected}`, () => {
        const d = parseDayjsOrError(input);
        const actual: ISODate = toISODate(d);
        expect(actual).toBe(expected);
      });
    }
  });
});
