import { z } from "zod";
import { type Dayjs } from "./base";
export declare const serializedDateSchema: z.ZodString;
export declare const serializedDateSchemaForParsing: z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodDate, z.ZodInstanceOf<Dayjs>]>, z.ZodTransform<Dayjs, string | number | Dayjs | Date>>;
export declare const serializedDateSchemaForSerialize: z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodDate, z.ZodInstanceOf<Dayjs>]>, z.ZodTransform<`${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z` | `-${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z`, string | number | Dayjs | Date>>;
export declare const dayjsSchema: z.ZodUnion<readonly [z.ZodInstanceOf<Dayjs>, z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodDate, z.ZodInstanceOf<Dayjs>]>, z.ZodTransform<Dayjs, string | number | Dayjs | Date>>]>;
