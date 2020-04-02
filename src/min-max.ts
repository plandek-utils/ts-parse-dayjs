import dayjs from "dayjs";
import { Dayjs } from "./base";

type NonEmptyArray<T = any | never> = [T, ...T[]];
type EmptyArray<T = any | never> = T[] & { length: 0 };

function isEmptyArray<T>(x: T[]): x is EmptyArray<T> {
  return x.length === 0;
}

export function minDayjs(list: EmptyArray<Dayjs>): null;
export function minDayjs(list: NonEmptyArray<Dayjs>): Dayjs;
export function minDayjs(list: EmptyArray<Dayjs> | NonEmptyArray<Dayjs>): null | Dayjs;
export function minDayjs(list: EmptyArray<Dayjs> | NonEmptyArray<Dayjs>) {
  return isEmptyArray(list) ? null : dayjs.min(list);
}

export function maxDayjs(list: EmptyArray<Dayjs>): null;
export function maxDayjs(list: NonEmptyArray<Dayjs>): Dayjs;
export function maxDayjs(list: EmptyArray<Dayjs> | NonEmptyArray<Dayjs>): null | Dayjs;
export function maxDayjs(list: Dayjs[]) {
  return isEmptyArray(list) ? null : dayjs.max(list);
}
