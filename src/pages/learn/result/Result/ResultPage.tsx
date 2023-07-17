import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '@/api';
import { useEffect, useState } from 'react';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { bookIds, correct, count, quizType } = location.state as {
    bookIds: number[];
    correct: number;
    count: number;
    quizType: string;
  };

  const [resultInfo, setResultInfo] = useState({
    targetBook: '없음',
    totalWords: 0,
    answer: 0,
    length: 0,
    percentage: '0',
    memoryRates: 0,
  });

  const goQuiz = () => {
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
      const { data: response } = await api.memo.getResult({
        bookIds,
        correct,
        count,
      });

      setResultInfo({
        targetBook: response.books,
        totalWords: response.total_count,
        answer: correct,
        length: response.count,
        percentage: response.correct_prob,
        memoryRates: response.memorized_count / response.total_count,
      });
    } catch (e: unknown) {
      console.log(e);
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <MainWrapper>
      <Header>RESULT</Header>

      <Container>
        <TargetBook>
          대상 단어장
          <span>{resultInfo.targetBook}</span>
        </TargetBook>

        <TotalWord>
          단어
          <span>{resultInfo.totalWords}개</span>
        </TotalWord>

        <QuizWords>
          암기 단어
          <span>{resultInfo.length}개</span>
        </QuizWords>

        <AnswerWords>
          정답 단어
          <span>{resultInfo.answer}개</span>
        </AnswerWords>

        <AnswerRates>
          정답률
          <span>{resultInfo.percentage}</span>
        </AnswerRates>

        <MemoryRates>
          암기률
          <span>{resultInfo.memoryRates}%</span>
        </MemoryRates>
      </Container>

      <Footer>
        <CompleteButton onClick={goQuiz}>완료</CompleteButton>
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

const Header = styled.header`
  width: 100%;
  height: 50px;
  font-weight: 700;
  font-size: 36px;
  line-height: 36px;
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  margin-top: 32px;
  padding-left: 36px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  //justify-content: center;
  //align-items: center;
  padding: 36px 0 0 24px;
`;

const ResultSection = styled.div`
  width: 168px;
  display: flex;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  color: black;
  font-weight: 700;
  font-size: 24px;

  span {
    font-weight: 400;
    font-size: 16px;
  }
`;

const TargetBook = styled(ResultSection)`
  flex-direction: column;
  margin-bottom: 36px;
`;

const TotalWord = styled(ResultSection)`
  flex-direction: column;
  margin-bottom: 36px;
`;

const QuizWords = styled(ResultSection)`
  margin-bottom: 18px;
  justify-content: space-between;
  align-items: center;
`;
const AnswerWords = styled(ResultSection)`
  margin-bottom: 18px;
  justify-content: space-between;
  align-items: center;
`;

const AnswerRates = styled(ResultSection)`
  margin-bottom: 18px;
  justify-content: space-between;
  align-items: center;
`;

const MemoryRates = styled(ResultSection)`
  margin-bottom: 18px;
  justify-content: space-between;
  align-items: center;
`;

const Footer = styled.footer`
  width: 100%;
  padding: 0 32px 32px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CompleteButton = styled.button`
  width: 100%;
  height: 72px;
  background: #724fab;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-weight: 400;
  font-size: 24px;
  line-height: 35px;
  text-align: center;
  color: #ffffff;
`;
