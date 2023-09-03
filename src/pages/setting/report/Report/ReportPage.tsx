import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import BottomSlideSelectPop from '@/components/common/popup/BottomSlideSelectPop';
import TopBar from '@/components/common/header/TopBar';
import useToast from '@/hooks/useToast';
import WideButton from '@/components/common/button/WideButton';
import { api } from '@/api';
import useNavigatePop from '@/hooks/useNavigatePop';

const ReportPage = () => {
  const toast = useToast();
  const navigate = useNavigatePop();

  const [isPopOpen, setIsPopOpen] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [reportType, setReportType] = useState('');
  const [contents, setContents] = useState('');

  const reportSubmit = async () => {
    try {
      const { data: response } = await api.user.report({
        reportType,
        contents,
      });

      toast.success('의견 제출 감사합니다!');
      navigate('/setting');
    } catch (e) {
      toast.error('에러가 발생하였습니다.');
      console.log(e);
    }
  };

  const domainList = [
    {
      text: '건의사항',
      onClick: () => {
        setIsSelected(true);
        setReportType('건의사항');
      },
    },
    {
      text: '버그신고',
      onClick: () => {
        setIsSelected(true);
        setReportType('버그신고');
      },
    },
  ];

  const onPopOpen = () => {
    setIsPopOpen(true);
  };

  const onPopClose = () => {
    setIsPopOpen(false);
  };

  const onSubmit = () => {
    if (reportType === '') toast.error('유형을 선택해주세요!');
    else if (contents === '') toast.error('내용을 입력해주세요!');
    else reportSubmit();
  };

  useEffect(() => {
    if (reportType !== '' && contents !== '') setCanSubmit(true);
    else setCanSubmit(false);
  }, [reportType, contents]);

  return (
    <WebWrapper>
      <TopBar
        type={'default'}
        navigate="/setting"
        title="건의하기 / 버그신고"
      />

      <Content>
        <GuideMessage>버그 신고의 경우 자세하게 기재해주세요</GuideMessage>
        <ReportType>
          유형
          <ReportTypeSelectBox isSelected={isSelected} onClick={onPopOpen}>
            {reportType === '' ? '유형을 선택해주세요' : reportType}
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
            onChange={(e) => {
              setContents(e.target.value);
            }}
            placeholder="내용을 입력해주세요"
            cols={10}
          />
        </ReportType>
      </Content>

      <WideButton onClick={onSubmit} isActive={canSubmit}>
        전송하기
      </WideButton>
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

const Content = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;

const GuideMessage = styled.div`
  width: 100%;
  color: #a1a1a1;

  margin-top: 18px;
  margin-bottom: 25px;
`;

const ReportType = styled.div`
  font-size: 16px;
  color: black;
  margin-bottom: 8px;
`;

const ReportTypeSelectBox = styled.div<{ isSelected: boolean }>`
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  border: 1px solid black;
  padding: 0 16px;
  margin-bottom: 32px;
  color: gray;
  cursor: pointer;

  ${({ isSelected }) => {
    return (
      isSelected &&
      css`
        color: black;
      `
    );
  }}
`;

const TextBox = styled.textarea`
  width: 100%;
  height: 300px;
  font-weight: 500;
  line-height: 12px;
  color: black;
  border: 1px solid black;
  padding: 16px 16px;
  resize: none;
  outline: none;

  ::placeholder {
    color: #c0c0c0;
  }
`;
