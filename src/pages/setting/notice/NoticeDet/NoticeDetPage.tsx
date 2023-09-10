import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import useNavigatePop from '@/hooks/useNavigatePop';
import StackLayout from '@/components/layout/StackLayout';

const NoticeDetpage = () => {
  const navigatePop = useNavigatePop();
  const location = useLocation();
  const title = location.state.title;
  const content = location.state.content;

  return (
    <StackLayout
      topBar={{
        title,
        back: {
          location: '/setting/notice',
        },
      }}
    >
      <ContentWrapper>{content}</ContentWrapper>
    </StackLayout>
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
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[900]};

  ${({ theme }) => theme.typography.pretendard.t3.sbd};
`;

const BackButton = styled.button`
  margin-right: 16px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 20px;
  color: ${({ theme }) => theme.colors.gray[600]};

  ${({ theme }) => theme.typography.pretendard.b1.md};
`;
