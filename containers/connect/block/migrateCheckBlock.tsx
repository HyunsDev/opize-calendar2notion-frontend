import { useEffect, useState } from 'react';
import { client } from '../../../lib/client';
import { ConnectBlockBase } from '../components/blockBase';
import { BlockHeader } from '../components/blockHeader';
import { ConnectButton } from '../components/connectBtn';
import { Button, Flex, SlideBox, Spinner, useSlideBox } from 'opize-design-system';
import { MigrateV1CheckUser } from '../../../lib/client/endpoint/migrate/v1';
import { MigrationPreview, MigrationPreviewSkeleton } from '../components/migratePreview';
import { connectPageIndex } from '../connectPageIndex';
import { toast } from 'react-toastify';

export function MigrateCheckConnectBlock({
    setConnectMode,
    setNotionDatabaseId,
}: {
    setConnectMode: (mode: 'new' | 'migrate' | 'exist') => void;
    setNotionDatabaseId: (id: string) => void;
}) {
    const page = connectPageIndex.CHECK_MIGRATION;

    const { now, move } = useSlideBox();
    const [isLoading, setIsLoading] = useState(false);
    const [migrateUser, setMigrateUser] = useState<MigrateV1CheckUser>();

    useEffect(() => {
        (async () => {
            if (now === page) {
                setIsLoading(true);
                const canMigration = await client.migrate.v1.check({ userId: 'me' });
                setIsLoading(false);
                if (canMigration.canMigrate) {
                    setMigrateUser(canMigration.user);
                    setNotionDatabaseId(canMigration.user.notionDatabaseId);
                } else {
                    move(connectPageIndex.NEW_CONNECT.NOTION_API);
                }
            }
        })();
    }, [move, now, page, setNotionDatabaseId]);

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

    const onClick = async (mode: 'new' | 'migrate' | 'exist') => {
        await accountMigrate();

        setConnectMode(mode);
        if (mode === 'new') {
            move(connectPageIndex.NEW_CONNECT.NOTION_API);
        } else if (mode === 'migrate') {
            move(connectPageIndex.MIGRATE_CONNECT.NOTION_API);
        }
    };

    return (
        <SlideBox.Page pos={page}>
            <ConnectBlockBase>
                {migrateUser ? <MigrationPreview migrateUser={migrateUser} /> : <MigrationPreviewSkeleton />}
                <BlockHeader
                    title="데이터베이스 마이그레이션"
                    text="기존 calendar2notion에서 사용하던 데이터베이스를 이어 사용하시겠어요?"
                />

                <Flex.Column gap="8px">
                    <Button onClick={() => onClick('new')} width="100%" size="large" variant="outlined">
                        새로운 데이터베이스에 연결
                    </Button>
                    <Button onClick={() => onClick('migrate')} width="100%" size="large" variant="contained">
                        기존 데이터베이스 사용
                    </Button>
                </Flex.Column>
            </ConnectBlockBase>
        </SlideBox.Page>
    );
}
