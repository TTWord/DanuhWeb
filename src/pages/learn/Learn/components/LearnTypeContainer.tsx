import useNavigatePush from '@/hooks/useNavigatePush';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/recoil';

interface LearnTypeContainerProps {
  haveBook: boolean;
  title: 'memo' | 'quiz';
  ButtonList: {
    title: string;
    type: string;
    icon: string;
    iconWidth: string;
  }[];
}

const LearnTypeContainer = ({
  haveBook,
  title = 'memo',
  ButtonList,
}: LearnTypeContainerProps) => {
  const navigatePush = useNavigatePush();
  const setIsLearnPopOpen = useSetRecoilState(globalState.learn.isLearnPopOpen);

  const onClick = (naviURL: string) => {
    if (!haveBook) setIsLearnPopOpen(true);
    else navigatePush(`/learn/option/${title}/${naviURL}`);
  };

  return (
    <Container>
      <Title>{title === 'memo' ? '암기하기' : '문제풀기'}</Title>
      <ButtonWrapper>
        {ButtonList.map((item, idx) => {
          return (
            <SelectButton
              onClick={() => {
                onClick(item.type);
              }}
              key={idx}
            >
              <Div>
                <Tag>{item.title}</Tag>
                <Type>{item.type}</Type>
              </Div>
              <Icon sizeWidth={item.iconWidth} src={item.icon} alt="icon" />
            </SelectButton>
          );
        })}
      </ButtonWrapper>
    </Container>
  );
};

export default LearnTypeContainer;

const Container = styled.div`
  width: 100%;

  & + & {
    margin-top: 32px;
  }
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.pretendard.t1.sbd};
  padding: 0 16px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;
  padding: 16px;
`;

const SelectButton = styled.button`
  width: 160px;
  height: 180px;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(105, 74, 194, 0.08);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  padding: 16px 8px 8px 16px;
  padding-bottom: 24px;
  position: relative; // 아이콘 위치 조절

  transition: transform 0.3s ease-in-out;
  flex-shrink: 0;

  &:active {
    transform: scale(0.9);
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  & + & {
    margin-left: 8px;
  }
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Tag = styled.div`
  ${({ theme }) => theme.typography.pretendard.c2.rg};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const Type = styled.span`
  margin-top: 10px;
  text-transform: capitalize;
  color: #000000;
  ${({ theme }) => theme.typography.gmarketSans.md[16]};
`;

const Icon = styled.img<{
  sizeWidth: string;
}>`
  width: ${({ sizeWidth }) => sizeWidth};
  height: auto;
  position: absolute;
  bottom: 8px;
  right: 8px;

  user-select: none;
  pointer-events: none;
`;
