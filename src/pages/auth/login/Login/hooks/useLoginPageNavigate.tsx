import useNavigatePush from '@/hooks/useNavigatePush';
import { MouseEvent } from 'react';

const useLoginPageNavigate = () => {
  const navigatePush = useNavigatePush();

  const runJoinPage = () => {
    navigatePush('/auth/join');
  };

  const runFindPage = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigatePush('/auth/password');
  };

  return { runJoinPage, runFindPage };
};

export default useLoginPageNavigate;
