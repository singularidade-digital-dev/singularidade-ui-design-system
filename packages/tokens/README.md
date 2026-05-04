# @singularidade/tokens

Design tokens da **Singularidade Digital** no formato [W3C Design Tokens (DTF)](https://www.designtokens.org/), compilados via [Style Dictionary 4](https://styledictionary.com/) para CSS, JS, JSON e Java constants.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](../../LICENSE)
[![Style Dictionary](https://img.shields.io/badge/style--dictionary-4.x-purple.svg)](https://styledictionary.com/)

## Visão geral

Fonte única da verdade para cores, tipografia, espaçamento, elevação e radii do design system. Os tokens são definidos uma única vez em JSON DTF e gerados em múltiplos formatos:

| Output | Path                                                  | Consumidor                                                |
| ------ | ----------------------------------------------------- | --------------------------------------------------------- |
| CSS    | `build/css/<brand>.<theme>.css`                       | `--color-*`, `--space-*`, `--font-*` em web/Vaadin        |
| JSON   | `build/json/<brand>.<theme>.json`                     | tooling, IDE plugins                                      |
| JS     | `build/js/index.js`                                   | aplicações TypeScript/React                               |
| Java   | `build/java/digital/singularidade/tokens/Tokens.java` | back-end (raros casos onde o estado precisa do valor cru) |

## Instalação

### npm/pnpm

```bash
pnpm add @singularidade/tokens
```

### Maven

```xml
<dependency>
  <groupId>digital.singularidade</groupId>
  <artifactId>tokens</artifactId>
  <version>0.1.0</version>
</dependency>
```

## Uso

### CSS — brand × theme

```css
/* Brand padrão (Singularidade) light */
@import '@singularidade/tokens/css/singularidade.light.css';
@import '@singularidade/tokens/css/singularidade.dark.css';

/* Sub-brand Integras */
@import '@singularidade/tokens/css/integras.light.css';
@import '@singularidade/tokens/css/integras.dark.css';
```

Ative em runtime:

```html
<html data-brand="integras" data-theme="dark"></html>
```

### TypeScript

```ts
import tokens from '@singularidade/tokens';

console.log(tokens.color.brand.coral[600]); // "#be3550"
console.log(tokens.space.m); // "1rem"
```

### Java

```java
import digital.singularidade.tokens.Tokens;

String coral = Tokens.Color.Brand.Coral._600; // "#be3550"
```

## Arquitetura 3-tier

```
src/
├── core/                    # Tier 1: Brand — cores cruas (palette)
│   └── color.json
├── semantic/                # Tier 2: Semantic — intent (interactive.primary, surface.base)
│   ├── color.light.json
│   ├── color.dark.json
│   └── space.json
└── component/               # Tier 3: Component — contexto (button.background)
    └── button.json
```

Por que 3-tier? Mudanças de marca tocam só Tier 1; mudanças de modo (light/dark) tocam Tier 2; ajuste de componente toca Tier 3. Cada camada referencia a anterior via `{path.to.token}`.

## Build

```bash
pnpm build       # gera build/css/, build/json/, build/js/, build/java/
pnpm test        # snapshots de saída (vitest)
```

## Adicionando um token

1. Editar JSON DTF correspondente (ex: `src/core/color.json`)
2. `pnpm build`
3. Conferir output em `build/`
4. `pnpm changeset` para registrar mudança versionável
5. Commit no padrão Conventional Commits

## Licença

Apache License 2.0 — © Singularidade Digital
