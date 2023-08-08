import { api } from '@/api';
import useToast from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';

const useDeleteAccount = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const submitSurvey = async (data: String[]) => {
    try {
      const response = api.user.survey(data);
      //toast.success('설문조사에 참여해주셔서 감사합니다.');
    } catch (e) {
      console.log(e);
    }
  };

  const deleteAccount = async (surveyData: String[]) => {
    try {
      submitSurvey(surveyData);

      const { data: response } = await api.user.deleteAccount();

      localStorage.removeItem('access_Token');
      localStorage.removeItem('refresh_Token');
      navigate('/auth');
      toast.success('회원탈퇴가 완료되었습니다.');
    } catch (e) {
      console.log(e);
    }
  };

  return deleteAccount;
};

export default useDeleteAccount;
