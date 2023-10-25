import { globalState } from '@/recoil';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import tw from 'twin.macro';
import styled, { css } from 'styled-components';

import { ReactComponent as HomeSVG } from './svg/home.svg';
import { ReactComponent as HomeActiveSVG } from './svg/home-active.svg';
import { ReactComponent as StudySVG } from './svg/study.svg';
import { ReactComponent as StudyActiveSVG } from './svg/study-active.svg';
import { ReactComponent as ShareSVG } from './svg/share.svg';
import { ReactComponent as ShareActiveSVG } from './svg/share-active.svg';
import { ReactComponent as MyPageSVG } from './svg/mypage.svg';
import { ReactComponent as MyPageActiveSVG } from './svg/mypage-active.svg';

const menuList = [
  {
    id: 0,
    component: <HomeSVG />,
    activeComponent: <HomeActiveSVG />,
    navigate: '/book',
    text: '홈',
  },
  {
    id: 1,
    component: <StudySVG />,
    activeComponent: <StudyActiveSVG />,
    navigate: '/learn',
    text: '학습',
  },
  {
    id: 2,
    component: <ShareSVG />,
    activeComponent: <ShareActiveSVG />,
    navigate: '/share',
    text: '공유',
  },
  {
    id: 3,
    component: <MyPageSVG />,
    activeComponent: <MyPageActiveSVG />,
    navigate: '/setting',
    text: '마이페이지',
  },
];

const Footer = () => {
  const [activeMenu, setActiveMenu] = useRecoilState(
    globalState.layout.activeMenuNumber,
  );

  const navigate = useNavigate();

  return (
    <NewContainer>
      {menuList.map((menu) => {
        return (
          <Menu
            key={menu.id}
            onClick={() => {
              setActiveMenu(menu.id);
              navigate(menu.navigate);
            }}
          >
            <MenuWrapper>
              {activeMenu === menu.id ? menu.activeComponent : menu.component}
              <MenuName selected={activeMenu === menu.id}>{menu.text}</MenuName>
            </MenuWrapper>
          </Menu>
        );
      })}
    </NewContainer>
  );
};

export default Footer;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const NewContainer = styled(Container)`
  border-top: 0.5px solid ${({ theme }) => theme.colors.gray[200]};
`;
const Menu = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuName = styled.div<{ selected?: boolean }>`
  margin-top: 4px;
  font-size: 12px;
  line-height: 132%;
  color: ${({ theme }) => theme.colors.primary[200]};
  font-weight: normal;

  ${({ selected, theme }) =>
    selected &&
    css`
      color: ${theme.colors.primary.default};
      font-weight: bold;
    `}
`;
