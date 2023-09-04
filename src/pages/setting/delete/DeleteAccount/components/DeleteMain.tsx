import styled from 'styled-components';
import iconMeteor from '@/assets/svg/icons/icon-delete-account.svg';

interface MainProps {
  onClick: () => void;
}

const DeleteMain = ({ onClick }: MainProps) => {
  return (
    <Content>
      <img src={iconMeteor} alt="meteor" />
      <Text>탈퇴하면 계정은 다시 복구할 수 없습니다.</Text>
      <Text>정말 탈퇴하시겠습니까?</Text>
      <Button onClick={onClick}>네, 탈퇴할게요</Button>
    </Content>
  );
};

export default DeleteMain;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;

  img {
    width: 56px;
    margin-bottom: 24px;
  }
`;

const Text = styled.div`
  font-size: 16px;

  & + & {
    margin-bottom: 80px;
  }
`;

const Button = styled.button`
  width: 100x;
  height: 29px;
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary[800]};
  border-radius: 20px;
  color: white;
  padding: 6px 12px;
  ${({ theme }) => theme.typography.gmarketSans.md[12]};
`;
