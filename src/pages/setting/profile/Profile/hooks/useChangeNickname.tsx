import { api } from '@/api';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import useNavigatePop from '@/hooks/useNavigatePop';

const useChangeNickname = () => {
  const navigate = useNavigatePop();

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
