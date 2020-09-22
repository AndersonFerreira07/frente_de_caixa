import React from 'react';

import { Story, Meta } from '@storybook/react';

import Frente, { FrenteProps } from '.';

export default {
  title: 'Frente',
  component: Frente,
  argTypes: {
    // propValue: { control: 'color' },
    // handle: { action: 'clicked' }
  },
  arg: {},
} as Meta;

const Template: Story<FrenteProps> = (args) => <Frente {...args} />;

export const FrenteDefault = Template.bind({});

FrenteDefault.args = {};
