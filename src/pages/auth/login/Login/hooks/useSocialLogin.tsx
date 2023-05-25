import { api } from '@/api';

const useSocialLogin = () => {
  const socialLogin = async (social: string) => {
    try {
      const response = await api.auth.socialLogin(social);
      window.location.href = response.data.data.url;
    } catch (e: unknown) {
      alert('소셜 로그인 에러');
    }
  };

  return socialLogin;
};

export default useSocialLogin;
