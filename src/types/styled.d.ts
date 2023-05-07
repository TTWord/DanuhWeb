// styled components theme
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      gray: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      black: string;
    };
    fonts: {
      pretendard: string;
      gmarketSans: string;
    };
  }
}