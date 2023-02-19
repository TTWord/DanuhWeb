import Router from '@/routes/Router';
import tw from 'twin.macro';

const Container = tw.div``;

const App = () => {
  console.log(process.env.ENV_TEST);
  return <Router />;
};

export default App;
