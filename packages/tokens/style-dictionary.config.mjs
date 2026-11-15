import StyleDictionary from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';
import { mkdirSync, readdirSync, writeFileSync } from 'fs';

const BRANDS = ['singularidade', 'integras'];
const MODES = ['light', 'dark'];
// Integras is the default brand of the design system v2: theme.css, the canonical
// tokens.{js,json} and SingularidadeTokens.java resolve to Integras light.
const DEFAULT_BRAND = 'integras';

const JAVA_PACKAGE_PATH = 'build/java/digital/singularidade/tokens';
// Emit email tokens under the same Java source root so the existing
// <sourceDirectory>build/java</sourceDirectory> in pom.xml picks them up
// automatically — no build-helper-maven-plugin needed.
const EMAIL_JAVA_PACKAGE_PATH = 'build/java/digital/singularidade/tokens/email';

mkdirSync('build/css', { recursive: true });
mkdirSync('build/js', { recursive: true });
mkdirSync('build/json', { recursive: true });
mkdirSync(JAVA_PACKAGE_PATH, { recursive: true });
mkdirSync(EMAIL_JAVA_PACKAGE_PATH, { recursive: true });

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// ---- Sources ---------------------------------------------------------------
// Files named *.light.json / *.dark.json hold the values that change with the
// theme; everything else is shared by both themes. The brand overlay comes last
// so brands/<brand>/overrides.json wins over the defaults (Integras).
function sourcesFor(brand, mode) {
  return [
    'src/core/color.json',
    'src/semantic/color.json',
    `src/semantic/color.${mode}.json`,
    'src/core/typography.json',
    'src/semantic/typography.json',
    'src/core/spacing.json',
    'src/core/radius.json',
    'src/core/shadow.json',
    'src/semantic/shadow.json',
    `src/semantic/shadow.${mode}.json`,
    'src/core/duration.json',
    'src/core/easing.json',
    'src/core/layout.json',
    'src/component/button.json',
    'src/component/card.json',
    `src/component/card.${mode}.json`,
    'src/component/dialog.json',
    'src/component/input.json',
    `src/brands/${brand}/identity.json`,
    `src/brands/${brand}/overrides.json`,
  ];
}

// ---- Filters ---------------------------------------------------------------
// brand.* identity tokens (name, logo paths) become url("@singularidade/…") in CSS,
// which no browser can load: they stay in JS, JSON and Java only.
const isIdentity = (token) => token.path[0] === 'brand';
// Text styles are composite tokens: CSS gets them as classes (text-styles.css),
// not as custom properties; Java has no use for them.
const isTextStyle = (token) => token.$type === 'typography';
const cssVariableFilter = (token) => !isIdentity(token) && !isTextStyle(token);
const javaFilter = (token) => !isTextStyle(token);

// ---- Transforms ------------------------------------------------------------
// Font sizes are authored in px (the design spec) and emitted in rem on CSS so
// browser text zoom works; JS, JSON and Java keep px (e-mail needs px).
StyleDictionary.registerTransform({
  name: 'size/fontPxToRem',
  type: 'value',
  filter: (token) => token.path[0] === 'font' && token.path[1] === 'size',
  transform: (token) => {
    const value = String(token.$value ?? token.value);
    const match = value.match(/^(-?\d*\.?\d+)px$/);
    if (!match) return value;
    return `${Number(match[1]) / 16}rem`;
  },
});

// The built-in css group minus typography/css/shorthand, which would flatten a
// text style into a `font` shorthand and drop its letter-spacing.
StyleDictionary.registerTransformGroup({
  name: 'css/ds',
  transforms: [
    ...StyleDictionary.hooks.transformGroups.css.filter((t) => t !== 'typography/css/shorthand'),
    'size/fontPxToRem',
  ],
});

// SD4 has no built-in java/* format or transformGroup. Register a minimal one
// that emits a public final class with public static final String constants.
StyleDictionary.registerTransformGroup({
  name: 'java',
  transforms: ['attribute/cti', 'name/camel', 'color/hex'],
});

// ---- Formats ---------------------------------------------------------------
const valueOf = (token) => token.$value ?? token.value;

function declaration(token) {
  const note = token.$deprecated ? ` /* deprecated: ${token.$deprecated} */` : '';
  return `  --${token.name}: ${valueOf(token)};${note}`;
}

