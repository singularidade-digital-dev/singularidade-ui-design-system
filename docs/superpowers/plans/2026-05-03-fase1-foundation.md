# Fase 1: Foundation — Monorepo + Tokens + CI

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Estabelecer o monorepo do design system e publicar `@singularidade/tokens@0.1.0` (npm) + `digital.singularidade:tokens:0.1.0` (Maven CodeArtifact) com toda a paleta brand, scales completas, semantic tokens light/dark, component tokens e overlays de sub-marcas.

**Architecture:** pnpm workspaces + Turborepo cache, Style Dictionary 4 compila tokens W3C DTF JSON em CSS multi-brand × multi-theme + JS/TS + JSON flat + constantes Java. Maven multi-module aggregator empacota CSS+Java pra consumidores Vaadin. CI bloqueante em PR, release-as-PR via Changesets.

**Tech Stack:** pnpm 9 · Turborepo 2 · Style Dictionary 4 · TypeScript 5.5 · Vitest · Maven 3.9 · Java 21 · Changesets · commitlint · lefthook · GitHub Actions

**Plano da fase:** ~16 tasks, ~5-7 dias de trabalho focado.

**Subsequentes (não cobertos aqui):** Plano 2 (brand-assets) · Plano 3 (vaadin-bindings + migração singularidade-ui-vaadin) · Plano 4 (Storybook) · Plano 5 (docs site Astro) · Plano 6 (apps consumidores) · Plano 7 (visual regression CI completo) · Plano 8 (go-live v1.0.0).

---

## File Structure

Arquivos criados nesta fase:

| Caminho | Responsabilidade |
|---|---|
| `package.json` | Root workspace (scripts, devDeps compartilhadas) |
| `pnpm-workspace.yaml` | Lista de workspaces |
| `turbo.json` | Pipeline cache |
| `.npmrc` · `.nvmrc` | Versões fixas pnpm/Node |
| `tsconfig.base.json` · `tsconfig.json` | TS base + root references |
| `eslint.config.js` · `.prettierrc.json` · `.prettierignore` · `stylelint.config.js` · `.editorconfig` | Linting |
| `commitlint.config.js` · `lefthook.yml` | Conventional Commits + pre-commit |
| `.changeset/config.json` · `.changeset/README.md` | Versionamento |
| `pom.xml` | Maven aggregator |
| `packages/tokens/package.json` · `pom.xml` · `tsconfig.json` · `README.md` | Pacote tokens |
| `packages/tokens/src/core/{color,typography,spacing,radius,shadow,duration,easing}.json` | Core tokens (W3C DTF) |
| `packages/tokens/src/semantic/{color.light,color.dark,typography,spacing}.json` | Semantic tokens |
| `packages/tokens/src/component/{button,card,input,dialog}.json` | Component tokens |
| `packages/tokens/src/brands/{singularidade,integras}/{identity,overrides}.json` | Sub-brand overlays |
| `packages/tokens/style-dictionary.config.mjs` | Build config (multi-brand × multi-mode) |
| `packages/tokens/tests/*.test.ts` | Vitest tests |
| `.github/workflows/{ci,release}.yml` | CI/CD |
| `CONTRIBUTING.md` · `LICENSE` | Convenções |

---

## Task 1: Inicializar monorepo

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Create: `.npmrc`
- Create: `.nvmrc`
- Create: `.editorconfig`

- [ ] **Step 1: Verificar pnpm 9 e Node 20**

```bash
corepack enable
corepack prepare pnpm@9.15.0 --activate
node --version  # Expected: v20.x ou v22.x
pnpm --version  # Expected: 9.15.0
```

- [ ] **Step 2: Criar `.nvmrc`**

```
20.18.0
```

- [ ] **Step 3: Criar `.npmrc`**

```
auto-install-peers=true
strict-peer-dependencies=false
shamefully-hoist=false
node-linker=isolated
```

- [ ] **Step 4: Criar `.editorconfig`**

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[*.{java,xml}]
indent_size = 4
```

- [ ] **Step 5: Criar `pnpm-workspace.yaml`**

```yaml
packages:
  - "packages/*"
  - "apps/*"
```

- [ ] **Step 6: Criar `turbo.json`**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local", "tsconfig.base.json"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**", ".astro/**", "storybook-static/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "lint": { "outputs": [] },
    "typecheck": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

- [ ] **Step 7: Criar `package.json`**

```json
{
  "name": "singularidade-ui-design-system",
  "version": "0.0.0",
  "private": true,
  "description": "Singularidade Design System — tokens, brand book, components",
  "license": "Apache-2.0",
  "packageManager": "pnpm@9.15.0",
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  },
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "dev": "turbo run dev",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md,yml,yaml,css}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,md,yml,yaml,css}\"",
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "pnpm build && changeset publish"
  },
  "devDependencies": {
    "@changesets/cli": "^2.27.10",
    "@commitlint/cli": "^19.6.0",
    "@commitlint/config-conventional": "^19.6.0",
    "@types/node": "^22.10.0",
    "lefthook": "^1.9.0",
    "prettier": "^3.4.0",
    "turbo": "^2.3.0",
    "typescript": "^5.7.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 8: Instalar dependências**

```bash
pnpm install
```

Expected: instala devDependencies em `node_modules/`, gera `pnpm-lock.yaml`.

- [ ] **Step 9: Verificar Turbo funciona**

```bash
pnpm exec turbo --version
```

Expected: imprime `2.x.x`.

- [ ] **Step 10: Commit**

```bash
git add .nvmrc .npmrc .editorconfig pnpm-workspace.yaml turbo.json package.json pnpm-lock.yaml
git commit -m "chore: initialize pnpm + turborepo monorepo"
```

---

## Task 2: TypeScript base config

**Files:**
- Create: `tsconfig.base.json`
- Create: `tsconfig.json`

- [ ] **Step 1: Criar `tsconfig.base.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

- [ ] **Step 2: Criar `tsconfig.json` (root)**

```json
{
  "extends": "./tsconfig.base.json",
  "include": [],
  "references": []
}
```

- [ ] **Step 3: Verificar tsc**

```bash
pnpm exec tsc --noEmit
```

Expected: sem erros (não há código ainda).

- [ ] **Step 4: Commit**

```bash
git add tsconfig.base.json tsconfig.json
git commit -m "chore: add TypeScript base config"
```

---

## Task 3: ESLint + Prettier + Stylelint

**Files:**
- Create: `eslint.config.js`
- Create: `.prettierrc.json`
- Create: `.prettierignore`
- Create: `stylelint.config.js`
- Modify: `package.json` (adiciona devDeps)

- [ ] **Step 1: Adicionar devDeps**

```bash
pnpm add -Dw eslint@^9.16.0 typescript-eslint@^8.16.0 \
  eslint-config-prettier@^9.1.0 \
  stylelint@^16.10.0 stylelint-config-standard@^36.0.0
```

- [ ] **Step 2: Criar `eslint.config.js` (flat config)**

```js
// @ts-check
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['**/build/**', '**/dist/**', '**/node_modules/**', '**/.astro/**', '**/storybook-static/**', '**/target/**'] },
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  prettier,
);
```

- [ ] **Step 3: Criar `.prettierrc.json`**

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

- [ ] **Step 4: Criar `.prettierignore`**

```
**/build/
**/dist/
**/node_modules/
**/.astro/
**/storybook-static/
**/target/
pnpm-lock.yaml
```

- [ ] **Step 5: Criar `stylelint.config.js`**

```js
export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['**/build/**', '**/dist/**', '**/node_modules/**'],
  rules: {
    'custom-property-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
    'selector-class-pattern': null,
  },
};
```

- [ ] **Step 6: Verificar lint roda sem erros**

```bash
pnpm exec eslint .
pnpm exec prettier --check .
```

Expected: 0 erros (sem código fonte ainda).

- [ ] **Step 7: Commit**

```bash
git add eslint.config.js .prettierrc.json .prettierignore stylelint.config.js package.json pnpm-lock.yaml
git commit -m "chore: add eslint + prettier + stylelint configs"
```

---

## Task 4: Commitlint + Lefthook

**Files:**
- Create: `commitlint.config.js`
- Create: `lefthook.yml`

- [ ] **Step 1: Criar `commitlint.config.js`**

```js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'],
    ],
  },
};
```

- [ ] **Step 2: Criar `lefthook.yml`**

```yaml
pre-commit:
  parallel: true
  commands:
    prettier:
      glob: "*.{ts,tsx,js,jsx,json,md,yml,yaml,css}"
      run: pnpm exec prettier --check {staged_files}
    eslint:
      glob: "*.{ts,tsx,js,jsx}"
      run: pnpm exec eslint {staged_files}

commit-msg:
  commands:
    commitlint:
      run: pnpm exec commitlint --edit {1}
```

- [ ] **Step 3: Instalar hooks**

```bash
pnpm exec lefthook install
```

Expected: cria `.git/hooks/pre-commit` e `.git/hooks/commit-msg`.

- [ ] **Step 4: Testar commitlint**

```bash
echo "feat: test message" | pnpm exec commitlint
echo "broken message" | pnpm exec commitlint
```

Expected: primeiro passa, segundo falha com "subject may not be empty".

- [ ] **Step 5: Commit**

```bash
git add commitlint.config.js lefthook.yml
git commit -m "chore: add commitlint + lefthook hooks"
```

---

## Task 5: Inicializar Changesets

**Files:**
- Create: `.changeset/config.json`
- Create: `.changeset/README.md`

- [ ] **Step 1: Init changesets**

```bash
pnpm exec changeset init
```

- [ ] **Step 2: Editar `.changeset/config.json`**

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.4/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [["@singularidade/tokens", "@singularidade/brand-assets"]],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["docs", "storybook"]
}
```

