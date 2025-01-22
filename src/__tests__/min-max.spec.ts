import { describe, expect, it } from "vitest";

import { type Dayjs, maxDayjs, minDayjs, parseDayjsOrError } from "..";

const d1 = parseDayjsOrError("2019-01-01");
const d2 = parseDayjsOrError("2019-02-02");
const d3 = parseDayjsOrError("2019-03-03");
const d4 = parseDayjsOrError("2019-04-04");
const list: Dayjs[] = [d3, d4, d1, d2];

describe("minDayjs([d1, d2, d3])", () => {
  it("returns null with empty array", () => {
    expect(minDayjs([])).toBeNull();
  });

  it("returns the earliest with non empty array", () => {
    expect(minDayjs([d3, d4, d1, d2])).toBe(d1);
    expect(minDayjs(list)).toBe(d1);
  });
});

describe("maxDayjs([d1, d2, d3])", () => {
  it("returns null with empty array", () => {
    expect(maxDayjs([])).toBeNull();
  });

  it("returns the latest with non empty array", () => {
    expect(maxDayjs([d3, d4, d1, d2])).toBe(d4);
    expect(maxDayjs(list)).toBe(d4);
  });
});
