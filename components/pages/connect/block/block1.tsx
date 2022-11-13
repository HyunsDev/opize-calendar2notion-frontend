import { Box, Flex, Text, useTopLoading } from 'opize-design-system';
import { BlockHeader } from './components/blockHeader';
import { NotionButton } from './components/notionBtn';
import Image from 'next/image';
import Img from '../../../../assets/connect/placeholder.png';
import { useUser } from '../../../../hooks/useUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { client } from '../../../../lib/client';

export function ConnectBlock1({ setCursor }: { setCursor: (cursor: number) => void }) {
    const { start: loadingStart, end: loadingEnd } = useTopLoading();
    const { user } = useUser();
    const router = useRouter();

    const notion_auth_url = `https://api.notion.com/v1/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}&response_type=code&owner=user&redirect_uri=${process.env.NEXT_PUBLIC_NOTION_REDIRECT_URL}&state=Calendar2notion`;

    useEffect(() => {
        const code = router.query.code as string;
        const state = router.query.state as string;
        if (code && state === 'Calendar2notion') {
            console.log(code, state);
            router.replace('/connect');
            setCursor(1);
            loadingStart();
            (async () => {
                await client.user.connect.notionApi({
                    userId: 'me',
                    code: code,
                });
            })();
            loadingEnd();
            setCursor(2);
        }
    }, [loadingEnd, loadingStart, router, router.query.code, router.query.state, setCursor]);

    return (
        <Flex.Column gap="20px">
            <Image src={Img} height={720} width={1280} alt="" />
            <BlockHeader title="노션 통합을 추가해주세요" text='반드시 "개발자가 제공한 템플릿 사용"을 체크해주세요.' />
            <NotionButton
                onClick={() => {
                    window.location.href = notion_auth_url;
                }}
            >
                노션 통합 추가하기
            </NotionButton>
        </Flex.Column>
    );
}
