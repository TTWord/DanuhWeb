import { api } from '@/api';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

const useGetBookById = () => {
  const getBookById = async (bookId: number) => {
    try {
      const { data: response } = await api.book.getBookById(bookId);

      return response;
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

  return getBookById;
};

export default useGetBookById;
