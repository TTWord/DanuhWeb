import styled from 'styled-components';
import iconBack from '@/assets/svg/icons/icon-back-gray.svg';
import iconSearch from '@/assets/svg/icons/icon-search.svg';
import iconDefaultButton from '@/assets/svg/icons/icon-default-button.svg';
import iconSetting from '@/assets/svg/icons/icon-setting.svg';
import iconClose from '@/assets/svg/icons/icon-close.svg';
import useNavigatePop from '@/hooks/useNavigatePop';

interface TopBarProps {
  type?: 'default' | 'search' | 'page' | 'button' | 'setting' | 'close';
  navigate?: string;
  title?: string;
  onClick?: () => void;
  currentPage?: number;
  lastPage?: number;
  buttonImg?: string;
}

const TopBar = ({
  type,
  navigate,
  title,
  onClick,
  currentPage,
  lastPage,
  buttonImg,
}: TopBarProps) => {
  const navigatePop = useNavigatePop();

  switch (type) {
    case 'search':
      return (
        <SearchWrapper>
          <Text>{title}</Text>
          <SearchButton onClick={onClick} src={iconSearch} alt="search" />
        </SearchWrapper>
      );

    case 'page':
      return (
        <PageWrapper>
          <Left>
            <BackButton
              onClick={() => {
                if (navigate) navigatePop(navigate);
              }}
              src={iconBack}
              alt="back"
            />
            <Text>{title}</Text>
          </Left>

          <Right>{`${currentPage}/${lastPage}`}</Right>
        </PageWrapper>
      );

    case 'button':
      return (
        <ButtonWrapper>
          <Left>
            <BackButton
              onClick={() => {
                if (navigate) navigatePop(navigate);
              }}
              src={iconBack}
              alt="back"
            />
            <Text>{title}</Text>
          </Left>

          <Button>
            <img
              onClick={onClick}
              src={buttonImg ? buttonImg : iconDefaultButton}
              alt="btn"
            />
          </Button>
        </ButtonWrapper>
      );

    case 'setting':
      return (
        <SettingWrapper>
          <Text>{title}</Text>
          <SettingButton onClick={onClick} src={iconSetting} alt="setting" />
        </SettingWrapper>
      );

    case 'close':
      return (
        <CloseWrapper>
          <CloseButton>
            <img onClick={onClick} src={iconClose} alt="close" />
          </CloseButton>
        </CloseWrapper>
      );

    default:
      return (
        <TopBarWrapper>
          <BackButton
            onClick={() => {
              if (navigate) navigatePop(navigate);
            }}
            src={iconBack}
            alt="back"
          />
          <Text>{title}</Text>
        </TopBarWrapper>
      );
  }
};

export default TopBar;

const TopBarWrapper = styled.div`
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
`;

const SearchButton = styled.img`
  cursor: pointer;
`;

const SearchWrapper = styled(TopBarWrapper)`
  justify-content: space-between;
`;

const PageWrapper = styled(TopBarWrapper)`
  justify-content: space-between;
`;

const Left = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
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

const ButtonWrapper = styled(TopBarWrapper)`
  justify-content: space-between;
`;

const Button = styled.button`
  width: auto;
  height: 30px;
  display: flex;
  align-items: center;
`;

const SettingWrapper = styled(TopBarWrapper)`
  justify-content: space-between;
`;

const SettingButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const CloseWrapper = styled(TopBarWrapper)`
  justify-content: end;
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  display: felx;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
  }
`;
