import NoticeDetpage from '@/pages/setting/notice/NoticeDet/NoticeDetPage';
import NoticePage from '@/pages/setting/notice/Notice/NoticePage';
import NotificationPage from '@/pages/setting/notification/Notification/NotificationPage';
import ProfilePage from '@/pages/setting/profile/Profile/ProfilePage';
import SettingPage from '@/pages/setting/Setting/SettingPage';
import ReportPage from '@/pages/setting/report/Report/ReportPage';
import PasswordPage from '@/pages/setting/password/Password/PasswordPage';
import DeleteAccountPage from '@/pages/setting/delete/DeleteAccount/DeleteAccountPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import RouteTransition from './RouteTransition';
import RouteTransitionWrapper from './RouteTransitionWrapper';
import RootLayout from '@/components/layout/RootLayout';

const SettingRouter = () => {
  const location = useLocation();
  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route element={<RouteTransitionWrapper />}>
          {/* 설정 페이지 */}
          <Route element={<RootLayout />}>
            <Route path={'/'} element={<SettingPage />} />
          </Route>

          {/* 프로필 변경 페이지 */}
          <Route path={'/profile'} element={<ProfilePage />} />

          {/* 알림설정 페이지 (나중에 사용 예정) */}
          <Route path={'/notification'} element={<NotificationPage />} />

          {/* 공지사항 메인 페이지 */}
          <Route path={'/notice'} element={<NoticePage />} />

          {/* 공지사항 세부 페이지 */}
          <Route path={'/notice/:id'} element={<NoticeDetpage />} />

          {/* 건의하기 / 버그신고 페이지 */}
          <Route path={'/report'} element={<ReportPage />} />

          {/* 비밀번호 변경 페이지 */}
          <Route path={'/password'} element={<PasswordPage />} />

          {/* 탈퇴하기 페이지 */}
          <Route path={'/delete'} element={<DeleteAccountPage />} />
        </Route>
      </Routes>
    </RouteTransition>
  );
};

export default SettingRouter;
