import React from 'react';

import { Story, Meta } from '@storybook/react';

import Search, { SearchProps } from '.';

export default {
  title: 'Search',
  component: Search,
  decorators: [
    (Story2) => (
      <div style={{ width: '100%' }}>
        <Story2 />
      </div>
    ),
  ],
  argTypes: {
    // propValue: { control: 'color' },
    // handle: { action: 'clicked' }
  },
  arg: {},
} as Meta;

const Template: Story<SearchProps> = (args) => <Search {...args} />;

export const Default = Template.bind({});

Default.args = {};
