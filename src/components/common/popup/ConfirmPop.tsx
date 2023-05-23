import styled from 'styled-components';
import CommonModalBackground from '../modal/CommonModalBackground';

interface ConfirmPopProps {
  isOpen: boolean;
  message: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmPop: React.FC<ConfirmPopProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
}) => {
  return (
    <CommonModalBackground isOpen={isOpen}>
      <Background />
      <Container>
        <MainText>{message}</MainText>
        <ButtonGroup>
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </ButtonGroup>
      </Container>
    </CommonModalBackground>
  );
};

export default ConfirmPop;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(72, 72, 72, 0.3);
`;

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 264px;
  height: 180px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainText = styled.div`
  height: 100%;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  bottom: 0;
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const Button = styled.button`
  width: 50%;
  height: 100%;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[400]};

  & + & {
    border-left: 1px solid ${({ theme }) => theme.colors.gray[200]};
    color: ${({ theme }) => theme.colors.primary.default};
  }
`;
