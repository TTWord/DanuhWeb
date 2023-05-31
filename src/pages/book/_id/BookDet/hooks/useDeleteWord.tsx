import { api } from '@/api';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

const useDeleteWord = () => {
  const deleteWord = async (wordId: number) => {
    try {
      const { data: response } = await api.word.deleteWord(wordId);
      return response;
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorCode = err?.response?.status;
      const errorMessage = err?.response?.data.message;

      if (errorCode === 403 || errorCode === 404) {
        Swal.fire({
          icon: 'error',
          title: errorMessage,
        });
      }
    }
  };

  return deleteWord;
};

export default useDeleteWord;
