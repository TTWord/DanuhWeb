import type { Meta, StoryObj } from '@storybook/react';
import TopAppBar from './TopAppBar';

const meta = {
  title: 'Header/TopAppBar/TopAppBar',
  component: TopAppBar,
  tags: ['autodocs'],
  argTypes: {
    type: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
  },
} satisfies Meta<typeof TopAppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Quiz',
    type: 'default',
  },
};

export const Search: Story = {
  args: {
    title: 'Share',
    type: 'search',
    onClick: () => {
      alert('클릭됨');
    },
  },
};

export const Setting: Story = {
  args: {
    title: 'Setting',
    type: 'setting',
    onClick: () => {
      alert('클릭됨');
    },
  },
};
