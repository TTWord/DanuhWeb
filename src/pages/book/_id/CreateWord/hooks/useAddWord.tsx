import { api } from '@/api';
import { AxiosError } from 'axios';
import useToast from '@/hooks/useToast';

interface IUseAddWord {
  bookId: number;
  word: string;
  mean: string;
  resetInput: () => void;
}

const useAddWord = () => {
  const toast = useToast();

  const addWord = async ({ bookId, word, mean, resetInput }: IUseAddWord) => {
    try {
      const { data: response } = await api.word.addWord(bookId, word, mean);

      if (response.status === 'OK') {
        toast.success('단어가 추가되었습니다.');
        resetInput();
        //navigate(`/book/${bookId}`);
      }
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err?.response?.data.message;

      switch (errorMessage) {
        case 'WORD_MORE_THAN_LIMIT':
          toast.error('단어 개수가 한도에 도달하였습니다.');
          break;
        case 'WORD_INVALID_INPUT':
          toast.error('잘못된 값이 입력되었습니다.');
          break;
        case 'WORD_COUNT_MORE_THAN_LIMIT':
          toast.error('최대 글자수는 15자입니다.');
          break;
        case 'BOOK_NOT_FOUND':
          toast.error('에러가 발생하였습니다.');
          break;
        case 'BOOK_ACCESS_DENIED':
          toast.error('본인 소유의 단어장이 아닙니다.');
          break;
        case 'BOOK_DOWNLOADED':
          toast.error('다운로드 받은 단어장에는 단어를 추가할 수 없습니다.');
          break;
        case 'WORD_ALREADY_EXIST':
          toast.error('단어장에 이미 있는 단어입니다.');
          break;
        default:
          toast.error('에러가 발생하였습니다.');
          break;
      }
    }
  };

  return addWord;
};

export default useAddWord;
