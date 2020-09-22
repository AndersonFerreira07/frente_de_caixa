import React from 'react';

import { Story, Meta } from '@storybook/react';

import DialogoConfirmacao, { DialogoConfirmacaoProps } from '.';

export default {
  title: 'DialogoConfirmacao',
  component: DialogoConfirmacao,
  argTypes: {
    // propValue: { control: 'color' },
    // handle: { action: 'clicked' }
  },
  arg: {},
} as Meta;

const Template: Story<DialogoConfirmacaoProps> = (args) => (
  <DialogoConfirmacao {...args} />
);

export const DialogoConfirmacaoDefault = Template.bind({});

DialogoConfirmacaoDefault.args = {};
