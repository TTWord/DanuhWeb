import { api } from '@/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import { useState } from 'react';

interface IGenerateBook {
  bookName: string;
  sentense: string;
}

const useGenerateBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const generateBook = async (data: IGenerateBook) => {
    try {
      setLoading(true);
      const { data: response } = await api.book.generateBook(
        data.bookName,
        data.sentense,
      );

      if (response.message === '데이터 추가 성공') {
        setLoading(false);
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
      setLoading(false);
    }
  };

  return { isLoading: loading, generateBook };
};

export default useGenerateBook;
