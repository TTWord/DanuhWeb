import { instance } from '@/instance';

interface getResultParams {
  bookIds: number[];
  count: number;
  correct: number;
}

interface BlindChoiceQuizParams extends QuizParams {
  choiceCount: number;
}

export const quizAPI = {
  getResult: async ({ bookIds, count, correct }: getResultParams) => {
    const { data: response } = await instance.post('/quiz', {
      book_ids: bookIds.join('&'),
      count,
      correct,
    });

    return response;
  },

  getRecommendedBookList: async (books: number[]) => {
    const { data: response } = await instance.get(
      `/quiz/recommend?books=[${books}]`,
    );

    return response;
  },

  getSelectQuiz: async ({ bookIds, count, memorizedFilter }: QuizParams) => {
    const response = await instance.post('/quiz/multiple', {
      book_ids: bookIds.join('&'),
      count,
      memorized_filter: memorizedFilter,
    });

    return response;
  },

  getTypingQuiz: async ({ bookIds, count, memorizedFilter }: QuizParams) => {
    const response = await instance.post('/quiz/short', {
      book_ids: bookIds.join('&'),
      count,
      memorized_filter: memorizedFilter,
    });

    return response;
  },

  // 선택지 개수 옵션 추가 예정
  getBlindChoiceQuiz: async ({
    bookIds,
    count,
    memorizedFilter,
    choiceCount,
  }: BlindChoiceQuizParams) => {
    const response = await instance.post('/quiz/blind/multiple', {
      book_ids: bookIds.join('&'),
      count,
      memorized_filter: memorizedFilter,
      choice_count: choiceCount,
    });

    return response;
  },

  getBlindTypingQuiz: async ({
    bookIds,
    count,
    memorizedFilter,
  }: QuizParams) => {
    const response = await instance.post('/quiz/blind/short', {
      book_ids: bookIds.join('&'),
      count,
      memorized_filter: memorizedFilter,
    });

    return response;
  },
};
