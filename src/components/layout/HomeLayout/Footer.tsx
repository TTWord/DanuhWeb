import HomeSvg from '@/components/svg/menu/HomeSvg';
import StudySvg from '@/components/svg/menu/StudySvg';
import RankingSvg from '@/components/svg/menu/RankigSvg';
import MyPageSvg from '@/components/svg/menu/MyPageSvg';

import { globalState } from '@/recoil';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import tw from 'twin.macro';

const menuList = [
  {
    id: 0,
    component: <HomeSvg stroke="#cccccc" />,
    activeComponent: <HomeSvg stroke="#694AC2" />,
    navigate: '/book',
  },
  {
    id: 1,
    component: <StudySvg stroke="#cccccc" />,
    activeComponent: <StudySvg stroke="#694AC2" />,
    navigate: '/quiz',
  },
  {
    id: 2,
    component: <RankingSvg stroke="#cccccc" />,
    activeComponent: <RankingSvg stroke="#694AC2" />,
    navigate: '/ranking',
  },
  {
    id: 3,
    component: <MyPageSvg stroke="#cccccc" />,
    activeComponent: <MyPageSvg stroke="#694AC2" />,
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

const Container = tw.div`flex w-full h-full justify-around items-center shadow-[0px 0px 4px 0px rgba(0,0,0,0.2)]`;
const Menu = tw.div`w-[25%] h-full flex justify-center items-center cursor-pointer`;
