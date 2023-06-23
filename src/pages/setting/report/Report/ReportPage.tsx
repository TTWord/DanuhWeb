import { useState } from 'react';
import styled, { css } from 'styled-components';
import backIcon from '@/assets/svg/icons/icon-back-gray.svg';
import useNavigatePop from '@/hooks/useNavigatePop';
import BottomSlideSelectPop from '@/components/common/popup/BottomSlideSelectPop';

const print = console.log;

const ReportPage = () => {
  const navigate = useNavigatePop();

  const [isPopOpen, setIsPopOpen] = useState(false);

  const [reportType, setReportType] = useState('');
  const [content, setContent] = useState('');

  const domainList = [
    {
      text: '건의사항',
      onClick: () => {
        setReportType('suggest');
      },
    },
    {
      text: '버그신고',
      onClick: () => {
        setReportType('bug');
      },
    },
  ];

  const onPopOpen = () => {
    setIsPopOpen(true);
  };

  const onPopClose = () => {
    setIsPopOpen(false);
  };

  const onBack = () => {
    navigate('/setting');
  };

  const onSubmit = () => {
    print(reportType);
  };

  return (
    <WebWrapper>
      <Header>
        <BackButton onClick={onBack} src={backIcon} alt="backButton" />
        건의하기 / 버그신고
      </Header>
      <Content>
        <GuideMessage>버그 신고의 경우 자세하게 기재해주세요</GuideMessage>
        <ReportType>
          유형
          <ReportTypeSelectBox onClick={onPopOpen}>
            {reportType}
          </ReportTypeSelectBox>
          <BottomSlideSelectPop
            isOpen={isPopOpen}
            onPopClose={onPopClose}
            data={domainList}
          />
        </ReportType>
        <ReportType>
          내용
          <TextBox
            onChange={e => {
              setContent(e.target.value);
            }}
            placeholder="영어 문장을 입력해주세요"
            cols={100}
          />
        </ReportType>
      </Content>
      <Footer>
        <SubmitButton onClick={onSubmit}>전송하기</SubmitButton>
      </Footer>
    </WebWrapper>
  );
};
export default ReportPage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.pretendard};
`;

const Header = styled.header`
  position: relative;
  width: 100%;
  height: 56px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
`;

const BackButton = styled.img`
  position: absolute;
  left: 16px;
  :hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`;

const GuideMessage = styled.div`
  width: 100%;
  color: #a1a1a1;
  font-size: 16px;
  margin-top: 18px;
  margin-bottom: 25px;
`;

const ReportType = styled.div`
  font-size: 16px;
  color: black;
  margin-bottom: 8px;
`;

const ReportTypeSelectBox = styled.div`
  width: 100%;
  height: 54px;
  border: 1px solid black;
  margin-bottom: 32px;

  :hover {
    cursor: pointer;
  }
`;

const TextBox = styled.textarea`
  width: 100%;
  height: 300px;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: black;
  border: 1px solid black;
  padding: 8px 8px;
  resize: none;
  outline: none;

  ::placeholder {
    color: #c0c0c0;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Footer = styled.footer`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: grey;
  color: white;
  font-size: 24px;
`;
