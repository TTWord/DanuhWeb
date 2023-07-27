import { api } from '@/api';
import useToast from '@/hooks/useToast';

const useSocialLogin = () => {
  const toast = useToast();

  const socialLogin = async (social: string) => {
    try {
      const response = await api.auth.socialLogin(social);
      window.location.href = response.data.data.url;
    } catch (e: unknown) {
      toast.error('아직 지원하지 않는 기능입니다.');
    }
  };

  const kakaoLogin = () => {
    socialLogin('kakao');
  };
  const googleLogin = () => {
    socialLogin('google');
  };
  const appleLogin = () => {
    socialLogin('apple');
  };

  return { googleLogin, kakaoLogin, appleLogin };
};

export default useSocialLogin;
