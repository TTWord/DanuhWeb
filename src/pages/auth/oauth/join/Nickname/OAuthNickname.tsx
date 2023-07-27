import { instance } from '@/instance';
import { globalState } from '@/recoil';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { api } from '@/api';
import FooterButton from '@/components/common/button/FooterButton';
import CheckButton from '@/components/common/button/CheckButton';

const OAuthNickname = () => {
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

  const setUserNickname = () => {};

  const onNext = async () => {
    if (isOk) {
      try {
        const { data: response } = await api.user.changeNickname(nickname);
        if (response.status === 'OK') {
          navigate('/auth/welcome');
        }
      } catch (e: unknown) {
        console.log(e);
      }
    }
  };

  return (
    <Layout>
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
              <CheckButton onClick={onClickDuplicateCheck} />
            </Nickname>
            <Error isActive={isOk}>{error}</Error>
          </CenterViewWrapper>
        </CenterView>
      </Content>
      <BottomView>
        <FooterButton isActive={isOk} onClick={onNext}>
          다음
        </FooterButton>
      </BottomView>
    </Layout>
  );
};

export default OAuthNickname;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 0 24px;
  padding-top: 56px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  flex: 1;
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
  height: 45px;
  flex-shrink: 0;
  margin-bottom: 28px;
`;
