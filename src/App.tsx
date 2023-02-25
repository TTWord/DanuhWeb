import Router from '@/routes/Router';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
    <ThemeProvider theme={{ a: 1 }}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
};

export default App;
