import { api } from '@/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';

const useSendmail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const sendmail = async (username, password, nickname) => {
    try {
      setLoading(true);
      const { data: response } = await api.auth.sendmail(
        username,
        password,
        nickname,
      );
      setLoading(false);
      // navigate('/auth/join/code');
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: '규칙에 맞게 작성하였는지 확인하세요',
      });
      setLoading(false);
      console.log(e);
    }
  };

  return { isLoading: loading, sendmail };
};

export default useSendmail;
