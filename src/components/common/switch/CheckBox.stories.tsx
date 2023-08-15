import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';

import CheckBox from './CheckBox';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Switch/CheckBox',
  render: (props) => {
    const [{ isChecked }, updateArgs] = useArgs();

    const handleToggleChecked = () => {
      updateArgs({ isChecked: !isChecked });
      action('onClick')();
    };

    return <CheckBox {...props} onClick={handleToggleChecked} />;
  },
  argTypes: {
    isChecked: {
      control: {
        type: 'boolean',
      },
    },
    onClick: {
      type: 'function',
    },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isChecked: false,
  },
};
