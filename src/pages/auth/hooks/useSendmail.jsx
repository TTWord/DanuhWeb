import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

const useSendmail = () => {
  const navigate = useNavigate();
  const sendmail = async (username, password, nickname) => {
    try {
      const { data: response } = await api.auth.sendmail(
        username,
        password,
        nickname,
      );
      navigate('/auth/join/code');
    } catch (e) {
      alert('Error!');
    }
  };

  return sendmail;
};

export default useSendmail;
