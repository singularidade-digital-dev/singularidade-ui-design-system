import type { Meta, StoryObj } from '@storybook/web-components';
import { html, render } from 'lit';
import '@vaadin/dialog';
import '@vaadin/notification';
import '@vaadin/tooltip';
import '@vaadin/popover';
import '@vaadin/button';

interface VaadinDialogElement extends HTMLElement {
  headerTitle: string;
  opened: boolean;
  renderer: (root: HTMLElement) => void;
}

interface VaadinNotificationElement extends HTMLElement {
  duration: number;
  position: string;
  opened: boolean;
  renderer: (root: HTMLElement) => void;
}

const meta: Meta = { title: 'Vaadin/Overlay', parameters: { layout: 'centered' } };
export default meta;
type Story = StoryObj;

export const Dialog: Story = {
  render: () => {
    const trigger = document.createElement('vaadin-button');
    trigger.textContent = 'Abrir dialog';
    trigger.setAttribute('theme', 'primary');

    trigger.addEventListener('click', () => {
      const dialog = document.createElement('vaadin-dialog') as VaadinDialogElement;
      dialog.headerTitle = 'Confirmar exclusão';
      dialog.renderer = (root: HTMLElement) => {
        render(
          html`
            <p style="margin: 0 0 16px;">Esta ação não pode ser desfeita.</p>
            <div style="display:flex;gap:8px;justify-content:flex-end;">
              <vaadin-button @click=${() => (dialog.opened = false)}>Cancelar</vaadin-button>
              <vaadin-button theme="error primary" @click=${() => (dialog.opened = false)}>
                Excluir
              </vaadin-button>
            </div>
          `,
          root,
        );
      };
      document.body.appendChild(dialog);
      dialog.opened = true;
    });
    return trigger;
  },
};

export const Notification: Story = {
  render: () => {
    const trigger = document.createElement('vaadin-button');
    trigger.textContent = 'Disparar notification';
    trigger.setAttribute('theme', 'primary');

    trigger.addEventListener('click', () => {
      const notification = document.createElement(
        'vaadin-notification',
      ) as VaadinNotificationElement;
      notification.duration = 3000;
      notification.position = 'bottom-end';
      notification.renderer = (root: HTMLElement) => {
        root.textContent = 'Tenant provisionado com sucesso ✓';
      };
      document.body.appendChild(notification);
      notification.opened = true;
    });
    return trigger;
  },
};

export const Tooltip: Story = {
  render: () => html`
    <span
      id="tooltip-target"
      style="cursor:help;color:var(--color-interactive-primary);text-decoration:underline dotted;"
    >
      passe o cursor aqui
    </span>
    <vaadin-tooltip
      for="tooltip-target"
      text="Tooltip do design system Singularidade"
    ></vaadin-tooltip>
  `,
};

export const Popover: Story = {
  render: () => html`
    <vaadin-button id="popover-target">Abrir popover</vaadin-button>
    <vaadin-popover for="popover-target" theme="arrow">
      <p style="margin:0;padding:8px;font-size:13px;">
        Conteúdo do popover acomodado pelo brand theme.
      </p>
    </vaadin-popover>
  `,
};
