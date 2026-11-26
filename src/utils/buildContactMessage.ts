export function buildContactMessage(htmlTemplate: string) {
  return {
    from: "Grupodu Contato<contato.site@grupodu.com.br>",
    to: ["Dom Metal<dommetalind@gmail.com>"],
    subject: "Email enviado pelo site",
    text: `Solicitação de contato`,
    html: htmlTemplate,
  };
}
