import { atom } from 'recoil';

export const auth = {
  username: atom({
    key: 'username',
    default: '',
  }),
  domain: atom({
    key: 'domain',
    default: '',
  }),
  password: atom({
    key: 'password',
    default: '',
  }),
  nickname: atom({
    key: 'nickname',
    default: '',
  }),
  profilePic: atom({
    key: 'profilePic',
    default: '',
  }),
  timer: atom({
    key: 'timer',
    default: 180,
  }),
  codeTimeOut: atom({
    key: 'codeTimeOut',
    default: false,
  }),
};
