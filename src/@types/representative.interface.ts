export interface IRepresentative {
  name: string;
  trading_name?: string | null;
  registered_at: string;
  cnpj_cpf: string;
  email?: string | null;
  phone?: string | null;
  state: string;
  uf: string;
  cep: string;
  number: number;
  city: string;
}
