import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { globalState } from '@/recoil';
import backImg from '@/assets/svg/icons/icon-back-button.svg';

const NoticeDetpage = () => {
  const navigate = useNavigate();
  const Title = useRecoilValue(globalState.setting.noticeTitle);

  const goBack = () => {
    navigate('/setting/notice');
  };

  return (
    <MainWrapper>
      <HeaderWrapper>
        <BackButton onClick={goBack}>
          <img src={backImg} alt="backImg" />
        </BackButton>
        {Title}
      </HeaderWrapper>

      <ContentWrapper>
        공지사항 설명입니다. ㅁ잗러ㅏㅁㅈㄷ러매ㅏ절 ㅁ자덞ㅈ더라ㅐㅁ절
        ㅁㅈㄷ러ㅑㅏㅈ매러ㅏㅈㅁㄷ래ㅏ ㅁㅈ다렂머ㅏㄹ댐저다ㅐㄹ공지사항
        설명입니다. ㅁ잗러ㅏㅁㅈㄷ러매ㅏ절 ㅁ자덞ㅈ더라ㅐㅁ절
        ㅁㅈㄷ러ㅑㅏㅈ매러ㅏㅈㅁㄷ래ㅏ ㅁㅈ다렂머ㅏㄹ댐저다ㅐㄹ공지사항
        설명입니다. ㅁ잗러ㅏㅁㅈㄷ러매ㅏ절 ㅁ자덞ㅈ더라ㅐㅁ절
        ㅁㅈㄷ러ㅑㅏㅈ매러ㅏㅈㅁㄷ래ㅏ ㅁㅈ다렂머ㅏㄹ댐저다ㅐㄹ공지사항
        설명입니다. ㅁ잗러ㅏㅁㅈㄷ러매ㅏ절 ㅁ자덞ㅈ더라ㅐㅁ절
        ㅁㅈㄷ러ㅑㅏㅈ매러ㅏㅈㅁㄷ래ㅏ ㅁㅈ다렂머ㅏㄹ댐저다ㅐㄹ
      </ContentWrapper>
    </MainWrapper>
  );
};

export default NoticeDetpage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #666666;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  img {
    height: 12px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 19px 20px 0 20px;
  font-weight: 300;
  font-size: 16px;
`;
