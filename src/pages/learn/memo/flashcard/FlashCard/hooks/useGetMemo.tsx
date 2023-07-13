import { api } from '@/api';
import Swal from 'sweetalert2';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import useToast from '@/hooks/useToast';

interface getMemoParams {
  bookIds: number[];
  count: number;
}

const useGetMemorizeWord = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const setMemoList = useSetRecoilState(globalState.memo.memoList);

  const getMemo = async ({ bookIds, count }: getMemoParams) => {
    try {
      const { data: response } = await api.memo.getMemorizeWord({
        bookIds,
        count,
      });

      setMemoList(response.data.words);
    } catch (e) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err.response?.data?.message;

      if (errorMessage === 'WORD_LESS_THAN_COUNT') {
        toast.error('단어 개수가 4개 이상 필요합니다.');
      } else {
        toast.error(errorMessage || '알 수 없는 오류가 발생했습니다.');
      }

      navigate('/learn/flashcard');
    }
  };

  return getMemo;
};

export default useGetMemorizeWord;
