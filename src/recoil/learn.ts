import { atom } from 'recoil';

export const learn = {
  haveBooks: atom({
    key: 'haveBooks',
    default: false,
  }),
  isLearnPopOpen: atom({
    key: 'isLearnPopOpen',
    default: false,
  }),
};
