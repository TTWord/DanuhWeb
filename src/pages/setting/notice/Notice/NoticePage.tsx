import styled from 'styled-components';
import NoticeBox from '@/pages/setting/notice/Notice/components/NoticeBox';
import TopAppBarStack from '@/components/common/header/TopAppBarStack';
import useNoticePageOne from '../hooks/useNoticePageOne';

const NoticePage = () => {
  const noticePageOne = useNoticePageOne();

  const noticeList = [
    {
      id: noticePageOne.id,
      title: noticePageOne.title,
      content: noticePageOne.description,
    },
  ];

  return (
    <MainWrapper>
      <TopAppBarStack type="default" title="공지사항" navigate="/setting" />

      <Content>
        {noticeList.map((item) => {
          return (
            <NoticeBox
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
            />
          );
        })}
      </Content>
    </MainWrapper>
  );
};

export default NoticePage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-style: normal;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 56px;

  ::-webkit-scrollbar {
    display: none;
  }
`;
