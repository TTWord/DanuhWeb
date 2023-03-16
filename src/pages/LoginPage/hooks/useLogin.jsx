import { instance } from '@/instance';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const navigate = useNavigate();
  const login = async (username, password, getToken, userToken) => {
    try {
      const response = await instance.post('/user/signin', {
        username,
        password,
      });
      getToken(response.data.access_token);
      localStorage.setItem('accessToken', response.data.access_token);
      navigate('/book');
      alert(response.data.message);
    } catch (e) {
      const errorCode = e.response.status;
      const errorMessage = e.response.data.message;

      if (errorCode === 403 || errorCode === 409) {
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
