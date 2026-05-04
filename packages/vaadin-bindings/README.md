# @singularidade/vaadin-bindings

Tema parente Vaadin Flow `singularidade-base` — ponte entre [`@singularidade/tokens`](../tokens) (`--color-*`) e os Vaadin web-components 24.x (`--lumo-*`).

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](../../LICENSE)
[![Vaadin Flow](https://img.shields.io/badge/vaadin--flow-24.9-blue.svg)](https://vaadin.com/flow)

## Visão geral

Vaadin Flow apps usam o sistema de [parent themes](https://vaadin.com/docs/latest/styling/custom-theme) — um tema pode estender outro. Esta lib publica `singularidade-base` como JAR (`META-INF/resources/themes/singularidade-base/`) para que apps consumidoras o referenciem como parent:

```json
// frontend/themes/<seu-tema>/theme.json
{ "parent": "singularidade-base" }
```

O `singularidade-base` carrega tokens, fontes e mapeia automaticamente todos os `--lumo-*` usados pelos componentes Vaadin para os `--color-*` semantic dos tokens — incluindo light/dark e brand override em runtime.

## Instalação

```xml
<dependency>
  <groupId>digital.singularidade</groupId>
  <artifactId>vaadin-bindings</artifactId>
  <version>0.1.0</version>
</dependency>
```

(Inclui transitivamente `@singularidade/tokens` e `@singularidade/brand-assets`.)

## Uso

### 1. Declare o parent

```json
// src/main/frontend/themes/<seu-tema>/theme.json
{
  "parent": "singularidade-base",
  "lumoImports": ["typography", "color", "spacing", "badge", "utility"]
}
```

### 2. Aplique no shell da aplicação

```java
@Theme("seu-tema")
public class Application implements AppShellConfigurator {
}
```

### 3. (Opcional) Toggle light/dark

```java
// Light = default
UI.getCurrent().getElement().removeAttribute("theme");

// Dark
UI.getCurrent().getElement().setAttribute("theme", "dark");
```

### 4. (Opcional) Trocar brand em runtime

```java
UI.getCurrent().getElement().setAttribute("data-brand", "integras");
UI.getCurrent().getElement().setAttribute("data-theme", "dark");
```

## Como funciona

```
themes/singularidade-base/
├── styles.css                  — bridge (--color-* → --lumo-*) + dark overrides
├── theme.json                  — config Vaadin (lumoImports vazio, parent serve tudo)
├── tokens/
│   ├── defaults.css            — token semantic baseline (Singularidade light + dark overrides)
│   └── {brand}.{theme}.css     — gerado de @singularidade/tokens em build time
└── fonts/                      — copiado de @singularidade/brand-assets em build time
```

O `pom.xml` puxa `tokens/build/css/*` e `brand-assets/src/fonts/*` dos pacotes-irmãos no `process-resources`, então não há duplicação de source-of-truth: tokens vivem em `@singularidade/tokens`, fontes em `@singularidade/brand-assets`. Apenas `defaults.css` (mapping semantic → Lumo) é hand-crafted.

## Trigger de dark mode

Suportado via dois seletores (conviventes):

| Seletor               | Quando usar                                                         |
| --------------------- | ------------------------------------------------------------------- |
| `[theme~='dark']`     | Vaadin Flow padrão (`element.setAttribute('theme', 'dark')`)        |
| `[data-theme='dark']` | Apps que controlam brand+theme via `data-*` attrs (multi-brand SPA) |

## Cobertura de componentes

Mapeamento completo dos `--lumo-*` usados por todos os componentes Vaadin 24.x:

- **Inputs:** text-field, password-field, integer-field, number-field, text-area, combo-box, select, date-picker, time-picker, checkbox, radio-button
- **Actions:** button (primary/secondary/tertiary/error/success), menu-bar, context-menu
- **Display:** avatar, icon, progress-bar, badge
- **Layout:** vertical-layout, horizontal-layout, split-layout, tabs, accordion, details
- **Overlay:** dialog, notification, tooltip, popover, confirm-dialog
- **Data:** grid, virtual-list, tree-grid

## Notas técnicas

- **Vaadin 25 (futuro):** quando migrar, o bridge precisará apontar para `--vaadin-*` (Lumo será removido). Plano em [docs/adr/](../../docs/adr/)
- **Dependência transitiva:** apps que adicionem `vaadin-bindings` ganham automaticamente `@singularidade/tokens` e `@singularidade/brand-assets` no classpath
- **Spring Security:** o tema serve assets em `/themes/singularidade-base/**`, path liberado por padrão pelo Vaadin

## Licença

Apache License 2.0 — © Singularidade Digital
