import { describe, expect, it } from "vitest";

import { isValidDate, parseDayjs } from "../mod";

describe("isValidDate()", () => {
  it("returns false with null", () => {
    expect(isValidDate(null)).toBeFalsy();
  });

  it("returns false with undefined", () => {
    expect(isValidDate(undefined)).toBeFalsy();
  });

  describe("with a string", () => {
    it("works with a valid date", () => {
      expect(isValidDate("2012-12-15")).toBeTruthy();
    });

    it("works with a valid date with time", () => {
      expect(isValidDate("2012-12-15T12:31:31Z")).toBeTruthy();
    });

    it("returns false with an invalid time", () => {
      expect(isValidDate("2012-12-15T12:31:97Z")).toBeFalsy();
    });

    it("returns false with an invalid day", () => {
      expect(isValidDate("2012-12-32T12:31:00Z")).toBeFalsy();
    });

    it("returns false with an invalid day (no time)", () => {
      expect(isValidDate("2012-12-32")).toBeFalsy();
    });
  });

  describe("with a Date", () => {
    it("works with a valid date", () => {
      expect(isValidDate(new Date("2012-12-15"))).toBeTruthy();
    });

    it("works with a valid date with time", () => {
      expect(isValidDate(new Date("2012-12-15T12:31:31Z"))).toBeTruthy();
    });

    it("returns false with an invalid time", () => {
      expect(isValidDate(new Date("2012-12-15T12:31:97Z"))).toBeFalsy();
    });

    it("returns false with an invalid day", () => {
      expect(isValidDate(new Date("2012-12-32T12:31:00Z"))).toBeFalsy();
    });

    it("returns false with an invalid day (no time)", () => {
      expect(isValidDate(new Date("2012-12-32"))).toBeFalsy();
    });
  });

  describe("with a Dayjs", () => {
    it("works with a valid date", () => {
      expect(isValidDate(parseDayjs("2012-12-15"))).toBeTruthy();
    });

    it("works with a valid date with time", () => {
      expect(isValidDate(parseDayjs("2012-12-15T12:31:31Z"))).toBeTruthy();
    });

    it("returns false with an invalid time", () => {
      expect(isValidDate(parseDayjs("2012-12-15T12:31:97Z"))).toBeFalsy();
    });

    it("returns false with an invalid day", () => {
      expect(isValidDate(parseDayjs("2012-12-32T12:31:00Z"))).toBeFalsy();
    });

    it("returns false with an invalid day (no time)", () => {
      expect(isValidDate(parseDayjs(new Date("2012-12-32")))).toBeFalsy();
    });
  });
});
