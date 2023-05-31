import { api } from '@/api';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface IUseRenameBook {
  bookId: number;
  newName: string;
}

const useRenameBook = () => {
  const navigate = useNavigate();
  const renameBook = async ({ bookId, newName }: IUseRenameBook) => {
    try {
      const { data: response } = await api.book.renameBook(bookId, newName);

      if (response.status === 'OK') {
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

  return renameBook;
};

export default useRenameBook;
