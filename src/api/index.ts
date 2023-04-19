import { authAPI } from './auth';
import { userAPI } from './user';
import { wordAPI } from './word';
import { quizAPI } from './quiz';
import { bookAPI } from './book';
import { memoAPI } from './memo';

export const api = {
  auth: authAPI,
  user: userAPI,
  word: wordAPI,
  quiz: quizAPI,
  book: bookAPI,
  memo: memoAPI,
};