- [ ] **Step 3: Verificar**

```bash
pnpm exec changeset status
```

Expected: "No changesets present" (esperado, sem packages ainda).

- [ ] **Step 4: Commit**

```bash
git add .changeset/
git commit -m "chore: initialize changesets"
```

---

## Task 6: Criar packages/tokens skeleton

**Files:**
- Create: `packages/tokens/package.json`
- Create: `packages/tokens/README.md`
- Create: `packages/tokens/tsconfig.json`
- Create: `packages/tokens/.gitignore`
- Create: `packages/tokens/src/index.ts`

- [ ] **Step 1: Criar diretório**

```bash
mkdir -p packages/tokens/src/core packages/tokens/src/semantic packages/tokens/src/component packages/tokens/src/brands/singularidade packages/tokens/src/brands/integras packages/tokens/tests
```

- [ ] **Step 2: Criar `packages/tokens/package.json`**

```json
{
  "name": "@singularidade/tokens",
  "version": "0.0.0",
  "description": "Singularidade Design System — design tokens (W3C DTF)",
  "license": "Apache-2.0",
  "type": "module",
  "main": "./build/js/tokens.js",
  "types": "./build/js/tokens.d.ts",
  "exports": {
    ".": {
      "types": "./build/js/tokens.d.ts",
      "import": "./build/js/tokens.js"
    },
    "./css/*": "./build/css/*",
    "./json/*": "./build/json/*",
    "./tokens.json": "./build/json/tokens.json"
  },
  "files": [
    "build/css/*.css",
    "build/js/tokens.js",
    "build/js/tokens.d.ts",
    "build/json/tokens.json",
    "src/**/*.json"
  ],
  "scripts": {
    "build": "node style-dictionary.config.mjs",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "style-dictionary": "^4.3.0"
  },
  "publishConfig": {
    "access": "public",
    "provenance": true
  }
}
```

- [ ] **Step 3: Criar `packages/tokens/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./build/js",
    "rootDir": "./src",
    "moduleResolution": "node",
    "module": "ESNext"
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["build", "node_modules"]
}
```

- [ ] **Step 4: Criar `packages/tokens/.gitignore`**

```
build/
node_modules/
*.tsbuildinfo
```

- [ ] **Step 5: Criar `packages/tokens/README.md`**

```markdown
# @singularidade/tokens

Design tokens da Singularidade Digital — formato W3C Design Tokens (DTF), compilados via Style Dictionary 4 pra CSS, JS, JSON e Java.

## Instalação

\`\`\`bash
pnpm add @singularidade/tokens
\`\`\`

## Uso (CSS)

\`\`\`css
@import "@singularidade/tokens/css/singularidade.light.css";
\`\`\`

## Uso (JS/TS)

\`\`\`ts
import tokens from "@singularidade/tokens";
console.log(tokens.color.brand.primary); // "#E91E8B"
\`\`\`

## Uso (Java/Maven)

\`\`\`xml
<dependency>
  <groupId>digital.singularidade</groupId>
  <artifactId>tokens</artifactId>
  <version>0.1.0</version>
</dependency>
\`\`\`
```

- [ ] **Step 6: Criar `packages/tokens/src/index.ts` (placeholder)**

```ts
// Esse arquivo é gerado pelo Style Dictionary durante o build.
// O conteúdo real está em build/js/tokens.js após `pnpm build`.
export {};
```

- [ ] **Step 7: Instalar deps locais do package**

```bash
pnpm install
```

- [ ] **Step 8: Commit**

```bash
git add packages/tokens/ pnpm-lock.yaml
git commit -m "feat(tokens): scaffold @singularidade/tokens package"
```

---

## Task 7: Core color tokens (TDD)

**Files:**
- Create: `packages/tokens/src/core/color.json`
- Create: `packages/tokens/tests/core-color.test.ts`
- Create: `vitest.config.ts` (root)

