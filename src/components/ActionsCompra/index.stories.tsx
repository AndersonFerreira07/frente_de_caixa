import React from 'react';

import { Story, Meta } from '@storybook/react';

import Actions, { ActionsProps } from '.';

export default {
  title: 'Actions',
  component: Actions,
  argTypes: {
    // propValue: { control: 'color' },
    // handle: { action: 'clicked' }
  },
  arg: {},
} as Meta;

const Template: Story<ActionsProps> = (args) => <Actions {...args} />;

export const Default = Template.bind({});

Default.args = {};
