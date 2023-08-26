import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Input/Input',
  component: Input,
  tags: ['autodocs'],
  render: (props) => {
    const [value, setValue] = useState('');

    return <Input {...props} onChange={setValue} value={value} />;
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'default',
    placeholder: 'default',
  },
};

export const Fit: Story = {
  args: {
    type: 'fit',
    placeholder: 'fit',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'password',
  },
};
