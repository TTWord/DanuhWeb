import Router from '@/routes/Router';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { lightTheme } from './styles/theme';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect } from 'react';
import Toast, { toastStatus } from './components/common/toast/Toast';

export const darkMode = atom({
  key: 'darkMode',
  default: false,
});

const queryClient = new QueryClient();

const App = () => {
  const isDark = useRecoilValue(darkMode);

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    //주소창을 제외한 영역을 "--vh"라는 속성으로 정의
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
  });

  window.addEventListener('resize', () => setScreenSize());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? lightTheme : lightTheme}>
        <GlobalStyles />
        <Toast />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
