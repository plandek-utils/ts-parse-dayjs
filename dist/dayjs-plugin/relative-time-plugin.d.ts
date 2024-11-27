import type { Dayjs, PluginFunc } from "dayjs";
type Input = Dayjs | Date | string | number | null | undefined;
type FromToBaseFn = (input: Input, withoutSuffix: boolean | undefined, instance: Dayjs, isFrom?: boolean, postFormat?: (x: string) => string) => string;
declare module "dayjs" {
    interface Dayjs {
        fromToBase: FromToBaseFn;
        fromNow(withoutSuffix?: boolean): string;
        from(compared: Input, withoutSuffix?: boolean): string;
        toNow(withoutSuffix?: boolean): string;
        to(compared: Input, withoutSuffix?: boolean): string;
        fromNowStrict(withoutSuffix?: boolean): string;
        fromStrict(compared: Input, withoutSuffix?: boolean): string;
        toNowStrict(withoutSuffix?: boolean): string;
        toStrict(compared: Input, withoutSuffix?: boolean): string;
    }
}
export declare const relativeTimeStrictPlugin: PluginFunc<Record<string | number | symbol, never>>;
export {};
