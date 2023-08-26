import React from 'react';
import { Decorator } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from '../src/styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../src/styles/theme';

const previewDecorator: Decorator = (Story, context) => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <GlobalStyles />
          <Story {...context} />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default previewDecorator;
