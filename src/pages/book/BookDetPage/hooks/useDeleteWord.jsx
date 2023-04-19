import { api } from '@/api';
import Swal from 'sweetalert2';

const useDeleteWord = () => {
  const deleteWord = async wordId => {
    try {
      const { data: response } = await api.word.deleteWord(wordId);
      return response;
    } catch (e) {
      const errorCode = e.response.status;
      const errorMessage = e.response.data.message;

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
