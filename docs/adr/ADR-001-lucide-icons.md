# ADR-001: Lucide como biblioteca de ícones

- **Status:** accepted
- **Date:** 2026-05-03
- **Deciders:** singularidade.digital

## Contexto

Apps SaaS precisam de ~50–100 ícones cobrindo navigation, actions, status, conteúdo. Construir do zero é caro; escolher biblioteca de terceiros tem trade-offs (qualidade, licença, manutenção).

## Decisão

Usar **Lucide** como base, com subset curado de ~70 ícones em `packages/brand-assets/src/icons/lucide/`. Adicionar ~10 ícones custom de domínio Singularidade sob namespace `ss:*` no mesmo padrão.

## Alternativas consideradas

| Lib            | Pros                                                         | Contras                                           |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------- |
| **Lucide** ✓   | MIT, 1500+ ícones, padrão consistente, fork ativo do Feather | Estilo estritamente line (sem fill)               |
| Heroicons      | Tailwind community, line + solid                             | 270 ícones, dependência Tailwind                  |
| Phosphor       | 6 estilos por ícone, 9000+ variantes                         | Excesso de variação, decisão por estilo é fricção |
| Tabler         | 4500+ ícones                                                 | Heavier visual weight                             |
| Font Awesome   | Mais conhecido                                               | Free tier limitado, "old web" feel                |
| Material Icons | Padrão Google                                                | Estilo Material (não combina com brand geometric) |

## Consequências

**Positivas:**

- Estilo único e consistente (line, stroke 1.5, round caps)
- Subset curado evita bundle bloat
- Custom `ss:*` icons no mesmo padrão = visual coerente
- Lucide tem fork ativo, comunidade engajada

**Negativas:**

- Sem fill icons (decisão deliberada — manter sobriedade)
- Subset pode ficar desatualizado (Lucide v0.469 renomeou alguns)

## Implementação

- `packages/brand-assets/scripts/copy-lucide-subset.mjs` define o subset
- Custom em `src/icons/custom/<nome>.svg` (ViewBox 24×24, stroke 1.5)
- Build pipeline gera sprite + Vaadin iconset + JSON catalog

## Referências

- [Lucide GitHub](https://github.com/lucide-icons/lucide)
- [Marca / Iconografia](/marca/07-iconografia/)
