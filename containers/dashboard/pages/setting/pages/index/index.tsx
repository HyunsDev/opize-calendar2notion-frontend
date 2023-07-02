import { Flex, PageLayout } from 'opize-design-system';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AccountBox } from '../../components/box/AccountBox';
import { SyncBox } from '../../components/box/SyncBox';
import { useUser } from '../../../../../../hooks/useUser';
import { DeadlockBox } from '../../components/box/DeadlackBox';
import { TimeZoneBox } from '../../components/box/TimeZoneBox';
import { PropsBox } from '../../components/box/PropsBox';
import { ErrorBox } from '../../components/box/ErrorBox';
import { Container } from '../../components/Container';
dayjs.extend(relativeTime);
dayjs.locale('ko');

export function SettingContainer() {
    const { user } = useUser();

    const isErrored = user?.lastSyncStatus;
    const isDeadlocked = dayjs(user?.lastCalendarSync) < dayjs().add(-2, 'hours') && user?.isWork;

    return (
        <Container now="sync">
            <Flex.Column gap="16px">
                {isErrored ? <ErrorBox /> : <></>}
                <AccountBox />
                <SyncBox />
                {isDeadlocked ? <DeadlockBox /> : <></>}

                {/* <TimeZoneBox /> */}
                {/* <PropsBox /> */}
            </Flex.Column>
        </Container>
    );
}
