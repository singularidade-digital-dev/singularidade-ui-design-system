---
title: 7 · Iconografia
description: Lucide subset + custom ss:* namespace
sidebar: { order: 7 }
---

## Sistema dual

| Origem            | Quantidade        | Quando usar                                                     |
| ----------------- | ----------------- | --------------------------------------------------------------- |
| **Lucide**        | 71 ícones curados | Ações comuns (search, edit, settings, user)                     |
| **Custom `ss:*`** | 10 ícones         | Domínio Singularidade (tenant, mcp-server, eula, billing-cycle) |

## Especificações

- ViewBox `0 0 24 24`
- Stroke width `1.5`
- Linecap/linejoin `round`
- Fill `none` (line icons)
- Color `currentColor` (herda do contexto)

## Lucide

Subset curado pra apps SaaS — Lucide v0.469. 71 ícones cobrindo navigation, actions, status, content, settings, feedback. Catálogo completo em [Foundations / Iconography](/foundations/tokens/).

## Custom (ss:\*)

Ícones de domínio Singularidade desenhados no padrão Lucide:

| Nome                     | Conceito                      |
| ------------------------ | ----------------------------- |
| `ss:tenant`              | Prédio (organização)          |
| `ss:mcp-server`          | Rack servidor com indicadores |
| `ss:tool`                | Chave inglesa                 |
| `ss:eula-signed`         | Documento + check             |
| `ss:eula-pending`        | Documento + relógio           |
| `ss:provisioning`        | Loader em curso               |
| `ss:billing-cycle`       | Relógio + ticks de cobrança   |
| `ss:tax-id`              | Cartão de identificação       |
| `ss:integration-pending` | 2 caixas conectadas tracejado |
| `ss:compliance`          | Escudo + check                |

## Uso (Vaadin Flow)

```js
import '@singularidade/brand-assets/build/vaadin-iconset.js';
```

```html
<vaadin-icon icon="ss:tenant"></vaadin-icon>
```

## Adicionar novo custom icon

PR adiciona SVG novo em `packages/brand-assets/src/icons/custom/<nome>.svg` no padrão Lucide → SVGO otimiza no pre-commit → build regenera sprite/iconset/JSON catalog → Storybook auto-publica.
