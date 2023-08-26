import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Title from './Title';
import GlobalStyles from '../../../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/theme';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Header/Title',
  component: Title,
  tags: ['autodocs'],
  argTypes: {
    title: {
      type: 'string',
    },
  },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Title',
  },
};
