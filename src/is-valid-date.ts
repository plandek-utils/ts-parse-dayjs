import { DayjsInput } from "./base";
import { parseDayjs } from "./parse";

/**
 * @internal
 * @hidden
 * @private
 */
function isValid(x: DayjsInput): x is Exclude<DayjsInput, null> {
  const parsed = parseDayjs(x);
  return !!parsed && parsed.isValid();
}

export function isValidDate(x: DayjsInput | undefined): x is Exclude<DayjsInput, null> {
  if (typeof x === "string") {
    return isValid(new Date(x));
  }

  return isValid(x ?? null);
}
