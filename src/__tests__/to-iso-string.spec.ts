import { ISODateString, parseDayjsOrError, toISOString } from "..";

describe("toISOString", () => {
  it("should return the ISO string of the given Dayjs", () => {
    const d = parseDayjsOrError("2020-01-01T12:34:56.789Z");
    const actual: ISODateString = toISOString(d);
    expect(actual).toBe("2020-01-01T12:34:56.789Z");
  });
});
