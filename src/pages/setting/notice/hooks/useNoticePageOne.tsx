import styled from 'styled-components';

const useNoticePageOne = () => {
  return {
    id: 1,
    title: 'Danuh 런칭',
    description: 'Danuh 앱 출시!',
    content: <Container />,
  };
};

export default useNoticePageOne;

const Container = () => {
  return (
    <Box>
      <pre>
        {`Danuh 앱 출시!
Danuh를 사용해 단어를 더욱 쉽게 외워보세요!

깔끔하고 직관적인 인터페이스와 퀴즈 시스템,
공유 기능을 통한 단어장의 공유와 다운로드,
다운로드 받은 단어장에 대한 평가를 위한 추천 기능,
유저들의 피드백을 더 많이 반영하기 위한 버그신고/건의사항 요청까지 만들었습니다.

학습 목적으로 만든 앱이기 때문에 현재는 계정당 단어개수가 200개 제한이 되어 있고,
현재는 다른 단어장들과 크게 다르지 않게 가장 단어장으로써의 기본적인 기능만 넣어 스토어에 올렸지만,
평소에 단어장 앱들을 써보면서 불편했던 점들을 생각하며 만든 앱이기에
앞으로 많은 기능을 더 제작할 예정에 있으며,
추후 업데이트를 통해 보유 가능한 단어수 확장,
더욱 더 간편한 기능을 제작할 예정입니다.
많은 피드백 부탁드립니다!

현재는 웹 기반으로 만들어져 있는 앱이기 때문에
인터넷이 사용 가능한 환경에서만 사용할 수 있습니다.
당장은 기능 개선에 더욱 투자하고,
앱이 더욱 고도화된다면 추후 오프라인 모드 지원을 위한 네이티브 앱 개발까지 고려하고 있습니다.

꾸준한 많은 관심 부탁드립니다.`}
      </pre>
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  height: auto;

  pre {
    white-space: pre-wrap;
  }
`;
