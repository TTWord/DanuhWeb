import { api } from '@/api';
import { AxiosError } from 'axios';
import { useState } from 'react';
import useToast from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isError, setIsError] = useState(false);

  const signup = async (
    username: string,
    password: string,
    nickname: string,
    authCode: string,
  ) => {
    try {
      const { data: response } = await api.auth.signup(
        username,
        password,
        nickname,
        authCode,
      );
      localStorage.setItem('access_Token', response.data.access_token);
      localStorage.setItem('refresh_Token', response.data.refresh_token);
      navigate('/auth/welcome');
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err?.response?.data.message;
      switch (errorMessage) {
        case 'AUTH_EXPIRED_CODE':
          toast.error('인증코드가 만료되었습니다.');
          break;

        case 'AUTH_INCORRECT_CODE':
          setIsError(true);
          break;
      }
    }
  };

  return { signup, isError };
};

export default useSignup;
