import { IRegisterRepresentative } from "@/@types/representative.interface";

export function checkContacts(payload: IRegisterRepresentative) {
  const hasEmail = !!payload.email || payload.email !== "";
  const hasPhone = !!payload.contato || payload.contato !== "";

  if (!hasEmail && !hasPhone)
    throw new Error("Pelo menos uma forma de contato deve ser informado");
}
