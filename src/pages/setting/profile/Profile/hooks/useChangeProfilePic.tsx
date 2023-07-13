import { api } from '@/api';
import { instance } from '@/instance';
import useNavigatePop from '@/hooks/useNavigatePop';

const useChangeProfilePic = () => {
  const navigate = useNavigatePop();
  const changeProfilePic = async (file: object) => {
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
