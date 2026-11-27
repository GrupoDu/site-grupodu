import { AiFillHome, AiOutlineProduct } from "react-icons/ai";
import { SlQuestion } from "react-icons/sl";
import { MdConnectWithoutContact, MdOutlineHandshake } from "react-icons/md";
import { IconType } from "react-icons";

interface INavOptions {
  href: string;
  label: string;
  page: string;
  icon: IconType;
}

export const navOptions: INavOptions[] = [
  {
    href: "/",
    label: "Inicio",
    page: "",
    icon: AiFillHome,
  },
  {
    href: "/produtos",
    label: "Produtos",
    page: "produtos",
    icon: AiOutlineProduct,
  },
  {
    href: "/#sobreSection",
    label: "Sobre",
    page: "",
    icon: SlQuestion,
  },
  {
    href: "/#contatoSection",
    label: "Contato",
    page: "",
    icon: MdConnectWithoutContact,
  },
  {
    href: "/representantes",
    label: "Representantes",
    page: "representantes",
    icon: MdOutlineHandshake,
  },
];
