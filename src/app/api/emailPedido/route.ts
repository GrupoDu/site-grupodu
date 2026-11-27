import { NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import FormData from "form-data";
import { EmailProductSchema } from "@/schemas/emailProduct.schema";
import { buildContactMessage } from "@/utils/buildContactMessage";
import { buildEmailTemplate } from "@/utils/buildEmailTemplate";
import { IEmailProduct } from "@/@types/emailProduct.interface";
import { errorResponse } from "@/utils/errorResponse";

export const POST = async (req: Request) => {
  const payload: IEmailProduct = await req.json();

  const validatePayload = EmailProductSchema.safeParse(payload);

  if (!validatePayload.success) {
    return errorResponse(
      "Por favor, Verifique se todos os campos foram preenchidos corretamente",
      400
    );
  }

  const emailTemplate = buildEmailTemplate(payload);

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.API_KEY || "API_KEY",
  });
  try {
    await mg.messages.create(
      "grupodu.com.br",
      buildContactMessage(emailTemplate, "Pedido de produto")
    );

    return NextResponse.json({ message: "Enviado com sucesso", status: 200 });
  } catch (err) {
    return errorResponse((err as Error).message);
  }
};
