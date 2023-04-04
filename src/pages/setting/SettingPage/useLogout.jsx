import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { globalState } from '@/recoil';

const useLogout = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(globalState.auth.username);
  const [nickname, setNickname] = useRecoilState(globalState.auth.nickname);

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
