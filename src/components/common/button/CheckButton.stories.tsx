import type { Meta, StoryObj } from '@storybook/react';
import CheckButton from './CheckButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Button/CheckButton',
  component: CheckButton,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
