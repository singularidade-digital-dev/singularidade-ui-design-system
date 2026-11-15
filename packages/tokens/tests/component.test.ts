import { describe, it, expect } from 'vitest';
import button from '../src/component/button.json' with { type: 'json' };
import card from '../src/component/card.json' with { type: 'json' };
import cardLight from '../src/component/card.light.json' with { type: 'json' };
import cardDark from '../src/component/card.dark.json' with { type: 'json' };
import input from '../src/component/input.json' with { type: 'json' };
import dialog from '../src/component/dialog.json' with { type: 'json' };

describe('button tokens', () => {
  it('primary aponta pra interactive.primary semantic e o texto para on-primary', () => {
    expect(button.button.primary.background.$value).toBe('{color.interactive.primary}');
    expect(button.button.primary.foreground.$value).toBe('{color.on-primary}');
  });

  it('tem variants primary, secondary, tertiary, danger', () => {
    for (const v of ['primary', 'secondary', 'tertiary', 'danger'] as const) {
      expect(button.button[v], `button.${v}`).toBeDefined();
    }
  });

  it('secundário com borda de controle e terciário com hover em primary-subtle (v2)', () => {
    expect(button.button.secondary.border.$value).toBe('{color.border.control}');
    expect(button.button.secondary['background-hover'].$value).toBe(
      '{color.interactive.secondary}',
    );
    expect(button.button.tertiary['background-hover'].$value).toBe(
      '{color.interactive.primary-subtle}',
    );
    expect(button.button.danger['background-hover'].$value).toBe('{color.feedback.error.hover}');
  });

  it('sizes small, medium, large ficam como aliases deprecados', () => {
    for (const s of ['small', 'medium', 'large'] as const) {
      expect(button.button.size[s].padding.$deprecated, `button.size.${s}`).toBeDefined();
    }
  });
});

describe('card tokens', () => {
  it('usa surface.raised e a borda muda com o tema (subtle no claro, default no escuro)', () => {
    expect(card.card.background.$value).toBe('{color.surface.raised}');
    expect(cardLight.card.border.$value).toBe('{color.border.subtle}');
    expect(cardDark.card.border.$value).toBe('{color.border.default}');
  });

  it('usa radius.lg', () => {
    expect(card.card.radius.$value).toBe('{radius.lg}');
  });

  it('sombras do card seguem o tema (antes eram sempre as do claro)', () => {
    expect(card.card.shadow.default.$value).toBe('{shadow.xs}');
    expect(card.card.shadow.hover.$value).toBe('{shadow.md}');
  });
});

describe('input tokens', () => {
  it('borda de controle e foco em border.focus', () => {
    expect(input.input.border.$value).toBe('{color.border.control}');
    expect(input.input.focus.border.$value).toBe('{color.border.focus}');
  });
});

describe('dialog tokens', () => {
  it('três larguras e sombra xl por tema', () => {
    expect(dialog.dialog['width-sm'].$value).toBe('400px');
    expect(dialog.dialog['max-width'].$value).toBe('560px');
    expect(dialog.dialog['width-lg'].$value).toBe('800px');
    expect(dialog.dialog.shadow.$value).toBe('{shadow.xl}');
  });
});
