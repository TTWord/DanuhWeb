import { atom } from 'recoil';

export const quiz = {
  quizList: atom({
    key: 'quizList',
    default: [],
  }),

  bookIds: atom({
    key: 'bookId',
    default: 0,
  }),

  quizCount: atom({
    key: 'quizCount',
    default: 0,
  }),

  result: atom({
    key: 'result',
    default: 0,
  }),

  memorize: atom({
    key: 'memorize',
    default: 0,
  }),

  quizTimer: atom({
    key: 'quizTimer',
    default: 61,
  }),

  quizTimerEnd: atom({
    key: 'quizTimerEnd',
    default: false,
  }),

  isAnswered: atom({
    key: 'isAnswered',
    default: false,
  }),
};
