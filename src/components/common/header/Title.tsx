import styled from 'styled-components';

interface TopBarProps {
  title: string;
}

const Title = ({ title }: TopBarProps) => {
  return (
    <TopBar>
      <Text>{title}</Text>
    </TopBar>
  );
};

export default Title;

const TopBar = styled.div`
  width: 100%;
  height: 50px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const Text = styled.div`
  height: auto;
  padding-top: 2px;
  ${({ theme }) => theme.typography.gmarketSans.md[18]}//padding-top: 2px;
`;
