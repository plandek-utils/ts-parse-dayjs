import { describe, expect, it } from "vitest";

import { dayjsNow, fromNow, fromNowStrict, toNow, toNowStrict } from "../mod";

describe("fromNow()", () => {
  describe("seconds", () => {
    it("returns 'a few seconds ago' for duration of 1 second", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "second");
      const res = fromNow(from);
      expect(res).toEqual("a few seconds ago");
    });

    it("returns 'a few seconds ago' for duration of 10 seconds", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "second");
      const res = fromNow(from);
      expect(res).toEqual("a few seconds ago");
    });

    it("returns '1 minute ago' for duration of 58 seconds", () => {
      const now = dayjsNow();
      const from = now.subtract(58, "second");
      const res = fromNow(from);
      expect(res).toEqual("1 minute ago");
    });
  });

  describe("minutes", () => {
    it("returns '1 minute ago' for duration of 1 minute", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "minute");
      const res = fromNow(from);
      expect(res).toEqual("1 minute ago");
    });

    it("returns '1 minute ago' for duration of 10 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = fromNow(from);
      expect(res).toEqual("10 minutes ago");
    });

    it("returns '1 hour ago' for duration of 58 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(58, "minute");
      const res = fromNow(from);
      expect(res).toEqual("1 hour ago");
    });
  });

  describe("fromNow() returns numbers for singular unit durations", () => {
    it("returns '1 minute ago' for duration of 1 minute", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "minute");
      const res = fromNow(from);
      expect(res).toEqual("1 minute ago");
    });

    it("returns '1 hour ago' for duration of 1 hour", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "hour");
      const res = fromNow(from);
      expect(res).toEqual("1 hour ago");
    });

    it("returns '1 day ago' for duration of 1 day", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "day");
      const res = fromNow(from);
      expect(res).toEqual("1 day ago");
    });

    it("returns '1 month ago' for duration of 1 month", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "month");
      const res = fromNow(from);
      expect(res).toEqual("1 month ago");
    });

    it("returns '1 year ago' for duration of 1 year", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "year");
      const res = fromNow(from);
      expect(res).toEqual("1 year ago");
    });
  });

  describe("fromNow() returns numbers for NON singular unit durations", () => {
    it("returns '10 minutes ago' for duration of 10 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = fromNow(from);
      expect(res).toEqual("10 minutes ago");
    });

    it("returns '10 hours ago' for duration of 10 hours", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "hour");
      const res = fromNow(from);
      expect(res).toEqual("10 hours ago");
    });

    it("returns '5 days ago' for duration of 5 days", () => {
      const now = dayjsNow();
      const from = now.subtract(5, "day");
      const res = fromNow(from);
      expect(res).toEqual("5 days ago");
    });

    it("returns '3 months ago' for duration of 3 months", () => {
      const now = dayjsNow();
      const from = now.subtract(3, "month");
      const res = fromNow(from);
      expect(res).toEqual("3 months ago");
    });

    it("returns '3 years ago' for duration of 3 years", () => {
      const now = dayjsNow();
      const from = now.subtract(3, "year");
      const res = fromNow(from);
      expect(res).toEqual("3 years ago");
    });
  });

  describe("rounding", () => {
    it("returns '1 minute ago' for duration of 1.2 minute", () => {
      const now = dayjsNow();
      const from = now.subtract(1.2, "minute");
      const res = fromNow(from);
      expect(res).toEqual("1 minute ago");
    });

    it("returns '2 minutes ago' for duration of 1.8 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(1.8, "minute");
      const res = fromNow(from);
      expect(res).toEqual("2 minutes ago");
    });
  });

  describe("fromNow() optionally adds the default suffix", () => {
    it("returns '10 minutes' for duration of 10 minutes and withoutSuffix = true", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = fromNow(from, true);
      expect(res).toEqual("10 minutes");
    });

    it("returns '10 minutes' for duration of 10 minutes and withoutSuffix = false", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = fromNow(from, true);
      expect(res).toEqual("10 minutes");
    });

    it("suffix is enabled by default", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = fromNow(from);
      expect(res).toEqual("10 minutes ago");
    });
  });
});

