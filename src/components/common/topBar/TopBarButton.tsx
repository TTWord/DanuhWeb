import styled from 'styled-components';
import iconBack from '@/assets/svg/icons/icon-back-gray.svg';
import iconDefaultButton from '@/assets/svg/icons/icon-default-button.svg';
import useNavigatePop from '@/hooks/useNavigatePop';

interface TopBarProps {
  navigate: string;
  title: string;
  buttonImg?: string;
  onClick?: () => void;
}

const TopBarButton = ({ navigate, title, onClick, buttonImg }: TopBarProps) => {
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

      <Right>
        <Button
          onClick={onClick}
          src={buttonImg ? buttonImg : iconDefaultButton}
          alt="btn"
        />
      </Right>
    </TopBar>
  );
};

export default TopBarButton;

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

const Right = styled.button`
  width: auto;
  height: 30px;
  display: flex;
  align-items: center;
`;

const Button = styled.img``;
