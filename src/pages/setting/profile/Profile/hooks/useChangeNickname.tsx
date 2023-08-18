import { api } from '@/api';
import { AxiosError } from 'axios';
import useToast from '@/hooks/useToast';
import useNavigatePop from '@/hooks/useNavigatePop';

const useChangeNickname = () => {
  const navigate = useNavigatePop();
  const toast = useToast();

  const changeNickname = async (newNickname: string) => {
    try {
      const { data: response } = await api.user.changeNickname(newNickname);

      if (response.message === 'SUCCESS') {
        navigate('/setting');
      }
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err?.response?.data.message;

      switch (errorMessage) {
        case 'USER_DUPLICATE_NICKNAME':
          toast.error('이미 사용중인 닉네임입니다.');
          break;
        default:
          toast.error('에러가 발생하였습니다.');
          break;
      }
    }
  };

  return changeNickname;
};

export default useChangeNickname;
