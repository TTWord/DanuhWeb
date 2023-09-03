import type { Meta, StoryObj } from '@storybook/react';
import WideButton from './WideButton';
import { useState } from 'react';

interface ButtonProps {
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  ref?: React.MutableRefObject<null>;
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Button/WideButton',
  component: WideButton,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: {
        type: 'text',
        defaultValue: '하단 버튼',
      },
    },
  },
  render: (args) => {
    const [isActive, setIsActive] = useState(false);

    const onClick = () => {
      setIsActive((current) => !current);
    };

    return <WideButton {...args} isActive={isActive} onClick={onClick} />;
  },
} satisfies Meta<typeof WideButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = (args: ButtonProps) => <WideButton {...args} />;
Default.args = {
  children: '하단 버튼',
};
