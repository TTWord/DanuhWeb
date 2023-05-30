import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

const useDeleteAccount = () => {
  const navigate = useNavigate();
  const deleteAccount = async () => {
    try {
      const { data: response } = await api.user.deleteAccount();

      localStorage.removeItem('access_Token');
      localStorage.removeItem('refresh_Token');
      navigate('/auth');
    } catch (e) {
      console.log(e);
    }
  };

  return deleteAccount;
};

export default useDeleteAccount;
