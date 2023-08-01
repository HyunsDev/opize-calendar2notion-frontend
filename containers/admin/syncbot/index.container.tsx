import { BoxLayout, Button, Flex, PageHead, PageLayout, useModal } from 'opize-design-system';
import { useQuery } from 'react-query';
import { client } from '../../../lib/client';
import { AddSyncBotModal } from './modal/AddSyncBotModal';
import { RealTimeTaskContainer } from './containers/RealTimeTask.container';
import { SyncBotsContainer } from './containers/SyncBots.container';

export function AdminSyncBotContainer() {
    const modal = useModal();
    const { data: syncBots, refetch: refetchSyncBots } = useQuery(
        ['admin', 'syncBot'],
        () => client.syncbot.list({}),
        {}
    );

    return (
        <>
            <PageHead title="동기화봇">
                <Button
                    variant="contained"
                    size="large"
                    onClick={() =>
                        modal.open(<AddSyncBotModal />, {
                            width: 500,
                            title: '동기화봇 추가',
                        })
                    }
                >
                    동기화봇 추가
                </Button>
            </PageHead>
            <BoxLayout marginTop="32px" minHeight="calc(100vh - 131px - 128px - 337px)">
                <Flex.Column gap="20px">
                    <SyncBotsContainer />
                    <RealTimeTaskContainer />
                </Flex.Column>
            </BoxLayout>
        </>
    );
}
