import styled from 'styled-components';

const useNoticePageOne = () => {
  return {
    id: 1,
    title: 'Danuh 런칭',
    description: 'Danuh가 런칭되었습니다.',
    content: <Container />,
  };
};

export default useNoticePageOne;

const Container = () => {
  return (
    <Box>
      Danuh가 런칭되었습니다.
      <br />
      꾸준한 많은 관심 부탁드립니다.
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  height: auto;
`;
