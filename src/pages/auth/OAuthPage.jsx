import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const OAuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const access = searchParams.get('accesstoken');
  const refresh = searchParams.get('refreshtoken');
  localStorage.setItem('access_Token', access);
  localStorage.setItem('refresh_Token', refresh);
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
