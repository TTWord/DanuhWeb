import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import backImg from '@/assets/svg/icons/icon-back-gray.svg';
import useNavigatePop from '@/hooks/useNavigatePop';

const NoticeDetpage = () => {
  const navigate = useNavigatePop();
  const location = useLocation();
  const title = location.state.title;
  const content = location.state.content;

  const goBack = () => {
    navigate('/setting/notice');
  };

  return (
    <MainWrapper>
      <HeaderWrapper>
        <BackButton onClick={goBack}>
          <img src={backImg} alt="backImg" />
        </BackButton>
        {title}
      </HeaderWrapper>

      <ContentWrapper>{content}</ContentWrapper>
    </MainWrapper>
  );
};

export default NoticeDetpage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 56px;
  flex-shrink: 0;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const BackButton = styled.button`
  margin-right: 16px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 20px;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray[600]};
`;
