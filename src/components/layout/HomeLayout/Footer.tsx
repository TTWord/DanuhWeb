import ChartSvg from '@/components/svg/menu/ChartSvg';
import ListSvg from '@/components/svg/menu/ListSvg';
import PuzzleSvg from '@/components/svg/menu/PuzzleSvg';
import SettingSvg from '@/components/svg/menu/SettingSvg';
import tw from 'twin.macro';

const Footer = () => {
  return (
    <Container>
      <ListSvg stroke="#333333" />
      <PuzzleSvg stroke="#dddddd" />
      <ChartSvg fill="#dddddd" />
      <SettingSvg stroke="#dddddd" />
    </Container>
  );
};

export default Footer;

const Container = tw.div`flex w-full h-full justify-around items-center`;
