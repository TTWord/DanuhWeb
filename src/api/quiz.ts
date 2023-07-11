import { instance } from '@/instance';

export const quizAPI = {
  getShortQuiz: async (bookId: string, number: number) => {
    const response = await instance.post('/quiz/shortform', {
      book_id: bookId,
      number,
    });

    return response;
  },

  getChoiceQuiz: async (
    bookIds: string,
    count: number,
    memorizedFilter: boolean,
  ) => {
    const response = await instance.post('/quiz/multiple', {
      book_ids: bookIds,
      count,
      memorized_filter: memorizedFilter,
    });

    return response;
  },

  getBlindQuiz: async (
    bookIds: string,
    count: number,
    memorizedFilter: boolean,
  ) => {
    const response = await instance.post('/quiz/multiple', {
      book_ids: bookIds,
      count,
      memorized_filter: memorizedFilter,
    });

    return response;
  },
};
