import StyleDictionary from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';
import { mkdirSync, readdirSync } from 'fs';

const BRANDS = ['singularidade', 'integras'];
const MODES = ['light', 'dark'];

mkdirSync('build/css', { recursive: true });
mkdirSync('build/js', { recursive: true });
mkdirSync('build/json', { recursive: true });
mkdirSync('build/java', { recursive: true });

// SD4 builtin css/variables doesn't accept options.selector — register a custom format.
StyleDictionary.registerFormat({
  name: 'css/variables-themed',
  format: async ({ dictionary, file, options }) => {
    const header = await fileHeader({ file });
    const selector = options.selector || ':root';
    const lines = dictionary.allTokens
      .map((t) => `  --${t.name}: ${t.$value ?? t.value};`)
      .join('\n');
    return `${header}${selector} {\n${lines}\n}\n`;
  },
});

// SD4 has no built-in java/* format or transformGroup. Register a minimal one
// that emits a public final class with public static final String constants.
StyleDictionary.registerTransformGroup({
  name: 'java',
  transforms: ['attribute/cti', 'name/camel', 'color/hex'],
});

StyleDictionary.registerFormat({
  name: 'java/class',
  format: async ({ dictionary, file, options }) => {
    const header = await fileHeader({ file, commentStyle: 'long' });
    const className = options.className || 'Tokens';
    const packageName = options.packageName || 'tokens';
    const lines = dictionary.allTokens
      .map(
        (t) =>
          `    public static final String ${t.name} = ${JSON.stringify(String(t.$value ?? t.value))};`,
      )
      .join('\n');
    return `${header}package ${packageName};\n\npublic final class ${className} {\n    private ${className}() {}\n\n${lines}\n}\n`;
  },
});

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
    log: { warnings: 'disabled' },
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'build/css/',
        files: [
          {
            destination: `${brand}.${mode}.css`,
            format: 'css/variables-themed',
            options: {
              selector: `[data-brand="${brand}"][data-theme="${mode}"], :root[data-brand="${brand}"][data-theme="${mode}"]`,
            },
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
    },
  };
}

// Java: usa Singularidade light como base canônica. SD4 nests className/packageName em options.
const javaConfig = {
  source: [
    'src/core/**/*.json',
    'src/semantic/color.light.json',
    'src/semantic/typography.json',
    'src/component/**/*.json',
    'src/brands/singularidade/identity.json',
    'src/brands/singularidade/overrides.json',
  ],
  log: { warnings: 'disabled' },
  platforms: {
    java: {
      transformGroup: 'java',
      buildPath: 'build/java/',
      files: [
        {
          destination: 'SingularidadeTokens.java',
          format: 'java/class',
          options: {
            className: 'SingularidadeTokens',
            packageName: 'digital.singularidade.tokens',
          },
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

// Canonical "tokens" entry: Singularidade light
const canonicalConfig = configFor('singularidade', 'light');
const canonical = new StyleDictionary({
  ...canonicalConfig,
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
console.log(`  CSS:  ${readdirSync('build/css').length} files`);
console.log(`  JS:   ${readdirSync('build/js').length} files`);
console.log(`  JSON: ${readdirSync('build/json').length} files`);
console.log(`  Java: ${readdirSync('build/java').length} files`);
