import { BoxLayout, Button, Flex, PageHead, Spacer, useModal } from 'opize-design-system';
import { useQuery } from 'react-query';
import { client } from '../../../lib/client';
import { AddSyncBotModal } from './modal/AddSyncBotModal';
import { RealTimeTaskContainer } from './containers/RealTimeTask.container';
import { SyncBotsContainer } from './containers/SyncBots.container';

export function AdminSyncBotContainer() {
    const modal = useModal();

    return (
        <>
            <PageHead title="동기화봇">
                <Button variant="primary" size="medium" onClick={() => modal.open(<AddSyncBotModal />)}>
                    동기화봇 추가
                </Button>
            </PageHead>
            <BoxLayout>
                <Flex.Column gap="20px">
                    <SyncBotsContainer />
                    <RealTimeTaskContainer />
                </Flex.Column>
            </BoxLayout>
        </>
    );
}