describe("fromNowStrict()", () => {
  describe("seconds", () => {
    it("returns 'a few seconds ago' for duration of 1 second", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "second");
      const res = fromNowStrict(from);
      expect(res).toEqual("a few seconds ago");
    });

    it("returns 'a few seconds ago' for duration of 10 seconds", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "second");
      const res = fromNowStrict(from);
      expect(res).toEqual("a few seconds ago");
    });

    it("returns 'a few seconds ago' for duration of 58 seconds", () => {
      const now = dayjsNow();
      const from = now.subtract(58, "second");
      const res = fromNowStrict(from);
      expect(res).toEqual("a few seconds ago");
    });
  });

  describe("minutes", () => {
    it("returns '1 minute ago' for duration of 1 minute", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "minute");
      const res = fromNowStrict(from);
      expect(res).toEqual("1 minute ago");
    });

    it("returns '1 minute ago' for duration of 10 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = fromNowStrict(from);
      expect(res).toEqual("10 minutes ago");
    });

    it("returns '58 minutes ago' for duration of 58 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(58, "minute");
      const res = fromNowStrict(from);
      expect(res).toEqual("58 minutes ago");
    });
  });

  describe("fromNowStrict() returns numbers for singular unit durations", () => {
    it("returns '1 minute ago' for duration of 1 minute", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "minute");
      const res = fromNowStrict(from);
      expect(res).toEqual("1 minute ago");
    });

    it("returns '1 hour ago' for duration of 1 hour", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "hour");
      const res = fromNowStrict(from);
      expect(res).toEqual("1 hour ago");
    });

    it("returns '1 day ago' for duration of 1 day", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "day");
      const res = fromNowStrict(from);
      expect(res).toEqual("1 day ago");
    });

    it("returns '1 month ago' for duration of 1 month", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "month");
      const res = fromNowStrict(from);
      expect(res).toEqual("1 month ago");
    });

    it("returns '1 year ago' for duration of 1 year", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "year");
      const res = fromNowStrict(from);
      expect(res).toEqual("1 year ago");
    });
  });

  describe("fromNowStrict() returns numbers for NON singular unit durations", () => {
    it("returns '10 minutes ago' for duration of 10 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = fromNowStrict(from);
      expect(res).toEqual("10 minutes ago");
    });

    it("returns '10 hours ago' for duration of 10 hours", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "hour");
      const res = fromNowStrict(from);
      expect(res).toEqual("10 hours ago");
    });

    it("returns '5 days ago' for duration of 5 days", () => {
      const now = dayjsNow();
      const from = now.subtract(5, "day");
      const res = fromNowStrict(from);
      expect(res).toEqual("5 days ago");
    });

    it("returns '3 months ago' for duration of 3 months", () => {
      const now = dayjsNow();
      const from = now.subtract(3, "month");
      const res = fromNowStrict(from);
      expect(res).toEqual("3 months ago");
    });

    it("returns '3 years ago' for duration of 3 years", () => {
      const now = dayjsNow();
      const from = now.subtract(3, "year");
      const res = fromNowStrict(from);
      expect(res).toEqual("3 years ago");
    });
  });

  describe("rounding", () => {
    it("returns '1 minute ago' for duration of 1.2 minute", () => {
      const now = dayjsNow();
      const from = now.subtract(1.2, "minute");
      const res = fromNowStrict(from);
      expect(res).toEqual("1 minute ago");
    });

    it("returns '1 minute ago' for duration of 1.8 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(1.8, "minute");
      const res = fromNowStrict(from);
      expect(res).toEqual("1 minute ago");
    });
  });

  describe("fromNowStrict() optionally adds the default suffix", () => {
    it("returns '10 minutes' for duration of 10 minutes and withoutSuffix = true", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = fromNowStrict(from, true);
      expect(res).toEqual("10 minutes");
    });

    it("returns '10 minutes' for duration of 10 minutes and withoutSuffix = false", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = fromNowStrict(from, true);
      expect(res).toEqual("10 minutes");
    });

    it("suffix is enabled by default", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = fromNowStrict(from);
      expect(res).toEqual("10 minutes ago");
    });
  });
});

