import { api } from '@/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const useSignup = () => {
  const navigate = useNavigate();
  const signup = async (username, password, nickname, authCode) => {
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
    } catch (e) {
      const errorMessage = e.response.data.message;
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
