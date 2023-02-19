import Intro from '@/pages/Intro';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Intro />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
