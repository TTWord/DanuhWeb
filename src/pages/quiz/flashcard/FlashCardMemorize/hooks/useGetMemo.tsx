import { api } from '@/api';
import Swal from 'sweetalert2';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface getMemoParams {
  bookId: number;
  count: number;
}

const useGetMemorizeWord = () => {
  const navigate = useNavigate();
  const setMemoList = useSetRecoilState(globalState.memo.memoList);

  const getMemo = async ({ bookId, count }: getMemoParams) => {
    try {
      const { data: response } = await api.memo.getMemorizeWord({
        bookId,
        count,
      });

      setMemoList(response.data.words);
    } catch (e) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorCode = err.response?.status;
      const errorMessage = err.response?.data?.message;
      Swal.fire({
        icon: 'error',
        title: errorMessage,
      }).then(() => {
        navigate('/quiz/flashcard');
      });
    }
  };

  return getMemo;
};

export default useGetMemorizeWord;
