import { DayjsInput } from "./base";
import { parseDayjs } from "./parse";

export function isValidDate(x: DayjsInput | undefined): x is Exclude<DayjsInput, null> {
  if (typeof x === "string") {
    const d = new Date(x);
    return parseDayjs(d)?.isValid() || false;
  }

  return parseDayjs(x ?? null)?.isValid() || false;
}
