import useNavigatePush from '@/hooks/useNavigatePush';
import { globalState } from '@/recoil';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { api } from '@/api';
import WideButton from '@/components/common/button/WideButton';
import TopBar from '@/components/common/header/TopBar';
import Title from '@/components/common/header/Title';
import InputAndCheck from '@/components/common/input/InputAndCheck';
import { AxiosError } from 'axios';
import useToast from '@/hooks/useToast';

const NicknameSubmitPage = () => {
  const navigatePush = useNavigatePush();
  const toast = useToast();
  const [error, setError] = useState('');
  const [nickname, setNickname] = useRecoilState(globalState.auth.nickname);
  const [isOk, setIsOk] = useState(false);

  const { mutateAsync: checkNickname } = useMutation(
    async (nickname: string) => {
      const { data: response } = await api.auth.checkNickname(nickname);

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
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err?.response?.data.message;

      switch (errorMessage) {
        case 'USER_INVALID_USERNAME':
          toast.error('형식에 맞지 않는 닉네임입니다.');
          break;
        case 'USER_DUPLICATE_NICKNAME':
          toast.error('이미 사용 중인 닉네임입니다.');
          break;
        default:
          toast.error('에러가 발생하였습니다.');
          break;
      }
    }
  };

  const onChange = (text: string) => {
    setIsOk(false);
    setError('');
    setNickname(text);
  };

  const onNext = () => {
    if (isOk) {
      // 다음 페이지로 이동
      navigatePush('/auth/join/info');
    }
  };

  return (
    <Layout>
      <TopBar type="page" navigate="/auth/login" currentPage={1} lastPage={3} />
      <Title title="사용하실 이름을 알려주세요" />
      <SubTitle>나중에 변경할 수 있어요</SubTitle>

      <Content>
        <Comment>한글, 영어, 숫자 사용 가능 12자 이내</Comment>
        <InputAndCheck
          type="default"
          placeholder="your name"
          onChange={onChange}
          value={nickname}
          onClickButton={onClickDuplicateCheck}
        />
        <Error isActive={isOk}>{error}</Error>
      </Content>
      <BottomView>
        <WideButton isActive={isOk} onClick={onNext}>
          다음
        </WideButton>
      </BottomView>
    </Layout>
  );
};

export default NicknameSubmitPage;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.div`
  ${({ theme }) => theme.typography.gmarketSans.md[16]};
  font-size: 14px;
  padding-left: 16px;
  margin-top: 20px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 24px;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Comment = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 10px;
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
  flex-shrink: 0;
  padding: 0 24px;
  padding-bottom: 36px;
`;
