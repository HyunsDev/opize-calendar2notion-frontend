import { PageLayout, ActionList } from 'opize-design-system';
import Link from 'next/link';
import { useUser } from '../../../../../hooks/useUser';

type Page = 'sync' | 'calendar' | 'account' | 'billing';

export function DashboardSettingSidebar({ now }: { now: Page }) {
    const { user } = useUser();
    const hasTransaction = user && user.paymentLogs.length > 0;

    return (
        <ActionList isSticky>
            <Link href={'/dashboard/setting'} passHref>
                <ActionList.Item selected={now === 'sync'}>동기화</ActionList.Item>
            </Link>
            <Link href={'/dashboard/setting/calendar'} passHref>
                <ActionList.Item selected={now === 'calendar'}>캘린더</ActionList.Item>
            </Link>
            <Link href={'/dashboard/setting/account'} passHref>
                <ActionList.Item selected={now === 'account'}>계정</ActionList.Item>
            </Link>
            {hasTransaction ? (
                <Link href={'/dashboard/setting/billing'} passHref>
                    <ActionList.Item selected={now === 'billing'}>청구</ActionList.Item>
                </Link>
            ) : (
                <></>
            )}
        </ActionList>
    );
}

export function Container({ children, now }: { children: React.ReactNode; now: Page }) {
    return (
        <PageLayout panPosition="start" marginTop="16px" minHeight="calc(100vh - 131px - 128px - 337px)">
            <PageLayout.Pane>
                <DashboardSettingSidebar now={now} />
            </PageLayout.Pane>
            <PageLayout.Content>{children}</PageLayout.Content>
        </PageLayout>
    );
}
