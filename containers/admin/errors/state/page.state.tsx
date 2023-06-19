import { atom } from 'recoil';

export const pageState = atom<number>({
    key: 'page',
    default: 1,
});
