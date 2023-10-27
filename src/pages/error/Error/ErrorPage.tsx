import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams) {
      const errorCode = searchParams.get('code');

      if (errorCode === 'LOGIN_REQUIRED') {
        alert('로그인이 필요합니다.');
        navigate('/auth');
      }
    }
  }, [searchParams]);

  return null;
};

export default ErrorPage;
