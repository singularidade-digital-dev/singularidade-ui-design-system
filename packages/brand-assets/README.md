# @singularidade/brand-assets

Brand logos, icons, fonts, illustrations e OG images da Singularidade Digital + sub-marcas.

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
└── fonts/                      — Plus Jakarta Sans + JetBrains Mono WOFF2

build/                          — gerado via scripts (sprite, iconset, catalog)
├── icons.svg-sprite.svg        — sprite consolidado (1 HTTP req)
├── vaadin-iconset.js           — registra ss:* no <vaadin-icon>
└── icons.json                  — catálogo machine-readable
```

## Uso

### Logos (HTML/CSS)

```html
<img
  src="@singularidade/brand-assets/logos/singularidade/horizontal.svg"
  alt="Singularidade Digital"
/>
<img src="@singularidade/brand-assets/logos/integras/symbol.svg" alt="Integras" />
```

### Logos (currentColor)

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

### Custom icons (Vaadin)

```js
import '@singularidade/brand-assets/build/vaadin-iconset.js';
```

```html
<vaadin-icon icon="ss:tenant"></vaadin-icon>
```

## Notas

- Logos contêm gradient brand canônico (`#E91E8B` → `#E8606A` → `#F5A623`).
- Lockups horizontais/verticais usam `<text>` em Plus Jakarta Sans Bold; consumir junto com `fonts/plus-jakarta-sans.css` pra render fiel.
- `monochrome.svg` usa `currentColor` — herda cor do contexto CSS.
