import styled from 'styled-components';
import iconBack from '@/assets/svg/icons/icon-back-gray.svg';
import useNavigatePop from '@/hooks/useNavigatePop';

interface TopBarProps {
  navigate: string;
  title: string;
}

const TopBarDefault = ({ navigate, title }: TopBarProps) => {
  const navigatePop = useNavigatePop();

  return (
    <TopBar>
      <BackButton
        onClick={() => {
          navigatePop(navigate);
        }}
        src={iconBack}
        alt="back"
      />
      <Text>{title}</Text>
    </TopBar>
  );
};

export default TopBarDefault;

const TopBar = styled.div`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const BackButton = styled.img`
  margin-right: 16px;
  cursor: pointer;
`;

const Text = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.sbd}
  padding-top: 1px;
`;
