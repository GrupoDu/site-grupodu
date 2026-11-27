import * as z from "zod";

export const EmailProductSchema = z.object({
  nome: z.string(),
  email: z.email(),
  telefone: z.string(),
  empresa: z.string().optional().nullable(),
  quantidade: z.string(),
  modelo: z.string(),
});
