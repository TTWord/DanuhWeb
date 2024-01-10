import { api } from '@/api';
import useToast from '@/hooks/useToast';
import { AxiosError } from 'axios';
import useNavigatePop from '@/hooks/useNavigatePop';
import { useMutation, useQuery } from 'react-query';

const useBlindTypingLogics = ({
  bookIds,
  count,
  memorizedFilter,
}: QuizParams) => {
  const navigate = useNavigatePop();
  const toast = useToast();

  const { data: blindQuizData } = useQuery(
    'BlindTypingPage/GetQuiz',
    async () => {
      const { data: response } = await api.quiz.getBlindTypingQuiz({
        bookIds,
        count,
        memorizedFilter,
      });

      return response.data.problem;
    },
    {
      onError: (e) => {
        const err = e as AxiosError<{
          message: string;
        }>;
        const errorMessage = err?.response?.data.message;

        switch (errorMessage) {
          default:
            toast.error('에러가 발생하였습니다.');
            break;
        }
      },
    },
  );

  return { blindQuizData };
};

export default useBlindTypingLogics;
