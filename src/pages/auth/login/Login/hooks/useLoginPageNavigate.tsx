import useNavigatePush from '@/hooks/useNavigatePush';

const useLoginPageNavigate = () => {
  const navigatePush = useNavigatePush();

  const runJoinPage = () => {
    navigatePush('/auth/join');
  };

  const runFindPage = () => {
    navigatePush('/auth/password');
  };

  return { runJoinPage, runFindPage };
};

export default useLoginPageNavigate;
