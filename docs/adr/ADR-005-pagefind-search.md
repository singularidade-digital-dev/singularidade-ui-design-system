# ADR-005: Pagefind como motor de busca

- **Status:** accepted
- **Date:** 2026-05-03
- **Deciders:** singularidade.digital

## Contexto

Site de docs precisa de busca decente — usuário esperando ⌘K. Opções variam de "indexa client-side" a "API hosted com analytics".

## Decisão

**Pagefind** — busca client-side via WebAssembly. Index gerado no build, servido como arquivos estáticos. Zero hosting, zero billing.

## Alternativas consideradas

| Solução                              | Pros                                                                         | Contras                               |
| ------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------- |
| **Pagefind** ✓                       | Open source, WASM client-side, zero infra, ⌘K nativo, sem analytics tracking | Index sobe um pouco o bundle (~300KB) |
| Algolia DocSearch (free)             | UI elegante, fast, hosting grátis pra OSS                                    | Análises tracked, mais infra          |
| Algolia paid                         | Production-ready                                                             | Custo recorrente                      |
| Lunr.js                              | JS puro, leve                                                                | Performance pior que Pagefind         |
| Browser-native search                | Zero deps                                                                    | Match exato apenas, sem ranking       |
| Custom (Postgres FTS, Elasticsearch) | Total controle                                                               | Infra complexa pra benefício marginal |

## Consequências

**Positivas:**

- Privacidade: index roda no client, nada vai pra terceiros
- Zero infra: arquivos servidos do GitHub Pages como qualquer asset
- Build automático: `pagefind --site dist` no postbuild
- ⌘K nativo: integração com Starlight

**Negativas:**

- Index pesa ~300KB (WASM + dados) — primeiro load mais lento
- Sem analytics de query (decisão deliberada — privacy first)
- Sem typo tolerance avançada (faz fuzzy básico)

## Implementação

```bash
# package.json scripts
"build": "astro build && pagefind --site dist"
```

Starlight detecta `dist/pagefind/` automaticamente e ativa busca via ⌘K.

## Referências

- [Pagefind](https://pagefind.app/)
- [Starlight + Pagefind integration](https://starlight.astro.build/guides/site-search/)
