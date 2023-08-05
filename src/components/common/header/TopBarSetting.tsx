import styled from 'styled-components';
import iconSetting from '@/assets/svg/icons/icon-setting.svg';

interface TopBarProps {
  onClick: () => void;
  title: string;
}

const TopBarSetting = ({ onClick, title }: TopBarProps) => {
  return (
    <TopBar>
      <Text>{title}</Text>
      <SettingButton onClick={onClick} src={iconSetting} alt="setting" />
    </TopBar>
  );
};

export default TopBarSetting;

const TopBar = styled.div`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const SettingButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Text = styled.div`
  ${({ theme }) => theme.typography.gmarketSans.md[18]}
  font-weight: bold;
  line-height: 100%;
`;
