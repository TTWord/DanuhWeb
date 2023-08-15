import styled from 'styled-components';
import TopBarDefault from '@/components/common/header/TopBarDefault';

const PatchNotePage = () => {
  const patchData = [
    {
      version: 'V0.1',
      data: ['Danuh로 명명', '편의성 개선'],
    },
    {
      version: 'V0.2',
      data: ['공유페이지 단어 검색 기능 개선', '사용성 개선'],
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
      <TopBarDefault navigate="/setting" title="패치노트" />

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
`;

const Version = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.sbd};
  color: black;
`;

const Text = styled.div`
  ${({ theme }) => theme.typography.pretendard.c1.rg};
  color: ${({ theme }) => theme.colors.gray[600]};
`;
