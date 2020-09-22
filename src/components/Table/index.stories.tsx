import React from 'react';

import { Story, Meta } from '@storybook/react';

import Table, { TablePersonalProps } from '.';

export default {
  title: 'Data View/Table',
  component: Table,
  decorators: [
    (Story2) => (
      <div style={{ width: '500px' }}>
        <Story2 />
      </div>
    ),
  ],
  argTypes: {
    // propValue: { control: 'color' },
    onChange: { action: 'clicked' },
  },
  arg: {},
} as Meta;

const Template: Story<TablePersonalProps> = (args) => <Table {...args} />;

export const Default = Template.bind({});

const lista = [
  {
    produto: 'Mussarela',
    unidades: 45,
    peso: 34,
    unitario: 23,
    total: 45,
  },
  {
    produto: 'Mussarela',
    unidades: 45,
    peso: 34,
    unitario: 23,
    total: 45,
  },
  {
    produto: 'Mussarela',
    unidades: 45,
    peso: 34,
    unitario: 23,
    total: 45,
  },
];

Default.args = {
  lista,
};
