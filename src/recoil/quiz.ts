import { atom } from 'recoil';

export const quiz = {
  quizList: atom({
    key: 'quizList',
    default: [],
  }),

  result: atom({
    key: 'result',
    default: '',
  }),
};
