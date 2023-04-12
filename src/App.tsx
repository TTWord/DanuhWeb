import Router from '@/routes/Router';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { lightTheme } from './styles/theme';
import { atom, useRecoilValue } from 'recoil';

export const darkMode = atom({
  key: 'darkMode',
  default: false,
});

const App = () => {
  const isDark = useRecoilValue(darkMode);

  return (
    <ThemeProvider theme={isDark ? lightTheme : lightTheme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
};

export default App;
