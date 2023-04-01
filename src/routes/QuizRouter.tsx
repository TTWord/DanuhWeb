import ChoicePage from '@/pages/quiz/ChoicePage';
import FlashCardPage from '@/pages/quiz/FlashCardPage';
import QuizPage from '@/pages/quiz/QuizPage';
import ShortAnswerPage from '@/pages/quiz/ShortAnswerPage';
import { Route, Routes } from 'react-router-dom';

const QuizRouter = () => {
  return (
    <Routes>
      {/* 퀴즈 메인 페이지 */}
      <Route path={'/'} element={<QuizPage />} />

      {/* 플래쉬카드 페이지 */}
      <Route path={'/flashcard'} element={<FlashCardPage />} />

      {/* 객관식 페이지 */}
      <Route path={'/choice'} element={<ChoicePage />} />

      {/* 주관식 페이지 */}
      <Route path={'/shortanswer'} element={<ShortAnswerPage />} />
    </Routes>
  );
};

export default QuizRouter;
