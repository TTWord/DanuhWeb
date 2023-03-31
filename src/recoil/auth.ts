import { atom } from 'recoil';

export const auth = {
  setUsername: atom({
    key: 'username',
    default: '',
  }),
  setPassword: atom({
    key: 'password',
    default: '',
  }),
  setNickname: atom({
    key: 'nickname',
    default: '',
  }),
  setProfilePic: atom({
    key: 'profilePic',
    default: '',
  }),
};
