import { atom } from 'recoil';

export const setting = {
  noticeTitle: atom({
    key: 'noticeTitle',
    default: '',
  }),

  directInputMode: atom({
    key: 'directInputMode',
    default: false,
  }),
};
