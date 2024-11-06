import { type Dayjs, max, min } from "./base";

type NonEmptyArray<T = unknown | never> = [T, ...T[]];
type EmptyArray<T = unknown | never> = T[] & { length: 0 };

function isEmptyArray<T>(x: T[]): x is EmptyArray<T> {
  return x.length === 0;
}

export function minDayjs(list: EmptyArray<Dayjs>): null;
export function minDayjs(list: NonEmptyArray<Dayjs>): Dayjs;
export function minDayjs(list: EmptyArray<Dayjs> | NonEmptyArray<Dayjs> | Dayjs[]): null | Dayjs;
export function minDayjs(list: Dayjs[]) {
  return isEmptyArray(list) ? null : min(list);
}

export function maxDayjs(list: EmptyArray<Dayjs>): null;
export function maxDayjs(list: NonEmptyArray<Dayjs>): Dayjs;
export function maxDayjs(list: EmptyArray<Dayjs> | NonEmptyArray<Dayjs> | Dayjs[]): null | Dayjs;
export function maxDayjs(list: Dayjs[]) {
  return isEmptyArray(list) ? null : max(list);
}
