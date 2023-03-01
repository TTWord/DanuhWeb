import { atom } from 'recoil';

export const layout = {
  activeMenuNumber: atom({
    key: 'menu',
    default: 0,
  }),
};
