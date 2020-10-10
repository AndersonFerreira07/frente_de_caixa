import React from 'react';

import { Story, Meta } from '@storybook/react';

import AutoCompleteProduto, { AutoCompleteProdutoProps } from '.';

export default {
  title: 'AutoCompleteProduto',
  component: AutoCompleteProduto,
  argTypes: {
    // propValue: { control: 'color' },
    // handle: { action: 'clicked' }
  },
  arg: {},
} as Meta;

const Template: Story<AutoCompleteProdutoProps> = (args) => (
  <AutoCompleteProduto {...args} />
);

export const AutoCompleteProdutoDefault = Template.bind({});

AutoCompleteProdutoDefault.args = {};
