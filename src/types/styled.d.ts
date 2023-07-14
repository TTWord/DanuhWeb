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
      primary: {
        default: string;
        800: string;
        600: string;
        400: string;
        200: string;
        100: string;
        hover: string;
        pressed: string;
        disabled: string;
      };
      secondary: {
        default: string;
        800: string;
        100: string;
      };
      error: string;
      warning: string;
      success: string;
    };
    fonts: {
      pretendard: string;
      gmarketSans: string;
    };
    typography: {
      gmarketSans: {
        md: {
          18: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
          14: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
          12: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
        };
      };
      pretendard: {
        t1: {
          sbd: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
        };
        t2: {
          sbd: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
          md: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
        };
        t3: {
          bd: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
          sbd: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
          md: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
        };
        t4: {
          sbd: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
          md: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
        };
        b1: {
          bd: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };

          sbd: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
          md: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
          rg: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
        };

        c1: {
          sbd: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
          md: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
          rg: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
        };

        c2: {
          sbd: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
          rg: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
            fontWeight: string;
          };
        };
      };
    };
  }
}
