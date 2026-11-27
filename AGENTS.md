# Site GrupoDu
Esse repositório guarda o site do GrupoDu. É um site estilo landing page com detalhes sobre o grupo, empresas e formulários para contato, assim como detalhes dos produtos.

## Código
- Use `const functions` apenas em components;
- Se for necessário fazer uma função dentro de um component, use `const function` se o escopo tiver no máximo 3 linhas ou se a função depender de algo no escopo do component que adicionaria mais complexidade em uma função separada;
- Uso de tipagem é obrigatório;
- Prefira `unknown` no lugar de `any`;
- Componentes de página devem ser **SEMPRE** `server components`;
- Se uma lógica se repete muito, prefira fazer um `util` em `src/utils`;
- Nomes de funções e variáveis devem ser auto-explicativos;
- Não usar valores sensíveis hardcoded;
- Evitar código muito complexo/sujo em uma única função. Se possível se limite a 6 linhas por função — se não, divida em pequenas funções;

## Commits
- Use commits semânticos;
- Separe commits por contexto;
- Antes de fazer qualquer commit, ou add, rode `bun run build` para verificar por erros.
