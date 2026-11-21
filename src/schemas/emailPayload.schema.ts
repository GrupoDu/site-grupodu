import * as z from "zod";

export const emailPayloadSchema = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  company: z.string().optional().nullable(),
  subject: z.string(),
  message: z.string(),
});
