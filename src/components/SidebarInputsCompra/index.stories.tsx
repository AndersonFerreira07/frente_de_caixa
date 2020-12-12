import React from 'react';

import { Story, Meta } from '@storybook/react';

import SidebarInputs, { SidebarInputsProps } from '.';

export default {
  title: 'SidebarInputs',
  component: SidebarInputs,
  argTypes: {
    // propValue: { control: 'color' },
    // handle: { action: 'clicked' }
  },
  arg: {},
} as Meta;

const Template: Story<SidebarInputsProps> = (args) => (
  <SidebarInputs {...args} />
);

export const Default = Template.bind({});

Default.args = {};
