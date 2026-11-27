import { expect, test } from "vitest";
import { buildEmailTemplate } from "../../utils/buildEmailTemplate";

test("Constroi o corpo html da mensagem", () => {
  const htmlTemplateResult = `
    <h1>Informações do contato</h1>
    
      <h3>nome</h3>
      <p>Marcus</p>
      <hr />
    
      <h3>email</h3>
      <p>email@exemplo.com</p>
      <hr />
    
      <br />
      <h4>Contato enviado pelo Site.</h4>
  `;
  const r: Record<string, string> = {
    nome: "Marcus",
    email: "email@exemplo.com",
  };

  expect(buildEmailTemplate(r)).toBe(htmlTemplateResult);
});
