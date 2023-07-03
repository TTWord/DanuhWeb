import { Route, Routes, useLocation } from 'react-router-dom';
import UserPage from '@/pages/user/User/UserPage';

const UserRouter = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      {/* 공유 단어장 페이지 */}
      <Route path={'/:id'} element={<UserPage />} />
    </Routes>
  );
};

export default UserRouter;
