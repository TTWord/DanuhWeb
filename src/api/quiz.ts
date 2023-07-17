import { instance } from '@/instance';

interface quizParams {
  bookIds: number[];
  count: number;
  memorizedFilter: boolean;
}

export const quizAPI = {
  getTypingQuiz: async ({ bookIds, count, memorizedFilter }: quizParams) => {
    const response = await instance.post('/quiz/shortform', {
      book_ids: bookIds.join('&'),
      count,
      memorized_filter: memorizedFilter,
    });

    return response;
  },

  getSelectQuiz: async ({ bookIds, count, memorizedFilter }: quizParams) => {
    const response = await instance.post('/quiz/multiple', {
      book_ids: bookIds.join('&'),
      count,
      memorized_filter: memorizedFilter,
    });

    return response;
  },

  getBlindQuiz: async ({ bookIds, count, memorizedFilter }: quizParams) => {
    const response = await instance.post('/quiz/blind', {
      book_ids: bookIds.join('&'),
      count,
      memorized_filter: memorizedFilter,
    });

    return response;
  },
};
