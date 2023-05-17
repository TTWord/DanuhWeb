import { atom } from 'recoil';

export const memo = {
  memoList: atom<
    {
      word: string;
      mean: string;
    }[]
  >({
    key: 'memoList',
    default: [],
  }),
};
