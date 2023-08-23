import type { Meta, StoryObj } from '@storybook/react';
import InputLogin from './InputLogin';
import GlobalStyles from '../../../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/theme';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { useArgs } from '@storybook/client-api';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Input/InputLogin',
  component: InputLogin,
  tags: ['autodocs'],
  render: () => {
    const [emailId, setEmailId] = useState('');
    const [domain, setDomain] = useState('');

    const [{}, updateArgs] = useArgs();

    useEffect(() => {
      updateArgs({ emailId });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailId, domain]);

    return (
      <RecoilRoot>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyles />
          <InputLogin setDomain={setEmailId} setEmailId={setDomain} />
        </ThemeProvider>
      </RecoilRoot>
    );
  },
} satisfies Meta<typeof InputLogin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
