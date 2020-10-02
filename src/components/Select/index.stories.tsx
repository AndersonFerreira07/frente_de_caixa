import React from 'react';

import { Story, Meta } from '@storybook/react';

import Select, { SelectProps } from '.';

export default {
  title: 'Select',
  component: Select,
  argTypes: {
    // propValue: { control: 'color' },
    onChange: { action: 'clicked' },
  },
  arg: {},
} as Meta;

const Template: Story<SelectProps> = (args) => <Select {...args} />;

export const Default = Template.bind({});

Default.args = {
  lista: [
    {
      /* label: 'RS: 12,34', */
      value: 0,
    },
    {
      /* label: 'RS: 16,34', */
      value: 1,
    },
  ],
};
