import React from 'react';

import { Story, Meta } from '@storybook/react';

import Footer, { FooterProps } from '.';

export default {
  title: 'Footer',
  component: Footer,
  argTypes: {
    // propValue: { control: 'color' },
    // handle: { action: 'clicked' }
  },
  arg: {},
} as Meta;

const Template: Story<FooterProps> = (args) => <Footer {...args} />;

export const FooterDefault = Template.bind({});

FooterDefault.args = {};
