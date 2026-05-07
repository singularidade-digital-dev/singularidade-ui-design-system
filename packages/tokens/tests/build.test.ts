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

  it('CSS singularidade.light contém brand magenta puro + coral.600 interactive', () => {
    const css = readFileSync(join(BUILD_DIR, 'css/singularidade.light.css'), 'utf-8');
    expect(css).toContain('--color-brand-primary: #e91e8b');
    expect(css).toContain('--color-interactive-primary: #be3550');
  });

  it('CSS singularidade.dark usa coral.400 como interactive', () => {
    const css = readFileSync(join(BUILD_DIR, 'css/singularidade.dark.css'), 'utf-8');
    expect(css).toContain('--color-interactive-primary: #fb7185');
  });

  it('CSS usa selector themed [data-brand][data-theme]', () => {
    const css = readFileSync(join(BUILD_DIR, 'css/singularidade.light.css'), 'utf-8');
    expect(css).toContain('[data-brand="singularidade"][data-theme="light"]');
  });

  it('JSON canonical tokens.json existe', () => {
    expect(existsSync(join(BUILD_DIR, 'json/tokens.json'))).toBe(true);
  });

  it('Java SingularidadeTokens.java existe no path do package + tem classe', () => {
    const javaPath = join(BUILD_DIR, 'java/digital/singularidade/tokens/SingularidadeTokens.java');
    expect(existsSync(javaPath)).toBe(true);
    const java = readFileSync(javaPath, 'utf-8');
    expect(java).toContain('package digital.singularidade.tokens;');
    expect(java).toContain('public final class SingularidadeTokens');
    expect(java).toContain('"#e91e8b"');
  });

  it.each([
    ['EmailTokensIntegrasLight', '#be3550' /* coral.600 interactive */],
    ['EmailTokensIntegrasDark', '#fb7185' /* coral.400 interactive (dark) */],
    ['EmailTokensSingularidadeLight', '#be3550'],
    ['EmailTokensSingularidadeDark', '#fb7185'],
  ])(
    'Email Java %s existe no subpackage email + tem cor interactive primary correta',
    (className, expectedPrimary) => {
      const javaPath = join(BUILD_DIR, `java/digital/singularidade/tokens/email/${className}.java`);
      expect(existsSync(javaPath)).toBe(true);
      const java = readFileSync(javaPath, 'utf-8');
      expect(java).toContain('package digital.singularidade.tokens.email;');
      expect(java).toContain(`public final class ${className}`);
      expect(java).toContain(`colorInteractivePrimary = "${expectedPrimary}"`);
      // Sanity: integras brands carry the magenta brand primary
      if (className.includes('Integras')) {
        expect(java).toContain('colorBrandPrimary = "#e91e8b"');
      }
    },
  );

  it('Email Java tokens compartilham mesmo java/class format (camelCase, hex inline)', () => {
    const javaPath = join(
      BUILD_DIR,
      'java/digital/singularidade/tokens/email/EmailTokensIntegrasLight.java',
    );
    const java = readFileSync(javaPath, 'utf-8');
    expect(java).toMatch(/public static final String fontSizeM = "\d+px"/);
    expect(java).toMatch(/public static final String radiusLg = "\d+px"/);
    expect(java).toMatch(/public static final String fontFamilySans = ".+"/);
  });
});
