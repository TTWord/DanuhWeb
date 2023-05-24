import { instance } from '@/instance';

export const quizAPI = {
  getShortQuiz: async (bookID: number, number: number) => {
    const response = await instance.post('/quiz/shortform', {
      book_id: bookID,
      number,
    });

    return response;
  },

  getChoiceQuiz: async (bookID: number, number: number) => {
    const response = await instance.post('/quiz/multiple', {
      book_id: bookID,
      number: number,
    });

    return response;
  },
};
