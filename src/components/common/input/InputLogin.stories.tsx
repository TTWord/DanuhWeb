import type { Meta, Story } from '@storybook/react';
import InputLogin from './InputLogin';
import { useEffect, useState } from 'react';
import { useArgs } from '@storybook/client-api';

interface InputProps {
  setEmailId: (text: string) => void;
  setDomain: (text: string) => void;
}

const meta: Meta = {
  title: 'Input/InputLogin',
  component: InputLogin,
  tags: ['autodocs'],
};

export default meta;

const Template: Story<InputProps> = (args) => {
  const [_, updateArgs] = useArgs();

  useEffect(() => {
    updateArgs({ emailId: args.setEmailId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args.setEmailId]);

  return <InputLogin {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  setEmailId: () => {},
  setDomain: () => {},
};
