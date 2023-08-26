import type { Meta, StoryObj } from '@storybook/react';
import FooterButton from './FooterButton';
import { useState } from 'react';

interface ButtonProps {
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  ref?: React.MutableRefObject<null>;
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Button/FooterButton',
  component: FooterButton,
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

    return <FooterButton {...args} isActive={isActive} onClick={onClick} />;
  },
} satisfies Meta<typeof FooterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = (args: ButtonProps) => <FooterButton {...args} />;
Default.args = {
  children: '하단 버튼',
};
