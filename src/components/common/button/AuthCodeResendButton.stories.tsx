import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import AuthCodeResendButton from './AuthCodeResendButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Button/AuthCodeResendButton',
  component: AuthCodeResendButton,
  tags: ['autodocs'],
  argTypes: {
    isActive: {
      control: {
        type: 'boolean',
      },
    },
    onClick: {
      type: 'function',
    },
  },
  render: (props) => {
    const [{ isActive }, updateArgs] = useArgs();

    const handleToggleChecked = () => {
      updateArgs({ isActive: !isActive });
      action('onClick')();
    };

    return <AuthCodeResendButton {...props} onClick={handleToggleChecked} />;
  },
} satisfies Meta<typeof AuthCodeResendButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
