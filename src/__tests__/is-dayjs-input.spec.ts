import { describe, expect, it } from "vitest";

import { isDayjsInput, isStrictDayjsInput, parseDayjsOrError } from "..";

describe("isStrictDayjsInput", () => {
  it("isStrictDayjsInput(null) => false", () => {
    expect(isStrictDayjsInput(null)).toBeFalsy();
  });
  it("isStrictDayjsInput(undefined) => false", () => {
    expect(isStrictDayjsInput(undefined)).toBeFalsy();
  });
  it("isStrictDayjsInput([]) => false", () => {
    expect(isStrictDayjsInput([])).toBeFalsy();
  });
  it("isStrictDayjsInput({}) => false", () => {
    expect(isStrictDayjsInput({})).toBeFalsy();
  });
  it("isStrictDayjsInput(true) => false", () => {
    expect(isStrictDayjsInput(true)).toBeFalsy();
  });
  it("isStrictDayjsInput(false) => false", () => {
    expect(isStrictDayjsInput(false)).toBeFalsy();
  });
  it("isStrictDayjsInput(() => {})) => false", () => {
    expect(isStrictDayjsInput(() => {})).toBeFalsy();
  });

  it("isStrictDayjsInput(new Date())) => true", () => {
    expect(isStrictDayjsInput(new Date())).toBeTruthy();
  });
  it("isStrictDayjsInput(dayjsObject)) => true", () => {
    expect(isStrictDayjsInput(parseDayjsOrError(new Date()))).toBeTruthy();
  });
  it("isStrictDayjsInput('whatever')) => true", () => {
    expect(isStrictDayjsInput("whatever")).toBeTruthy();
  });
  it("isStrictDayjsInput(123)) => true", () => {
    expect(isStrictDayjsInput(123)).toBeTruthy();
  });
});

describe("isDayjsInput", () => {
  it("isDayjsInput([]) => false", () => {
    expect(isDayjsInput([])).toBeFalsy();
  });
  it("isDayjsInput({}) => false", () => {
    expect(isDayjsInput({})).toBeFalsy();
  });
  it("isDayjsInput(true) => false", () => {
    expect(isDayjsInput(true)).toBeFalsy();
  });
  it("isDayjsInput(false) => false", () => {
    expect(isDayjsInput(false)).toBeFalsy();
  });
  it("isDayjsInput(() => {})) => false", () => {
    expect(isDayjsInput(() => {})).toBeFalsy();
  });
  it("isDayjsInput(null) => true", () => {
    expect(isDayjsInput(null)).toBeTruthy();
  });
  it("isDayjsInput(undefined) => true", () => {
    expect(isDayjsInput(undefined)).toBeTruthy();
  });

  it("isDayjsInput(new Date())) => true", () => {
    expect(isDayjsInput(new Date())).toBeTruthy();
  });
  it("isDayjsInput(dayjsObject)) => true", () => {
    expect(isDayjsInput(parseDayjsOrError(new Date()))).toBeTruthy();
  });
  it("isDayjsInput('whatever')) => true", () => {
    expect(isDayjsInput("whatever")).toBeTruthy();
  });
  it("isDayjsInput(123)) => true", () => {
    expect(isDayjsInput(123)).toBeTruthy();
  });
});
