import { dayjsNow } from "..";
import { fromNow } from "../from-now";

describe("fromNow() returns numbers for singular unit durations", () => {
  it("returns 'a few seconds ago' for duration of 1 second", () => {
    const now = dayjsNow();
    const from = now.subtract(1, "second");
    const res = fromNow(from);
    expect(res).toEqual("a few seconds ago");
  });

  it("returns '1 minute ago' for duration of 1 minute", () => {
    const now = dayjsNow();
    const from = now.subtract(1, "minute");
    const res = fromNow(from);
    expect(res).toEqual("1 minute ago");
  });

  it("returns '1 hour ago' for duration of 1 hour", () => {
    const now = dayjsNow();
    const from = now.subtract(1, "hour");
    const res = fromNow(from);
    expect(res).toEqual("1 hour ago");
  });

  it("returns '1 day ago' for duration of 1 day", () => {
    const now = dayjsNow();
    const from = now.subtract(1, "day");
    const res = fromNow(from);
    expect(res).toEqual("1 day ago");
  });

  it("returns '1 month ago' for duration of 1 month", () => {
    const now = dayjsNow();
    const from = now.subtract(1, "month");
    const res = fromNow(from);
    expect(res).toEqual("1 month ago");
  });

  it("returns '1 year ago' for duration of 1 year", () => {
    const now = dayjsNow();
    const from = now.subtract(1, "year");
    const res = fromNow(from);
    expect(res).toEqual("1 year ago");
  });
});

describe("fromNow() returns numbers for NON singular unit durations", () => {
  it("returns 'a few seconds ago' for duration of 10 seconds", () => {
    const now = dayjsNow();
    const from = now.subtract(10, "second");
    const res = fromNow(from);
    expect(res).toEqual("a few seconds ago");
  });

  it("returns '10 minutes ago' for duration of 10 minutes", () => {
    const now = dayjsNow();
    const from = now.subtract(10, "minute");
    const res = fromNow(from);
    expect(res).toEqual("10 minutes ago");
  });

  it("returns '10 hours ago' for duration of 10 hours", () => {
    const now = dayjsNow();
    const from = now.subtract(10, "hour");
    const res = fromNow(from);
    expect(res).toEqual("10 hours ago");
  });

  it("returns '5 days ago' for duration of 5 days", () => {
    const now = dayjsNow();
    const from = now.subtract(5, "day");
    const res = fromNow(from);
    expect(res).toEqual("5 days ago");
  });

  it("returns '3 months ago' for duration of 3 months", () => {
    const now = dayjsNow();
    const from = now.subtract(3, "month");
    const res = fromNow(from);
    expect(res).toEqual("3 months ago");
  });

  it("returns '3 years ago' for duration of 3 years", () => {
    const now = dayjsNow();
    const from = now.subtract(3, "year");
    const res = fromNow(from);
    expect(res).toEqual("3 years ago");
  });
});

describe("fromNow() optionally adds the default suffix", () => {
  it("returns '10 minutes' for duration of 10 minutes and withoutSuffix = true", () => {
    const now = dayjsNow();
    const from = now.subtract(10, "minute");
    const res = fromNow(from, true);
    expect(res).toEqual("10 minutes");
  });

  it("returns '10 minutes' for duration of 10 minutes and withoutSuffix = false", () => {
    const now = dayjsNow();
    const from = now.subtract(10, "minute");
    const res = fromNow(from, true);
    expect(res).toEqual("10 minutes");
  });

  it("suffix is enabled by default", () => {
    const now = dayjsNow();
    const from = now.subtract(10, "minute");
    const res = fromNow(from);
    expect(res).toEqual("10 minutes ago");
  });
});