describe("toNow()", () => {
  describe("seconds", () => {
    it("returns 'in a few seconds' for duration of 1 second", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "second");
      const res = toNow(from);
      expect(res).toEqual("in a few seconds");
    });

    it("returns 'in a few seconds' for duration of 10 seconds", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "second");
      const res = toNow(from);
      expect(res).toEqual("in a few seconds");
    });

    it("returns 'in 1 minute' for duration of 58 seconds", () => {
      const now = dayjsNow();
      const from = now.subtract(58, "second");
      const res = toNow(from);
      expect(res).toEqual("in 1 minute");
    });
  });

  describe("minutes", () => {
    it("returns 'in 1 minute' for duration of 1 minute", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "minute");
      const res = toNow(from);
      expect(res).toEqual("in 1 minute");
    });

    it("returns 'in 1 minute' for duration of 10 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = toNow(from);
      expect(res).toEqual("in 10 minutes");
    });

    it("returns 'in 1 hour' for duration of 58 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(58, "minute");
      const res = toNow(from);
      expect(res).toEqual("in 1 hour");
    });
  });

  describe("toNow() returns numbers for singular unit durations", () => {
    it("returns 'in 1 minute' for duration of 1 minute", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "minute");
      const res = toNow(from);
      expect(res).toEqual("in 1 minute");
    });

    it("returns 'in 1 hour' for duration of 1 hour", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "hour");
      const res = toNow(from);
      expect(res).toEqual("in 1 hour");
    });

    it("returns 'in 1 day' for duration of 1 day", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "day");
      const res = toNow(from);
      expect(res).toEqual("in 1 day");
    });

    it("returns 'in 1 month' for duration of 1 month", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "month");
      const res = toNow(from);
      expect(res).toEqual("in 1 month");
    });

    it("returns 'in 1 year' for duration of 1 year", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "year");
      const res = toNow(from);
      expect(res).toEqual("in 1 year");
    });
  });

  describe("toNow() returns numbers for NON singular unit durations", () => {
    it("returns 'in 10 minutes' for duration of 10 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = toNow(from);
      expect(res).toEqual("in 10 minutes");
    });

    it("returns 'in 10 hours' for duration of 10 hours", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "hour");
      const res = toNow(from);
      expect(res).toEqual("in 10 hours");
    });

    it("returns 'in 5 days' for duration of 5 days", () => {
      const now = dayjsNow();
      const from = now.subtract(5, "day");
      const res = toNow(from);
      expect(res).toEqual("in 5 days");
    });

    it("returns 'in 3 months' for duration of 3 months", () => {
      const now = dayjsNow();
      const from = now.subtract(3, "month");
      const res = toNow(from);
      expect(res).toEqual("in 3 months");
    });

    it("returns 'in 3 years' for duration of 3 years", () => {
      const now = dayjsNow();
      const from = now.subtract(3, "year");
      const res = toNow(from);
      expect(res).toEqual("in 3 years");
    });
  });

  describe("rounding", () => {
    it("returns 'in 1 minute' for duration of 1.2 minute", () => {
      const now = dayjsNow();
      const from = now.subtract(1.2, "minute");
      const res = toNow(from);
      expect(res).toEqual("in 1 minute");
    });

    it("returns 'in 2 minutes' for duration of 1.8 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(1.8, "minute");
      const res = toNow(from);
      expect(res).toEqual("in 2 minutes");
    });
  });

  describe("toNow() optionally adds the default prefix", () => {
    it("returns 'in 10 minutes' for duration of 10 minutes and withoutSuffix = true", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = toNow(from, true);
      expect(res).toEqual("10 minutes");
    });

    it("returns 'in 10 minutes' for duration of 10 minutes and withoutSuffix = false", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = toNow(from, false);
      expect(res).toEqual("in 10 minutes");
    });

    it("suffix is enabled by default", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = toNow(from);
      expect(res).toEqual("in 10 minutes");
    });
  });
});

