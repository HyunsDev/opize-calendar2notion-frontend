import { atom } from 'recoil';

export const AdminUserSearchState = atom<{
    select: string;
    text: string;
}>({
    key: 'adminUserState',
    default: {
        select: 'email',
        text: '',
    },
});
