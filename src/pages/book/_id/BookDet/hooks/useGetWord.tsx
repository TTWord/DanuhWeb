import { api } from '@/api';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

const useGetWord = () => {
  const getWord = async (bookId: number) => {
    try {
      const { data: response } = await api.word.getWord(bookId);
      return response.data;
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorCode = err?.response?.status;
      if (errorCode === 409) {
        Swal.fire({
          icon: 'error',
          title: '단어장이 존재하지 않습니다.',
        });
      } else if (errorCode === 403) {
        Swal.fire({
          icon: 'error',
          title: '단어장 조회 권한이 없습니다.',
        });
      }
    }
  };

  return getWord;
};

export default useGetWord;
