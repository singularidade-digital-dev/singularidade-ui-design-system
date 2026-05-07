---
'@singularidade/tokens': minor
---

Adiciona target Java per-brand × mode em `build/java/digital/singularidade/tokens/email/`. Gera 4 classes (`EmailTokensIntegrasLight`, `EmailTokensIntegrasDark`, `EmailTokensSingularidadeLight`, `EmailTokensSingularidadeDark`) com hex literais resolvidos por brand+mode — consumível por Spring/Thymeleaf em e-mails inline-styled (sem CSS variables, sem theme switching em runtime). Reusa o format `java/class` existente; mesma convenção de nomes camelCase. Construído junto com o build de tokens; não requer pnpm/Maven plugins extras.
