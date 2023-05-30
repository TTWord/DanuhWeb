import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import backImg from '@/assets/svg/icons/icon-back-button.svg';
import NoticeBox from '@/pages/setting/notice/Notice/components/NoticeBox';

const NoticePage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/setting');
  };

  const noticeList = [{ title: '공지사항 입니다', explain: '공지사항입니다' }];

  return (
    <MainWrapper>
      <HeaderWrapper>
        <BackButton onClick={goBack}>
          <img src={backImg} alt="backImg" />
        </BackButton>
        공지사항
      </HeaderWrapper>

      <ContentWrapper>
        <NoticeBox
          id={0}
          title={'공지사항 1 입니다'}
          explain={'공지사항입니다'}
        />
        <NoticeBox
          id={1}
          title={'공지사항 2 입니다'}
          explain={'공지사항입니다'}
        />
        <NoticeBox
          id={2}
          title={'공지사항 3 입니다'}
          explain={'공지사항입니다'}
        />
        <NoticeBox
          id={3}
          title={'공지사항 4 입니다'}
          explain={'공지사항입니다'}
        />
      </ContentWrapper>
    </MainWrapper>
  );
};

export default NoticePage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #666666;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BackButton = styled.button`
  position: absolute;
  left: 20px;
  img {
    height: 12px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  position: relative;
  height: 99px;
  background: #ffffff;
  border-bottom: 1px solid #cccccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
`;
const Title = styled.div`
  font-weight: 500;
  font-size: 20px;
  color: black;
`;
const Explain = styled.div`
  font-weight: 300;
  font-size: 16px;
  color: black;
`;
const NextButton = styled.button`
  position: absolute;
  right: 20px;
  img {
    height: 12px;
  }
`;
