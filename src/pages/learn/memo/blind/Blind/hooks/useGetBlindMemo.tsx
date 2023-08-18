import { api } from '@/api';
import useToast from '@/hooks/useToast';
import { AxiosError } from 'axios';
import useNavigatePop from '@/hooks/useNavigatePop';

interface getBlindParams {
  bookIds: number[];
  count: number;
}

const useGetBlindMemo = () => {
  const navigate = useNavigatePop();
  const toast = useToast();

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
      const errorMessage = err?.response?.data.message;

      switch (errorMessage) {
        case 'BOOK_IDS_NOT_INSERTED':
          toast.error('단어장의 이름이 지정되지 않았습니다.');
          break;
        case 'BOOK_ACCESS_DENIED':
          toast.error('본인 소유의 단어장이 아닙니다.');
          break;
        case 'BOOK_NOT_FOUND':
          toast.error('존재하지 않는 단어장입니다.');
          break;
        default:
          toast.error('에러가 발생하였습니다.');
          break;
      }

      navigate('/learn/blind');
    }
  };

  return getBlind;
};

export default useGetBlindMemo;
