import { api } from '@/api';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const navigate = useNavigate();
  const login = async (username, password) => {
    try {
      const { data: response } = await api.auth.login(username, password);
      localStorage.setItem('access_Token', response.data.access_token);
      localStorage.setItem('refresh_Token', response.data.refresh_token);
      navigate('/book');
    } catch (e) {
      const errorCode = e.response.status;
      const errorMessage = e.response.data.message;

      if (errorCode === 409) {
        Swal.fire({
          icon: 'error',
          title: errorMessage,
        });
      } else if (errorCode === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Bad Request',
        });
      } else if (errorCode === 404) {
        navigate('*');
      } else if (errorCode === 405) {
        Swal.fire({
          icon: 'error',
          title: 'Not Allowed',
        });
      }
    }
  };

  return login;
};

export default useLogin;
