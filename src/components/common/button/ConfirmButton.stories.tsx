import type { Meta, StoryObj } from '@storybook/react';
import ConfirmButton from './ConfirmButton';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Button/ConfirmButton',
  component: ConfirmButton,
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Big: Story = {
  args: {
    type: 'big',
  },
};

export const Small: Story = {
  args: {
    type: 'small',
  },
};
