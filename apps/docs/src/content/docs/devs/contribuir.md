---
title: Como contribuir
description: Fluxos de contribuição (token, ícone, componente)
sidebar: { order: 3 }
next: { link: /releases/, label: Versões }
---

## Setup local

```bash
git clone git@github.com:singularidade-digital-dev/singularidade-ui-design-system.git
cd singularidade-ui-design-system
pnpm install
pnpm build
pnpm test
```

Storybook dev:

```bash
pnpm --filter @singularidade/storybook dev
# http://localhost:6006
```

Docs site dev (precisa do build dos tokens e do `brand-assets`, que o `pnpm build` da raiz faz):

```bash
pnpm --filter @singularidade/docs dev
# http://localhost:4321
```

## Adicionar um token

1. Editar `packages/tokens/src/{core,semantic,component}/<arquivo>.json`
2. Adicionar test em `packages/tokens/tests/`
3. `pnpm --filter @singularidade/tokens test` (red → green)
4. `pnpm --filter @singularidade/tokens build`
5. Verificar saída em `packages/tokens/build/css/`
6. Commit (Conventional Commits) + Changeset:
   ```bash
   pnpm changeset
   git commit -m "feat(tokens): add color.feedback.purple"
   ```

## Adicionar um ícone custom

1. Adicionar SVG em `packages/brand-assets/src/icons/custom/<nome>.svg`
2. ViewBox `0 0 24 24`, traço 2 (o da v2; os 10 ícones de hoje ainda têm 1.5), `currentColor`, linecap/linejoin `round`
3. Otimizar com o SVGO, que é dependência do pacote: `pnpm --filter @singularidade/brand-assets exec svgo <arquivo>`
4. `pnpm --filter @singularidade/brand-assets build` regenera sprite + iconset + JSON catalog
5. Storybook auto-publica novo ícone na story `Foundations / Iconography / Custom`
6. Changeset + commit

## Adicionar / alterar um componente

### Componente do Design System v2

Os componentes da v2 são CSS: marcação com as classes `ss-*` do `bundle.css`. Cada página de componente mostra a prévia de `apps/docs/public/ds-v2/previews/<Nome>.html`.

1. Gere as prévias com o gerador do Design System v2, que embute os ícones e as imagens em cada `<Nome>/preview.html`.
2. Importe: `node apps/docs/scripts/import-ds-v2-previews.mjs <pasta components do DS v2>`. O script enquadra cada prévia com os tokens publicados (`theme.css` e `text-styles.css`), as fontes e o `bundle.css`, e copia o `bundle.css` e o `bundle.js`.
3. Documente em `apps/docs/src/content/docs/componentes/<nome>.mdx`, com `<DsPreview name="<Nome>" title="Prévia do …" height={…} />`. A altura é a do cartão na v2; a prévia cresce com o conteúdo. Página-modelo leva `page` (desenhada a 1280px e reduzida à coluna) e, quando cabe numa tela de 390px sem rolagem lateral, também `phone`, que dá a opção de 390px. Componente desenhado para um espaço mais largo que a coluna leva `minWidth`, a menor largura em que nada sai cortado: abaixo dela, a prévia é montada nessa largura e reduzida à coluna (Header, Tour, Badge, Faixas, ConnectorCard e Dialog).
4. Rode `pnpm --filter @singularidade/docs build` e confira a página no claro e no escuro, a 1280 e a 390px.

#### Textos que mudam no site

O site é público, e alguns textos da fonte da v2 mudam na importação. A tabela `adjustments` do script guarda cada troca, e o script para se um texto não aparecer o número de vezes esperado: quando a fonte muda, revise a troca em vez de publicar o texto antigo.

- **Badge**: o bloco do StatusBadge leva o nome "Selo de status nos apps Vaadin · biblioteca 2.1.0" e diz que a v2 pede palavra e ícone; sai a nota interna do mapeamento em aberto.
- **Header**: sai a pendência do logotipo; fica a regra do logo (o símbolo com o nome em `brand-label`).
- **PageSite**: os planos como o integras.digital vende (usuário adicional a R$ 9,90/mês, "O dobro de memória do Starter", "O dobro de CPU e de memória do Standard" e "Suporte prioritário").
- **PageEmail**: o logo leva `alt=""`, porque o nome do produto está escrito ao lado.
- **PageConfiguracoes, Table e SideNav**: dados de exemplo claramente fictícios (o telefone 79 99999-0000, um e-mail em `.test` e a versão `a1b2c3d`).

### Componente Vaadin

1. Story em `apps/storybook/src/vaadin/<categoria>.stories.ts`
2. Variações em estados: default, hover, focus, disabled, error
3. Conferir o painel do addon-a11y (axe-core) em cada story. É conferência manual: o CI só faz o build do Storybook.
4. Documentar em `apps/docs/src/content/docs/componentes/`
5. Changeset + commit

## Conventional Commits

```
feat(tokens): add new color
fix(brand-assets): correct integras X gap
docs(marca): expand voice-tone chapter
chore(ci): bump pnpm to 9.16
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

## CI gates

PR precisa passar:

- Lint (eslint + stylelint)
- Format (prettier)
- Typecheck (tsc)
- Tests (vitest + Maven)
- Build (todos os packages)
- Storybook build
- Java build (Maven JAR)
- Changeset adicionado (se mudança publicável)
