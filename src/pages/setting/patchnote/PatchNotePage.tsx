import styled from 'styled-components';
import TopAppBarStack from '@/components/common/header/TopAppBarStack';

const PatchNotePage = () => {
  const patchData = [
    {
      version: 'V0.9',
      data: ['앱 런칭'],
    },
  ];

  interface IPatchData {
    content: {
      version: string;
      data: string[];
    };
  }

  const PatchBox = ({ content }: IPatchData) => {
    return (
      <Box>
        <Version>{content.version}</Version>
        {content.data.map((data, idx) => {
          return <Text key={idx}>{data}</Text>;
        })}
      </Box>
    );
  };

  return (
    <WebWrapper>
      <TopAppBarStack type={'default'} navigate="/setting" title="패치노트" />

      <Center>
        {patchData.map((item, idx) => {
          return <PatchBox content={item} key={idx} />;
        })}
      </Center>
    </WebWrapper>
  );
};

export default PatchNotePage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  width: 100%;
  height: 96px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const Version = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.sbd};
  color: black;
  padding-bottom: 16px;
`;

const Text = styled.div`
  ${({ theme }) => theme.typography.pretendard.b1.rg};
  color: ${({ theme }) => theme.colors.gray[600]};
`;
