import styled, { css } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSetBookPrivate from './hooks/useSetBookPrivate';
import useSetBookPublic from './hooks/useSetBookPublic';
import ConfirmPop from '@/components/common/popup/ConfirmPop';
import useGetBookById from '@/pages/book/_id/hooks/useGetBookById';

const BookSharingPage = () => {
  const navigate = useNavigate();
  const getBookById = useGetBookById(); // 단어장 id로 단어장 이름 & 공개설정 가져옴
  const setBookPrivate = useSetBookPrivate(); // 공개 설정 훅
  const setBookPublic = useSetBookPublic(); // 비공개 설정 훅

  const bookId = Number(useParams().id); // 단어장 id
  const [bookName, setBookeName] = useState(''); // 단어장 이름
  const [isShared, setIsShared] = useState(false); // 이미 공유인지

  const [isShareMode, setIsShareMode] = useState(false); // 유저의 공유 설정
  const [comment, setComment] = useState(''); // 단어장 설명

  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false); // 공개 팝업
  const [isSelected, setIsSelected] = useState(false); // 비공개 or 공개+설명변경

  const onClickSave = async () => {
    if (isShareMode) {
      setIsConfirmPopOpen(true);
    }
    if (!isShareMode) {
      if (isShared === false) {
      } else {
        setBookPrivate(bookId);
      }
    }
  };

  const onClose = () => {
    navigate(`/book/${bookId}`);
  };

  const onChagneComment = (e: any) => {
    setComment(e.target.value);
  };

  const onSelect = (e: any) => {
    const mode = e.target.value;

    if (mode === '공개') {
      setIsShareMode(true);
    }
    if (mode === '' || mode === '비공개') {
      setIsShareMode(false);
    }
  };

  const getBookNameFunc = async () => {
    const response = await getBookById(bookId);
    setBookeName(response.name);
    setIsShared(Boolean(response.is_shared));
  };

  useEffect(() => {
    getBookNameFunc();
  }, []);

  useEffect(() => {
    if (isShareMode === true && comment !== '') {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [isShareMode, comment]);

  return (
    <MainWrapper>
      <Header>
        <CloseButton onClick={onClose}>X</CloseButton>
        <BookName>{bookName}</BookName>
      </Header>

      <Content>
        <ShareNameWrapper>
          <Title>단어장 이름</Title>
          <NameInput placeholder="단어장이름" />
        </ShareNameWrapper>

        <ShareWrapper>
          <ConfirmPop
            isOpen={isConfirmPopOpen}
            message="정말 공개하시겠습니까>"
            cancelText="뒤로가기"
            confirmText="공개하기"
            onCancel={() => setIsConfirmPopOpen(false)}
            onConfirm={() => {
              setIsConfirmPopOpen(false);
              setBookPublic(bookId, comment);
            }}
          />

          <Title>공유 설정</Title>
          <ShareSelect>
            <select onChange={onSelect} name="mode" id="mode" placeholder="">
              <option value="">공개 설정을 고르시오</option>
              <option value="비공개">비공개</option>
              <option value="공개">공개</option>
            </select>
          </ShareSelect>

          {isShareMode && (
            <GuideMessage>
              공유중인 동안은 공유 페이지에서 단어장이 노출됩니다.
            </GuideMessage>
          )}
          {isShareMode && (
            <CommentBox
              onChange={onChagneComment}
              placeholder="단어장 설명을 입력해주세요"
              rows={0}
            />
          )}
        </ShareWrapper>
      </Content>

      <Footer>
        <SaveButton isSelected={isSelected} onClick={onClickSave}>
          저장하기
        </SaveButton>
      </Footer>
    </MainWrapper>
  );
};

export default BookSharingPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  flex-shrink: 0;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  left: 24px;
`;

const BookName = styled.div`
  font-size: 24px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  flex: 1;
  padding: 16px 24px;
`;

const ShareNameWrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 24px;
  margin-bottom: 16px;
`;

const NameInput = styled.input`
  width: 100%;
  height: 56px;

  border: 1px solid black;
`;

const ShareWrapper = styled.div`
  width: 100%;
`;

const ShareSelect = styled.div`
  width: 100%;
  background-color: gray;
  select {
    width: 100%;
    background-color: gray;
  }
`;

const GuideMessage = styled.div`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 16px;
`;

const CommentBox = styled.textarea`
  width: 100%;
  height: 100%;
  border: 1px solid gray;
  font-weight: 500;
  font-size: 12px;
  resize: none;
  outline: none;
  ::placeholder {
    color: #dadada;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  padding-bottom: 24px;
`;

const SaveButton = styled.button<{ isSelected?: boolean }>`
  width: 100%;
  height: 48px;
  background-color: gray;
  color: white;

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: white;
      background-color: ${({ theme }) => theme.colors.primary.default};
    `}
`;
