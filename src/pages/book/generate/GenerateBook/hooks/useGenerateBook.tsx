import { api } from '@/api';
import { useNavigate } from 'react-router-dom';
import useToast from '@/hooks/useToast';
import { AxiosError } from 'axios';
import { useState } from 'react';

interface IGenerateBook {
  bookName: string;
  sentense: string;
}

const useGenerateBook = () => {
  const navigate = useNavigate();
  const toast = useToast();
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

      switch (errorMessage) {
        case 'BOOK_NOT_HAS_NAME':
          toast.error('단어장의 이름이 지정되지 않았습니다.');
          break;
        case 'BOOK_ALREADY_EXIST':
          toast.error('동일 이름의 단어장이 이미 존재합니다.');
          break;
        case 'WORD_MORE_THAN_LIMIT':
          toast.error('제한 단어 개수를 초과하였습니다.');
          break;
        default:
          toast.error('에러가 발생하였습니다.');
          break;
      }

      setLoading(false);
    }
  };

  return { isLoading: loading, generateBook };
};

export default useGenerateBook;
