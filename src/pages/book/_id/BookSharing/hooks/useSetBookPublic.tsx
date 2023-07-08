import { api } from '@/api';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useSetRecoilState } from 'recoil';
import { toastStatus } from '@/components/common/toast/Toast';
import { useNavigate } from 'react-router-dom';
import useToast from '@/hooks/useToast';

const useSetBookPublic = () => {
  const navigate = useNavigate();

  const toast = useToast();

  const setBookPublic = async (bookId: number, comment: string) => {
    try {
      const { data: response } = await api.book.setBookPublic(bookId, comment);

      if (response.status === 'OK') {
        toast.comment('단어장이 공개되었습니다');
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

  return setBookPublic;
};

export default useSetBookPublic;
