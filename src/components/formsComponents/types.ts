// ==> INTERFACE EM PT-BR PARA ENVIO! NÃO MUDAR! <==
interface IContactInfos {
  email: string;
  nome: string;
  contato: string;
  empresa?: string;
}

// ==> INTERFACE EM PT-BR PARA ENVIO! NÃO MUDAR! <==
/**
 * Interface de informações de contato.
 *
 * @see IUserInfos
 * @interface
 */
export interface IGeneralContactInfos extends IContactInfos {
  assunto: string;
  mensagem: string;
}

// ==> INTERFACE EM PT-BR PARA ENVIO! NÃO MUDAR! <==
/**
 * Interface de informações de pedido de produto
 *
 * @see IUserInfos
 * @interface
 */
export interface IProductRequest extends IContactInfos {
  quantidade: number;
  modelo: string;
}
