import type { Meta, StoryObj } from '@storybook/react';
import SampleButton from './SampleButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Button/SampleButton',
  component: SampleButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      type: 'function',
    },
    text: {
      type: 'string',
    },
  },
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '예시 텍스트',
  },
};
