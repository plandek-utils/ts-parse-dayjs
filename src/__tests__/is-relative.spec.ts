import { describe, expect, it } from "vitest";

import type { Dayjs } from "dayjs";
import { withFreeze } from "timekeeper";
import { isTodayOrFuture, isTodayOrPast } from "../is-relative";
import { parseDayjsOrError } from "../parse";

describe("relative functions", () => {
  type Dates = {
    now: Dayjs;
    pastSecond: Dayjs;
    futureSecond: Dayjs;
    past: Dayjs;
    future: Dayjs;
  };

  function runFor(cb: (dates: Dates) => void) {
    const now = parseDayjsOrError("2022-04-03T10:10:10.000Z");
    const dates: Dates = {
      now,
      pastSecond: now.add(-1, "second"),
      futureSecond: now.add(1, "second"),
      past: now.add(-10, "day"),
      future: now.add(10, "day"),
    };
    withFreeze(dates.now.toDate(), () => cb(dates));
  }

  describe("isTodayOrFuture()", () => {
    it("returns true if provided with a dayjs for the current date", () => {
      runFor(({ now }) => {
        expect(isTodayOrFuture(now)).toEqual(true);
      });
    });

    it("returns true if provided with a dayjs which is in the future but still in today", () => {
      runFor(({ futureSecond }) => {
        expect(isTodayOrFuture(futureSecond)).toEqual(true);
      });
    });

    it("returns true if provided with a dayjs which is in the future (tomorrow or more)", () => {
      runFor(({ future }) => {
        expect(isTodayOrFuture(future)).toEqual(true);
      });
    });

    it("returns true if provided with a dayjs which is in the past but still today", () => {
      runFor(({ pastSecond }) => {
        expect(isTodayOrFuture(pastSecond)).toEqual(true);
      });
    });

    it("returns false if provided with a dayjs which is in the past", () => {
      runFor(({ past }) => {
        expect(isTodayOrFuture(past)).toEqual(false);
      });
    });
  });
  describe("isTodayOrPast()", () => {
    it("returns true if provided with a dayjs for the current date", () => {
      runFor(({ now }) => {
        expect(isTodayOrPast(now)).toEqual(true);
      });
    });

    it("returns true if provided with a dayjs which is in the future but still in today", () => {
      runFor(({ futureSecond }) => {
        expect(isTodayOrPast(futureSecond)).toEqual(true);
      });
    });

    it("returns true if provided with a dayjs which is in the future (tomorrow or more)", () => {
      runFor(({ future }) => {
        expect(isTodayOrPast(future)).toEqual(false);
      });
    });

    it("returns true if provided with a dayjs which is in the past but still today", () => {
      runFor(({ pastSecond }) => {
        expect(isTodayOrPast(pastSecond)).toEqual(true);
      });
    });

    it("returns false if provided with a dayjs which is in the past", () => {
      runFor(({ past }) => {
        expect(isTodayOrFuture(past)).toEqual(false);
      });
    });
  });
});
