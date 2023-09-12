import styled, { css } from 'styled-components';
import iconBack from '@/assets/svg/icons/icon-back-gray.svg';
import iconDefaultButton from '@/assets/svg/icons/icon-default-button.svg';
import useNavigatePop from '@/hooks/useNavigatePop';

interface TopAppBarProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'default' | 'page' | 'button';
  navigate: string;
  title?: string;
  currentPage?: number;
  lastPage?: number;
  onClick?: () => void;
  buttonImg?: string;
  buttonComponent?: React.ReactNode;
  backgroundColor?: string;
}

const TopAppBarStack: React.FC<TopAppBarProps> = ({
  type,
  navigate,
  title,
  onClick,
  currentPage,
  lastPage,
  buttonImg,
  buttonComponent,
  backgroundColor,
}) => {
  const navigatePop = useNavigatePop();

  switch (type) {
    default:
      return (
        <TopAppBarWrapper backgroundColor={backgroundColor}>
          <BackButton
            onClick={() => {
              if (navigate) navigatePop(navigate);
            }}
            src={iconBack}
            alt="back"
          />
          <TextP>{title}</TextP>
        </TopAppBarWrapper>
      );

    case 'page':
      return (
        <PageWrapper backgroundColor={backgroundColor}>
          <Left>
            <BackButton
              onClick={() => {
                if (navigate) navigatePop(navigate);
              }}
              src={iconBack}
              alt="back"
            />
            <TextP>{title}</TextP>
          </Left>

          <Right>{`${currentPage || 0}/${lastPage || 0}`}</Right>
        </PageWrapper>
      );

    case 'button':
      return (
        <ButtonWrapper backgroundColor={backgroundColor}>
          <Left>
            <BackButton
              onClick={() => {
                if (navigate) navigatePop(navigate);
              }}
              src={iconBack}
              alt="back"
            />
            <TextP>{title}</TextP>
          </Left>

          <Button>
            {!buttonComponent && (
              <img
                onClick={onClick}
                src={buttonImg ? buttonImg : iconDefaultButton}
                alt="btn"
              />
            )}

            {buttonComponent}
          </Button>
        </ButtonWrapper>
      );
  }
};

export default TopAppBarStack;

const TopAppBarWrapper = styled.div<{ backgroundColor: string | undefined }>`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};

  ${({ backgroundColor }) => {
    return (
      backgroundColor &&
      css`
        background-color: ${backgroundColor};
      `
    );
  }}
`;

const BackButton = styled.img`
  margin-right: 16px;
  cursor: pointer;
`;

const TextP = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.sbd};
  padding-top: 2px;
`;

const PageWrapper = styled(TopAppBarWrapper)`
  justify-content: space-between;
`;

const Left = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  width: auto;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typography.gmarketSans.md[12]}
  background-color: ${({ theme }) => theme.colors.primary[400]};
  border-radius: 20px;
  color: white;
  padding: 4px 8px;
  padding-top: 6px;
`;

const ButtonWrapper = styled(TopAppBarWrapper)`
  justify-content: space-between;
`;

const Button = styled.div`
  width: auto;
  cursor: pointer;

  img {
    height: 30px;
  }
`;
