import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const OAuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const accessToken: string | null = searchParams.get('accesstoken');
  const refreshToken: string | null = searchParams.get('refreshtoken');
  const isMember: string | null = searchParams.get('ismember');

  if (!accessToken || !refreshToken) {
    alert('에러!');
  } else {
    localStorage.setItem('access_Token', accessToken);
    localStorage.setItem('refresh_Token', refreshToken);
  }

  const print = console.log;

  useEffect(() => {
    if (isMember === '1') {
      navigate('/auth/welcome');
    }
    if (isMember === '0') {
      navigate('/auth/oauth/join');
    }
    if (isMember === null) {
      navigate('/auth');
    }
  }, []);

  return <MainWrapper></MainWrapper>;
};

export default OAuthPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
