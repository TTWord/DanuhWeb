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
      navigate('/auth/join/welcome');
    } catch (e) {
      const errorMessage = e.response.data.message;
      Swal.fire({
        icon: 'error',
        title: errorMessage,
      });
    }
  };

  return signup;
};

export default useSignup;
