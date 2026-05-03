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
    for (const v of ['primary', 'secondary', 'tertiary', 'danger'] as const) {
      expect(button.button[v], `button.${v}`).toBeDefined();
    }
  });

  it('tem sizes small, medium, large', () => {
    for (const s of ['small', 'medium', 'large'] as const) {
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
