export interface IStateItem extends Record<string, string> {
  name: string;
  uf: string;
}

export const northeastStates: IStateItem[] = [
  { name: "Alagoas", uf: "AL" },
  { name: "Bahia", uf: "BA" },
  { name: "Ceará", uf: "CE" },
  { name: "Maranhão", uf: "MA" },
  { name: "Paraíba", uf: "PB" },
  { name: "Pernambuco", uf: "PE" },
  { name: "Piauí", uf: "PI" },
  { name: "Rio Grande do Norte", uf: "RN" },
  { name: "Sergipe", uf: "SE" },
];
