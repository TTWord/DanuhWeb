import styled from 'styled-components';
import iconSearch from '@/assets/svg/icons/icon-search.svg';

interface TopBarProps {
  onClick: () => void;
  title: string;
}

const TopBarSearch = ({ onClick, title }: TopBarProps) => {
  return (
    <TopBar>
      <Text>{title}</Text>
      <SearchButton onClick={onClick} src={iconSearch} alt="search" />
    </TopBar>
  );
};

export default TopBarSearch;

const TopBar = styled.div`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const SearchButton = styled.img`
  cursor: pointer;
`;

const Text = styled.div`
  ${({ theme }) => theme.typography.gmarketSans.md[18]}
  font-weight: bold;
  line-height: 100%;
`;
