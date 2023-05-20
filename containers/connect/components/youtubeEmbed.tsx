import styled from 'styled-components';

const ConnectBlockYoutubeDiv = styled.div`
    width: 100%;
    height: 229px;

    iframe {
        border: 0;
        outline: 0;
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }
`;

export function YoutubeEmbed({ url }: { url: string }) {
    return (
        <ConnectBlockYoutubeDiv>
            <iframe
                src={url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </ConnectBlockYoutubeDiv>
    );
}
