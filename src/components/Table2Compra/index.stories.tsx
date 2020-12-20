import React from 'react';

import { Story, Meta } from '@storybook/react';

import Table2, { Table2Props } from '.';

export default {
  title: 'Table2',
  component: Table2,
  argTypes: {
    // propValue: { control: 'color' },
    // handle: { action: 'clicked' }
  },
  arg: {},
} as Meta;

const Template: Story<Table2Props> = (args) => <Table2 {...args} />;

export const Table2Default = Template.bind({});

const lista = [
  {
    produto: 'Mussarela1',
    unidades: 45,
    peso: 34,
    unitario: 23,
    total: 45,
    obs: 'lalla',
    uidd: 'Mussarela123',
    validade: new Date(),
  },
  {
    produto: 'Mussarela2',
    unidades: 45,
    peso: 34,
    unitario: 23,
    total: 45,
    obs: 'lalla',
    uidd: 'Mussarela223',
    validade: new Date(),
  },
  {
    produto: 'Mussarela3',
    unidades: 45,
    peso: 34,
    unitario: 23,
    total: 45,
    obs: 'lalla',
    uidd: 'Mussarela323',
    validade: new Date(),
  },
];

Table2Default.args = {
  rows: lista,
};
