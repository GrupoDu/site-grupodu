import { NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import FormData from "form-data";
import { emailPayloadSchema } from "@/schemas/emailPayload.schema";

interface EmailPayload {
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  subject: string;
  message: string;
}

export const POST = async (req: Request) => {
  const emailPayload: EmailPayload = await req.json();
  const isPayloadValid = emailPayloadSchema.safeParse(emailPayload);
  const mailgunConfig = {
    username: "api",
    key: process.env.API_KEY || "API_KEY",
  };

  if (!isPayloadValid.success) {
    return NextResponse.json({
      error: "Por favor, preencha todos os campos",
      status: 400,
    });
  }

  const htmlTemplate = generateHtmlTemplate(emailPayload);
  const messageBody = {
    from: "Grupodu Contato<email@grupodu.com.br>",
    to: ["Dom Metal<dommetalind@gmail.com>"],
    subject: "Email enviado pelo site",
    text: `Solicitação de contato`,
    html: htmlTemplate,
  };

  try {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client(mailgunConfig);
    await mg.messages.create("grupodu.com.br", messageBody);

    return NextResponse.json({ message: "Enviado com sucesso", status: 200 });
  } catch (err) {
    console.error(err);
  }
};

function generateHtmlTemplate(emailPayload: EmailPayload) {
  return `
        <h1>Informações do contato</h1>
        <h3>Nome completo</h3>
        <p>${emailPayload.name}</p>
        <hr />
        <h3>Email</h3>
        <p>${emailPayload.email}</p>
        <hr />
        <h3>Telefon</h3>
        <p>${emailPayload.phone}</p>
        <hr />
        <h3>Empresa</h3>
        <p>${emailPayload.company}</p>
        <hr />
        <h2>Assunto</h2>
        <p>${emailPayload.subject}</p>
        <hr />
        <h3>Mensagem</h3>
        <p>${emailPayload.message}</p>
        <hr />
        <br />
        <h4>Contato enviado pelo site.</h4>
        `;
}
