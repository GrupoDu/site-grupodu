export interface IRepresentative {
  uuid: string;
  company: string;
  tradingName?: string | null;
  registeredAt: string;
  cnpjCpf: string;
  email?: string | null;
  phone?: string | null;
  state: string;
  uf: string;
  cep: string;
  number: number;
  city: string;
}

// DEIXAR EM PORTUGUES PRA MAPEAR
// CORPO DO EMAIL
export interface IRegisterRepresentative {
  empresa: string;
  nome_fantasia?: string;
  cnpj_cnpf?: string;
  email: string;
  contato: string;
  estado: string;
  uf: string;
  cep: string;
  numero: number;
  cidade: string;
}
