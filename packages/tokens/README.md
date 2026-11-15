# @singularidade/tokens

Design tokens da **Singularidade Digital** no formato [W3C Design Tokens (DTF)](https://www.designtokens.org/), compilados via [Style Dictionary 4](https://styledictionary.com/) para CSS, JS, JSON e Java constants.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](../../LICENSE)
[![Style Dictionary](https://img.shields.io/badge/style--dictionary-4.x-purple.svg)](https://styledictionary.com/)

## Visão geral

Fonte única da verdade para cores, tipografia, espaçamento, elevação e radii do design system. Os tokens são definidos uma única vez em JSON DTF e gerados em múltiplos formatos:

| Output | Path                                                                          | Consumidor                                                                   |
| ------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| CSS    | `build/css/theme.css`                                                         | qualquer página e o tema Vaadin `singularidade-base`: claro, escuro e marca  |
| CSS    | `build/css/<brand>.<theme>.css`                                               | sites (`data-brand` + `data-theme` no elemento)                              |
| CSS    | `build/css/text-styles.css`                                                   | os 19 estilos de texto da v2 como classes (`.heading`, `.body`, `.caption`…) |
| JSON   | `build/json/<brand>.<theme>.json`, `build/json/tokens.json`                   | tooling, IDE plugins                                                         |
| JS     | `build/js/tokens.js`                                                          | aplicações TypeScript/React                                                  |
| Java   | `build/java/digital/singularidade/tokens/SingularidadeTokens.java`            | back-end (raros casos onde o estado precisa do valor cru)                    |
| Java   | `build/java/digital/singularidade/tokens/email/EmailTokens<Marca><Tema>.java` | e-mails (Thymeleaf), com valores resolvidos por marca × tema                 |

A saída canônica (`tokens.js`, `tokens.json`, `SingularidadeTokens.java`) e o `:root` do `theme.css` seguem a marca padrão, o **Integras**, no tema claro. No CSS os tamanhos de fonte saem em rem; JS, JSON e Java ficam em px.

## Instalação

### Maven (AWS CodeArtifact)

```xml
<dependency>
  <groupId>digital.singularidade</groupId>
  <artifactId>tokens</artifactId>
  <version>1.0.0</version>
</dependency>
```

### npm

Ainda não está no npm. Dentro do monorepo, o pacote resolve pelo workspace do pnpm (`"@singularidade/tokens": "workspace:*"`); fora dele, os arquivos saem do build (`pnpm --filter @singularidade/tokens build`).

## Uso

### CSS — um arquivo para tudo (`theme.css`)

```css
@import '@singularidade/tokens/css/theme.css';
```

| Seletor                                  | Tema                                                  |
| ---------------------------------------- | ----------------------------------------------------- |
| `:root`                                  | claro, marca Integras                                 |
| `[data-theme='light']`                   | claro numa região dentro de uma página escura         |
| `[theme~='dark']`, `[data-theme='dark']` | escuro (`theme="dark"` é o atributo que o Vaadin usa) |
| `[data-brand='singularidade']`           | troca só as três cores da marca                       |

### CSS — brand × theme (sites)

```css
@import '@singularidade/tokens/css/integras.light.css';
@import '@singularidade/tokens/css/integras.dark.css';
```

Ative em runtime:

```html
<html data-brand="integras" data-theme="dark"></html>
```

### Nomes que saem na v2

Os nomes da v1 que a v2 não tem continuam no CSS, no JSON e no Java como aliases deprecados por duas versões menores (saem na 1.2): `--shadow-light-*` e `--shadow-dark-*` (use `--shadow-*`, que já tem um valor por tema), `--color-brand-gradient`, `--text-*` (use os estilos de `text-styles.css`), `--button-size-*`, `--button-primary-border-radius` e `-font-weight`, `--card-shadow-*`, `--dialog-shadow`, `--input-border-radius` e `--input-padding`. No CSS cada um leva o comentário `/* deprecated: … */`; no Java, `@Deprecated`. Os `--brand-*` (nome e caminhos de logo) saíram do CSS, onde viravam um `url()` que o navegador não carrega; continuam no JSON, no JS e no Java.

### TypeScript

```ts
import tokens from '@singularidade/tokens';

console.log(tokens.color.brand.coral[600].$value); // "#be3550"
```

### Java

```java
import digital.singularidade.tokens.SingularidadeTokens;

String coral = SingularidadeTokens.colorBrandCoral600; // "#be3550"
```

## Arquitetura 3-tier

```
src/
├── core/                    # Tier 1: Brand — cores cruas (palette)
│   ├── color.json
│   └── spacing.json, typography.json, radius.json, shadow.json, duration.json, easing.json, layout.json
├── semantic/                # Tier 2: Semantic — intent (interactive.primary, surface.base)
│   ├── color.json           # iguais nos dois temas (on-*, link, border.control…)
│   ├── color.light.json     # valores do tema claro
│   ├── color.dark.json      # valores do tema escuro
│   ├── shadow.json, shadow.light.json, shadow.dark.json
│   └── typography.json      # estilos de texto da v2 (text-style.*)
├── component/               # Tier 3: Component — contexto (button.background)
│   └── button.json, card.json, card.{light,dark}.json, dialog.json, input.json
└── brands/                  # overlays por marca (integras é a padrão)
    └── <brand>/identity.json, overrides.json
```

Por que 3-tier? Mudanças de marca tocam só Tier 1; mudanças de modo (light/dark) tocam Tier 2; ajuste de componente toca Tier 3. Cada camada referencia a anterior via `{path.to.token}`. Arquivos `*.light.json` e `*.dark.json` guardam só o que muda com o tema.

As fontes são o port do Design System v2 aprovado (`reference/ds-v2.tokens.json`). Os testes comparam o que o build gera com essa referência, conferem os 240 pares de contraste da especificação nos dois temas e a ordem das rampas (veja `reference/README.md`).

## Build

```bash
pnpm build       # gera build/css/, build/json/, build/js/, build/java/
pnpm test        # paridade com o v2, contraste, rampas e saídas (vitest)
```

## Adicionando um token

1. Editar JSON DTF correspondente (ex: `src/core/color.json`)
2. `pnpm build`
3. Conferir output em `build/`
4. `pnpm changeset` para registrar mudança versionável
5. Commit no padrão Conventional Commits

## Licença

Apache License 2.0 — © Singularidade Digital