- [ ] **Step 1: Criar `vitest.config.ts` (root)**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['packages/**/tests/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 2: Escrever teste falhando**

Create `packages/tokens/tests/core-color.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import coreColor from '../src/core/color.json' with { type: 'json' };

describe('core color tokens', () => {
  it('contém valores brand exatos da identidade visual', () => {
    expect(coreColor.color.brand.magenta['500'].$value).toBe('#E91E8B');
    expect(coreColor.color.brand.coral['500'].$value).toBe('#E8606A');
    expect(coreColor.color.brand.orange['500'].$value).toBe('#F5A623');
  });

  it('cada brand color tem 11 paradas (50, 100, 200, ..., 950)', () => {
    const stops = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    for (const family of ['magenta', 'coral', 'orange']) {
      for (const stop of stops) {
        expect(coreColor.color.brand[family][stop], `${family}.${stop}`).toBeDefined();
        expect(coreColor.color.brand[family][stop].$type).toBe('color');
      }
    }
  });

  it('neutral tem 13 paradas (0, 50, 100, ..., 950, 1000) com undertone magenta (hsl 330)', () => {
    const stops = ['0', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950', '1000'];
    for (const stop of stops) {
      expect(coreColor.color.neutral[stop], `neutral.${stop}`).toBeDefined();
    }
  });

  it('feedback colors universais existem (success, error, warning, info)', () => {
    for (const sem of ['success', 'error', 'warning', 'info']) {
      expect(coreColor.color.feedback[sem]['500'], `${sem}.500`).toBeDefined();
    }
  });
});
```

- [ ] **Step 3: Rodar teste pra confirmar falha**

```bash
cd packages/tokens && pnpm test
```

Expected: FAIL com "Cannot find module '../src/core/color.json'".

- [ ] **Step 4: Implementar `packages/tokens/src/core/color.json`**

```json
{
  "color": {
    "brand": {
      "magenta": {
        "50":  { "$value": "#FCE7F3", "$type": "color", "$description": "Magenta 50" },
        "100": { "$value": "#FBCFE8", "$type": "color" },
        "200": { "$value": "#F9A8D4", "$type": "color" },
        "300": { "$value": "#F472B6", "$type": "color", "$description": "Magenta 300 — primary em dark mode" },
        "400": { "$value": "#EC4899", "$type": "color" },
        "500": { "$value": "#E91E8B", "$type": "color", "$description": "Brand primary — Singularidade magenta (oficial)" },
        "600": { "$value": "#C41776", "$type": "color" },
        "700": { "$value": "#9D174D", "$type": "color" },
        "800": { "$value": "#831843", "$type": "color" },
        "900": { "$value": "#500724", "$type": "color" },
        "950": { "$value": "#2E0414", "$type": "color" }
      },
      "coral": {
        "50":  { "$value": "#FFF1F2", "$type": "color" },
        "100": { "$value": "#FFE4E6", "$type": "color" },
        "200": { "$value": "#FECDD3", "$type": "color" },
        "300": { "$value": "#FDA4AF", "$type": "color", "$description": "Coral 300 — interactive hover em dark" },
        "400": { "$value": "#FB7185", "$type": "color", "$description": "Coral 400 — interactive primary em dark" },
        "500": { "$value": "#E8606A", "$type": "color", "$description": "Brand secondary — Singularidade coral (oficial)" },
        "600": { "$value": "#BE3550", "$type": "color", "$description": "Coral 600 — interactive primary em light" },
        "700": { "$value": "#9F1239", "$type": "color", "$description": "Coral 700 — interactive hover em light" },
        "800": { "$value": "#791832", "$type": "color" },
        "900": { "$value": "#571520", "$type": "color" },
        "950": { "$value": "#2C0A10", "$type": "color" }
      },
      "orange": {
        "50":  { "$value": "#FEF7E7", "$type": "color" },
        "100": { "$value": "#FDE4A8", "$type": "color" },
        "200": { "$value": "#FCD061", "$type": "color" },
        "300": { "$value": "#FBBF24", "$type": "color", "$description": "Orange 300 — warning em dark" },
        "400": { "$value": "#F8B339", "$type": "color" },
        "500": { "$value": "#F5A623", "$type": "color", "$description": "Brand tertiary — Singularidade orange (oficial)" },
        "600": { "$value": "#DD8E0E", "$type": "color" },
        "700": { "$value": "#A86B0B", "$type": "color" },
        "800": { "$value": "#784D08", "$type": "color" },
        "900": { "$value": "#483006", "$type": "color" },
        "950": { "$value": "#2A1B03", "$type": "color" }
      }
    },
    "neutral": {
      "0":    { "$value": "#FFFFFF", "$type": "color" },
      "50":   { "$value": "#FDFAFC", "$type": "color", "$description": "Surface base light (warm-magenta undertone)" },
      "100":  { "$value": "#F5F0F4", "$type": "color" },
      "200":  { "$value": "#ECE5EB", "$type": "color", "$description": "Border subtle light" },
      "300":  { "$value": "#C8BCC4", "$type": "color" },
      "400":  { "$value": "#A697A1", "$type": "color" },
      "500":  { "$value": "#735F6B", "$type": "color", "$description": "Text muted" },
      "600":  { "$value": "#524049", "$type": "color" },
      "700":  { "$value": "#3A2C33", "$type": "color" },
      "800":  { "$value": "#261A21", "$type": "color", "$description": "Text primary light" },
      "900":  { "$value": "#1A111A", "$type": "color" },
      "950":  { "$value": "#1A1517", "$type": "color", "$description": "Surface base dark" },
      "1000": { "$value": "#000000", "$type": "color" }
    },
    "feedback": {
      "success": {
        "50":  { "$value": "#ECFDF5", "$type": "color" },
        "100": { "$value": "#D1FAE5", "$type": "color" },
        "300": { "$value": "#6EE7B7", "$type": "color", "$description": "Success em dark" },
        "400": { "$value": "#34D399", "$type": "color" },
        "500": { "$value": "#10B981", "$type": "color" },
        "600": { "$value": "#059669", "$type": "color" },
        "700": { "$value": "#047857", "$type": "color", "$description": "Success em light" },
        "900": { "$value": "#064E3B", "$type": "color" }
      },
      "error": {
        "50":  { "$value": "#FEF2F2", "$type": "color" },
        "100": { "$value": "#FEE2E2", "$type": "color" },
        "300": { "$value": "#FCA5A5", "$type": "color" },
        "400": { "$value": "#F87171", "$type": "color", "$description": "Error em dark" },
        "500": { "$value": "#EF4444", "$type": "color" },
        "600": { "$value": "#DC2626", "$type": "color", "$description": "Error em light — red puro pra distinguir do coral" },
        "700": { "$value": "#B91C1C", "$type": "color" },
        "900": { "$value": "#7F1D1D", "$type": "color" }
      },
      "warning": {
        "50":  { "$value": "#FFFBEB", "$type": "color" },
        "100": { "$value": "#FEF3C7", "$type": "color" },
        "300": { "$value": "#FCD34D", "$type": "color" },
        "400": { "$value": "#FBBF24", "$type": "color", "$description": "Warning em dark — amber" },
        "500": { "$value": "#F59E0B", "$type": "color" },
        "600": { "$value": "#D97706", "$type": "color" },
        "700": { "$value": "#B45309", "$type": "color", "$description": "Warning em light" },
        "900": { "$value": "#78350F", "$type": "color" }
      },
      "info": {
        "50":  { "$value": "#EFF6FF", "$type": "color" },
        "100": { "$value": "#DBEAFE", "$type": "color" },
        "300": { "$value": "#93C5FD", "$type": "color" },
        "400": { "$value": "#60A5FA", "$type": "color", "$description": "Info em dark" },
        "500": { "$value": "#3B82F6", "$type": "color" },
        "600": { "$value": "#2563EB", "$type": "color" },
        "700": { "$value": "#1D4ED8", "$type": "color", "$description": "Info em light" },
        "900": { "$value": "#1E3A8A", "$type": "color" }
      }
    }
  }
}
```

- [ ] **Step 5: Rodar teste pra confirmar passa**

```bash
cd packages/tokens && pnpm test
```

Expected: PASS (4 testes verdes).

- [ ] **Step 6: Commit**

```bash
git add packages/tokens/src/core/color.json packages/tokens/tests/core-color.test.ts vitest.config.ts package.json pnpm-lock.yaml
git commit -m "feat(tokens): add core color tokens with brand scales"
```

---

## Task 8: Core não-color tokens (TDD)

**Files:**
- Create: `packages/tokens/src/core/typography.json`
- Create: `packages/tokens/src/core/spacing.json`
- Create: `packages/tokens/src/core/radius.json`
- Create: `packages/tokens/src/core/shadow.json`
- Create: `packages/tokens/src/core/duration.json`
- Create: `packages/tokens/src/core/easing.json`
- Create: `packages/tokens/tests/core-non-color.test.ts`

- [ ] **Step 1: Escrever teste falhando**

Create `packages/tokens/tests/core-non-color.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import typography from '../src/core/typography.json' with { type: 'json' };
import spacing from '../src/core/spacing.json' with { type: 'json' };
import radius from '../src/core/radius.json' with { type: 'json' };
import shadow from '../src/core/shadow.json' with { type: 'json' };
import duration from '../src/core/duration.json' with { type: 'json' };
import easing from '../src/core/easing.json' with { type: 'json' };

describe('typography', () => {
  it('define famílias sans (Plus Jakarta) e mono (JetBrains)', () => {
    expect(typography.font.family.sans.$value).toContain('Plus Jakarta Sans');
    expect(typography.font.family.mono.$value).toContain('JetBrains Mono');
  });

  it('escala modular xs..7xl', () => {
    const sizes = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'];
    for (const s of sizes) {
      expect(typography.font.size[s], `font.size.${s}`).toBeDefined();
    }
  });

  it('weights regular/medium/semibold/bold', () => {
    expect(typography.font.weight.regular.$value).toBe(400);
    expect(typography.font.weight.medium.$value).toBe(500);
    expect(typography.font.weight.semibold.$value).toBe(600);
    expect(typography.font.weight.bold.$value).toBe(700);
  });
});

describe('spacing', () => {
  it('escala 0..32 baseada em 4px', () => {
    expect(spacing.size['0'].$value).toBe('0px');
    expect(spacing.size['1'].$value).toBe('4px');
    expect(spacing.size['4'].$value).toBe('16px');
    expect(spacing.size['8'].$value).toBe('32px');
    expect(spacing.size['32'].$value).toBe('128px');
  });
});

describe('radius', () => {
  it('escala none/xs/sm/md/lg/xl/full', () => {
    expect(radius.radius.none.$value).toBe('0px');
    expect(radius.radius.xs.$value).toBe('2px');
    expect(radius.radius.sm.$value).toBe('6px');
    expect(radius.radius.md.$value).toBe('8px');
    expect(radius.radius.lg.$value).toBe('12px');
    expect(radius.radius.xl.$value).toBe('16px');
    expect(radius.radius.full.$value).toBe('9999px');
  });
});

describe('shadow', () => {
  it('escala xs/sm/md/lg/xl/2xl com variantes light e dark', () => {
    for (const level of ['xs', 'sm', 'md', 'lg', 'xl', '2xl']) {
      expect(shadow.shadow.light[level], `shadow.light.${level}`).toBeDefined();
      expect(shadow.shadow.dark[level], `shadow.dark.${level}`).toBeDefined();
    }
  });
});

describe('duration', () => {
  it('instant/fast/base/slow', () => {
    expect(duration.duration.instant.$value).toBe('0ms');
    expect(duration.duration.fast.$value).toBe('100ms');
    expect(duration.duration.base.$value).toBe('200ms');
    expect(duration.duration.slow.$value).toBe('400ms');
  });
});

describe('easing', () => {
  it('linear/ease-out/ease-in-out/spring', () => {
    expect(easing.easing.linear.$value).toBeDefined();
    expect(easing.easing['ease-out'].$value).toBeDefined();
    expect(easing.easing['ease-in-out'].$value).toBeDefined();
    expect(easing.easing.spring.$value).toBeDefined();
  });
});
```

- [ ] **Step 2: Rodar teste pra confirmar falha**

```bash
cd packages/tokens && pnpm test
```

Expected: FAIL — arquivos JSON não existem.

- [ ] **Step 3: Criar `packages/tokens/src/core/typography.json`**

```json
{
  "font": {
    "family": {
      "sans": {
        "$value": "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        "$type": "fontFamily",
        "$description": "Display + body — geometric, modern"
      },
      "mono": {
        "$value": "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, monospace",
        "$type": "fontFamily",
        "$description": "Code, números financeiros, IDs"
      }
    },
    "weight": {
      "regular":  { "$value": 400, "$type": "fontWeight" },
      "medium":   { "$value": 500, "$type": "fontWeight" },
      "semibold": { "$value": 600, "$type": "fontWeight" },
      "bold":     { "$value": 700, "$type": "fontWeight" }
    },
    "size": {
      "xs":  { "$value": "11px", "$type": "dimension", "$description": "Labels, captions" },
      "s":   { "$value": "13px", "$type": "dimension", "$description": "Secondary body" },
      "m":   { "$value": "14px", "$type": "dimension", "$description": "Body default" },
      "l":   { "$value": "16px", "$type": "dimension" },
      "xl":  { "$value": "18px", "$type": "dimension", "$description": "H4, section headings" },
      "2xl": { "$value": "22px", "$type": "dimension", "$description": "H3, page titles" },
      "3xl": { "$value": "28px", "$type": "dimension", "$description": "H2" },
      "4xl": { "$value": "32px", "$type": "dimension" },
      "5xl": { "$value": "40px", "$type": "dimension", "$description": "H1, hero" },
      "6xl": { "$value": "48px", "$type": "dimension" },
      "7xl": { "$value": "56px", "$type": "dimension" }
    },
    "lineHeight": {
      "tight":   { "$value": "1.1",  "$type": "number" },
      "snug":    { "$value": "1.25", "$type": "number" },
      "normal":  { "$value": "1.5",  "$type": "number", "$description": "Body default" },
      "relaxed": { "$value": "1.75", "$type": "number" }
    },
    "letterSpacing": {
      "tighter": { "$value": "-0.03em", "$type": "dimension", "$description": "Display large" },
      "tight":   { "$value": "-0.02em", "$type": "dimension", "$description": "Headings" },
      "normal":  { "$value": "0",       "$type": "dimension" },
      "wide":    { "$value": "0.04em",  "$type": "dimension", "$description": "Labels uppercase" },
      "wider":   { "$value": "0.06em",  "$type": "dimension" }
    }
  }
}
```

- [ ] **Step 4: Criar `packages/tokens/src/core/spacing.json`**

```json
{
  "size": {
    "0":  { "$value": "0px",   "$type": "dimension" },
    "1":  { "$value": "4px",   "$type": "dimension" },
    "2":  { "$value": "8px",   "$type": "dimension" },
    "3":  { "$value": "12px",  "$type": "dimension" },
    "4":  { "$value": "16px",  "$type": "dimension" },
    "5":  { "$value": "20px",  "$type": "dimension" },
    "6":  { "$value": "24px",  "$type": "dimension" },
    "8":  { "$value": "32px",  "$type": "dimension" },
    "10": { "$value": "40px",  "$type": "dimension" },
    "12": { "$value": "48px",  "$type": "dimension" },
    "16": { "$value": "64px",  "$type": "dimension" },
    "20": { "$value": "80px",  "$type": "dimension" },
    "24": { "$value": "96px",  "$type": "dimension" },
    "32": { "$value": "128px", "$type": "dimension" }
  }
}
```

- [ ] **Step 5: Criar `packages/tokens/src/core/radius.json`**

```json
{
  "radius": {
    "none": { "$value": "0px",    "$type": "dimension" },
    "xs":   { "$value": "2px",    "$type": "dimension" },
    "sm":   { "$value": "6px",    "$type": "dimension" },
    "md":   { "$value": "8px",    "$type": "dimension", "$description": "Botões, inputs default" },
    "lg":   { "$value": "12px",   "$type": "dimension", "$description": "Cards, dialogs" },
    "xl":   { "$value": "16px",   "$type": "dimension" },
    "full": { "$value": "9999px", "$type": "dimension", "$description": "Pills, avatares" }
  }
}
```

- [ ] **Step 6: Criar `packages/tokens/src/core/shadow.json`**

```json
{
  "shadow": {
    "light": {
      "xs":  { "$value": "0 1px 2px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.02)",   "$type": "shadow" },
      "sm":  { "$value": "0 2px 4px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.03)",   "$type": "shadow" },
      "md":  { "$value": "0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03)",  "$type": "shadow" },
      "lg":  { "$value": "0 8px 24px rgba(0, 0, 0, 0.10), 0 0 0 1px rgba(0, 0, 0, 0.03)",  "$type": "shadow" },
      "xl":  { "$value": "0 16px 48px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)", "$type": "shadow" },
      "2xl": { "$value": "0 24px 64px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.04)", "$type": "shadow" }
    },
    "dark": {
      "xs":  { "$value": "0 1px 3px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.03)",  "$type": "shadow" },
      "sm":  { "$value": "0 2px 6px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.03)", "$type": "shadow" },
      "md":  { "$value": "0 4px 14px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.04)", "$type": "shadow" },
      "lg":  { "$value": "0 8px 28px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.04)", "$type": "shadow" },
      "xl":  { "$value": "0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)", "$type": "shadow" },
      "2xl": { "$value": "0 24px 64px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.05)", "$type": "shadow" }
    }
  }
}
```

- [ ] **Step 7: Criar `packages/tokens/src/core/duration.json`**

```json
{
  "duration": {
    "instant": { "$value": "0ms",   "$type": "duration" },
    "fast":    { "$value": "100ms", "$type": "duration", "$description": "Micro-interações (hover, focus)" },
    "base":    { "$value": "200ms", "$type": "duration", "$description": "Default" },
    "slow":    { "$value": "400ms", "$type": "duration", "$description": "Mudanças de página, dialogs" }
  }
}
```

- [ ] **Step 8: Criar `packages/tokens/src/core/easing.json`**

```json
{
  "easing": {
    "linear":       { "$value": "linear",                              "$type": "cubicBezier" },
    "ease-out":     { "$value": "cubic-bezier(0.16, 1, 0.3, 1)",       "$type": "cubicBezier", "$description": "Entrada (padrão)" },
    "ease-in":      { "$value": "cubic-bezier(0.4, 0, 1, 1)",          "$type": "cubicBezier", "$description": "Saída" },
    "ease-in-out":  { "$value": "cubic-bezier(0.4, 0, 0.2, 1)",        "$type": "cubicBezier" },
    "spring":       { "$value": "cubic-bezier(0.175, 0.885, 0.32, 1.275)", "$type": "cubicBezier", "$description": "Drag, pop" }
  }
}
```

- [ ] **Step 9: Rodar testes**

```bash
cd packages/tokens && pnpm test
```

Expected: PASS (todos os 6 describes verdes).

- [ ] **Step 10: Commit**

```bash
git add packages/tokens/src/core/{typography,spacing,radius,shadow,duration,easing}.json packages/tokens/tests/core-non-color.test.ts
git commit -m "feat(tokens): add core typography, spacing, radius, shadow, duration, easing"
```

---

## Task 9: Semantic tokens light + dark (TDD)

**Files:**
- Create: `packages/tokens/src/semantic/color.light.json`
- Create: `packages/tokens/src/semantic/color.dark.json`
- Create: `packages/tokens/src/semantic/typography.json`
- Create: `packages/tokens/tests/semantic.test.ts`

- [ ] **Step 1: Escrever teste falhando**

```ts
// packages/tokens/tests/semantic.test.ts
import { describe, it, expect } from 'vitest';
import light from '../src/semantic/color.light.json' with { type: 'json' };
import dark from '../src/semantic/color.dark.json' with { type: 'json' };

describe('semantic light', () => {
  it('brand.primary é magenta.500 (#E91E8B)', () => {
    expect(light.color.brand.primary.$value).toBe('{color.brand.magenta.500}');
  });

  it('interactive.primary é coral.600 (#BE3550, mais sóbrio em light)', () => {
    expect(light.color.interactive.primary.$value).toBe('{color.brand.coral.600}');
  });

  it('interactive.primary.hover é coral.700', () => {
    expect(light.color.interactive.primary.hover.$value).toBe('{color.brand.coral.700}');
  });

  it('interactive.primary.active volta pra coral.500 (brand pure)', () => {
    expect(light.color.interactive.primary.active.$value).toBe('{color.brand.coral.500}');
  });

  it('surface.base aponta pra neutral.50 (warm-magenta undertone)', () => {
    expect(light.color.surface.base.$value).toBe('{color.neutral.50}');
  });

  it('feedback.error é red puro (#DC2626) — distingue de coral', () => {
    expect(light.color.feedback.error.solid.$value).toBe('{color.feedback.error.600}');
  });
});

describe('semantic dark', () => {
  it('brand.primary continua magenta.500 (não muda entre temas)', () => {
    expect(dark.color.brand.primary.$value).toBe('{color.brand.magenta.500}');
  });

  it('interactive.primary é coral.400 em dark (brilhante pra atingir AA)', () => {
    expect(dark.color.interactive.primary.$value).toBe('{color.brand.coral.400}');
  });

  it('interactive.primary.hover é coral.300 em dark', () => {
    expect(dark.color.interactive.primary.hover.$value).toBe('{color.brand.coral.300}');
  });

  it('surface.base aponta pra neutral.950', () => {
    expect(dark.color.surface.base.$value).toBe('{color.neutral.950}');
  });

  it('feedback.error em dark é error.400 (#F87171)', () => {
    expect(dark.color.feedback.error.solid.$value).toBe('{color.feedback.error.400}');
  });
});
```

- [ ] **Step 2: Rodar teste pra confirmar falha**

```bash
cd packages/tokens && pnpm test
```

Expected: FAIL — arquivos não existem.

- [ ] **Step 3: Criar `packages/tokens/src/semantic/color.light.json`**

```json
{
  "color": {
    "brand": {
      "primary":   { "$value": "{color.brand.magenta.500}", "$type": "color", "$description": "Brand pure — logo, hero, branded surfaces" },
      "secondary": { "$value": "{color.brand.coral.500}",   "$type": "color" },
      "tertiary":  { "$value": "{color.brand.orange.500}",  "$type": "color" },
      "gradient":  { "$value": "linear-gradient(160deg, {color.brand.magenta.500} 0%, {color.brand.coral.500} 50%, {color.brand.orange.500} 100%)", "$type": "color", "$description": "Gradient brand canônico" }
    },
    "interactive": {
      "primary": {
        "$value":   "{color.brand.coral.600}",
        "$type":    "color",
        "$description": "CTA UI principal — coral.600 mais sóbrio em light",
        "hover":  { "$value": "{color.brand.coral.700}", "$type": "color" },
        "active": { "$value": "{color.brand.coral.500}", "$type": "color", "$description": "Volta pro brand pure no click" }
      },
      "secondary": {
        "$value":  "{color.neutral.200}",
        "$type":   "color",
        "hover":  { "$value": "{color.neutral.300}", "$type": "color" },
        "active": { "$value": "{color.neutral.400}", "$type": "color" }
      }
    },
    "surface": {
      "base":    { "$value": "{color.neutral.50}",  "$type": "color", "$description": "Fundo principal" },
      "raised":  { "$value": "{color.neutral.0}",   "$type": "color", "$description": "Cards, dialogs" },
      "sunken":  { "$value": "{color.neutral.100}", "$type": "color", "$description": "Drawer, navbar" },
      "overlay": { "$value": "rgba(38, 26, 33, 0.4)", "$type": "color", "$description": "Backdrop de modais" }
    },
    "border": {
      "subtle":  { "$value": "{color.neutral.200}", "$type": "color" },
      "default": { "$value": "{color.neutral.300}", "$type": "color" },
      "strong":  { "$value": "{color.neutral.400}", "$type": "color" },
      "focus":   { "$value": "{color.brand.coral.600}", "$type": "color" }
    },
    "text": {
      "primary":   { "$value": "{color.neutral.800}", "$type": "color" },
      "secondary": { "$value": "{color.neutral.600}", "$type": "color" },
      "muted":     { "$value": "{color.neutral.500}", "$type": "color" },
      "disabled":  { "$value": "{color.neutral.400}", "$type": "color" },
      "inverse":   { "$value": "{color.neutral.0}",   "$type": "color" }
    },
    "feedback": {
      "success": {
        "solid":   { "$value": "{color.feedback.success.700}", "$type": "color" },
        "surface": { "$value": "{color.feedback.success.50}",  "$type": "color" },
        "border":  { "$value": "{color.feedback.success.300}", "$type": "color" }
      },
      "error": {
        "solid":   { "$value": "{color.feedback.error.600}",   "$type": "color", "$description": "Red puro (#DC2626) — distingue de coral primary" },
        "surface": { "$value": "{color.feedback.error.50}",    "$type": "color" },
        "border":  { "$value": "{color.feedback.error.300}",   "$type": "color" }
      },
      "warning": {
        "solid":   { "$value": "{color.feedback.warning.700}", "$type": "color" },
        "surface": { "$value": "{color.feedback.warning.50}",  "$type": "color" },
        "border":  { "$value": "{color.feedback.warning.300}", "$type": "color" }
      },
      "info": {
        "solid":   { "$value": "{color.feedback.info.700}",    "$type": "color" },
        "surface": { "$value": "{color.feedback.info.50}",     "$type": "color" },
        "border":  { "$value": "{color.feedback.info.300}",    "$type": "color" }
      }
    }
  }
}
```

- [ ] **Step 4: Criar `packages/tokens/src/semantic/color.dark.json`**

```json
{
  "color": {
    "brand": {
      "primary":   { "$value": "{color.brand.magenta.500}", "$type": "color", "$description": "Brand pure — não muda entre temas" },
      "secondary": { "$value": "{color.brand.coral.500}",   "$type": "color" },
      "tertiary":  { "$value": "{color.brand.orange.500}",  "$type": "color" },
      "gradient":  { "$value": "linear-gradient(160deg, {color.brand.magenta.500} 0%, {color.brand.coral.500} 50%, {color.brand.orange.500} 100%)", "$type": "color" }
    },
    "interactive": {
      "primary": {
        "$value":   "{color.brand.coral.400}",
        "$type":    "color",
        "$description": "CTA UI — coral.400 (#FB7185) brilhante pra atingir AA em dark",
        "hover":  { "$value": "{color.brand.coral.300}", "$type": "color" },
        "active": { "$value": "{color.brand.coral.500}", "$type": "color" }
      },
      "secondary": {
        "$value":  "{color.neutral.700}",
        "$type":   "color",
        "hover":  { "$value": "{color.neutral.600}", "$type": "color" },
        "active": { "$value": "{color.neutral.500}", "$type": "color" }
      }
    },
    "surface": {
      "base":    { "$value": "{color.neutral.950}", "$type": "color" },
      "raised":  { "$value": "{color.neutral.800}", "$type": "color" },
      "sunken":  { "$value": "{color.neutral.900}", "$type": "color" },
      "overlay": { "$value": "rgba(0, 0, 0, 0.6)",  "$type": "color" }
    },
    "border": {
      "subtle":  { "$value": "rgba(200, 188, 196, 0.08)", "$type": "color" },
      "default": { "$value": "rgba(200, 188, 196, 0.15)", "$type": "color" },
      "strong":  { "$value": "rgba(200, 188, 196, 0.25)", "$type": "color" },
      "focus":   { "$value": "{color.brand.coral.400}",   "$type": "color" }
    },
    "text": {
      "primary":   { "$value": "{color.neutral.50}",  "$type": "color" },
      "secondary": { "$value": "{color.neutral.300}", "$type": "color" },
      "muted":     { "$value": "{color.neutral.400}", "$type": "color" },
      "disabled":  { "$value": "{color.neutral.600}", "$type": "color" },
      "inverse":   { "$value": "{color.neutral.900}", "$type": "color" }
    },
    "feedback": {
      "success": {
        "solid":   { "$value": "{color.feedback.success.300}", "$type": "color" },
        "surface": { "$value": "rgba(110, 231, 183, 0.14)",    "$type": "color" },
        "border":  { "$value": "{color.feedback.success.700}", "$type": "color" }
      },
      "error": {
        "solid":   { "$value": "{color.feedback.error.400}",   "$type": "color" },
        "surface": { "$value": "rgba(248, 113, 113, 0.14)",    "$type": "color" },
        "border":  { "$value": "{color.feedback.error.700}",   "$type": "color" }
      },
      "warning": {
        "solid":   { "$value": "{color.feedback.warning.400}", "$type": "color" },
        "surface": { "$value": "rgba(251, 191, 36, 0.16)",     "$type": "color" },
        "border":  { "$value": "{color.feedback.warning.700}", "$type": "color" }
      },
      "info": {
        "solid":   { "$value": "{color.feedback.info.400}",    "$type": "color" },
        "surface": { "$value": "rgba(96, 165, 250, 0.14)",     "$type": "color" },
        "border":  { "$value": "{color.feedback.info.700}",    "$type": "color" }
      }
    }
  }
}
```

- [ ] **Step 5: Criar `packages/tokens/src/semantic/typography.json`**

```json
{
  "text": {
    "display": {
      "fontFamily":    { "$value": "{font.family.sans}",         "$type": "fontFamily" },
      "fontSize":      { "$value": "{font.size.5xl}",            "$type": "dimension" },
      "fontWeight":    { "$value": "{font.weight.bold}",         "$type": "fontWeight" },
      "lineHeight":    { "$value": "{font.lineHeight.tight}",    "$type": "number" },
      "letterSpacing": { "$value": "{font.letterSpacing.tighter}", "$type": "dimension" }
    },
    "heading": {
      "fontFamily":    { "$value": "{font.family.sans}",      "$type": "fontFamily" },
      "fontSize":      { "$value": "{font.size.3xl}",         "$type": "dimension" },
      "fontWeight":    { "$value": "{font.weight.bold}",      "$type": "fontWeight" },
      "lineHeight":    { "$value": "{font.lineHeight.snug}",  "$type": "number" },
      "letterSpacing": { "$value": "{font.letterSpacing.tight}", "$type": "dimension" }
    },
    "body": {
      "fontFamily":    { "$value": "{font.family.sans}",        "$type": "fontFamily" },
      "fontSize":      { "$value": "{font.size.m}",             "$type": "dimension" },
      "fontWeight":    { "$value": "{font.weight.regular}",     "$type": "fontWeight" },
      "lineHeight":    { "$value": "{font.lineHeight.normal}",  "$type": "number" }
    },
    "label": {
      "fontFamily":    { "$value": "{font.family.sans}",     "$type": "fontFamily" },
      "fontSize":      { "$value": "{font.size.xs}",         "$type": "dimension" },
      "fontWeight":    { "$value": "{font.weight.semibold}", "$type": "fontWeight" },
      "letterSpacing": { "$value": "{font.letterSpacing.wider}", "$type": "dimension" },
      "textTransform": { "$value": "uppercase",              "$type": "string" }
    },
    "code": {
      "fontFamily": { "$value": "{font.family.mono}", "$type": "fontFamily" },
      "fontSize":   { "$value": "{font.size.s}",      "$type": "dimension" }
    }
  }
}
```

- [ ] **Step 6: Rodar testes**

```bash
cd packages/tokens && pnpm test
```

Expected: PASS (semantic light + dark verdes).

- [ ] **Step 7: Commit**

```bash
git add packages/tokens/src/semantic/ packages/tokens/tests/semantic.test.ts
git commit -m "feat(tokens): add semantic tokens (light + dark) with hybrid color strategy"
```

---

## Task 10: Component tokens (TDD)

**Files:**
- Create: `packages/tokens/src/component/button.json`
- Create: `packages/tokens/src/component/card.json`
- Create: `packages/tokens/src/component/input.json`
- Create: `packages/tokens/src/component/dialog.json`
- Create: `packages/tokens/tests/component.test.ts`

- [ ] **Step 1: Escrever teste falhando**

```ts
// packages/tokens/tests/component.test.ts
import { describe, it, expect } from 'vitest';
import button from '../src/component/button.json' with { type: 'json' };
import card from '../src/component/card.json' with { type: 'json' };
import input from '../src/component/input.json' with { type: 'json' };
import dialog from '../src/component/dialog.json' with { type: 'json' };

describe('button tokens', () => {
  it('primary aponta pra interactive.primary semantic', () => {
    expect(button.button.primary.background.$value).toBe('{color.interactive.primary}');
  });

  it('tem variants primary, secondary, tertiary, danger', () => {
    for (const v of ['primary', 'secondary', 'tertiary', 'danger']) {
      expect(button.button[v], `button.${v}`).toBeDefined();
    }
  });

  it('tem sizes small, medium, large', () => {
    for (const s of ['small', 'medium', 'large']) {
      expect(button.button.size[s], `button.size.${s}`).toBeDefined();
    }
  });
});

describe('card tokens', () => {
  it('usa surface.raised + border.subtle', () => {
    expect(card.card.background.$value).toBe('{color.surface.raised}');
    expect(card.card.border.$value).toBe('{color.border.subtle}');
  });

  it('usa radius.lg', () => {
    expect(card.card.radius.$value).toBe('{radius.lg}');
  });
});

describe('input tokens', () => {
  it('focus.border é interactive.primary', () => {
    expect(input.input.focus.border.$value).toBe('{color.interactive.primary}');
  });
});

describe('dialog tokens', () => {
  it('usa shadow xl', () => {
    expect(dialog.dialog.shadow.$value).toBeDefined();
  });
});
```

- [ ] **Step 2: Rodar teste pra confirmar falha**

```bash
cd packages/tokens && pnpm test
```

Expected: FAIL — arquivos não existem.

- [ ] **Step 3: Criar `packages/tokens/src/component/button.json`**

```json
{
  "button": {
    "primary": {
      "background":     { "$value": "{color.interactive.primary}",       "$type": "color" },
      "background-hover":  { "$value": "{color.interactive.primary.hover}",  "$type": "color" },
      "background-active": { "$value": "{color.interactive.primary.active}", "$type": "color" },
      "foreground":     { "$value": "{color.text.inverse}",              "$type": "color" },
      "border-radius":  { "$value": "{radius.md}",                       "$type": "dimension" },
      "font-weight":    { "$value": "{font.weight.semibold}",            "$type": "fontWeight" }
    },
    "secondary": {
      "background":     { "$value": "{color.surface.raised}",      "$type": "color" },
      "background-hover":  { "$value": "{color.interactive.secondary.hover}", "$type": "color" },
      "foreground":     { "$value": "{color.text.primary}",        "$type": "color" },
      "border":         { "$value": "{color.border.default}",      "$type": "color" }
    },
    "tertiary": {
      "background":     { "$value": "transparent",                 "$type": "color" },
      "background-hover":  { "$value": "{color.interactive.secondary}", "$type": "color" },
      "foreground":     { "$value": "{color.interactive.primary}", "$type": "color" }
    },
    "danger": {
      "background":     { "$value": "{color.feedback.error.solid}", "$type": "color" },
      "foreground":     { "$value": "{color.text.inverse}",         "$type": "color" }
    },
    "size": {
      "small":  {
        "padding":   { "$value": "{size.1} {size.3}",  "$type": "dimension" },
        "font-size": { "$value": "{font.size.s}",      "$type": "dimension" }
      },
      "medium": {
        "padding":   { "$value": "{size.2} {size.4}",  "$type": "dimension" },
        "font-size": { "$value": "{font.size.m}",      "$type": "dimension" }
      },
      "large":  {
        "padding":   { "$value": "{size.3} {size.5}",  "$type": "dimension" },
        "font-size": { "$value": "{font.size.l}",      "$type": "dimension" }
      }
    }
  }
}
```

- [ ] **Step 4: Criar `packages/tokens/src/component/card.json`**

```json
{
  "card": {
    "background": { "$value": "{color.surface.raised}", "$type": "color" },
    "border":     { "$value": "{color.border.subtle}",  "$type": "color" },
    "radius":     { "$value": "{radius.lg}",            "$type": "dimension" },
    "padding":    { "$value": "{size.5}",               "$type": "dimension" },
    "shadow": {
      "default": { "$value": "{shadow.light.xs}", "$type": "shadow" },
      "hover":   { "$value": "{shadow.light.md}", "$type": "shadow" }
    }
  }
}
```

- [ ] **Step 5: Criar `packages/tokens/src/component/input.json`**

```json
{
  "input": {
    "background":   { "$value": "{color.surface.raised}",  "$type": "color" },
    "foreground":   { "$value": "{color.text.primary}",    "$type": "color" },
    "border":       { "$value": "{color.border.default}",  "$type": "color" },
    "border-radius":{ "$value": "{radius.md}",             "$type": "dimension" },
    "padding":      { "$value": "{size.2} {size.3}",       "$type": "dimension" },
    "placeholder":  { "$value": "{color.text.muted}",      "$type": "color" },
    "focus": {
      "border": { "$value": "{color.interactive.primary}",            "$type": "color" },
      "ring":   { "$value": "0 0 0 2px {color.interactive.primary}",  "$type": "shadow" }
    },
    "disabled": {
      "background": { "$value": "{color.surface.sunken}", "$type": "color" },
      "foreground": { "$value": "{color.text.disabled}",  "$type": "color" }
    }
  }
}
```

- [ ] **Step 6: Criar `packages/tokens/src/component/dialog.json`**

```json
{
  "dialog": {
    "background": { "$value": "{color.surface.raised}", "$type": "color" },
    "border":     { "$value": "{color.border.subtle}",  "$type": "color" },
    "radius":     { "$value": "{radius.lg}",            "$type": "dimension" },
    "padding":    { "$value": "{size.6}",               "$type": "dimension" },
    "shadow":     { "$value": "{shadow.light.xl}",      "$type": "shadow" },
    "backdrop":   { "$value": "{color.surface.overlay}", "$type": "color" },
    "max-width":  { "$value": "560px",                  "$type": "dimension" }
  }
}
```

- [ ] **Step 7: Rodar testes**

```bash
cd packages/tokens && pnpm test
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add packages/tokens/src/component/ packages/tokens/tests/component.test.ts
git commit -m "feat(tokens): add component tokens (button, card, input, dialog)"
```

---

## Task 11: Brand overlays — singularidade + integras (TDD)

**Files:**
- Create: `packages/tokens/src/brands/singularidade/identity.json`
- Create: `packages/tokens/src/brands/singularidade/overrides.json`
- Create: `packages/tokens/src/brands/integras/identity.json`
- Create: `packages/tokens/src/brands/integras/overrides.json`
- Create: `packages/tokens/tests/brands.test.ts`

- [ ] **Step 1: Escrever teste falhando**

```ts
// packages/tokens/tests/brands.test.ts
import { describe, it, expect } from 'vitest';
import singIdentity from '../src/brands/singularidade/identity.json' with { type: 'json' };
import singOverrides from '../src/brands/singularidade/overrides.json' with { type: 'json' };
import intIdentity from '../src/brands/integras/identity.json' with { type: 'json' };
import intOverrides from '../src/brands/integras/overrides.json' with { type: 'json' };

describe('singularidade brand', () => {
  it('identity define logoSymbol path', () => {
    expect(singIdentity.brand.logoSymbol.$value).toBeDefined();
  });

  it('overrides está vazio (segue defaults da matriz)', () => {
    expect(Object.keys(singOverrides)).toHaveLength(0);
  });
});

describe('integras brand', () => {
  it('identity define logoSymbol diferente do Singularidade', () => {
    expect(intIdentity.brand.logoSymbol.$value).not.toBe(singIdentity.brand.logoSymbol.$value);
  });

  it('overrides está vazio (segue padrão da matriz por decisão B)', () => {
    expect(Object.keys(intOverrides)).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Rodar teste pra confirmar falha**

```bash
cd packages/tokens && pnpm test
```

Expected: FAIL — arquivos não existem.

- [ ] **Step 3: Criar `packages/tokens/src/brands/singularidade/identity.json`**

```json
{
  "brand": {
    "name":        { "$value": "Singularidade Digital", "$type": "string" },
    "id":          { "$value": "singularidade",         "$type": "string" },
    "logoSymbol":  { "$value": "@singularidade/brand-assets/logos/singularidade/symbol.svg",     "$type": "asset" },
    "logoHorizontal": { "$value": "@singularidade/brand-assets/logos/singularidade/horizontal.svg", "$type": "asset" },
    "logoVertical": { "$value": "@singularidade/brand-assets/logos/singularidade/vertical.svg",  "$type": "asset" },
    "logoMonochrome": { "$value": "@singularidade/brand-assets/logos/singularidade/monochrome.svg", "$type": "asset" },
    "favicon": {
      "16":  { "$value": "@singularidade/brand-assets/logos/singularidade/icon-16.png",  "$type": "asset" },
      "32":  { "$value": "@singularidade/brand-assets/logos/singularidade/icon-32.png",  "$type": "asset" },
      "180": { "$value": "@singularidade/brand-assets/logos/singularidade/icon-180.png", "$type": "asset" },
      "512": { "$value": "@singularidade/brand-assets/logos/singularidade/icon-512.png", "$type": "asset" }
    }
  }
}
```

- [ ] **Step 4: Criar `packages/tokens/src/brands/singularidade/overrides.json`**

```json
{}
```

- [ ] **Step 5: Criar `packages/tokens/src/brands/integras/identity.json`**

```json
{
  "brand": {
    "name":           { "$value": "integras.digital", "$type": "string" },
    "id":             { "$value": "integras",         "$type": "string" },
    "logoSymbol":     { "$value": "@singularidade/brand-assets/logos/integras/symbol.svg",     "$type": "asset" },
    "logoHorizontal": { "$value": "@singularidade/brand-assets/logos/integras/horizontal.svg", "$type": "asset" },
    "logoVertical":   { "$value": "@singularidade/brand-assets/logos/integras/vertical.svg",   "$type": "asset" },
    "logoMonochrome": { "$value": "@singularidade/brand-assets/logos/integras/monochrome.svg", "$type": "asset" },
    "favicon": {
      "16":  { "$value": "@singularidade/brand-assets/logos/integras/icon-16.png",  "$type": "asset" },
      "32":  { "$value": "@singularidade/brand-assets/logos/integras/icon-32.png",  "$type": "asset" },
      "180": { "$value": "@singularidade/brand-assets/logos/integras/icon-180.png", "$type": "asset" },
      "512": { "$value": "@singularidade/brand-assets/logos/integras/icon-512.png", "$type": "asset" }
    }
  }
}
```

- [ ] **Step 6: Criar `packages/tokens/src/brands/integras/overrides.json`**

```json
{}
```

- [ ] **Step 7: Rodar testes**

```bash
cd packages/tokens && pnpm test
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add packages/tokens/src/brands/ packages/tokens/tests/brands.test.ts
git commit -m "feat(tokens): add brand overlays (singularidade matriz + integras seguindo)"
```

---

## Task 12: Style Dictionary build config

**Files:**
- Create: `packages/tokens/style-dictionary.config.mjs`
- Create: `packages/tokens/tests/build.test.ts`
- Modify: `packages/tokens/package.json` (adiciona scripts)

- [ ] **Step 1: Instalar Style Dictionary**

```bash
pnpm --filter @singularidade/tokens add -D style-dictionary@^4.3.0
```

- [ ] **Step 2: Criar `packages/tokens/style-dictionary.config.mjs`**

```js
import StyleDictionary from 'style-dictionary';
import { readdirSync, mkdirSync } from 'fs';
import { join } from 'path';

const BRANDS = ['singularidade', 'integras'];
const MODES = ['light', 'dark'];

mkdirSync('build/css', { recursive: true });
mkdirSync('build/js', { recursive: true });
mkdirSync('build/json', { recursive: true });
mkdirSync('build/java', { recursive: true });

function configFor(brand, mode) {
  return {
    source: [
      'src/core/**/*.json',
      `src/semantic/color.${mode}.json`,
      'src/semantic/typography.json',
      'src/component/**/*.json',
      `src/brands/${brand}/identity.json`,
      `src/brands/${brand}/overrides.json`,
    ],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'build/css/',
        files: [
          {
            destination: `${brand}.${mode}.css`,
            format: 'css/variables',
            options: { selector: `[data-brand="${brand}"][data-theme="${mode}"], :root[data-brand="${brand}"][data-theme="${mode}"]` },
          },
        ],
      },
      js: {
        transformGroup: 'js',
        buildPath: 'build/js/',
        files: [
          {
            destination: `${brand}.${mode}.js`,
            format: 'javascript/esm',
          },
          {
            destination: `${brand}.${mode}.d.ts`,
            format: 'typescript/es6-declarations',
          },
        ],
      },
      json: {
        transformGroup: 'js',
        buildPath: 'build/json/',
        files: [
          {
            destination: `${brand}.${mode}.json`,
            format: 'json/flat',
          },
        ],
      },
    },
  };
}

