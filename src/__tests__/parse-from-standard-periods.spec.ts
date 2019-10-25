import { Dayjs } from "dayjs";
import timekeeper from "timekeeper";
import { parseDayjsOrError, parseFromStandardPeriods } from "..";

function frozenTime(time: Dayjs, fn: () => void): void {
  timekeeper.freeze(time.toDate());
  fn();
  timekeeper.reset();
}

describe("parseFromStandardPeriods()", () => {
  const origin = parseDayjsOrError("2019-10-22T12:34:56.123Z");
  const to = origin.endOf("day");
  describe("waa => null", () => {
    it("with origin", () => {
      expect(parseFromStandardPeriods("waa", origin)).toBeNull();
    });

    it("without origin (uses now)", () => {
      frozenTime(origin, () => {
        expect(parseFromStandardPeriods("waa")).toBeNull();
      });
    });
  });

  describe("0d => { form: origin (Start of day), to: origin (EOD) }", () => {
    const from = parseDayjsOrError("2019-10-22T00:00:00.000Z");
    const expected = { from, to };

    it("with origin", () => {
      expect(parseFromStandardPeriods("0d", origin)).toEqual(expected);
    });

    it("without origin (uses now)", () => {
      frozenTime(origin, () => {
        expect(parseFromStandardPeriods("0d")).toEqual(expected);
      });
    });
  });

  describe("0w => { form: origin (Start of week), to: origin (EOD) }", () => {
    const from = parseDayjsOrError("2019-10-21T00:00:00.000Z");
    const expected = { from, to };

    it("with origin", () => {
      expect(parseFromStandardPeriods("0w", origin)).toEqual(expected);
    });

    it("without origin (uses now)", () => {
      frozenTime(origin, () => {
        expect(parseFromStandardPeriods("0w")).toEqual(expected);
      });
    });
  });

  describe("0m => { form: origin (Start of month), to: origin (EOD) }", () => {
    const from = parseDayjsOrError("2019-10-01T00:00:00.000Z");
    const expected = { from, to };

    it("with origin", () => {
      expect(parseFromStandardPeriods("0m", origin)).toEqual(expected);
    });

    it("without origin (uses now)", () => {
      frozenTime(origin, () => {
        expect(parseFromStandardPeriods("0m")).toEqual(expected);
      });
    });
  });

  describe("0y => { form: origin (Start of year), to: origin (EOD) }", () => {
    const from = parseDayjsOrError("2019-01-01T00:00:00.000Z");
    const expected = { from, to };

    it("with origin", () => {
      expect(parseFromStandardPeriods("0y", origin)).toEqual(expected);
    });

    it("without origin (uses now)", () => {
      frozenTime(origin, () => {
        expect(parseFromStandardPeriods("0y")).toEqual(expected);
      });
    });
  });

  describe("1d => { form: origin - 10 days (Start of day), to: origin (EOD) }", () => {
    const from = parseDayjsOrError("2019-10-12T00:00:00.000Z");
    const expected = { from, to };

    it("with origin", () => {
      expect(parseFromStandardPeriods("10d", origin)).toEqual(expected);
    });

    it("without origin (uses now)", () => {
      frozenTime(origin, () => {
        expect(parseFromStandardPeriods("10d")).toEqual(expected);
      });
    });
  });

  describe("10d => { form: origin - 10 days (Start of day), to: origin (EOD) }", () => {
    const from = parseDayjsOrError("2019-10-12T00:00:00.000Z");
    const expected = { from, to };

    it("with origin", () => {
      expect(parseFromStandardPeriods("10d", origin)).toEqual(expected);
    });

    it("without origin (uses now)", () => {
      frozenTime(origin, () => {
        expect(parseFromStandardPeriods("10d")).toEqual(expected);
      });
    });
  });

  describe("2w => { form: origin - 2 full weeks (Start of week), to: origin (EOD) }", () => {
    const from = parseDayjsOrError("2019-10-07T00:00:00.000Z");
    const expected = { from, to };

    it("with origin", () => {
      expect(parseFromStandardPeriods("2w", origin)).toEqual(expected);
    });

    it("without origin (uses now)", () => {
      frozenTime(origin, () => {
        expect(parseFromStandardPeriods("2w")).toEqual(expected);
      });
    });
  });

  describe("2m => { form: origin - 2 full months (Start of month), to: origin (EOD) }", () => {
    const from = parseDayjsOrError("2019-08-01T00:00:00.000Z");
    const expected = { from, to };

    it("with origin", () => {
      expect(parseFromStandardPeriods("2m", origin)).toEqual(expected);
    });

    it("without origin (uses now)", () => {
      frozenTime(origin, () => {
        expect(parseFromStandardPeriods("2m")).toEqual(expected);
      });
    });
  });

  describe("2y => { form: origin - 2 full years (Start of year), to: origin (EOD) }", () => {
    const from = parseDayjsOrError("2017-01-01T00:00:00.000Z");
    const expected = { from, to };

    it("with origin", () => {
      expect(parseFromStandardPeriods("2y", origin)).toEqual(expected);
    });

    it("without origin (uses now)", () => {
      frozenTime(origin, () => {
        expect(parseFromStandardPeriods("2y")).toEqual(expected);
      });
    });
  });
});
