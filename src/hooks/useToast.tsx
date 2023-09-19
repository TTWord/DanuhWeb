import { toastStatus } from '@/components/common/toast/Toast';
import { useSetRecoilState } from 'recoil';

const useToast = () => {
  const setStatus = useSetRecoilState(toastStatus);

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
    warning: (message: string) => {
      setStatus({
        isOpen: true,
        timer: 1500,
        message,
        type: 'WARNING',
      });
    },
  };

  return toast;
};

export default useToast;
