import type { Meta, StoryObj } from '@storybook/react';
import TopAppBarStack from './TopAppBarStack';

const meta = {
  title: 'Header/TopAppBar/TopAppBarStack',
  component: TopAppBarStack,
  tags: ['autodocs'],
  argTypes: {
    navigate: {
      type: 'string',
    },
    buttonImg: {
      type: 'string',
      control: {
        type: 'file',
      },
    },
  },
} satisfies Meta<typeof TopAppBarStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Page title',
    navigate: '/',
    type: 'default',
  },
};

export const Page: Story = {
  args: {
    title: 'Page title',
    navigate: '/',
    type: 'page',
  },
};

export const Button: Story = {
  args: {
    title: 'Page title',
    navigate: '/',
    type: 'button',
  },
};
