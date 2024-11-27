import { type Dayjs } from "./base";
type NonEmptyArray<T = unknown | never> = [T, ...T[]];
type EmptyArray<T = unknown | never> = T[] & {
    length: 0;
};
export declare function minDayjs(list: EmptyArray<Dayjs>): null;
export declare function minDayjs(list: NonEmptyArray<Dayjs>): Dayjs;
export declare function minDayjs(list: EmptyArray<Dayjs> | NonEmptyArray<Dayjs> | Dayjs[]): null | Dayjs;
export declare function maxDayjs(list: EmptyArray<Dayjs>): null;
export declare function maxDayjs(list: NonEmptyArray<Dayjs>): Dayjs;
export declare function maxDayjs(list: EmptyArray<Dayjs> | NonEmptyArray<Dayjs> | Dayjs[]): null | Dayjs;
export {};
