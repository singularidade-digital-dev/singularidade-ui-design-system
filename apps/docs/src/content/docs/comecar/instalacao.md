---
title: Instalação
description: Como instalar tokens, brand assets e bindings Vaadin
---

## npm (web frontend)

```bash
pnpm add @singularidade/tokens @singularidade/brand-assets
```

```css
@import '@singularidade/tokens/css/singularidade.light.css';
@import '@singularidade/brand-assets/fonts/plus-jakarta-sans.css';
```

```ts
import tokens from '@singularidade/tokens';
console.log(tokens.color.brand.primary); // "#e91e8b"
```

## Maven (Vaadin Flow / Spring Boot)

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

Os recursos ficam disponíveis em `META-INF/resources/`:

- `/tokens/css/singularidade.light.css` (e `dark`, `integras.{light,dark}`)
- `/tokens/json/tokens.json`
- `/brand-assets/logos/{singularidade,integras}/symbol.svg`
- `/brand-assets/fonts/plus-jakarta-sans.css`
- `/brand-assets/icons.json`

Em Java:

```java
import digital.singularidade.tokens.SingularidadeTokens;

String brandColor = SingularidadeTokens.colorBrandPrimary;
// "#e91e8b"
```

## CodeArtifact

Configurar settings.xml com credenciais OIDC:

```bash
aws codeartifact login --tool maven --repository maven --domain singularidade-digital --domain-owner 539191403497
```
