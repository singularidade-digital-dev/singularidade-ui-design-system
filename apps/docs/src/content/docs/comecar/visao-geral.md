---
title: Visão geral
description: O que é o Singularidade Design System e como adotá-lo
---

O **Singularidade Design System** unifica identidade visual, tokens técnicos, componentes, documentação e assets de marca da Singularidade Digital. Distribuído via npm + AWS CodeArtifact + GitHub Pages.

## Princípios

1. **Tokens como single source of truth** — qualquer mudança visual nasce no `@singularidade/tokens` e propaga via build.
2. **W3C DTF** — formato padrão da indústria pra interop com Figma/Tokens Studio/Penpot.
3. **Multi-platform** — mesmos tokens compilam pra CSS, JS, JSON e constantes Java.
4. **Hybrid color strategy** — brand magenta puro em surfaces brand (login, hero); coral.600 mais sóbrio em CTA chrome (botões em formulários, listas).
5. **Sub-marcas endossadas** — Singularidade matriz + Integras seguindo padrão; outras sub-marcas herdam tudo, customizam só logo.

## Estrutura

```
@singularidade/tokens          design tokens (W3C DTF)
@singularidade/brand-assets    logos, ícones, fontes
@singularidade/vaadin-bindings (em breve) Java façade pros tokens
```

## Quem deve consumir

| Você é…                     | Use                                                                           |
| --------------------------- | ----------------------------------------------------------------------------- |
| **Dev backend Vaadin Flow** | `digital.singularidade:tokens` (Maven) + `digital.singularidade:brand-assets` |
| **Dev frontend marketing**  | `@singularidade/tokens` + `@singularidade/brand-assets` (npm)                 |
| **Designer**                | `tokens.json` (W3C DTF) — importa em Figma/Penpot via Tokens Studio           |
| **Curador de docs**         | Esse próprio site (Astro Starlight com conteúdo MDX)                          |
