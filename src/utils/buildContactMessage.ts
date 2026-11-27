export function buildContactMessage(htmlTemplate: string, subject: string) {
  return {
    from: "Grupodu Contato<contato.site@grupodu.com.br>",
    to: ["Dom Metal<dommetalind@gmail.com>"],
    subject,
    text: `Solicitação de contato`,
    html: htmlTemplate,
  };
}
