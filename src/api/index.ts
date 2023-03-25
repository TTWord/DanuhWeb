import { authAPI } from './auth';
import { userAPI } from './user';
import { wordAPI } from './word';

export const api = {
  auth: authAPI,
  user: userAPI,
  word: wordAPI,
};
