import { api } from '@/api';

const useDeleteWord = () => {
  const deleteWord = async wordId => {
    try {
      const { data: response } = await api.word.deleteWord(wordId);
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  return deleteWord;
};

export default useDeleteWord;
