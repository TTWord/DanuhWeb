import styled from 'styled-components';
import iconClose from '@/assets/svg/icons/icon-close.svg';

interface TopAppBarProps {
  title?: string;
  onClose: () => void;
  type?: 'default' | 'quiz';
}

const TopAppBarClose = ({ title, onClose, type }: TopAppBarProps) => {
  switch (type) {
    case 'quiz':
      return (
        <QuizWrapper>
          <QuizTitle>
            퀴즈 완료! <span>학습 결과</span>
          </QuizTitle>
          <CloseButton onClick={onClose}>
            <img src={iconClose} alt="close" />
          </CloseButton>
        </QuizWrapper>
      );

    default:
      return (
        <CloseWrapper>
          {title && <Center>{title}</Center>}
          <CloseButton onClick={onClose}>
            <img src={iconClose} alt="close" />
          </CloseButton>
        </CloseWrapper>
      );
  }
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
  position: relative;
`;

const CloseWrapper = styled(TopAppBarWrapper)`
  justify-content: end;
`;

const QuizWrapper = styled(TopAppBarWrapper)`
  justify-content: space-between;
`;

const QuizTitle = styled.div`
  padding-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typography.gmarketSans.md[18]};
  color: ${({ theme }) => theme.colors.primary.default};

  span {
    ${({ theme }) => theme.typography.pretendard.b1.md};
    color: ${({ theme }) => theme.colors.gray[500]};
    margin-left: 4px;
  }
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
