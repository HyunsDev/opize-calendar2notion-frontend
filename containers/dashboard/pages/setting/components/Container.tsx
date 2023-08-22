import { PageLayout, PaneList, Spacer } from 'opize-design-system';
import Link from 'next/link';
import { useUser } from '../../../../../hooks/useUser';

type Page = 'sync' | 'calendar' | 'account' | 'billing';

export function DashboardSettingSidebar({ now }: { now: Page }) {
    const { user } = useUser();
    const hasTransaction = user && user.paymentLogs.length > 0;

    return (
        <PaneList isSticky>
            <Link href={'/dashboard/setting'} passHref>
                <PaneList.Item selected={now === 'sync'}>동기화</PaneList.Item>
            </Link>
            <Link href={'/dashboard/setting/calendar'} passHref>
                <PaneList.Item selected={now === 'calendar'}>캘린더</PaneList.Item>
            </Link>
            <Link href={'/dashboard/setting/account'} passHref>
                <PaneList.Item selected={now === 'account'}>계정</PaneList.Item>
            </Link>
            {hasTransaction ? (
                <Link href={'/dashboard/setting/billing'} passHref>
                    <PaneList.Item selected={now === 'billing'}>청구</PaneList.Item>
                </Link>
            ) : (
                <></>
            )}
        </PaneList>
    );
}

export function Container({ children, now }: { children: React.ReactNode; now: Page }) {
    return (
        <>
            <Spacer height="16px" />
            <PageLayout minHeight="calc(100vh - 131px - 128px - 337px)">
                <PageLayout.Pane>
                    <DashboardSettingSidebar now={now} />
                </PageLayout.Pane>
                <PageLayout.Content>{children}</PageLayout.Content>
            </PageLayout>
        </>
    );
}
