# @singularidade/brand-assets

## 0.1.0

### Minor Changes

- Initial release of `@singularidade/brand-assets` — logos, ícones, fontes, illustrations da Singularidade Digital.

  Inclui:
  - Logos vetoriais por brand (Singularidade cubo isométrico + Integras X chevrons) com gradient brand canônico (`#E91E8B` → `#E8606A` → `#F5A623`)
  - Variantes: `symbol`, `horizontal`, `vertical`, `monochrome` (currentColor) por brand
  - PNG icons em 16/32/180/512px derivados via Sharp
  - Fontes WOFF2 self-hosted: Plus Jakarta Sans Variable + JetBrains Mono Variable (latin + latin-ext, normal + italic) com CSS @font-face autônomo
  - Lucide icons subset (71 ícones curados pra apps SaaS)
  - Ícones custom de domínio sob namespace `ss:*` (10 ícones: tenant, mcp-server, tool, eula-signed, eula-pending, provisioning, billing-cycle, tax-id, integration-pending, compliance) no padrão Lucide (24×24, stroke 1.5, currentColor)
  - Build pipeline: sprite SVG consolidado, Vaadin iconset (`<vaadin-icon icon="ss:..."/>`), JSON catalog machine-readable
  - Distribuição dual: npm `@singularidade/brand-assets` + Maven `digital.singularidade:brand-assets` (recursos em `META-INF/resources/brand-assets/`)
