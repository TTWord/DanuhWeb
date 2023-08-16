import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import TopBarButton from './TopBarButton';
import GlobalStyles from '../../../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/theme';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Header/TopBarButton',
  component: TopBarButton,
  tags: ['autodocs'],
  argTypes: {
    title: {
      type: 'string',
    },
    navigate: {
      type: 'string',
    },
  },
} satisfies Meta<typeof TopBarButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Page title',
    navigate: '/',
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
