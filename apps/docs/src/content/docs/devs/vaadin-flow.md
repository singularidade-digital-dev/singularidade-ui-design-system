---
title: Vaadin Flow
description: Integração com apps Vaadin Flow + Spring Boot
sidebar: { order: 1 }
---

## Maven dependencies

```xml
<dependency>
  <groupId>digital.singularidade</groupId>
  <artifactId>tokens</artifactId>
  <version>0.1.0</version>
</dependency>
<dependency>
  <groupId>digital.singularidade</groupId>
  <artifactId>brand-assets</artifactId>
  <version>0.1.0</version>
</dependency>
```

Recursos ficam em `META-INF/resources/` no classpath — Spring Boot serve automaticamente.

## Aplicar tema

`themes/singularidade/styles.css` (do app Vaadin):

```css
@import url('/tokens/css/singularidade.light.css');
@import url('/tokens/css/singularidade.dark.css');
@import url('/brand-assets/fonts/plus-jakarta-sans.css');
@import url('/brand-assets/fonts/jetbrains-mono.css');
```

```java
@Theme("singularidade")
public class Application implements AppShellConfigurator {
}
```

## Trocar brand/theme em runtime

```java
UI.getCurrent().getElement().setAttribute("data-brand", "integras");
UI.getCurrent().getElement().setAttribute("data-theme", "dark");
```

## Custom icons (ss:\*)

Importar o iconset gerado:

```java
@JsModule("@singularidade/brand-assets/build/vaadin-iconset.js")
```

Usar em views:

```java
Icon tenantIcon = new Icon("ss", "tenant");
```

## Acessar tokens em Java

```java
import digital.singularidade.tokens.SingularidadeTokens;

String brandColor = SingularidadeTokens.colorBrandPrimary;
String surfaceLight = SingularidadeTokens.colorSurfaceBase;
```

## Próximos passos (Fase 3)

Em desenvolvimento: `digital.singularidade:vaadin-bindings` — façade Java que expõe componentes singularidade-ui-vaadin já themed e auto-instala iconset/fonts.
