import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const BUILD_DIR = join(import.meta.dirname, '..', 'build');
const read = (path: string) => readFileSync(join(BUILD_DIR, path), 'utf-8');

describe('build outputs', () => {
  it('gera theme.css, text-styles.css e os 4 CSS dos sites (2 marcas × 2 temas)', () => {
    for (const file of [
      'theme.css',
      'text-styles.css',
      'singularidade.light.css',
      'singularidade.dark.css',
      'integras.light.css',
      'integras.dark.css',
    ]) {
      expect(existsSync(join(BUILD_DIR, 'css', file)), file).toBe(true);
    }
  });

  it('theme.css: claro no :root, escuro em [theme~=dark] e [data-theme=dark], Integras por padrão', () => {
    const css = read('css/theme.css');
    expect(css).toMatch(/^:root \{$/m);
    expect(css).toMatch(/^\[data-theme='light'\] \{$/m);
    expect(css).toMatch(/^\[theme~='dark'\],\n\[data-theme='dark'\] \{$/m);
    expect(css).toMatch(
      /^\[data-brand='singularidade'\],\n\[data-brand='singularidade'\] \[data-theme\] \{$/m,
    );
    expect(css).toContain('--color-brand-primary: #e91e8b;');
    expect(css).toContain('--color-interactive-primary: #be3550;');
    expect(css).toContain('--color-interactive-primary: #fb7185;');
  });

  it('CSS singularidade.light: marca com a paleta original e coral.600 como ação', () => {
    const css = read('css/singularidade.light.css');
    expect(css).toContain('--color-brand-primary: #ed1e79');
    expect(css).toContain('--color-interactive-primary: #be3550');
  });

  it('CSS singularidade.dark usa coral.400 como interactive', () => {
    const css = read('css/singularidade.dark.css');
    expect(css).toContain('--color-interactive-primary: #fb7185');
  });

  it('CSS dos sites usa selector themed [data-brand][data-theme]', () => {
    const css = read('css/singularidade.light.css');
    expect(css).toContain('[data-brand="singularidade"][data-theme="light"]');
  });

  it('tamanhos de fonte saem em rem no CSS e em px no Java', () => {
    expect(read('css/theme.css')).toContain('--font-size-xs: 0.75rem;');
    expect(read('css/integras.light.css')).toContain('--font-size-m: 0.875rem;');
    expect(read('java/digital/singularidade/tokens/email/EmailTokensIntegrasLight.java')).toContain(
      'fontSizeM = "14px"',
    );
  });

  it('JSON canonical tokens.json existe e segue a marca padrão (Integras claro)', () => {
    const json = JSON.parse(read('json/tokens.json')) as Record<string, unknown>;
    expect(json.ColorBrandPrimary).toBe('#e91e8b');
    expect(json.ColorBorderControl).toBe('#8c7b86');
    expect(json.BrandId).toBe('integras');
  });

  it('Java SingularidadeTokens.java existe no path do package + tem classe', () => {
    const javaPath = join(BUILD_DIR, 'java/digital/singularidade/tokens/SingularidadeTokens.java');
    expect(existsSync(javaPath)).toBe(true);
    const java = readFileSync(javaPath, 'utf-8');
    expect(java).toContain('package digital.singularidade.tokens;');
    expect(java).toContain('public final class SingularidadeTokens');
    expect(java).toContain('"#e91e8b"');
    // text styles are composite tokens: CSS classes only, never "[object Object]" in Java
    expect(java).not.toContain('[object Object]');
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
      expect(java).not.toContain('[object Object]');
      expect(java).toContain(
        className.includes('Integras')
          ? 'colorBrandPrimary = "#e91e8b"'
          : 'colorBrandPrimary = "#ed1e79"',
      );
    },
  );

  it('Email Java tokens compartilham mesmo java/class format (camelCase, hex inline)', () => {
    const java = read('java/digital/singularidade/tokens/email/EmailTokensIntegrasLight.java');
    expect(java).toMatch(/public static final String fontSizeM = "\d+px"/);
    expect(java).toMatch(/public static final String radiusLg = "\d+px"/);
    expect(java).toMatch(/public static final String fontFamilySans = ".+"/);
    expect(java).toMatch(/public static final String fontFamilyEmail = "'Plus Jakarta Sans', .+"/);
  });

  it('constantes Java dos nomes que saem levam @Deprecated', () => {
    const java = read('java/digital/singularidade/tokens/email/EmailTokensIntegrasLight.java');
    expect(java).toMatch(/@Deprecated\n {4}public static final String shadowLightXs = /);
    expect(java).toMatch(/@Deprecated\n {4}public static final String inputBorderRadius = /);
    expect(java).not.toMatch(/@Deprecated\n {4}public static final String shadowXs = /);
  });
});
