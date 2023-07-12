import useNavigatePop from '@/hooks/useNavigatePop';
import useNavigatePush from '@/hooks/useNavigatePush';
import { MouseEvent } from 'react';

const useLoginPageNavigate = () => {
  const navigatePop = useNavigatePop();
  const navigatePush = useNavigatePush();

  const runAuthPage = () => {
    navigatePop('/auth');
  };

  const runJoinPage = () => {
    navigatePush('/auth/join');
  };

  return { runAuthPage, runJoinPage };
};

export default useLoginPageNavigate;
