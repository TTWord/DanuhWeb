import ListSvg from '@/components/svg/menu/ListSvg';
import tw from 'twin.macro';

const Header = () => {
  return (
    <Container>
      <Icon>
        <ListSvg />
      </Icon>
      <Title>단어장</Title>
      <Option>F</Option>
    </Container>
  );
};

export default Header;

const Container = tw.div`flex w-full h-full items-center px-[20px] gap-[20px] shadow-[0px 0px 4px 0px rgba(0,0,0,0.2)]`;
const Icon = tw.div``;
const Title = tw.div`w-full text-[24px] font-bold pt-[2px]`;
const Option = tw.div``;