// Default Java output: usa Singularidade light como base
const javaConfig = {
  source: [
    'src/core/**/*.json',
    'src/semantic/color.light.json',
    'src/semantic/typography.json',
    'src/component/**/*.json',
    'src/brands/singularidade/identity.json',
    'src/brands/singularidade/overrides.json',
  ],
  platforms: {
    java: {
      transformGroup: 'java',
      buildPath: 'build/java/',
      files: [
        {
          destination: 'SingularidadeTokens.java',
          format: 'java/object',
          className: 'SingularidadeTokens',
          packageName: 'digital.singularidade.tokens',
        },
      ],
    },
  },
};

// Build all variants
for (const brand of BRANDS) {
  for (const mode of MODES) {
    const sd = new StyleDictionary(configFor(brand, mode));
    await sd.buildAllPlatforms();
  }
}

const sdJava = new StyleDictionary(javaConfig);
await sdJava.buildAllPlatforms();

// Build the canonical "tokens" entry: Singularidade light
const canonical = new StyleDictionary({
  ...configFor('singularidade', 'light'),
  platforms: {
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [
        { destination: 'tokens.js', format: 'javascript/esm' },
        { destination: 'tokens.d.ts', format: 'typescript/es6-declarations' },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'build/json/',
      files: [{ destination: 'tokens.json', format: 'json/flat' }],
    },
  },
});
await canonical.buildAllPlatforms();

