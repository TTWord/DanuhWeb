import styled from 'styled-components';
import TopAppBarStack from '@/components/common/header/TopAppBarStack';
import WideButton from '@/components/common/button/WideButton';
import TextField from '@/components/common/input/TextField';
import RadioButton from '@/components/common/button/RadioButton';
import useReportpageLogics from './hooks/useReportpageLogics';

const ReportPage = () => {
  const {
    reportType,
    setTypeSuggetion,
    setTypeBugreport,
    contents,
    setContents,
    onSubmit,
    canSubmit,
  } = useReportpageLogics();

  return (
    <WebWrapper>
      <TopAppBarStack
        type={'default'}
        navigate="/setting"
        title="건의하기 / 버그신고"
      />

      <Content>
        <ReportWrapper>
          <ReportType>
            <RadioButton
              onClick={setTypeSuggetion}
              isSelected={reportType === '건의사항'}
            />
            <Span>건의하기</Span>
          </ReportType>

          <ReportType>
            <RadioButton
              onClick={setTypeBugreport}
              isSelected={reportType === '버그신고'}
            />
            <Span>버그신고</Span>
          </ReportType>
        </ReportWrapper>

        <GuideMessage>버그 신고의 경우 자세하게 기재해주세요</GuideMessage>

        <TextField
          onChange={setContents}
          value={contents}
          placeholder="내용을 입력해주세요"
          cols={10}
        />
      </Content>

      <BottomView>
        <WideButton onClick={onSubmit} isActive={canSubmit}>
          전송하기
        </WideButton>
      </BottomView>
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
  padding: 16px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;

const GuideMessage = styled.div`
  width: 100%;
  margin-top: 32px;
  margin-bottom: 16px;
  ${({ theme }) => theme.typography.pretendard.c1.md};
  color: ${({ theme }) => theme.colors.black};
`;

const ReportWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
`;

const ReportType = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-left: 40px;
  }
`;

const Span = styled.span`
  ${({ theme }) => theme.typography.pretendard.c1.md};
  line-height: 100%;
  color: ${({ theme }) => theme.colors.black};
  margin-left: 8px;
`;

const BottomView = styled.div`
  width: 100%;
  flex-shrink: 0;
  padding: 0 24px;
  padding-bottom: 36px;
`;
