import { api } from '@/api';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useSetRecoilState } from 'recoil';
import { toastStatus } from '@/components/common/toast/Toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface ISharedBooks {
  nameFilter: string;
  type: string;
  order: string;
}

const useGetSharedBooks = () => {
  const navigate = useNavigate();
  const setToast = useSetRecoilState(toastStatus);
  const [isLoading, setIsLoading] = useState(false);

  const getSharedBooks = async (nameFilter: string) => {
    try {
      setIsLoading(true);
      const { data: response } = await api.share.getSharedBooks(nameFilter);
      setIsLoading(false);
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

  return { isLoading, getSharedBooks };
};

export default useGetSharedBooks;
