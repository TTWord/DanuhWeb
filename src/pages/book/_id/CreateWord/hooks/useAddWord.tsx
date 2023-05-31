import { api } from '@/api';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface IUseAddWord {
  bookId: number;
  word: string;
  mean: string;
}

const useAddWord = () => {
  const navigate = useNavigate();
  const addWord = async ({ bookId, word, mean }: IUseAddWord) => {
    try {
      const { data: response } = await api.word.addWord(bookId, word, mean);

      if (response.status === 'OK') {
        navigate(`/book/${bookId}`);
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

  return addWord;
};

export default useAddWord;
