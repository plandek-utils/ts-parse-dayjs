import { formatDate, formatDateTime, parseDayjs } from "..";

describe("formatDate()", () => {
  it("formatDate(null) => null", () => {
    expect(formatDate(null)).toBeNull();
  });

  describe("with default format", () => {
    expect(formatDate(parseDayjs("2019-01-02"))).toEqual("2nd Jan 2019");
  });

  describe("with custom format", () => {
    expect(formatDate(parseDayjs("2019-01-02"), "Do ww MMMM YYYY")).toEqual("2nd 01 January 2019");
  });
});

describe("formatDateTime()", () => {
  it("formatDateTime(null) => null", () => {
    expect(formatDateTime(null)).toBeNull();
  });

  describe("with default format", () => {
    expect(formatDateTime(parseDayjs("2019-01-02T13:24:12Z"))).toEqual("2nd Jan 2019 1:24 PM");
  });

  describe("with custom format", () => {
    expect(formatDateTime(parseDayjs("2019-01-02T13:24:12Z"), "Do ww MMMM YYYY HH:mm")).toEqual(
      "2nd 01 January 2019 13:24"
    );
  });
});
