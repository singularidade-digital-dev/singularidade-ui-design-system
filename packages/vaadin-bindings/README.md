# @singularidade/vaadin-bindings

Ponte entre os design tokens (`@singularidade/tokens`) e os Vaadin web-components v25 (`--vaadin-*`).

## Uso (Vaadin Flow + Spring Boot)

### Maven

```xml
<dependency>
  <groupId>digital.singularidade</groupId>
  <artifactId>vaadin-bindings</artifactId>
  <version>0.1.0</version>
</dependency>
```

### Aplicar o tema no app

```java
import digital.singularidade.ui.SingularidadeTheme;

@Theme("singularidade")
public class Application implements AppShellConfigurator {
}
```

Ou usar o helper que registra automaticamente fontes + iconset custom:

```java
@Theme("singularidade")
@SingularidadeBrand
public class Application implements AppShellConfigurator {
}
```

### Trocar brand/theme em runtime

```java
UI.getCurrent().getElement().setAttribute("data-brand", "integras");
UI.getCurrent().getElement().setAttribute("data-theme", "dark");
```

## O que está incluso

- `themes/singularidade/styles.css` — importa tokens + brand-assets fontes + mapeia `--color-*` → `--vaadin-*` pra todos os componentes Vaadin v25
- `themes/singularidade/theme.json` — config de tema Vaadin com parent + assets
- Java helpers em `digital.singularidade.ui.SingularidadeTheme` — `@JsModule` annotations para iconset + fonts auto-load

## Cobertura

Todos os componentes Vaadin v25 usados na stack Singularidade:

- Inputs: `vaadin-text-field`, `vaadin-password-field`, `vaadin-integer-field`, `vaadin-number-field`, `vaadin-text-area`, `vaadin-combo-box`, `vaadin-select`, `vaadin-date-picker`, `vaadin-checkbox`
- Actions: `vaadin-button` (primary/secondary/tertiary/error/success), `vaadin-menu-bar`
- Display: `vaadin-avatar`, `vaadin-icon`, `vaadin-progress-bar`
- Layout: `vaadin-vertical-layout`, `vaadin-horizontal-layout`, `vaadin-split-layout`, `vaadin-tabs`
- Overlay: `vaadin-dialog`, `vaadin-notification`, `vaadin-tooltip`, `vaadin-popover`

## Notas técnicas

- Vaadin v25 abandonou Lumo (`--lumo-*`) — nosso bridge é diretamente `--vaadin-*`
- Ver [ADR-006](https://github.com/singularidade-digital-dev/singularidade-ui-design-system/blob/main/docs/adr/ADR-006-storybook-web-components.md) para contexto histórico
