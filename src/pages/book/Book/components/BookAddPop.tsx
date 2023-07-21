import BottomSlidePop from '@/components/common/popup/BottomSlidePop';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import styled from 'styled-components';
import iconCloseSVG from '@/assets/svg/icons/icon-close.svg';
import { instance } from '@/instance';
import { AxiosError } from 'axios';
import useToast from '@/hooks/useToast';
import { useQueryClient } from 'react-query';

interface BookAddPopProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const BookAddPop: React.FC<BookAddPopProps> = ({ isOpen, setIsOpen }) => {
  const [inputText, setInputText] = useState('');
  const toast = useToast();
  const queryClient = useQueryClient();

  const createBook = useCallback(async (bookName: string) => {
    try {
      await instance.post('/book', {
        name: bookName,
      });

      toast.success('단어장이 생성되었습니다');
      queryClient.invalidateQueries('BookPage/GetBooks');
    } catch (e: unknown) {
      toast.success('단어장 생성에 실패했습니다');
    }
  }, []);

  const onClickCreate = () => {
    createBook(inputText);
    setIsOpen(false);
  };

  return (
    <BottomSlidePop
      isOpen={isOpen}
      onPopClose={() => setIsOpen(false)}
      height={448}
    >
      <Container>
        <Header>
          <Title>단어장 만들기</Title>
          <CloseButton onClick={() => setIsOpen(false)}>
            <img src={iconCloseSVG} alt="close" />
          </CloseButton>
        </Header>
        <Content>
          <TopContent>
            <StrongText>단어장 이름은</StrongText>
            <Input
              placeholder="단어장 이름을 입력해주세요"
              value={inputText}
              onChange={e => {
                setInputText(e.target.value);
              }}
            />
          </TopContent>
          <BottomContent>
            <CreateButton onClick={onClickCreate}>생성하기</CreateButton>
          </BottomContent>
        </Content>
      </Container>
    </BottomSlidePop>
  );
};

export default BookAddPop;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.pretendard.t2.sbd};
`;

const CloseButton = styled.button`
  img {
    width: 24px;
    height: 24px;
  }
`;

const Content = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TopContent = styled.div`
  padding-top: 40px;
  height: 100%;
`;

const StrongText = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 140%;

  color: ${({ theme }) => theme.colors.gray[900]};
`;

const Input = styled.input`
  margin-top: 16px;
  width: 100%;
  height: 44px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  outline: none;

  ${({ theme }) => theme.typography.pretendard.t3.md};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const BottomContent = styled.div`
  padding-bottom: 55px;
`;

const CreateButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.primary.default};
`;
