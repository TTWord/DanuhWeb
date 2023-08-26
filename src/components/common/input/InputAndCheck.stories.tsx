import type { Meta, StoryObj } from '@storybook/react';
import InputAndCheck from './InputAndCheck';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Input/InputAndCheck',
  component: InputAndCheck,
  tags: ['autodocs'],
  render: (props) => {
    const [value, setValue] = useState('');

    return <InputAndCheck {...props} onChange={setValue} value={value} />;
  },
} satisfies Meta<typeof InputAndCheck>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'default',
    placeholder: 'default',
  },
};
