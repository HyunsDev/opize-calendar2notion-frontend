import { useCallback, useEffect, useState } from 'react';
import { client } from '../../../lib/client';
import { ConnectBlockBase } from '../components/blockBase';
import { BlockHeader } from '../components/blockHeader';
import { Button, Flex, SlideBox } from 'opize-design-system';
import { MigrateV1CheckUser } from '@opize/calendar2notion-object';
import { MigrationPreview, MigrationPreviewSkeleton } from '../components/migratePreview';
import { connectPageIndex } from '../connectPageIndex';
import { toast } from 'react-toastify';
import { MigrationGuideLink } from '../components/migrationGuideLink';
import { useSlideBox } from '../state/page.state';
import { APIResponseError } from 'endpoint-client';

export function MigrateCheckConnectBlock() {
    const page = connectPageIndex.CHECK_MIGRATION;

    const { now, move } = useSlideBox();
    const [, setIsLoading] = useState(false);
    const [migrateUser, setMigrateUser] = useState<MigrateV1CheckUser>();

    const onClick = useCallback(
        async (mode: 'new' | 'migrate' | 'exist') => {
            await accountMigrate();

            if (mode === 'new') {
                move(connectPageIndex.CHECK_EXIST);
            } else if (mode === 'migrate') {
                move(connectPageIndex.MIGRATE_CONNECT.NOTION_API);
            }
        },
        [move]
    );

    useEffect(() => {
        (async () => {
            if (now === page) {
                try {
                    setIsLoading(true);
                    const canMigration = await client.migrate.v1.check({ userId: 'me' });
                    setIsLoading(false);
                    if (canMigration.canMigrate) {
                        setMigrateUser(canMigration.user);

                        if (canMigration.user?.status === 'finish' && canMigration.user?.notionDatabaseId) {
                        } else {
                            onClick('new');
                        }
                    } else {
                        move(connectPageIndex.CHECK_EXIST);
                    }
                } catch (err) {
                    setIsLoading(false);
                    if (err instanceof APIResponseError) {
                        if (err.status === 404) {
                            move(connectPageIndex.CHECK_EXIST);
                            return;
                        }
                    }

                    toast.error('마이그레이션 확인에 문제가 발생했어요.');
                }
            }
        })();
    }, [move, now, onClick, page]);

    const accountMigrate = async () => {
        setIsLoading(true);
        try {
            const res = await client.migrate.v1.accountMigrate({
                userId: 'me',
            });

            if (res.success) {
                toast.info('계정 정보 마이그레이션에 성공했어요.');
            } else {
                if (res.reason === 'ALREADY_MIGRATED') {
                    return;
                }
            }
        } catch (err) {
            toast.error('계정 정보 마이그레이션에 실패했어요.');
        }
        setIsLoading(false);
    };

    return (
        <SlideBox.Page index={page}>
            <ConnectBlockBase>
                {migrateUser ? <MigrationPreview migrateUser={migrateUser} /> : <MigrationPreviewSkeleton />}
                <BlockHeader
                    title="Calendar2notion 마이그레이션"
                    text="기존 calendar2notion에서 사용하던 데이터베이스를 이어 사용하시겠어요?"
                />

                <Flex.Column gap="8px">
                    <Button onClick={() => onClick('new')} width="100%" size="large" variant="secondary">
                        마이그레이션 하지 않고 새로 시작
                    </Button>
                    <Button onClick={() => onClick('migrate')} width="100%" size="large" variant="primary">
                        이전 Calendar2notion 이어 사용하기
                    </Button>

                    <MigrationGuideLink />
                </Flex.Column>
            </ConnectBlockBase>
        </SlideBox.Page>
    );
}
