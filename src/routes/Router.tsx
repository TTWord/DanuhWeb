import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StartPage from '@/pages/StartPage';
import AuthPage from '@/pages/AuthPage';
import OauthPage from '@/pages/OauthPage';
import LoginPage from '@/pages/LoginPage';
import JoinPage from '@/pages/auth/join/JoinPage';
import AuthCodePage from '@/pages/auth/join/AuthCodePage';
import WelcomePage from '@/pages/auth/join/WelcomePage';

import HomeLayout from '@/components/layout/HomeLayout';
import BookPage from '@/pages/BookPage';
import GenerateBook from '@/pages/book/GenerateBookPage';
import CreateBook from '@/pages/book/CreateBookPage';
import BookDetPage from '@/pages/book/BookDetPage';
import CreateWord from '@/pages/book/CreateWordPage';
import ChangeBookPage from '@/pages/book/ChangeBookPage';

import SettingPage from '@/pages/SettingPage';
import ProfilePage from '@/pages/setting/ProfilePage';
import NotificationPage from '@/pages/setting/NotificationPage';
import NoticePage from '@/pages/setting/NoticePage';
import NoticeDetPage from '@/pages/setting/NoticeDetPage';

import QuizPage from '@/pages/Quizpage';
import FlashcardPage from '@/pages/quiz/\bFlashcardPage';
import ChoicePage from '@/pages/quiz/ChoicePage';
import ShortAnswerPage from '@/pages/quiz/ShortAnswerPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인트로 페이지 */}
        <Route path={'/'} element={<StartPage />} />

        {/* 홈화면 (모바일 하단 메뉴 중 첫번째 메뉴) */}

        {/* 단어장 */}
        <Route
          path={'/book/*'}
          element={
            <Routes>
              {/* Book Page */}
              <Route element={<HomeLayout />}>
                <Route path={'/'} element={<BookPage />} />
              </Route>

              {/* 단어장 생성기 페이지 */}
              <Route path={'/generate'} element={<GenerateBook />} />

              {/* 단어장 만들기 페이지 */}
              <Route path={'/create'} element={<CreateBook />} />

              {/* 단어장 수정하기 페이지 */}
              <Route path={'/:id/change'} element={<ChangeBookPage />} />

              {/* 단어장 페이지 */}
              <Route path={'/:id'} element={<BookDetPage />} />

              {/* 단어 추가 페이지 */}
              <Route path={'/:id/create'} element={<CreateWord />} />
            </Routes>
          }
        />

        {/* 퀴즈 */}
        <Route
          path={'/quiz/*'}
          element={
            <Routes>
              {/* 퀴즈 메인 페이지 */}
              <Route path={'/'} element={<QuizPage />} />

              {/* 플래쉬카드 페이지 */}
              <Route path={'/flashcard'} element={<FlashcardPage />} />

              {/* 객관식 페이지 */}
              <Route path={'/choice'} element={<ChoicePage />} />

              {/* 주관식 페이지 */}
              <Route path={'/shortanswer'} element={<ShortAnswerPage />} />
            </Routes>
          }
        />

        {/* 로그인 & 회원가입 */}
        <Route
          path={'/auth/*'}
          element={
            <Routes>
              {/* 로그인 메인 페이지 */}
              <Route path={'/'} element={<AuthPage />} />

              {/* 소셜 로그인 페이지 */}
              <Route path={'/oauth'} element={<OauthPage />} />

              {/* 이메일 로그인 페이지 */}
              <Route path={'/login'} element={<LoginPage />} />

              {/* 회원가입 페이지 */}
              <Route path={'/join'} element={<JoinPage />} />

              {/* 인증 코드 입력 페이지 */}
              <Route path={'/join/code'} element={<AuthCodePage />} />

              {/* 회원 가입 후 환영 페이지 */}
              <Route path={'/join/welcome'} element={<WelcomePage />} />
            </Routes>
          }
        />

        {/* 유저 설정 */}
        <Route
          path={'/setting/*'}
          element={
            <Routes>
              {/* 설정 페이지 */}
              <Route path={'/'} element={<SettingPage />} />

              {/* 프로필 변경 페이지 */}
              <Route path={'/profile'} element={<ProfilePage />} />

              {/* 알림설정 페이지 */}
              <Route path={'/notification'} element={<NotificationPage />} />

              {/* 공지사항 메인 페이지 */}
              <Route path={'/notice'} element={<NoticePage />} />

              {/* 공지사항 세부 페이지 */}
              <Route path={'/notice/:id'} element={<NoticeDetPage />} />
            </Routes>
          }
        />

        {/* 404 */}
        <Route path={'*'} element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
