import styled, { css } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '@/api';
import { useEffect, useState } from 'react';
import TopAppBarClose from '@/components/common/header/TopAppBarClose';
import WideButton from '@/components/common/button/WideButton';
import chevronDown from '@/assets/svg/icons/icon-chevron-down-small.svg';
import MemorizeToggle from './MemorizeToggle';

interface IResultInfo {
  books: string;
  count: number;
  memorized_count: number;
  total_count: number;
}

interface IReviewNote {
  word: string;
  mean: string;
  isMemo: boolean;
}

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [reviewNotes, setReviewNotes] = useState<IReviewNote[]>([]);
  const reviewData = localStorage.getItem('reviewNote');

  useEffect(() => {
    if (reviewData) {
      const reviewNotes = JSON.parse(reviewData);
      setReviewNotes(reviewNotes);
    }
  }, []);

  const { bookIds, correct, count, quizType } = location.state as {
    bookIds: number[];
    correct: number;
    count: number;
    quizType: string;
  };

  const [resultInfo, setResultInfo] = useState<IResultInfo>();

  const goQuiz = () => {
    localStorage.removeItem('reviewNote');

    if (quizType === undefined) {
      navigate(`/learn`);
    } else {
      navigate(`/learn/quiz`, {
        state: {
          type: quizType,
        },
      });
    }
  };

  const getResult = async () => {
    try {
      const { data: response } = await api.quiz.getResult({
        bookIds,
        correct,
        count,
      });

      setResultInfo(response);
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const [isNoteClicked, setNoteClicked] = useState(false);

  const extendNote = () => {
    setNoteClicked((current) => !current);
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <MainWrapper>
      <TopAppBarClose type="quiz" onClose={goQuiz} />

      <Container>
        <QuizWords>
          <QuizWordBox>
            <QuizTag>정답수</QuizTag>
            <QuizCount>
              <span>{correct}</span>개
            </QuizCount>
          </QuizWordBox>
          <Slash>/</Slash>
          <QuizWordBox>
            <QuizTag>문제수</QuizTag>
            <QuizCount>
              <span>{count}</span>개
            </QuizCount>
          </QuizWordBox>
        </QuizWords>

        <BookWords>
          <BookWordBox>
            <BookTag>암기 단어</BookTag>
            <BookCount>{resultInfo?.memorized_count}개</BookCount>
          </BookWordBox>

          <BookWordBox>
            <BookTag>전체 단어</BookTag>
            <BookCount>{resultInfo?.total_count}개</BookCount>
          </BookWordBox>
        </BookWords>

        <TargetBook>
          대상 단어장
          <span>{resultInfo?.books}</span>
        </TargetBook>

        <ReviewNote isNoteClicked={isNoteClicked}>
          <NoteTop>
            <NoteTag>오답노트</NoteTag>
            <ExtendButton onClick={extendNote} src={chevronDown} alt="down" />
          </NoteTop>
          <NoteBot isNoteClicked={isNoteClicked}>
            {reviewNotes?.map((item, idx) => {
              return (
                <ReviewBox key={idx}>
                  <ReviewWord>{item.word}</ReviewWord>
                  <ReviewMean>{item.mean}</ReviewMean>
                  <MemoCheck>
                    <MemorizeToggle
                      isMemo={item.isMemo}
                      onClick={() => console.log(idx)}
                    />
                  </MemoCheck>
                </ReviewBox>
              );
            })}
          </NoteBot>
        </ReviewNote>
      </Container>

      <Footer>
        <WideButton onClick={goQuiz}>완료</WideButton>
      </Footer>
    </MainWrapper>
  );
};

export default ResultPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  padding-bottom: 0px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  overflow-y: scroll;
`;

const CommonWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding: 24px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  & + & {
    margin-top: 16px;
  }
`;

// 퀴즈 진행한 문제수/정답수 정보
const QuizWords = styled(CommonWrapper)`
  padding: 24px 16px;
`;

const QuizWordBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QuizTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;

  ${({ theme }) => theme.typography.pretendard.b1.sbd};
  color: ${({ theme }) => theme.colors.black};
`;

const QuizCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 33.6px */

  span {
    color: ${({ theme }) => theme.colors.primary.default};
  }
`;

const Slash = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray[300]};
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 33.6px */
`;

// 퀴즈 실시한 단어장들에 대한 원본 정보
const BookWords = styled(CommonWrapper)`
  padding: 24px 36px;
  justify-content: space-between;
`;

const BookWordBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookTag = styled.div`
  padding: 4px 6px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  ${({ theme }) => theme.typography.pretendard.c1.sbd};
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const BookCount = styled.span`
  margin-left: 8px;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  color: ${({ theme }) => theme.colors.black};
`;

// 대상 단어장 리스트
const TargetBook = styled(CommonWrapper)`
  flex-direction: column;
  padding: 16px;
  ${({ theme }) => theme.typography.pretendard.t3.sbd};
  color: ${({ theme }) => theme.colors.black};

  span {
    margin-top: 8px;
    ${({ theme }) => theme.typography.pretendard.b1.md};
  }
`;

// 오답노트
// 해야함
const ReviewNote = styled(CommonWrapper)<{ isNoteClicked: boolean }>`
  padding: 12px 16px;
  flex-direction: column;

  ${({ isNoteClicked }) => {
    return (
      isNoteClicked &&
      css`
        height: auto;
      `
    );
  }}
`;

const NoteTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NoteTag = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.sbd};
  color: ${({ theme }) => theme.colors.black};
`;

const ExtendButton = styled.img`
  width: 24px;
  cursor: pointer;
`;

const NoteBot = styled.div<{ isNoteClicked: boolean }>`
  width: 100%;
  display: none;

  ${({ isNoteClicked }) => {
    return (
      isNoteClicked &&
      css`
        display: flex;
        flex-direction: column;
        margin-top: 8px;
        padding: 16px 0px;
      `
    );
  }}
`;

const ReviewBox = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.typography.pretendard.c1.md};
  color: ${({ theme }) => theme.colors.gray[700]};

  & + & {
    margin-top: 20px;
  }
`;

const ReviewWord = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
`;

const ReviewMean = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
`;

const MemoCheck = styled.div`
  width: 20%;
  height: auto;
  display: flex;
  justify-content: end;
`;

// 하단 확인
const Footer = styled.footer`
  width: 100%;
  padding: 0 24px;
  margin-bottom: 32px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;
