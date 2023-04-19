import { api } from '@/api';

const useGetWord = () => {
  const getWord = async bookId => {
    try {
      const { data: response } = await api.word.getWord(bookId);
      return response.data;
    } catch (e) {
      const errorCode = e.response.status;
      if (errorCode === 409) {
        Swal.fire({
          icon: 'error',
          title: '단어장이 존재하지 않습니다.',
        });
      } else if (errorCode === 403) {
        Swal.fire({
          icon: 'error',
          title: '단어장 조회 권한이 없습니다.',
        });
      }
    }
  };

  return getWord;
};

export default useGetWord;
