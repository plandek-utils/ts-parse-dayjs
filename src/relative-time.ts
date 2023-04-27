import { Dayjs } from "./base";

export function fromNow(value: Dayjs, withoutSuffix?: boolean): string {
  return value.fromNow(withoutSuffix);
}

export function fromNowStrict(value: Dayjs, withoutSuffix?: boolean): string {
  return value.fromNowStrict(withoutSuffix);
}

export function toNow(value: Dayjs, withoutSuffix?: boolean): string {
  return value.toNow(withoutSuffix);
}

export function toNowStrict(value: Dayjs, withoutSuffix?: boolean): string {
  return value.toNowStrict(withoutSuffix);
}
