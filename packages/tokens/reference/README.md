# Referência do Design System v2

`ds-v2.tokens.json` é a cópia fiel (byte a byte) do `tokens.json` do Singularidade Design System v2 aprovado pelo dono, a fonte do artefato `S4jcRosPXARXCsCfVQbFJY`.

- Origem: `design-system-v2-fonte/project/tokens.json`, versão de 13/11/2026.
- SHA-256: `1abeb0b63928125305ca4d9267f1d5f710785f8102996a02d0aa8f5482a4778e`.

As fontes do Style Dictionary (`src/`) são o port desse arquivo. Os testes comparam o que o build gera com ele:

- `tests/v2-parity.test.ts`: cada token do v2, nos dois temas, no `theme.css`, nos quatro `{marca}.{tema}.css`, no `text-styles.css` e nas constantes Java de e-mail;
- `tests/contrast.test.ts`: os 240 pares de contraste da especificação (120 por tema);
- `tests/ramps.test.ts`: as rampas em ordem de luminância.

O arquivo fica fora do Prettier (`.prettierignore`) para continuar igual ao original. Para atualizar: copie o `tokens.json` novo por cima, atualize a data e o SHA-256 acima, ajuste as fontes em `src/` e rode `pnpm --filter @singularidade/tokens test`.
