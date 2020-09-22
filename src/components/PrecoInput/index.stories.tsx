import React from 'react';

import { Story, Meta } from '@storybook/react';

import PrecoInput, { PrecoInputProps } from '.';

export default {
  title: 'Inputs/PrecoInput',
  component: PrecoInput,
  argTypes: {
    // propValue: { control: 'color' },
    onChange: { action: 'clicked' },
  },
  arg: {},
} as Meta;

const Template: Story<PrecoInputProps> = (args) => <PrecoInput {...args} />;

export const Default = Template.bind({});

Default.args = {};
