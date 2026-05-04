---
title: Multi-marca
description: Singularidade matriz + sub-marcas endossadas
sidebar: { order: 3 }
---

import { Aside } from '@astrojs/starlight/components';

## Modelo

Singularidade Digital é a **matriz**. Cada produto (integras.digital, futuros) é uma sub-marca **endossada** — herda integralmente DNA visual (paleta, tipografia, princípios).

## Aplicação

```text
<html data-brand="singularidade" data-theme="light">
<html data-brand="integras" data-theme="light">
```

Ambos brands carregam o mesmo magenta `#E91E8B` em `--color-brand-primary` — são da mesma família. Só **logo + nome** mudam.

## Adicionando uma nova sub-marca

1. Criar `packages/tokens/src/brands/<nome>/identity.json`:

   ```jsonc
   {
     "brand": {
       "name": { "$value": "novo.produto", "$type": "string" },
       "id": { "$value": "novo", "$type": "string" },
       "logoSymbol": {
         "$value": "@singularidade/brand-assets/logos/novo/symbol.svg",
         "$type": "asset",
       },
     },
   }
   ```

2. Criar `packages/tokens/src/brands/<nome>/overrides.json` vazio:

   ```json
   {}
   ```

3. Adicionar `nome` no array `BRANDS` do `style-dictionary.config.mjs`.

4. Build: `pnpm --filter @singularidade/tokens build` — gera `nome.{light,dark}.css` automaticamente.

5. Adicionar logos correspondentes em `packages/brand-assets/src/logos/<nome>/`.

<Aside>
Customização pontual (cor primary diferente, tipografia alternativa) vai em `overrides.json`. Manter overrides mínimos preserva DNA da família.
</Aside>

## Por que esse modelo

- **DNA unificada** — qualquer mudança em `core` ou `semantic` propaga pra TODAS as marcas
- **Reconhecimento visual** — usuário sabe que integras é "do mesmo grupo" da Singularidade
- **Setup leve** — adicionar nova marca é 2 arquivos JSON + assets

Veja [ADR-003](/devs/arquitetura/) pra rationale completa.
