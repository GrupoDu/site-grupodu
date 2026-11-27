import * as z from "zod";

export const RepresentativeRegisterSchema = z.object({
  empresa: z.string(),
  nome_fantasia: z.string().optional().nullable(),
  cnpj_cpf: z.string(),
  email: z.email().optional().nullable(),
  contato: z.string().optional().nullable(),
  estado: z.string(),
  uf: z.string(),
  cep: z.string(),
  numero: z.number().optional().nullable(),
  cidade: z.string(),
});
