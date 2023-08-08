import { atom } from 'recoil';

export const user = {
  sortType: atom({
    key: 'sortType',
    default: '최신순',
  }),
};
