import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = { title: 'Foundations/Motion', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;

const DURATIONS = [
  { name: 'instant', value: '0ms' },
  { name: 'fast', value: '100ms' },
  { name: 'base', value: '200ms' },
  { name: 'slow', value: '400ms' },
];

const EASINGS = [
  { name: 'linear', value: 'linear' },
  { name: 'ease-out', value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  { name: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)' },
  { name: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  { name: 'spring', value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
];

export const Durations: Story = {
  render: () => html`
    <style>
      .anim-box {
        width: 60px;
        height: 60px;
        background: var(--color-brand-primary);
        border-radius: 8px;
        animation: slide 2s infinite ease-in-out alternate;
      }
      @keyframes slide {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(240px);
        }
      }
    </style>
    <div style="padding:32px;font-family:var(--font-family-sans);">
      <h2 style="font-size:18px;color:var(--color-text-primary);margin:0 0 24px;">
        Duration scale
      </h2>
      <div style="display:flex;flex-direction:column;gap:24px;">
        ${DURATIONS.map(
          (d) => html`
            <div>
              <div style="display:flex;gap:24px;align-items:center;margin-bottom:8px;">
                <div
                  style="font-family:var(--font-family-mono);font-size:12px;color:var(--color-text-secondary);min-width:80px;"
                >
                  duration.${d.name}
                </div>
                <div
                  style="font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);"
                >
                  ${d.value}
                </div>
              </div>
              <div
                style="height:60px;background:var(--color-surface-sunken);border-radius:8px;padding:0;position:relative;overflow:hidden;"
              >
                <div
                  class="anim-box"
                  style="animation-duration:${d.value === '0ms'
                    ? '0.001s'
                    : d.value};animation-iteration-count:infinite;"
                ></div>
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `,
};

export const Easings: Story = {
  render: () => html`
    <style>
      .ease-box {
        width: 60px;
        height: 60px;
        background: var(--color-brand-secondary);
        border-radius: 8px;
        animation: ease-slide 1.5s infinite alternate;
      }
      @keyframes ease-slide {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(280px);
        }
      }
    </style>
    <div style="padding:32px;font-family:var(--font-family-sans);">
      <h2 style="font-size:18px;color:var(--color-text-primary);margin:0 0 24px;">Easing curves</h2>
      <div style="display:flex;flex-direction:column;gap:20px;">
        ${EASINGS.map(
          (e) => html`
            <div>
              <div style="display:flex;gap:24px;align-items:center;margin-bottom:8px;">
                <div
                  style="font-family:var(--font-family-mono);font-size:12px;color:var(--color-text-secondary);min-width:120px;"
                >
                  easing.${e.name}
                </div>
                <div
                  style="font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);"
                >
                  ${e.value}
                </div>
              </div>
              <div
                style="height:60px;background:var(--color-surface-sunken);border-radius:8px;overflow:hidden;"
              >
                <div class="ease-box" style="animation-timing-function:${e.value};"></div>
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `,
};
