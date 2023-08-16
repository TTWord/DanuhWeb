import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import TopBarSearch from './TopBarSearch';
import GlobalStyles from '../../../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/theme';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Header/TopBarSearch',
  component: TopBarSearch,
  tags: ['autodocs'],
  argTypes: {
    title: {
      type: 'string',
    },
    onClick: {
      type: 'function',
    },
  },
} satisfies Meta<typeof TopBarSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Search: Story = {
  args: {
    title: 'Share',
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
