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
    bookId: string,
    count: number,
    memorizedFilter: boolean,
  ) => {
    const response = await instance.post('/quiz/multiple', {
      book_ids: bookId,
      count,
      memorized_filter: memorizedFilter,
    });

    return response;
  },
};
