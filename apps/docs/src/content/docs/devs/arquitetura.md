---
title: Arquitetura
description: ADRs do design system
sidebar: { order: 2 }
---

Decisões arquiteturais documentadas em ADR (Architecture Decision Records). Formato MADR.

## Lista

- [ADR-001 · Lucide como biblioteca de ícones](https://github.com/singularidade-digital-dev/singularidade-ui-design-system/blob/main/docs/adr/ADR-001-lucide-icons.md)
- [ADR-002 · Modelo de tokens em 3 camadas](https://github.com/singularidade-digital-dev/singularidade-ui-design-system/blob/main/docs/adr/ADR-002-3-tier-tokens.md)
- [ADR-003 · Sub-marcas via overlay](https://github.com/singularidade-digital-dev/singularidade-ui-design-system/blob/main/docs/adr/ADR-003-sub-brands-overlay.md)
- [ADR-004 · Hybrid color strategy](https://github.com/singularidade-digital-dev/singularidade-ui-design-system/blob/main/docs/adr/ADR-004-hybrid-color.md)
- [ADR-005 · Pagefind como motor de busca](https://github.com/singularidade-digital-dev/singularidade-ui-design-system/blob/main/docs/adr/ADR-005-pagefind-search.md)
- [ADR-006 · Storybook 8 com web-components renderer](https://github.com/singularidade-digital-dev/singularidade-ui-design-system/blob/main/docs/adr/ADR-006-storybook-web-components.md)

## Como adicionar ADR

1. Criar `docs/adr/ADR-NNN-titulo-curto.md` com template MADR
2. Status: `proposed` → `accepted` → `superseded` (quando substituído)
3. PR com discussão na descrição
4. Após merge, ADR é referenciado pelo número em todo o DS

## Estrutura

| Status         | Significado                               |
| -------------- | ----------------------------------------- |
| **proposed**   | Sob discussão                             |
| **accepted**   | Decisão tomada, em vigor                  |
| **superseded** | Substituído por ADR mais novo             |
| **deprecated** | Não vale mais, mas mantido como histórico |
