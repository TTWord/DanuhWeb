import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/recoil';

const useLogout = () => {
  const navigate = useNavigate();
  const setUsername = useSetRecoilState(globalState.auth.username);
  const setNickname = useSetRecoilState(globalState.auth.nickname);

  const logout = async () => {
    setNickname('');
    setUsername('');
    localStorage.removeItem('access_Token');
    localStorage.removeItem('refresh_Token');
    navigate('/auth');
  };

  return logout;
};

export default useLogout;
