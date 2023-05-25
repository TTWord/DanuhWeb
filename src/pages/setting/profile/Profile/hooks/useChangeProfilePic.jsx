import { api } from '@/api';
import { instance } from '@/instance';
import { useNavigate } from 'react-router-dom';

const useChangeProfilePic = () => {
  const navigate = useNavigate();
  const changeProfilePic = async file => {
    try {
      const { data: response } = await instance.post(
        '/user/userservice',
        file,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.message === 'SUCCESS') {
        navigate('/setting');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return changeProfilePic;
};

export default useChangeProfilePic;
