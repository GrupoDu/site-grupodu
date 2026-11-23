interface INavOptions {
  href: string;
  label: string;
  page: string;
}

export const navOptions: INavOptions[] = [
  {
    href: "/",
    label: "Inicio",
    page: "",
  },
  {
    href: "/produtos",
    label: "Produtos",
    page: "produtos",
  },
  {
    href: "/#sobreSection",
    label: "Sobre",
    page: "",
  },
  {
    href: "/#contatoSection",
    label: "Entre em Contato",
    page: "",
  },
  {
    href: "/representantes",
    label: "Representantes",
    page: "representantes",
  },
];
