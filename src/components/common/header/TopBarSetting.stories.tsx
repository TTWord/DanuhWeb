import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import TopBarSetting from './TopBarSetting';
import GlobalStyles from '../../../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/theme';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Header/TopBarSetting',
  component: TopBarSetting,
  tags: ['autodocs'],
  argTypes: {
    title: {
      type: 'string',
    },
  },
} satisfies Meta<typeof TopBarSetting>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Page title',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <GlobalStyles />
          <Story />
        </BrowserRouter>
      </ThemeProvider>
    ),
  ],
};
