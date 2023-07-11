import QuizPage from '@/pages/quiz/Quiz/QuizPage';
import FlashCardPage from '@/pages/quiz/flashcard/FlashCard/FlashCardPage';
import FlashCardMemorizePage from '@/pages/quiz/flashcard/FlashCardMemorize/FlashCardMemorizePage';
import BlindPage from '@/pages/quiz/blind/Blind/BlindPage';
import BlindMemorizePage from '@/pages/quiz/blind/BlindMemorize/BlindMemorizePage';
import ChoicePage from '@/pages/quiz/choice/Choice/ChoicePage';
import ChoiceSelectPage from '@/pages/quiz/choice/Select/ChoiceSelectPage';
import ChoiceBlindPage from '@/pages/quiz/choice/Blind/ChoiceBlindPage';
import ShortAnswerPage from '@/pages/quiz/shortanswer/ShortAnswer/ShortAnswerPage';
import ShortTypingPage from '@/pages/quiz/shortanswer/Typing/ShortTypingPage';
import ShortBlindPage from '@/pages/quiz/shortanswer/Blind/ShortBlindPage';
import ResultPage from '@/pages/quiz/result/Result/ResultPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';

const QuizRouter = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      {/* 퀴즈 메인 페이지 */}
      <Route element={<RootLayout />}>
        <Route path={'/'} element={<QuizPage />} />
      </Route>

      {/* 암기 하기 */}
      {/* 플래쉬카드 메인 페이지 */}
      <Route path={'/flashcard'} element={<FlashCardPage />} />
      {/* 플래쉬카드 암기 페이지 */}
      <Route path={'/flashcard/memorize'} element={<FlashCardMemorizePage />} />

      {/* 블라인드 메인 페이지 */}
      <Route path={'/blind'} element={<BlindPage />} />
      {/* 블라인드 암기 페이지 */}
      <Route path={'/blind/:id'} element={<BlindMemorizePage />} />

      {/* 문제 풀기 */}
      {/* 객관식 메인 페이지 */}
      <Route path={'/choice/*'} element={<ChoicePage />} />
      {/* 객관식 Select 문제 페이지 */}
      <Route path={'/choice/select/:id'} element={<ChoiceSelectPage />} />
      {/* 객관식 Blind 문제 페이지 */}
      <Route path={'/choice/blind/:id'} element={<ChoiceBlindPage />} />

      {/* 주관식 메인 페이지 */}
      <Route path={'/shortanswer/*'} element={<ShortAnswerPage />} />
      {/* 주관식 Typing 문제 페이지 */}
      <Route path={'/shortanswer/typing/:id'} element={<ShortTypingPage />} />
      {/* 주관식 Blind 문제 페이지 */}
      <Route path={'/shortanswer/blind/:id'} element={<ShortBlindPage />} />

      {/* 결과 페이지 */}
      <Route path={'/result'} element={<ResultPage />} />
    </Routes>
  );
};

export default QuizRouter;
