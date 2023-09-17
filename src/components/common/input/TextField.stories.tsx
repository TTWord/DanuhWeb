import type { Meta, StoryObj } from '@storybook/react';
import TextField from './TextField';
import { useState } from 'react';

const meta = {
  title: 'Input/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    height: {
      type: 'number',
    },
    placeholder: {
      type: 'string',
    },
    value: {
      type: 'string',
    },
    onChange: {
      type: 'function',
    },
    cols: {
      type: 'number',
    },
  },
  render: (props) => {
    const [value, setValue] = useState('');

    return (
      <TextField
        {...props}
        placeholder={'TextField 입니다.'}
        onChange={setValue}
        value={value}
      />
    );
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'TextField 입니다.',
  },
};

export const Resize: Story = {
  args: {
    height: 320,
    value: '',
    placeholder: 'TextField 입니다.',
  },
};
