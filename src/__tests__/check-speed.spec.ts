import { describe, expect, it } from "vitest";
import {
  type ISODate,
  type ISODateString,
  isISODate,
  isISODateString,
  isoDateSchema,
  isoDateStringSchema,
  tYearSchema,
} from "..";

describe("check speed DateString", () => {
  function withZod(x: unknown): ISODateString {
    const res = isoDateStringSchema.safeParse(x);
    if (res.success) {
      return res.data;
    }

    throw new Error(`invalid ISODateStringSchema: ${JSON.stringify(res)}`);
  }

  function withRegex(x: unknown): ISODateString {
    if (isISODateString(x)) {
      return x;
    }
    throw new Error(`invalid ISODateStringSchema: ${JSON.stringify(x)}`);
  }

  const valid1: ISODateString = "2003-03-01T00:00:00.000Z";
  const valid2: ISODateString = "2003-03-01T21:34:21.931Z";
  const valid3: ISODateString = "98003-03-01T21:34:21.931Z";
  const valid4: ISODateString = "13-03-01T21:34:21.931Z";
  const valid5: ISODateString = "-983-03-01T21:34:21.931Z";

  it("tYearSchema", () => {
    expect(tYearSchema.safeParse("1314").success).toBeTruthy();
    expect(tYearSchema.safeParse("333313").success).toBeTruthy();
    expect(tYearSchema.safeParse("-313").success).toBeTruthy();
  });
  it("isoDateSchema", () => {
    expect(isoDateSchema.safeParse("1314-03-01").success).toBeTruthy();
    expect(isoDateSchema.safeParse("333313-03-01").success).toBeTruthy();
    expect(isoDateSchema.safeParse("-313-03-01").success).toBeTruthy();
  });

  describe("should work with both withRegex and withZod", () => {
    it("valid1", () => {
      expect(withZod(valid1)).toEqual(valid1);
      expect(withRegex(valid1)).toEqual(valid1);
    });
    it("valid2", () => {
      expect(withZod(valid2)).toEqual(valid2);
      expect(withRegex(valid2)).toEqual(valid2);
    });
    it("valid3", () => {
      expect(withZod(valid3)).toEqual(valid3);
      expect(withRegex(valid3)).toEqual(valid3);
    });
    it("valid4", () => {
      expect(withZod(valid4)).toEqual(valid4);
      expect(withRegex(valid4)).toEqual(valid4);
    });
    it("valid5", () => {
      expect(withZod(valid5)).toEqual(valid5);
      expect(withRegex(valid5)).toEqual(valid5);
    });
  });

  describe("BENCHMARK", () => {
    it("withZod", () => {
      console.time("withZod");
      for (let i = 0; i < 1000; i++) {
        withZod(valid1);
        withZod(valid2);
        withZod(valid3);
        withZod(valid4);
        withZod(valid5);
      }
      console.timeEnd("withZod");
    });

    it("withRegex", () => {
      console.time("withRegex");
      for (let i = 0; i < 1000; i++) {
        withRegex(valid1);
        withRegex(valid2);
        withRegex(valid3);
        withRegex(valid4);
        withRegex(valid5);
      }
      console.timeEnd("withRegex");
    });
  });
});

describe("check speed Date", () => {
  function withZod(x: unknown): ISODate {
    const res = isoDateSchema.safeParse(x);
    if (res.success) {
      return res.data;
    }

    throw new Error(`invalid ISODateSchema: ${JSON.stringify(res)}`);
  }

  function withRegex(x: unknown): ISODate {
    if (isISODate(x)) {
      return x;
    }
    throw new Error(`invalid ISODateSchema: ${JSON.stringify(x)}`);
  }

  const valid1: ISODate = "2003-03-01";
  const valid2: ISODate = "2003-03-01";
  const valid3: ISODate = "98003-03-01";
  const valid4: ISODate = "13-03-01";
  const valid5: ISODate = "-983-03-01";

  it("tYearSchema", () => {
    expect(tYearSchema.safeParse("1314").success).toBeTruthy();
    expect(tYearSchema.safeParse("333313").success).toBeTruthy();
    expect(tYearSchema.safeParse("-313").success).toBeTruthy();
  });
  it("isoDateSchema", () => {
    expect(isoDateSchema.safeParse("1314-03-01").success).toBeTruthy();
    expect(isoDateSchema.safeParse("333313-03-01").success).toBeTruthy();
    expect(isoDateSchema.safeParse("-313-03-01").success).toBeTruthy();
  });

  describe("should work with both withRegex and withZod", () => {
    it("valid1", () => {
      expect(withZod(valid1)).toEqual(valid1);
      expect(withRegex(valid1)).toEqual(valid1);
    });
    it("valid2", () => {
      expect(withZod(valid2)).toEqual(valid2);
      expect(withRegex(valid2)).toEqual(valid2);
    });
    it("valid3", () => {
      expect(withZod(valid3)).toEqual(valid3);
      expect(withRegex(valid3)).toEqual(valid3);
    });
    it("valid4", () => {
      expect(withZod(valid4)).toEqual(valid4);
      expect(withRegex(valid4)).toEqual(valid4);
    });
    it("valid5", () => {
      expect(withZod(valid5)).toEqual(valid5);
      expect(withRegex(valid5)).toEqual(valid5);
    });
  });

  describe("BENCHMARK", () => {
    it("withZod", () => {
      console.time("withZod");
      for (let i = 0; i < 1000; i++) {
        withZod(valid1);
        withZod(valid2);
        withZod(valid3);
        withZod(valid4);
        withZod(valid5);
      }
      console.timeEnd("withZod");
    });

    it("withRegex", () => {
      console.time("withRegex");
      for (let i = 0; i < 1000; i++) {
        withRegex(valid1);
        withRegex(valid2);
        withRegex(valid3);
        withRegex(valid4);
        withRegex(valid5);
      }
      console.timeEnd("withRegex");
    });
  });
});
