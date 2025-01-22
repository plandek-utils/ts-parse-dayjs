import { describe, expect, it } from "vitest";

import { parseDayjsEndOfDay, parseDayjsOrError, parseDayjsStartOfDay, printRange, printSince } from "..";

describe("print utils", () => {
  const from = "2017-08-05";
  const to = "2019-08-15";
  const dayjsFrom = parseDayjsOrError(parseDayjsStartOfDay(from));
  const dayjsTo = parseDayjsOrError(parseDayjsEndOfDay(to));

  describe("printSince()", () => {
    it("returns a formatted from date prefixed with 'Since '", () => {
      expect(printSince(dayjsTo)).toEqual("Since 15th Aug 2019");
    });
  });

  describe("printRange()", () => {
    it("if a date is missing, returns null", () => {
      expect(printRange({ from: dayjsFrom, to: null })).toBeNull();
      expect(printRange({ from: null, to: dayjsTo })).toBeNull();
      expect(printRange({ from: null, to: null })).toBeNull();
    });

    it("if dates are different - returns a from date and to date formatted as per the provided format separated by '-'", () => {
      expect(printRange({ from: dayjsFrom, to: dayjsTo })).toEqual("5th Aug 2017 - 15th Aug 2019");
    });

    it("if dates are the same - returns a formatted from date with no separator", () => {
      expect(printRange({ from: dayjsFrom, to: dayjsFrom })).toEqual("5th Aug 2017");
    });
  });
});
