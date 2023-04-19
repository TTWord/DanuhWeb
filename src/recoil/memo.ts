import { atom } from 'recoil';

export const memo = {
  memoList: atom({
    key: 'memoList',
    default: [],
  }),
};
