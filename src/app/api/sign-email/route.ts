import { NextResponse } from "next/server";
import * as z from "zod";
import { BrevoClient } from "@getbrevo/brevo";

export async function POST(req: Request) {
  const { listId, email } = await req.json();
  const API_KEY = process.env["BREVO_API_KEY"];

  const validateEmail = z.email().safeParse(email);

  if (!validateEmail.success)
    return NextResponse.json(
      { message: "Formato de email inválido." },
      { status: 400 }
    );

  if (!API_KEY)
    return NextResponse.json(
      { message: "KEY do brevo não encontrada." },
      { status: 500 }
    );

  const brevoClient = new BrevoClient({
    apiKey: API_KEY ?? "",
  });

  await brevoClient.contacts.createContact({
    listIds: listId,
    email,
  });

  return NextResponse.json({ message: "Email enviado!" }, { status: 200 });
}
