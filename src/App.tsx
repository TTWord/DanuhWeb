import Router from '@/routes/Router';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './styles/theme';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect } from 'react';
import Common from './Common';

export const darkMode = atom({
  key: 'darkMode',
  default: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// 구글 로그인을 위한 userAgent 수정
const modifyUserAgent = () => {
  Object.defineProperty(navigator, 'userAgent', {
    value:
      'Mozilla/5.0 (Windows NT 10.0; Win64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
    writable: false,
    configurable: true,
  });
};

const App = () => {
  const isDark = useRecoilValue(darkMode);

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    //주소창을 제외한 영역을 "--vh"라는 속성으로 정의
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
    modifyUserAgent();
  });

  window.addEventListener('resize', () => setScreenSize());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? lightTheme : lightTheme}>
        <Common>
          <Router />
        </Common>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
