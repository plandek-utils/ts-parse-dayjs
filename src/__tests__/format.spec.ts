import { formatDate, parseDayjs } from "..";

describe("formatDate()", () => {
  it("formatDate(null) => null", () => {
    expect(formatDate(null)).toBeNull();
  });

  describe("with default format", () => {
    expect(formatDate(parseDayjs("2019-01-02"))).toEqual("2nd Jan 2019");
  });

  describe("with custom format", () => {
    expect(formatDate(parseDayjs("2019-01-02"), "Do ww MMMM YYYY")).toEqual(
      "2nd 01 January 2019"
    );
  });
});
