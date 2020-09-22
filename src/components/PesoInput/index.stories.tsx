import React from 'react';

import { Story, Meta } from '@storybook/react';

import PesoInput, { PesoInputProps } from '.';

export default {
  title: 'Inputs/PesoInput',
  component: PesoInput,
  argTypes: {
    // propValue: { control: 'color' },
    onChange: { action: 'clicked' },
  },
  arg: {},
} as Meta;

const Template: Story<PesoInputProps> = (args) => <PesoInput {...args} />;

export const Default = Template.bind({});

Default.args = {};
