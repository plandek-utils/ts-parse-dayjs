import type { Dayjs } from "./base";
export declare function makePrintWithPrefix(prefix: string, defaultDateFormat: string): (from: Dayjs, dateFormat?: string) => string;
export declare const printSince: (from: Dayjs, dateFormat?: string) => string;
export declare const printStarted: (from: Dayjs, dateFormat?: string) => string;
type MaybeDateRange = {
    from: Dayjs | null | undefined;
    to: Dayjs | null | undefined;
};
export declare function printRange({ from, to }: MaybeDateRange, dateFormat?: string): string | null;
export {};
