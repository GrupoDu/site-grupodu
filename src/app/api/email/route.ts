import { NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import FormData from "form-data";
import { emailPayloadSchema } from "@/schemas/emailPayload.schema";
import { buildContactMessage } from "@/utils/buildContactMessage";
import { buildEmailTemplate } from "@/utils/buildEmailTemplate";
import { errorResponse } from "@/utils/errorResponse";

interface EmailPayload {
  nome: string;
  email: string;
  contato: string;
  empresa?: string | null;
  assunto: string;
  mensagem: string;
}

export const POST = async (req: Request) => {
  const emailPayload: EmailPayload = await req.json();
  const mailgunConfig = {
    username: "api",
    key: process.env.API_KEY || "API_KEY",
  };

  try {
    const validatedEmail = validateEmail(emailPayload);

    const htmlTemplate = buildEmailTemplate(validatedEmail);

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client(mailgunConfig);
    await mg.messages.create(
      "grupodu.com.br",
      buildContactMessage(htmlTemplate, "Interesse em contato")
    );

    return NextResponse.json({ message: "Enviado com sucesso", status: 200 });
  } catch (err) {
    console.error(err);
    return errorResponse((err as Error).message);
  }
};

function validateEmail(payload: EmailPayload) {
  const validateEmail = emailPayloadSchema.safeParse(payload);

  if (!validateEmail.success)
    throw new Error(
      "Por favor, verifique se os campos estão preenchidos corretamente"
    );

  return validateEmail.data;
}
