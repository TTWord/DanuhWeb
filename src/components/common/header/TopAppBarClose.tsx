import styled from 'styled-components';
import iconClose from '@/assets/svg/icons/icon-close.svg';

interface TopAppBarProps {
  onClose: () => void;
}

const TopAppBarClose = ({ onClose }: TopAppBarProps) => {
  return (
    <CloseWrapper>
      <CloseButton>
        <img onClick={onClose} src={iconClose} alt="close" />
      </CloseButton>
    </CloseWrapper>
  );
};

export default TopAppBarClose;

const TopAppBarWrapper = styled.div`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

const CloseWrapper = styled(TopAppBarWrapper)`
  justify-content: end;
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  display: felx;
  justify-content: center;
  align-items: center;
`;
