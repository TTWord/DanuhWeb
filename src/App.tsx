import Router from '@/routes/Router';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { lightTheme } from './styles/theme';
import { atom, useRecoilValue } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

export const darkMode = atom({
  key: 'darkMode',
  default: false,
});

const queryClient = new QueryClient();

const App = () => {
  const isDark = useRecoilValue(darkMode);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? lightTheme : lightTheme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
