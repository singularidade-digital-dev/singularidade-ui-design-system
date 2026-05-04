import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = { title: 'Foundations/Spacing', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;

const STOPS = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32'];

export const Scale: Story = {
  render: () => html`
    <div style="padding:32px;font-family:var(--font-family-sans);">
      <h2 style="font-size:18px;color:var(--color-text-primary);margin:0 0 24px;">
        Spacing scale (4px base)
      </h2>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${STOPS.map(
          (s) => html`
            <div
              style="display:flex;align-items:center;gap:24px;padding:8px 0;border-bottom:1px solid var(--color-border-subtle);"
            >
              <div
                style="font-family:var(--font-family-mono);font-size:12px;color:var(--color-text-secondary);min-width:60px;"
              >
                size.${s}
              </div>
              <div
                style="background:var(--color-brand-primary);height:24px;width:var(--size-${s});border-radius:4px;"
              ></div>
              <div
                style="font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);"
              >
                var(--size-${s})
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `,
};

const RADIUS_STOPS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'];

export const Radius: Story = {
  render: () => html`
    <div style="padding:32px;font-family:var(--font-family-sans);">
      <h2 style="font-size:18px;color:var(--color-text-primary);margin:0 0 24px;">Border radius</h2>
      <div style="display:flex;gap:16px;flex-wrap:wrap;">
        ${RADIUS_STOPS.map(
          (r) => html`
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
              <div
                style="width:80px;height:80px;background:var(--color-brand-secondary);border-radius:var(--radius-${r});"
              ></div>
              <div
                style="font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);"
              >
                radius.${r}
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `,
};

const SHADOWS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

export const Shadow: Story = {
  render: () => html`
    <div
      style="padding:48px;background:var(--color-surface-base);font-family:var(--font-family-sans);"
    >
      <h2 style="font-size:18px;color:var(--color-text-primary);margin:0 0 24px;">
        Shadow scale (light)
      </h2>
      <div style="display:flex;gap:32px;flex-wrap:wrap;">
        ${SHADOWS.map(
          (s) => html`
            <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
              <div
                style="width:120px;height:120px;background:var(--color-surface-raised);border-radius:8px;box-shadow:var(--shadow-light-${s});"
              ></div>
              <div
                style="font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);"
              >
                shadow.light.${s}
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `,
};