// SD4 builtin css/variables doesn't accept options.selector — register a custom format.
StyleDictionary.registerFormat({
  name: 'css/variables-themed',
  format: async ({ dictionary, file, options }) => {
    const header = await fileHeader({ file });
    const selector = options.selector || ':root';
    const lines = dictionary.allTokens.map(declaration).join('\n');
    return `${header}${selector} {\n${lines}\n}\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'java/class',
  format: async ({ dictionary, file, options }) => {
    const header = await fileHeader({ file, commentStyle: 'long' });
    const className = options.className || 'Tokens';
    const packageName = options.packageName || 'tokens';
    const lines = dictionary.allTokens
      .map((t) => {
        const deprecated = t.$deprecated
          ? `    /** @deprecated ${t.$deprecated} */\n    @Deprecated\n`
          : '';
        return `${deprecated}    public static final String ${t.name} = ${JSON.stringify(String(valueOf(t)))};`;
      })
      .join('\n');
    return `${header}package ${packageName};\n\npublic final class ${className} {\n    private ${className}() {}\n\n${lines}\n}\n`;
  },
});

// ---- Configs ---------------------------------------------------------------
const siteSelector = (brand, mode) =>
  `[data-brand="${brand}"][data-theme="${mode}"], :root[data-brand="${brand}"][data-theme="${mode}"]`;

function configFor(brand, mode) {
  return {
    source: sourcesFor(brand, mode),
    log: { warnings: 'disabled' },
    platforms: {
      // One file per brand × theme, selected by data-brand + data-theme on the
      // element: the contract the sites (integras-digital-website,
      // singularidade-website) rely on. Vaadin uses theme.css instead.
      css: {
        transformGroup: 'css/ds',
        buildPath: 'build/css/',
        files: [
          {
            destination: `${brand}.${mode}.css`,
            format: 'css/variables-themed',
            filter: cssVariableFilter,
            options: { selector: siteSelector(brand, mode) },
          },
        ],
      },
      js: {
        transformGroup: 'js',
        buildPath: 'build/js/',
        files: [
          { destination: `${brand}.${mode}.js`, format: 'javascript/esm' },
          { destination: `${brand}.${mode}.d.ts`, format: 'typescript/es6-declarations' },
        ],
      },
      json: {
        transformGroup: 'js',
        buildPath: 'build/json/',
        files: [{ destination: `${brand}.${mode}.json`, format: 'json/flat' }],
      },
      // Per-brand × mode Java POJO consumed by Spring/Thymeleaf for email
      // rendering (cf. integras-digital-plataform spec
      // 2026-05-07-design-system-comunicacoes-design.md). Reuses the
      // java/class format — same constant names as SingularidadeTokens, just
      // segregated per brand×mode so a consumer can pick the right resolved set.
      emailJava: {
        transformGroup: 'java',
        buildPath: `${EMAIL_JAVA_PACKAGE_PATH}/`,
        files: [
          {
            destination: `EmailTokens${capitalize(brand)}${capitalize(mode)}.java`,
            format: 'java/class',
            filter: javaFilter,
            options: {
              className: `EmailTokens${capitalize(brand)}${capitalize(mode)}`,
              packageName: 'digital.singularidade.tokens.email',
            },
          },
        ],
      },
    },
  };
}

// ---- Build: brand × mode ---------------------------------------------------
const cssDictionaries = {};
for (const brand of BRANDS) {
  for (const mode of MODES) {
    const sd = new StyleDictionary(configFor(brand, mode));
    await sd.buildAllPlatforms();
    cssDictionaries[`${brand}.${mode}`] = await sd.getPlatformTokens('css');
  }
}

// ---- theme.css: one file for Vaadin and any page ---------------------------
const cssTokens = (dictionary) => dictionary.allTokens.filter(cssVariableFilter);
const byName = (tokens) => new Map(tokens.map((t) => [t.name, t]));

const light = cssTokens(cssDictionaries[`${DEFAULT_BRAND}.light`]);
const lightByName = byName(light);
const dark = byName(cssTokens(cssDictionaries[`${DEFAULT_BRAND}.dark`]));

// Both themes declare the same names; the dark block repeats only what changes.
if (light.length !== dark.size || [...dark.keys()].some((name) => !lightByName.has(name))) {
  throw new Error('theme.css: the light and dark themes must declare the same tokens');
}
const themed = light.filter((t) => valueOf(t) !== valueOf(dark.get(t.name)));

// The Singularidade brand may differ from Integras only in the brand colours, and
// by the same values in both themes: data-brand swaps the brand, never the theme.
const BRAND_SWAP = ['color-brand-primary', 'color-brand-secondary', 'color-brand-tertiary'];
const brandDelta = {};
for (const mode of MODES) {
  const base = byName(cssTokens(cssDictionaries[`${DEFAULT_BRAND}.${mode}`]));
  const changed = cssTokens(cssDictionaries[`singularidade.${mode}`]).filter(
    (t) => valueOf(t) !== valueOf(base.get(t.name)),
  );
  const names = changed.map((t) => t.name).sort();
  if (names.join() !== [...BRAND_SWAP].sort().join()) {
    throw new Error(
      `theme.css: data-brand="singularidade" may change only ${BRAND_SWAP.join(', ')}; the ${mode} theme changes ${names.join(', ')}`,
    );
  }
  brandDelta[mode] = changed;
}
for (const t of brandDelta.light) {
  const inDark = brandDelta.dark.find((d) => d.name === t.name);
  if (valueOf(inDark) !== valueOf(t)) {
    throw new Error(`theme.css: --${t.name} of the singularidade brand differs between themes`);
  }
}

const block = (selectors, tokens) =>
  `${selectors.join(',\n')} {\n${tokens.map(declaration).join('\n')}\n}\n`;

const themeCss = [
  `/**
 * Do not edit directly, this file was auto-generated by style-dictionary.config.mjs.
 *
 * Singularidade Design System: every token, for any page and for the Vaadin theme
 * singularidade-base. Integras is the default brand.
 *   :root                                 light theme
 *   [data-theme='light']                  light theme for a region inside a dark page
 *   [theme~='dark'], [data-theme='dark']  dark theme (Vaadin sets theme="dark" on <html>)
 *   [data-brand='singularidade']          swaps only the three brand colours
 */
`,
  block([':root'], light),
  block(["[data-theme='light']"], themed),
  block(["[theme~='dark']", "[data-theme='dark']"], themed.map((t) => dark.get(t.name))),
  // The descendant form outranks a nested [data-theme] block, which re-declares
  // the theme tokens but must keep the brand chosen higher up.
  block(
    ["[data-brand='singularidade']", "[data-brand='singularidade'] [data-theme]"],
    brandDelta.light,
  ),
].join('\n');
writeFileSync('build/css/theme.css', themeCss);
console.log('✔︎ build/css/theme.css');

// ---- text-styles.css: the v2 text styles as classes ------------------------
const textStyles = cssDictionaries[`${DEFAULT_BRAND}.light`].allTokens.filter(isTextStyle);
const familyVar = (token) => {
  const ref = String(token.original.$value.fontFamily).match(/^\{(.+)\}$/);
  return ref ? `var(--${ref[1].replace(/\./g, '-')})` : token.$value.fontFamily;
};
const textStylesCss = [
  `/**
 * Do not edit directly, this file was auto-generated by style-dictionary.config.mjs.
 *
 * Text styles of the Singularidade Design System. Load after theme.css (or a
 * {brand}.{theme}.css file): font-family reads the --font-family-* tokens.
 */
`,
  ...textStyles.map((t) => {
    const v = t.$value;
    const props = [
      `  font-family: ${familyVar(t)};`,
      `  font-size: ${v.fontSize};`,
      `  line-height: ${v.lineHeight};`,
      `  font-weight: ${v.fontWeight};`,
      ...(v.letterSpacing !== undefined ? [`  letter-spacing: ${v.letterSpacing};`] : []),
    ];
    return `.${t.path[t.path.length - 1]} {\n${props.join('\n')}\n}\n`;
  }),
].join('\n');
writeFileSync('build/css/text-styles.css', textStylesCss);
console.log('✔︎ build/css/text-styles.css');

// ---- Canonical outputs: default brand, light -------------------------------
const canonical = new StyleDictionary({
  source: sourcesFor(DEFAULT_BRAND, 'light'),
  log: { warnings: 'disabled' },
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
    java: {
      transformGroup: 'java',
      buildPath: `${JAVA_PACKAGE_PATH}/`,
      files: [
        {
          destination: 'SingularidadeTokens.java',
          format: 'java/class',
          filter: javaFilter,
          options: {
            className: 'SingularidadeTokens',
            packageName: 'digital.singularidade.tokens',
          },
        },
      ],
    },
  },
});
await canonical.buildAllPlatforms();

console.log('✓ Build complete');
console.log(`  CSS:        ${readdirSync('build/css').length} files`);
console.log(`  JS:         ${readdirSync('build/js').length} files`);
console.log(`  JSON:       ${readdirSync('build/json').length} files`);
console.log(`  Java:       ${readdirSync(JAVA_PACKAGE_PATH).length} files`);
console.log(`  Email Java: ${readdirSync(EMAIL_JAVA_PACKAGE_PATH).length} files`);
