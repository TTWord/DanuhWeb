import styled from 'styled-components';
import iconBack from '@/assets/svg/icons/icon-back-gray.svg';
import useNavigatePop from '@/hooks/useNavigatePop';

const PatchNotePage = () => {
  const navigate = useNavigatePop();

  const goBack = () => {
    navigate('/setting');
  };

  const sample = [
    {
      version: 'V0.1',
      data: ['Danuh로 명명', '편의성 개선'],
    },
    {
      version: 'V0.2',
      data: ['공유페이지 단어 검색 기능 개선', '사용성 개선'],
    },
  ];

  /* console.log(sample);

  sample.map(item => {
    console.log(item);
  }); */

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
      <Header>
        <BackButton onClick={goBack} src={iconBack} alt="back" />
        <div>패치노트</div>
      </Header>

      <Center>
        {sample.map((item, idx) => {
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

const Header = styled.div`
  width: 100%;
  height: 56px;
  flex-shrink: 0;
  padding: 0 16px;
  display: flex;
  align-items: center;

  div {
    ${({ theme }) => theme.typography.pretendard.t3.sbd}
  }
`;

const BackButton = styled.img`
  width: 10px;
  margin-right: 16px;
  cursor: pointer;
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
