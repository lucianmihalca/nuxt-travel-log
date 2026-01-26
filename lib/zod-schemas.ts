import { z } from "zod";

export const SearchSchema = z.object({
  q: z.string().min(1, "You must enter a search term."),
});

export type SearchSchema = z.infer<typeof SearchSchema>;

export const NameSchema = z.string().min(1).max(100);
export const DescriptionSchema = z.string().max(1000).optional().or(z.literal(""));
export const LatSchema = z.coerce.number({ invalid_type_error: "Required" }).min(-90).max(90);
export const LongSchema = z.coerce.number({ invalid_type_error: "Required" }).min(-180).max(180);
export const DateSchema = z.number({
  message: "Date is required",
});
