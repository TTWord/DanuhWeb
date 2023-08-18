import { api } from '@/api';
import { AxiosError } from 'axios';
import useToast from '@/hooks/useToast';

const useGetSharedBookById = () => {
  const toast = useToast();

  const getSharedBookById = async (id: number) => {
    try {
      const { data: response } = await api.share.getSharedBookById(id);

      return response;
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;

      const errorMessage = err?.response?.data.message;

      switch (errorMessage) {
        case 'SHARE_NOT_FOUND':
          toast.error('공유 단어장이 존재하지 않습니다.');
          break;
        default:
          toast.error('에러가 발생하였습니다.');
          break;
      }
    }
  };

  return getSharedBookById;
};

export default useGetSharedBookById;
