import { Button, SlideBox, useTopLoading } from 'opize-design-system';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { client } from '../../../../lib/client';
import { ConnectBlockBase } from '../../components/blockBase';
import { YoutubeEmbed } from '../../components/youtubeEmbed';
import { BlockHeader } from '../../components/blockHeader';
import { connectPageIndex } from '../../connectPageIndex';
import { NotionSVG } from '../../components/notionSVG';
import { useSlideBox } from '../../state/page.state';

const NOTION_API_STATE = 'new_connect';
export function NewConnectNotionApiBlock() {
    const { start: loadingStart, finish: loadingFinish } = useTopLoading();
    const router = useRouter();
    const { move } = useSlideBox();

    const redirectUrl = JSON.parse(process.env.NEXT_PUBLIC_NOTION_REDIRECT_URL_MAP || '{}')[
        typeof window === 'undefined' ? '' : window.location.host
    ];

    const notion_auth_url = `https://api.notion.com/v1/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}&response_type=code&owner=user&redirect_uri=${redirectUrl}&state=${NOTION_API_STATE}`;

    useEffect(() => {
        const code = router.query.code as string;
        const state = router.query.state as string;
        if (code && state === NOTION_API_STATE) {
            router.replace('/connect');
            console.log(code, state);
            move(connectPageIndex.NEW_CONNECT.NOTION_API);
            loadingStart();
            (async () => {
                await client.user.connect.notionApi({
                    userId: 'me',
                    code: code,
                    redirectUrl,
                });
            })();
            loadingFinish();
            move(connectPageIndex.NEW_CONNECT.FINISH);
        }
    }, [loadingFinish, loadingStart, router, router.query.code, router.query.state, move, redirectUrl]);

    return (
        <SlideBox.Page index={100}>
            <ConnectBlockBase>
                <YoutubeEmbed url="https://www.youtube.com/embed/IHtn-xdFr0g" />
                <BlockHeader
                    title="노션 통합을 추가해주세요"
                    text='반드시 "개발자가 제공한 템플릿 사용"을 체크해주세요.'
                />
                <Button
                    onClick={() => {
                        window.location.href = notion_auth_url;
                    }}
                    prefix={NotionSVG}
                    size="large"
                    width="100%"
                    variant="secondary"
                >
                    노션 통합 추가하기
                </Button>
            </ConnectBlockBase>
        </SlideBox.Page>
    );
}
