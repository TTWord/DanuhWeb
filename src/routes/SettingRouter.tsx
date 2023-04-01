import NoticeDetpage from '@/pages/setting/NoticeDetPage';
import NoticePage from '@/pages/setting/NoticePage';
import NotificationPage from '@/pages/setting/NotificationPage';
import ProfilePage from '@/pages/setting/ProfilePage';
import SettingPage from '@/pages/setting/SettingPage';
import { Route, Routes } from 'react-router-dom';

const SettingRouter = () => {
  return (
    <Routes>
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
    </Routes>
  );
};

export default SettingRouter;
