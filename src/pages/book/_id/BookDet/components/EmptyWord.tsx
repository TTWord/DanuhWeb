import styled from 'styled-components';
import iconPlus from '@/assets/svg/icons/icon-plus-purple.svg';
import useNavigatePush from '@/hooks/useNavigatePush';

interface IEmptyWordProps {
  bookId: number;
}

const EmptyWord = (props: IEmptyWordProps) => {
  const navigate = useNavigatePush();

  const onClick = () => {
    navigate(`/book/${props.bookId}/create`);
  };

  return (
    <Wrapper onClick={onClick}>
      <TextWrapper>
        <Korean>단어 추가하기</Korean>
        <English>add new word</English>
      </TextWrapper>
      <PlusImg src={iconPlus} alt="plus" />
    </Wrapper>
  );
};

export default EmptyWord;

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  flex-shrink: 0;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Korean = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-bottom: 4px;
`;

const English = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const PlusImg = styled.img``;
