import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import Toggle from './Toggle';

const meta = {
  title: 'Switch/Toggle',
  render: (props) => {
    const [{ isToggle }, updateArgs] = useArgs();

    const handleToggleChecked = () => {
      updateArgs({ isToggle: !isToggle });
      action('onClick')();
    };

    return <Toggle {...props} onClick={handleToggleChecked} />;
  },
  argTypes: {
    isToggle: {
      control: {
        type: 'boolean',
      },
    },
    onClick: {
      type: 'function',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isToggle: false,
  },
};
