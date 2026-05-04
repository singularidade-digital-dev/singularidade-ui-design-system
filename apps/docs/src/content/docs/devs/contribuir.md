---
title: Como contribuir
description: Fluxos de contribuição (token, ícone, componente)
sidebar: { order: 3 }
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

Docs site dev:

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
2. ViewBox `0 0 24 24`, stroke `1.5`, `currentColor`, linecap/linejoin `round`
3. SVGO otimiza no pre-commit
4. `pnpm --filter @singularidade/brand-assets build` regenera sprite + iconset + JSON catalog
5. Storybook auto-publica novo ícone na story `Foundations / Iconography / Custom`
6. Changeset + commit

## Adicionar / alterar um componente

1. Story em `apps/storybook/src/vaadin/<categoria>.stories.ts`
2. Variações em estados: default, hover, focus, disabled, error
3. addon-a11y deve passar (axe-core inline)
4. Visual regression aprovado (Chromatic, Fase 7)
5. Documentar em `apps/docs/src/content/docs/componentes/`
6. Changeset + commit

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

- ✅ Lint (eslint + stylelint)
- ✅ Format (prettier)
- ✅ Typecheck (tsc)
- ✅ Tests (vitest + Maven)
- ✅ Build (todos os packages)
- ✅ Storybook build
- ✅ Java build (Maven JAR)
- ✅ Changeset adicionado (se mudança publicável)
