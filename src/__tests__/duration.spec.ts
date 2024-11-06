import { describe, expect, it } from "vitest";

import { type Duration, durationBetween, isDuration, parseDayjsOrError } from "..";

const a = parseDayjsOrError("2020-01-01T00:00:10Z");
const b = parseDayjsOrError("2020-01-01T00:00:20Z");

describe("durationBetween", () => {
  it("returns duration from diff", () => {
    const d: Duration = durationBetween(a, b);
    expect(d.asSeconds()).toEqual(10);
  });
});

describe("isDuration", () => {
  it("checks if the given input is duration", () => {
    expect(isDuration("A")).toBeFalsy();
    expect(isDuration(durationBetween(a, b))).toBeTruthy();
  });
});
