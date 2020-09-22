import React from 'react';

import { Story, Meta } from '@storybook/react';

import Label, { LabelProps } from '.';

export default {
  title: 'Label',
  component: Label,
  argTypes: {
    // propValue: { control: 'color' },
    // handle: { action: 'clicked' }
  },
  arg: {},
} as Meta;

const Template: Story<LabelProps> = (args) => <Label {...args} />;

export const Default = Template.bind({});

Default.args = {};
