import { z } from "zod";
import { type Dayjs, type ISODateString, dayjsSchemaStrict } from "./base";
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
        code: "custom",
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
        code: "custom",
        message: "String must be a serialized date that can be parsed",
      });
      return z.NEVER;
    }

    return res.toISOString();
  });

// zod 4 reports a failed union as `invalid_union` ("Invalid input") and hides the options' issues in
// `errors`. zod 3 surfaced the custom issue from `serializedDateSchemaForParsing`; keep that message.
export const dayjsSchema = z.union([dayjsSchemaStrict, serializedDateSchemaForParsing], {
  error: (issue) => {
    if (issue.code !== "invalid_union") return undefined;
    return issue.errors.flat().find((option) => option.code === "custom")?.message;
  },
});
