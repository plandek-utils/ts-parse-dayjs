import dayjs from "dayjs";
import { AvailableLocales, Dayjs } from "./base";

export const relativeTimeConfig = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "a few seconds",
  m: "1 minute",
  mm: "%d minutes",
  h: "1 hour",
  hh: "%d hours",
  d: "1 day",
  dd: "%d days",
  M: "1 month",
  MM: "%d months",
  y: "1 year",
  yy: "%d years",
};

dayjs.updateLocale(AvailableLocales.EnglishAU, { relativeTime: relativeTimeConfig });
dayjs.updateLocale(AvailableLocales.EnglishCA, { relativeTime: relativeTimeConfig });
dayjs.updateLocale(AvailableLocales.EnglishGB, { relativeTime: relativeTimeConfig });
dayjs.updateLocale(AvailableLocales.EnglishIE, { relativeTime: relativeTimeConfig });
dayjs.updateLocale(AvailableLocales.EnglishIL, { relativeTime: relativeTimeConfig });
dayjs.updateLocale(AvailableLocales.EnglishNZ, { relativeTime: relativeTimeConfig });
dayjs.updateLocale(AvailableLocales.EnglishSG, { relativeTime: relativeTimeConfig });
dayjs.updateLocale(AvailableLocales.EnglishUSA, { relativeTime: relativeTimeConfig });

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
