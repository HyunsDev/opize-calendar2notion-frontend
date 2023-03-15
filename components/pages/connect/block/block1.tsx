import { Box, Flex, Text, useSlideBox, useTopLoading } from 'opize-design-system';
import { BlockHeader } from './components/blockHeader';
import { NotionButton } from './components/notionBtn';
import Image from 'next/image';
import Img from '../../../../assets/connect/placeholder.png';
import { useUser } from '../../../../hooks/useUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { client } from '../../../../lib/client';
import { ConnectBlockBase, ConnectBlockYoutubeDiv } from './components/blockBase';

export function ConnectBlock1() {
    const { start: loadingStart, end: loadingEnd } = useTopLoading();
    const { user } = useUser();
    const router = useRouter();
    const { move } = useSlideBox();

    const notion_auth_url = `https://api.notion.com/v1/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}&response_type=code&owner=user&redirect_uri=${process.env.NEXT_PUBLIC_NOTION_REDIRECT_URL}&state=Calendar2notion`;

    useEffect(() => {
        const code = router.query.code as string;
        const state = router.query.state as string;
        if (code && state === 'Calendar2notion') {
            console.log(code, state);
            router.replace('/connect');
            move(1);
            loadingStart();
            (async () => {
                await client.user.connect.notionApi({
                    userId: 'me',
                    code: code,
                });
            })();
            loadingEnd();
            move(2);
        }
    }, [loadingEnd, loadingStart, router, router.query.code, router.query.state, move]);

    return (
        <ConnectBlockBase>
            <ConnectBlockYoutubeDiv>
                <iframe
                    src="https://www.youtube.com/embed/IHtn-xdFr0g"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </ConnectBlockYoutubeDiv>
            <BlockHeader title="노션 통합을 추가해주세요" text='반드시 "개발자가 제공한 템플릿 사용"을 체크해주세요.' />
            <NotionButton
                onClick={() => {
                    window.location.href = notion_auth_url;
                }}
            >
                노션 통합 추가하기
            </NotionButton>
        </ConnectBlockBase>
    );
}
