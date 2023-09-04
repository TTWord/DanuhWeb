import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import RadioButton from './RadioButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Button/RadioButton',
  render: (props) => {
    const [{ isChecked }, updateArgs] = useArgs();

    const handleToggleChecked = () => {
      updateArgs({ isChecked: !isChecked });
      action('onClick')();
    };

    return <RadioButton {...props} onClick={handleToggleChecked} />;
  },
  argTypes: {
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
    onClick: {
      type: 'function',
    },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isDisabled: false,
  },
};

export const Disable: Story = {
  args: {
    isDisabled: true,
  },
};
