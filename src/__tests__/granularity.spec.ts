import { getGranularityDescription, getGranularityOptionsFromRange } from "../granularity";

describe("getGranularityDescription", () => {
  it("null -> daily", () => {
    expect(getGranularityDescription(null)).toBe("daily");
  });
  it("day -> daily", () => {
    expect(getGranularityDescription("day")).toBe("daily");
  });
  it("week -> weekly", () => {
    expect(getGranularityDescription("week")).toBe("weekly");
  });
  it("month -> monthly", () => {
    expect(getGranularityDescription("month")).toBe("monthly");
  });
  it("year -> yearly", () => {
    expect(getGranularityDescription("year")).toBe("yearly");
  });
});

describe("getGranularityOptionsFromRange", () => {
  it("empty array with missing or invalid dates", () => {
    expect(getGranularityOptionsFromRange({})).toEqual([]);
    expect(getGranularityOptionsFromRange({ from: "2022-01-01" })).toEqual([]);
    expect(getGranularityOptionsFromRange({ to: "2022-01-01" })).toEqual([]);
    expect(getGranularityOptionsFromRange({ from: "nope", to: "2022-10-10" })).toEqual([]);
  });

  it("2 days, starts Tue -> day", () => {
    expect(getGranularityOptionsFromRange({ from: "2022-07-12", to: "2022-07-13" })).toEqual(["day"]);
  });
  it("10 days, starts Tue -> day", () => {
    expect(getGranularityOptionsFromRange({ from: "2022-07-12", to: "2022-07-21" })).toEqual(["day"]);
  });
  it("20 days, starts Tue -> day", () => {
    expect(getGranularityOptionsFromRange({ from: "2022-07-12", to: "2022-07-31" })).toEqual(["day"]);
  });
  it("21 days, starts Tue -> day", () => {
    expect(getGranularityOptionsFromRange({ from: "2022-07-12", to: "2022-08-01" })).toEqual(["day"]);
  });
  it("41 days, starts Tue -> day", () => {
    expect(getGranularityOptionsFromRange({ from: "2022-07-12", to: "2022-08-21" })).toEqual(["day"]);
  });

  it("2 days, starts Mon -> day", () => {
    expect(getGranularityOptionsFromRange({ from: "2022-07-11", to: "2022-07-13" })).toEqual(["day"]);
  });
  it("10 days, starts Mon -> day, week", () => {
    expect(getGranularityOptionsFromRange({ from: "2022-07-11", to: "2022-07-20" })).toEqual(["day", "week"]);
  });
  it("20 days, starts Mon -> day, week", () => {
    expect(getGranularityOptionsFromRange({ from: "2022-07-11", to: "2022-07-30" })).toEqual(["day", "week"]);
  });
  it("21 days, starts Mon -> day, week", () => {
    expect(getGranularityOptionsFromRange({ from: "2022-07-11", to: "2022-07-31" })).toEqual(["day", "week"]);
  });
  it("41 days, starts Mon -> day, week", () => {
    expect(getGranularityOptionsFromRange({ from: "2022-07-11", to: "2022-07-31" })).toEqual(["day", "week"]);
  });

  it("2 days, starts Mon, Nov 1st -> day", () => {
    expect(getGranularityOptionsFromRange({ from: "2021-11-01", to: "2021-11-02" })).toEqual(["day"]);
  });
  it("10 days, starts Mon, Nov 1st -> day, week", () => {
    expect(getGranularityOptionsFromRange({ from: "2021-11-01", to: "2021-11-10" })).toEqual(["day", "week"]);
  });
  it("20 days, starts Mon, Nov 1st -> day, week", () => {
    expect(getGranularityOptionsFromRange({ from: "2021-11-01", to: "2021-11-20" })).toEqual(["day", "week"]);
  });
  it("21 days, starts Mon, Nov 1st -> day, week", () => {
    expect(getGranularityOptionsFromRange({ from: "2021-11-01", to: "2021-11-21" })).toEqual(["day", "week"]);
  });
  it("41 days, starts Mon, Nov 1st -> day, week, month", () => {
    expect(getGranularityOptionsFromRange({ from: "2021-11-01", to: "2021-12-11" })).toEqual(["day", "week", "month"]);
  });
  it("500 days, starts Mon, Nov 1st -> day, week, month", () => {
    expect(getGranularityOptionsFromRange({ from: "2021-11-01", to: "2023-03-16" })).toEqual(["day", "week", "month"]);
  });

  it("40 days, starts Friday, Jan 1st -> day, month", () => {
    expect(getGranularityOptionsFromRange({ from: "2021-01-01", to: "2021-02-09" })).toEqual(["day", "month"]);
  });
  it("500 days, starts Friday, Jan 1st -> day, month, year", () => {
    expect(getGranularityOptionsFromRange({ from: "2021-01-01", to: "2022-05-16" })).toEqual(["day", "month", "year"]);
  });

  it("40 days, starts Mon, Jan 1st -> day, week, month", () => {
    expect(getGranularityOptionsFromRange({ from: "2018-01-01", to: "2018-02-09" })).toEqual(["day", "week", "month"]);
  });
  it("500 days, starts Mon, Jan 1st -> day, week, month, year", () => {
    expect(getGranularityOptionsFromRange({ from: "2018-01-01", to: "2019-05-16" })).toEqual([
      "day",
      "week",
      "month",
      "year",
    ]);
  });
});
