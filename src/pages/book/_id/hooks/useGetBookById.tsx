import { api } from '@/api';
import { AxiosError } from 'axios';
import useToast from '@/hooks/useToast';

const useGetBookById = () => {
  const toast = useToast();

  const getBookById = async (bookId: number) => {
    try {
      const { data: response } = await api.book.getBookById(bookId);

      return response;
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

  return getBookById;
};

export default useGetBookById;
