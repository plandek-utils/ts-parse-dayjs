import { z } from "zod";
import { type Dayjs } from "./base";
export declare const serializedDateSchema: z.ZodEffects<z.ZodString, string, string>;
export declare const serializedDateSchemaForParsing: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodDate, z.ZodType<Dayjs, z.ZodTypeDef, Dayjs>]>, Dayjs, string | number | Dayjs | Date>;
export declare const serializedDateSchemaForSerialize: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodDate, z.ZodType<Dayjs, z.ZodTypeDef, Dayjs>]>, `${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z` | `-${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z`, string | number | Dayjs | Date>;
export declare const dayjsSchema: z.ZodUnion<[z.ZodType<Dayjs, z.ZodTypeDef, Dayjs>, z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodDate, z.ZodType<Dayjs, z.ZodTypeDef, Dayjs>]>, Dayjs, string | number | Dayjs | Date>]>;
