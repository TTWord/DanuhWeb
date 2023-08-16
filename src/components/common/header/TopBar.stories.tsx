import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import TopBar from './TopBar';
import GlobalStyles from '../../../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/theme';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Header/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  argTypes: {
    navigate: {
      type: 'string',
    },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Page title',
    navigate: '/',
    type: 'default',
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

export const Search: Story = {
  args: {
    title: 'Share',
    navigate: '/',
    type: 'search',
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

export const Page: Story = {
  args: {
    title: 'Page title',
    navigate: '/',
    type: 'page',
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

export const Button: Story = {
  args: {
    title: 'Page title',
    navigate: '/',
    type: 'button',
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

export const Setting: Story = {
  args: {
    title: 'Share',
    navigate: '/',
    type: 'setting',
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

export const Close: Story = {
  args: {
    type: 'close',
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
