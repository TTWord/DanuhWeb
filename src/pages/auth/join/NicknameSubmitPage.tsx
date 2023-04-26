import iconArrowBack from '@/assets/svg/icons/icon-back-button.svg';
import useNavigatePop from '@/hooks/useNavigatePop';
import { instance } from '@/instance';
import { globalState } from '@/recoil';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

const NicknameSubmitPage = () => {
  const [error, setError] = useState('');
  const [nickname, setNickname] = useRecoilState(globalState.auth.nickname);
  const [isOk, setIsOk] = useState(false);

  const { mutateAsync: checkNickname } = useMutation(
    async (nickname: string) => {
      const { data: response } = await instance.post('/auth/check/nickname', {
        nickname,
      });

      return response;
    },
  );

  const onClickDuplicateCheck = async () => {
    try {
      const response = await checkNickname(nickname);

      if (response.status === 'OK') {
        setError('사용할 수 있는 닉네임입니다');
        // 다음 버튼 활성화
        setIsOk(true);
      }
    } catch (e) {
      setError('해당 닉네임을 사용하실 수 없습니다');
    }
  };

  const navigate = useNavigate();
  const onNext = () => {
    if (isOk) {
      // 다음 페이지로 이동

      navigate('/auth/join/info');
    }
  };

  const navigatePop = useNavigatePop();
  const onBack = () => {
    navigatePop('/auth/login');
  };

  return (
    <Layout>
      <Header>
        <img src={iconArrowBack} alt="back" onClick={onBack} />
        <Chapter>1/3</Chapter>
      </Header>
      <Content>
        <TopView>
          <MainText>사용하실 이름을 알려주세요</MainText>
          <SubText>나중에 변경할 수 있어요</SubText>
        </TopView>
        <CenterView>
          <CenterViewWrapper>
            <Comment>한글, 영어, 숫자 사용 가능 12자 이내</Comment>
            <Nickname>
              <Input
                type="text"
                placeholder="yettojell"
                value={nickname}
                onChange={e => {
                  setIsOk(false);
                  setError('');
                  setNickname(e.target.value);
                }}
              />
              <CheckButton onClick={onClickDuplicateCheck}>
                중복확인
              </CheckButton>
            </Nickname>
            <Error isActive={isOk}>{error}</Error>
          </CenterViewWrapper>
        </CenterView>
        <BottomView>
          <Next isActive={isOk} onClick={onNext}>
            다음
          </Next>
        </BottomView>
      </Content>
    </Layout>
  );
};

export default NicknameSubmitPage;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f8f8fc;
  padding: 0 20px;
`;

const Header = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Chapter = styled.div`
  font-size: 12px;
  padding: 4px 8px;
  line-height: 16px;
  border-radius: 20px;
  background-color: #c7b3ff;
  color: #ffffff;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 64px);
  justify-content: space-between;
`;

const TopView = styled.div`
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  color: #171717;
  font-weight: medium;
  margin-top: 25px;
  flex-shrink: 0;
`;

const MainText = styled.div`
  font-size: 18px;
`;

const SubText = styled.div`
  font-size: 14px;
  font-weight: 300;
  margin-top: 15px;
`;

const CenterView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const CenterViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: -100px;
`;

const Comment = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const Nickname = styled.div`
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  border-bottom: 1px solid #e7e7e7;
  outline: none;
  padding: 0 16px;
  font-size: 16px;

  &::placeholder {
    color: #dadada;
  }
`;

const CheckButton = styled.button`
  width: 60px;
  height: 42px;
  flex-shrink: 0;
  background-color: #694ac2;
  font-size: 12px;
  color: white;
  border-radius: 8px;
  margin-left: 8px;
  font-weight: 400;
`;
const Error = styled.div<{
  isActive: boolean;
}>`
  font-size: 14px;
  height: 20px;
  color: #ff3a3a;
  margin-top: 8px;

  ${({ isActive }) =>
    isActive &&
    css`
      color: #0ac54a;
    `}
`;

const BottomView = styled.div`
  width: 100%;
  height: 84px;
  flex-shrink: 0;
`;

const Next = styled.div<{
  isActive: boolean;
}>`
  width: 100%;
  height: 45px;
  display: flex;
  background-color: #999999;
  color: white;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #694ac2;
    `}
`;
