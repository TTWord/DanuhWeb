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

  const runFindPage = () => {
    navigatePush('/auth/password');
  };

  return { runAuthPage, runJoinPage, runFindPage };
};

export default useLoginPageNavigate;
