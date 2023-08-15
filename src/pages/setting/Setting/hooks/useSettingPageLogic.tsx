import { api } from '@/api';
import useNavigatePush from '@/hooks/useNavigatePush';
import { useQuery } from 'react-query';

const useSettingPageLogic = () => {
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

  const movePasswordPage = () => {
    navigatePush('/setting/password');
  };

  const movePatchNotePage = () => {
    navigatePush('/setting/patchnote');
  };

  const moveAccountDeletePage = () => {
    navigatePush('/setting/delete');
  };

  return {
    about,
    moveProfilePage,
    moveNoticePage,
    moveReportPage,
    movePasswordPage,
    movePatchNotePage,
    moveAccountDeletePage,
  };
};

export default useSettingPageLogic;
