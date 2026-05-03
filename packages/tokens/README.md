# @singularidade/tokens

Design tokens da Singularidade Digital — formato W3C Design Tokens (DTF), compilados via Style Dictionary 4 pra CSS, JS, JSON e Java.

## Instalação

```bash
pnpm add @singularidade/tokens
```

## Uso (CSS)

```css
@import '@singularidade/tokens/css/singularidade.light.css';
```

## Uso (JS/TS)

```ts
import tokens from '@singularidade/tokens';
console.log(tokens.color.brand.primary); // "#E91E8B"
```

## Uso (Java/Maven)

```xml
<dependency>
  <groupId>digital.singularidade</groupId>
  <artifactId>tokens</artifactId>
  <version>0.1.0</version>
</dependency>
```
