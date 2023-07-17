import { api } from '@/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface getBlindParams {
  bookIds: number[];
  count: number;
}

const useGetBlindMemo = () => {
  const navigate = useNavigate();

  const getBlind = async ({ bookIds, count }: getBlindParams) => {
    try {
      const { data: response } = await api.memo.getBlindWords({
        bookIds,
        count,
      });

      return response;
    } catch (e) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err.response?.data?.message;
      Swal.fire({
        icon: 'error',
        title: errorMessage,
      }).then(() => {
        navigate('/learn/blind');
      });
    }
  };

  return getBlind;
};

export default useGetBlindMemo;
