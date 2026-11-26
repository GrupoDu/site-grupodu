/**
 * Constroi corpo HTML da mensagem para mailgun
 *
 * @param   {Record<string, string>} fields - Campos a serem enviados.
 * @return  {string[]} Array com string HTML da mensagem
 */
export function buildEmailTemplate<T extends object>(fields: T) {
  const messageArr: string[] = [
    `
    <h1>Informações do contato</h1>
    `,
  ];

  Object.entries(fields).forEach(([key, value]) => {
    messageArr.push(`
      <h3>${key.replaceAll("_", " ")}</h3>
      <p>${value}</p>
      <hr />
    `);
  });

  messageArr.push(`
      <br />
      <h4>Contato enviado pelo Site.</h4>
  `);

  return messageArr.toString().replaceAll(",", "");
}
