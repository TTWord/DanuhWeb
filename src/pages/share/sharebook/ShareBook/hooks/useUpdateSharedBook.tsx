import { api } from '@/api';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import useToast from '@/hooks/useToast';

const useUpdateSharedBook = () => {
  const toast = useToast();

  const updateSharedBook = async (id: number) => {
    try {
      const { data: response } = await api.share.updateSharedBook(id);

      if (response.message === 'SUCCESS') {
        toast.comment('단어장을 다운로드 하였습니다.');
      }

      return response.status;
    } catch (e: unknown) {
      console.log(e);

      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err?.response?.data.message;

      switch (errorMessage) {
        case 'BOOK_ALREAY_UPDATED': {
          toast.error('이미 업데이트 되었습니다.');
          return;
        }
        case 'SHARE_NOT_SHARED': {
          toast.error('공유되지 않은 단어장입니다.');
          return;
        }
        case 'BOOK_NOT_DOWNLOADED': {
          toast.error('다운로드 된 단어장이 아닙니다.');
          return;
        }

        case 'BOOKSHARE_NOT_FOUND': {
          toast.error('해당 단어장을 찾을 수 없습니다.');
          return;
        }
        case 'SHARE_NOT_FOUND': {
          toast.error('해당 단어장을 찾을 수 없습니다.');
          return;
        }
        default: {
          toast.error('에러가 발생하였습니다.');
          return;
        }
      }
    }
  };

  return updateSharedBook;
};

export default useUpdateSharedBook;
