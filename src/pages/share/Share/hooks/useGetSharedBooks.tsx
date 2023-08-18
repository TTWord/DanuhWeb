import { api } from '@/api';
import { AxiosError } from 'axios';
import useToast from '@/hooks/useToast';
import { useState } from 'react';

interface ISharedBooks {
  nameFilter?: string;
  type?: string;
  order?: string;
}

const useGetSharedBooks = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getSharedBooks = async ({ nameFilter, type, order }: ISharedBooks) => {
    try {
      setIsLoading(true);
      const { data: response } = await api.share.getSharedBooks({
        nameFilter,
        type,
        order,
      });
      setIsLoading(false);
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

  return { isLoading, getSharedBooks };
};

export default useGetSharedBooks;
