# Singularidade Design System — design

**Data:** 2026-05-03
**Autor:** singularidade.digital
**Status:** Spec aprovada — pronta pra plano de implementação

---

## 1. Visão geral

Construir o **Singularidade Design System** como repositório novo (`singularidade-ui-design-system`), seguindo padrões de mercado de empresas como Stripe, Shopify, IBM Carbon e Linear. O DS unifica identidade visual, tokens técnicos, componentes, documentação e assets de marca, distribuindo via npm + AWS CodeArtifact + GitHub Pages.

### Por que agora

- A biblioteca atual `singularidade-ui-vaadin` (v0.9.0-SNAPSHOT) é **um design system implícito em código** — ~30 componentes, theme Lumo customizado, validators. Falta a camada de marca/docs/tokens formalizada.
- A identidade oficial (gradient orange #F5A623 → coral #E8606A → magenta #E91E8B) **não bate** com o tema indigo `hsl(234,80%,62%)` em produção. Este trabalho corrige a discrepância.
- Pré-launch: zero clientes reais, janela aberta pra pivotar paleta sem custo de retro-compatibilidade.
- Multi-marca já existe na prática (Singularidade matriz + integras.digital + futuros produtos) — precisa ser modelado explicitamente.

### Escopo (D — Full DS)

Tokens (W3C DTF) · Brand book · Site público de docs · Storybook · Iconografia · Distribuição multi-stack (npm + Maven) · CI/CD com Chromatic + a11y bloqueante · Governança via ADR + Changesets.

### Fora de escopo

- Marketing site público (consumirá tokens via npm no futuro, mas vive em outro repo)
- Mobile native bindings (Swift/Kotlin) — só se houver consumo concreto
- Plugin Figma/Tokens Studio — pode ser fase futura
- Migração do tema Indigo manual antes da v1.0.0 da DS — fica trancada no plano de migração formal

---

## 2. Decisões consolidadas (quick reference)

| Decisão | Escolha |
|---|---|
| Escopo | **D** — Full DS (tokens + brand book + docs + multi-stack) |
| Estratégia de marca | **B** — Sub-marcas endossadas com mesma DNA (Singularidade matriz; integras seguindo o padrão) |
| Direção estética | Linear/Vercel **com paleta da marca real** (não o indigo atual) |
| Reconciliação cor | **Hybrid** — gradient brand em surfaces brand (login/hero); coral primary em UI chrome; chrome neutro |
| Primary do chrome | **Coral** `#E8606A` (light usa coral.600 `#BE3550` mais sóbrio; dark usa coral.400 `#FB7185`) |
| Undertone neutros | **Morno-magenta** (hsl 330) — coeso com paleta warm |
| Intensidade | **Hybrid** — vivid em brand surfaces, deeper shade em CTAs UI |
| Arquitetura | **B** — Multi-output monorepo full Stripe-like (não faseado) |
| Tipografia | Plus Jakarta Sans (sans) + JetBrains Mono (mono), self-hosted via WOFF2 |
| Set de ícones | **Lucide** (~1.500 ícones, MIT) + custom de domínio (`ss:` namespace) |
| Distribuição | npm `@singularidade/*` · Maven CodeArtifact `digital.singularidade:*` · GitHub Pages `ds.singularidade.digital` |
| Versionamento | Changesets com sync npm × Maven via hook custom |

---

## 3. Foundation de marca

### 3.1 Estratégia de sub-marcas

Singularidade Digital é a **matriz**. Cada produto (integras.digital, futuros) é uma sub-marca **endossada** que herda integralmente a paleta, tipografia, princípios de design e componentes — diferenciando-se apenas por logo próprio. Em código, isso é um overlay fino (`identity.json` com path do logo + `overrides.json` vazio quando segue padrão da matriz).

### 3.2 Paleta brand (oficial extraída dos assets)

Trio core: **#F5A623** (orange) · **#E8606A** (coral) · **#E91E8B** (magenta). Gradient brand canônico: `linear-gradient(160deg, #E91E8B 0%, #E8606A 50%, #F5A623 100%)`.

### 3.3 Reconciliação com o tema atual

A paleta indigo `#5b66e8` em `singularidade-ui-vaadin/themes/singularidade/styles.css` será **substituída** por:

- `brand.primary` = `#E91E8B` magenta puro — usado em logo, hero, branded surfaces (não muda entre temas)
- `interactive.primary` = `#BE3550` coral.600 (light) / `#FB7185` coral.400 (dark) — botões, foco, links principais
- `interactive.primary.hover` = `#9F1239` (light) / `#FDA4AF` (dark)
- `interactive.primary.active` = `#E8606A` (volta pro coral pure em ambos os modos)
- `feedback.error` = red puro `#DC2626`/`#F87171` — distingue claramente de coral primary

Status colors (success emerald, warning amber, info blue) permanecem **universais** — não derivam da marca, por acessibilidade/intuição.

### 3.4 Tipografia

- **Sans (display + body):** Plus Jakarta Sans (Variable + Italic, WOFF2)
- **Mono (code, números financeiros, IDs):** JetBrains Mono (Variable + Italic, WOFF2)
- Self-hosted (LGPD-friendly, sem chamadas Google Fonts)
- Type scale modular 1.125 (xs 11 → 7xl 56)
- Font weights: 400/500/600/700

A marca Integras tem fonte oficial marcada como "N/A" — esta spec define Plus Jakarta como display de marca e oficializa.

---

## 4. Arquitetura

### 4.1 Layout do monorepo

```
singularidade-ui-design-system/
├── package.json                    pnpm workspaces root
├── pnpm-workspace.yaml             packages/* + apps/*
├── pom.xml                         Maven aggregator
├── turbo.json                      Turborepo cache + parallel
├── .changeset/                     versionamento
│
├── packages/
│   ├── tokens/                     ⭐ source of truth (W3C DTF)
│   │   ├── src/{core,semantic,component,brands}/
│   │   ├── style-dictionary.config.mjs
│   │   ├── build/{css,js,json,java}/
│   │   ├── package.json            @singularidade/tokens
│   │   └── pom.xml                 digital.singularidade:tokens
│   │
│   ├── brand-assets/               SVGs, favicons, OGs, fonts
│   │   ├── src/{logos,icons,illustrations,og-images,fonts}/
│   │   └── build/ (sprite, iconset Vaadin, JSON catalog, futuro React)
│   │
│   ├── vaadin-bindings/            (Maven only) Java façade pros tokens
│   │
│   └── react-bindings/             (futuro) hooks + CSS-in-JS
│
├── apps/
│   ├── docs/                       ⭐ Astro Starlight (ds.singularidade.digital)
│   │   ├── src/content/docs/       MDX content (PT-BR/EN/ES)
│   │   └── astro.config.mjs        embeda Storybook via iframe
│   │
│   └── storybook/                  Storybook 8 web-components
│       ├── stories/                foundations + components + patterns
│       └── .storybook/main.ts
│
└── .github/workflows/
    ├── ci.yml                      PR: lint, test, build, storybook, a11y, java, size
    ├── release.yml                 main: changesets → npm + Maven + gh release
    ├── docs.yml                    main: astro build → GitHub Pages
    └── maintenance.yml             cron: renovate, security, SBOM, link-check
```

### 4.2 Stack técnico

| Tool | Papel |
|---|---|
| **Style Dictionary 4** | Compila tokens W3C DTF → CSS, JS, Java, JSON multi-platform |
| **Astro Starlight** | Site público de docs (markdown-first, busca, i18n, themeable) |
| **Storybook 8** (`@storybook/web-components-vite`) | Renderiza Vaadin web components nativamente |
| **pnpm workspaces** | Orquestra packages JS |
| **Turborepo** | Cache de builds + paralelização |
| **Changesets** | Versionamento semver + changelog gerado |
| **Chromatic** | Visual regression em cada PR (free tier 5k snapshots/mês) |
| **Pagefind** | Busca client-side no docs (WASM, sem servidor) |
| **Plausible** | Analytics privacy-first (~$5/mês) |
| **AWS CodeArtifact** | Maven registry (existente) |
| **Renovate** | PRs auto pra atualização de deps |
| **commitlint + lefthook** | Conventional Commits + pre-commit hooks |

---

## 5. Modelo de tokens

### 5.1 Camadas (3-tier strict)

1. **Core (primitives)** — valores crus, sem semântica. Paleta completa em escalas 50–950 (mental model Tailwind/Radix), spacing 0–32 (escala 4px), modular type scale, etc. **Imutável a tema.**
2. **Semantic** — intent (theme-aware). `color.brand.primary`, `color.surface.base`, `color.text.primary`, `color.feedback.success.solid`. Resolve diferente em light/dark. **Camada que componentes consomem.**
3. **Component** — scoped a um componente específico quando precisa override pontual. `button.primary.bg`, `card.padding`, `dialog.shadow`.

**Regra de ouro:** componentes nunca consomem core direto — sempre semantic ou component.

### 5.2 Formato

W3C Design Tokens Format (DTF) JSON. Compatível com Style Dictionary, Tokens Studio, Figma plugins, Penpot.

```jsonc
// packages/tokens/src/core/color.json
{
  "color": {
    "magenta": {
      "500": { "$value": "#E91E8B", "$type": "color", "$description": "Brand primary — Singularidade magenta" }
    }
  }
}

// packages/tokens/src/semantic/color.light.json
{
  "color": {
    "brand": {
      "primary": { "$value": "{color.magenta.500}", "$type": "color" }
    }
  }
}
```

### 5.3 Catálogo proposto

- `color.brand.{magenta,coral,orange}.{50..950}` — escalas completas
- `color.neutral.{0..1000}` — warm-tinted (undertone hsl 330) com 11 paradas
- `color.feedback.{success,error,warning,info}.{50..950}` — universais
- `color.gradient.brand` — `linear-gradient(160deg, ...)`
- `size.{0..32}` — escala 4px
- `font.family.{sans,mono}` · `font.size.{xs..7xl}` (modular 1.125) · `font.weight.{regular,medium,semibold,bold}`
- `radius.{none,xs,sm,md,lg,xl,full}` — 0/2/6/8/12/16/9999
- `shadow.{xs,sm,md,lg,xl,2xl}` — light + dark variants
- `duration.{instant,fast,base,slow}` — 0/100/200/400ms
- `easing.{linear,ease-out,ease-in-out,spring}`

### 5.4 Sub-marcas via overlay

```
packages/tokens/src/
├── core/                 ← compartilhado por TODAS as marcas
├── semantic/             ← compartilhado (varia só por mode)
├── component/            ← compartilhado
└── brands/
    ├── singularidade/{identity.json, overrides.json}
    └── integras/{identity.json, overrides.json}
```

Style Dictionary builda 1 conjunto por brand × theme: `singularidade.{light,dark}.css`, `integras.{light,dark}.css`. Vaadin escolhe via `@Theme` ou data-attribute.

---

## 6. Brand book

10 capítulos publicados em `apps/docs/src/content/docs/marca/`:

1. **Identidade & manifesto** — quem é, missão, propósito (1 página)
2. **Logo & lockups** — variações (símbolo, horizontal, vertical, monocromático), clear space (1× altura do símbolo), tamanho mínimo (24px web, 32px+ ideal), 4 don'ts visuais
3. **Cor** — paleta core/semantic/gradient, tabela de contraste WCAG, do/don't
4. **Tipografia** — Plus Jakarta + JetBrains, scale visual, hierarquia, tracking, line-height
5. **Voice & tone** — 4 princípios (direto · respeitoso · confiante mas humano · PT-BR primeira classe), tabela de microcopy padrão (estado vazio, erro, confirmar destrutivo, sucesso, CTA)
6. **Motion & interaction** — 5 princípios (purposeful · fast ≤300ms · easing natural · respeita prefers-reduced-motion · 60fps só transform/opacity)
7. **Iconografia** — Lucide base + custom `ss:` namespace, specs (viewBox 24, stroke 1.5, round, currentColor)
8. **Ilustração & imagem** — estilo geométrico isométrico (herda do logo cubo), regras de fotos
9. **Layout & grid** — breakpoints, grid 12-col, container widths, spacing rhythm
10. **Acessibilidade** — WCAG 2.2 AA mínimo (AAA quando viável), contraste 4.5:1, focus ring 2px, touch ≥44px, cor nunca sozinha, lang attribute

---

## 7. Asset library

`packages/brand-assets/`:

```
src/
├── logos/
│   ├── singularidade/{symbol,horizontal,vertical,monochrome}.svg + icon-{16,32,180,512}.png
│   └── integras/{symbol,horizontal,vertical,monochrome}.svg + idem
├── icons/
│   ├── lucide/                 re-export do lucide-static (subset usado)
│   └── custom/                 ~10 ícones de domínio sob `ss:` namespace
│       ├── tenant.svg
│       ├── mcp-server.svg
│       ├── tool.svg
│       ├── eula-{signed,pending}.svg
│       ├── provisioning.svg
│       ├── billing-cycle.svg
│       ├── tax-id.svg
│       └── integration-pending.svg
├── illustrations/              estilo geométrico isométrico
│   └── {empty-state-tenants, 404, 500, onboarding-{1,2,3}}.svg
├── og-images/                  Open Graph 1200×630
└── fonts/
    ├── PlusJakartaSans-{Variable,Italic}.woff2
    └── JetBrainsMono-{Variable,Italic}.woff2

build/                          gerado via script
├── icons.svg-sprite.svg        single sprite (1 HTTP req)
├── vaadin-iconset.js           registra "ss:*" no <vaadin-icon>
├── icons.json                  catálogo machine-readable
└── react/                      (futuro) IconTenant.tsx tree-shakable
```

Workflow de adicionar custom icon: PR adiciona SVG no padrão Lucide → SVGO otimiza no pre-commit → build regenera sprite/iconset → Storybook auto-publica → Changeset publica no próximo release.

---

## 8. Storybook

Renderer `@storybook/web-components-vite` (Vaadin é web-components). Stories em TypeScript usando Lit `html` tagged template.

### 8.1 Cobertura prevista (~50 stories no go-live)

- **Foundations (6 pages):** Tokens explorer · Color · Typography · Spacing · Motion · Accessibility
- **Vaadin core (~25 components):** inputs (text-field, password-field, integer-field, combobox, date-picker…), actions (button, menu-bar), display (badge, avatar, icon, progress-bar), layout (grid, vertical/horizontal-layout, split-layout, tabs), overlay (dialog, notification, tooltip, popover)
- **Singularidade UI (~12 components):** BoundFormPanel · ProfileEditCard · AvatarUploadField · AddressField · PhoneField · TaxIdField · CountrySelect · EulaAcceptancePanel · LgpdFooter · UserMenu · BaseAdminLayout · BaseLoginView
- **Patterns / recipes (~8):** Login · CRUD page · Empty state · Error state · Onboarding wizard · Dashboard · Settings page · Notification stack

### 8.2 Addons essenciais

- `@storybook/addon-docs` — MDX docs ao lado de cada story
- `@storybook/addon-a11y` — axe-core inline; **bloqueia merge** se introduzir violação
- `@storybook/addon-themes` — toggle light/dark + brand selector
- `@storybook/addon-viewport` — mobile/tablet/desktop sizes
- `storybook-addon-pseudo-states` — força `:hover`/`:focus`/`:active`
- `chromatic` — visual regression em cada PR

---

## 9. Docs site (ds.singularidade.digital)

### 9.1 Sitemap (6 seções top-level + landing)

```
ds.singularidade.digital/
├── /                                Landing — manifesto + hero gradient + quick links
├── /comecar/                        visao-geral · instalacao · primeiro-componente
├── /marca/                          brand book (10 capítulos)
├── /foundations/                    tokens · DTF · tema · multi-marca
├── /componentes/                    primitivos · compostos · padroes (embeda Storybook)
├── /devs/                           vaadin-flow · react-marketing · contribuir · arquitetura · api
└── /releases/                       changelog automatizado + migration guides
```

### 9.2 Templates por tipo de página

| Template | Onde | Componentes-chave |
|---|---|---|
| Landing | `/` | Hero gradient + 6 cards + version badge |
| Brand page | `/marca/*` | Texto-heavy, do/don't grids, downloads |
| Foundation page | `/foundations/*` | Token explorer interativo, copy-to-clipboard |
| Component page | `/componentes/*` | Storybook iframe + props + uso Java + a11y |
| Dev guide | `/devs/*` | Code-heavy, syntax highlight, copy buttons |
| Release notes | `/releases/v*` | Changelog auto-gerado, breaking changes destacados |

### 9.3 Busca · i18n · versionamento

- **Busca:** Pagefind (open-source, WASM client-side, sem hosting, atalho `⌘K`)
- **i18n:** PT-BR (padrão · primeira classe) + EN + ES (Starlight i18n built-in)
- **Multi-version:** `ds.singularidade.digital` = latest; `v0.X.singularidade.digital` = histórico arquivado

---

## 10. Distribuição & migração

### 10.1 Canais

```
PR + Changeset → tag → release
       │
       ├──→ npm registry (@singularidade/tokens, /brand-assets, /react-bindings*)
       ├──→ AWS CodeArtifact (digital.singularidade:tokens, vaadin-bindings)
       └──→ GitHub Pages (ds.singularidade.digital + v0.X arquivada)
```

Hook custom no Changesets dispara `mvn versions:set -DnewVersion=<npm-version>` antes do publish Maven — versão sincronizada nos dois canais.

### 10.2 Versionamento

| Bump | Quando |
|---|---|
| **patch** | Bug fix, ajuste sem afetar API |
| **minor** | Novo token/asset/ícone, backwards-compatible |
| **major** | Breaking — token removido/renomeado, mudança de paleta |

**Pré-launch:** `v0.x` permite breaking livre (sem clientes reais). `v1.0.0` sai junto do go-live e trava semver.

### 10.3 Plano de migração — 5 etapas (~5-6 semanas total)

1. **Build & publish DS v0.1.0** (~2 sem) — monorepo setup, todos os tokens, Style Dictionary, brand book Astro online, Storybook foundations + Vaadin core, primeiras 4 patterns. CI publica.
2. **Migrar `singularidade-ui-vaadin`** (~3 dias) — adiciona `digital.singularidade:tokens` em pom.xml, substitui ~600 valores hardcoded em `themes/singularidade/styles.css` por `var(--color-brand-...)`, Java code que precisa de cores em runtime usa `SingularidadeTokens.colorBrandPrimary()`. Bumpa pra v1.0.0 (breaking).
3. **Migrar apps consumidores** (~1 dia cada) — `integras-digital` + `integras-digital-plataform` bumpam pom.xml, ajustam temas customizados, smoke test visual em dev (golden path + estados), deploy staging primeiro. **Checkpoint humano:** confirmar mudança de paleta indigo→coral nas telas críticas.
4. **Storybook completo + Chromatic** (~2 sem) — stories pra todos os componentes commons-ui + 8 patterns; baseline Chromatic; CI bloqueia PRs com diff visual não aprovado.
5. **Go-live → v1.0.0** (~3 dias) — bump de `0.9.x` → `1.0.0` em todos os pacotes; domínio público apontado; anúncio.

### 10.4 Rollback

Cada app consumidor é deployado independentemente. Se `tokens@0.5.0` quebra `integras-digital-plataform`: pin temporário da versão anterior em `singularidade-ui-vaadin` → hotfix no monorepo → publish patch → apps re-bumpam normalmente. CodeArtifact e npm mantêm versões antigas indefinidamente.

---

## 11. CI/CD & governança

### 11.1 Workflows GitHub Actions

| Workflow | Trigger | Jobs |
|---|---|---|
| `ci.yml` | on PR | lint, typecheck, test, build, storybook, a11y, java-build, size |
| `release.yml` | on push main | Changesets → bump versions → CHANGELOG → tag → npm publish (provenance) → Maven publish → gh release |
| `docs.yml` | on push main | astro build → embed Storybook → pagefind index → GitHub Pages |
| `maintenance.yml` | cron weekly | Renovate · npm audit · OWASP · SBOM CycloneDX · link-check |

### 11.2 Branch protection (`main`)

PR obrigatório · 8 status checks bloqueantes (todos os jobs do ci.yml) · branch up-to-date · linear history · squash ou rebase merge · Conventional Commits validados · signed commits · force push proibido · self-merge permitido enquanto solo dev (revisar quando time crescer).

### 11.3 Quality gates bloqueantes

| Gate | Limite | Tool |
|---|---|---|
| Type errors | 0 | tsc |
| Lint warnings | 0 | eslint, stylelint |
| Test failures | 0 | vitest, JUnit |
| A11y violations | 0 | @storybook/test-runner + axe |
| Visual regression | aprovação obrigatória | Chromatic |
| Bundle size | tokens.js ≤ 8kb gzip | size-limit |
| Changeset (se publicável) | obrigatório | @changesets/cli |
| Conventional Commits | título + commits | commitlint |

### 11.4 Governança

- **ADRs** em template MADR sob `docs/adr/`. Auto-publica em `/devs/arquitetura/`. ADRs iniciais: escolha de Lucide; modelo 3-tier; sub-marcas via overlay; hybrid color (brand puro em surfaces brand); Pagefind sobre Algolia; Storybook 8 web-components.
- **CONTRIBUTING.md** com 3 fluxos documentados: adicionar token · adicionar ícone custom · adicionar/alterar componente.
- **Templates de PR/Issue** em `.github/`.

### 11.5 Observabilidade pós go-live

- **Adoção:** npm download stats + Maven CodeArtifact CloudWatch
- **Tráfego docs:** Plausible.io (privacy-first, GDPR/LGPD ready, sem cookies, ~$5/mês)
- **Saúde:** Turbo cache hit rate · tempo de release · CI green rate · MTTR de bugs

---

## 12. Critérios de sucesso

- ✅ Tema indigo atual completamente substituído pela paleta de marca real (coral/magenta/orange)
- ✅ `singularidade-ui-vaadin` v1.0.0 consome tokens via dependência (zero valor hardcoded)
- ✅ `ds.singularidade.digital` público com 6 seções, busca funcional, dark mode, i18n PT-BR
- ✅ Storybook com ≥40 stories cobrindo foundations + Vaadin core + Singularidade UI
- ✅ Chromatic baseline criado · CI bloqueia regressão visual
- ✅ A11y axe = 0 violations em 100% das stories
- ✅ Apps consumidores (`integras-digital`, `integras-digital-plataform`) deployam OK em staging com nova paleta
- ✅ Pelo menos 6 ADRs documentados em `docs/adr/`
- ✅ CONTRIBUTING.md com 3 fluxos testados (token, ícone, componente)
- ✅ Tempo de release < 5 min (PR Changesets → npm + Maven publicados)

---

## 13. Pontos em aberto (a resolver na implementação)

1. **Subdomínio `ds.singularidade.digital`** — criar registro DNS (CNAME apontando pro GitHub Pages) e configurar custom domain no settings do repo. Trivial, mas precisa estar pronto antes do go-live.
2. **Plausible.io** — precisa decidir entre self-host vs cloud ($5/mês). Cloud é mais simples; self-host alinha com filosofia "dados em casa".
3. **Conta Chromatic** — Free tier (5k snapshots/mês) suficiente; conta a ser criada com email da org.
4. **Acesso ao repo do `singularidade-ui-vaadin`** — o sync de versão Maven ↔ npm requer permissão de publish em CodeArtifact (já existente).
5. **Definir PT-BR como `lang` default** vs detectar via Accept-Language — Starlight suporta ambos; decidir no PR de setup do docs.
6. **Lista exata de componentes da `singularidade-ui-vaadin` a documentar** — fazer auditoria no início da Etapa 4 da migração; spec lista os 12 conhecidos hoje, mas pode haver mais.
7. **Política de breaking changes pós-v1.0.0** — janela de deprecation, comunicação aos consumidores. Tópico de ADR após go-live.

---

## Apêndice A — referências de mercado

- **Stripe**: brand purple em marketing/hero; chrome neutro com roxo/azul accent no app
- **Shopify Polaris**: enterprise, tokens W3C, Storybook público
- **IBM Carbon**: 3-tier tokens estrito, ADRs públicos
- **Linear**: Storybook web components, dark-first, Chromatic
- **Vercel/Geist**: monorepo pnpm + Turborepo + Astro Starlight (referência direta)
- **Shadcn**: ícones Lucide, design tokens via CSS variables
- **Resend**: similar setup (npm + Maven no equivalente Python), pré-launch