describe("toNowStrict()", () => {
  describe("seconds", () => {
    it("returns 'in a few seconds' for duration of 1 second", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "second");
      const res = toNowStrict(from);
      expect(res).toEqual("in a few seconds");
    });

    it("returns 'in a few seconds' for duration of 10 seconds", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "second");
      const res = toNowStrict(from);
      expect(res).toEqual("in a few seconds");
    });

    it("returns 'in a few seconds' for duration of 58 seconds", () => {
      const now = dayjsNow();
      const from = now.subtract(58, "second");
      const res = toNowStrict(from);
      expect(res).toEqual("in a few seconds");
    });
  });

  describe("minutes", () => {
    it("returns 'in 1 minute' for duration of 1 minute", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "minute");
      const res = toNowStrict(from);
      expect(res).toEqual("in 1 minute");
    });

    it("returns 'in 1 minute' for duration of 10 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = toNowStrict(from);
      expect(res).toEqual("in 10 minutes");
    });

    it("returns 'in 58 minutes' for duration of 58 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(58, "minute");
      const res = toNowStrict(from);
      expect(res).toEqual("in 58 minutes");
    });
  });

  describe("toNowStrict() returns numbers for singular unit durations", () => {
    it("returns 'in 1 minute' for duration of 1 minute", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "minute");
      const res = toNowStrict(from);
      expect(res).toEqual("in 1 minute");
    });

    it("returns 'in 1 hour' for duration of 1 hour", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "hour");
      const res = toNowStrict(from);
      expect(res).toEqual("in 1 hour");
    });

    it("returns 'in 1 day' for duration of 1 day", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "day");
      const res = toNowStrict(from);
      expect(res).toEqual("in 1 day");
    });

    it("returns 'in 1 month' for duration of 1 month", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "month");
      const res = toNowStrict(from);
      expect(res).toEqual("in 1 month");
    });

    it("returns 'in 1 year' for duration of 1 year", () => {
      const now = dayjsNow();
      const from = now.subtract(1, "year");
      const res = toNowStrict(from);
      expect(res).toEqual("in 1 year");
    });
  });

  describe("toNowStrict() returns numbers for NON singular unit durations", () => {
    it("returns 'in 10 minutes' for duration of 10 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = toNowStrict(from);
      expect(res).toEqual("in 10 minutes");
    });

    it("returns 'in 10 hours' for duration of 10 hours", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "hour");
      const res = toNowStrict(from);
      expect(res).toEqual("in 10 hours");
    });

    it("returns 'in 5 days' for duration of 5 days", () => {
      const now = dayjsNow();
      const from = now.subtract(5, "day");
      const res = toNowStrict(from);
      expect(res).toEqual("in 5 days");
    });

    it("returns 'in 3 months' for duration of 3 months", () => {
      const now = dayjsNow();
      const from = now.subtract(3, "month");
      const res = toNowStrict(from);
      expect(res).toEqual("in 3 months");
    });

    it("returns 'in 3 years' for duration of 3 years", () => {
      const now = dayjsNow();
      const from = now.subtract(3, "year");
      const res = toNowStrict(from);
      expect(res).toEqual("in 3 years");
    });
  });

  describe("rounding", () => {
    it("returns 'in 1 minute' for duration of 1.2 minute", () => {
      const now = dayjsNow();
      const from = now.subtract(1.2, "minute");
      const res = toNowStrict(from);
      expect(res).toEqual("in 1 minute");
    });

    it("returns 'in 1 minute' for duration of 1.8 minutes", () => {
      const now = dayjsNow();
      const from = now.subtract(1.8, "minute");
      const res = toNowStrict(from);
      expect(res).toEqual("in 1 minute");
    });
  });

  describe("toNowStrict() optionally adds the default prefix", () => {
    it("returns '10 minutes' for duration of 10 minutes and withoutSuffix = true", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = toNowStrict(from, true);
      expect(res).toEqual("10 minutes");
    });

    it("returns 'in 10 minutes' for duration of 10 minutes and withoutSuffix = false", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = toNowStrict(from, false);
      expect(res).toEqual("in 10 minutes");
    });

    it("suffix is enabled by default", () => {
      const now = dayjsNow();
      const from = now.subtract(10, "minute");
      const res = toNowStrict(from);
      expect(res).toEqual("in 10 minutes");
    });
  });
});
