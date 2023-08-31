import type { Meta, StoryObj } from '@storybook/react';
import TextField from './TextField';
import { useState } from 'react';

const meta = {
  title: 'Input/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    width: {
      type: 'number',
    },
    height: {
      type: 'number',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 312,
    height: 320,
  },
};
