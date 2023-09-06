import { api } from '@/api';
import { AxiosError } from 'axios';
import useToast from '@/hooks/useToast';
import useNavigatePop from '@/hooks/useNavigatePop';
import { useQueryClient } from 'react-query';

interface IUseRenameBook {
  bookId: number;
  newName: string;
}

const useRenameBook = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const renameBook = async ({ bookId, newName }: IUseRenameBook) => {
    try {
      const { data: response } = await api.book.renameBook(bookId, newName);

      if (response.status === 'OK') {
        toast.success('단어장 이름이 변경되었습니다.');
        queryClient.invalidateQueries('BookPage/GetBooks');
      }
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;

      const errorMessage = err?.response?.data.message;

      switch (errorMessage) {
        case 'BOOK_ACCESS_DENIED':
          toast.error('본인 소유의 단어장이 아닙니다.');
          break;
        case 'BOOK_NOT_FOUND':
          toast.error('단어장이 존재하지 않습니다.');
          break;
        default:
          toast.error('에러가 발생하였습니다.');
          break;
      }
    }
  };

  return renameBook;
};

export default useRenameBook;
