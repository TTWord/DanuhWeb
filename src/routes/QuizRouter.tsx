import QuizPage from '@/pages/quiz/QuizPage';
import FlashCardPage from '@/pages/quiz/flashcard/FlashCardPage';
import FlashCardMemorizePage from '@/pages/quiz/flashcard/FlashCardMemorizePage';
import ChoicePage from '@/pages/quiz/choice/ChoicePage';
import ChoiceQuestionPage from '@/pages/quiz/choice/ChoiceQuestionPage';
import ShortAnswerPage from '@/pages/quiz/shortanswer/ShortAnswerPage';
import ShortQuestionPage from '@/pages/quiz/shortanswer/ShortQuestionPage';
import ResultPage from '@/pages/quiz/ResultPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import RouteTransition from './RouteTransition';
import RouteTransitionWrapper from './RouteTransitionWrapper';

const QuizRouter = () => {
  const location = useLocation();

  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route element={<RouteTransitionWrapper />}>
          {/* 퀴즈 메인 페이지 */}
          <Route path={'/'} element={<QuizPage />} />

          {/* 플래쉬카드 메인 페이지 */}
          <Route path={'/flashcard'} element={<FlashCardPage />} />
          {/* 플래쉬카드 영어암기 페이지 */}
          <Route path={'/flashcard/:id'} element={<FlashCardMemorizePage />} />

          {/* 객관식 메인 페이지 */}
          <Route path={'/choice'} element={<ChoicePage />} />
          {/* 객관식 문제 페이지 */}
          <Route path={'/choice/question'} element={<ChoiceQuestionPage />} />

          {/* 주관식 메인 페이지 */}
          <Route path={'/shortanswer'} element={<ShortAnswerPage />} />
          {/* 주관식 문제 페이지 */}
          <Route
            path={'/shortanswer/question'}
            element={<ShortQuestionPage />}
          />

          {/* 결과 페이지 */}
          <Route path={'/result'} element={<ResultPage />} />
        </Route>
      </Routes>
    </RouteTransition>
  );
};

export default QuizRouter;
