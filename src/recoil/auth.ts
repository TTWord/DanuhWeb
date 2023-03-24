import { atom } from 'recoil';

export const auth = {
  setUsername: atom({
    key: 'username',
    default: '123',
  }),
  setPassword: atom({
    key: 'password',
    default: '',
  }),
  setNickname: atom({
    key: 'nickname',
    default: '',
  }),
};
