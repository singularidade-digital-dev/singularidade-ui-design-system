# Singularidade Design System

Sistema de design open-source da **Singularidade Digital** — tokens, brand assets e componentes Vaadin Flow consumidos por todos os produtos da empresa (integras.digital e sub-marcas futuras).

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Java](https://img.shields.io/badge/java-21-orange.svg)](https://openjdk.org/)
[![Node](https://img.shields.io/badge/node-%3E%3D20-green.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15-yellow.svg)](https://pnpm.io/)

## Visão geral

Monorepo (pnpm workspaces + Turborepo + Maven multi-module) que entrega três artefatos publicados **lado a lado em npm e Maven Central**, formando uma cadeia de dependências única para garantir consistência visual cross-app:

```
@singularidade/tokens          ─┐
                                │
@singularidade/brand-assets    ─┤──>  @singularidade/vaadin-bindings  ──>  apps Vaadin Flow
                                │
                                ─┘
```

| Pacote                                                       | Descrição                                                                              | Versão           |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ---------------- |
| [`@singularidade/tokens`](packages/tokens)                   | Design tokens W3C (DTF) compilados via Style Dictionary 4 para CSS, JS, JSON e Java    | `0.1.0-SNAPSHOT` |
| [`@singularidade/brand-assets`](packages/brand-assets)       | Logos, fontes, ícones (Lucide + custom) e illustrations                                | `0.1.0-SNAPSHOT` |
| [`@singularidade/vaadin-bindings`](packages/vaadin-bindings) | Tema parente `singularidade-base` que mapeia tokens → `--lumo-*` para Vaadin Flow 24.x | `0.1.0-SNAPSHOT` |

Aplicações Vaadin consomem o design system via [`singularidade-ui-vaadin`](https://github.com/singularidade-digital-dev/singularidade-ui-vaadin) (lib de componentes que estende `singularidade-base`).

## Quick Start

```bash
# Pré-requisitos: Java 21+, Node 20+, pnpm 9+
git clone https://github.com/singularidade-digital-dev/singularidade-ui-design-system.git
cd singularidade-ui-design-system

pnpm install                    # instala deps de todos os pacotes
pnpm build                      # roda Style Dictionary + scripts de assets
mvn install -DskipTests         # publica os 3 JARs no ~/.m2 local
```

## Estrutura

```
singularidade-ui-design-system/
├── apps/
│   └── storybook/             — Storybook 8 (preview de tokens e components)
├── packages/
│   ├── tokens/                — design tokens (3-tier: brand → semantic → component)
│   ├── brand-assets/          — logos, fontes, iconset
│   └── vaadin-bindings/       — parent theme singularidade-base (Vaadin 24)
├── docs/
│   ├── adr/                   — Architecture Decision Records
│   └── superpowers/           — plans, specs, research notes
└── identidade_visual/         — material original (PSDs, exports brutos)
```

## Arquitetura de Tokens (3-tier)

Arquitetura clássica `brand → semantic → component` ([ADR-002](docs/adr/ADR-002-3-tier-tokens.md)):

```
Tier 1: Brand        →  cores cruas (coral.500, neutral.900, ...)
Tier 2: Semantic     →  intent (interactive.primary, surface.base, text.primary, ...)
Tier 3: Component    →  contexto (button.background, card.border, ...)
```

Sub-marcas (Integras, futuras) são overlays sobre os semantic tokens via `[data-brand="X"][data-theme="Y"]` ([ADR-003](docs/adr/ADR-003-sub-brands-overlay.md)). O brand padrão (Singularidade) é carregado por `:root`.

## Comandos comuns

```bash
pnpm build              # build de todos os pacotes (turbo orquestra)
pnpm test               # vitest em todos os pacotes
pnpm lint               # ESLint + Stylelint
pnpm typecheck          # tsc --noEmit
pnpm format             # Prettier
pnpm changeset          # registrar mudança versionável
pnpm release            # publish para npm (após pnpm version-packages)

mvn install             # publica JARs no ~/.m2
mvn install -pl packages/vaadin-bindings -am   # build incremental
```

## Documentação

| Documento                              | Descrição                                          |
| -------------------------------------- | -------------------------------------------------- |
| [docs/adr/](docs/adr/)                 | Architecture Decision Records                      |
| [docs/superpowers/](docs/superpowers/) | Plans, specs, research                             |
| [apps/storybook/](apps/storybook/)     | Preview interativo (`pnpm --filter storybook dev`) |

## Convenções

- **Versionamento:** SemVer via [Changesets](https://github.com/changesets/changesets)
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/) (validados via lefthook + commitlint)
- **Code style:** Prettier + ESLint + Stylelint (auto-format on commit via lefthook)
- **Tokens:** formato W3C DTF (`$value` + `$type`), nunca hardcoded hex/rgb fora de `tokens/`
- **Multi-formato:** todo token gera CSS, JS, JSON e Java constants — uma única fonte de verdade

## Licença

[Apache License 2.0](LICENSE) — © Singularidade Digital
