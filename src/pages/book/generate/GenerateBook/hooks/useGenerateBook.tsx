import { api } from '@/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

interface IGenerateBook {
  bookName: string;
  sentense: string;
}

const useGenerateBook = () => {
  const navigate = useNavigate();

  const generateBook = async (data: IGenerateBook) => {
    try {
      const { data: response } = await api.book.generateBook(
        data.bookName,
        data.sentense,
      );

      if (response.message === '데이터 추가 성공') {
        navigate('/book');
      }
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

  return generateBook;
};

export default useGenerateBook;
