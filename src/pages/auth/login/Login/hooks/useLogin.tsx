import { api } from '@/api';
import { AxiosError } from 'axios';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const navigate = useNavigate();
  const login = async (username: string, password: string) => {
    try {
      const { data: response } = await api.auth.login(username, password);
      localStorage.setItem('access_Token', response.data.access_token);
      localStorage.setItem('refresh_Token', response.data.refresh_token);
      navigate('/book');
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorCode = err?.response?.status;
      const errorMessage = err?.response?.data.message;

      switch (errorCode) {
        case 409:
          Swal.fire({
            icon: 'error',
            title: errorMessage,
          });
        default:
          Swal.fire({
            icon: 'error',
            title: 'Fail',
          });
      }
    }
  };

  return login;
};

export default useLogin;
