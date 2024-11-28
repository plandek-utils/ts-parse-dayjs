import { z } from "zod";
import { Dayjs, dayjsSchemaStrict, ISODateString } from "./base";
import { parseDayjs } from "./parse";

export const serializedDateSchema = z.string().refine(
  (x) => {
    const d = parseDayjs(x);
    return !!d;
  },
  { message: "String must be a serialized date that can be parsed" },
);

export const serializedDateSchemaForParsing = z
  .union([z.string(), z.number(), z.date(), dayjsSchemaStrict])
  .transform<Dayjs>((x, ctx) => {
    const res = parseDayjs(x);
    if (!res) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "String must be a serialized date that can be parsed",
      });
      return z.NEVER;
    }

    return res;
  });

export const serializedDateSchemaForSerialize = z
  .union([z.string(), z.number(), z.date(), dayjsSchemaStrict])
  .transform<ISODateString>((x, ctx) => {
    const res = parseDayjs(x);
    if (!res) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "String must be a serialized date that can be parsed",
      });
      return z.NEVER;
    }

    return res.toISOString();
  });

export const dayjsSchema = z.union([
  dayjsSchemaStrict,
  serializedDateSchemaForParsing,
]);
