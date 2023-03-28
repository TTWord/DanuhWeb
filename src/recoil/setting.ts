import { atom } from 'recoil';

export const setting = {
  setNoticeTitle: atom({
    key: 'noticeTitle',
    default: '',
  }),
};
