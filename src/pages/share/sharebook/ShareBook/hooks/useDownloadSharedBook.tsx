import { api } from '@/api';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useSetRecoilState } from 'recoil';
import { toastStatus } from '@/components/common/toast/Toast';
import { useNavigate } from 'react-router-dom';

const useDownloadSharedBook = () => {
  const navigate = useNavigate();
  const setToast = useSetRecoilState(toastStatus);

  const downloadSharedBook = async (id: number) => {
    try {
      const { data: response } = await api.share.downloadSharedBook(id);

      if (response.message === 'SUCCESS') {
        setToast({
          isOpen: true,
          timer: 2500,
          message: '단어장을 다운로드 하였습니다.',
        });
        navigate('/share');
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

  return downloadSharedBook;
};

export default useDownloadSharedBook;
