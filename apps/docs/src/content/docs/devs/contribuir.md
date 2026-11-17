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
3. Documente em `apps/docs/src/content/docs/componentes/<nome>.mdx`, com `<DsPreview name="<Nome>" title="Prévia do …" height={…} />`. A altura é a do cartão na v2; a prévia cresce com o conteúdo. Página-modelo leva `page` (desenhada a 1280px e reduzida à coluna) e, quando é uma tela só e responsiva, também `phone`, que dá a opção de 390px.
4. Rode `pnpm --filter @singularidade/docs build` e confira a página no claro e no escuro, a 1280 e a 390px.

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
