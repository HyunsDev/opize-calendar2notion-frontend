import { Button, Flex, Modal, SlideBox, useModal } from 'opize-design-system';
import { connectPageIndex } from '../../connectPageIndex';
import { ConnectBlockBase } from '../../components/blockBase';
import { BlockHeader } from '../../components/blockHeader';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Img from '../../../../assets/connect/Calendar2notion.png';
import { client } from '../../../../lib/client';
import { APIResponseError } from 'endpoint-client';
import { YoutubeEmbed } from '../../components/youtubeEmbed';
import { MigrationGuideLink } from '../../components/migrationGuideLink';
import styled from 'styled-components';
import { useSlideBox } from '../../state/page.state';

const Pre = styled.pre``;

function MigrationGuideModal({
    description,
    videoId,
    notionDatabaseId,
}: {
    description: string;
    videoId?: string;
    notionDatabaseId: string;
}) {
    const modal = useModal();

    return (
        <Modal>
            <Modal.Header>{description}</Modal.Header>
            <Modal.Content>
                <Flex.Column gap="4px">
                    {videoId && <YoutubeEmbed url={`https://www.youtube.com/embed/${videoId}`} />}
                    <Pre>{description}</Pre>
                </Flex.Column>
            </Modal.Content>
            <Modal.Footer>
                <Button onClick={() => window.open('/migration-guide', '_blank')} variant="secondary">
                    동기화 가이드
                </Button>
                <Flex.Row gap="4px">
                    <Button onClick={() => window.open(notionDatabaseId, '_blank')} variant="secondary">
                        노션 열기
                    </Button>
                    <Button onClick={() => modal.close()}>확인</Button>
                </Flex.Row>
            </Modal.Footer>
        </Modal>
    );
}

export function MigrateConnectMigrationBlock() {
    const { now, move } = useSlideBox();
    const [isLoading, setIsLoading] = useState(false);
    const [notionDatabaseId, setNotionDatabaseId] = useState<string>('');
    const modal = useModal();

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
                if (err.status === 500) {
                    modal.open(
                        <Modal>
                            <Modal.Header>{err.body.message}</Modal.Header>
                            <Modal.Content>일시적인 문제가 발생했어요. 다시 시도해주세요.</Modal.Content>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        window.open(notionDatabaseId, '_blank');
                                        modal.close();
                                    }}
                                >
                                    노션 열기
                                </Button>
                                <Button onClick={() => modal.close()}>확인</Button>
                            </Modal.Footer>
                        </Modal>
                    );
                } else {
                    modal.open(
                        <MigrationGuideModal
                            description={err.body.description}
                            videoId={err.body.videoId}
                            notionDatabaseId={notionDatabaseId}
                        />
                    );
                }
            }
        }
    };

    return (
        <SlideBox.Page index={connectPageIndex.MIGRATE_CONNECT.MIGRATION}>
            <ConnectBlockBase>
                <Image src={Img} height={720} width={1280} alt="" />
                <BlockHeader
                    title={'데이터베이스 마이그레이션 할게요'}
                    text={'길게는 몇 분정도 걸릴 수 있어요'}
                ></BlockHeader>
                <Flex.Column gap="8px">
                    <Button onClick={migrate} size="medium" width="100%" variant="secondary" isLoading={isLoading}>
                        마이그레이션
                    </Button>
                    <MigrationGuideLink />
                </Flex.Column>
            </ConnectBlockBase>
        </SlideBox.Page>
    );
}
