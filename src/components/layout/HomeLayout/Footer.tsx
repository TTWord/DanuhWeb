import ChartSvg from '@/components/svg/menu/ChartSvg';
import ListSvg from '@/components/svg/menu/ListSvg';
import PuzzleSvg from '@/components/svg/menu/PuzzleSvg';
import SettingSvg from '@/components/svg/menu/SettingSvg';
import { globalState } from '@/recoil';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import tw from 'twin.macro';

const menuList = [
  {
    id: 0,
    component: <ListSvg stroke="#cccccc" />,
    activeComponent: <ListSvg stroke="#333333" />,
    navigate: '/book',
  },
  {
    id: 1,
    component: <PuzzleSvg stroke="#cccccc" />,
    activeComponent: <PuzzleSvg stroke="#333333" />,
    navigate: '/quiz',
  },
  {
    id: 2,
    component: <ChartSvg fill="#cccccc" />,
    activeComponent: <ChartSvg fill="#333333" />,
    navigate: '/ranking',
  },
  {
    id: 3,
    component: <SettingSvg stroke="#cccccc" />,
    activeComponent: <SettingSvg stroke="#333333" />,
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
