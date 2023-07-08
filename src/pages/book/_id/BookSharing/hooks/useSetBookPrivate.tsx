import { api } from '@/api';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useToast from '@/hooks/useToast';

const useSetBookPrivate = () => {
  const navigate = useNavigate();

  const toast = useToast();

  const setBookPrivate = async (bookId: number) => {
    try {
      const { data: response } = await api.book.setBookPrivate(bookId);

      if (response.status === 'OK') {
        toast.comment('단어장이 비공개되었습니다');
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

  return setBookPrivate;
};

export default useSetBookPrivate;
