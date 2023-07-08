import { api } from '@/api';
import Swal from 'sweetalert2';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface getBlindParams {
  bookIds: string;
  count: number;
  memorizedFilter: boolean;
}

const useGetBlindQuiz = () => {
  const navigate = useNavigate();

  const getBlind = async ({
    bookIds,
    count,
    memorizedFilter,
  }: getBlindParams) => {
    try {
      const { data: response } = await api.memo.getBlindWords({
        bookIds,
        count,
        memorizedFilter,
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
        navigate('/quiz/blind');
      });
    }
  };

  return getBlind;
};

export default useGetBlindQuiz;
