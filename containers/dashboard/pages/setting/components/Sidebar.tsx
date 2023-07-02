import Link from 'next/link';
import { ActionList } from 'opize-design-system';

type Pages = 'sync' | 'calendar' | 'account';
export function DashboardSettingSidebar({ now }: { now: Pages }) {
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
        </ActionList>
    );
}
