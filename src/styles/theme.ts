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
    primary: {
      default: '#734AE8',
      600: '#8F6CF3',
      400: '#CBBDF3',
      200: '#E3DBFB',
      100: '#F1ECFF',
      hover: '#8865EB',
      pressed: '#9677EE',
      disabled: '#C4BFD2',
    },
    secondary: {
      default: '#46D8EC',
      800: '#0291A4',
      100: '#F4FCFE',
    },
    error: '#FC4B4B',
    warning: '#FC4B4B',
    success: '#05CA5F',
  },
  fonts: {
    pretendard: 'Pretendard',
    gmarketSans: 'GmarketSans',
  },
};

const darkTheme: DefaultTheme = {
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
    primary: {
      default: '#734AE8',
      600: '#8F6CF3',
      400: '#CBBDF3',
      200: '#E3DBFB',
      100: '#F1ECFF',
      hover: '#8865EB',
      pressed: '#9677EE',
      disabled: '#C4BFD2',
    },
    secondary: {
      default: '#46D8EC',
      800: '#0291A4',
      100: '#F4FCFE',
    },
    error: '#FC4B4B',
    warning: '#FC4B4B',
    success: '#05CA5F',
  },
  fonts: {
    pretendard: 'Pretendard',
    gmarketSans: 'GmarketSans',
  },
};

export { lightTheme, darkTheme };
