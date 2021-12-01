import dayjs from "dayjs";
import { AvailableLocales, Dayjs } from "./base";
import { relativeTimeConfig } from "./relative-time";

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
