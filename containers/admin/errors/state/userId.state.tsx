import { atom } from 'recoil';

export const errorWhereState = atom<{
    userId?: string;
    errorCode?: string;
    isUserConnected?: string;
}>({
    key: 'errorWhereState',
    default: {},
});
