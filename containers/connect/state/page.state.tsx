import { atom, useRecoilState } from 'recoil';

export const pageState = atom<number>({
    key: 'pageState',
    default: 0,
});

export const useSlideBox = () => {
    const [now, setNow] = useRecoilState(pageState);
    return { now, move: setNow };
};
