import { api } from '@/api';
import useNavigatePush from '@/hooks/useNavigatePush';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

const useSettingPageLogic = () => {
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);

  useEffect(() => {
    setActiveMenu(3);
  }, []);

  const navigatePush = useNavigatePush();
  const { data: about } = useQuery('MyPage/GetMyAbout', async () => {
    const { data: response } = await api.user.getMyInfo();

    return response.data;
  });

  const moveProfilePage = () => {
    navigatePush('/setting/profile');
  };

  const moveNoticePage = () => {
    navigatePush('/setting/notice');
  };

  const moveReportPage = () => {
    navigatePush('/setting/report');
  };

  const moveBookManagePage = () => {
    navigatePush('/setting/book-manage');
  };

  const movePasswordPage = () => {
    navigatePush('/setting/password');
  };

  const movePatchNotePage = () => {
    navigatePush('/setting/patchnote');
  };

  const moveAccountDeletePage = () => {
    navigatePush('/setting/delete');
  };

  const movePrivacyPolicyPage = () => {
    navigatePush('/setting/privacy');
  };

  return {
    about,
    moveProfilePage,
    moveNoticePage,
    moveReportPage,
    moveBookManagePage,
    movePasswordPage,
    movePatchNotePage,
    moveAccountDeletePage,
    movePrivacyPolicyPage,
  };
};

export default useSettingPageLogic;
