# @singularidade/vaadin-bindings

Tema parente Vaadin Flow `singularidade-base` — ponte entre [`@singularidade/tokens`](../tokens) (`--color-*`) e os Vaadin web-components 25.x (`--lumo-*`).

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](../../LICENSE)
[![Vaadin Flow](https://img.shields.io/badge/vaadin--flow-25.2-blue.svg)](https://vaadin.com/flow)

## Visão geral

Vaadin Flow apps usam o sistema de [parent themes](https://vaadin.com/docs/latest/styling/custom-theme) — um tema pode estender outro. Esta lib publica `singularidade-base` como JAR (`META-INF/resources/themes/singularidade-base/`) para que apps consumidoras o referenciem como parent:

```json
// frontend/themes/<seu-tema>/theme.json
{ "parent": "singularidade-base" }
```

O `singularidade-base` carrega o tema gerado dos tokens (`tokens/theme.css`), as fontes, e mapeia os `--lumo-*` usados pelos componentes Vaadin e as style properties do Vaadin 25 (`--vaadin-*`) para os tokens semânticos — claro e escuro, com o Integras como marca padrão.

## Instalação

```xml
<dependency>
  <groupId>digital.singularidade</groupId>
  <artifactId>vaadin-bindings</artifactId>
  <version>1.0.0</version>
</dependency>
```

(Inclui transitivamente `@singularidade/tokens` e `@singularidade/brand-assets`.) Publicado no AWS CodeArtifact; ainda não está no npm. A biblioteca `singularidade-ui-vaadin` 2.1.0 já declara a 1.0.0.

## Uso

### 1. Declare o parent

```json
// src/main/frontend/themes/<seu-tema>/theme.json
{
  "parent": "singularidade-base"
}
```

### 2. Aplique no shell da aplicação

```java
@Theme("seu-tema")
@StyleSheet(Lumo.UTILITY_STYLESHEET) // utility classes: o único módulo Lumo que não vem sozinho no 25
public class Application implements AppShellConfigurator {
}
```

### 3. (Opcional) Toggle light/dark

```java
import com.vaadin.flow.component.page.ColorScheme;

// Light = default
UI.getCurrent().getPage().setColorScheme(ColorScheme.Value.LIGHT);

// Dark: theme="dark" no <html>
UI.getCurrent().getPage().setColorScheme(ColorScheme.Value.DARK);
```

O `theme` vai no `<html>`, onde o `setColorScheme` do Vaadin 25 o põe. `UI.getCurrent().getElement()` é o `<body>`: com o atributo só nele, o `<html>` fica claro (fundo fora do `<body>` e barra de rolagem) e as regras `html[theme~='dark']` da ponte não valem.

### 4. (Opcional) Marca Singularidade

O Integras é a marca padrão. `data-brand="singularidade"` troca só as três cores da marca (`--color-brand-primary`, `-secondary` e `-tertiary`) para a paleta original da Singularidade; o resto do tema é igual nas duas marcas.

```java
UI.getCurrent().getElement().setAttribute("data-brand", "singularidade");
```

## Como funciona

```
themes/singularidade-base/
├── styles.css                  — ponte: tokens → --lumo-* e --vaadin-*
├── theme.json                  — config Vaadin (sem lumoImports; parent serve tudo)
├── tokens/
│   └── theme.css               — gerado de @singularidade/tokens em build time
└── fonts/                      — copiado de @singularidade/brand-assets em build time
```

O `pom.xml` puxa `tokens/build/css/theme.css` e `brand-assets/src/fonts/*` dos pacotes-irmãos no `process-resources`, então não há duplicação de source-of-truth: tokens vivem em `@singularidade/tokens`, fontes em `@singularidade/brand-assets`. As cores do `styles.css` vêm dos tokens, inclusive os degraus de transparência do Lumo (`color-mix()` sobre o token); só os degraus de branco (claro) e de preto (escuro) do Lumo ficam fixos. Os quatro `{marca}.{tema}.css` do pacote de tokens ficam de fora do JAR: dependem de `data-brand` + `data-theme` e servem os sites.

### O que a ponte mapeia

| Vaadin / Lumo                                                                          | Token                                                                 |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `--lumo-primary-color`, `--lumo-primary-text-color`                                    | `--color-interactive-primary`                                         |
| `--lumo-primary-contrast-color`                                                        | `--color-on-primary`                                                  |
| `--lumo-{error,success,warning}-color`                                                 | `--color-feedback-*-solid`                                            |
| `--lumo-{error,success,warning}-text-color`                                            | `--color-feedback-*-text`                                             |
| `--lumo-{error,success,warning}-contrast-color`                                        | `--color-on-status`                                                   |
| `--lumo-link-color`                                                                    | `--color-link`                                                        |
| `--lumo-box-shadow-{xs,s,m,l,xl}`                                                      | `--shadow-{xs,sm,md,lg,xl}` (um valor por tema)                       |
| `--lumo-*-text-color`, `--lumo-contrast-*`, `--lumo-base-color`                        | `--color-text-*`, `--color-surface-base`                              |
| `--vaadin-focus-ring-color` (largura 2px)                                              | `--color-border-focus`                                                |
| `--vaadin-input-field-border-color` (largura 1px), `-background`                       | `--input-border` (= `--color-border-control`), `--input-background`   |
| `--lumo-font-family`, `--lumo-font-size-*`, `--lumo-border-radius-*`, `--lumo-space-*` | `--font-family-sans`, `--font-size-*` (rem), `--radius-*`, `--size-*` |

## Trigger de dark mode

Suportado via dois seletores (conviventes):

| Seletor               | Quando usar                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `[theme~='dark']`     | Vaadin Flow: `theme="dark"` no `<html>` (`Page.setColorScheme(ColorScheme.Value.DARK)`)                                               |
| `[data-theme='dark']` | Páginas e regiões que trocam o tema via `data-theme` (inclusive uma faixa clara com `data-theme='light'` dentro de uma página escura) |

## Cobertura de componentes

Mapeamento completo dos `--lumo-*` usados por todos os componentes Vaadin 25.x:

- **Inputs:** text-field, password-field, integer-field, number-field, text-area, combo-box, select, date-picker, time-picker, checkbox, radio-button
- **Actions:** button (primary/secondary/tertiary/error/success), menu-bar, context-menu
- **Display:** avatar, icon, progress-bar, badge
- **Layout:** vertical-layout, horizontal-layout, split-layout, tabs, accordion, details
- **Overlay:** dialog, notification, tooltip, popover, confirm-dialog
- **Data:** grid, virtual-list, tree-grid

## Notas técnicas

- **Vaadin 25:** o Lumo continua (o 25.0 removeu o Material, não o Lumo), então o bridge segue mapeando `--lumo-*`. Duas mudanças do 25 que afetam quem consome este tema:
  - `lumoImports` no `theme.json` agora **quebra o build** — os módulos do Lumo carregam sozinhos quando o tema estende o Lumo; só as utility classes precisam de `@StyleSheet(Lumo.UTILITY_STYLESHEET)` no shell (padrão de `integras-digital` e `integras-digital-plataform`);
  - `@Theme`/`theme.json` estão deprecated (ainda funcionam no 25.x; saem no 26).
- **Dependência transitiva:** apps que adicionem `vaadin-bindings` ganham automaticamente `@singularidade/tokens` e `@singularidade/brand-assets` no classpath
- **Spring Security:** o tema serve assets em `/themes/singularidade-base/**`, path liberado por padrão pelo Vaadin

## Licença

Apache License 2.0 — © Singularidade Digital
