import { describe, expect, it } from "vitest";

import {
  calculateDateRangeDescription,
  dayjsNow,
  parseDayjsEndOfDay,
  parseDayjsOrError,
  parseDayjsStartOfDay,
} from "..";

describe("calculateDateRangeDescription()", () => {
  const from = "2017-08-05";
  const to = "2019-08-15";
  const dayjsFrom = parseDayjsOrError(parseDayjsStartOfDay(from));
  const dayjsTo = parseDayjsOrError(parseDayjsEndOfDay(to));
  const now = dayjsNow();

  it("returns null if any date is wrong", () => {
    expect(calculateDateRangeDescription({ from: null, to: dayjsTo })).toEqual(null);
    expect(calculateDateRangeDescription({ from: "nope", to: dayjsTo })).toEqual(null);
    expect(calculateDateRangeDescription({ from: dayjsFrom, to: null })).toEqual(null);
    expect(calculateDateRangeDescription({ from: dayjsFrom, to: "nope" })).toEqual(null);
    expect(calculateDateRangeDescription({ from: dayjsFrom, to: dayjsTo, now: "nope" })).toEqual(null);
  });
  it("returns null if the from date is after the to date", () => {
    expect(calculateDateRangeDescription({ from: dayjsTo, to: dayjsFrom })).toEqual(null);
  });

  it("returns a formatted from date if the to date is not isTodayOrFuture and the from and to date are of the same day", () => {
    expect(calculateDateRangeDescription({ from: dayjsFrom, to: dayjsFrom })).toEqual("5th Aug 2017");
  });

  it("returns a formated and printed range if the to date is not isTodayOrFuture and the from and to date are not of the same day", () => {
    expect(calculateDateRangeDescription({ from: dayjsFrom, to: dayjsTo })).toEqual("5th Aug 2017 - 15th Aug 2019");
  });

  it("returns 'today' if granularity = 'day' and toDate isTodayOrFuture and the from date is the same day as the nowDate", () => {
    expect(calculateDateRangeDescription({ from: dayjsFrom, to: now, granularity: "day", now: dayjsFrom })).toEqual(
      "Today",
    );
  });

  it("returns 'this week' if granularity = 'week' and toDate isTodayOrFuture and the from date is the same day as the nowDate", () => {
    expect(calculateDateRangeDescription({ from: dayjsFrom, to: now, granularity: "week", now: dayjsFrom })).toEqual(
      "This week",
    );
  });

  it("returns 'this month' if granularity = 'month' and toDate isTodayOrFuture and the from date is the same day as the nowDate", () => {
    expect(calculateDateRangeDescription({ from: dayjsFrom, to: now, granularity: "month", now: dayjsFrom })).toEqual(
      "This month",
    );
  });

  it("returns `Since 12th Aug 2019` if toDate isTodayOrFuture and the from date is the same week as the nowDate and the from date is not the same day as the nowDate", () => {
    // "2019-08-12T23:59:59Z" Monday 12th Aug
    // "2019-08-15T23:59:59Z" Thursday 15th Aug
    const from = "2019-08-12";
    const fakeCurrent = "2019-08-15";
    const dayjsFrom = parseDayjsOrError(parseDayjsStartOfDay(from));
    const dayjsFakeCurrent = parseDayjsOrError(parseDayjsEndOfDay(fakeCurrent));

    expect(calculateDateRangeDescription({ from: dayjsFrom, to: now, now: dayjsFakeCurrent })).toEqual(
      "Since 12th Aug 2019",
    );
  });

  it("returns 'Today' if granularity = 'day' and toDate is the same date as the nowDate and the from date", () => {
    // "2019-08-12T23:59:59Z" Monday 12th Aug
    // "2019-08-15T23:59:59Z" Monday 12th Aug
    const from = "2019-08-12";
    const fakeCurrent = "2019-08-12";
    const dayjsFrom = parseDayjsOrError(parseDayjsStartOfDay(from));
    const dayjsFakeCurrent = parseDayjsOrError(parseDayjsEndOfDay(fakeCurrent));

    expect(
      calculateDateRangeDescription({ from: dayjsFrom, to: now, granularity: "day", now: dayjsFakeCurrent }),
    ).toEqual("Today");
  });

  it("returns 'This week' if granularity = 'week' and toDate is the same date as the nowDate and the from date", () => {
    // "2019-08-12T23:59:59Z" Monday 12th Aug
    // "2019-08-15T23:59:59Z" Monday 12th Aug
    const from = "2019-08-12";
    const fakeCurrent = "2019-08-12";
    const dayjsFrom = parseDayjsOrError(parseDayjsStartOfDay(from));
    const dayjsFakeCurrent = parseDayjsOrError(parseDayjsEndOfDay(fakeCurrent));

    expect(
      calculateDateRangeDescription({ from: dayjsFrom, to: now, granularity: "week", now: dayjsFakeCurrent }),
    ).toEqual("This week");
  });

  it("returns 'This week' if toDate isTodayOrFuture and the from date is the same week as the nowDate and the from date is not the same day as the nowDate", () => {
    // "2019-08-12T23:59:59Z" Monday 12th Aug
    // "2019-08-15T23:59:59Z" Sunday 18th Aug
    const from = "2019-08-12";
    const fakeCurrent = "2019-08-18";
    const dayjsFrom = parseDayjsOrError(parseDayjsStartOfDay(from));
    const dayjsFakeCurrent = parseDayjsOrError(parseDayjsEndOfDay(fakeCurrent));

    expect(
      calculateDateRangeDescription({ from: dayjsFrom, to: now, granularity: "week", now: dayjsFakeCurrent }),
    ).toEqual("This week");
  });

  it("returns 'This month' if granularity = 'month' and toDate is the same date as the nowDate and the from date", () => {
    // "2019-08-12T23:59:59Z" Monday 12th Aug
    // "2019-08-15T23:59:59Z" Monday 12th Aug
    const from = "2019-08-12";
    const fakeCurrent = "2019-08-12";
    const dayjsFrom = parseDayjsOrError(parseDayjsStartOfDay(from));
    const dayjsFakeCurrent = parseDayjsOrError(parseDayjsEndOfDay(fakeCurrent));

    expect(
      calculateDateRangeDescription({ from: dayjsFrom, to: now, granularity: "month", now: dayjsFakeCurrent }),
    ).toEqual("This month");
  });

  it("returns 'this month' if granularity = 'Month' and toDate isTodayOrFuture and the from date is the same month as the nowDate and the from date is not the same week or day as the nowDate", () => {
    // "2019-08-01T23:59:59Z" Thursday 01st Aug
    // "2019-08-15T23:59:59Z" Thursday 15th Aug
    const from = "2019-08-01";
    const fakeCurrent = "2019-08-15";
    const dayjsFrom = parseDayjsOrError(parseDayjsStartOfDay(from));
    const dayjsFakeCurrent = parseDayjsOrError(parseDayjsEndOfDay(fakeCurrent));

    expect(
      calculateDateRangeDescription({ from: dayjsFrom, to: now, granularity: "month", now: dayjsFakeCurrent }),
    ).toEqual("This month");
  });

  it("returns 'This year' if granularity = 'year' and toDate is the same date as the nowDate and the from date", () => {
    // "2019-08-12T23:59:59Z" Monday 12th Aug
    // "2019-08-15T23:59:59Z" Monday 12th Aug
    const from = "2019-08-12";
    const fakeCurrent = "2019-08-12";
    const dayjsFrom = parseDayjsOrError(parseDayjsStartOfDay(from));
    const dayjsFakeCurrent = parseDayjsOrError(parseDayjsEndOfDay(fakeCurrent));

    expect(
      calculateDateRangeDescription({ from: dayjsFrom, to: now, granularity: "year", now: dayjsFakeCurrent }),
    ).toEqual("This year");
  });

  it("returns 'this year' if granularity = 'Year' and toDate isTodayOrFuture and the from date is the same year as the nowDate and the from date is not the same month, week or day as the nowDate", () => {
    // "2019-08-01T23:59:59Z" Thursday 01st Aug
    // "2019-03-01T23:59:59Z" Friday 01th Mar
    const from = "2019-08-01";
    const fakeCurrent = "2019-03-01";
    const dayjsFrom = parseDayjsOrError(parseDayjsStartOfDay(from));
    const dayjsFakeCurrent = parseDayjsOrError(parseDayjsEndOfDay(fakeCurrent));

    expect(
      calculateDateRangeDescription({ from: dayjsFrom, to: now, granularity: "year", now: dayjsFakeCurrent }),
    ).toEqual("This year");
  });

  it("returns a formatted from date prefixed with 'Since ' if toDate isTodayOrFuture and the from date is not the same day, week, month or year as the nowDate", () => {
    // "2018-03-01T23:59:59Z" Friday 01th Mar
    // "2019-08-01T23:59:59Z" Thursday 01st Aug
    const from = "2018-03-01";
    const fakeCurrent = "2019-08-01";
    const dayjsFrom = parseDayjsOrError(parseDayjsStartOfDay(from));
    const dayjsFakeCurrent = parseDayjsOrError(parseDayjsEndOfDay(fakeCurrent));

    expect(
      calculateDateRangeDescription({ from: dayjsFrom, to: now, granularity: "day", now: dayjsFakeCurrent }),
    ).toEqual("Since 1st Mar 2018");
  });
});