console.log('✓ Build complete');
console.log(`  CSS: ${readdirSync('build/css').length} files`);
console.log(`  JS:  ${readdirSync('build/js').length} files`);
console.log(`  JSON: ${readdirSync('build/json').length} files`);
console.log(`  Java: ${readdirSync('build/java').length} files`);
```

- [ ] **Step 3: Rodar build**

```bash
cd packages/tokens && pnpm build
```

Expected output:
```
✓ Build complete
  CSS: 4 files (singularidade.light.css, singularidade.dark.css, integras.light.css, integras.dark.css)
  JS:  10 files (4 brand × mode + tokens.js + .d.ts variants)
  JSON: 5 files
  Java: 1 file (SingularidadeTokens.java)
```

- [ ] **Step 4: Inspecionar output CSS**

```bash
cat packages/tokens/build/css/singularidade.light.css | head -30
```

Expected: contém `--color-brand-primary: #E91E8B;` e `--color-interactive-primary: #BE3550;`.

- [ ] **Step 5: Escrever teste de build (smoke)**

```ts
// packages/tokens/tests/build.test.ts
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const BUILD_DIR = join(import.meta.dirname, '..', 'build');

describe('build outputs', () => {
  it('gera 4 CSS files (2 brands × 2 modes)', () => {
    expect(existsSync(join(BUILD_DIR, 'css/singularidade.light.css'))).toBe(true);
    expect(existsSync(join(BUILD_DIR, 'css/singularidade.dark.css'))).toBe(true);
    expect(existsSync(join(BUILD_DIR, 'css/integras.light.css'))).toBe(true);
    expect(existsSync(join(BUILD_DIR, 'css/integras.dark.css'))).toBe(true);
  });

  it('CSS singularidade.light contém brand magenta puro', () => {
    const css = readFileSync(join(BUILD_DIR, 'css/singularidade.light.css'), 'utf-8');
    expect(css).toContain('--color-brand-primary: #E91E8B');
    expect(css).toContain('--color-interactive-primary: #BE3550');
  });

  it('CSS singularidade.dark usa coral.400 como interactive', () => {
    const css = readFileSync(join(BUILD_DIR, 'css/singularidade.dark.css'), 'utf-8');
    expect(css).toContain('--color-interactive-primary: #FB7185');
  });

  it('JSON canonical tokens.json existe', () => {
    expect(existsSync(join(BUILD_DIR, 'json/tokens.json'))).toBe(true);
  });

  it('Java SingularidadeTokens.java existe', () => {
    expect(existsSync(join(BUILD_DIR, 'java/SingularidadeTokens.java'))).toBe(true);
  });
});
```

