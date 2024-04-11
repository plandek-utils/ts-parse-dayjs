import { ISODate, ISODateString, parseDayjsOrError, toISODate, toISOString } from "..";

describe("toISOString", () => {
  it("should return the ISO string of the given Dayjs", () => {
    const d = parseDayjsOrError("2020-01-01T12:34:56.789Z");
    const actual: ISODateString = toISOString(d);
    expect(actual).toBe("2020-01-01T12:34:56.789Z");
  });
});

describe("toISODate", () => {
  describe("returns the ISO string representing the DATE ONLY of the given Dayjs object", () => {
    [
      ["2020-01-01T12:34:56.789Z", "2020-01-01"],
      ["2020-01-01T00:00:00.000Z", "2020-01-01"],
      ["2020-01-01T23:59:59.999Z", "2020-01-01"],
    ].forEach(([input, expected]) => {
      it(`${input} -> ${expected}`, () => {
        const d = parseDayjsOrError(input);
        const actual: ISODate = toISODate(d);
        expect(actual).toBe(expected);
      });
    });
  });
});
