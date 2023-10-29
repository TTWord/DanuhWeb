import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import StackLayout from '@/components/layout/StackLayout';
import useNoticePageOne from '../hooks/useNoticePageOne';

const NoticeDetPage = () => {
  let title = '';
  let content: React.ReactNode = null;

  const params = useParams();
  const noticePageOne = useNoticePageOne();

  if (params.id === '1') {
    title = noticePageOne.title;
    content = noticePageOne.content;
  }

  return (
    <StackLayout
      topBar={{
        title: 'Danuh 런칭',
        back: {
          location: '/setting/notice',
        },
      }}
    >
      <ContentWrapper>{content}</ContentWrapper>
    </StackLayout>
  );
};

export default NoticeDetPage;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 20px;
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.typography.pretendard.b1.md};
`;
