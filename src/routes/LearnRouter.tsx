import LearnPage from '@/pages/learn/Learn/LearnPage';
import MemoMainPage from '@/pages/learn/memo/Memo/MemoMainPage';
import FlashCardMemoPage from '@/pages/learn/memo/flashcard/FlashCard/FlashCardMemoPage';
import BlindMemoPage from '@/pages/learn/memo/blind/Blind/BlindMemoPage';
import QuizMainPage from '@/pages/learn/quiz/Quiz/QuizMainPage';
import ChoiceSelectPage from '@/pages/learn/quiz/select/ChoiceSelectPage';
import ChoiceBlindPage from '@/pages/learn/quiz/blind/choice/ChoiceBlindPage';
import ShortTypingPage from '@/pages/learn/quiz/typing/ShortTypingPage';
import ShortBlindPage from '@/pages/learn/quiz/blind/shortanswer/ShortBlindPage';
import ResultPage from '@/pages/learn/result/ResultPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';
import OptionSelectPage from '@/pages/learn/option/OptionSelect/OptionSelectPage';

const QuizRouter = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      {/* 퀴즈 메인 페이지 */}
      <Route element={<RootLayout />}>
        <Route path={'/'} element={<LearnPage />} />
      </Route>

      <Route path={'/option/:type/:kind'} element={<OptionSelectPage />} />

      {/* 암기 */}
      <Route
        path={'/memo/*'}
        element={
          <Routes>
            {/* 플래쉬카드 암기 페이지 */}
            <Route path={'/flashcard'} element={<FlashCardMemoPage />} />
            {/* 블라인드 암기 페이지 */}
            <Route path={'/blind'} element={<BlindMemoPage />} />
          </Routes>
        }
      />

      {/* 퀴즈 */}
      <Route
        path={'/quiz/*'}
        element={
          <Routes>
            {/* 객관식 Select 문제 페이지 */}
            <Route path={'/select'} element={<ChoiceSelectPage />} />
            {/* 객관식 Blind 문제 페이지 */}
            <Route path={'/blind-choice'} element={<ChoiceBlindPage />} />
            {/* 주관식 Typing 문제 페이지 */}
            <Route path={'/typing'} element={<ShortTypingPage />} />
            {/* 주관식 Blind 문제 페이지 */}
            <Route path={'/blind-typing'} element={<ShortBlindPage />} />
          </Routes>
        }
      />

      {/* 결과 페이지 */}
      <Route path={'/result'} element={<ResultPage />} />
    </Routes>
  );
};

export default QuizRouter;
