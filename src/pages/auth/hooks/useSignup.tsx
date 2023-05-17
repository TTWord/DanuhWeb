import { api } from '@/api';
import { AxiosError } from 'axios';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const useSignup = () => {
  const navigate = useNavigate();
  const signup = async (
    username: string,
    password: string,
    nickname: string,
    authCode: string,
  ) => {
    try {
      const { data: response } = await api.user.signup(
        username,
        password,
        nickname,
        authCode,
      );
      localStorage.setItem('access_Token', response.data.access_token);
      localStorage.setItem('refresh_Token', response.data.refresh_token);
      navigate('/auth/join/welcome');
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err?.response?.data.message;
      switch (errorMessage) {
        case 'EXPIRED_AUTH_CODE':
          Swal.fire({
            icon: 'error',
            title: '인증코드가 만료되었습니다.',
          });
          break;

        case 'INCORRECT_AUTH_CODE':
          Swal.fire({
            icon: 'error',
            title: '인증코드가 올바르지 않습니다.',
          });
          break;
      }
    }
  };

  return signup;
};

export default useSignup;
