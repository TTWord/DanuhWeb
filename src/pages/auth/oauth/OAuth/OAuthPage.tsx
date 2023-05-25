import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const OAuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const accessToken: string | null = searchParams.get('accesstoken');
  const refreshToken: string | null = searchParams.get('refreshtoken');
  if (!accessToken || !refreshToken) {
    alert('에러!');
  } else {
    localStorage.setItem('access_Token', accessToken);
    localStorage.setItem('refresh_Token', refreshToken);
  }

  useEffect(() => {
    setTimeout(() => {
      navigate('/book');
    }, 3000);
  }, []);

  return (
    <MainWrapper>
      <div>잠시만 기다리세요...</div>
    </MainWrapper>
  );
};

export default OAuthPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    font-weight: 500;
    font-size: 48px;
    line-height: 48px;
  }
`;
