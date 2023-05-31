import { api } from '@/api';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

const useGetBookById = () => {
  const getBookById = async (bookId: number) => {
    try {
      const response = await api.book.getBookById(bookId);

      if (response.status === 'OK') {
        return response.data.name;
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

  return getBookById;
};

export default useGetBookById;
