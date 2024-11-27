import { describe, expect, it } from "vitest";

import {
  dayjsNow,
  isoDateSchema,
  isoDateStringSchema,
  isoTimeSchema,
  parseDayjsOrError,
  serializedDateSchema,
  serializedDateSchemaForParsing,
  serializedDateSchemaForSerialize,
  tDaySchema,
  tHoursSchema,
  tMillisecondsSchema,
  tMinutesSchema,
  tMonthSchema,
  tSecondsSchema,
  tYearSchema,
} from "..";

describe("Schemas", () => {
  describe("tYear", () => {
    function isValid(s: unknown): boolean {
      return tYearSchema.safeParse(s).success;
    }

    it("should allow 4-digit numbers", () => {
      expect(isValid("2021")).toBe(true);
    });
    it("should allow other-digit numbers", () => {
      expect(isValid("202")).toBe(true);
      expect(isValid("20212")).toBe(true);
      expect(isValid("21")).toBe(true);
      expect(isValid("1")).toBe(true);
      expect(isValid("0")).toBe(true);
    });
    it("should allow negative numbers", () => {
      expect(isValid("-2021")).toBe(true);
      expect(isValid("-121")).toBe(true);
      expect(isValid("-2")).toBe(true);
      expect(isValid("-1")).toBe(true);
    });
    it("should disallow any other character than a number", () => {
      expect(isValid("202x")).toBe(false);
      expect(isValid("20-21")).toBe(false);
      expect(isValid("2021 ")).toBe(false);
      expect(isValid(" 2021")).toBe(false);
      expect(isValid(" 2021 ")).toBe(false);
    });
    it("should disallow any non string", () => {
      expect(isValid(202)).toBe(false);
    });
  });

  describe("tMonth", () => {
    function isValid(s: unknown): boolean {
      return tMonthSchema.safeParse(s).success;
    }

    it("should allow 2-digit numbers (from 01 to 12)", () => {
      expect(isValid("01")).toBe(true);
      expect(isValid("12")).toBe(true);
    });
    it("should disallow other-digit numbers", () => {
      expect(isValid("1")).toBe(false);
      expect(isValid("111")).toBe(false);
      expect(isValid("13")).toBe(false);
      expect(isValid("00")).toBe(false);
    });
    it("should disallow any other character than a number", () => {
      expect(isValid("0x")).toBe(false);
      expect(isValid("0-1")).toBe(false);
      expect(isValid("01 ")).toBe(false);
      expect(isValid(" 01")).toBe(false);
      expect(isValid(" 01 ")).toBe(false);
    });
    it("should disallow any non string", () => {
      expect(isValid(1)).toBe(false);
    });
  });

  describe("tDay", () => {
    it("works with days from 01 to 31", () => {
      expect(tDaySchema.safeParse("01").success).toBe(true);
      expect(tDaySchema.safeParse("31").success).toBe(true);
    });
    it("does not work with any other 2 digit day", () => {
      expect(tDaySchema.safeParse("00").success).toBe(false);
      expect(tDaySchema.safeParse("32").success).toBe(false);
      expect(tDaySchema.safeParse("99").success).toBe(false);
    });
    it("does not work with other digits", () => {
      expect(tDaySchema.safeParse("1").success).toBe(false);
      expect(tDaySchema.safeParse("111").success).toBe(false);
      expect(tDaySchema.safeParse("-1").success).toBe(false);
    });
    it("does not work with non-strings", () => {
      expect(tDaySchema.safeParse(1).success).toBe(false);
    });
  });

  describe("tHours", () => {
    it("works with hours from 00 to 23", () => {
      expect(tHoursSchema.safeParse("00").success).toBe(true);
      expect(tHoursSchema.safeParse("23").success).toBe(true);
    });
    it("does not work with any other 2 digit hour", () => {
      expect(tHoursSchema.safeParse("24").success).toBe(false);
      expect(tHoursSchema.safeParse("99").success).toBe(false);
    });
    it("does not work with other digits", () => {
      expect(tHoursSchema.safeParse("1").success).toBe(false);
      expect(tHoursSchema.safeParse("111").success).toBe(false);
      expect(tHoursSchema.safeParse("-1").success).toBe(false);
    });
    it("does not work with non-strings", () => {
      expect(tHoursSchema.safeParse(1).success).toBe(false);
    });
  });

  describe("tMinutes", () => {
    it("works with minutes from 00 to 59", () => {
      expect(tMinutesSchema.safeParse("00").success).toBe(true);
      expect(tMinutesSchema.safeParse("59").success).toBe(true);
    });
    it("does not work with any other 2 digit minute", () => {
      expect(tMinutesSchema.safeParse("60").success).toBe(false);
      expect(tMinutesSchema.safeParse("99").success).toBe(false);
    });
    it("does not work with other digits", () => {
      expect(tMinutesSchema.safeParse("1").success).toBe(false);
      expect(tMinutesSchema.safeParse("111").success).toBe(false);
      expect(tMinutesSchema.safeParse("-1").success).toBe(false);
    });
    it("does not work with non-strings", () => {
      expect(tMinutesSchema.safeParse(1).success).toBe(false);
    });
  });

  describe("tSeconds", () => {
    it("works with minutes from 00 to 59", () => {
      expect(tSecondsSchema.safeParse("00").success).toBe(true);
      expect(tSecondsSchema.safeParse("59").success).toBe(true);
    });
    it("does not work with any other 2 digit minute", () => {
      expect(tSecondsSchema.safeParse("60").success).toBe(false);
      expect(tSecondsSchema.safeParse("99").success).toBe(false);
    });
    it("does not work with other digits", () => {
      expect(tSecondsSchema.safeParse("1").success).toBe(false);
      expect(tSecondsSchema.safeParse("111").success).toBe(false);
      expect(tSecondsSchema.safeParse("-1").success).toBe(false);
    });
    it("does not work with non-strings", () => {
      expect(tSecondsSchema.safeParse(1).success).toBe(false);
    });
  });

  describe("tMilliseconds", () => {
    it("works with minutes from 000 to 999", () => {
      expect(tMillisecondsSchema.safeParse("000").success).toBe(true);
      expect(tMillisecondsSchema.safeParse("134").success).toBe(true);
      expect(tMillisecondsSchema.safeParse("999").success).toBe(true);
    });
    it("does not work with other digits", () => {
      expect(tMillisecondsSchema.safeParse("1").success).toBe(false);
      expect(tMillisecondsSchema.safeParse("11").success).toBe(false);
      expect(tMillisecondsSchema.safeParse("1111").success).toBe(false);
      expect(tMillisecondsSchema.safeParse("-1").success).toBe(false);
    });
    it("does not work with non-strings", () => {
      expect(tMillisecondsSchema.safeParse(1).success).toBe(false);
    });
  });

  describe("isoDateSchema", () => {
    it("works with a valid date", () => {
      expect(isoDateSchema.safeParse("2021-10-12").success).toBe(true);
      expect(isoDateSchema.safeParse("2021-01-31").success).toBe(true);
      expect(isoDateSchema.safeParse("2021-02-28").success).toBe(true);
    });
    it("works with invalid dates but that have the same format", () => {
      expect(isoDateSchema.safeParse("2021-11-31").success).toBe(true);
      expect(isoDateSchema.safeParse("2021-02-31").success).toBe(true);
    });
    it("fails with wrong format", () => {
      expect(isoDateSchema.safeParse("x-13-31").success).toBe(false);
      expect(isoDateSchema.safeParse("2021-13-31").success).toBe(false);
      expect(isoDateSchema.safeParse("2021-01-32").success).toBe(false);
    });
    it("fails with non-string", () => {
      expect(isoDateSchema.safeParse(new Date()).success).toBe(false);
    });
  });

  describe("isoTimeSchema", () => {
    it("works with valid time", () => {
      expect(isoTimeSchema.safeParse("12:34:56.789").success).toBe(true);
      expect(isoTimeSchema.safeParse("00:00:00.000").success).toBe(true);
      expect(isoTimeSchema.safeParse("23:59:59.999").success).toBe(true);
    });

    it("fails with wrong format", () => {
      expect(isoTimeSchema.safeParse("-11:59:59.999").success).toBe(false);
      expect(isoTimeSchema.safeParse("31:59:59.999").success).toBe(false);
      expect(isoTimeSchema.safeParse("13:61:59.999").success).toBe(false);
      expect(isoTimeSchema.safeParse("13:49:59").success).toBe(false);
      expect(isoTimeSchema.safeParse("13:49").success).toBe(false);
      expect(isoTimeSchema.safeParse("13").success).toBe(false);
    });
    it("fails with non-string", () => {
      expect(isoTimeSchema.safeParse(new Date()).success).toBe(false);
    });
  });

  describe("isoDateStringSchema", () => {
    it("works with valid format", () => {
      expect(isoDateStringSchema.safeParse("2021-10-12T00:00:00.000Z").success).toBe(true);
      expect(isoDateStringSchema.safeParse("2021-10-12T13:31:41.123Z").success).toBe(true);
    });
    it("fails without T", () => {
      expect(isoDateStringSchema.safeParse("2021-10-12 00:00:00.000Z").success).toBe(false);
    });
    it("fails without Z", () => {
      expect(isoDateStringSchema.safeParse("2021-10-12T00:00:00.000").success).toBe(false);
    });
    it("fails with non-string", () => {
      expect(isoDateStringSchema.safeParse(new Date()).success).toBe(false);
    });
  });

  describe("serializedDateSchema", () => {
    it("works with any valid string for serialized date", () => {
      expect(serializedDateSchema.safeParse("2021-10-12T00:00:00.000Z").success).toBe(true);
      expect(serializedDateSchema.safeParse("2021-10-12T13:31:41.123Z").success).toBe(true);
      expect(serializedDateSchema.safeParse("2021-10-12").success).toBe(true);
    });
    it("fails with invalid string for serialized date", () => {
      expect(serializedDateSchema.safeParse("whatever").success).toBe(false);
    });
    it("fails with non-strings", () => {
      expect(serializedDateSchema.safeParse(new Date()).success).toBe(false);
    });
  });

  describe("serializedDateSchemaForParsing and serializedDateSchemaForSerialize", () => {
    it("works with any valid string for serialized date", () => {
      expect(serializedDateSchemaForParsing.safeParse("2021-10-12T00:00:00.000Z").success).toBe(true);
      expect(serializedDateSchemaForSerialize.safeParse("2021-10-12T00:00:00.000Z").success).toBe(true);
      expect(serializedDateSchemaForParsing.safeParse("2021-10-12T13:31:41.123Z").success).toBe(true);
      expect(serializedDateSchemaForSerialize.safeParse("2021-10-12T13:31:41.123Z").success).toBe(true);
      expect(serializedDateSchemaForParsing.safeParse("2021-10-12").success).toBe(true);
      expect(serializedDateSchemaForSerialize.safeParse("2021-10-12").success).toBe(true);
    });
    it("fails with invalid string for serialized date", () => {
      expect(serializedDateSchemaForParsing.safeParse("whatever").success).toBe(false);
      expect(serializedDateSchemaForSerialize.safeParse("whatever").success).toBe(false);
    });
    it("works with non-strings", () => {
      expect(serializedDateSchemaForParsing.safeParse(new Date()).success).toBe(true);
      expect(serializedDateSchemaForSerialize.safeParse(new Date()).success).toBe(true);
      expect(serializedDateSchemaForParsing.safeParse(dayjsNow()).success).toBe(true);
      expect(serializedDateSchemaForSerialize.safeParse(dayjsNow()).success).toBe(true);
    });
    describe("converts to dayjs or string depending on the schema", () => {
      it("serializedDateSchemaForSerialize -> string", () => {
        const actual = serializedDateSchemaForSerialize.parse("2021-10-12T00:00:00.000Z");
        expect(actual).toBe("2021-10-12T00:00:00.000Z");
      });
      it("serializedDateSchemaForParsing -> dayjs", () => {
        const actual = serializedDateSchemaForParsing.parse("2021-10-12T00:00:00.000Z");
        expect(actual).toEqual(parseDayjsOrError("2021-10-12T00:00:00.000Z"));
      });
    });
  });
});
