import { api } from '@/api';

const useSocialLogin = () => {
  const socialLogin = async social => {
    try {
      const response = await api.auth.socialLogin(social);
      window.location.href = response.data.data.url;
    } catch (e) {
      console.log(e);
    }
  };

  return socialLogin;
};

export default useSocialLogin;
