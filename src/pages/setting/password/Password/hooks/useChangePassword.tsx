import { AxiosError } from 'axios';
import { api } from '@/api';
import useToast from '@/hooks/useToast';
import useNavigatePop from '@/hooks/useNavigatePop';

const useChangePassword = () => {
  const navigatePop = useNavigatePop();
  const toast = useToast();

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const { data: response } = await api.user.changePassword(
        oldPassword,
        newPassword,
      );

      toast.success('비밀번호 변경을 완료하였습니다.');
      navigatePop('/setting');
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err?.response?.data.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
  };

  return changePassword;
};

export default useChangePassword;