- [ ] **Step 6: Rodar build + test**

```bash
cd packages/tokens && pnpm build && pnpm test
```

Expected: build OK + test PASS.

- [ ] **Step 7: Commit**

```bash
git add packages/tokens/style-dictionary.config.mjs packages/tokens/tests/build.test.ts packages/tokens/package.json pnpm-lock.yaml
git commit -m "feat(tokens): add Style Dictionary build (CSS + JS + JSON + Java multi-brand × multi-mode)"
```

---

## Task 13: Maven pom.xml para tokens (Java publish)

**Files:**
- Create: `pom.xml` (root aggregator)
- Create: `packages/tokens/pom.xml`

- [ ] **Step 1: Criar `pom.xml` root aggregator**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>digital.singularidade</groupId>
    <artifactId>singularidade-ui-design-system-parent</artifactId>
    <version>0.1.0-SNAPSHOT</version>
    <packaging>pom</packaging>

    <name>Singularidade Design System (parent)</name>

    <modules>
        <module>packages/tokens</module>
    </modules>

    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <distributionManagement>
        <repository>
            <id>codeartifact</id>
            <url>https://singularidade-digital-539191403497.d.codeartifact.us-east-1.amazonaws.com/maven/maven/</url>
        </repository>
    </distributionManagement>
