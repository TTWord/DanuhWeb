import { api } from '@/api';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

const useGetUserInfo = () => {
  const getUserInfo = async () => {
    try {
      const { data: response } = await api.user.getMyInfo();

      return response;
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

  return getUserInfo;
};

export default useGetUserInfo;
