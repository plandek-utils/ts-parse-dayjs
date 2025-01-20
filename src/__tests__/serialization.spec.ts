import { describe, expect, it } from "vitest";
import { TimeOverride, parseDayjsOrError } from "../mod";

describe("serialization testing", () => {
  it("should serialize", () => {
    const json = JSON.stringify({ stuff: "testing" });
    expect(json).toEqual('{"stuff":"testing"}');
  });
  it("serializes date range", () => {
    const dr = {
      from: parseDayjsOrError("2021-01-01", { time: TimeOverride.StartOfDay }),
      to: parseDayjsOrError("2021-01-02", { time: TimeOverride.EndOfDay }),
    };
    const expected = '{"from":"2021-01-01T00:00:00.000Z","to":"2021-01-02T23:59:59.999Z"}';
    const actual = JSON.stringify(dr);
    expect(actual).toEqual(expected);
  });
});
