import { Button, Flex, Link, SlideBox, useSlideBox, useTopLoading } from 'opize-design-system';
import { useUser } from '../../../../hooks/useUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { client } from '../../../../lib/client';
import { ConnectBlockBase } from '../../components/blockBase';
import { YoutubeEmbed } from '../../components/youtubeEmbed';
import { BlockHeader } from '../../components/blockHeader';
import { connectPageIndex } from '../../connectPageIndex';
import { NotionSVG } from '../../components/notionSVG';
import { MigrationGuideLink } from '../../components/migrationGuideLink';

const NOTION_API_STATE = 'migrate_connect';
export function MigrateConnectNotionApiBlock({}) {
    const { start: loadingStart, end: loadingEnd } = useTopLoading();
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
            move(connectPageIndex.MIGRATE_CONNECT.NOTION_API);

            loadingStart();
            (async () => {
                await client.user.connect.notionApi({
                    userId: 'me',
                    code: code,
                    redirectUrl,
                });
            })();
            loadingEnd();
            move(connectPageIndex.MIGRATE_CONNECT.MIGRATION);
        }
    }, [loadingEnd, loadingStart, router, router.query.code, router.query.state, move, redirectUrl]);

    return (
        <SlideBox.Page pos={connectPageIndex.MIGRATE_CONNECT.NOTION_API}>
            <ConnectBlockBase>
                <YoutubeEmbed url="https://www.youtube.com/embed/S9A5o_enKak" />
                <BlockHeader
                    title="노션 통합을 추가해주세요"
                    text="Opize Calendar2notion 통합과 공유할 페이지를 선택한 다음 이전에 사용하던 데이터베이스를 선택해주세요."
                />
                <Flex.Column gap="8px">
                    <Button
                        onClick={() => {
                            window.location.href = notion_auth_url;
                        }}
                        icon={NotionSVG}
                        iconPosition="start"
                        size="large"
                        width="100%"
                        variant="outlined"
                    >
                        노션 통합 추가하기
                    </Button>
                    <MigrationGuideLink />
                </Flex.Column>
            </ConnectBlockBase>
        </SlideBox.Page>
    );
}
