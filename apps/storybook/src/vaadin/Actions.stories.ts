import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@vaadin/button';
import '@vaadin/menu-bar';

const meta: Meta = { title: 'Vaadin/Actions', parameters: { layout: 'centered' } };
export default meta;
type Story = StoryObj;

export const PrimaryButton: Story = {
  render: () => html` <vaadin-button theme="primary">Salvar alterações</vaadin-button> `,
};

export const SecondaryButton: Story = {
  render: () => html` <vaadin-button>Cancelar</vaadin-button> `,
};

export const TertiaryButton: Story = {
  render: () => html` <vaadin-button theme="tertiary">Ver detalhes</vaadin-button> `,
};

export const DangerButton: Story = {
  render: () => html` <vaadin-button theme="error primary">Excluir tenant</vaadin-button> `,
};

export const SuccessButton: Story = {
  render: () => html` <vaadin-button theme="success primary">Confirmar pagamento</vaadin-button> `,
};

export const ButtonSizes: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <vaadin-button theme="primary small">Small</vaadin-button>
      <vaadin-button theme="primary">Medium</vaadin-button>
      <vaadin-button theme="primary large">Large</vaadin-button>
    </div>
  `,
};

export const ButtonStates: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <vaadin-button theme="primary">Default</vaadin-button>
      <vaadin-button theme="primary" disabled>Disabled</vaadin-button>
      <vaadin-button>Secondary</vaadin-button>
      <vaadin-button theme="tertiary">Tertiary</vaadin-button>
      <vaadin-button theme="contrast primary">Contrast</vaadin-button>
    </div>
  `,
};

export const MenuBar: Story = {
  render: () => html`
    <vaadin-menu-bar
      .items=${[
        { text: 'Arquivo', children: [{ text: 'Novo' }, { text: 'Abrir' }, { text: 'Exportar' }] },
        { text: 'Editar', children: [{ text: 'Desfazer' }, { text: 'Refazer' }] },
        { text: 'Ajuda' },
      ]}
    ></vaadin-menu-bar>
  `,
};
