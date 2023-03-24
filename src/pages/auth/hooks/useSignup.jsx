import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

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
      alert('Error!');
    }
  };

  return signup;
};

export default useSignup;
