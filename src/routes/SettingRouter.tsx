import NoticePage from '@/pages/setting/notice/Notice/NoticePage';
import NotificationPage from '@/pages/setting/notification/Notification/NotificationPage';
import ProfilePage from '@/pages/setting/profile/Profile/ProfilePage';
import SettingPage from '@/pages/setting/Setting/SettingPage';
import PatchNotePage from '@/pages/setting/patchnote/PatchNotePage';
import ReportPage from '@/pages/setting/report/Report/ReportPage';
import PasswordPage from '@/pages/setting/password/Password/PasswordPage';
import DeleteAccountPage from '@/pages/setting/delete/DeleteAccount/DeleteAccountPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';
import NoticeDetPage from '@/pages/setting/notice/NoticeDet/NoticeDetPage';
import PrivacyPolicyPage from '@/pages/setting/privacy/PrivacyPolicyPage';
import PrivacyPolicySinglePage from '@/pages/setting/privacy/PrivacyPolicySinglePage';

const SettingRouter = () => {
  const location = useLocation();
  return (
    <Routes location={location}>
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
      <Route path={'/notice/:id'} element={<NoticeDetPage />} />

      {/* 패치노트 페이지 */}
      <Route path={'/patchnote'} element={<PatchNotePage />} />

      {/* 건의하기 / 버그신고 페이지 */}
      <Route path={'/report'} element={<ReportPage />} />

      {/* 비밀번호 변경 페이지 */}
      <Route path={'/password'} element={<PasswordPage />} />

      {/* 탈퇴하기 페이지 */}
      <Route path={'/delete'} element={<DeleteAccountPage />} />

      {/* 개인정보 처리방침 페이지 */}
      <Route path={'/privacy'} element={<PrivacyPolicyPage />} />
      <Route path={'/privacy/single'} element={<PrivacyPolicySinglePage />} />
    </Routes>
  );
};

export default SettingRouter;
