interface ITheme {
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
}

const lightTheme: ITheme = {
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
};

const darkTheme: ITheme = {
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
};

export { lightTheme, darkTheme };
