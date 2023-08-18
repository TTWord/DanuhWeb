import { api } from '@/api';
import { AxiosError } from 'axios';
import useToast from '@/hooks/useToast';

const useGetSharedBookByType = () => {
  const toast = useToast();

  const getSharedBookByType = async (type: string, order: string) => {
    try {
      const { data: response } = await api.share.getSharedBookByType(
        type,
        order,
      );

      return response;
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;

      const errorMessage = err?.response?.data.message;

      switch (errorMessage) {
        default:
          toast.error('에러가 발생하였습니다.');
          break;
      }
    }
  };

  return getSharedBookByType;
};

export default useGetSharedBookByType;
