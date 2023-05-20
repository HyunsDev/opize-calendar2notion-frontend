import { useRouter } from 'next/router';
import {
    Button,
    Flex,
    Link,
    SlideBox,
    Text,
    useDialog,
    useModal,
    useSlideBox,
    useTopLoading,
} from 'opize-design-system';
import { connectPageIndex } from '../../connectPageIndex';
import { ConnectBlockBase } from '../../components/blockBase';
import { BlockHeader } from '../../components/blockHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Image from 'next/image';
import Img from '../../../../assets/connect/Calendar2notion.png';
import { client } from '../../../../lib/client';
import { APIResponseError } from 'endpoint-client';
import { YoutubeEmbed } from '../../components/youtubeEmbed';
import { MigrationGuideLink } from '../../components/migrationGuideLink';

export function MigrateConnectMigrationBlock() {
    const { now, move } = useSlideBox();
    const [isLoading, setIsLoading] = useState(false);
    const [notionDatabaseId, setNotionDatabaseId] = useState<string>('');
    const dialog = useDialog();

    useEffect(() => {
        (async () => {
            if (now === connectPageIndex.MIGRATE_CONNECT.MIGRATION) {
                setIsLoading(true);
                const canMigration = await client.migrate.v1.check({ userId: 'me' });
                setIsLoading(false);
                if (canMigration.canMigrate) {
                    setNotionDatabaseId(`https://notion.so/${canMigration.user.notionDatabaseId}`);
                } else {
                    move(connectPageIndex.NEW_CONNECT.NOTION_API);
                }
            }
        })();
    }, [move, now]);

    const migrate = async () => {
        try {
            setIsLoading(true);
            const res = await client.migrate.v1.calendarMigrate({
                userId: 'me',
            });
            console.log(res);
            setIsLoading(false);
            move(connectPageIndex.MIGRATE_CONNECT.FINISH);
        } catch (err) {
            console.error(err);
            setIsLoading(false);

            if (err instanceof APIResponseError) {
                console.log(err.body);
                dialog({
                    title: err.body.message,
                    content: err.body.videoId ? (
                        <Flex.Column gap="4px">
                            <YoutubeEmbed url={`https://www.youtube.com/embed/${err.body.videoId}?autoplay=1&loop=1`} />
                            <Text>{err.body.description}</Text>
                        </Flex.Column>
                    ) : (
                        err.body.description
                    ),
                    buttons: [
                        {
                            children: '노션 열기',
                            onClick: () => {
                                window.open(notionDatabaseId, '_blank');
                            },
                            variant: 'outlined',
                        },
                        {
                            children: '확인',
                            onClick: () => {},
                        },
                    ],
                });
            }
        }
    };

    return (
        <SlideBox.Page pos={connectPageIndex.MIGRATE_CONNECT.MIGRATION}>
            <ConnectBlockBase>
                <Image src={Img} height={720} width={1280} alt="" />
                <BlockHeader
                    title={'데이터베이스 마이그레이션 할게요'}
                    text={'길게는 몇 분정도 걸릴 수 있어요'}
                ></BlockHeader>
                <Flex.Column gap="8px">
                    <Button onClick={migrate} size="large" width="100%" variant="outlined" isLoading={isLoading}>
                        마이그레이션
                    </Button>
                    <MigrationGuideLink />
                </Flex.Column>
            </ConnectBlockBase>
        </SlideBox.Page>
    );
}
