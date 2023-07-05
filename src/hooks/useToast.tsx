import { toastStatus } from '@/components/common/toast/Toast';
import { useRecoilState } from 'recoil';

const useToast = () => {
  const [, setStatus] = useRecoilState(toastStatus);

  const toast = {
    success: (message: string) => {
      setStatus({
        isOpen: true,
        timer: 1500,
        message,
        type: 'SUCCESS',
      });
    },
    error: (message: string) => {
      setStatus({
        isOpen: true,
        timer: 1500,
        message,
        type: 'ERROR',
      });
    },
    comment: (message: string) => {
      setStatus({
        isOpen: true,
        timer: 1500,
        message,
        type: 'COMMENT',
      });
    },
  };

  return toast;
};

export default useToast;
