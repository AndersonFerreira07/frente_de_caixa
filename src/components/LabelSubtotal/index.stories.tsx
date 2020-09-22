import React from 'react';

import { Story, Meta } from '@storybook/react';

import LabelSubtotal, { LabelSubtotalProps } from '.';

export default {
  title: 'LabelSubtotal',
  component: LabelSubtotal,
  argTypes: {
    // propValue: { control: 'color' },
    // handle: { action: 'clicked' }
  },
  arg: {},
} as Meta;

const Template: Story<LabelSubtotalProps> = (args) => (
  <LabelSubtotal {...args} />
);

export const LabelSubtotalDefault = Template.bind({});

LabelSubtotalDefault.args = {};
