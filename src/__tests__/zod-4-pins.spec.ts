import dayjs from "dayjs";
import { describe, expect, it } from "vitest";

import {
  dayjsSchema,
  dayjsSchemaStrict,
  serializedDateSchema,
  serializedDateSchemaForParsing,
  serializedDateSchemaForSerialize,
  serializedDateStringSchema,
} from "..";

// Pins behaviour that must not change across the zod 3 → zod 4 migration (PLAN-17573).
describe("zod 4 migration pins", () => {
  it("dayjsSchemaStrict accepts a dayjs from the consumer's dayjs", () => {
    expect(dayjsSchemaStrict.safeParse(dayjs("2026-01-01")).success).toBe(true);
  });

  it("dayjsSchemaStrict rejects a Date", () => {
    expect(dayjsSchemaStrict.safeParse(new Date()).success).toBe(false);
  });

  it("dayjsSchema turns an ISO string into a Dayjs", () => {
    expect(dayjsSchema.parse("2026-01-02T00:00:00.000Z").toISOString()).toBe("2026-01-02T00:00:00.000Z");
  });

  it("serializedDateSchemaForParsing reports the custom message", () => {
    const result = serializedDateSchemaForParsing.safeParse("not a date");
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("String must be a serialized date that can be parsed");
  });

  it("serializedDateSchemaForSerialize returns an ISO string", () => {
    expect(serializedDateSchemaForSerialize.parse(new Date(Date.UTC(2026, 0, 2)))).toBe("2026-01-02T00:00:00.000Z");
  });

  it("serializedDateSchema rejects garbage", () => {
    expect(serializedDateSchema.safeParse("nope").success).toBe(false);
  });

  it("serializedDateStringSchema accepts a date and an ISO datetime, but not a loose date", () => {
    expect(serializedDateStringSchema.safeParse("2026-01-02").success).toBe(true);
    expect(serializedDateStringSchema.safeParse("2026-01-02T00:00:00.000Z").success).toBe(true);
    expect(serializedDateStringSchema.safeParse("2026-1-2").success).toBe(false);
  });
});
