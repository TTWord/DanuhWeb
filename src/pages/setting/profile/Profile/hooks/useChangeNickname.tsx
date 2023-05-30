import { api } from '@/api';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useChangeNickname = () => {
  const navigate = useNavigate();

  const changeNickname = async (newNickname: string) => {
    try {
      const { data: response } = await api.user.changeNickname(newNickname);

      if (response.message === 'SUCCESS') {
        navigate('/setting');
      }
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err?.response?.data.message;
      Swal.fire({
        icon: 'error',
        title: errorMessage,
      });
    }
  };

  return changeNickname;
};

export default useChangeNickname;
