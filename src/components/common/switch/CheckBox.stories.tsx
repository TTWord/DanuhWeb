import type { Meta, StoryObj } from '@storybook/react';

import CheckBox from './CheckBox';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'switch/CheckBox',
  component: CheckBox,
  argTypes: {
    isChecked: {
      control: {
        type: 'boolean',
      },
    },
    onClick: {
      type: 'function',
    },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isChecked: true,
    onClick: () => {},
  },
};
