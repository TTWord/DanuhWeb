import styled from 'styled-components';
import iconSearch from '@/assets/svg/icons/icon-search.svg';
import iconSetting from '@/assets/svg/icons/icon-setting.svg';

interface TopAppBarProps {
  type: 'default' | 'search' | 'setting';
  title: string;
  onClick?: () => void;
}

const TopAppBar = ({ type, title, onClick }: TopAppBarProps) => {
  switch (type) {
    default:
      return (
        <TopAppBarWrapper>
          <Text>{title}</Text>
        </TopAppBarWrapper>
      );

    case 'search':
      return (
        <SearchWrapper>
          <Text>{title}</Text>
          <ButtonWrapper>
            <SearchButton onClick={onClick} src={iconSearch} alt="search" />
          </ButtonWrapper>
        </SearchWrapper>
      );

    case 'setting':
      return (
        <SettingWrapper>
          <Text>{title}</Text>
          <ButtonWrapper onClick={onClick}>
            <SettingButton src={iconSetting} alt="setting" />
          </ButtonWrapper>
        </SettingWrapper>
      );
  }
};

export default TopAppBar;

const ButtonWrapper = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopAppBarWrapper = styled.div`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  //${({ theme }) => theme.typography.gmarketSans.md[18]};
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;

const Text = styled.div`
  font-weight: bold;
`;

const SearchButton = styled.img`
  cursor: pointer;
`;

const SearchWrapper = styled(TopAppBarWrapper)`
  justify-content: space-between;
`;

const SettingWrapper = styled(TopAppBarWrapper)`
  justify-content: space-between;
`;

const SettingButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