</project>
```

- [ ] **Step 2: Criar `packages/tokens/pom.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>digital.singularidade</groupId>
        <artifactId>singularidade-ui-design-system-parent</artifactId>
        <version>0.1.0-SNAPSHOT</version>
        <relativePath>../../pom.xml</relativePath>
    </parent>

    <artifactId>tokens</artifactId>
    <packaging>jar</packaging>
    <name>Singularidade Tokens</name>
    <description>Design tokens compiled to Java constants and CSS</description>

    <build>
        <resources>
            <resource>
                <directory>build/java</directory>
                <targetPath>digital/singularidade/tokens</targetPath>
            </resource>
            <resource>
                <directory>build/css</directory>
                <targetPath>META-INF/resources/tokens/css</targetPath>
            </resource>
            <resource>
                <directory>build/json</directory>
                <targetPath>META-INF/resources/tokens/json</targetPath>
            </resource>
        </resources>

        <plugins>
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.13.0</version>
                <configuration>
                    <source>21</source>
                    <target>21</target>
                </configuration>
            </plugin>

            <plugin>
                <artifactId>exec-maven-plugin</artifactId>
                <groupId>org.codehaus.mojo</groupId>
                <version>3.5.0</version>
                <executions>
                    <execution>
                        <id>build-tokens</id>
                        <phase>generate-resources</phase>
                        <goals><goal>exec</goal></goals>
                        <configuration>
                            <executable>pnpm</executable>
                            <arguments>
                                <argument>--filter</argument>
                                <argument>@singularidade/tokens</argument>
                                <argument>build</argument>
                            </arguments>
                            <workingDirectory>${project.basedir}/../..</workingDirectory>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```

- [ ] **Step 3: Testar build Maven local**

```bash
mvn -pl packages/tokens install -DskipTests
```

Expected: build OK, JAR criado em `packages/tokens/target/tokens-0.1.0-SNAPSHOT.jar` contendo `digital/singularidade/tokens/SingularidadeTokens.class` + `META-INF/resources/tokens/css/*.css` + JSON.

- [ ] **Step 4: Verificar JAR**

```bash
unzip -l packages/tokens/target/tokens-0.1.0-SNAPSHOT.jar | grep -E "(SingularidadeTokens|tokens.css)"
```

Expected: lista os arquivos.

- [ ] **Step 5: Adicionar `target/` ao .gitignore do package**

Modify `packages/tokens/.gitignore`:

```
build/
node_modules/
target/
*.tsbuildinfo
```

- [ ] **Step 6: Commit**

```bash
git add pom.xml packages/tokens/pom.xml packages/tokens/.gitignore
git commit -m "feat(tokens): add Maven pom for Java publishing via CodeArtifact"
```

---

## Task 14: GitHub Actions ci.yml

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `.github/dependabot.yml`

- [ ] **Step 1: Criar `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9.15.0 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm format:check

  typecheck:
    name: Typecheck
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9.15.0 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck

  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9.15.0 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm test

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9.15.0 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build

  java-build:
    name: Java Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9.15.0 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - uses: actions/setup-java@v4
        with: { distribution: temurin, java-version: 21, cache: maven }
      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter @singularidade/tokens build
      - run: mvn -pl packages/tokens install -DskipTests -B

  changeset-check:
    name: Changeset Required
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: pnpm/action-setup@v4
        with: { version: 9.15.0 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm changeset status --since=origin/main
        continue-on-error: true
```

- [ ] **Step 2: Criar `.github/dependabot.yml`**

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
      day: monday
      time: "09:00"
    open-pull-requests-limit: 5
    groups:
      dev-deps:
        dependency-type: development
  - package-ecosystem: maven
    directory: /
    schedule:
      interval: weekly
      day: monday
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
      day: monday
```

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/ci.yml .github/dependabot.yml
git commit -m "ci: add CI workflow (lint, typecheck, test, build, java-build, changeset-check)"
```

- [ ] **Step 4: Push branch + abrir PR de teste pra validar CI**

(O usuário faz isso manualmente — push o branch e abre PR. CI roda e mostra resultados.)

---

## Task 15: GitHub Actions release.yml

**Files:**
- Create: `.github/workflows/release.yml`

- [ ] **Step 1: Criar `.github/workflows/release.yml`**

```yaml
name: Release

on:
  push:
    branches: [main]

concurrency:
  group: release
  cancel-in-progress: false

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      id-token: write   # npm provenance
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: pnpm/action-setup@v4
        with: { version: 9.15.0 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm, registry-url: 'https://registry.npmjs.org' }
      - uses: actions/setup-java@v4
        with: { distribution: temurin, java-version: 21, cache: maven }

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: us-east-1
          role-to-assume: ${{ secrets.AWS_CODEARTIFACT_ROLE }}

      - run: pnpm install --frozen-lockfile

      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          publish: pnpm release
          createGithubReleases: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Sync Maven version
        if: steps.changesets.outputs.published == 'true'
        run: |
          NEW_VERSION=$(node -p "require('./packages/tokens/package.json').version")
          mvn versions:set -DnewVersion=$NEW_VERSION -DgenerateBackupPoms=false
          mvn versions:commit

      - name: Login to AWS CodeArtifact
        if: steps.changesets.outputs.published == 'true'
        run: |
          aws codeartifact login --tool maven --repository maven --domain singularidade-digital --domain-owner 539191403497

      - name: Maven Deploy
        if: steps.changesets.outputs.published == 'true'
        run: mvn -pl packages/tokens deploy -DskipTests -B
```

- [ ] **Step 2: Documentar secrets necessários**

Create `.github/SECRETS.md`:

```markdown
# Secrets necessários no repo

| Secret | Origem | Uso |
|---|---|---|
| `NPM_TOKEN` | npmjs.com → Account → Access Tokens → Automation | Publica @singularidade/* |
| `AWS_CODEARTIFACT_ROLE` | IAM role com permissão `codeartifact:PublishPackageVersion` | Publica em Maven CodeArtifact |

## Setup

1. Configure OIDC trust no IAM role (GitHub OIDC provider).
2. Cole o ARN do role em `Settings → Secrets → Actions → AWS_CODEARTIFACT_ROLE`.
3. Gere automation token no npmjs.com com 2FA opcional, cole em `NPM_TOKEN`.
```

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/release.yml .github/SECRETS.md
git commit -m "ci: add release workflow with Changesets + npm provenance + Maven sync"
```

---

## Task 16: Primeiro release v0.1.0

**Files:**
- Create: `.changeset/initial-release.md`
- Modify: `packages/tokens/package.json` (versão bumpada)

- [ ] **Step 1: Adicionar changeset inicial**

Create `.changeset/initial-release.md`:

```markdown
---
"@singularidade/tokens": minor
---

Initial release of `@singularidade/tokens` — design tokens da Singularidade Digital.

Inclui:
- Core tokens: brand colors (magenta/coral/orange em scales 50-950), neutral warm-magenta undertone, feedback (success/error/warning/info), typography (Plus Jakarta Sans + JetBrains Mono), spacing (escala 4px), radius, shadow, duration, easing
- Semantic tokens light + dark com hybrid color strategy (brand puro em superfícies brand, coral.600/coral.400 como interactive primary)
- Component tokens (button, card, input, dialog)
- Sub-brand overlays (singularidade matriz + integras)
- Outputs Style Dictionary: CSS multi-brand × multi-theme + JS/TS + JSON + Java
```

- [ ] **Step 2: Bumpar versão localmente**

```bash
pnpm exec changeset version
```

Expected: bumpa `packages/tokens/package.json` de `0.0.0` para `0.1.0`, gera `packages/tokens/CHANGELOG.md`.

- [ ] **Step 3: Verificar bump**

```bash
cat packages/tokens/package.json | grep version
cat packages/tokens/CHANGELOG.md | head -10
```

Expected: `"version": "0.1.0"` e changelog entry.

- [ ] **Step 4: Build final + test final**

```bash
pnpm build && pnpm test
```

Expected: tudo verde.

- [ ] **Step 5: Commit**

```bash
git add .changeset/initial-release.md packages/tokens/package.json packages/tokens/CHANGELOG.md
git commit -m "chore: version packages for v0.1.0 release"
```

- [ ] **Step 6: Push e merge na main**

(Manual pelo usuário.) Quando merge na main, a workflow `release.yml` detecta que não há changesets pendentes (foram consumidos pelo `version`) e dispara o publish:
- `npm publish @singularidade/tokens@0.1.0` (com provenance)
- `mvn deploy → CodeArtifact` (com `digital.singularidade:tokens:0.1.0`)
- `gh release create v0.1.0`

- [ ] **Step 7: Verificar publish**

```bash
npm view @singularidade/tokens
aws codeartifact list-package-versions --domain singularidade-digital --domain-owner 539191403497 --repository maven --format maven --namespace digital.singularidade --package tokens
```

Expected: ambos retornam `0.1.0`.

---

## Critérios de aceitação da Fase 1

- ✅ Monorepo pnpm + Turborepo funcionando com `pnpm build` e `pnpm test`
- ✅ TypeScript, ESLint, Prettier, Stylelint configurados e passando
- ✅ Changesets + commitlint + lefthook ativos (hooks instalados)
- ✅ `packages/tokens` contém todos os tokens (core + semantic + component + 2 brands)
- ✅ Style Dictionary builda 4 CSS files (singularidade.{light,dark} + integras.{light,dark})
- ✅ Style Dictionary builda JS module + .d.ts + JSON flat + Java constants
- ✅ Maven `mvn install` no `packages/tokens` produz JAR com Java + CSS + JSON empacotados
- ✅ CI workflow tem 6 jobs verdes (lint, typecheck, test, build, java-build, changeset-check)
- ✅ Release workflow publica em npm (com provenance) e Maven CodeArtifact em sync
- ✅ `@singularidade/tokens@0.1.0` disponível em npm
- ✅ `digital.singularidade:tokens:0.1.0` disponível em CodeArtifact
- ✅ Tag `v0.1.0` + GitHub Release criados

---

## Próximas fases

- **Fase 2 — `packages/brand-assets`** (logos, favicons, icons Lucide + custom, illustrations, fonts WOFF2 self-hosted)
- **Fase 3 — `packages/vaadin-bindings` + migração `singularidade-ui-vaadin`** (Java façade pros tokens, substitui hardcodes em styles.css)
- **Fase 4 — `apps/storybook`** (Storybook 8 web-components, foundations + Vaadin core stories + patterns + Chromatic)
- **Fase 5 — `apps/docs`** (Astro Starlight com brand book, foundations, componentes, devs guides; busca Pagefind; i18n PT/EN/ES; deploy GitHub Pages)
- **Fase 6 — Migração apps consumidores** (`integras-digital` + `integras-digital-plataform` bumpam pra v1 do commons-ui)
- **Fase 7 — CI/CD completo** (Chromatic visual regression bloqueante, A11y bloqueante, maintenance.yml com Renovate/SBOM/link-check)
- **Fase 8 — Go-live `v1.0.0`** (DNS `ds.singularidade.digital`, anúncio público)
