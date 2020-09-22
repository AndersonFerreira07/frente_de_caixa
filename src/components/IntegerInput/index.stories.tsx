import React from 'react';

import { Story, Meta } from '@storybook/react';

import IntegerInput, { IntegerInputProps } from '.';

export default {
  title: 'Inputs/IntegerInput',
  component: IntegerInput,
  argTypes: {
    // propValue: { control: 'color' },
    onChange: { action: 'clicked' },
  },
  arg: {},
} as Meta;

const Template: Story<IntegerInputProps> = (args) => <IntegerInput {...args} />;

export const Default = Template.bind({});

Default.args = {};
