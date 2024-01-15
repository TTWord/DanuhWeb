import TopAppBarStack from '@/components/common/header/TopAppBarStack';
import useNavigatePush from '@/hooks/useNavigatePush';
import styled from 'styled-components';

const BookManagePage = () => {
  const navigatePush = useNavigatePush();

  const runPage = (to: string) => () => {
    navigatePush(`/setting/book-manage/${to}`);
  };

  return (
    <Container>
      <TopAppBarStack
        type="default"
        title="단어장 가져오기 / 내보내기"
        navigate="/setting"
      />
      <Div>
        <ImportButton onClick={runPage('import')}>
          <Text>
            <div>가져오기</div>
            <span>import</span>
          </Text>
        </ImportButton>

        <ExportButton onClick={runPage('export')}>
          <Text>
            <div>내보내기</div>
            <span>export</span>
          </Text>
        </ExportButton>
      </Div>
    </Container>
  );
};

export default BookManagePage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 45%;
  max-width: 300px;
  aspect-ratio: 1/1;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 20px;
  color: white;
  ${({ theme }) => theme.fonts.gmarketSans};
  line-height: 100%;

  :last-child {
    margin-top: 30px;
  }
`;

const Text = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: start;

  div {
    font-size: 24px;
    font-style: normal;
    font-weight: bold;
    margin-bottom: 2px;
  }

  span {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    text-transform: uppercase;
  }
`;

const ImportButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary.default};
  ${Text} {
    span {
      color: #bdb5ff;
    }
  }
`;

const ExportButton = styled(Button)`
  background-color: #8ee9f6;

  ${Text} {
    span {
      color: #4c98c3;
    }
  }
`;
