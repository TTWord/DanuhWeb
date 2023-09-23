import type { Meta, StoryObj } from '@storybook/react';
import TopAppBarClose from './TopAppBarClose';

const meta = {
  title: 'Header/TopAppBar/TopAppBarClose',
  component: TopAppBarClose,
  tags: ['autodocs'],
  argTypes: {
    title: {
      type: 'string',
    },
    onClose: {
      type: 'function',
    },
  },
} satisfies Meta<typeof TopAppBarClose>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '',
    onClose: () => {
      alert('클릭됨');
    },
  },
};
