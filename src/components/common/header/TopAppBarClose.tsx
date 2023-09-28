import styled from 'styled-components';
import iconClose from '@/assets/svg/icons/icon-close.svg';

interface TopAppBarProps {
  title?: string;
  onClose: () => void;
}

const TopAppBarClose = ({ title, onClose }: TopAppBarProps) => {
  return (
    <CloseWrapper>
      {title && <Center>{title}</Center>}
      <CloseButton onClick={onClose}>
        <img src={iconClose} alt="close" />
      </CloseButton>
    </CloseWrapper>
  );
};

export default TopAppBarClose;

const TopAppBarWrapper = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;

const CloseWrapper = styled(TopAppBarWrapper)`
  justify-content: end;
`;

const Center = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  ${({ theme }) => theme.typography.pretendard.t3.sbd};
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  display: felx;
  justify-content: center;
  align-items: center;
`;
