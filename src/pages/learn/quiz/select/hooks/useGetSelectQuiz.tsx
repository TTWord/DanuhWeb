import { api } from '@/api';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import useToast from '@/hooks/useToast';

interface getQuizParams {
  bookIds: number[];
  count: number;
  memorizedFilter: boolean;
}

const useGetSelectQuiz = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const getSelectQuiz = async ({
    bookIds,
    count,
    memorizedFilter,
  }: getQuizParams) => {
    try {
      const { data: response } = await api.quiz.getSelectQuiz({
        bookIds,
        count,
        memorizedFilter,
      });

      return response;
    } catch (e) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err.response?.data?.message;

      if (errorMessage === 'WORD_LESS_THAN_COUNT') {
        toast.error('단어 개수가 4개 이상 필요합니다.');
      } else {
        toast.error(errorMessage || '오류가 발생했습니다.');
      }

      navigate('/learn');
    }
  };

  return getSelectQuiz;
};

export default useGetSelectQuiz;
