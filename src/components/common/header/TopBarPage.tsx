import styled from 'styled-components';
import iconBack from '@/assets/svg/icons/icon-back-gray.svg';
import useNavigatePop from '@/hooks/useNavigatePop';

interface TopBarProps {
  navigate: string;
  title: string;
  currentPage: number;
  lastPage: number;
}

const TopBarPage = ({
  navigate,
  title,
  currentPage,
  lastPage,
}: TopBarProps) => {
  const navigatePop = useNavigatePop();

  return (
    <TopBar>
      <Left>
        <BackButton
          onClick={() => {
            navigatePop(navigate);
          }}
          src={iconBack}
          alt="back"
        />
        <Text>{title}</Text>
      </Left>

      <Right>{`${currentPage}/${lastPage}`}</Right>
    </TopBar>
  );
};

export default TopBarPage;

const TopBar = styled.div`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const Left = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
`;

const BackButton = styled.img`
  height: 20px;
  margin-right: 16px;
  cursor: pointer;
`;

const Text = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.sbd}
  padding-top: 2px;
`;

const Right = styled.div`
  width: 36px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typography.gmarketSans.md[12]}
  background-color: ${({ theme }) => theme.colors.primary[400]};
  border-radius: 20px;
  color: white;
  padding-top: 2px;
`;
