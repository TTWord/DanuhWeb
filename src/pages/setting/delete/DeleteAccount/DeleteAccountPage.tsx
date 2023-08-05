import ConfirmPop from '@/pages/test/ConfirmPop';
import useNavigatePop from '@/hooks/useNavigatePop';
import { useState } from 'react';
import styled from 'styled-components';
import backImg from '@/assets/svg/icons/icon-back-button.svg';
import useDeleteAccount from '@/pages/setting/Setting/hooks/useDeleteAccount';
import DeleteMain from './components/DeleteMain';
import DeleteVote from './components/DeleteVote';
import FooterButton from '@/components/common/button/FooterButton';

const DeleteAccountPage = () => {
  const navigatePush = useNavigatePop();
  const deleteAccount = useDeleteAccount();
  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false);
  const [isVoteMode, setVoteMode] = useState(true); //false로 바꾸어야함
  const [isActive, setActive] = useState(false); //false로 바꾸어야함

  const onClickSetVodeMode = () => {
    setVoteMode(true);
  };

  const onClickDelete = () => {
    if (isActive) setIsConfirmPopOpen(true);
  };

  const goBack = () => {
    navigatePush('/setting');
  };

  return (
    <MainWrapper>
      <Header>
        <BackButton onClick={goBack} src={backImg} alt="backImg" />
        탈퇴하기
      </Header>

      <Content>
        <ConfirmPop
          isOpen={isConfirmPopOpen}
          cancelText="뒤로가기"
          confirmText="탈퇴하기"
          height="180px"
          onCancel={() => setIsConfirmPopOpen(false)}
          onConfirm={() => {
            setIsConfirmPopOpen(false);
            deleteAccount();
          }}
        >
          <ConfirmPop.Title>정말 회원을 탈퇴하시나요?</ConfirmPop.Title>
        </ConfirmPop>
        {/* 탈퇴하기 메인 화면 */}
        {!isVoteMode && <DeleteMain onClick={onClickSetVodeMode} />}
        {/* 탈퇴하기 불편 사항 선택 & 최종 화면, 직접 입력 체크 input 출력 */}
        {isVoteMode && <DeleteVote onClick={onClickSetVodeMode} />}
      </Content>
      {isVoteMode && (
        <FooterButton onClick={onClickDelete} isActive={isActive}>
          탈퇴하기
        </FooterButton>
      )}
    </MainWrapper>
  );
};

export default DeleteAccountPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  color: ${({ theme }) => theme.colors.gray[900]};
  ${({ theme }) => theme.typography.pretendard.t3.sbd}
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0 16px;
`;

const BackButton = styled.img`
  height: 12px;
  margin-right: 16px;
  cursor: pointer;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 56px;
    margin-bottom: 24px;
  }
`;
