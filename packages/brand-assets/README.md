# @singularidade/brand-assets

Logos, fontes, ícones e illustrations oficiais da **Singularidade Digital** e sub-marcas (Integras), empacotados como recursos reutilizáveis para web e Java.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](../../LICENSE)

## Conteúdo

```
src/
├── logos/
│   ├── singularidade/{symbol,horizontal,vertical,monochrome}.svg + icon-{16,32,180,512}.png
│   └── integras/{symbol,horizontal,vertical,monochrome}.svg + icon-{16,32,180,512}.png
├── icons/
│   ├── lucide/                 — re-export do subset Lucide usado
│   └── custom/                 — ícones de domínio sob namespace ss:* (~10 ícones)
├── illustrations/              — illustrations isométricas (futuras)
├── og-images/                  — Open Graph 1200×630 (futuras)
└── fonts/                      — Plus Jakarta Sans + JetBrains Mono WOFF2 variable

build/                          — gerado via scripts (sprite, iconset, catalog)
├── icons.svg-sprite.svg        — sprite consolidado (1 HTTP req)
├── vaadin-iconset.js           — registra ss:* no <vaadin-icon>
└── icons.json                  — catálogo machine-readable
```

## Instalação

### npm/pnpm

```bash
pnpm add @singularidade/brand-assets
```

### Maven

```xml
<dependency>
  <groupId>digital.singularidade</groupId>
  <artifactId>brand-assets</artifactId>
  <version>0.1.0</version>
</dependency>
```

## Uso

### Logos (HTML)

```html
<img
  src="@singularidade/brand-assets/logos/singularidade/horizontal.svg"
  alt="Singularidade Digital"
/>
<img src="@singularidade/brand-assets/logos/integras/symbol.svg" alt="Integras" />
```

### Logos monocromáticos (`currentColor`)

```html
<svg style="color: var(--color-text-primary)">
  <use href="@singularidade/brand-assets/logos/singularidade/monochrome.svg#root" />
</svg>
```

### Fonts

```css
@import '@singularidade/brand-assets/fonts/plus-jakarta-sans.css';
@import '@singularidade/brand-assets/fonts/jetbrains-mono.css';
```

### Custom icons (Vaadin Flow)

```js
import '@singularidade/brand-assets/build/vaadin-iconset.js';
```

```html
<vaadin-icon icon="ss:tenant"></vaadin-icon> <vaadin-icon icon="ss:module"></vaadin-icon>
```

### Java (Spring Boot classpath)

Os recursos são empacotados em `META-INF/resources/brand-assets/...` — qualquer Spring Boot serve automaticamente. Use:

```html
<img src="/brand-assets/logos/singularidade/horizontal.svg" />
<img src="/brand-assets/icons.svg-sprite.svg" />
```

## Notas técnicas

- **Gradient brand canônico:** `#E91E8B` → `#E8606A` → `#F5A623` (presente nos logos coloridos)
- **Lockups horizontais/verticais** usam `<text>` em Plus Jakarta Sans Bold; importe `fonts/plus-jakarta-sans.css` junto para render fiel
- **`monochrome.svg`** usa `currentColor` — herda cor do contexto CSS
- **Fontes WOFF2 variable** com unicode-range otimizado (latin + latin-ext)
- **Lucide subset:** apenas os ícones em uso são copiados ([ADR-001](../../docs/adr/ADR-001-lucide-icons.md)) — reduz bundle

## Build

```bash
pnpm build              # build:pngs + build:fonts + build:lucide + build:sprite + build:iconset + build:catalog
pnpm test               # vitest
```

Scripts individuais:

```bash
pnpm build:pngs         # gera icon-{16,32,180,512}.png a partir dos SVGs
pnpm build:fonts        # copia fontes WOFF2 + gera CSS @font-face
pnpm build:lucide       # copia subset Lucide
pnpm build:sprite       # consolida custom icons em sprite SVG
pnpm build:iconset      # gera vaadin-iconset.js
pnpm build:catalog      # gera icons.json
```

## Licença

Apache License 2.0 — © Singularidade Digital
