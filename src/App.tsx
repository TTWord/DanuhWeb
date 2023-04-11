import Router from '@/routes/Router';
import { RecoilRoot, atom, useRecoilState, useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { lightTheme } from './styles/theme';

export const darkMode = atom({
  key: 'darkMode',
  default: false,
});

const App = () => {
  const isDark = useRecoilValue(darkMode);

  return (
    <RecoilRoot>
      <ThemeProvider theme={isDark ? lightTheme : lightTheme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
