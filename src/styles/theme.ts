import { DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  colors: {
    white: '#ffffff',
    gray: {
      100: '#f8f8fc',
      200: '#eeeef2',
      300: '#DDDDE4',
      400: '#C5C6D0',
      500: '#9E9EA6',
      600: '#6B6C76',
      700: '#45464F',
      800: '#2E3038',
      900: '#191B23',
    },
    black: '#000000',
  },
  fonts: {
    pretendard: 'Pretendard',
    gmarketSans: 'GmarketSans',
  },
};

const darkTheme: DefaultTheme = {
  colors: {
    white: '#eeeef4',
    gray: {
      100: '#000000',
      200: '#000000',
      300: '#000000',
      400: '#000000',
      500: '#000000',
      600: '#000000',
      700: '#000000',
      800: '#000000',
      900: '#000000',
    },
    black: '#000000',
  },
  fonts: {
    pretendard: 'Pretendard',
    gmarketSans: 'GmarketSans',
  },
};

export { lightTheme, darkTheme };
