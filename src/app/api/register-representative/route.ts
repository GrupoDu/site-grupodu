import { NextResponse } from "next/server";
import {
  IRegisterRepresentative,
  IRepresentative,
} from "@/@types/representative.interface";
import { RepresentativeRegisterSchema } from "@/schemas/representativeRegister.schema";
import Mailgun from "mailgun.js";
import FormData from "form-data";
import { buildContactMessage } from "@/utils/buildContactMessage";
import { buildEmailTemplate } from "@/utils/buildEmailTemplate";
import { errorResponse } from "@/utils/errorResponse";
import { checkContacts } from "@/utils/checkContacts";

export async function POST(req: Request) {
  const payload: IRegisterRepresentative = await req.json();
  const mailgunConfig = {
    username: "api",
    key: process.env.API_KEY || "API_KEY",
  };

  try {
    const validatedPayload = validatePayload(payload);
    checkContacts(payload);

    const htmlTemplate = buildEmailTemplate(validatedPayload);
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client(mailgunConfig);
    await mg.messages.create(
      "grupodu.com.br",
      buildContactMessage(htmlTemplate, "Candidatura de representante")
    );

    return NextResponse.json({ message: "Enviado com sucesso", status: 200 });
  } catch (e) {
    return errorResponse((e as Error).message);
  }
}

function validatePayload(payload: IRegisterRepresentative) {
  const validatePayload = RepresentativeRegisterSchema.safeParse(payload);

  if (!validatePayload.success)
    throw new Error("Verifique se os campos foram preenchidos corretamente");

  return validatePayload.data;
}
