import { cv } from 'opize-design-system';
import styled from 'styled-components';

export const ConnectButton = styled.button`
    width: 100%;
    height: 44px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    border: solid 1px ${cv.default200};
    gap: 8px;
    transition: 200ms;

    &:hover {
        background-color: #eeeeee;
    }
`;
