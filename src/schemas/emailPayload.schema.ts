import * as z from "zod";

export const emailPayloadSchema = z.object({
  nome: z.string(),
  email: z.email(),
  contato: z.string(),
  empresa: z.string().optional().nullable(),
  assunto: z.string(),
  mensagem: z.string(),
});
