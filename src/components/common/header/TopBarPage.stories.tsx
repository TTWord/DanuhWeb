import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import TopBarPage from './TopBarPage';
import GlobalStyles from '../../../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/theme';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Header/TopBarPage',
  component: TopBarPage,
  tags: ['autodocs'],
  argTypes: {
    title: {
      type: 'string',
    },
    navigate: {
      type: 'string',
    },
    currentPage: {
      type: 'number',
    },
    lastPage: {
      type: 'number',
    },
  },
} satisfies Meta<typeof TopBarPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Page title',
    navigate: '/',
    currentPage: 1,
    lastPage: 3,
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
