import BottomSlidePop from '@/components/common/popup/BottomSlidePop';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import iconCloseSvg from '../svg/close.svg';
import Input from '@/components/common/input/Input';
import useRenameBook from '../hooks/useRenameBook';

interface BookModifyPopProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bookId: number;
  bookName: string;
  isRenameMode?: boolean;
  onClickUpdate: (bookId: number) => void;
}

const BookModifyPop: React.FC<BookModifyPopProps> = ({
  isOpen,
  setIsOpen,
  bookId,
  bookName,
  isRenameMode,
}) => {
  const [inputText, setInputText] = useState('');
  const renameBook = useRenameBook();

  useEffect(() => {
    setInputText(bookName);
  }, [bookName]);

  const onClickModify = () => {
    renameBook({ bookId, newName: inputText });
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
          <Title>{isRenameMode ? '수정하기' : '단어장 만들기'}</Title>
          <CloseButton onClick={() => setIsOpen(false)}>
            <img src={iconCloseSvg} alt="close" />
          </CloseButton>
        </Header>
        <Content>
          <TopContent>
            <StrongText>단어장 이름은</StrongText>
            <Input
              placeholder="단어장 이름을 입력해주세요"
              value={inputText}
              onChange={(text) => {
                if (text.length > 15) {
                  return;
                }
                setInputText(text);
              }}
              type="fit"
            />
            <CountLine>
              <Count isActive={inputText.length === 15}>
                {inputText.length}/15
              </Count>
            </CountLine>
          </TopContent>
          <BottomContent>
            <CreateButton onClick={onClickModify}>수정하기</CreateButton>
          </BottomContent>
        </Content>
      </Container>
    </BottomSlidePop>
  );
};

export default BookModifyPop;

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
  margin-bottom: 16px;

  color: ${({ theme }) => theme.colors.gray[900]};
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
  user-select: none;
  cursor: pointer;

  &:active {
    background-color: ${({ theme }) => theme.colors.primary[600]};
  }

  ${({ theme }) => theme.typography.gmarketSans.md[16]};
`;

const CountLine = styled.div`
  margin-top: 4px;
  display: flex;
  justify-content: flex-end;
`;

const Count = styled.div<{
  isActive: boolean;
}>`
  color: ${({ theme }) => theme.colors.gray[400]};
  transition: color 0.3s ease-in-out;

  ${({ theme }) => theme.typography.pretendard.c1.md};

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${({ theme }) => theme.colors.primary.default};
    `};
`;
