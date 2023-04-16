import NoticeDetpage from '@/pages/setting/NoticeDetPage';
import NoticePage from '@/pages/setting/NoticePage';
import NotificationPage from '@/pages/setting/NotificationPage';
import ProfilePage from '@/pages/setting/ProfilePage';
import SettingPage from '@/pages/setting/SettingPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import RouteTransition from './RouteTransition';
import RouteTransitionWrapper from './RouteTransitionWrapper';

const SettingRouter = () => {
  const location = useLocation();
  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route element={<RouteTransitionWrapper />}>
          {/* 설정 페이지 */}
          <Route path={'/'} element={<SettingPage />} />

          {/* 프로필 변경 페이지 */}
          <Route path={'/profile'} element={<ProfilePage />} />

          {/* 알림설정 페이지 */}
          <Route path={'/notification'} element={<NotificationPage />} />

          {/* 공지사항 메인 페이지 */}
          <Route path={'/notice'} element={<NoticePage />} />

          {/* 공지사항 세부 페이지 */}
          <Route path={'/notice/:id'} element={<NoticeDetpage />} />
        </Route>
      </Routes>
    </RouteTransition>
  );
};

export default SettingRouter;
