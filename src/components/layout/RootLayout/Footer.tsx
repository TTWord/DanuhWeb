import HomeMenu from '@/components/layout/RootLayout/Footer/HomeMenu';
import StudyMenu from '@/components/layout/RootLayout/Footer/StudyMenu';
import SharingMenu from '@/components/layout/RootLayout/Footer/SharingMenu';
import MyPagemenu from '@/components/layout/RootLayout/Footer/MyPageMenu';

import { globalState } from '@/recoil';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import tw from 'twin.macro';

const menuList = [
  {
    id: 0,
    component: <HomeMenu fill="#ffffff" stroke="#CBBDF3" selected={false} />,
    activeComponent: (
      <HomeMenu fill="#694AC2" stroke="#ffffff" selected={true} />
    ),
    navigate: '/book',
  },
  {
    id: 1,
    component: <StudyMenu fill="#ffffff" stroke="#CBBDF3" selected={false} />,
    activeComponent: (
      <StudyMenu fill="#694AC2" stroke="#694AC2" selected={true} />
    ),
    navigate: '/quiz',
  },
  {
    id: 2,
    component: <SharingMenu selected={false} />,
    activeComponent: (
      <SharingMenu fill="#694AC2" stroke="#694AC2" selected={true} />
    ),
    navigate: '/sharing',
  },
  {
    id: 3,
    component: <MyPagemenu selected={false} />,
    activeComponent: <MyPagemenu selected={true} />,
    navigate: '/setting',
  },
];

const Footer = () => {
  const [activeMenu, setActiveMenu] = useRecoilState(
    globalState.layout.activeMenuNumber,
  );

  const navigate = useNavigate();

  return (
    <Container>
      {menuList.map(menu => {
        return (
          <Menu
            key={menu.id}
            onClick={() => {
              setActiveMenu(menu.id);
              navigate(menu.navigate);
            }}
          >
            {activeMenu === menu.id ? menu.activeComponent : menu.component}
          </Menu>
        );
      })}
    </Container>
  );
};

export default Footer;

const Container = tw.div`flex w-full h-full justify-around items-center`;
const Menu = tw.div`w-[25%] h-full flex justify-center items-center cursor-pointer`;
