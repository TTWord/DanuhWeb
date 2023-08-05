import styled from 'styled-components';
import iconClose from '@/assets/svg/icons/icon-close.svg';

interface TopBarProps {
  onClick: () => void;
}

const TopBarClose = ({ onClick }: TopBarProps) => {
  return (
    <TopBar>
      <Button>
        <CloseButton onClick={onClick} src={iconClose} alt="close" />
      </Button>
    </TopBar>
  );
};

export default TopBarClose;

const TopBar = styled.div`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-shrink: 0;
`;

const Button = styled.button`
  width: 24px;
  height: 24px;
  display: felx;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.img`
  width: 20px;
  height: 20px;
`;
