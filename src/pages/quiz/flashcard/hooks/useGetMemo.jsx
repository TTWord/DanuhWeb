import { api } from '@/api';
import Swal from 'sweetalert2';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const useGetMemo = () => {
  const setMemoList = useSetRecoilState(globalState.memo.memoList);
  const navigate = useNavigate();

  const getMemo = async (bookID, count, nav) => {
    try {
      const { data: response } = await api.memo.flashcard(bookID, count);
      setMemoList(response.data.words);
      navigate(`/quiz/flashcard/${nav}`);
    } catch (e) {
      const errorCode = e.response.status;
      const errorMessage = e.response.data.message;
      Swal.fire({
        icon: 'error',
        title: errorMessage,
      });
    }
  };

  return getMemo;
};

export default useGetMemo;
