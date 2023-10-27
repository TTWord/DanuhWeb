import { api } from '@/api';
import { AxiosError } from 'axios';

import { useNavigate } from 'react-router-dom';
import useToast from '@/hooks/useToast';

const useLogin = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const login = async (username: string, password: string) => {
    try {
      const { data: response } = await api.auth.login(username, password);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);

      navigate('/auth/welcome');
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorCode = err?.response?.status;

      switch (errorCode) {
        case 409:
          toast.error('계정 정보가 일치하지 않습니다.');
          break;
        default:
          toast.error('알 수 없는 오류가 발생했습니다');
      }
    }
  };

  return login;
};

export default useLogin;
