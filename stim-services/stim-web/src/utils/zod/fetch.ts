import { z } from "zod";

const basePass = z.object({
  status: z.literal("success"),
  message: z.string(),
});

const baseFail = z.object({
  status: z.literal("failed"),
  error: z.string(),
});

export const baseRouteSchema = z.discriminatedUnion("status", [
  basePass,
  baseFail,
]);

export const buildRouteSchema = <
  T extends z.ZodRawShape,
  K extends z.ZodRawShape
>({
  pass,
  fail,
}: {
  pass: z.ZodObject<T>;
  fail: z.ZodObject<K>;
}) => {
  const extendedPass = pass.merge(basePass);
  const extendedFail = fail.merge(baseFail);

  return z.discriminatedUnion("status", [extendedPass, extendedFail]);
};
