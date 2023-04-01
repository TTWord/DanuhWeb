import RankingPage from '@/pages/ranking/RankingPage';
import { Route, Routes } from 'react-router-dom';

const RankRouter = () => {
  return (
    <Routes>
      {/* 랭킹 메인 페이지 */}
      <Route path={'/'} element={<RankingPage />} />
    </Routes>
  );
};

export default RankRouter;
