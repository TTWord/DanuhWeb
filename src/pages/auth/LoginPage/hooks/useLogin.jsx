import { api } from '@/api';
import { instance } from '@/instance';
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
        alert(errorMessage);
      } else if (errorCode === 400) {
        alert('Bad Request');
      } else if (errorCode === 404) {
        navigate('*');
      } else if (errorCode === 405) {
        alert('Not Allowed');
      }
    }
  };

  return login;
};

export default useLogin;
