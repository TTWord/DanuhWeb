import { api } from '@/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'error',
        title: '규칙에 맞게 작성하였는지 확인하세요',
      });
      console.log(e);
    }
  };

  return sendmail;
};

export default useSendmail;
