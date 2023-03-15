import styled from 'styled-components';

export const ConnectBlockBase = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0px 32px;
`;

export const ConnectBlockYoutubeDiv = styled.div`
    width: 100%;
    height: 229px;

    iframe {
        border: 0;
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }
`;
