import { api } from '@/api';

const useGetWord = () => {
  const getWord = async bookId => {
    try {
      const { data: response } = await api.word.getWord(bookId);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  return getWord;
};

export default useGetWord;
