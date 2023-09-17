import styled from 'styled-components';
import NoticeBox from '@/pages/setting/notice/Notice/components/NoticeBox';
import TopAppBarStack from '@/components/common/header/TopAppBarStack';

const NoticePage = () => {
  const noticeList = [
    {
      id: 1,
      title: '공지사항 1입니다',
      content: '상세내용 1입니다. 으어어어어어어어어어',
    },
    {
      id: 2,
      title: '공지사항 2입니다',
      content: '상세내용 2입니다. 으어어어어어어어어어',
    },
    {
      id: 3,
      title: '공지사항 3입니다',
      content: '상세내용 3입니다. 으어어어어어어어어어',
    },
    {
      id: 4,
      title: '공지사항 4입니다',
      content: '상세내용 4입니다. 으어어어어어어어어어',
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
