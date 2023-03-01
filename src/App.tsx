import Router from '@/routes/Router';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { lightTheme } from './styles/theme';

const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
