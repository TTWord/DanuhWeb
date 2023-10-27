import { api } from '@/api';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import useToast from '@/hooks/useToast';

const useDownloadSharedBook = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const downloadSharedBook = async (id: number) => {
    try {
      const { data: response } = await api.share.downloadSharedBook(id);

      if (response.message === 'SUCCESS') {
        toast.comment('단어장을 다운로드 하였습니다.');
        //navigate('/share');
      }
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err?.response?.data.message;

      switch (errorMessage) {
        case 'SHARE_NOT_FOUND': {
          toast.error('공유 단어장이 존재하지 않습니다.');
          return;
        }
        case 'SHARE_BOOK_OWNER': {
          toast.error('소유중인 단어장은 다운받을 수 없습니다.');
          return;
        }
        case 'SHARE_ALREADY_EXIST': {
          toast.error('이미 다운로드한 단어장입니다.');
          return;
        }
        case 'BOOK_NOT_SHARED': {
          // 버그인지 아닌지는 아직 모르는 부분
          toast.error('공유중인 단어장이 아닙니다.');
          return;
        }
        default: {
          toast.error('에러가 발생하였습니다.');
          return;
        }
      }
    }
  };

  return downloadSharedBook;
};

export default useDownloadSharedBook;
