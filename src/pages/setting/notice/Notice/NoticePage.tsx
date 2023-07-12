import styled from 'styled-components';
import useNavigatePop from '@/hooks/useNavigatePop';
import backImg from '@/assets/svg/icons/icon-back-gray.svg';
import NoticeBox from '@/pages/setting/notice/Notice/components/NoticeBox';

const NoticePage = () => {
  const navigate = useNavigatePop();

  const goBack = () => {
    navigate('/setting');
  };

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
      <HeaderWrapper>
        <BackButton onClick={goBack}>
          <img src={backImg} alt="backImg" />
        </BackButton>
        공지사항
      </HeaderWrapper>

      <ContentWrapper>
        {noticeList.map(item => {
          return (
            <NoticeBox
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
            />
          );
        })}
      </ContentWrapper>
    </MainWrapper>
  );
};

export default NoticePage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-style: normal;
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
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 56px;

  ::-webkit-scrollbar {
    display: none;
  }
`;
