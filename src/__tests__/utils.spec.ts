import { extractInteger, parseInteger } from "../utils";

describe("parseInteger()", () => {
  it("parseInteger(' 12 ') => 12 ", () => {
    expect(parseInteger("  12 ")).toEqual(12);
  });
  it("parseInteger(' 12.341 ') => 12 ", () => {
    expect(parseInteger("  12.341 ")).toEqual(12);
  });
  it("parseInteger('') => NaN ", () => {
    expect(parseInteger("")).toBeNaN();
  });
  it("parseInteger('wat') => NaN ", () => {
    expect(parseInteger("wat")).toBeNaN();
  });
  it("parseInteger('0') => 0 ", () => {
    expect(parseInteger("0")).toEqual(0);
  });
  it("parseInteger('0.12') => 0 ", () => {
    expect(parseInteger("0.12")).toEqual(0);
  });
});

describe("extractInteger", () => {
  const re = /^([\d]+)y$/;
  it('extractInteger("123y", /^([\\d]+)y$/) => 123', () => {
    expect(extractInteger("123y", re)).toEqual(123);
  });
  it('extractInteger("  123y", /^([\\d]+)y$/) => null (does not trim)', () => {
    expect(extractInteger("   123y", re)).toBeNull();
  });
  it('extractInteger("123", /^([\\d]+)y$/) => null', () => {
    expect(extractInteger("123", re)).toBeNull();
  });
  it('extractInteger("123x", /^([\\d]+)y$/) => null', () => {
    expect(extractInteger("123x", re)).toBeNull();
  });
  it('extractInteger("123x", /^(x+)$/) => throw error (invalid number extracted, bad regex?)', () => {
    expect(() => extractInteger("xxx", /^([x]+)$/)).toThrowError(`invalid number parsed number from: xxx`);
  });
});
