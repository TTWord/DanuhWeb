import { api } from '@/api';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useSetRecoilState } from 'recoil';
import { toastStatus } from '@/components/common/toast/Toast';
import { useNavigate } from 'react-router-dom';

const useGetSharedBookById = () => {
  const navigate = useNavigate();
  const setToast = useSetRecoilState(toastStatus);

  const getSharedBookById = async (id: number) => {
    try {
      const { data: response } = await api.share.getSharedBookById(id);

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

  return getSharedBookById;
};

export default useGetSharedBookById;
