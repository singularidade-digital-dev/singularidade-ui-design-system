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

  it('Java SingularidadeTokens.java existe e tem package + classe', () => {
    const javaPath = join(BUILD_DIR, 'java/SingularidadeTokens.java');
    expect(existsSync(javaPath)).toBe(true);
    const java = readFileSync(javaPath, 'utf-8');
    expect(java).toContain('package digital.singularidade.tokens;');
    expect(java).toContain('public final class SingularidadeTokens');
    expect(java).toContain('"#e91e8b"');
  });
});
