import { atom } from 'recoil';

export const userIdState = atom<string>({
    key: 'userIdState',
    default: '',
});
