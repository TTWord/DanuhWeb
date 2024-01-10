declare interface ResultParams {
  bookIds: number[];
  count: number;
  correct: number;
}

declare interface QuizParams {
  bookIds: number[];
  count: number;
  memorizedFilter: boolean;
}

declare interface QuizData {
  answer: {
    word: string;
    mean: string;
  };
  is_memorized: boolean;
  word_id: number;
}

declare interface BlindQuizData {
  answer: {
    word: string;
    mean: string;
  };
  is_memorized: boolean;
  word_id: number;
}

declare interface IQuizState {
  bookIds: number[];
  memorizedFilter: boolean;
  mode: 'word' | 'mean';
  quizCount: number;
  quizTime: number;
  timerOption: 'quiz' | 'book';
}

declare interface IBlindCurrentQuiz {
  answer: {
    word: string;
    mean: string;
  };
  is_memorized: boolean;
  word_id: number;

  userAnswer?: string;
}
