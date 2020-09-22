import React from 'react';

import { Story, Meta } from '@storybook/react';

import EmptyBackground, { EmptyBackgroundProps } from '.';

export default {
  title: 'EmptyBackground',
  component: EmptyBackground,
  argTypes: {
    // propValue: { control: 'color' },
    // handle: { action: 'clicked' }
  },
  arg: {},
} as Meta;

const Template: Story<EmptyBackgroundProps> = (args) => (
  <EmptyBackground {...args} />
);

export const EmptyBackgroundDefault = Template.bind({});

EmptyBackgroundDefault.args = {};
