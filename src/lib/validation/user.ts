import * as z from "zod";
export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  shippingAddress: z
    .object({
      fullName: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
});
export type ProfileInput = z.infer<typeof profileSchema>;