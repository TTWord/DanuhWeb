import { globalState } from '@/recoil';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import homePic from './images/home.png';
import homeActivePic from './images/home-active.png';

import studyPic from './images/study.png';
import studyActivePic from './images/study-active.png';

import sharePic from './images/share.png';
import shareActivePic from './images/share-active.png';

import myPagePic from './images/mypage.png';
import myPageActivePic from './images/mypage-active.png';

const menuList = [
  {
    id: 0,
    component: <img src={homePic} alt="home" />,
    activeComponent: <img src={homeActivePic} alt="home" />,
    navigate: '/book',
    text: '홈',
  },
  {
    id: 1,
    component: <img src={studyPic} alt="study" />,
    activeComponent: <img src={studyActivePic} alt="study" />,
    navigate: '/learn',
    text: '학습',
  },
  {
    id: 2,
    component: <img src={sharePic} alt="share" />,
    activeComponent: <img src={shareActivePic} alt="share" />,
    navigate: '/share',
    text: '공유',
  },
  {
    id: 3,
    component: <img src={myPagePic} alt="mypage" />,
    activeComponent: <img src={myPageActivePic} alt="mypage" />,
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

  img {
    width: 30px;
    height: 30px;
    user-select: none;
    pointer-events: none;
  }
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
