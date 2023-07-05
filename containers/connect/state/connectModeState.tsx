import { atom } from 'recoil';

export type ConnectMode = 'unset' | 'new' | 'exist' | 'migrate1';
export const connectModelState = atom<ConnectMode>({
    key: 'connectModelState',
    default: 'unset',
});
